import heroSchoolGirl from '../assets/images/hero_school_girl.png';
import shikshaNaRuke from '../assets/images/shiksha_na_ruke.jpg';
import ourStoryKids from '../assets/images/our_story_kids.jpg';
import awardCeremony from '../assets/images/award_ceremony.png';
import lxminaDevi from '../assets/images/lxmina_devi.jpg';
import sliderNew1 from '../assets/images/slider_new1.jpg';
import sliderNew2 from '../assets/images/slider_new2.jpg';
import sliderNew4 from '../assets/images/slider_new4.jpg';
import slider2 from '../assets/images/slider2.jpg';
import slider3 from '../assets/images/slider3.jpg';
import slider4 from '../assets/images/slider4.jpg';
import elderlyFoodRation from '../assets/images/elderly_food_ration.png';
import annSevaStall from '../assets/images/ann_seva_stall.jpg';
import saharaMobileVan from '../assets/images/sahara_mobile_van.jpg';
import apnaAashiyanaBranch from '../assets/images/apna_aashiyana_branch.jpg';
import jeevandanDonorBox from '../assets/images/jeevandan_donor_box.jpg';
import saharaHeroSupport from '../assets/images/sahara_hero_support.png';
import elderlyWelfareCheck from '../assets/images/elderly_welfare_check.png';
import homeRepairWidow from '../assets/images/home_repair_widow.png';
import cattleFodderDistribution from '../assets/images/cattle_fodder_distribution.png';
import brideHouseholdKit from '../assets/images/bride_household_kit.png';
import seniorMedicineDistribution from '../assets/images/senior_medicine_distribution.png';

export const CAMPAIGNS_LIST = [
  {
    id: 'padhaga-har-baccha',
    number: 1,
    tabKey: 'campaign-padhaga-har-baccha',
    title: 'Padhaga Har Baccha',
    subTitle: 'Child Education Support',
    reason: 'Education is the most fundamental and life-changing necessity, hence prioritized at the top.',
    category: 'Child Education & Literacy',
    badgeColor: '#16a34a'
  },
  {
    id: 'ann-seva',
    number: 2,
    tabKey: 'campaign-ann-seva',
    title: 'Ann Seva',
    subTitle: 'Food & Daily Nutrition',
    reason: 'Food is a basic necessity of life, prioritized right after education.',
    category: 'Zero Hunger & Daily Nutrition',
    badgeColor: '#ea580c'
  },
  {
    id: 'nayi-pehchaan',
    number: 3,
    tabKey: 'campaign-nayi-pehchaan',
    title: 'Nayi Pehchaan',
    subTitle: 'Skills to Livelihood',
    reason: 'After education and food, employment and skill development are essential for self-reliance.',
    category: 'Skill Development & Employment',
    badgeColor: '#2563eb'
  },
  {
    id: 'sahara',
    number: 4,
    tabKey: 'campaign-sahara',
    title: 'Sahara',
    subTitle: 'Universal Crisis Support',
    reason: 'This is a comprehensive welfare initiative providing multi-domain relief in every crisis.',
    category: 'Comprehensive Community Care',
    badgeColor: '#9333ea'
  },
  {
    id: 'apna-aashiyana',
    number: 5,
    tabKey: 'campaign-apna-aashiyana',
    title: 'Apna Aashiyana',
    subTitle: 'Housing & Shelter Support',
    reason: 'Safe shelter is a fundamental need that brings stability and dignity to human life.',
    category: 'Housing & Shelter Support',
    badgeColor: '#0d9488'
  },
  {
    id: 'umeed',
    number: 6,
    tabKey: 'campaign-umeed',
    title: 'Umeed',
    subTitle: 'Disaster & Emergency Relief',
    reason: 'Rapid assistance during natural disasters and emergencies is extremely critical for survival.',
    category: 'Disaster & Emergency Relief',
    badgeColor: '#dc2626'
  },
  {
    id: 'dharti-bachao',
    number: 7,
    tabKey: 'campaign-dharti-bachao',
    title: 'Dharti Bachao',
    subTitle: 'Green Environment Pledge',
    reason: 'Environmental protection and afforestation are vital for our sustainable future.',
    category: 'Environment & Tree Plantation',
    badgeColor: '#15803d'
  },
  {
    id: 'jeev-raksha',
    number: 8,
    tabKey: 'campaign-jeev-raksha',
    title: 'Jeev Raksha',
    subTitle: 'Animal Welfare & Protection',
    reason: 'Protecting and showing compassion towards animals and birds is an essential duty of society.',
    category: 'Animal Protection & Rescue',
    badgeColor: '#0284c7'
  },
  {
    id: 'beti-ki-muskan',
    number: 9,
    tabKey: 'campaign-beti-ki-muskan',
    title: 'Beti Ki Muskan',
    subTitle: 'Girl Child Education & Empowerment',
    reason: 'Empowering girl children through education, skills, and dignity builds a progressive and self-reliant society.',
    category: 'Girl Child Education & Skill Development',
    badgeColor: '#e11d48'
  },
  {
    id: 'jeevandan',
    number: 10,
    tabKey: 'campaign-jeevandan',
    title: 'Jeevandan',
    subTitle: 'Life-Saving Healthcare',
    reason: 'Healthcare services are paramount and must be sustained continuously for human life.',
    category: 'Healthcare & Medical Assistance',
    badgeColor: '#0891b2'
  }
];

