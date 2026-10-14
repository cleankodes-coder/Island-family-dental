/**
 * Island Family Dental — Verified Authentic Clinic Assets Manifest
 * 
 * Strict No-AI-Photography Constitution:
 * - Every image path here maps to a confirmed, physically existing local file in /public/assets/.
 * - Doctor portrait: Authentic official headshot of Dr. Stanislav Golyand, DDS from the clinic website.
 * - Exterior: Street-view photographic reference of 4032 Richmond Ave and static Google map.
 * - Branding: Official IFD tooth emblem and cover visual reference.
 * - Gallery: Strictly authentic clinic media; zero AI hallucinated staff/patients, zero unconsented clinical before/afters.
 */

export interface ClinicImageAsset {
  id: string;
  title: string;
  description: string;
  src: string;
  width?: number;
  height?: number;
  aspectRatio: string;
  category: 'doctor' | 'clinic-exterior' | 'branding' | 'gallery' | 'technology';
  origin: string;
  isAuthentic: boolean;
  isOriginalFullRes: boolean;
  usageRights: string;
  caption: string;
}

export const CLINIC_ASSETS = {
  // Lead Clinician Authentic Portrait
  doctor: {
    stanislavGolyand: {
      id: 'dr-stanislav-golyand',
      title: 'Dr. Stanislav Golyand, DDS',
      description: 'Lead dentist and practice owner of Island Family Dental since 2006.',
      src: '/assets/island-family-dental/doctor/dr-stanislav-golyand.jpg',
      width: 767,
      height: 744,
      aspectRatio: '1:1',
      category: 'doctor' as const,
      origin: 'Official Island Family Dental biography page (https://www.dentalofstatenisland.com/about-us/dr-stanislav-golyand/42283)',
      isAuthentic: true,
      isOriginalFullRes: true,
      usageRights: 'Official practice biography photograph. Preserved in concept demo with clear attribution.',
      caption: 'Dr. Stanislav Golyand, DDS — Lead General & Cosmetic Dentist'
    }
  },

  // Clinic Exterior & Location
  exterior: {
    buildingFacade: {
      id: 'clinic-exterior-richmond-ave',
      title: '4032 Richmond Avenue Building Facade',
      description: 'Two-story red-brick practice location in Staten Island, NY with signature blue awnings and patient parking.',
      src: '/assets/island-family-dental/clinic-exterior/richmond-avenue-exterior.jpg',
      width: 221,
      height: 133,
      aspectRatio: '16:9',
      category: 'clinic-exterior' as const,
      origin: 'Google Maps Street View / Location photographic reference of 4032 Richmond Avenue',
      isAuthentic: true,
      isOriginalFullRes: false,
      usageRights: 'Public geographical location reference photograph for patient orientation.',
      caption: 'Island Family Dental exterior at 4032 Richmond Avenue, Staten Island, NY 10312'
    },
    staticMap: {
      id: 'clinic-location-map',
      title: 'Richmond Avenue Practice Map',
      description: 'Geographic location marker at 4032 Richmond Avenue, Staten Island, NY.',
      src: '/assets/island-family-dental/clinic-exterior/richmond-avenue-map.png',
      width: 200,
      height: 200,
      aspectRatio: '1:1',
      category: 'clinic-exterior' as const,
      origin: 'Google Maps Static API integration for Island Family Dental',
      isAuthentic: true,
      isOriginalFullRes: true,
      usageRights: 'Practice map snapshot for patient wayfinding.',
      caption: 'Island Family Dental location pin — Richmond Ave & Amboy Rd vicinity'
    }
  },

  // Branding & Official Marks
  branding: {
    facebookCover: {
      id: 'ifd-brand-cover',
      title: 'Island Family Dental Official Banner',
      description: 'Practice brand banner featuring the IFD tooth emblem and navy typography.',
      src: '/assets/island-family-dental/branding/ifd-brand-cover.jpg',
      width: 832,
      height: 471,
      aspectRatio: '16:9',
      category: 'branding' as const,
      origin: 'Island Family Dental official social branding asset',
      isAuthentic: true,
      isOriginalFullRes: false,
      usageRights: 'Official practice branding reference.',
      caption: 'Island Family Dental official brand banner'
    },
    logoEmblem: {
      id: 'ifd-logo-emblem',
      title: 'IFD Tooth Emblem Mark',
      description: 'Official tooth silhouette with IFD initials and stylized coastal waterline waves.',
      src: '/assets/island-family-dental/branding/ifd-logo-emblem.jpg',
      width: 171,
      height: 196,
      aspectRatio: '1:1',
      category: 'branding' as const,
      origin: 'Island Family Dental official emblem mark',
      isAuthentic: true,
      isOriginalFullRes: false,
      usageRights: 'Official brand emblem reference.',
      caption: 'Island Family Dental IFD emblem'
    },
    vectorToothIcon: {
      id: 'ifd-tooth-icon-svg',
      title: 'Crisp Vector Tooth Emblem',
      description: 'High-definition scalable SVG icon for responsive headers and cards.',
      src: '/assets/tooth_icon.svg',
      aspectRatio: '1:1',
      category: 'branding' as const,
      origin: 'Tailored vector brand mark based on official IFD design',
      isAuthentic: true,
      isOriginalFullRes: true,
      usageRights: 'Vector UI asset.',
      caption: 'IFD Tooth Symbol'
    }
  },

  // Approved Gallery Collection (Excluding unconsented patient procedures & social screenshots)
  gallery: [
    {
      id: 'gallery-dr-stan',
      title: 'Dr. Stanislav Golyand, DDS',
      description: 'Lead dentist Dr. Stanislav Golyand in professional practice portrait.',
      src: '/assets/island-family-dental/doctor/dr-stanislav-golyand.jpg',
      category: 'doctor' as const,
      aspectRatio: '1:1',
      origin: 'Official practice biography (dentalofstatenisland.com)',
      isAuthentic: true,
      isOriginalFullRes: true,
      usageRights: 'Approved clinician profile image.',
      caption: 'Dr. Stanislav Golyand, DDS — Practice Principal'
    },
    {
      id: 'gallery-clinic-exterior',
      title: '4032 Richmond Ave Practice Facility',
      description: 'Exterior view of the standalone dental facility on Richmond Avenue in Staten Island.',
      src: '/assets/island-family-dental/clinic-exterior/richmond-avenue-exterior.jpg',
      category: 'clinic-exterior' as const,
      aspectRatio: '16:9',
      origin: 'Google Maps Street View photographic reference',
      isAuthentic: true,
      isOriginalFullRes: false,
      usageRights: 'Location reference photography.',
      caption: 'Richmond Avenue clinic building with dedicated patient parking'
    },
    {
      id: 'gallery-brand-banner',
      title: 'Island Family Dental Brand Identity',
      description: 'Official dental monogram and navy blue heraldic palette.',
      src: '/assets/island-family-dental/branding/ifd-brand-cover.jpg',
      category: 'branding' as const,
      aspectRatio: '16:9',
      origin: 'Official practice social banner',
      isAuthentic: true,
      isOriginalFullRes: false,
      usageRights: 'Brand identity reference.',
      caption: 'Official Island Family Dental practice wordmark and seal'
    },
    {
      id: 'gallery-static-map',
      title: 'Staten Island Location Map',
      description: 'Neighborhood map centering on 4032 Richmond Ave, Staten Island NY 10312.',
      src: '/assets/island-family-dental/clinic-exterior/richmond-avenue-map.png',
      category: 'clinic-exterior' as const,
      aspectRatio: '1:1',
      origin: 'Google Maps location data',
      isAuthentic: true,
      isOriginalFullRes: true,
      usageRights: 'Wayfinding visual.',
      caption: 'Staten Island South Shore practice location'
    }
  ],

  // Diagnostic Technology Illustrative Assets
  technology: [
    {
      id: 'tech-digital-xray',
      title: 'Digital Low-Dose X-Rays',
      description: 'Instant, ultra-low radiation diagnostic imaging sensor.',
      src: '/assets/tech_xray.svg',
      aspectRatio: '1:1',
      category: 'technology' as const,
      origin: 'Clinical technology vector asset',
      isAuthentic: true,
      isOriginalFullRes: true,
      usageRights: 'Graphic illustration.',
      caption: 'Digital Dental Radiography'
    },
    {
      id: 'tech-soft-laser',
      title: 'Soft-Tissue Dental Lasers',
      description: 'Minimally invasive periodontal contouring and therapeutic care.',
      src: '/assets/tech_laser.svg',
      aspectRatio: '1:1',
      category: 'technology' as const,
      origin: 'Clinical technology vector asset',
      isAuthentic: true,
      isOriginalFullRes: true,
      usageRights: 'Graphic illustration.',
      caption: 'Soft-Tissue Laser Handpiece'
    },
    {
      id: 'tech-3d-scanner',
      title: '3D Optical Digital Scanners',
      description: 'High-precision digital impressions without messy putty.',
      src: '/assets/tech_scanner.svg',
      aspectRatio: '1:1',
      category: 'technology' as const,
      origin: 'Clinical technology vector asset',
      isAuthentic: true,
      isOriginalFullRes: true,
      usageRights: 'Graphic illustration.',
      caption: 'Intraoral 3D Optical Scanner'
    },
    {
      id: 'tech-ct-scan',
      title: 'Cone Beam 3D CT Imaging',
      description: 'Sub-millimeter 3D volumetric mapping for implant planning.',
      src: '/assets/tech_ct.svg',
      aspectRatio: '1:1',
      category: 'technology' as const,
      origin: 'Clinical technology vector asset',
      isAuthentic: true,
      isOriginalFullRes: true,
      usageRights: 'Graphic illustration.',
      caption: 'Cone Beam 3D Diagnostic CT'
    }
  ]
};
