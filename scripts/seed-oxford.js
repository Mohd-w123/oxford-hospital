/**
 * Oxford Hospital Database Seeder
 * Connects to MongoDB Atlas (oxford-hms) and populates initial site content and admin credentials.
 */

const mongoose = require('mongoose');

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://codewithwazid:Khankhan1234@cluster0.vzvw2so.mongodb.net/oxford-hms?retryWrites=true&w=majority&appName=Cluster0';

const siteContent = {
  key: 'main_content',
  hospital: {
    name: 'Oxford Hospital',
    hindiName: 'ऑक्सफोर्ड हॉस्पिटल',
    tagline: '24×7 Multi-Speciality & Critical Care Hospital with Excellence',
    logoUrl: '/images/logo.png',
    address: 'Fatehpur Road, Sikar',
    city: 'Sikar',
    pincode: '332001',
    state: 'Rajasthan',
    phoneNumbers: ['9460841406', '9571177525', '01572 299062'],
    whatsappNumber: '9460841406',
    email: 'oxfordhospitalsikar@gmail.com',
    opdTimings: '9:00 AM to 8:00 PM (All 7 Days)',
    opdTimingsHindi: 'सुबह 9:00 बजे से शाम 8:00 बजे तक (प्रतिदिन)',
    emergencyPhone: '9460841406',
    googleMapUrl: 'https://maps.google.com/?q=Oxford+Hospital+Fatehpur+Road+Sikar+Rajasthan+332001',
    googleMapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113645.28616147636!2d75.07436034177246!3d27.618641900000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396ca5603b555555%3A0x88f5555555555555!2sFatehpur%20Rd%2C%20Sikar%2C%20Rajasthan%20332001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    footerLogoUrl: '/images/logo.png',
    footerAboutText:
      'Oxford Hospital (ऑक्सफोर्ड हॉस्पिटल) is a premier multi-speciality hospital committed to delivering advanced healthcare, 24x7 emergency & trauma response, modern ICU, modular operation theatres, and cashless insurance empanelment under senior medical leadership.',
    footerCopyrightText: 'All Rights Reserved. Oxford Hospital.',
    noticeBanner: {
      active: true,
      text: '24×7 Emergency, ICU, Trauma & Cashless Insurance (ECHS / RGHS / MAA / ESIC / GIC) Available! Helpline: 9460841406',
      textHindi: '24×7 आपातकालीन, आईसीयू, ट्रॉमा एवं कैशलेस बीमा सुविधाएं उपलब्ध! हेल्पलाइन: 9460841406',
      linkUrl: '/appointment'
    }
  },
  navigation: [
    { id: 'nav-1', name: 'Home', href: '/', enabled: true, order: 1 },
    { id: 'nav-2', name: 'About Us', href: '/about', enabled: true, order: 2 },
    { id: 'nav-3', name: 'Specialities & Services', href: '/services', enabled: true, order: 3 },
    { id: 'nav-4', name: 'Our Doctors', href: '/doctors', enabled: true, order: 4 },
    { id: 'nav-5', name: 'Hospital Facilities', href: '/facilities', enabled: true, order: 5 },
    { id: 'nav-6', name: 'Photo Gallery', href: '/gallery', enabled: true, order: 6 },
    { id: 'nav-7', name: 'Contact & Location', href: '/contact', enabled: true, order: 7 }
  ],
  heroSlides: [
    {
      id: 'slide-1',
      title: 'बेहतर इलाज की शुरुआत, सही जगह से।',
      titleHindi: 'ऑक्सफोर्ड मल्टीस्पेशलिटी हॉस्पिटल - चूरू बाईपास तिराहा, झुंझुनूं',
      subtitle:
        'विशेषज्ञ डॉक्टरों की सलाह • आधुनिक चिकित्सा सुविधा • बेहतर देखभाल | Physician, Dental, Eye, Physiotherapy, Gynae, General Surgery',
      badge: 'Oxford Hospital Jhunjhunu',
      ctaText: 'Book Appointment',
      ctaLink: '/appointment',
      imageUrl: '/images/slider/slide-banner-oxford.jpg',
      isBannerOnly: true
    },
    {
      id: 'slide-2',
      title: 'Physician Consultation & Critical Care',
      titleHindi: 'Dr H. ALTAF - MBBS, MD (Internal Medicine), Fellowship in Critical Society',
      subtitle:
        'बुखार एवं संक्रमण, BP एवं Diabetes, कमजोरी एवं थकान, सिरदर्द एवं चक्कर, सांस संबंधी समस्याएँ | आयुष्मान हॉस्पिटल राजगढ़ (ऑक्सफोर्ड हॉस्पिटल झुंझुनू द्वारा संचालित)',
      badge: 'Physician OPD - Rajgarh Branch',
      ctaText: 'Consult Dr. Altaf',
      ctaLink: '/appointment',
      imageUrl: '/images/slider/slide-physician-altaf.jpg',
      isBannerOnly: true
    },
    {
      id: 'slide-3',
      title: 'दाँतों का दर्द सहना मजबूरी नहीं',
      titleHindi: 'डॉ प्रमोद शेखावत - BDS (R.U.H.S), Endodontics & Conservative Procedure (RCT)',
      subtitle:
        'कैविटी, मसूड़ों से खून आना, रूट केनाल (RCT), दांतों में पीलापन व संवेदनशीलता | ऑक्सफोर्ड हॉस्पिटल सुल्ताना (मल्टीस्पेशलिटी) टेकड़ा स्टैंड',
      badge: 'Dental Check-up - Sultana Branch',
      ctaText: 'Book Dental Check-up',
      ctaLink: '/appointment',
      imageUrl: '/images/slider/slide-dental-shekhawat.jpg',
      isBannerOnly: true
    }
  ],
  services: [
    {
      id: 'serv-emergency',
      title: '24×7 Emergency Services',
      titleHindi: '24×7 आपातकालीन सेवाएं एवं ट्रॉमा केयर',
      shortDesc: 'Round-the-clock emergency medical response with immediate resuscitation, trauma care, and rapid cardiac triage.',
      fullDesc:
        "Oxford Hospital's 24x7 Emergency & Trauma Centre is staffed by experienced emergency physicians, critical care nurses, and surgical teams ready to handle acute trauma, cardiac emergencies, stroke, respiratory distress, and poisoning with zero response delay.",
      category: 'emergency',
      icon: 'Ambulance',
      features: [
        'Dedicated Resuscitation Bay with Defibrillators & Crash Carts',
        'Trained ACLS/BLS Emergency Response Team',
        'Immediate Access to CT, Digital X-Ray & Blood Bank',
        'Bedside Emergency Ultrasound & Immediate Stabilization'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      id: 'serv-icu',
      title: 'ICU / Critical Care',
      titleHindi: 'आईसीयू एवं क्रिटिकल केयर यूनिट',
      shortDesc: 'State-of-the-art Intensive Care Unit equipped with advanced invasive ventilators and multi-channel hemodynamics.',
      fullDesc:
        'Our Intensive Care Unit (ICU) provides round-the-clock intensive medical supervision and life-support for critically ill patients. Supported by senior intensivists, high-end ventilators, arterial blood gas analyzers, and central monitoring systems.',
      category: 'clinical',
      icon: 'Activity',
      features: [
        'Advanced Invasive & Non-Invasive Mechanical Ventilators',
        'Continuous Multi-Parameter Hemodynamic Monitoring',
        '1:1 Dedicated Critical Care Nursing Ratio',
        'Stringent Sterile Infection-Control Protocols'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      id: 'serv-hdu',
      title: 'HDU (High Dependency Unit)',
      titleHindi: 'एचडीयू (हाई डिपेंडेंसी यूनिट)',
      shortDesc: 'Step-down critical care bridging the ICU and general wards for continuous clinical monitoring.',
      fullDesc:
        'The High Dependency Unit (HDU) provides intermediate therapeutic care for patients recovering from major surgeries or severe illnesses who still need closer monitoring than in general wards, ensuring smooth recovery transitions.',
      category: 'clinical',
      icon: 'HeartPulse',
      features: [
        'Continuous Cardiac & Oxygen Saturation Monitoring',
        'Post-operative Step-down Surgical Recovery',
        'Specialized 1:2 Nursing Supervision',
        'Seamless ICU-Level Emergency Escalation'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      id: 'serv-ot',
      title: 'Operation Theatre (Modular OT)',
      titleHindi: 'अत्याधुनिक मॉड्युलर ऑपरेशन थिएटर',
      shortDesc: 'Ultra-clean surgical suites equipped with laminar airflow, HEPA filters, C-Arm, and advanced laparoscopy towers.',
      fullDesc:
        'Oxford Hospital houses ultra-modern Modular Operation Theatres engineered to international sterility standards. Equipped with laminar airflow, LED surgical lights, precision anaesthesia workstations, electrocautery, and HD laparoscopy towers for minimal-access surgeries.',
      category: 'surgical',
      icon: 'ShieldCheck',
      features: [
        'Laminar Air Flow with 0.3 Micron HEPA Filtration',
        'High-Definition 4K Laparoscopic & Endoscopic Towers',
        'Digital C-Arm Image Intensifier for Ortho & Neuro Surgeries',
        'Comprehensive Central Sterile Supply Department (CSSD)'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      id: 'serv-ipd-opd',
      title: 'In-Patient & Out-Patient Services (IPD & OPD)',
      titleHindi: 'भर्ती (IPD) एवं बाह्य रोगी (OPD) सेवाएं',
      shortDesc: 'Comfortable private, semi-private, and general wards alongside multi-speciality outpatient consultation clinics.',
      fullDesc:
        'From comprehensive daily outpatient consultations across 13+ specialities to comfortable inpatient accommodation including Deluxe Rooms, Semi-Private cubicles, and well-ventilated General Wards with round-the-clock medical care.',
      category: 'facilities',
      icon: 'Building2',
      features: [
        'Daily Morning & Evening Outpatient (OPD) Clinics',
        'Deluxe, Single Private, Semi-Private & General Wards',
        'Personalized Nutritional Care & Dietary Consultation',
        'Dedicated Patient Attendant Lounges & Lift Facilities'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      id: 'serv-lab',
      title: 'Diagnostic Laboratory',
      titleHindi: '24 घंटे आधुनिक डायग्नोस्टिक लैब',
      shortDesc: 'Fully automated biochemistry, haematology, serology, microbiology, and clinical pathology testing.',
      fullDesc:
        'Our high-precision diagnostic laboratory operates 24x7 with automated cell counters, biochemistry analyzers, hormone assay equipment, and stringent internal quality controls, delivering accurate and prompt test results.',
      category: 'diagnostic',
      icon: 'FlaskConical',
      features: [
        'Automated 5-Part Hematology Cell Counter',
        'Fully Automated Biochemistry & Electrolyte Analyzers',
        'Emergency Cardiac Biomarkers & Infection Profiling',
        'Online & Instant WhatsApp Diagnostic Report Delivery'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      id: 'serv-imaging',
      title: 'X-Ray / Ultrasound / CT Scan',
      titleHindi: 'डिजिटल एक्स-रे / सोनोग्राफी / सीटी स्कैन',
      shortDesc: 'Advanced medical imaging with high-frequency digital X-Ray, Color Doppler 4D Ultrasound, and CT Scan.',
      fullDesc:
        'Equipped with state-of-the-art diagnostic imaging suites, Oxford Hospital offers immediate high-frequency digital X-rays, multi-frequency Color Doppler sonography for antenatal & vascular evaluation, and high-resolution CT Scan facilities.',
      category: 'diagnostic',
      icon: 'Scan',
      features: [
        'High-Frequency Digital Radiography (Low Radiation Dose)',
        'Color Doppler & 4D Obstetric Ultrasound Scans',
        'Multi-Slice High-Resolution CT Scan Facilities',
        'Senior Radiologist Diagnostic Reporting'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      id: 'serv-pharmacy',
      title: 'Pharmacy Services',
      titleHindi: '24×7 इन-हाउस फार्मेसी एवं दवाएं',
      shortDesc: '24/7 stocked pharmacy supplying genuine life-saving medications, critical surgical disposables, and vaccines.',
      fullDesc:
        'Our 24-hour in-house pharmacy ensures that patients and families never have to travel elsewhere for urgent drugs, surgical consumables, antibiotics, or specialty formulations, stored under strict temperature-controlled standards.',
      category: 'support',
      icon: 'Pill',
      features: [
        '24/7 Round-the-Clock Service 365 Days a Year',
        '100% Genuine, Verified & Quality-Controlled Medications',
        'Dedicated Cold Chain Refrigeration for Vaccines & Biologicals',
        'Transparent & Highly Affordable Patient Pricing'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80',
      featured: false
    },
    {
      id: 'serv-ambulance',
      title: 'Ambulance Services',
      titleHindi: '24×7 आपातकालीन एम्बुलेंस सेवा',
      shortDesc: 'Rapid response ambulance fleet equipped with life support monitors, oxygen delivery, and emergency medical technicians.',
      fullDesc:
        'Oxford Hospital operates dedicated Advanced Life Support (ALS) and Basic Life Support (BLS) ambulances with portable oxygen, transport ventilators, defibrillators, and trained paramedics for safe patient transit.',
      category: 'emergency',
      icon: 'Truck',
      features: [
        '24/7 Rapid Emergency Dispatch Hotline (9571177525)',
        'Fully Outfitted with Portable Oxygen & Suction Equipment',
        'Certified Emergency Medical Technicians (EMTs) on Board',
        'Coordinated Direct Entry to the Resuscitation Bay'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      id: 'serv-cashless',
      title: 'Cashless & Insurance Services',
      titleHindi: 'कैशलेस एवं स्वास्थ्य बीमा (TPA) डेस्क',
      shortDesc: 'Hassle-free cashless hospitalization with leading private and public health insurance companies and TPAs.',
      fullDesc:
        'Our dedicated TPA & Insurance Desk streamlines cashless approval, claim processing, and documentation for major health insurance providers, allowing families to focus solely on patient healing.',
      category: 'support',
      icon: 'CreditCard',
      features: [
        'Dedicated In-House Cashless Help Desk & TPA Coordination',
        'Tie-Ups with Leading Health Insurance Companies & TPAs',
        'Fast Pre-Authorization Clearance & Hassle-Free Approvals',
        'Assistance with Post-Hospitalization Reimbursement Claims'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
      featured: false
    },
    {
      id: 'serv-govt-schemes',
      title: 'ECHS / RGHS / MAA Yojana / ESIC / GIC Services',
      titleHindi: 'ईसीएचएस / आरजीएचएस / मां योजना / ईएसआईसी / जीआईसी सेवाएं',
      shortDesc: 'Empanelled for premier government welfare and defense health schemes, providing cashless treatments.',
      fullDesc:
        "Oxford Hospital proudly serves beneficiaries under major government schemes including ECHS (Ex-Servicemen Contributory Health Scheme), RGHS (Rajasthan Government Health Scheme), MAA Yojana, ESIC (Employees' State Insurance), and GIC public sector insurance with dedicated assistance.",
      category: 'support',
      icon: 'Award',
      features: [
        'RGHS (Rajasthan Government Health Scheme) Cashless Treatment',
        'ECHS Empanelled Care for Ex-Servicemen & Dependents',
        'ESIC & Mukhyamantri Ayushman (MAA) Yojana Coverage',
        'GIC Public Sector Insurance Cashless Facilities & Dedicated Counter'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      id: 'serv-nursing',
      title: '24×7 Nursing & Medical Care',
      titleHindi: '24×7 कुशल नर्सिंग एवं चिकित्सीय देखभाल',
      shortDesc: 'Continuous clinical monitoring, compassionate bedside care, and round-the-clock resident medical officers.',
      fullDesc:
        'Our qualified nursing staff and Resident Medical Officers (RMOs) provide compassionate, attentive round-the-clock clinical care, routine vitals charting, medication administration, post-operative wound care, and emergency stabilization.',
      category: 'clinical',
      icon: 'HeartHandshake',
      features: [
        'Qualified & Compassionate B.Sc / GNM Nursing Staff',
        '24×7 Resident Medical Officers (RMOs) Stationed on Every Floor',
        'Meticulous Patient Vitals Monitoring & Medicine Administration',
        'Strict Infection Control and Compassionate Patient Attention'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
      featured: true
    }
  ],
  doctors: [
    {
      id: 'doc-general-medicine',
      name: 'Dr. Hussain Khan',
      nameHindi: 'डॉ. हुसैन खान',
      designation: 'Senior Consultant - General Medicine & Internal Medicine',
      degrees: 'MBBS, MD (Internal Medicine)',
      specialties: [
        'Diabetes Mellitus & Hypertension Management',
        'Cardiac & Respiratory Disorders (Asthma, COPD)',
        'Infectious Diseases, Dengue, Malaria & Chronic Fevers',
        'Thyroid Disorders, Lipid Imbalances & Metabolic Syndrome',
        'Critical Care & Adult In-Patient Medical Management'
      ],
      specialtiesHindi: [
        'वरिष्ठ फिजिशियन (इंटरनल मेडिसिन विशेषज्ञ)',
        'मधुमेह (शुगर), बीपी एवं थायरॉइड उपचार',
        'हृदय, श्वास एवं फेफड़ों से संबंधित रोग',
        'मौसमी व गंभीर बुखार का आधुनिक उपचार'
      ],
      experience: '12+ Years Clinical Experience',
      opdTimings: '10:00 AM - 2:00 PM & 5:00 PM - 8:00 PM (All 7 Days)',
      photoUrl: '/images/doctors/doc-hussain.jpg',
      bio: 'Dr. Hussain Khan is a senior consultant in Internal Medicine with extensive clinical expertise in lifestyle diseases, cardiovascular risk management, complex infectious diseases, and adult critical care medicine.',
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      featured: true
    },
    {
      id: 'doc-general-surgeon',
      name: 'Dr. Tariq Anwar',
      nameHindi: 'डॉ. तारिक अनवर',
      designation: 'Senior Consultant - General & Laparoscopic Surgery',
      degrees: 'MBBS, MS (General Surgery), FMAS, FIAGES',
      specialties: [
        'Advanced Laparoscopic Cholecystectomy (Gallbladder)',
        'Laparoscopic Appendectomy & Hernia Repair',
        'Laser Surgery for Piles, Fissure & Fistula',
        'Trauma & Acute Abdomen Emergency Surgery',
        'Thyroid, Breast & Soft Tissue Surgeries'
      ],
      specialtiesHindi: [
        'दूरबीन द्वारा पित्त की थैली व अपेंडिक्स ऑपरेशन',
        'हर्निया एवं हाइड्रोसील का आधुनिक ऑपरेशन',
        'बवासीर, भगंदर व फिशर का लेजर उपचार',
        'आपातकालीन ट्रॉमा सर्जरी'
      ],
      experience: '10+ Years Surgical Experience',
      opdTimings: '10:30 AM - 3:00 PM & 6:00 PM - 8:00 PM (Mon - Sat)',
      photoUrl: '/images/doctors/doc-surgeon.jpg',
      bio: 'Dr. Tariq Anwar specializes in minimally invasive laparoscopic and keyhole surgeries, ensuring minimal post-operative pain, microscopic incisions, and prompt return to daily activities.',
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      featured: true
    },
    {
      id: 'doc-orthopaedic',
      name: 'Dr. Imran Farooqui',
      nameHindi: 'डॉ. इमरान फारूकी',
      designation: 'Consultant Orthopaedic & Joint Replacement Surgeon',
      degrees: 'MBBS, MS (Orthopaedics), Fellowship in Joint Replacement',
      specialties: [
        'Complex Fracture Fixation & Trauma Care',
        'Total Knee & Hip Replacement Surgeries',
        'Arthroscopic Ligament Reconstruction (ACL / PCL)',
        'Spine Disorders, Sciatica & Slip Disc Care',
        'Arthritis Management & Joint Injections'
      ],
      specialtiesHindi: [
        'हड्डी, जोड़ एवं नस रोग विशेषज्ञ',
        'घुटने व कूल्हे का प्रत्यारोपण (Joint Replacement)',
        'दूरबीन द्वारा लिगामेंट ऑपरेशन (Arthroscopy)',
        'रीढ़ की हड्डी एवं कमर दर्द का इलाज'
      ],
      experience: '9+ Years Experience',
      opdTimings: '11:00 AM - 4:00 PM (Mon - Sat)',
      photoUrl: '/images/doctors/doc-ortho.jpg',
      bio: 'Dr. Imran Farooqui is an accomplished Orthopaedic Surgeon dedicated to joint preservation, cutting-edge joint replacement, trauma reconstruction, and sports medicine rehabilitation.',
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      featured: true
    },
    {
      id: 'doc-gynaecologist',
      name: 'Dr. Sana Parveen',
      nameHindi: 'डॉ. सना परवीन',
      designation: 'Senior Consultant - Obstetrics & Gynaecology',
      degrees: 'MBBS, MS (OBG & Gynae), FMAS',
      specialties: [
        'High-Risk Pregnancy & Painless Normal Delivery',
        'Laparoscopic Hysterectomy & Ovarian Cystectomy',
        'Infertility Evaluation, IUI & Counseling',
        'PCOS, Menstrual Disorders & Adolescent Health',
        'Cervical & Uterine Cancer Screening'
      ],
      specialtiesHindi: [
        'स्त्री, प्रसूति एवं निःसंतानता विशेषज्ञ',
        'उच्च जोखिम गर्भावस्था एवं सुरक्षित प्रसव',
        'दूरबीन द्वारा बच्चेदानी व रसौली का ऑपरेशन',
        'पीसीओडी एवं माहवारी संबंधी परामर्श'
      ],
      experience: '11+ Years Clinical Experience',
      opdTimings: '9:30 AM - 3:30 PM & 5:30 PM - 7:30 PM (All 7 Days)',
      photoUrl: '/images/doctors/doc-gynae.jpg',
      bio: 'Dr. Sana Parveen is a highly experienced Obstetrician & Gynaecologist providing compassionate maternal health, safe obstetric care, painless delivery options, and modern laparoscopic gynaecological procedures.',
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      featured: true
    },
    {
      id: 'doc-paediatrician',
      name: 'Dr. Neha Sharma',
      nameHindi: 'डॉ. नेहा शर्मा',
      designation: 'Consultant Paediatrician & Neonatologist',
      degrees: 'MBBS, MD (Paediatrics), DNB Paediatrics',
      specialties: [
        'Newborn & Neonatal Intensive Care (NICU)',
        'Growth, Nutrition & Developmental Milestones',
        'Complete Vaccination & Immunization Schedule',
        'Pediatric Asthma, Allergies & Seasonal Infections',
        'Childhood Nutrition & Pediatric Emergency Care'
      ],
      specialtiesHindi: [
        'नवजात शिशु एवं बाल रोग विशेषज्ञ',
        'नवजात गहन चिकित्सा (NICU Care)',
        'बच्चों का संपूर्ण टीकाकरण एवं पोषण',
        'बाल श्वास, निमोनिया एवं एलर्जी उपचार'
      ],
      experience: '8+ Years Experience',
      opdTimings: '10:00 AM - 2:00 PM & 6:00 PM - 8:00 PM (Mon - Sat)',
      photoUrl: '/images/doctors/doc-paediatric.jpg',
      bio: 'Dr. Neha Sharma is a compassionate Paediatrician committed to infant health, child developmental monitoring, preventive vaccinations, and pediatric acute infection management.',
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      featured: true
    },
    {
      id: 'doc-ophthalmology',
      name: 'Dr. Rajesh K. Agarwal',
      nameHindi: 'डॉ. राजेश के. अग्रवाल',
      designation: 'Senior Consultant - Ophthalmology (Eye Specialist)',
      degrees: 'MBBS, MS (Ophthalmology)',
      specialties: [
        'Micro-Incision Phaco Cataract Surgery',
        'Glaucoma Screening & Medical Management',
        'Diabetic Retinopathy & Macular Evaluation',
        'Refractive Errors, LASIK Counseling & Dry Eye',
        'Pterygium & Corneal Surface Disorders'
      ],
      specialtiesHindi: [
        'नेत्र रोग विशेषज्ञ (आई स्पेशलिस्ट)',
        'फेको विधि द्वारा मोतियाबिंद का बिना टांके का ऑपरेशन',
        'काला पानी (ग्लूकोमा) एवं रेटिना जांच',
        'आंखों का नंबर, चश्मा व ड्राई आई उपचार'
      ],
      experience: '14+ Years Experience',
      opdTimings: '11:00 AM - 3:00 PM (Mon - Sat)',
      photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
      bio: 'Dr. Rajesh K. Agarwal provides advanced eye microsurgery, stitchless cataract removal with premium intraocular lens implantation, and preventive ophthalmology.',
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      featured: false
    },
    {
      id: 'doc-urologist',
      name: 'Dr. Arvind Singhal',
      nameHindi: 'डॉ. अरविंद सिंघल',
      designation: 'Consultant Urologist & Andrologist',
      degrees: 'MBBS, MS, MCh (Urology)',
      specialties: [
        'Endoscopic Kidney & Bladder Stone Surgery (PCNL, URS, RIRS)',
        'Laser Prostate Surgery (TURP, HoLEP)',
        'Urethral Stricture & Reconstructive Urology',
        'Urinary Incontinence & Bladder Disorders',
        'Male Infertility & Sexual Dysfunction'
      ],
      specialtiesHindi: [
        'मूत्र रोग एवं पथरी विशेषज्ञ (यूरोलॉजिस्ट)',
        'बिना चीर-फाड़ दूरबीन व लेजर से पथरी का ऑपरेशन',
        'प्रोस्टेट ग्रंथि का लेजर ऑपरेशन',
        'पेशाब में रुकावट एवं पुरुषों के गुप्त रोग'
      ],
      experience: '12+ Years Experience',
      opdTimings: '1:00 PM - 4:00 PM (Mon, Wed, Fri)',
      photoUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
      bio: 'Dr. Arvind Singhal provides comprehensive urological and andrological care utilizing state-of-the-art holmium laser technologies for urinary stones and prostate enlargements.',
      availableDays: ['Monday', 'Wednesday', 'Friday'],
      featured: false
    },
    {
      id: 'doc-cardiologist',
      name: 'Dr. Alok Verma',
      nameHindi: 'डॉ. आलोक वर्मा',
      designation: 'Consultant Interventional Cardiologist',
      degrees: 'MBBS, MD, DM (Cardiology)',
      specialties: [
        'Preventive & Clinical Cardiology',
        '2D Echocardiography & Color Doppler',
        'Treadmill Testing (TMT) & Holter Monitoring',
        'Hypertension, Heart Failure & Coronary Artery Disease',
        'Cardiac Risk Factor Assessment & Post-Angioplasty Care'
      ],
      specialtiesHindi: [
        'हृदय रोग विशेषज्ञ (कार्डियोलॉजिस्ट)',
        'ईकोकार्डियोग्राफी (2D Echo) एवं टीएमटी जांच',
        'दिल का दौरा, हाई बीपी एवं छाती दर्द परामर्श',
        'हार्ट फेलियर एवं पोस्ट-एंजियोप्लास्टी देखभाल'
      ],
      experience: '13+ Years Experience',
      opdTimings: '12:00 PM - 4:00 PM (Tue, Thu, Sat)',
      photoUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80',
      bio: 'Dr. Alok Verma is an experienced cardiologist focusing on rapid detection of ischemic heart disease, comprehensive non-invasive cardiac evaluation, and long-term cardiac rehab.',
      availableDays: ['Tuesday', 'Thursday', 'Saturday'],
      featured: true
    },
    {
      id: 'doc-anaesthetist',
      name: 'Dr. Vikas Choudhary',
      nameHindi: 'डॉ. विकास चौधरी',
      designation: 'Consultant Anaesthesiologist & Critical Care Specialist',
      degrees: 'MBBS, MD (Anaesthesiology)',
      specialties: [
        'General, Regional & Neuro Anaesthesia',
        'Labor Analgesia (Painless Delivery Services)',
        'Surgical Resuscitation & Airway Management',
        'Post-Operative Acute Pain Relief',
        'Intensive Care Unit (ICU) Patient Stabilization'
      ],
      specialtiesHindi: [
        'निश्चेतना विशेषज्ञ (एनेस्थीसिया एवं क्रिटिकल केयर)',
        'दर्द रहित प्रसव (Painless Delivery) सुविधा',
        'गंभीर ऑपरेशन में बेहोशी एवं मॉनिटरिंग',
        'क्रिटिकल केयर एवं दर्द निवारण'
      ],
      experience: '11+ Years Experience',
      opdTimings: '24×7 On Call & OT Services',
      photoUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80',
      bio: 'Dr. Vikas Choudhary oversees perioperative safety, painless delivery management, and clinical anaesthesiology protocols across all modular surgical theatres.',
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      featured: false
    },
    {
      id: 'doc-radiologist',
      name: 'Dr. Priya Rathore',
      nameHindi: 'डॉ. प्रिया राठौड़',
      designation: 'Consultant Radiologist & Sonologist',
      degrees: 'MBBS, MD (Radio-Diagnosis)',
      specialties: [
        'Color Doppler & 4D Obstetric Sonography',
        'Anomaly Scan (Level II) & NTNB Early Fetal Screening',
        'High-Resolution Multi-Slice CT Scan Reporting',
        'Digital Radiography (X-Ray) Interpretation',
        'Ultrasound Guided Interventional Procedures'
      ],
      specialtiesHindi: [
        'रेडियोलॉजिस्ट एवं सोनोलॉजिस्ट',
        'रंगीन सोनोग्राफी (Color Doppler & NTNB Scan)',
        'सीटी स्कैन एवं डिजिटल एक्स-रे विशेषज्ञ',
        'गर्भावस्था में शिशु की बनावट जांच (Anomaly Scan)'
      ],
      experience: '9+ Years Experience',
      opdTimings: '9:00 AM - 2:00 PM & 4:00 PM - 7:00 PM (Mon - Sat)',
      photoUrl: 'https://images.unsplash.com/photo-1594824813576-92c24c7f072c?auto=format&fit=crop&w=800&q=80',
      bio: 'Dr. Priya Rathore delivers high-precision radiological diagnostic reporting, specialized fetal anomaly screening, and vascular doppler assessments.',
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      featured: false
    },
    {
      id: 'doc-pathologist',
      name: 'Dr. Sunita Meena',
      nameHindi: 'डॉ. सुनीता मीणा',
      designation: 'Consultant Pathologist & Lab Director',
      degrees: 'MBBS, MD (Pathology)',
      specialties: [
        'Clinical Haematology & Coagulation Studies',
        'Biochemistry & Hormonal Assays',
        'Cytopathology & Fine Needle Aspiration (FNAC)',
        'Histopathology & Surgical Biopsy Reporting',
        'Laboratory Quality Control & Microbiology'
      ],
      specialtiesHindi: [
        'पैथोलॉजिस्ट एवं लैब डायरेक्टर',
        'खून, पेशाब व शरीर के द्रवों की संपूर्ण जांच',
        'बायोकेमिस्ट्री, थायरॉइड एवं हार्मोनल टेस्ट',
        'बायोप्सी एवं कैंसर जांच (FNAC)'
      ],
      experience: '10+ Years Experience',
      opdTimings: '9:00 AM - 5:00 PM (Mon - Sat)',
      photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
      bio: 'Dr. Sunita Meena directs the diagnostic laboratory operations at Oxford Hospital, ensuring rigorous accuracy standards, rapid emergency reporting, and certified testing quality.',
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      featured: false
    },
    {
      id: 'doc-dentist',
      name: 'Dr. Manju Rao',
      nameHindi: 'डॉ. मंजू राव',
      designation: 'Consultant Dental Surgeon & Specialist',
      degrees: 'BDS, MDS',
      specialties: [
        'Rotary Single-Sitting Root Canal Treatment (RCT)',
        'Dental Implants & Cosmetic Restorations',
        'Surgical Extraction of Impacted Wisdom Teeth',
        'Crowns, Bridges & Veneers',
        'Ultrasonic Scaling, Periodontal Therapy & Teeth Whitening'
      ],
      specialtiesHindi: [
        'दंत रोग विशेषज्ञ (डेंटल सर्जन)',
        'सिंगल सिटिंग आरसीटी (Root Canal Treatment)',
        'दांत लगाना (Dental Implants & Crowns)',
        'अक्ल दाढ़ का दर्द रहित निष्कर्षण'
      ],
      experience: '8+ Years Experience',
      opdTimings: '10:00 AM - 2:00 PM & 5:00 PM - 8:00 PM (Mon - Sat)',
      photoUrl: '/images/doctors/doc-dentist.jpg',
      bio: 'Dr. Manju Rao provides comprehensive dental consultations, painless restorations, smile aesthetics, and oral healthcare at Oxford Hospital.',
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      featured: false
    },
    {
      id: 'doc-physiotherapy',
      name: 'Dr. Manish Jangid',
      nameHindi: 'डॉ. मनीष जांगिड़',
      designation: 'Consultant Physiotherapist & Rehabilitation Specialist',
      degrees: 'BPT, MPT (Orthopaedics & Sports Rehab)',
      specialties: [
        'Post-Surgical Joint Replacement Rehabilitation',
        'Stroke, Paralysis & Neurological Rehabilitation',
        'Cervical, Spondylitis & Lumbar Disc Herniation Rehab',
        'Sports Injury Rehabilitation & Muscle Strengthening',
        'Advanced Electrotherapy & Ultrasound Pain Relief'
      ],
      specialtiesHindi: [
        'फिजियोथेरेपिस्ट एवं रिहैबिलिटेशन विशेषज्ञ',
        'ऑपरेशन एवं फ्रैक्चर के बाद फिजियोथेरेपी',
        'लकवा, स्लिप डिस्क व साइटिका का व्यायाम उपचार',
        'गर्दन, कमर व घुटनों के दर्द से राहत'
      ],
      experience: '7+ Years Experience',
      opdTimings: '9:00 AM - 1:00 PM & 4:00 PM - 7:00 PM (Mon - Sat)',
      photoUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
      bio: 'Dr. Manish Jangid heads the physiotherapy and mobility recovery department at Oxford Hospital, helping patients regain painless movement and physical independence.',
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      featured: false
    }
  ],
  gallery: [
    {
      id: 'gal-1',
      title: 'Oxford Hospital Main Reception & MAA Yojana Desk',
      category: 'Waiting Area',
      imageUrl: '/images/gallery/oxford-reception.jpg'
    },
    {
      id: 'gal-2',
      title: 'Oxford Diagnostic Center & Patient Waiting Lobby',
      category: 'Lab',
      imageUrl: '/images/gallery/oxford-diagnostic-center.jpg'
    },
    {
      id: 'gal-3',
      title: 'In-Patient Department (IPD) Multi-Bed Wards',
      category: 'Ward',
      imageUrl: '/images/gallery/oxford-inpatient-ward.jpg'
    },
    {
      id: 'gal-4',
      title: 'Intensive Care Unit (ICU) Patient Monitoring Station',
      category: 'IPD',
      imageUrl: '/images/gallery/oxford-icu-monitoring.jpg'
    },
    {
      id: 'gal-5',
      title: 'Doctor OPD Consultation Suite & Clinical Chamber',
      category: 'Indoor',
      imageUrl: '/images/gallery/oxford-doctor-consultation.jpg'
    }
  ],
  customPages: [],
  specialCampaigns: [],
  branches: [
    {
      id: 'branch-jhunjhunu',
      name: 'Oxford Multispeciality Hospital',
      hindiName: 'ऑक्सफोर्ड मल्टीस्पेशलिटी हॉस्पिटल',
      badge: 'Main Branch / मुख्य शाखा',
      tagline: 'बेहतर इलाज की शुरुआत, सही जगह से।',
      address: 'Churu Baipass Tiraha, Jhunjhunu, Rajasthan',
      addressHindi: 'चूरू बाईपास तिराहा, झुंझुनूं',
      phone: '9460841406',
      whatsapp: '9460841406',
      timings: '24×7 Emergency & Trauma | Daily OPD 9:00 AM - 8:00 PM',
      timingsHindi: '24×7 आपातकालीन सेवाएँ | ओपीडी: प्रातः 9 से सायं 8 बजे तक',
      services: [
        'General & Internal Medicine',
        'Dental & Oral Surgery',
        'Eye Care / Ophthalmology',
        'Physiotherapy & Rehabilitation',
        'Gynaecology & Obstetrics',
        'General & Laparoscopic Surgery'
      ],
      schemes: ['ECHS', 'RGHS', 'ESIC', 'CAPF', 'MAA Yojana'],
      googleMapsUrl: 'https://maps.google.com/?q=Oxford+Multispeciality+Hospital+Churu+Bypass+Tiraha+Jhunjhunu',
      isMainBranch: true
    },
    {
      id: 'branch-rajgarh',
      name: 'Ayushman Hospital Rajgarh',
      hindiName: 'आयुष्मान हॉस्पिटल राजगढ़',
      badge: 'Rajgarh Branch / राजगढ़ शाखा',
      tagline: 'ऑक्सफोर्ड हॉस्पिटल झुंझुनू द्वारा संचालित',
      doctorName: 'Dr H. ALTAF',
      doctorDegree: 'MBBS, MD (Internal Medicine)',
      doctorRole: 'Fellowship in Critical Society • Senior Consultant Physician',
      address: 'Opposite Krishi Mandi, Rajgarh, Churu, Rajasthan',
      addressHindi: 'कृषि मंडी के सामने, राजगढ़, चूरू',
      phone: '9257841406',
      whatsapp: '9257841406',
      timings: 'Daily Physician Consultation & Critical Care OPD',
      timingsHindi: 'दैनिक फिजिशियन परामर्श एवं क्रिटिकल केयर ओपीडी',
      services: [
        'बुखार एवं संक्रमण (Fever & Infection)',
        'BP एवं Diabetes (Hypertension & Diabetes)',
        'कमजोरी एवं थकान (Weakness & Fatigue)',
        'सिरदर्द एवं चक्कर (Headache & Dizziness)',
        'सांस संबंधी समस्याएँ (Respiratory Ailments)',
        'सामान्य एवं जटिल स्वास्थ्य समस्याएँ'
      ],
      schemes: ['ECHS', 'RGHS', 'ESIC', 'CAPF', 'MAA Yojana'],
      googleMapsUrl: 'https://maps.google.com/?q=Ayushman+Hospital+Opposite+Krishi+Mandi+Rajgarh+Churu'
    },
    {
      id: 'branch-sultana',
      name: 'Oxford Hospital Sultana',
      hindiName: 'ऑक्सफोर्ड हॉस्पिटल सुल्ताना',
      badge: 'Sultana Branch / सुल्ताना शाखा',
      tagline: 'मल्टीस्पेशलिटी हॉस्पिटल - सही समय पर इलाज ही समझदारी है',
      doctorName: 'डॉ प्रमोद शेखावत (Dr. Pramod Shekhawat)',
      doctorDegree: 'BDS (R.U.H.S)',
      doctorRole: 'Endodontics & Conservative Procedure (RCT) • Exodontia & Periodontal',
      address: 'Tekra Stand, Sultana, Rajasthan',
      addressHindi: 'टेकड़ा स्टैंड, सुल्ताना',
      phone: '9256841406',
      whatsapp: '9256841406',
      timings: 'Daily Dental & Multi-Speciality OPD Care',
      timingsHindi: 'दैनिक दंत चिकित्सा एवं मल्टीस्पेशलिटी ओपीडी',
      services: [
        'दाँतों में दर्द का त्वरित उपचार',
        'कैविटी एवं कीड़ा लगना (Dental Filling)',
        'मसूड़ों से खून आना व पायरिया उपचार',
        'रूट केनाल ट्रीटमेंट (Painless RCT)',
        'दाँतों में पीलापन व टीथ वाइटनिंग',
        'दाँतों की संवेदनशीलता (Sensitivity Relief)'
      ],
      schemes: ['ECHS', 'RGHS', 'ESIC', 'CAPF', 'MAA Yojana'],
      googleMapsUrl: 'https://maps.google.com/?q=Oxford+Hospital+Tekra+Stand+Sultana'
    }
  ]
};

async function seed() {
  console.log('Connecting to MongoDB Atlas (oxford-hms)...');
  await mongoose.connect(MONGODB_URI, { dbName: 'oxford-hms' });
  console.log('✅ Connected.');

  const db = mongoose.connection.db;

  // 1. Seed site_contents
  console.log('Upserting site_contents (key: main_content)...');
  await db.collection('site_contents').updateOne(
    { key: 'main_content' },
    { $set: siteContent },
    { upsert: true }
  );
  console.log('✅ site_contents seeded with 12 services and 13 doctors.');

  // 2. Seed admin_auth
  console.log('Checking / Upserting admin credentials...');
  const existingAdmin = await db.collection('admin_auth').findOne({});
  if (!existingAdmin) {
    await db.collection('admin_auth').insertOne({
      email: 'admin@oxfordhospital.com',
      password: 'admin',
      name: 'Oxford Hospital Administrator',
      role: 'Super Admin',
      lastUpdated: new Date().toISOString()
    });
    console.log('✅ Initial admin created (admin@oxfordhospital.com / admin)');
  } else {
    await db.collection('admin_auth').updateOne(
      { _id: existingAdmin._id },
      { $set: { name: 'Oxford Hospital Administrator' } }
    );
    console.log('✅ Existing admin updated.');
  }

  console.log('🎉 Seeding completed successfully!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