export const CAMPAIGNS_DATA = {
  'padhaga-har-baccha': {
    id: 'padhaga-har-baccha',
    number: 1,
    slug: 'padhaga-har-baccha',
    tabKey: 'campaign-padhaga-har-baccha',
    title: 'Padhaga Har Baccha',
    subTitle: 'Child Education Support',
    reason: 'Education is the most fundamental and life-changing necessity, hence prioritized at the top.',
    heading: 'Educate Every Child, Empower India’s Tomorrow',
    description: 'Padhaga Har Baccha is our top priority flagship campaign dedicated to ensuring every underprivileged child gets access to quality schooling, books, uniforms, digital labs, and loving mentorship.',
    badge: 'Campaign #1 • Top Priority',
    colors: {
      primary: '#16a34a',
      secondary: '#22c55e',
      gradient: 'linear-gradient(135deg, #16a34a 0%, #10b981 100%)',
      lightBg: 'rgba(22, 163, 74, 0.06)',
      darkBg: 'rgba(22, 163, 74, 0.15)',
      border: 'rgba(22, 163, 74, 0.25)',
      glow: 'rgba(22, 163, 74, 0.3)'
    },
    heroImage: typeof heroSchoolGirl === 'string' ? heroSchoolGirl : heroSchoolGirl.src,
    howWeHelp: [
      {
        id: 'sch-kits',
        iconName: 'BookOpen',
        title: 'Free Learning Kits',
        description: 'Providing textbooks, bags, stationery, and school uniforms to rural students in need.'
      },
      {
        id: 'scholarships',
        iconName: 'GraduationCap',
        title: 'Merit & Need Scholarships',
        description: 'Direct financial assistance covering annual school fees for children from vulnerable families.'
      },
      {
        id: 'digital-class',
        iconName: 'Laptop',
        title: 'Digital Smart Classrooms',
        description: 'Equipping rural government schools with solar computers, tablets, and interactive tools.'
      },
      {
        id: 'tuition-centers',
        iconName: 'Users',
        title: 'After-School Remedial Hubs',
        description: 'Operating free neighborhood coaching centers to prevent school dropouts.'
      }
    ],
    impactStats: [
      { number: 400, suffix: '+', label: 'Children Educated', iconName: 'GraduationCap' },
      { number: 15, suffix: '+', label: 'Schools Supported', iconName: 'School' },
      { number: 35, suffix: '+', label: 'Dedicated Tutors', iconName: 'Users' },
      { number: 100, suffix: '%', label: 'Transparency', iconName: 'CheckCircle' }
    ],
    gallery: [
      { url: typeof heroSchoolGirl === 'string' ? heroSchoolGirl : heroSchoolGirl.src, caption: 'Smiling student receiving new study material' },
      { url: typeof shikshaNaRuke === 'string' ? shikshaNaRuke : shikshaNaRuke.src, caption: 'Interactive learning session in primary hub' },
      { url: typeof ourStoryKids === 'string' ? ourStoryKids : ourStoryKids.src, caption: 'After-school mentorship and homework guidance' },
      { url: typeof awardCeremony === 'string' ? awardCeremony : awardCeremony.src, caption: 'Annual scholarship distribution event' }
    ],
    cta: {
      headline: 'Support Padhaga Har Baccha Campaign',
      subtext: 'Your contribution of even ₹500/month guarantees a child stays in school for a full academic term.'
    }
  },

  'ann-seva': {
    id: 'ann-seva',
    number: 2,
    slug: 'ann-seva',
    tabKey: 'campaign-ann-seva',
    title: 'Ann Seva',
    subTitle: 'Food & Daily Nutrition',
    reason: 'Food is a basic necessity of life, prioritized right after education.',
    heading: 'Erasing Hunger, Serving Hot Nutritious Meals Daily',
    description: 'Ann Seva is committed to providing warm, hygienic, and wholesome meals to daily wage earners, pavement dwellers, patients, and malnourished children across urban and rural slums.',
    badge: 'Campaign #2 • Zero Hunger',
    colors: {
      primary: '#ea580c',
      secondary: '#f97316',
      gradient: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
      lightBg: 'rgba(234, 88, 12, 0.06)',
      darkBg: 'rgba(234, 88, 12, 0.15)',
      border: 'rgba(234, 88, 12, 0.25)',
      glow: 'rgba(234, 88, 12, 0.3)'
    },
    heroImage: typeof sliderNew1 === 'string' ? sliderNew1 : sliderNew1.src,
    howWeHelp: [
      {
        id: 'daily-kitchens',
        iconName: 'Utensils',
        title: 'Community Mobile Kitchens',
        description: 'Preparing and serving fresh hot meals (Dal, Rice, Vegetables, Roti) to homeless families.'
      },
      {
        id: 'ration-kits',
        iconName: 'Package',
        title: 'Monthly Dry Ration Kits',
        description: 'Distributing rice, flour, pulses, oil, and spices to low-income households.'
      },
      {
        id: 'hospital-food',
        iconName: 'HeartHandshake',
        title: 'Hospital Patient Meal Service',
        description: 'Providing free meals to caretakers of poor patients outside public civil hospitals.'
      },
      {
        id: 'child-nutrition',
        iconName: 'ShieldCheck',
        title: 'Child Malnutrition Support',
        description: 'Providing protein-rich snacks, milk, and fortified nutrition packs to toddlers.'
      }
    ],
    impactStats: [
      { number: 5, suffix: 'K+', label: 'Warm Meals Served', iconName: 'Utensils' },
      { number: 450, suffix: '+', label: 'Ration Kits Distributed', iconName: 'Package' },
      { number: 8, suffix: '+', label: 'Food Distribution Points', iconName: 'MapPin' },
      { number: 365, suffix: ' Days', label: 'Active Kitchens', iconName: 'Clock' }
    ],
    gallery: [
      { url: typeof sliderNew1 === 'string' ? sliderNew1 : sliderNew1.src, caption: 'Volunteers distributing fresh meals in community drives' },
      { url: typeof sliderNew2 === 'string' ? sliderNew2 : sliderNew2.src, caption: 'Nutritious lunch distribution for children' },
      { url: typeof sliderNew4 === 'string' ? sliderNew4 : sliderNew4.src, caption: 'Packaging hygienic dry ration kits' },
      { url: typeof annSevaStall === 'string' ? annSevaStall : annSevaStall.src, caption: 'Worlify Foundation Ann Seva meal stall drive' }
    ],
    cta: {
      headline: 'Feed a Hungry Soul Today through Ann Seva',
      subtext: 'Just ₹50 can provide a warm, nutritious meal to a person in desperate need.'
    }
  },

  'nayi-pehchaan': {
    id: 'nayi-pehchaan',
    number: 3,
    slug: 'nayi-pehchaan',
    tabKey: 'campaign-nayi-pehchaan',
    title: 'Nayi Pehchaan',
    subTitle: 'Skills to Livelihood',
    reason: 'After education and food, employment and skill development are essential for self-reliance.',
    heading: 'Skills to Livelihood: Empowering Youth & Women',
    description: 'Nayi Pehchaan transforms lives by offering market-aligned vocational training, computer skills, tailoring, electric work, and micro-entrepreneurship support for youth and women.',
    badge: 'Campaign #3 • Skill & Livelihood',
    colors: {
      primary: '#2563eb',
      secondary: '#3b82f6',
      gradient: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
      lightBg: 'rgba(37, 99, 235, 0.06)',
      darkBg: 'rgba(37, 99, 235, 0.15)',
      border: 'rgba(37, 99, 235, 0.25)',
      glow: 'rgba(37, 99, 235, 0.3)'
    },
    heroImage: typeof slider2 === 'string' ? slider2 : slider2.src,
    howWeHelp: [
      {
        id: 'vocational-training',
        iconName: 'Wrench',
        title: 'Vocational Skill Workshops',
        description: 'Hands-on courses in tailoring, handicrafts, computer basics, electric repair, and beautician skills.'
      },
      {
        id: 'sewing-machines',
        iconName: 'Briefcase',
        title: 'Toolkits & Sewing Machines',
        description: 'Gifting free sewing machines and tools to certified women to start home enterprises.'
      },
      {
        id: 'job-placement',
        iconName: 'Building',
        title: 'Employment & Placement Drives',
        description: 'Connecting skilled youth with local MSMEs, shops, and formal sector job opportunities.'
      },
      {
        id: 'financial-literacy',
        iconName: 'TrendingUp',
        title: 'Micro-Finance & Self-Help',
        description: 'Training in bank account management, UPI transactions, and self-help group savings.'
      }
    ],
    impactStats: [
      { number: 350, suffix: '+', label: 'Youth Skilled', iconName: 'Award' },
      { number: 120, suffix: '+', label: 'Women Self-Employed', iconName: 'Briefcase' },
      { number: 85, suffix: '%', label: 'Job Placement Rate', iconName: 'CheckCircle' },
      { number: 5, suffix: '+', label: 'Training Centers', iconName: 'Home' }
    ],
    gallery: [
      { url: typeof slider2 === 'string' ? slider2 : slider2.src, caption: 'Vocational skill training center for women' },
      { url: typeof sliderNew2 === 'string' ? sliderNew2 : sliderNew2.src, caption: 'Computer literacy and digital workplace skills' },
      { url: typeof slider3 === 'string' ? slider3 : slider3.src, caption: 'Handicrafts and micro-entrepreneurship workshop' },
      { url: typeof awardCeremony === 'string' ? awardCeremony : awardCeremony.src, caption: 'Certification distribution ceremony for graduates' }
    ],
    cta: {
      headline: 'Give Someone a Nayi Pehchaan (Self-Reliance)',
      subtext: 'Sponsor a candidate’s complete 3-month skill development course for ₹2,500.'
    }
  },

  'sahara': {
    id: 'sahara',
    number: 4,
    slug: 'sahara',
    tabKey: 'campaign-sahara',
    title: 'Sahara',
    subTitle: 'Universal Crisis Support',
    reason: 'This is a comprehensive welfare initiative providing multi-domain relief in every crisis.',
    heading: 'Your Shield in Every Need & Social Crisis',
    description: 'Sahara is a holistic community welfare program that steps in whenever underprivileged individuals or elderly citizens need winter blankets, emergency medicine, legal aid, or compassionate care.',
    badge: 'Campaign #4 • Universal Support',
    colors: {
      primary: '#9333ea',
      secondary: '#a855f7',
      gradient: 'linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)',
      lightBg: 'rgba(147, 51, 234, 0.06)',
      darkBg: 'rgba(147, 51, 234, 0.15)',
      border: 'rgba(147, 51, 234, 0.25)',
      glow: 'rgba(147, 51, 234, 0.3)'
    },
    heroImage: typeof saharaMobileVan === 'string' ? saharaMobileVan : saharaMobileVan.src,
    howWeHelp: [
      {
        id: 'winter-warmth',
        iconName: 'Shield',
        title: 'Winter Warmth Drives',
        description: 'Distributing heavy blankets, jackets, and thermal wear to night-sleeper destitute populations.'
      },
      {
        id: 'elderly-care',
        iconName: 'Heart',
        title: 'Elderly & Destitute Care',
        description: 'Providing monthly pensions, adult diapers, walking sticks, and emotional companionship to senior citizens.'
      },
      {
        id: 'emergency-grant',
        iconName: 'HelpCircle',
        title: 'Emergency Crisis Relief Grants',
        description: 'Immediate micro-grants for families suffering unexpected loss, accident, or fire damage.'
      },
      {
        id: 'community-helpline',
        iconName: 'PhoneCall',
        title: '24/7 Social Distress Line',
        description: 'Guidance and physical aid for citizens stranded without shelter, transport, or food.'
      }
    ],
    impactStats: [
      { number: 750, suffix: '+', label: 'Blankets Distributed', iconName: 'Shield' },
      { number: 150, suffix: '+', label: 'Seniors Adopted', iconName: 'Heart' },
      { number: 95, suffix: '+', label: 'Crisis Cases Handled', iconName: 'CheckCircle' },
      { number: 24, suffix: '/7', label: 'Helpline Support', iconName: 'PhoneCall' }
    ],
    gallery: [
      { url: typeof saharaMobileVan === 'string' ? saharaMobileVan : saharaMobileVan.src, caption: 'Worlify Sahara mobile relief vehicle serving communities' },
      { url: typeof slider4 === 'string' ? slider4 : slider4.src, caption: 'Winter blanket distribution night drive' },
      { url: typeof sliderNew1 === 'string' ? sliderNew1 : sliderNew1.src, caption: 'Community support gathering and essential distribution' },
      { url: typeof ourStoryKids === 'string' ? ourStoryKids : ourStoryKids.src, caption: 'Warm winter clothing for underprivileged families' }
    ],
    cta: {
      headline: 'Be the Sahara (Pillar of Support) Someone Needs',
      subtext: 'Join hands with us to ensure no vulnerable person is left without warmth, dignity, and assistance.'
    }
  },

  'apna-aashiyana': {
    id: 'apna-aashiyana',
    number: 5,
    slug: 'apna-aashiyana',
    tabKey: 'campaign-apna-aashiyana',
    title: 'Apna Aashiyana',
    subTitle: 'Housing & Shelter Support',
    reason: 'Safe shelter is a fundamental need that brings stability and dignity to human life.',
    heading: 'Safe Housing & Shelter Support for Homeless Families',
    description: 'Apna Aashiyana builds roof repairs, temporary tin shelters, night-shelter facilities, and sanitation units for impoverished families and disaster-hit households.',
    badge: 'Campaign #5 • Shelter & Housing',
    colors: {
      primary: '#0d9488',
      secondary: '#14b8a6',
      gradient: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
      lightBg: 'rgba(13, 148, 136, 0.06)',
      darkBg: 'rgba(13, 148, 136, 0.15)',
      border: 'rgba(13, 148, 136, 0.25)',
      glow: 'rgba(13, 148, 136, 0.3)'
    },
    heroImage: typeof slider3 === 'string' ? slider3 : slider3.src,
    howWeHelp: [
      {
        id: 'roof-repair',
        iconName: 'Home',
        title: 'Roof & Structure Repair',
        description: 'Replacing damaged thatch, mud roofs, and tin sheets before monsoon rains.'
      },
      {
        id: 'night-shelter',
        iconName: 'Building',
        title: 'Night Shelters (Rain Basera)',
        description: 'Managing safe, clean, and warm night shelters equipped with beds, toilets, and security.'
      },
      {
        id: 'sanitation-toilets',
        iconName: 'ShieldCheck',
        title: 'Household Sanitation Units',
        description: 'Building private household toilets for rural women to restore safety and dignity.'
      },
      {
        id: 'solar-lighting',
        iconName: 'Sun',
        title: 'Solar Home Lighting Kits',
        description: 'Installing solar panels and LED bulbs in un-electrified off-grid hamlets.'
      }
    ],
    impactStats: [
      { number: 60, suffix: '+', label: 'Homes Restored', iconName: 'Home' },
      { number: 18, suffix: '+', label: 'Sanitation Units Built', iconName: 'ShieldCheck' },
      { number: 350, suffix: '+', label: 'Night Shelter Guests', iconName: 'Users' },
      { number: 45, suffix: '+', label: 'Solar Kits Set Up', iconName: 'Sun' }
    ],
    gallery: [
      { url: typeof slider3 === 'string' ? slider3 : slider3.src, caption: 'Shelter construction and tin roofing installation' },
      { url: typeof slider4 === 'string' ? slider4 : slider4.src, caption: 'Community shelter inspection and maintenance' },
      { url: typeof sliderNew4 === 'string' ? sliderNew4 : sliderNew4.src, caption: 'Solar lamp distribution for off-grid homes' },
      { url: typeof apnaAashiyanaBranch === 'string' ? apnaAashiyanaBranch : apnaAashiyanaBranch.src, caption: 'Worlify Welfare Foundation Apna Aashiyana shelter center' }
    ],
    cta: {
      headline: 'Help Build an Apna Aashiyana for a Homeless Family',
      subtext: 'Your donation of ₹3,000 helps repair a dilapidated roof and keeps a poor family safe from severe weather.'
    }
  },

  'umeed': {
    id: 'umeed',
    number: 6,
    slug: 'umeed',
    tabKey: 'campaign-umeed',
    title: 'Umeed',
    subTitle: 'Disaster & Emergency Relief',
    reason: 'Rapid assistance during natural disasters and emergencies is extremely critical for survival.',
    heading: 'Rapid Emergency Response & Disaster Relief',
    description: 'Umeed deploys quick-response volunteer teams, emergency boats, food packages, clean drinking water, and medical kits to flood, fire, earthquake, and extreme heatwave survivors.',
    badge: 'Campaign #6 • Disaster Relief',
    colors: {
      primary: '#dc2626',
      secondary: '#ef4444',
      gradient: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
      lightBg: 'rgba(220, 38, 38, 0.06)',
      darkBg: 'rgba(220, 38, 38, 0.15)',
      border: 'rgba(220, 38, 38, 0.25)',
      glow: 'rgba(220, 38, 38, 0.3)'
    },
    heroImage: typeof slider4 === 'string' ? slider4 : slider4.src,
    howWeHelp: [
      {
        id: 'food-water-kits',
        iconName: 'Package',
        title: 'Emergency Food & Water Dry Packs',
        description: 'Distributing high-calorie dry snacks, oral rehydration salts, and purified water bottles.'
      },
      {
        id: 'temporary-tents',
        iconName: 'Home',
        title: 'Tarpaulins & Relief Tents',
        description: 'Providing waterproof tarpaulins, ropes, ground mats, and emergency lanterns.'
      },
      {
        id: 'medical-camps',
        iconName: 'Activity',
        title: 'Post-Disaster Medical Camps',
        description: 'Treating waterborne diseases, skin infections, injuries, and administering first aid.'
      },
      {
        id: 'rebuilding-support',
        iconName: 'RefreshCw',
        title: 'Rebuilding & Rehabilitation',
        description: 'Helping affected communities rebuild livelihoods, repair wells, and restock cattle fodder.'
      }
    ],
    impactStats: [
      { number: 1200, suffix: '+', label: 'Victims Rescued & Fed', iconName: 'Users' },
      { number: 550, suffix: '+', label: 'Relief Kits Sent', iconName: 'Package' },
      { number: 24, suffix: ' Hours', label: 'Average Response Time', iconName: 'Clock' },
      { number: 6, suffix: '+', label: 'Disaster Zones Served', iconName: 'MapPin' }
    ],
    gallery: [
      { url: typeof slider4 === 'string' ? slider4 : slider4.src, caption: 'Disaster relief team preparing emergency kits' },
      { url: typeof sliderNew1 === 'string' ? sliderNew1 : sliderNew1.src, caption: 'Water and ration distribution in flood hit areas' },
      { url: typeof sliderNew4 === 'string' ? sliderNew4 : sliderNew4.src, caption: 'Medical first aid camp setup for disaster survivors' },
      { url: typeof shikshaNaRuke === 'string' ? shikshaNaRuke : shikshaNaRuke.src, caption: 'Temporary learning center in relief refugee camp' }
    ],
    cta: {
      headline: 'Be the Umeed (Ray of Hope) in Disasters',
      subtext: 'Your contribution powers our immediate response fund for natural calamities.'
    }
  },

  'dharti-bachao': {
    id: 'dharti-bachao',
    number: 7,
    slug: 'dharti-bachao',
    tabKey: 'campaign-dharti-bachao',
    title: 'Dharti Bachao',
    subTitle: 'Green Environment Pledge',
    reason: 'Environmental protection and afforestation are vital for our sustainable future.',
    heading: 'Greening India: Tree Plantation & Eco-Protection',
    description: 'Dharti Bachao fights climate change and deforestation by planting native shade and fruit trees, setting up rainwater harvesting units, cleaning water bodies, and spreading plastic-free awareness.',
    badge: 'Campaign #7 • Eco & Climate Action',
    colors: {
      primary: '#15803d',
      secondary: '#22c55e',
      gradient: 'linear-gradient(135deg, #15803d 0%, #166534 100%)',
      lightBg: 'rgba(21, 128, 61, 0.06)',
      darkBg: 'rgba(21, 128, 61, 0.15)',
      border: 'rgba(21, 128, 61, 0.25)',
      glow: 'rgba(21, 128, 61, 0.3)'
    },
    heroImage: typeof sliderNew4 === 'string' ? sliderNew4 : sliderNew4.src,
    howWeHelp: [
      {
        id: 'tree-drives',
        iconName: 'Sun',
        title: 'Mass Sapling Plantation',
        description: 'Planting neem, banyan, peepal, mango, and guava trees in schools, parks, and roadside stretches.'
      },
      {
        id: 'water-harvesting',
        iconName: 'Droplet',
        title: 'Pond Revival & Rainwater Pits',
        description: 'Desilting village water bodies and installing rainwater harvesting infrastructure.'
      },
      {
        id: 'plastic-ban',
        iconName: 'Trash2',
        title: 'Plastic Clean-Up Drives',
        description: 'Organizing community riverbank clean-ups and distributing eco-friendly cloth bags.'
      },
      {
        id: 'green-schools',
        iconName: 'Award',
        title: 'Eco-Clubs in Rural Schools',
        description: 'Teaching children composting, organic kitchen gardening, and environmental preservation.'
      }
    ],
    impactStats: [
      { number: 1500, suffix: '+', label: 'Trees Planted', iconName: 'Sun' },
      { number: 5, suffix: '+', label: 'Ponds Revived', iconName: 'Droplet' },
      { number: 15, suffix: '+', label: 'School Eco-Clubs', iconName: 'Award' },
      { number: 85, suffix: '%', label: 'Sapling Survival Rate', iconName: 'CheckCircle' }
    ],
    gallery: [
      { url: typeof sliderNew4 === 'string' ? sliderNew4 : sliderNew4.src, caption: 'Community tree plantation drive in green belt' },
      { url: typeof slider3 === 'string' ? slider3 : slider3.src, caption: 'School children planting fruit saplings' },
      { url: typeof slider2 === 'string' ? slider2 : slider2.src, caption: 'Riverbank cleanup and plastic collection drive' },
      { url: typeof ourStoryKids === 'string' ? ourStoryKids : ourStoryKids.src, caption: 'Eco-awareness workshop in rural primary school' }
    ],
    cta: {
      headline: 'Take the Hariyali Sankalp with Dharti Bachao',
      subtext: 'Plant and nurture a tree today for just ₹150 and secure a greener tomorrow.'
    }
  },

  'jeev-raksha': {
    id: 'jeev-raksha',
    number: 8,
    slug: 'jeev-raksha',
    tabKey: 'campaign-jeev-raksha',
    title: 'Jeev Raksha',
    subTitle: 'Animal Welfare & Protection',
    reason: 'Protecting and showing compassion towards animals and birds is an essential duty of society.',
    heading: 'Compassion in Action: Stray Animal Welfare & Rescue',
    description: 'Jeev Raksha cares for stray animals, injured birds, and working equines. We run mobile vet vans, anti-rabies vaccination drives, winter reflective collars, and daily street animal feeding bowls.',
    badge: 'Campaign #8 • Animal Protection',
    colors: {
      primary: '#0284c7',
      secondary: '#38bdf8',
      gradient: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
      lightBg: 'rgba(2, 132, 199, 0.06)',
      darkBg: 'rgba(2, 132, 199, 0.15)',
      border: 'rgba(2, 132, 199, 0.25)',
      glow: 'rgba(2, 132, 199, 0.3)'
    },
    heroImage: typeof sliderNew2 === 'string' ? sliderNew2 : sliderNew2.src,
    howWeHelp: [
      {
        id: 'vet-vans',
        iconName: 'Activity',
        title: 'Mobile Veterinary Ambulances',
        description: 'Treating accident-injured stray dogs, cows, and animals on-site with qualified vets.'
      },
      {
        id: 'street-feeding',
        iconName: 'Heart',
        title: 'Daily Stray Animal Feeding',
        description: 'Providing fresh fodder for cows and nutritious food bowls for street dogs.'
      },
      {
        id: 'reflective-collars',
        iconName: 'Shield',
        title: 'Reflective Collar Drives',
        description: 'Fitting glowing collars on stray animals to prevent night highway accidents.'
      },
      {
        id: 'bird-water-bowls',
        iconName: 'Sun',
        title: 'Summer Water Pot Distribution',
        description: 'Distributing earthen water pots for birds across city rooftops during summer.'
      }
    ],
    impactStats: [
      { number: 480, suffix: '+', label: 'Animals Treated', iconName: 'Activity' },
      { number: 350, suffix: '+', label: 'Reflective Collars Put', iconName: 'Shield' },
      { number: 250, suffix: '+', label: 'Bird Bowls Placed', iconName: 'Sun' },
      { number: 365, suffix: ' Days', label: 'Active Rescue Van', iconName: 'Clock' }
    ],
    gallery: [
      { url: typeof sliderNew2 === 'string' ? sliderNew2 : sliderNew2.src, caption: 'Rescue team attending an injured stray animal' },
      { url: typeof sliderNew1 === 'string' ? sliderNew1 : sliderNew1.src, caption: 'Street animal feeding drive in urban hubs' },
      { url: typeof slider3 === 'string' ? slider3 : slider3.src, caption: 'Reflective collar installation drive for stray dogs' },
      { url: typeof cattleFodderDistribution === 'string' ? cattleFodderDistribution : cattleFodderDistribution.src, caption: 'Cattle fodder distribution program' }
    ],
    cta: {
      headline: 'Be a Guardian of Speechless Souls with Jeev Raksha',
      subtext: 'Your contribution of ₹350 feeds and treats a stray animal for an entire week.'
    }
  },

  'beti-ki-muskan': {
    id: 'beti-ki-muskan',
    number: 9,
    slug: 'beti-ki-muskan',
    tabKey: 'campaign-beti-ki-muskan',
    title: 'Beti Ki Muskan',
    subTitle: 'Girl Child Education & Empowerment',
    reason: 'Empowering girl children through education, skills, and dignity builds a progressive and self-reliant society.',
    heading: 'Educating Girls, Inspiring Dreams: Literacy & Skill Empowerment',
    description: 'Beti Ki Muskan is dedicated to bringing smiles to young girls by breaking barriers to education, providing school sponsorships, digital literacy, career skill development, hygiene dignity kits, and leadership mentoring.',
    badge: 'Campaign #9 • Girl Child Education',
    colors: {
      primary: '#e11d48',
      secondary: '#f43f5e',
      gradient: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
      lightBg: 'rgba(225, 29, 72, 0.06)',
      darkBg: 'rgba(225, 29, 72, 0.15)',
      border: 'rgba(225, 29, 72, 0.25)',
      glow: 'rgba(225, 29, 72, 0.3)'
    },
    heroImage: typeof heroSchoolGirl === 'string' ? heroSchoolGirl : heroSchoolGirl.src,
    howWeHelp: [
      {
        id: 'girl-scholarships',
        iconName: 'GraduationCap',
        title: 'Girl Child School Scholarships',
        description: 'Covering full tuition, textbooks, uniforms, and bus fares for underprivileged young girls.'
      },
      {
        id: 'digital-stem',
        iconName: 'Laptop',
        title: 'Digital & STEM Skill Labs',
        description: 'Providing computer training, coding workshops, and science learning tools exclusively for girls.'
      },
      {
        id: 'hygiene-dignity',
        iconName: 'Heart',
        title: 'Menstrual Health & Dignity Kits',
        description: 'Distributing sanitary supplies and conducting health & hygiene awareness in rural schools.'
      },
      {
        id: 'leadership-self-defense',
        iconName: 'ShieldCheck',
        title: 'Self-Defense & Leadership Clubs',
        description: 'Empowering girls with confidence, physical self-defense, rights awareness, and career guidance.'
      }
    ],
    impactStats: [
      { number: 450, suffix: '+', label: 'Girls Educated & Skilled', iconName: 'GraduationCap' },
      { number: 35, suffix: '+', label: 'School Skill Workshops', iconName: 'School' },
      { number: 100, suffix: '%', label: 'Gender Parity Focus', iconName: 'CheckCircle' },
      { number: 6, suffix: '+', label: 'Districts Reached', iconName: 'MapPin' }
    ],
    gallery: [
      { url: typeof heroSchoolGirl === 'string' ? heroSchoolGirl : heroSchoolGirl.src, caption: 'Smiling girl student receiving new study materials' },
      { url: typeof shikshaNaRuke === 'string' ? shikshaNaRuke : shikshaNaRuke.src, caption: 'Interactive classroom and digital literacy session' },
      { url: typeof ourStoryKids === 'string' ? ourStoryKids : ourStoryKids.src, caption: 'After-school mentorship and leadership workshop' },
      { url: typeof awardCeremony === 'string' ? awardCeremony : awardCeremony.src, caption: 'Merit scholarship and excellence certificate distribution' }
    ],
    cta: {
      headline: 'Bring a Smile to a Girl Child with Beti Ki Muskan',
      subtext: 'Your contribution of ₹500/month sponsors a young girl’s complete education, books, and skill training.'
    }
  },

  'jeevandan': {
    id: 'jeevandan',
    number: 10,
    slug: 'jeevandan',
    tabKey: 'campaign-jeevandan',
    title: 'Jeevandan',
    subTitle: 'Life-Saving Healthcare',
    reason: 'Healthcare services are paramount and must be sustained continuously for human life.',
    heading: 'Life-Saving Healthcare, Medical Camps & Surgeries',
    description: 'Jeevandan ensures no individual dies due to lack of medical funds. We fund critical surgeries, blood donation camps, free medicine distribution, and eye check-up drives in rural villages.',
    badge: 'Campaign #10 • Medical & Health',
    colors: {
      primary: '#0891b2',
      secondary: '#06b6d4',
      gradient: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
      lightBg: 'rgba(8, 145, 178, 0.06)',
      darkBg: 'rgba(8, 145, 178, 0.15)',
      border: 'rgba(8, 145, 178, 0.25)',
      glow: 'rgba(8, 145, 178, 0.3)'
    },
    heroImage: typeof jeevandanDonorBox === 'string' ? jeevandanDonorBox : jeevandanDonorBox.src,
    howWeHelp: [
      {
        id: 'free-camps',
        iconName: 'Activity',
        title: 'Free Health & Eye Checkup Camps',
        description: 'Conducting blood pressure, sugar, cardiac, and cataract screening camps with free spectacles.'
      },
      {
        id: 'surgery-grants',
        iconName: 'HeartPulse',
        title: 'Critical Surgery Fund',
        description: 'Financing life-saving surgeries for poor children and cardiac/cancer patients.'
      },
      {
        id: 'free-medicines',
        iconName: 'Package',
        title: 'Free Essential Medicine Counter',
        description: 'Distributing monthly chronic disease medicines (diabetes, hypertension) to needy seniors.'
      },
      {
        id: 'blood-drives',
        iconName: 'Heart',
        title: 'Voluntary Blood Donation Drives',
        description: 'Organizing emergency blood donor networks for thalassaemia and accident patients.'
      }
    ],
    impactStats: [
      { number: 160, suffix: '+', label: 'Patients Treated', iconName: 'Activity' },
      { number: 4, suffix: '+', label: 'Cataract Surgeries Done', iconName: 'Eye' },
      { number: 350, suffix: '+', label: 'Blood Units Donated', iconName: 'Heart' },
      { number: 18, suffix: '+', label: 'Health Camps Held', iconName: 'MapPin' }
    ],
    gallery: [
      { url: typeof shikshaNaRuke === 'string' ? shikshaNaRuke : shikshaNaRuke.src, caption: 'Rural health checkup camp and doctor consultation' },
      { url: typeof sliderNew4 === 'string' ? sliderNew4 : sliderNew4.src, caption: 'Eye screening camp and free spectacle distribution' },
      { url: typeof jeevandanDonorBox === 'string' ? jeevandanDonorBox : jeevandanDonorBox.src, caption: 'Worlify Foundation volunteer with Jeevandan donation box' },
      { url: typeof awardCeremony === 'string' ? awardCeremony : awardCeremony.src, caption: 'Felicitation of emergency blood donor champions' }
    ],
    cta: {
      headline: 'Give the Gift of Life with Jeevandan Health Campaign',
      subtext: 'Your contribution directly sponsors emergency medicine and life-saving medical care.'
    }
  }
};
