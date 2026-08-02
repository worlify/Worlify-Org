import heroSchoolGirl from '../assets/images/hero_school_girl.png';
import shikshaNaRuke from '../assets/images/shiksha_na_ruke.jpg';
import educationSuppliesDistribution from '../assets/images/education_supplies_distribution.jpg';
import dailyMealChild from '../assets/images/daily_meal_child.jpg';
import animalRescueNight from '../assets/images/animal_rescue_night.jpg';
import animalFeedingNight from '../assets/images/animal_feeding_night.jpg';
import skillPlacementTeam from '../assets/images/skill_placement_team.jpg';
import ourStoryKids from '../assets/images/our_story_kids.jpg';
import awardCeremony from '../assets/images/award_ceremony.png';
import lxminaDevi from '../assets/images/lxmina_devi.jpg';
import sliderNew1 from '../assets/images/slider_new1.jpg';
import sliderNew2 from '../assets/images/slider_new2.jpg';
import sliderNew4 from '../assets/images/slider_new4.jpg';
import educationClassroomGirls from '../assets/images/education_classroom_girls.jpg';
import povertyAlleviationGirlsSnacks from '../assets/images/poverty_alleviation_girls_snacks.jpg';

export const CAUSES_DATA = {
  education: {
    id: 'education',
    slug: 'education',
    tabKey: 'causes-education',
    title: 'Education',
    subtitle: 'ILLUMINATING MINDS, SHAPING TOMORROW',
    heading: 'Educate a Child, Transform an Entire Generation',
    description: 'We break generational poverty cycles by funding quality schooling, digital literacy labs, rural scholarships, and mentorship programs for underprivileged youth.',
    badge: '100% Transparent Impact',
    colors: {
      primary: '#2563eb',
      secondary: '#10b981',
      gradient: 'linear-gradient(135deg, #2563eb 0%, #10b981 100%)',
      lightBg: 'rgba(37, 99, 235, 0.06)',
      darkBg: 'rgba(37, 99, 235, 0.15)',
      border: 'rgba(37, 99, 235, 0.25)',
      glow: 'rgba(37, 99, 235, 0.3)'
    },
    heroImage: typeof heroSchoolGirl === 'string' ? heroSchoolGirl : heroSchoolGirl.src,
    howWeHelp: [
      {
        id: 'sch-supplies',
        iconName: 'BookOpen',
        title: 'School Supplies',
        description: 'Providing free textbooks, uniforms, bags, and learning kits to young learners in rural districts.'
      },
      {
        id: 'scholarships',
        iconName: 'GraduationCap',
        title: 'Scholarships',
        description: 'Full-ride academic scholarships for high-potential students facing extreme economic hardship.'
      },
      {
        id: 'digital-learning',
        iconName: 'Laptop',
        title: 'Digital Learning',
        description: 'Setting up computer labs, solar tablets, and internet hubs across underserved community schools.'
      },
      {
        id: 'mentorship',
        iconName: 'Users',
        title: 'Mentorship',
        description: 'Pairing students with educated professionals for career pathing, guidance, and soft skills training.'
      }
    ],
    impactStats: [
      { number: 150, suffix: '+', label: 'Children Supported', iconName: 'GraduationCap' },
      { number: 12, suffix: '+', label: 'School Projects', iconName: 'School' },
      { number: 18, suffix: '+', label: 'Active Mentors', iconName: 'Users' },
      { number: 3, suffix: '', label: 'States Reached', iconName: 'MapPin' }
    ],
    gallery: [
      { url: typeof shikshaNaRuke === 'string' ? shikshaNaRuke : shikshaNaRuke.src, caption: 'Digital classroom session in rural Bihar' },
      { url: typeof educationSuppliesDistribution === 'string' ? educationSuppliesDistribution : educationSuppliesDistribution.src, caption: 'Stationery and educational kit distribution for children' },
      { url: typeof ourStoryKids === 'string' ? ourStoryKids : ourStoryKids.src, caption: 'After-school mentorship and homework help' },
      { url: typeof educationClassroomGirls === 'string' ? educationClassroomGirls : educationClassroomGirls.src, caption: 'Joyful students in primary learning hub' }
    ],
    cta: {
      headline: 'Together We Can Educate The Next Generation',
      subtext: 'Your contribution directly sponsors tuition, books, and technology for children eager to learn.'
    }
  },

  'food-nutrition': {
    id: 'food-nutrition',
    slug: 'food-nutrition',
    tabKey: 'causes-food-nutrition',
    title: 'Food & Nutrition',
    subtitle: 'ZERO HUNGER, NUTRITIOUS FUTURES',
    heading: 'Nourishing Hungry Children & Vulnerable Families Every Day',
    description: 'Hunger steals dreams. We run daily community kitchens, school mid-day meal drives, and emergency ration distributions to eradicate child malnutrition.',
    badge: 'Daily Meal Program Active',
    colors: {
      primary: '#ea580c',
      secondary: '#eab308',
      gradient: 'linear-gradient(135deg, #ea580c 0%, #eab308 100%)',
      lightBg: 'rgba(234, 88, 12, 0.06)',
      darkBg: 'rgba(234, 88, 12, 0.15)',
      border: 'rgba(234, 88, 12, 0.25)',
      glow: 'rgba(234, 88, 12, 0.3)'
    },
    heroImage: typeof dailyMealChild === 'string' ? dailyMealChild : dailyMealChild.src,
    howWeHelp: [
      {
        id: 'warm-meals',
        iconName: 'Utensils',
        title: 'Fresh Warm Meals',
        description: 'Cooking and serving freshly prepared, hygenic, nutrient-balanced hot meals daily.'
      },
      {
        id: 'school-feed',
        iconName: 'Apple',
        title: 'School Nutrition Drives',
        description: 'Providing daily protein-rich mid-day snacks and milk to rural school children.'
      },
      {
        id: 'ration-kits',
        iconName: 'Package',
        title: 'Monthly Ration Kits',
        description: 'Distributing rice, pulses, oil, wheat flour, and essential spices to destitute households.'
      },
      {
        id: 'malnutrition-check',
        iconName: 'Activity',
        title: 'Malnutrition Screenings',
        description: 'Tracking child growth charts and providing therapeutic food supplements for severely underweight kids.'
      }
    ],
    impactStats: [
      { number: 500, suffix: '+', label: 'Meals Served', iconName: 'Utensils' },
      { number: 120, suffix: '+', label: 'Ration Kits Gifted', iconName: 'Package' },
      { number: 4, suffix: '+', label: 'Community Kitchens', iconName: 'Home' },
      { number: 3, suffix: '', label: 'Districts Covered', iconName: 'MapPin' }
    ],
    gallery: [
      { url: typeof sliderNew1 === 'string' ? sliderNew1 : sliderNew1.src, caption: 'Community meal distribution drive' },
      { url: typeof sliderNew2 === 'string' ? sliderNew2 : sliderNew2.src, caption: 'Healthy breakfast served to primary students' },
      { url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800', caption: 'Monthly ration package delivery campaign' },
      { url: typeof sliderNew4 === 'string' ? sliderNew4 : sliderNew4.src, caption: 'Volunteer Team' }
    ],
    cta: {
      headline: 'No Child Should Ever Go To Bed Hungry',
      subtext: 'A contribution of just ₹500 can nourish a child with healthy warm meals for an entire month.'
    }
  },

  healthcare: {
    id: 'healthcare',
    slug: 'healthcare',
    tabKey: 'causes-healthcare',
    title: 'Healthcare',
    subtitle: 'HEALTHY COMMUNITIES, SAVING LIVES',
    heading: 'Bringing Medical Care to the World’s Most Remote Corners',
    description: 'Access to basic healthcare is a fundamental right. We operate mobile medical clinics, maternal care centers, emergency surgeries, and free health checkup camps.',
    badge: 'Mobile Health Squad Active',
    colors: {
      primary: '#dc2626',
      secondary: '#ef4444',
      gradient: 'linear-gradient(135deg, #dc2626 0%, #f43f5e 100%)',
      lightBg: 'rgba(220, 38, 38, 0.06)',
      darkBg: 'rgba(220, 38, 38, 0.15)',
      border: 'rgba(220, 38, 38, 0.25)',
      glow: 'rgba(220, 38, 38, 0.3)'
    },
    heroImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1000',
    howWeHelp: [
      {
        id: 'mobile-clinics',
        iconName: 'Ambulance',
        title: 'Mobile Medical Vans',
        description: 'Fully equipped medical vans traveling to isolated villages with doctors, diagnostic tools, and medicines.'
      },
      {
        id: 'maternal-care',
        iconName: 'HeartPulse',
        title: 'Maternal & Newborn Care',
        description: 'Ensuring safe deliveries, prenatal care, and infant healthcare support for young mothers.'
      },
      {
        id: 'free-medicine',
        iconName: 'Pill',
        title: 'Essential Medicines',
        description: 'Distributing vital prescription drugs, vaccines, and hygiene kits free of cost to those in need.'
      },
      {
        id: 'health-camps',
        iconName: 'Stethoscope',
        title: 'Diagnostic Checkup Camps',
        description: 'Specialist doctors holding eye care, dental, diabetes, and general health camps in rural belts.'
      }
    ],
    impactStats: [
      { number: 100, suffix: '+', label: 'Patients Treated', iconName: 'Stethoscope' },
      { number: 10, suffix: '+', label: 'Free Health Camps', iconName: 'HeartPulse' },
      { number: 1, suffix: '+', label: 'Mobile Vans Active', iconName: 'Ambulance' },
      { number: 2, suffix: '', label: 'States Reached', iconName: 'MapPin' }
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800', caption: 'Doctor conducting routine child checkup in rural camp' },
      { url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800', caption: 'Mobile healthcare unit arriving at remote village' },
      { url: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=800', caption: 'Eye checkup and free spectacles distribution' },
      { url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800', caption: 'Distributing essential maternal care kits' }
    ],
    cta: {
      headline: 'Help Us Bring Life-Saving Medical Care To Those In Need',
      subtext: 'Your donation funds life-saving emergency medicine, surgeries, and rural mobile healthcare vans.'
    }
  },

  'human-rights': {
    id: 'human-rights',
    slug: 'human-rights',
    tabKey: 'causes-human-rights',
    title: 'Human Rights',
    subtitle: 'JUSTICE, DIGNITY, EQUALITY FOR ALL',
    heading: 'Defending Human Rights & Standing Up for the Vulnerable',
    description: 'We fight for human dignity, gender equality, legal aid, protection from systemic exploitation, and legal rights advocacy for marginalized communities.',
    badge: 'Legal Aid Network Active',
    colors: {
      primary: '#7c3aed',
      secondary: '#a855f7',
      gradient: 'linear-gradient(135deg, #7c3aed 0%, #c084fc 100%)',
      lightBg: 'rgba(124, 58, 237, 0.06)',
      darkBg: 'rgba(124, 58, 237, 0.15)',
      border: 'rgba(124, 58, 237, 0.25)',
      glow: 'rgba(124, 58, 237, 0.3)'
    },
    heroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1000',
    howWeHelp: [
      {
        id: 'legal-aid',
        iconName: 'Scale',
        title: 'Free Legal Representation',
        description: 'Providing expert pro-bono lawyers and legal counsel to victims of discrimination and exploitation.'
      },
      {
        id: 'anti-exploitation',
        iconName: 'Shield',
        title: 'Anti-Trafficking Safeguards',
        description: 'Rescuing and rehabilitating young women and children from illegal human trafficking networks.'
      },
      {
        id: 'rights-awareness',
        iconName: 'Megaphone',
        title: 'Rights Awareness Workshops',
        description: 'Educating grassroots citizens about constitutional rights, labor laws, and social welfare entitlement schemes.'
      },
      {
        id: 'gender-justice',
        iconName: 'UserCheck',
        title: 'Gender Justice Networks',
        description: 'Establishing crisis intervention helplines and legal support forums for domestic abuse survivors.'
      }
    ],
    impactStats: [
      { number: 10, suffix: '+', label: 'Cases Advocated', iconName: 'Scale' },
      { number: 6, suffix: '+', label: 'Legal Aid Camps', iconName: 'Shield' },
      { number: 5, suffix: '+', label: 'Pro-Bono Lawyers', iconName: 'Users' },
      { number: 2, suffix: '', label: 'States Active', iconName: 'MapPin' }
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800', caption: 'Legal rights awareness seminar in community hall' },
      { url: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800', caption: 'Women leadership and self-advocacy workshop' },
      { url: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=800', caption: 'Grassroots human rights activists meeting' },
      { url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800', caption: 'Pro-bono legal consultation clinic' }
    ],
    cta: {
      headline: 'Stand Up For Human Dignity & Justice',
      subtext: 'Empower our legal defense team to fight for victims who cannot afford legal representation.'
    }
  },

  environment: {
    id: 'environment',
    slug: 'environment',
    tabKey: 'causes-environment',
    title: 'Environment',
    subtitle: 'SUSTAINABLE PLANET, GREENER TOMORROW',
    heading: 'Protecting Ecosystems & Championing Climate Resilience',
    description: 'Climate change impacts the most vulnerable first. We plant native forests, install solar clean water units, lead ocean cleanup drives, and advocate zero-waste practices.',
    badge: '1,200+ Trees Planted',
    colors: {
      primary: '#16a34a',
      secondary: '#22c55e',
      gradient: 'linear-gradient(135deg, #16a34a 0%, #10b981 100%)',
      lightBg: 'rgba(22, 163, 74, 0.06)',
      darkBg: 'rgba(22, 163, 74, 0.15)',
      border: 'rgba(22, 163, 74, 0.25)',
      glow: 'rgba(22, 163, 74, 0.3)'
    },
    heroImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000',
    howWeHelp: [
      {
        id: 'afforestation',
        iconName: 'Trees',
        title: 'Mass Plantation Drives',
        description: 'Planting indigenous trees and mangroves to restore depleted soil and combat climate degradation.'
      },
      {
        id: 'clean-water',
        iconName: 'Droplets',
        title: 'Solar Clean Water',
        description: 'Installing solar-powered groundwater purification units in drought-prone rural villages.'
      },
      {
        id: 'waste-mgmt',
        iconName: 'Recycle',
        title: 'Community Recycling',
        description: 'Implementing community composting, plastic recovery centers, and zero-waste education campaigns.'
      },
      {
        id: 'renewable-energy',
        iconName: 'Sun',
        title: 'Rural Solar Microgrids',
        description: 'Providing solar lanterns and clean cooking stoves to off-grid tribal settlements.'
      }
    ],
    impactStats: [
      { number: 500, suffix: '+', label: 'Trees Planted', iconName: 'Trees' },
      { number: 3, suffix: '+', label: 'Solar Water Hubs', iconName: 'Droplets' },
      { number: 15, suffix: '+', label: 'Clean-up Drives', iconName: 'Recycle' },
      { number: 2, suffix: '', label: 'Forest Zones Restored', iconName: 'MapPin' }
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800', caption: 'Volunteers planting saplings in reforestation drive' },
      { url: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&q=80&w=800', caption: 'Clean water system installation in drought zone' },
      { url: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&q=80&w=800', caption: 'Coastal mangrove restoration along riverbank' },
      { url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800', caption: 'Community plastic collection and sorting drive' }
    ],
    cta: {
      headline: 'Heal Our Planet, Plant A Tree Today',
      subtext: 'Your contribution funds saplings, water filtration units, and community environmental safeguards.'
    }
  },

  'animal-welfare': {
    id: 'animal-welfare',
    slug: 'animal-welfare',
    tabKey: 'causes-animal-welfare',
    title: 'Animal Welfare',
    subtitle: 'COMPASSION, RESCUE, HEALING',
    heading: 'Voicing the Voiceless & Safeguarding Animals in Distress',
    description: 'Every living creature deserves care and dignity. We run animal rescue ambulances, stray feeding drives, free vaccinations, and shelter rehabilitation centers.',
    badge: '24/7 Animal Rescue Active',
    colors: {
      primary: '#92400e',
      secondary: '#16a34a',
      gradient: 'linear-gradient(135deg, #a16207 0%, #16a34a 100%)',
      lightBg: 'rgba(146, 64, 14, 0.06)',
      darkBg: 'rgba(146, 64, 14, 0.15)',
      border: 'rgba(146, 64, 14, 0.25)',
      glow: 'rgba(146, 64, 14, 0.3)'
    },
    heroImage: typeof animalRescueNight === 'string' ? animalRescueNight : animalRescueNight.src,
    howWeHelp: [
      {
        id: 'animal-rescue',
        iconName: 'Ambulance',
        title: 'Emergency Animal Rescue',
        description: '24/7 mobile trauma care units responding to sick, injured, and abused animals on urban streets.'
      },
      {
        id: 'feeding-drives',
        iconName: 'Heart',
        title: 'Stray Feeding Program',
        description: 'Nourishing thousands of homeless street animals with fresh, healthy food daily.'
      },
      {
        id: 'vax-drives',
        iconName: 'Shield',
        title: 'Anti-Rabies Vaccinations',
        description: 'Protecting communities and strays through humane ABC (Animal Birth Control) and rabies vaccines.'
      },
      {
        id: 'shelter-rehab',
        iconName: 'Home',
        title: 'Safe Sanctuary Haven',
        description: 'Providing lifelong shelter, medical recovery, and loving care for abandoned or disabled animals.'
      }
    ],
    impactStats: [
      { number: 120, suffix: '+', label: 'Animals Rescued', iconName: 'Ambulance' },
      { number: 400, suffix: '+', label: 'Stray Meals Served', iconName: 'Heart' },
      { number: 90, suffix: '+', label: 'Vaccinations Given', iconName: 'Shield' },
      { number: 1, suffix: '', label: 'Animal Sanctuary', iconName: 'Home' }
    ],
    gallery: [
      { url: typeof animalFeedingNight === 'string' ? animalFeedingNight : animalFeedingNight.src, caption: 'Night stray animal feeding drive' },
      { url: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800', caption: 'Daily stray dog feeding drive in city' },
      { url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800', caption: 'Shelter cats receiving cozy care and food' },
      { url: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&q=80&w=800', caption: 'Injured animal being rehabilitated by vet team' }
    ],
    cta: {
      headline: 'Be A Guardian For Animals In Need',
      subtext: 'Your support provides critical veterinary surgery, emergency rescues, and daily meals to abandoned animals.'
    }
  },

  'skill-development': {
    id: 'skill-development',
    slug: 'skill-development',
    tabKey: 'causes-skill-development',
    title: 'Skill Development',
    subtitle: 'VOCATIONAL TRAINING, ECONOMIC EMPOWERMENT',
    heading: 'Unlocking Youth Potential Through Job-Ready Skills',
    description: 'True independence comes from sustainable livelihoods. We offer certified vocational courses in coding, tailoring, solar maintenance, healthcare assistance, and micro-entrepreneurship.',
    badge: '75% Placement Rate',
    colors: {
      primary: '#4f46e5',
      secondary: '#6366f1',
      gradient: 'linear-gradient(135deg, #4f46e5 0%, #818cf8 100%)',
      lightBg: 'rgba(79, 70, 229, 0.06)',
      darkBg: 'rgba(79, 70, 229, 0.15)',
      border: 'rgba(79, 70, 229, 0.25)',
      glow: 'rgba(79, 70, 229, 0.3)'
    },
    heroImage: typeof skillPlacementTeam === 'string' ? skillPlacementTeam : skillPlacementTeam.src,
    howWeHelp: [
      {
        id: 'vocational-training',
        iconName: 'Wrench',
        title: 'Technical & Trade Skills',
        description: 'Hands-on practical training in electronics, solar installation, automotive repair, and plumbing.'
      },
      {
        id: 'digital-skills',
        iconName: 'Code',
        title: 'Digital & Software Bootcamps',
        description: 'Teaching web design, basic coding, data entry, and digital marketing to rural high school grads.'
      },
      {
        id: 'artisan-handicrafts',
        iconName: 'Scissors',
        title: 'Textiles & Craftsmanship',
        description: 'Equipping women artisans with tailoring, embroidery, and eco-friendly product crafting skills.'
      },
      {
        id: 'job-placement',
        iconName: 'Briefcase',
        title: 'Job Placement Cell',
        description: 'Connecting certified skill graduates with formal employment partners and micro-loan seed capital.'
      }
    ],
    impactStats: [
      { number: 200, suffix: '+', label: 'Youth Skilled', iconName: 'Briefcase' },
      { number: 2, suffix: '+', label: 'Training Centers', iconName: 'Wrench' },
      { number: 5, suffix: '%', label: 'Job Placement', iconName: 'Award' },
      { number: 2, suffix: '', label: 'State Partnerships', iconName: 'MapPin' }
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800', caption: 'Youth computer literacy and digital skills class' },
      { url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800', caption: 'Electrical repair and solar technician workshop' },
      { url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800', caption: 'Women tailoring unit producing handcrafted garments' },
      { url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800', caption: 'Job placement interview orientation session' }
    ],
    cta: {
      headline: 'Empower Youth With Skills That Last A Lifetime',
      subtext: 'Your donation sponsors vocational certifications, equipment kits, and employment placement drives.'
    }
  },

  'poverty-alleviation': {
    id: 'poverty-alleviation',
    slug: 'poverty-alleviation',
    tabKey: 'causes-poverty-alleviation',
    title: 'Poverty Alleviation',
    subtitle: 'SUSTAINABLE LIVELIHOODS, DIGNIFIED LIVES',
    heading: 'Breaking the Cycle of Extreme Poverty Through Holistic Action',
    description: 'Poverty is complex and multidimensional. We combine sustainable income generation, micro-grants, affordable housing, clean sanitation, and financial inclusion.',
    badge: 'Holistic Impact Model',
    colors: {
      primary: '#0d9488',
      secondary: '#0284c7',
      gradient: 'linear-gradient(135deg, #0d9488 0%, #06b6d4 100%)',
      lightBg: 'rgba(13, 148, 136, 0.06)',
      darkBg: 'rgba(13, 148, 136, 0.15)',
      border: 'rgba(13, 148, 136, 0.25)',
      glow: 'rgba(13, 148, 136, 0.3)'
    },
    heroImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000',
    howWeHelp: [
      {
        id: 'micro-finance',
        iconName: 'Coins',
        title: 'Micro-Grants & Capital',
        description: 'Providing zero-interest micro-grants to help destitute families start small retail shops and agriculture.'
      },
      {
        id: 'housing-sanitation',
        iconName: 'Home',
        title: 'Dignified Shelter & Sanitation',
        description: 'Building disaster-resilient brick homes and hygienic toilets for homeless families.'
      },
      {
        id: 'agri-support',
        iconName: 'Sprout',
        title: 'Sustainable Farming Kits',
        description: 'Gifting drip irrigation, organic seeds, and bio-fertilizer kits to smallholder marginal farmers.'
      },
      {
        id: 'financial-inclusion',
        iconName: 'Landmark',
        title: 'Banking & Safety Nets',
        description: 'Opening bank accounts, securing government pension access, and insurance enrollment for laborers.'
      }
    ],
    impactStats: [
      { number: 180, suffix: '+', label: 'Families Uplifted', iconName: 'Home' },
      { number: 40, suffix: '+', label: 'Micro-Businesses Funded', iconName: 'Coins' },
      { number: 2, suffix: '+', label: 'Eco-Toilets Built', iconName: 'Sprout' },
      { number: 3, suffix: '', label: 'Districts Reached', iconName: 'MapPin' }
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800', caption: 'Community empowerment and micro-grant distribution' },
      { url: typeof povertyAlleviationGirlsSnacks === 'string' ? povertyAlleviationGirlsSnacks : povertyAlleviationGirlsSnacks.src, caption: 'Nutrition and food pack distribution for underprivileged children' },
      { url: typeof sliderNew4 === 'string' ? sliderNew4 : sliderNew4.src, caption: 'Dignified housing construction in progress' },
      { url: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=800', caption: 'Financial literacy camp for rural self-help groups' }
    ],
    cta: {
      headline: 'Help Us End Poverty, One Family At A Time',
      subtext: 'Your contribution provides micro-seed capital, housing, and sustainable income tools for destitute families.'
    }
  }
};
