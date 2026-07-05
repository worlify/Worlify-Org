import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  SlidersHorizontal, 
  ArrowRight, 
  Eye, 
  Heart, 
  Play, 
  MapPin, 
  BookOpen
} from 'lucide-react';
import styles from '../styles/Gallery.module.css';

/**
 * Gallery Component - High Fidelity Redesign matching Mockup
 * Features an asymmetric layout:
 * - Top-left: Wide featured card with overlay
 * - Top-right: Interactive video card
 * - Below: 3-column masonry list of rich story-cards
 * Fully integrated with dynamic tab filters, sorting, search,
 * and seamless deep links to causes or donations.
 */
export default function Gallery({ setActiveTab, setDonationPreload }) {
  const [activeFilter, setActiveFilter] = useState('All Stories');
  const [sortBy, setSortBy] = useState('latest'); // 'latest' | 'oldest'
  const [visibleCount, setVisibleCount] = useState(5);
  const [selectedStory, setSelectedStory] = useState(null);

  const galleryItems = [
    {
      id: 1,
      title: "Empowering Amara's Future",
      category: "Education",
      label: "Education",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
      description: "How a community scholarship changed the trajectory of a whole village through Amara's journey into biotechnology.",
      views: "2.4k Views",
      supports: "842 Supports",
      date: "2026-06-15",
      displayDate: "June 2026",
      isWide: true,
      fullStory: "Amara grew up in a rural village where access to science education was severely limited. Her passion for botany and chemistry caught the attention of our local field instructors. Through Worlify's STEM Scholar program, funded entirely by public micro-donations, Amara secured a full scholarship to study biotechnology at the Africa Biosciences Hub in Kigali. Today, she is lead researcher on a crop resistance project designed to protect maize harvests from drought, directly impacting over 10,000 farmers in her home district. Her journey is a testament to the compounding power of education.",
      location: "Kigali, Rwanda"
    },
    {
      id: 2,
      title: "Green Earth Initiative",
      category: "Environment",
      label: "Impact Video",
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=800",
      description: "Witness the energetic community mobilization restoring degraded forest buffers and protecting local watersheds.",
      isVideo: true,
      date: "2026-05-20",
      displayDate: "May 2026",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-planting-a-small-plant-in-the-soil-41584-large.mp4",
      fullStory: "Our reforestation efforts are completely community-driven. In this short impact documentary, see how 250 local households volunteered to plant native broadleaf saplings, establish sustainable fire lines, and protect vital headwater streams from erosion. Your contributions purchased the shovels, compost, protective tree-guards, and water tankers that made this scale of restorative forestry possible.",
      location: "Amazon Basin Buffer"
    },
    {
      id: 3,
      title: "10k Trees Planted",
      category: "Environment",
      label: "Environment",
      image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=800",
      description: "Our reforestation project in the Amazon basin has reached its first major milestone, restoring 15 hectares of vital...",
      date: "2026-04-10",
      displayDate: "April 2026",
      fullStory: "The Amazon basin restoration project represents our most ambitious ecological footprint yet. By partnering directly with indigenous landholders, we have successfully completed our first phase of planting 10,000 native hardwood trees. This initiative not only carbon-offsets thousands of tonnes of emissions but also secures critical soil layers from devastating rainfall landslides. Local children are integrated into weekend seedling maintenance programs, passing down vital biodiversity knowledge to the next generation.",
      location: "Ecuadorian Amazon"
    },
    {
      id: 4,
      title: "A Safe Haven",
      category: "Child Welfare",
      label: "Child Welfare",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
      description: "The Joy Center provides after-school care and nutritional support for 200 children from marginalized families.",
      date: "2026-03-05",
      displayDate: "March 2026",
      fullStory: "For working families in congested urban informal settlements, safe childcare is often a luxury. The Joy Center, established in partnership with community parents, serves as a safe physical sanctuary after school hours. Here, children receive a hot, nutrient-dense meal, one-on-one homework tutoring, mental health coaching, and a structured playground to just be kids. Since opening, parent attendance at work has stabilized, and student grades in primary schools have shown a remarkable 35% average improvement.",
      location: "Mumbai Urban Outpost"
    },
    {
      id: 5,
      title: "Reaching the Remote",
      category: "Health",
      label: "Health",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
      description: "Mobile clinics are bringing life-saving vaccinations and primary care to over 50 remote villages this year.",
      date: "2026-02-18",
      displayDate: "February 2026",
      fullStory: "High altitude or geographical isolation should never dictate health outcomes. Our custom-outfitted, all-terrain mobile clinic vans traverse challenging terrains weekly. Staffed by dedicated rotating volunteer nurses and doctors, these mobile units perform routine child immunizations, maternal checkups, point-of-care lab diagnostics, and basic diabetes management. By meeting families right at their doorsteps, we bypass the immense barrier of transportation costs and travel fatigue.",
      location: "Andean Foothills"
    },
    {
      id: 6,
      title: "Tailoring Co-op Independence",
      category: "Women Empowerment",
      label: "Women Empowerment",
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=800",
      description: "A group of 30 women graduated from tailoring skills workshops to establish a self-run manufacturing co-op.",
      date: "2026-01-22",
      displayDate: "January 2026",
      fullStory: "Through our vocational workshop initiatives, 30 local women completed high-level sewing, garment cutting, and business management courses. Armed with grant-funded sewing machines and materials, they formed the 'Sisters of Stitch' cooperative. They now craft school uniforms and custom textiles, ensuring a steady independent income source for their families while lifting collective community credit.",
      location: "Dhaka Suburbs"
    },
    {
      id: 7,
      title: "Solar Aquifer Pumps Launched",
      category: "Environment",
      label: "Environment",
      image: "https://images.unsplash.com/photo-1541913076-2e998f4df6f9?auto=format&fit=crop&q=80&w=800",
      description: "Inaugurated three new solar-powered deep borewells, supplying pure drinking water directly to 500 households.",
      date: "2025-12-05",
      displayDate: "December 2025",
      fullStory: "Drought and groundwater contamination have plagued dry agrarian villages for years. By engineering solar-powered extraction rigs linked to sand filtration beds, we have bypassed electrical grid instability to deliver fresh, chilled drinking water to community distribution taps. Water-borne illnesses have plummeted by over 80% since these solar pumps were commissioned.",
      location: "Rajasthan Desert Fringe"
    },
    {
      id: 8,
      title: "Financial Literacy Seminars",
      category: "Education",
      label: "Education",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
      description: "Providing critical micro-savings and bookkeeping skills to agricultural self-help networks.",
      date: "2025-11-12",
      displayDate: "November 2025",
      fullStory: "Education isn't limited to school children. Our adult financial education initiatives empower farmers and micro-vendors to budget, pool credit, understand interest, and build rainy-day emergency funds. Over 120 self-help groups have completed our training, creating resilient neighborhood financial buffers.",
      location: "Gujarat Farm Collective"
    }
  ];

  // Sorting
  const sortedItems = [...galleryItems].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.date) - new Date(a.date);
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  });

  // Filter category clean helper
  const matchesFilter = (item, filter) => {
    if (filter === 'All Stories') return true;
    if (filter === 'Health') return item.category === 'Health' || item.category === 'Healthcare';
    return item.category.toLowerCase() === filter.toLowerCase();
  };

  const filteredItems = sortedItems.filter(item => matchesFilter(item, activeFilter));
  
  // Slicing for Pagination
  const displayedItems = filteredItems.slice(0, visibleCount);

  // Toggle Sorting
  const toggleSort = () => {
    setSortBy(prev => prev === 'latest' ? 'oldest' : 'latest');
  };

  // Switch to donation with pre-populated focus area
  const handleSupportCauseClick = (category) => {
    if (setDonationPreload) {
      setDonationPreload(category);
    }
    if (setActiveTab) {
      setActiveTab('donate');
    }
    // Close modal if open
    setSelectedStory(null);
  };

  return (
    <div className={styles.galleryWrapper} id="gallery-redesign-root">
      
      {/* 1. Header Cover Banner / Split Hero Layout */}
      <section className={styles.galleryHeader} id="gallery-cover-banner">
        <div className={styles.bannerOverlay} />
        <div className={styles.bannerContainer}>
          <span className={styles.bannerBadge}>Our Impact</span>
          <h1 className={styles.bannerTitle}>Stories of Hope and Resilience</h1>
          <p className={styles.bannerDesc}>
            Witness the real-world transformation of lives through our transparent, community-led initiatives across the globe.
          </p>
        </div>
      </section>

      {/* 2. Sorting & Category Filter Bar */}
      <section className={styles.toolbarSection} id="gallery-filter-toolbar">
        <div className={styles.tabsGroup}>
          {['All Stories', 'Education', 'Health', 'Child Welfare', 'Women Empowerment', 'Environment'].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`${styles.tabBtn} ${activeFilter === tab ? styles.activeTabBtn : ''}`}
              onClick={() => {
                setActiveFilter(tab);
                setVisibleCount(5); // Reset visible count on filter change
              }}
              id={`filter-tab-${tab.toLowerCase().replace(' ', '-')}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Sort Trigger */}
        <button 
          type="button" 
          className={styles.sortButton} 
          onClick={toggleSort}
          id="gallery-sort-trigger"
        >
          <SlidersHorizontal size={15} />
          <span>{sortBy === 'latest' ? 'Sort by Latest' : 'Sort by Oldest'}</span>
        </button>
      </section>

      {/* 3. Dynamic Structural Stories Grid */}
      <section className={styles.gridSection} id="gallery-grid-stage">
        <div className={styles.gridContainer}>
          
          <div className={styles.storiesGrid}>
            
            {displayedItems.map((item) => {
              // Special Layout for Amara's Future (id 1) when "All Stories" or "Education" filter is active
              if (item.id === 1 && (activeFilter === 'All Stories' || activeFilter === 'Education')) {
                return (
                  <div 
                    key={item.id} 
                    className={styles.wideCard}
                    onClick={() => setSelectedStory(item)}
                    id={`gallery-story-card-${item.id}`}
                  >
                    <img src={item.image} alt={item.title} className={styles.wideCardImg} />
                    <div className={styles.wideCardOverlay} />
                    
                    <div className={styles.wideCardContent}>
                      <span className={styles.eduPill}>{item.label}</span>
                      <h3 className={styles.wideCardTitle}>{item.title}</h3>
                      <p className={styles.wideCardDesc}>{item.description}</p>
                      
                      <div className={styles.wideCardMeta}>
                        <span className={styles.metaItem}>
                          <Eye size={14} />
                          {item.views}
                        </span>
                        <span className={styles.metaItem}>
                          <Heart size={14} />
                          {item.supports}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }

              // Special Layout for Impact Video Card (id 2) when "All Stories" or "Environment" is active
              if (item.id === 2 && (activeFilter === 'All Stories' || activeFilter === 'Environment')) {
                return (
                  <div 
                    key={item.id} 
                    className={styles.videoCard}
                    onClick={() => setSelectedStory(item)}
                    id={`gallery-story-card-${item.id}`}
                  >
                    <img src={item.image} alt={item.title} className={styles.videoCardImg} />
                    <div className={styles.videoCardOverlay} />
                    
                    {/* Pulsing Play symbol centered */}
                    <div className={styles.playButtonWrapper}>
                      <Play size={24} style={{ marginLeft: '4px' }} fill="currentColor" />
                    </div>

                    <div className={styles.videoContent}>
                      <span className={styles.videoPill}>{item.label}</span>
                      <h3 className={styles.videoTitle}>{item.title}</h3>
                    </div>
                  </div>
                );
              }

              // Standard 3-column Layout for all other Cards
              const categoryColorMap = {
                'Environment': '#7c3aed', // Purple
                'Child Welfare': '#059669', // Teal-green
                'Health': '#ef4444', // Red
                'Women Empowerment': '#db2777', // Pink
                'Education': '#2563eb' // Blue
              };

              const tagColor = categoryColorMap[item.category] || '#475569';

              return (
                <div 
                  key={item.id} 
                  className={styles.standardCard}
                  onClick={() => setSelectedStory(item)}
                  id={`gallery-story-card-${item.id}`}
                >
                  <div className={styles.standardCardImgWrapper}>
                    <img src={item.image} alt={item.title} className={styles.standardCardImg} />
                  </div>
                  
                  <div className={styles.standardCardBody}>
                    <span 
                      className={styles.standardCardCategory} 
                      style={{ color: tagColor }}
                    >
                      {item.category}
                    </span>
                    <h3 className={styles.standardCardTitle}>{item.title}</h3>
                    <p className={styles.standardCardDesc}>{item.description}</p>
                    
                    <span className={styles.readMoreLink}>
                      <span>Read Story</span>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              );
            })}

          </div>

          {/* Empty state if nothing matches category */}
          {displayedItems.length === 0 && (
            <div className={styles.emptyState}>
              <BookOpen size={48} className={styles.emptyIcon} />
              <h4>No field updates found</h4>
              <p>We are currently compiling on-the-ground reports for this focus area.</p>
            </div>
          )}

          {/* Pagination Load More Button */}
          {filteredItems.length > visibleCount && (
            <div className={styles.loadMoreContainer} id="gallery-load-more-box">
              <button 
                type="button" 
                className={styles.loadMoreBtn}
                onClick={() => setVisibleCount(prev => prev + 3)}
                id="gallery-load-more-btn"
              >
                Load More Stories
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 4. Elegant CTA Section at Bottom */}
      <section className={styles.ctaSection} id="gallery-call-to-action">
        <h2 className={styles.ctaTitle}>Donate to Support More Stories Like These</h2>
        <p className={styles.ctaDesc}>
          Your contribution directly fuels these transformations. 100% of public donations go directly to our field programs.
        </p>
        <div className={styles.ctaButtons}>
          <button 
            type="button" 
            className={styles.ctaPrimary}
            onClick={() => setActiveTab('donate')}
            id="gallery-cta-donate-btn"
          >
            Support a Cause
          </button>
          <button 
            type="button" 
            className={styles.ctaSecondary}
            onClick={() => setActiveTab('volunteer')}
            id="gallery-cta-fundraise-btn"
          >
            Start a Fundraiser
          </button>
        </div>
      </section>

      {/* 5. Interactive Zoom Lightbox / Detailed Video & Story Modal */}
      {selectedStory && (
        <div 
          className={styles.modalOverlay} 
          onClick={() => setSelectedStory(null)}
          id="gallery-modal-backdrop"
        >
          <div 
            className={styles.modalContent} 
            onClick={(e) => e.stopPropagation()}
            id="gallery-modal-body"
          >
            <button 
              className={styles.closeBtn} 
              onClick={() => setSelectedStory(null)}
              id="gallery-modal-close-btn"
            >
              <X size={20} />
            </button>

            {/* If it's a Video, render a beautiful HTML5 video player */}
            {selectedStory.isVideo ? (
              <div className={styles.modalVideoWrapper}>
                <video 
                  src={selectedStory.videoUrl} 
                  poster={selectedStory.image} 
                  controls 
                  autoPlay 
                  className={styles.modalVideo}
                />
              </div>
            ) : (
              <div className={styles.modalHeroImageWrapper}>
                <img src={selectedStory.image} alt={selectedStory.title} className={styles.modalHeroImage} />
              </div>
            )}

            {/* Story Text details */}
            <div className={styles.modalBody}>
              <div className={styles.modalMetaRow}>
                <span className={styles.modalCategoryBadge}>{selectedStory.label || selectedStory.category}</span>
                
                <div className={styles.modalMetaItems}>
                  <div className={styles.metaItem}>
                    <MapPin size={13} />
                    <span>{selectedStory.location}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <Calendar size={13} />
                    <span>{selectedStory.displayDate}</span>
                  </div>
                </div>
              </div>

              <h2 className={styles.modalTitle}>{selectedStory.title}</h2>
              <p className={styles.modalStoryText}>{selectedStory.fullStory}</p>
              
              {/* Inside detailed card metrics or actions */}
              <div className={styles.modalFooterActions}>
                <button 
                  type="button" 
                  className={styles.modalDonateBtn}
                  onClick={() => handleSupportCauseClick(selectedStory.category)}
                  id="modal-direct-support-btn"
                >
                  <span>Support {selectedStory.category} Programs</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
