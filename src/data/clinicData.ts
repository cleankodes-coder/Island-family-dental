import { DentalService, Provider, ClinicConfig } from '../types';

export const CLINIC_CONFIG: ClinicConfig = {
  clinicName: "Island Family Dental",
  address: "4032 Richmond Avenue, Staten Island, NY 10312, United States",
  phone: "+1 (718) 948-6500",
  fax: "+1 (718) 948-0255",
  timezone: "America/New_York",
  minLeadHours: 2,
  maxFutureDays: 60,
  bufferMinutes: 15,
  slotIntervalMinutes: 15,
  operatingHours: [
    { day: "Monday", dayOfWeek: 1, hours: "9:00 AM – 5:00 PM", isOpen: true },
    { day: "Tuesday", dayOfWeek: 2, hours: "12:30 PM – 8:00 PM", isOpen: true },
    { day: "Wednesday", dayOfWeek: 3, hours: "9:00 AM – 5:00 PM", isOpen: true },
    { day: "Thursday", dayOfWeek: 4, hours: "12:30 PM – 8:00 PM", isOpen: true },
    { day: "Friday", dayOfWeek: 5, hours: "9:00 AM – 3:00 PM", isOpen: true },
    { day: "Saturday", dayOfWeek: 6, hours: "Closed", isOpen: false },
    { day: "Sunday", dayOfWeek: 0, hours: "Closed", isOpen: false }
  ]
};

export const DR_STANISLAV_GOLYAND: Provider = {
  id: "dr-stanislav-golyand",
  name: "Dr. Stanislav Golyand, DDS",
  title: "Lead General & Family Dentist",
  credentials: "DDS, New York University College of Dentistry",
  bio: "Dr. Stanislav Golyand, affectionately known to his patients as 'Dr. Stan', is the lead dentist and practice owner of Island Family Dental. He completed his initial dental training in Moscow before earning his Doctor of Dental Surgery degree from the prestigious NYU College of Dentistry. Dr. Golyand completed his rigorous general practice residency at Downstate Medical Center in Brooklyn. In 2006, he purchased Island Family Dental, dedicating nearly two decades to providing thoughtful, comprehensive, and compassionate oral healthcare for families throughout Staten Island.",
  active: true,
  acceptsNewPatients: true,
  supportedServiceIds: [
    "dental-exams-cleanings",
    "fillings",
    "crowns-bridges",
    "gum-disease-treatment",
    "invisalign",
    "dental-implants",
    "emergency-dental-care",
    "sealants-fluoride",
    "oral-cancer-screenings",
    "root-canals",
    "extractions",
    "custom-mouthguards",
    "veneers-whitening"
  ],
  education: [
    "Initial Dental Training — Moscow",
    "Doctor of Dental Surgery (DDS) — NYU College of Dentistry",
    "General Practice Residency — Downstate Medical Center (Brooklyn, NY)",
    "Practice Owner & Director — Island Family Dental (Since 2006)"
  ],
  specialties: [
    "Comprehensive Preventive Care",
    "Restorative & Implant Dentistry",
    "Cosmetic Smile Aesthetics",
    "Advanced Digital Laser Dentistry",
    "Urgent Emergency Dental Relief"
  ]
};

