#!/usr/bin/env python3
"""Download public image assets linked from Island Family Dental's official site.

Run locally with an internet connection. Standard-library only; no login, paywall,
platform bypass, or private APIs. Works best for server-rendered HTML. All output
remains UNREVIEWED and requires rights/consent checks before website publication.
"""
from __future__ import annotations

from collections import deque
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse, urldefrag
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError
import hashlib, json, mimetypes, re, sys, time, zipfile

ROOT = 'https://www.dentalofstatenisland.com/'
SOURCES = [
    ROOT,
    urljoin(ROOT, 'about-us'),
    urljoin(ROOT, 'about-us/dr-stanislav-golyand/42283'),
    urljoin(ROOT, 'services'),
    urljoin(ROOT, 'contact'),
]
ROOT_HOST = 'dentalofstatenisland.com'
MAX_HTML_PAGES = 75
MAX_IMAGES = 350
MAX_IMAGE_BYTES = 25 * 1024 * 1024
UA = 'Mozilla/5.0 (compatible; ClinicPhotoReferenceDownloader/1.0; User-operated; public-pages-only)'
SCRIPT_DIR = Path(__file__).resolve().parent
OUT = SCRIPT_DIR / 'original_site_images_unreviewed'
ARCHIVE = SCRIPT_DIR / 'Island_Family_Dental_Official_Website_Images_UNREVIEWED.zip'
IMAGE_RE = re.compile(r'\.(?:png|jpe?g|webp|gif|svg|avif)(?:$|\?)', re.I)
CSS_URL = re.compile(r'url\(\s*[\'\"]?([^\)\'\"]+)[\'\"]?\s*\)', re.I)
INLINE_IMAGE_URL = re.compile(r'(?P<url>(?:https?:)?//[^\"\'<>\s\\]+?\.(?:png|jpe?g|webp|gif|avif|svg)(?:\?[^\"\'<>\s\\]*)?)', re.I)
SKIP_URL = re.compile(r'(?:google-analytics|doubleclick|facebook\.com/tr|googletagmanager|recaptcha|pixel|gravatar)', re.I)


def clean_url(url, base):
    if not url: return None
    url = str(url).strip().replace('&amp;', '&')
    if url.startswith(('data:', 'blob:', 'javascript:', 'mailto:', 'tel:', '#')): return None
    result, _ = urldefrag(urljoin(base, url))
    parsed = urlparse(result)
    if parsed.scheme not in ('http','https') or not parsed.netloc: return None
    if SKIP_URL.search(result): return None
    return result


def srcset_urls(value):
    for part in (value or '').split(','):
        if part.strip(): yield part.strip().split()[0]


class ImagePageParser(HTMLParser):
    def __init__(self, base):
        super().__init__(convert_charrefs=True)
        self.base = base
        self.images = set()
        self.pages = set()
        self.css_files = set()
        self.in_style = False

    def add_img(self, raw):
        u = clean_url(raw, self.base)
        if u: self.images.add(u)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'style': self.in_style = True
        if tag == 'img' or tag == 'source':
            for name in ('src', 'data-src', 'data-lazy-src', 'data-original', 'data-image', 'data-bg', 'data-background', 'poster'):
                self.add_img(a.get(name))
            for name in ('srcset', 'data-srcset'):
                for u in srcset_urls(a.get(name)):
                    self.add_img(u)
        if tag == 'video': self.add_img(a.get('poster'))
        if tag == 'meta' and a.get('property', a.get('name','')).lower() in ('og:image','twitter:image','twitter:image:src'):
            self.add_img(a.get('content'))
        if tag == 'link':
            if 'stylesheet' in a.get('rel','').lower():
                u = clean_url(a.get('href'),self.base)
                if u: self.css_files.add(u)
            if a.get('as','').lower()=='image':
                self.add_img(a.get('href'))
                for u in srcset_urls(a.get('imagesrcset')):self.add_img(u)
        if tag == 'a':
            u = clean_url(a.get('href'),self.base)
            if u and urlparse(u).hostname in (ROOT_HOST, 'www.'+ROOT_HOST):
                path = urlparse(u).path.lower()
                if not re.search(r'\.(?:pdf|zip|mp4|js|css|png|jpg|webp|gif|svg|woff2?)$',path) and not any(k in path for k in ('/login','/admin','/search','/api/')):
                    self.pages.add(u)
        for name in ('style','background'):
            val=a.get(name,'')
            for m in CSS_URL.findall(val):self.add_img(m)
            if name == 'background' and val:self.add_img(val)

    def handle_endtag(self, tag):
        if tag == 'style': self.in_style=False

    def handle_data(self, data):
        if self.in_style:
            for m in CSS_URL.findall(data): self.add_img(m)


def get_url(url, cap=MAX_IMAGE_BYTES):
    req = Request(url, headers={'User-Agent':UA,'Accept':'image/avif,image/webp,image/*,*/*;q=0.8','Referer':ROOT})
    with urlopen(req, timeout=25) as res:
        mime = res.headers.get('Content-Type','').split(';')[0].lower()
        data = res.read(cap+1)
        if len(data)>cap: raise ValueError('Asset exceeds size cap')
    return mime,data


