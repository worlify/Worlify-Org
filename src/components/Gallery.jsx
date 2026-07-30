import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  X, 
  Calendar, 
  SlidersHorizontal, 
  ArrowRight, 
  ArrowLeft, 
  Eye, 
  Heart, 
  Play, 
  MapPin, 
  BookOpen,
  Search,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ZoomIn,
  ZoomOut,
  Users,
  Award,
  Layers,
  ChevronDown
} from 'lucide-react';
import styles from '../styles/Gallery.module.css';

// Local high-res images
import heroGirl from '../assets/images/hero_school_girl.png';
import awardCeremony from '../assets/images/award_ceremony.png';
import kidsStory from '../assets/images/our_story_kids.jpg';
import shikshaRuke from '../assets/images/shiksha_na_ruke.jpg';
import slider1 from '../assets/images/slider_new1.jpg';
import slider2 from '../assets/images/slider_new2.jpg';
import slider4 from '../assets/images/slider_new4.jpg';
import lxmiDevi from '../assets/images/lxmina_devi.jpg';
import rahulVerma from '../assets/images/rahul_kumar_verma.jpg';

export default function Gallery({ setActiveTab, setDonationPreload }) {
  // Navigation & Filter States
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'popular' | 'recent'
  const [visibleCount, setVisibleCount] = useState(9);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);

  // Touch Swipe coordinates for Lightbox
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Master Gallery Dataset (Diverse NGO initiatives across India & Global field units)
  const galleryItems = useMemo(() => [
    {
      id: 1,
      title: "Empowering Rural Girls Through STEM Education",
      category: "Education",
      label: "Featured Story",
      image: heroGirl,
      description: "How a community scholarship changed the trajectory of a whole village through Amara's journey into biotechnology.",
      views: "4.8k Views",
      supports: "1,240 Supports",
      date: "2026-06-15",
      displayDate: "June 2026",
      size: "large", // Bento layout size
      fullStory: "Amara grew up in a rural village where access to science education was severely limited. Her passion for botany and chemistry caught the attention of our local field instructors. Through Worlify's STEM Scholar program, funded entirely by public micro-donations, Amara secured a full scholarship to study biotechnology at the Africa Biosciences Hub in Kigali. Today, she is lead researcher on a crop resistance project designed to protect maize harvests from drought, directly impacting over 10,000 farmers in her home district.",
      location: "Kigali & Bihar Outposts",
      photoCount: 14
    },
    {
      id: 2,
      title: "Reforestation & Biodiversity Defense",
      category: "Environment",
      label: "Impact Video",
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=1000",
      description: "Witness energetic community mobilization restoring degraded forest buffers and protecting local watersheds.",
      isVideo: true,
      size: "tall",
      date: "2026-05-20",
      displayDate: "May 2026",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-planting-a-small-plant-in-the-soil-41584-large.mp4",
      views: "8.2k Views",
      supports: "2,150 Supports",
      fullStory: "Our reforestation efforts are completely community-driven. In this short impact documentary, see how 250 local households volunteered to plant native broadleaf saplings, establish sustainable fire lines, and protect vital headwater streams from erosion. Your contributions purchased shovels, compost, protective tree-guards, and water tankers that made this scale of restorative forestry possible.",
      location: "Western Ghats Buffer Zone",
      photoCount: 8
    },
    {
      id: 3,
      title: "Mobile Medical Units in High Altitude Hamlets",
      category: "Health",
      label: "Healthcare",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000",
      description: "Custom-outfitted all-terrain clinics providing life-saving vaccines and diagnostic checkups to isolated mountain communities.",
      date: "2026-04-18",
      displayDate: "April 2026",
      size: "standard",
      views: "3.1k Views",
      supports: "920 Supports",
      fullStory: "High altitude or geographical isolation should never dictate health outcomes. Our custom-outfitted, all-terrain mobile clinic vans traverse challenging terrains weekly. Staffed by dedicated rotating volunteer nurses and doctors, these mobile units perform routine child immunizations, maternal checkups, point-of-care lab diagnostics, and basic diabetes management.",
      location: "Uttarakhand Hill Outposts",
      photoCount: 22
    },
    {
      id: 4,
      title: "Women's Craft Co-op & Financial Independence",
      category: "Women Empowerment",
      label: "Empowerment",
      image: lxmiDevi,
      description: "30 women graduated from artisan tailoring & micro-enterprise workshops to launch a self-sustaining cooperative.",
      date: "2026-03-30",
      displayDate: "March 2026",
      size: "wide",
      views: "5.4k Views",
      supports: "1,890 Supports",
      fullStory: "Through our vocational workshop initiatives, local women completed high-level sewing, garment cutting, and business management courses. Armed with grant-funded sewing machines and materials, they formed the 'Sisters of Stitch' cooperative. They now craft school uniforms and custom textiles, ensuring a steady independent income source for their families.",
      location: "Jaipur Rural Center",
      photoCount: 19
    },
    {
      id: 5,
      title: "Shiksha Na Ruke: Evening Learning Hubs",
      category: "Education",
      label: "Education",
      image: shikshaRuke,
      description: "Providing bridge courses and warm meals to over 400 underprivileged children who work or assist their families during daytime.",
      date: "2026-03-12",
      displayDate: "March 2026",
      size: "standard",
      views: "6.2k Views",
      supports: "2,410 Supports",
      fullStory: "For working families in congested urban informal settlements, safe childcare and structured learning are often unattainable. The Shiksha Na Ruke Center serves as a safe physical sanctuary after school hours, serving nutritious meals and specialized remedial tutoring.",
      location: "Delhi NCR Outreach",
      photoCount: 31
    },
    {
      id: 6,
      title: "Clean Water Solar Aquifers",
      category: "Environment",
      label: "Community Support",
      image: "https://images.unsplash.com/photo-1541913076-2e998f4df6f9?auto=format&fit=crop&q=80&w=1000",
      description: "Inaugurated solar-powered deep borewell filtration units supplying pure drinking water directly to 500 households.",
      date: "2026-02-24",
      displayDate: "February 2026",
      size: "tall",
      views: "4.1k Views",
      supports: "1,150 Supports",
      fullStory: "Drought and groundwater contamination have plagued dry agrarian villages for years. By engineering solar-powered extraction rigs linked to sand filtration beds, we have delivered fresh, chilled drinking water to community distribution taps, causing water-borne illnesses to drop by 80%.",
      location: "Thar Desert Fringe",
      photoCount: 12
    },
    {
      id: 7,
      title: "National Volunteer Leadership Summit",
      category: "Volunteers",
      label: "Volunteers",
      image: awardCeremony,
      description: "Recognizing top grassroots change-makers and youth leaders who drove over 50,000 hours of community service.",
      date: "2026-02-10",
      displayDate: "February 2026",
      size: "wide",
      views: "7.5k Views",
      supports: "3,100 Supports",
      fullStory: "Our annual summit gathered 300+ field volunteers across 16 states. Outstanding youth organizers were honored with the Golden Heart Fellowship awards, cementing a nationwide network of passionate advocates.",
      location: "New Delhi Convention Hall",
      photoCount: 45
    },
    {
      id: 8,
      title: "Emergency Nutrition & Food Security Drive",
      category: "Community Support",
      label: "Community Support",
      image: slider1,
      description: "Distributing ration kits and fresh warm meals to 1,500 flood-affected families across river basin settlements.",
      date: "2026-01-15",
      displayDate: "January 2026",
      size: "standard",
      views: "3.9k Views",
      supports: "1,040 Supports",
      fullStory: "During heavy seasonal flooding, immediate response is vital. Our emergency response team mobilized logistics within 12 hours, ensuring clean drinking water, dry rations, and basic hygiene kits reached submerged neighborhoods.",
      location: "Assam River Belt",
      photoCount: 28
    },
    {
      id: 9,
      title: "Youth Climate Action & Tree Plantation",
      category: "Environment",
      label: "Events",
      image: slider4,
      description: "Mobilizing 800 school students to plant 5,000 urban micro-forest saplings in public parklands.",
      date: "2025-12-20",
      displayDate: "December 2025",
      size: "standard",
      views: "2.8k Views",
      supports: "880 Supports",
      fullStory: "Urban heat islands require rapid green canopy restoration. Students took ownership of individual saplings, learning plant ecology while building a greener city for tomorrow.",
      location: "Bengaluru Urban Parks",
      photoCount: 16
    },
    {
      id: 10,
      title: "Pediatric Vision & Dental Care Camp",
      category: "Health",
      label: "Health",
      image: kidsStory,
      description: "Free health screenings, prescription glasses, and dental kits provided to 1,200 primary school children.",
      date: "2025-11-28",
      displayDate: "November 2025",
      size: "large",
      views: "5.1k Views",
      supports: "1,670 Supports",
      fullStory: "Uncorrected vision problems are a leading hidden cause of school dropouts. Our specialist doctors screened over 1,200 kids, delivering custom corrective glasses and follow-up care free of charge.",
      location: "Lucknow District Schools",
      photoCount: 34
    },
    {
      id: 11,
      title: "Digital Literacy & Computer Labs Launched",
      category: "Education",
      label: "Education",
      image: slider2,
      description: "Equipping rural primary schools with refurbished solar-powered laptop labs and coding fundamentals.",
      date: "2025-11-04",
      displayDate: "November 2025",
      size: "standard",
      views: "4.3k Views",
      supports: "1,290 Supports",
      fullStory: "Bridging the digital divide starts early. We established 10 solar-powered computer labs with 150 laptops, enabling over 2,000 students to gain computer literacy, typing skills, and internet access.",
      location: "Madhya Pradesh Villages",
      photoCount: 25
    },
    {
      id: 12,
      title: "Community Micro-grants & Entrepreneurship",
      category: "Women Empowerment",
      label: "Women Empowerment",
      image: rahulVerma,
      description: "Providing seed capital and mentorship to 50 women-led micro-enterprises in handicraft and organic farming.",
      date: "2025-10-12",
      displayDate: "October 2025",
      size: "tall",
      views: "3.7k Views",
      supports: "1,050 Supports",
      fullStory: "Empowering female entrepreneurs yields immediate compound benefits for family nutrition and education. Micro-grants of $250 coupled with accounting workshops led to a 100% repayment and growth rate.",
      location: "Odisha Coastal Belt",
      photoCount: 18
    }
  ], []);

  // Featured Album Collections Dataset
  const featuredCollections = [
    {
      id: "edu-drive",
      title: "Education Drives",
      count: "42 Photos",
      category: "Education",
      image: heroGirl,
      desc: "Transforming classrooms & empowering young minds with STEM tools."
    },
    {
      id: "health-camps",
      title: "Healthcare Camps",
      count: "38 Photos",
      category: "Health",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
      desc: "Mobile health units bringing free checkups to distant hamlets."
    },
    {
      id: "tree-plant",
      title: "Tree Plantation Drive",
      count: "56 Photos",
      category: "Environment",
      image: slider4,
      desc: "Community reforestation & native sapling canopy planting."
    },
    {
      id: "women-emp",
      title: "Women Empowerment",
      count: "29 Photos",
      category: "Women Empowerment",
      image: lxmiDevi,
      desc: "Artisan co-ops, micro-grants, and financial literacy workshops."
    },
    {
      id: "food-dist",
      title: "Food Distribution Drive",
      count: "64 Photos",
      category: "Community Support",
      image: slider1,
      desc: "Nutritious warm meals & dry ration emergency support kits."
    }
  ];

  // Journey Timeline Milestones
  const timelineMilestones = [
    { year: '2018', title: 'Foundation Started', desc: 'Initiated field operations across 3 rural districts with 15 core volunteers.', icon: Sparkles },
    { year: '2020', title: 'Remote Learning Hubs', desc: 'Deployed digital tablets & study kits during pandemic school closures.', icon: BookOpen },
    { year: '2022', title: 'Mobile Clinic Fleet', desc: 'Commissioned 10 all-terrain medical vans serving 50+ remote villages.', icon: Heart },
    { year: '2025', title: '100k Trees & Water', desc: 'Achieved 100,000 native tree plantings and 25 solar clean water aquifer rigs.', icon: Layers },
    { year: '2026', title: 'Nationwide Scaling', desc: 'Impacting 10,000+ lives daily across 16 states with transparent open-data governance.', icon: Award }
  ];

  // Filter & Search Logic
  const filteredItems = useMemo(() => {
    return galleryItems.filter(item => {
      // Category Match
      const matchesCategory = activeFilter === 'All' || 
        (activeFilter === 'Videos' && item.isVideo) ||
        item.category.toLowerCase() === activeFilter.toLowerCase();
      
      // Collection Filter if selected
      const matchesCollection = !selectedCollection || item.category.toLowerCase() === selectedCollection.toLowerCase();

      // Search Query Match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return matchesCategory && matchesCollection && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'popular') return parseInt(b.views) - parseInt(a.views);
      if (sortBy === 'recent') return b.id - a.id;
      return 0;
    });
  }, [galleryItems, activeFilter, selectedCollection, searchQuery, sortBy]);

  // Sliced items for load more
  const displayedItems = filteredItems.slice(0, visibleCount);

  // Selected item modal details
  const currentSelectedItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

  // Keyboard navigation & Esc key handler for Lightbox Modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedItemIndex === null) return;
      if (e.key === 'Escape') {
        setSelectedItemIndex(null);
        setIsZoomed(false);
      } else if (e.key === 'ArrowRight') {
        handleNextLightbox();
      } else if (e.key === 'ArrowLeft') {
        handlePrevLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItemIndex, filteredItems]);

  // Lightbox Next/Prev handlers
  const handleNextLightbox = () => {
    if (selectedItemIndex !== null && selectedItemIndex < filteredItems.length - 1) {
      setSelectedItemIndex(prev => prev + 1);
      setIsZoomed(false);
    }
  };

  const handlePrevLightbox = () => {
    if (selectedItemIndex !== null && selectedItemIndex > 0) {
      setSelectedItemIndex(prev => prev - 1);
      setIsZoomed(false);
    }
  };

  // Touch Swipe handlers for mobile lightbox navigation
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        handleNextLightbox(); // Swiped left -> next
      } else {
        handlePrevLightbox(); // Swiped right -> prev
      }
    }
  };

  // Navigate to donation page with preloaded cause
  const handleSupportCauseClick = (category) => {
    if (setDonationPreload) setDonationPreload(category);
    if (setActiveTab) setActiveTab('donate');
    setSelectedItemIndex(null);
  };

  // Scroll to gallery grid stage
  const scrollToGrid = () => {
    const element = document.getElementById('gallery-toolbar-anchor');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.galleryPage} id="gallery-redesign-root">
      
      {/* 1. HERO SECTION WITH ARTISTIC FLOATING COLLAGE */}
      <section className={styles.heroSection} id="gallery-hero">
        <div className={styles.heroGlowOverlay} />
        
        <div className={styles.heroContainer}>
          {/* Left Column: Text & Emotional Messaging */}
          <div className={styles.heroTextCol}>
            <div className={styles.heroBadge}>
              <Sparkles size={14} className={styles.badgeIcon} />
              <span>Award-Winning NGO Gallery</span>
            </div>
            
            <h1 className={styles.heroTitle}>
              Moments That <br />
              <span className={styles.titleHighlight}>Create Change</span>
            </h1>
            
            <p className={styles.heroSubtitle}>
              An editorial visual journey capturing high-impact transformations, 
              grassroots resilience, and the real human stories powered by your generosity.
            </p>

            {/* Impact Badges */}
            <div className={styles.heroStatsRow}>
              <div className={styles.statChip}>
                <span className={styles.statNumber}>12,500+</span>
                <span className={styles.statLabel}>Photos Captured</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statChip}>
                <span className={styles.statNumber}>85+</span>
                <span className={styles.statLabel}>Field Events</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statChip}>
                <span className={styles.statNumber}>16+</span>
                <span className={styles.statLabel}>States Reached</span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className={styles.heroActions}>
              <button 
                type="button" 
                className={styles.heroPrimaryBtn}
                onClick={scrollToGrid}
                id="hero-explore-moments-btn"
              >
                <span>Explore Moments</span>
                <ArrowRight size={16} />
              </button>
              
              <button 
                type="button" 
                className={styles.heroSecondaryBtn}
                onClick={() => setActiveTab && setActiveTab('donate')}
                id="hero-support-causes-btn"
              >
                <span>Support Our Field Work</span>
              </button>
            </div>
          </div>

          {/* Right Column: Floating 3D Image Collage */}
          <div className={styles.heroCollageCol}>
            <div className={styles.collageStage}>
              
              {/* Card 1: Top Left */}
              <div className={`${styles.collageCard} ${styles.card1}`}>
                <img src={heroGirl} alt="Girl Education" />
                <div className={styles.collageTag}>Education</div>
              </div>

              {/* Card 2: Main Featured Center */}
              <div className={`${styles.collageCard} ${styles.card2}`}>
                <img src={kidsStory} alt="Children Support" />
                <div className={styles.collageOverlay}>
                  <span className={styles.collageTitle}>Shiksha Na Ruke</span>
                  <span className={styles.collageMeta}>420+ Children Benefited</span>
                </div>
              </div>

              {/* Card 3: Bottom Right */}
              <div className={`${styles.collageCard} ${styles.card3}`}>
                <img src={lxmiDevi} alt="Women Empowerment" />
                <div className={styles.collageTagGold}>Empowerment</div>
              </div>

              {/* Floating Stat Widget */}
              <div className={styles.floatingWidget}>
                <Award size={18} className={styles.widgetIcon} />
                <div>
                  <div className={styles.widgetVal}>100% Transparent</div>
                  <div className={styles.widgetSub}>Verified Field Photography</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED ALBUM COLLECTIONS CAROUSEL */}
      <section className={styles.collectionsSection} id="gallery-featured-collections">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionCategory}>Curated Impact</span>
              <h2 className={styles.sectionTitle}>Featured Collections</h2>
            </div>
            <p className={styles.sectionDesc}>
              Explore grouped drives capturing dedicated efforts in healthcare, education, climate, and emergency aid.
            </p>
          </div>

          <div className={styles.collectionsGrid}>
            {featuredCollections.map((col) => {
              const isSelected = selectedCollection === col.category;
              return (
                <div 
                  key={col.id} 
                  className={`${styles.collectionCard} ${isSelected ? styles.collectionActive : ''}`}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedCollection(null);
                    } else {
                      setSelectedCollection(col.category);
                      setActiveFilter('All');
                    }
                  }}
                  id={`collection-card-${col.id}`}
                >
                  <div className={styles.collectionImgWrapper}>
                    <img src={col.image} alt={col.title} className={styles.collectionImg} />
                    <span className={styles.collectionBadge}>{col.count}</span>
                  </div>
                  <div className={styles.collectionBody}>
                    <span className={styles.colCategory}>{col.category}</span>
                    <h3 className={styles.colTitle}>{col.title}</h3>
                    <p className={styles.colDesc}>{col.desc}</p>
                    <div className={styles.colFooter}>
                      <span>{isSelected ? 'Showing Collection' : 'View Album'}</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {selectedCollection && (
            <div className={styles.activeFilterBanner}>
              <span>Showing results for collection: <strong>{selectedCollection}</strong></span>
              <button 
                type="button" 
                className={styles.clearFilterBtn}
                onClick={() => setSelectedCollection(null)}
              >
                <X size={14} /> Clear Collection Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. STICKY SEARCH + CATEGORY FILTERS + SORTING TOOLBAR */}
      <div id="gallery-toolbar-anchor" />
      <section className={styles.stickyToolbar} id="gallery-toolbar">
        <div className={styles.toolbarContainer}>
          
          {/* Top Row: Search Input & Sort Selector */}
          <div className={styles.toolbarTopRow}>
            {/* Search Input */}
            <div className={styles.searchWrapper}>
              <Search size={18} className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search moments by title, location, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                id="gallery-search-input"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className={styles.searchClearBtn}
                  onClick={() => setSearchQuery('')}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className={styles.sortWrapper}>
              <SlidersHorizontal size={16} className={styles.sortIcon} />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.sortSelect}
                id="gallery-sort-select"
              >
                <option value="newest">Sort by Newest</option>
                <option value="oldest">Sort by Oldest</option>
                <option value="popular">Most Viewed</option>
                <option value="recent">Recently Added</option>
              </select>
            </div>
          </div>

          {/* Bottom Row: Category Filter Pills */}
          <div className={styles.filterPillsRow}>
            {[
              'All', 
              'Education', 
              'Health', 
              'Environment', 
              'Women Empowerment', 
              'Community Support', 
              'Volunteers',
              'Videos'
            ].map((cat) => {
              const isActive = activeFilter === cat && !selectedCollection;
              return (
                <button
                  key={cat}
                  type="button"
                  className={`${styles.filterPill} ${isActive ? styles.filterPillActive : ''}`}
                  onClick={() => {
                    setActiveFilter(cat);
                    setSelectedCollection(null);
                    setVisibleCount(9);
                  }}
                  id={`filter-pill-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. PREMIUM BENTO + PINTEREST MASONRY GALLERY GRID */}
      <section className={styles.galleryGridSection} id="gallery-masonry-grid">
        <div className={styles.container}>
          
          {displayedItems.length === 0 ? (
            <div className={styles.emptyGridState}>
              <BookOpen size={48} className={styles.emptyIcon} />
              <h3>No field moments match your search</h3>
              <p>Try searching with a different keyword or select another category filter.</p>
              <button 
                type="button" 
                className={styles.resetSearchBtn}
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('All');
                  setSelectedCollection(null);
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className={styles.bentoMasonryGrid}>
              
              {displayedItems.map((item, index) => {
                
                // Color mapping for category tags
                const tagColors = {
                  'Education': { bg: 'rgba(37, 99, 235, 0.15)', text: '#2563eb' },
                  'Health': { bg: 'rgba(239, 68, 68, 0.15)', text: '#ef4444' },
                  'Environment': { bg: 'rgba(16, 185, 129, 0.15)', text: '#10b981' },
                  'Women Empowerment': { bg: 'rgba(219, 39, 119, 0.15)', text: '#db2777' },
                  'Volunteers': { bg: 'rgba(234, 179, 8, 0.15)', text: '#d97706' },
                  'Community Support': { bg: 'rgba(13, 148, 136, 0.15)', text: '#0d9488' }
                };

                const currentTagStyle = tagColors[item.category] || { bg: 'rgba(100, 116, 139, 0.15)', text: '#64748b' };
                const sizeClass = styles[`card_${item.size || 'standard'}`];

                return (
                  <React.Fragment key={item.id}>
                    
                    {/* EDITORIAL STORYTELLING INTERSTITIAL SPREAD (Placed after 5th item) */}
                    {index === 5 && (
                      <div className={styles.storytellingSpread} id="featured-story-spread">
                        <div className={styles.spreadImageCol}>
                          <img src={shikshaRuke} alt="Shiksha Na Ruke Story" className={styles.spreadImg} />
                          <span className={styles.spreadBadge}>Featured Story</span>
                        </div>
                        <div className={styles.spreadContentCol}>
                          <span className={styles.spreadCategory}>Education Breakthrough</span>
                          <h3 className={styles.spreadTitle}>Empowering a Village Through Night School & Solar Hubs</h3>
                          <p className={styles.spreadDesc}>
                            In remote hamlets where children work alongside parents in fields during daylight, 
                            our solar-powered night schools provide warm meals, digital tablets, and certified instructors, 
                            ensuring education never stops.
                          </p>
                          <div className={styles.spreadMeta}>
                            <span><MapPin size={14} /> Bihar Outposts</span>
                            <span><Users size={14} /> 420+ Children</span>
                          </div>
                          <button 
                            type="button" 
                            className={styles.spreadCtaBtn}
                            onClick={() => setSelectedItemIndex(4)} // Open Shiksha story (id 5)
                          >
                            <span>Read Full Story</span>
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Standard / Bento Card */}
                    <div 
                      className={`${styles.masonryCard} ${sizeClass}`}
                      onClick={() => setSelectedItemIndex(index)}
                      id={`gallery-card-${item.id}`}
                    >
                      <div className={styles.cardMediaWrapper}>
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className={styles.cardImg}
                          loading="lazy" 
                        />
                        
                        <div className={styles.cardOverlay} />

                        {/* Video Play Button Overlay */}
                        {item.isVideo && (
                          <div className={styles.videoPlayBtn}>
                            <Play size={22} fill="currentColor" style={{ marginLeft: '3px' }} />
                          </div>
                        )}

                        {/* Top Meta Badges */}
                        <div className={styles.cardTopMeta}>
                          <span 
                            className={styles.cardCategoryBadge}
                            style={{ backgroundColor: currentTagStyle.bg, color: currentTagStyle.text }}
                          >
                            {item.category}
                          </span>
                          
                          {item.photoCount && (
                            <span className={styles.photoCountBadge}>
                              <Layers size={12} />
                              {item.photoCount} Photos
                            </span>
                          )}
                        </div>

                        {/* Bottom Content Info */}
                        <div className={styles.cardBottomInfo}>
                          <div className={styles.locationRow}>
                            <MapPin size={13} />
                            <span>{item.location}</span>
                          </div>
                          <h3 className={styles.cardTitle}>{item.title}</h3>
                          <p className={styles.cardDesc}>{item.description}</p>
                          
                          <div className={styles.cardFooterRow}>
                            <span className={styles.viewStoryLink}>
                              <span>View Story</span>
                              <ArrowRight size={14} />
                            </span>
                            <div className={styles.metricsGroup}>
                              <span><Eye size={12} /> {item.views}</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                  </React.Fragment>
                );
              })}

            </div>
          )}

          {/* Load More Pagination Button */}
          {filteredItems.length > visibleCount && (
            <div className={styles.loadMoreRow}>
              <button 
                type="button" 
                className={styles.loadMoreBtn}
                onClick={() => setVisibleCount(prev => prev + 6)}
                id="gallery-load-more-btn"
              >
                <span>Load More Moments</span>
                <ChevronDown size={18} />
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 5. JOURNEY TIMELINE SECTION */}
      <section className={styles.timelineSection} id="gallery-journey-timeline">
        <div className={styles.container}>
          
          <div className={styles.sectionHeader}>
            <span className={styles.sectionCategory}>Milestones</span>
            <h2 className={styles.sectionTitle}>Our Impact Journey</h2>
            <p className={styles.sectionDesc}>
              Tracing the path from a humble local outreach into a transparent, multi-state NGO network.
            </p>
          </div>

          <div className={styles.timelineRow}>
            {timelineMilestones.map((ms, index) => {
              const IconComp = ms.icon;
              return (
                <div key={index} className={styles.timelineStep}>
                  <div className={styles.stepNode}>
                    <IconComp size={20} className={styles.stepIcon} />
                  </div>
                  <span className={styles.stepYear}>{ms.year}</span>
                  <h4 className={styles.stepTitle}>{ms.title}</h4>
                  <p className={styles.stepDesc}>{ms.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. ANIMATED IMPACT STATISTICS COUNTER */}
      <section className={styles.statsSection} id="gallery-impact-stats">
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <span className={styles.statBoxNum}>12,500+</span>
              <span className={styles.statBoxTitle}>Photos Documented</span>
              <p className={styles.statBoxSub}>High-resolution field evidence of public work.</p>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statBoxNum}>10,000+</span>
              <span className={styles.statBoxTitle}>Lives Directly Impacted</span>
              <p className={styles.statBoxSub}>Through scholarships, mobile clinics & co-ops.</p>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statBoxNum}>85+</span>
              <span className={styles.statBoxTitle}>Field Events Conducted</span>
              <p className={styles.statBoxSub}>Health camps, tree drives & youth summits.</p>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statBoxNum}>500+</span>
              <span className={styles.statBoxTitle}>Active Volunteers</span>
              <p className={styles.statBoxSub}>Mobilized across 16 Indian states.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRE-FOOTER CALL TO ACTION (CTA) */}
      <section className={styles.preFooterCta} id="gallery-pre-footer-cta">
        <div className={styles.ctaCard}>
          <div className={styles.ctaBgOverlay} />
          <div className={styles.ctaContentRow}>
            <div className={styles.ctaImgCol}>
              <img src={awardCeremony} alt="Volunteers Award" className={styles.ctaImg} />
            </div>
            <div className={styles.ctaTextCol}>
              <span className={styles.ctaTag}>Join The Movement</span>
              <h2 className={styles.ctaTitle}>Be Part of More Stories Like These</h2>
              <p className={styles.ctaDesc}>
                Whether you offer your time as a grassroots volunteer or fund vital field programs, 
                your action immediately empowers a community in need.
              </p>
              <div className={styles.ctaButtonsGroup}>
                <button 
                  type="button" 
                  className={styles.ctaPrimaryBtn}
                  onClick={() => setActiveTab && setActiveTab('volunteer')}
                  id="cta-become-volunteer-btn"
                >
                  <span>Become a Volunteer</span>
                  <Users size={16} />
                </button>
                <button 
                  type="button" 
                  className={styles.ctaSecondaryBtn}
                  onClick={() => setActiveTab && setActiveTab('donate')}
                  id="cta-donate-now-btn"
                >
                  <span>Donate Now</span>
                  <Heart size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FULLSCREEN LIGHTBOX & STORY VIEWER MODAL */}
      {currentSelectedItem && (
        <div 
          className={styles.modalBackdrop}
          onClick={() => setSelectedItemIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          id="gallery-lightbox-modal"
        >
          <div 
            className={styles.modalContainer}
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()} // Disable right-click download
          >
            {/* Top Modal Controls */}
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleMeta}>
                <span className={styles.modalBadge}>{currentSelectedItem.category}</span>
                <span className={styles.modalLoc}><MapPin size={13} /> {currentSelectedItem.location}</span>
              </div>
              
              <div className={styles.modalActions}>
                {/* Zoom Toggle */}
                {!currentSelectedItem.isVideo && (
                  <button 
                    type="button" 
                    className={styles.modalControlBtn}
                    onClick={() => setIsZoomed(prev => !prev)}
                    title={isZoomed ? "Zoom Out" : "Zoom In"}
                  >
                    {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
                  </button>
                )}

                {/* Close Button */}
                <button 
                  type="button" 
                  className={styles.modalCloseBtn}
                  onClick={() => {
                    setSelectedItemIndex(null);
                    setIsZoomed(false);
                  }}
                  id="lightbox-close-btn"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Main Stage: Prev Button + Media + Next Button */}
            <div className={styles.modalStage}>
              
              {/* Prev Navigation Button */}
              {selectedItemIndex > 0 && (
                <button 
                  type="button" 
                  className={`${styles.navBtn} ${styles.prevBtn}`}
                  onClick={handlePrevLightbox}
                  title="Previous Story (Left Arrow)"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {/* Media Container */}
              <div className={styles.mediaContainer}>
                {currentSelectedItem.isVideo ? (
                  <div className={styles.videoWrapper}>
                    <video 
                      src={currentSelectedItem.videoUrl} 
                      poster={currentSelectedItem.image}
                      controls 
                      autoPlay 
                      className={styles.modalVideo}
                    />
                  </div>
                ) : (
                  <div className={`${styles.imageWrapper} ${isZoomed ? styles.zoomedImage : ''}`}>
                    <img 
                      src={currentSelectedItem.image} 
                      alt={currentSelectedItem.title} 
                      className={styles.modalImg}
                    />
                  </div>
                )}
              </div>

              {/* Next Navigation Button */}
              {selectedItemIndex < filteredItems.length - 1 && (
                <button 
                  type="button" 
                  className={`${styles.navBtn} ${styles.nextBtn}`}
                  onClick={handleNextLightbox}
                  title="Next Story (Right Arrow)"
                >
                  <ChevronRight size={24} />
                </button>
              )}

            </div>

            {/* Bottom Story Text & CTA Actions */}
            <div className={styles.modalFooter}>
              <div className={styles.modalTextCol}>
                <div className={styles.modalMetaDate}>
                  <Calendar size={13} />
                  <span>Documented in {currentSelectedItem.displayDate}</span>
                </div>
                <h2 className={styles.modalHeadline}>{currentSelectedItem.title}</h2>
                <p className={styles.modalFullStory}>{currentSelectedItem.fullStory}</p>
              </div>

              <div className={styles.modalCtaCol}>
                <button 
                  type="button" 
                  className={styles.modalDonateActionBtn}
                  onClick={() => handleSupportCauseClick(currentSelectedItem.category)}
                  id="modal-direct-support-btn"
                >
                  <span>Support {currentSelectedItem.category} Programs</span>
                  <ArrowRight size={16} />
                </button>
                <span className={styles.modalProtectedNote}>
                  Protected NGO Asset • Download Disabled
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