export const CLINIC_SERVICES: DentalService[] = [
  {
    id: "dental-exams-cleanings",
    slug: "dental-exams-cleanings",
    name: "Dental Exams & Professional Cleanings",
    category: "preventive",
    durationMinutes: 45,
    description: "Thorough preventive oral evaluations, ultrasonic plaque removal, gentle polishing, and personalized gum health assessments.",
    details: [
      "Comprehensive examination of teeth, gums, and oral tissues",
      "Ultrasonic tartar scaling and gentle high-gloss polishing",
      "Digital low-radiation diagnostic bitewing imaging",
      "Personalized preventive oral hygiene instruction"
    ],
    active: true,
    order: 1
  },
  {
    id: "fillings",
    slug: "fillings",
    name: "Tooth-Colored Composite Fillings",
    category: "restorative",
    durationMinutes: 45,
    description: "Biocompatible, natural-looking composite resin restorations that invisibly repair decay and preserve healthy tooth enamel.",
    details: [
      "Mercury-free, tooth-colored composite resins",
      "Precise decay removal preserving maximum natural structure",
      "Durable chemical bonding with seamless color blending",
      "Finished and bite-adjusted for immediate function"
    ],
    active: true,
    order: 2
  },
  {
    id: "crowns-bridges",
    slug: "crowns-bridges",
    name: "Crowns & Dental Bridges",
    category: "restorative",
    durationMinutes: 60,
    description: "Custom-milled porcelain crowns and fixed bridges designed to restore strength, chewing stability, and lifelike aesthetics.",
    details: [
      "High-strength zirconia and aesthetic porcelain materials",
      "3D digital optical scanning without uncomfortable putty",
      "Full crown restoration for cracked or root-canal-treated teeth",
      "Multi-unit fixed bridges to replace one or more missing teeth"
    ],
    active: true,
    order: 3
  },
  {
    id: "gum-disease-treatment",
    slug: "gum-disease-treatment",
    name: "Periodontal & Gum Disease Therapy",
    category: "preventive",
    durationMinutes: 60,
    description: "Deep periodontal cleaning, scaling and root planing, and therapeutic laser treatments to combat gingivitis and periodontitis.",
    details: [
      "Comprehensive periodontal pocket depth mapping",
      "Subgingival scaling and root planing for root smoothing",
      "Laser-assisted bacterial decontamination",
      "Supportive periodontal maintenance recall intervals"
    ],
    active: true,
    order: 4
  },
  {
    id: "invisalign",
    slug: "invisalign",
    name: "Invisalign Clear Aligners",
    category: "cosmetic",
    durationMinutes: 45,
    description: "Discreet orthodontic tooth alignment using custom series of transparent, removable aligner trays for teens and adults.",
    details: [
      "3D digital treatment visualization and progression mapping",
      "Removable aligners with zero dietary restrictions",
      "Gradual, comfortable movement of crowded or spaced teeth",
      "Routine check-ins to monitor alignment milestones"
    ],
    active: true,
    order: 5
  },
  {
    id: "dental-implants",
    slug: "dental-implants",
    name: "Dental Implant Restorations",
    category: "restorative",
    durationMinutes: 60,
    description: "Permanent, root-anchored titanium posts restored with custom porcelain crowns for realistic chewing power and bone health.",
    details: [
      "Precision 3D CBCT digital scan evaluation",
      "Biocompatible titanium fixture osseointegration",
      "Custom abutment design matching natural gum contours",
      "Indistinguishable porcelain crown finishing"
    ],
    active: true,
    order: 6
  },
  {
    id: "emergency-dental-care",
    slug: "emergency-dental-care",
    name: "Emergency Dental Care",
    category: "emergency",
    durationMinutes: 45,
    description: "Rapid relief for severe toothaches, broken teeth, knocked-out teeth, painful abscesses, or dislodged restorations.",
    details: [
      "Prioritized same-day evaluation during office hours",
      "Diagnostic digital imaging to identify underlying infection",
      "Immediate pain management and therapeutic stabilization",
      "Clear definitive restoration plan tailored to your condition"
    ],
    active: true,
    order: 7
  },
  {
    id: "sealants-fluoride",
    slug: "sealants-fluoride",
    name: "Dental Sealants & Fluoride Treatments",
    category: "preventive",
    durationMinutes: 30,
    description: "Protective resin barrier coatings for deep molar grooves and remineralizing fluoride varnish for kids and cavity-prone adults.",
    details: [
      "Non-invasive protective resin bonded into molar grooves",
      "Blocks 80% of food and bacterial decay in chewing fissures",
      "Medical-grade fluoride varnish application",
      "Safe, quick, and completely painless application"
    ],
    active: true,
    order: 8
  },
  {
    id: "oral-cancer-screenings",
    slug: "oral-cancer-screenings",
    name: "Oral Cancer Screenings",
    category: "preventive",
    durationMinutes: 20,
    description: "Careful tactile and visual examination of the tongue, palate, throat, and lymph nodes to detect mucosal abnormalities early.",
    details: [
      "Integrated into routine bi-annual dental examinations",
      "Systematic assessment of tongue, lips, cheeks, and neck",
      "Early detection of leukoplakia, erythroplakia, or lesion tissue",
      "Prompt professional specialist referral guidance if indicated"
    ],
    active: true,
    order: 9
  },
  {
    id: "root-canals",
    slug: "root-canals",
    name: "Endodontic Root Canal Therapy",
    category: "restorative",
    durationMinutes: 60,
    description: "Gentle nerve therapy that eliminates tooth infection, relieves throbbing pain, and saves your natural tooth from extraction.",
    details: [
      "Complete local anesthesia ensuring comfortable, painless care",
      "Thorough cleaning and disinfection of inner root canals",
      "Biocompatible gutta-percha hermetic sealing",
      "Protective core and crown preparation to restore tooth strength"
    ],
    active: true,
    order: 10
  },
  {
    id: "extractions",
    slug: "extractions",
    name: "Gentle Tooth Extractions",
    category: "restorative",
    durationMinutes: 45,
    description: "Careful, atraumatic removal of non-restorable, severely fractured, or problematic wisdom teeth with focused post-op care.",
    details: [
      "Atraumatic techniques prioritizing bone preservation",
      "Gentle local anesthesia and calm, patient-led pacing",
      "Detailed written post-operative recovery guidance",
      "Proactive discussion of future replacement options"
    ],
    active: true,
    order: 11
  },
  {
    id: "custom-mouthguards",
    slug: "custom-mouthguards",
    name: "Custom Nightguards & Sports Mouthguards",
    category: "preventive",
    durationMinutes: 30,
    description: "Individually molded dental appliances that protect against nighttime teeth grinding (bruxism) and high-impact sports trauma.",
    details: [
      "Precision 3D impression or digital scan of dental arches",
      "Dual-laminate medical grade materials for maximum cushion",
      "Prevents enamel attrition, jaw soreness, and TMJ strain",
      "Snug, comfortable retention that stays secure all night"
    ],
    active: true,
    order: 12
  },
  {
    id: "veneers-whitening",
    slug: "veneers-whitening",
    name: "Porcelain Veneers & Professional Teeth Whitening",
    category: "cosmetic",
    durationMinutes: 60,
    description: "Custom porcelain dental veneers to transform smile symmetry and safe clinical-grade whitening to erase stubborn stains.",
    details: [
      "Ultra-thin ceramic veneers handcrafted to your facial proportions",
      "Safe, monitored in-office and custom take-home whitening systems",
      "Corrects deep discoloration, chips, gaps, and worn edges",
      "Natural translucency mimicking real tooth enamel"
    ],
    active: true,
    order: 13
  }
];