def guess_ext(url,mime,data):
    if data.startswith(b'\x89PNG'): return '.png'
    if data.startswith(b'\xff\xd8'):return '.jpg'
    if data.startswith(b'RIFF') and b'WEBP' in data[:16]:return '.webp'
    if data.startswith((b'GIF89a',b'GIF87a')):return '.gif'
    if data.lstrip().startswith((b'<svg',b'<?xml')):return '.svg'
    ext=Path(urlparse(url).path).suffix.lower()
    if ext in {'.jpg','.jpeg','.png','.webp','.svg','.gif','.avif'}:return ext
    return { 'image/png':'.png','image/jpeg':'.jpg','image/webp':'.webp','image/svg+xml':'.svg','image/avif':'.avif'}.get(mime,'.img')


def slug(s):
    return re.sub(r'[^a-z0-9-]+','-',s.lower()).strip('-')[:65] or 'image'


def main():
    OUT.mkdir(parents=True,exist_ok=True)
    q=deque(SOURCES)
    pages=set()
    images=set()
    css=set()
    errors=[]
    while q and len(pages)<MAX_HTML_PAGES:
        u=q.popleft()
        if u in pages:continue
        pages.add(u)
        try:
            mime, data=get_url(u, 7*1024*1024)
            if not (mime.startswith('text/html') or b'<html' in data[:5000].lower()):continue
            html=data.decode('utf-8','replace')
            parser=ImagePageParser(u)
            parser.feed(html)
            images.update(parser.images)
            css.update(parser.css_files)
            for found in INLINE_IMAGE_URL.finditer(html):
                url=clean_url(found.group('url'),u)
                if url:images.add(url)
            for page in sorted(parser.pages):
                if page not in pages and page not in q:q.append(page)
            print(f'PAGE {len(pages)}: {u}; image candidates: {len(images)}')
        except Exception as exc:
            errors.append({'url':u,'error':str(exc)[:200]})
            print('Page skip:',u,exc)
        time.sleep(0.25)
    # Also inspect a few stylesheet backgrounds, which some sites use for hero images.
    for url in list(sorted(css))[:12]:
        try:
            mime, cssbytes=get_url(url, 4*1024*1024)
            if mime and not ('css' in mime or mime == 'application/octet-stream'):continue
            for u in CSS_URL.findall(cssbytes.decode('utf-8','replace')):
                uu=clean_url(u,url)
                if uu and (IMAGE_RE.search(uu) or '/images/' in uu or '/uploads/' in uu):images.add(uu)
        except Exception:pass
    saved=[]
    hashes=set()
    for url in sorted(images):
        if len(saved)>=MAX_IMAGES:break
        try:
            mime,data=get_url(url)
            if not (mime.startswith('image/') or data.startswith((b'\x89PNG',b'\xff\xd8',b'RIFF',b'GIF89a',b'<svg',b'<?xml'))):continue
            if len(data)<2500 and 'logo' not in url.lower():continue
            digest=hashlib.sha256(data).hexdigest()
            if digest in hashes:continue
            hashes.add(digest)
            ext=guess_ext(url,mime,data)
            filename=f'{len(saved)+1:03d}_{slug(Path(urlparse(url).path).stem)}_{digest[:8]}{ext}'
            (OUT/filename).write_bytes(data)
            saved.append({'file':filename,'source_url':url,'mime':mime,'size_bytes':len(data),'sha256':digest,'rights_verified':False,'patient_consent_verified':False,'approved_for_public_site':False})
            print('IMAGE',len(saved),filename)
        except Exception as exc:
            errors.append({'url':url,'error':str(exc)[:200]})
        time.sleep(0.15)
    meta={'purpose':'Image review only — NOT approved for public reuse','site':ROOT,'pages_checked':sorted(pages),'image_candidates':len(images),'downloaded_image_count':len(saved),'images':saved,'errors':errors}
    (OUT/'ORIGINAL_IMAGE_DOWNLOAD_MANIFEST.json').write_text(json.dumps(meta,indent=2),encoding='utf-8')
    (OUT/'RIGHTS_AND_PATIENT_PRIVACY_README.txt').write_text('These files originated from public web pages and/or CDNs. Permission to republish, ownership, and patient consent are NOT confirmed. Review every image before using it in any public-facing clinic demo or deployment.\n')
    with zipfile.ZipFile(ARCHIVE,'w',compression=zipfile.ZIP_DEFLATED) as z:
        for f in OUT.iterdir():
            if f.is_file():z.write(f,arcname=f.name)
    print('\nCOMPLETE:',len(saved),'unique image files.')
    print('OUTPUT ZIP:',ARCHIVE)
    if not saved:print('No site images retrieved. The site may block automated fetch or serve images only through JavaScript. Obtain original exports from the clinic.')
    if errors:print('There were',len(errors),'individual fetch errors. See manifest.')

if __name__=='__main__':main()