export const CLINIC_TECHNOLOGY = [
  {
    title: "Digital Low-Dose X-Rays",
    description: "Up to 80% less radiation than traditional film, producing crystal-clear instant digital radiographs for immediate diagnosis.",
    badge: "Safety & Precision"
  },
  {
    title: "Laser Dentistry",
    description: "Minimally invasive soft-tissue laser treatments that reduce bleeding, eliminate sutures, and accelerate healing times.",
    badge: "Comfort & Speed"
  },
  {
    title: "3D Digital Intraoral Scanners",
    description: "Comfortable optical 3D impression scanning that eliminates messy goop and trays while delivering sub-millimeter crown accuracy.",
    badge: "Digital Precision"
  },
  {
    title: "Cone Beam 3D CT Imaging",
    description: "Comprehensive 3D volumetric views of bone, nerves, and tooth roots for ultra-precise implant planning and root canal care.",
    badge: "Advanced Diagnostics"
  }
];

export const CLINIC_FAQS = [
  {
    q: "Where is Island Family Dental located in Staten Island?",
    a: "Our practice is conveniently located at 4032 Richmond Avenue, Staten Island, NY 10312, with convenient parking and accessibility for local Staten Island families."
  },
  {
    q: "Who is the dentist at Island Family Dental?",
    a: "Our lead dentist is Dr. Stanislav Golyand, DDS ('Dr. Stan'). He trained in Moscow, received his dental degree from the NYU College of Dentistry, and completed his residency at Downstate Medical Center. He has proudly owned and directed Island Family Dental since 2006."
  },
  {
    q: "What are your published office hours?",
    a: "We are open Monday 9:00 AM–5:00 PM, Tuesday 12:30 PM–8:00 PM, Wednesday 9:00 AM–5:00 PM, Thursday 12:30 PM–8:00 PM, and Friday 9:00 AM–3:00 PM. We are closed on Saturday and Sunday."
  },
  {
    q: "How does this website's Demo Booking work?",
    a: "This website is an independent interactive concept demo. The booking flow runs a realistic scheduling simulation using fictitious data stored in our demo database so you can experience our proposed patient interface. No real appointment will be scheduled with Island Family Dental through this demo."
  },
  {
    q: "How can I book a REAL appointment at Island Family Dental?",
    a: "To book a real clinical appointment, please call the practice directly at +1 (718) 948-6500 or use Dr. Stanislav Golyand's official verified Zocdoc scheduling profile."
  },
  {
    q: "What dental insurances and payment methods are accepted?",
    a: "Because insurance networks update frequently, we recommend contacting the clinic directly at +1 (718) 948-6500 before your visit so our team can verify your specific dental benefits and payment options."
  },
  {
    q: "What should new patients expect on their first visit?",
    a: "First visits typically consist of a comprehensive clinical examination by Dr. Stan, necessary digital low-radiation diagnostic imaging, an oral cancer screening, a gentle cleaning if appropriate, and an unhurried discussion of your oral health goals."
  },
  {
    q: "What should I do if I have a dental emergency on Staten Island?",
    a: "If you have a toothache, dental trauma, or sudden swelling, contact our office at +1 (718) 948-6500 during business hours for guidance. For life-threatening emergencies, severe facial trauma, or difficulty breathing, call 911 immediately or proceed to the nearest emergency room."
  }
];

export const OFFICIAL_ZOCDOC_URL = "https://www.zocdoc.com/dentist/stanislav-golyand-dds-461783";
export const OFFICIAL_SITE_URL = "https://www.dentalofstatenisland.com/";
export const GOOGLE_MAPS_DIRECTIONS_URL = "https://www.google.com/maps/dir/?api=1&destination=4032+Richmond+Avenue+Staten+Island+NY+10312";
