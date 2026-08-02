import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  X,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  ZoomIn,
  ZoomOut,
  ChevronDown,
  Layers,
  Heart,
  Sparkles,
  Filter
} from 'lucide-react';
import styles from '../styles/Gallery.module.css';

// Local high-res images
import heroGirl from '../assets/images/hero_school_girl.png';
import awardCeremony from '../assets/images/award_ceremony.png';
import kidsStory from '../assets/images/our_story_kids.jpg';
import shikshaRuke from '../assets/images/shiksha_na_ruke.jpg';
import slider1 from '../assets/images/slider_new1.jpg';
import slider2 from '../assets/images/slider_new2.jpg';
import slider3 from '../assets/images/slider3.jpg';
import slider4 from '../assets/images/slider_new4.jpg';
import lxmiDevi from '../assets/images/lxmina_devi.jpg';
import brideKit from '../assets/images/bride_household_kit.png';
import cattleFodder from '../assets/images/cattle_fodder_distribution.png';
import elderlyFood from '../assets/images/elderly_food_ration.png';
import elderlyWelfare from '../assets/images/elderly_welfare_check.png';
import homeRepair from '../assets/images/home_repair_widow.png';
import saharaHero from '../assets/images/sahara_hero_support.png';
import seniorMedicine from '../assets/images/senior_medicine_distribution.png';
import galleryAward from '../assets/images/gallery_award_presentation.jpg';
import galleryPlantation from '../assets/images/gallery_tree_plantation.jpg';
import kioskBooth from '../assets/images/worlify_kiosk_booth.jpg';

export default function Gallery({ setActiveTab, setDonationPreload }) {
  // Filter & Pagination States
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(4); // Default 4 images
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Touch Swipe coordinates for Lightbox
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Helper to handle both Next.js imported image objects (.src) and static URL strings
  const getImageSrc = (img) => {
    if (!img) return '';
    if (typeof img === 'object' && img.src) return img.src;
    return img;
  };

  // Master Gallery Dataset (25 High-Quality Photos for Pagination Testing)
  const galleryItems = useMemo(() => [

    {
      id: 1,
      title: "Amity Euphoria 2026 Honor & Award Ceremony",
      category: "Volunteers",
      image: galleryAward,
      description: "Recognizing outstanding youth leadership and social impact contributions.",
      views: "8.5k Views",
      date: "Feb 2026",
      fullStory: "Worlify Foundation leadership receiving the honor award at Amity Euphoria 2026 for outstanding community service, youth mobilization, and social welfare drives.",
      location: "Amity University, Lucknow"
    },
    {
      id: 2,
      title: "Community Green Canopy & Tree Plantation Drive",
      category: "Environment",
      image: galleryPlantation,
      description: "Planting native saplings and nurturing green spaces with student volunteers.",
      views: "7.2k Views",
      date: "May 2026",
      fullStory: "Volunteers and environmental enthusiasts coming together to plant native saplings and install watering setups to ensure sustainable green growth across community compounds.",
      location: "Lucknow Green Drive"
    },

    {
      id: 5,
      title: "Shiksha Na Ruke: Evening Learning Hubs",
      category: "Community Support",
      image: shikshaRuke,
      description: "Bridge courses & warm meals for 400+ underprivileged children after work hours.",
      views: "6.2k Views",
      date: "April 2026",
      fullStory: "The Shiksha Na Ruke Center serves as a safe physical sanctuary after hours, serving warm nutritious meals and specialized remedial tutoring to children from underserved urban communities.",
      location: "Delhi NCR Outreach"
    },
    {
      id: 6,
      title: "Flood Relief & Emergency Food Distribution",
      category: "Emergency Aid",
      image: slider1,
      description: "Distributing ration kits & clean drinking water to flood-affected riverbank families.",
      views: "4.1k Views",
      date: "March 2026",
      fullStory: "During seasonal river basin flooding, our emergency response team mobilized logistics within 12 hours, ensuring dry food packs and water purification tablets reached 1,500 stranded households.",
      location: "Assam River Belt"
    },
    {
      id: 7,
      title: "National Volunteer Leadership Summit",
      category: "Volunteers",
      image: awardCeremony,
      description: "Honoring 300+ grassroots change-makers for outstanding humanitarian field service.",
      views: "7.5k Views",
      date: "March 2026",
      fullStory: "Our annual summit gathered 300+ field volunteers across 16 states. Outstanding youth organizers were honored with the Golden Heart Fellowship awards for driving over 50,000 community service hours.",
      location: "New Delhi Convention Hall"
    },
    {
      id: 8,
      title: "Youth Climate Action & Micro-Forest Plantation",
      category: "Volunteers",
      image: slider4,
      description: "Mobilizing 800 school students to plant 5,000 native tree saplings in urban parks.",
      views: "2.8k Views",
      date: "Feb 2026",
      fullStory: "Urban heat islands require rapid green canopy restoration. Students took ownership of individual saplings, learning environmental science while building a greener city for tomorrow.",
      location: "Bengaluru Urban Parks"
    },
    {
      id: 9,
      title: "Pediatric Primary School Health & Dental Camp",
      category: "Health",
      image: kidsStory,
      description: "Free pediatric screenings, prescription glasses & dental hygiene kits for 1,200 kids.",
      views: "5.1k Views",
      date: "Feb 2026",
      fullStory: "Uncorrected vision problems are a leading hidden cause of school dropouts. Specialist doctors screened over 1,200 children, delivering custom corrective glasses and dental care kits.",
      location: "Lucknow District Schools"
    },
    {
      id: 10,
      title: "Worlify Foundation Awareness & Community Kiosk",
      category: "Community Support",
      image: kioskBooth,
      description: "Mobile awareness kiosk spreading education, women empowerment, & child welfare mission.",
      views: "5.8k Views",
      date: "Jan 2026",
      fullStory: "Our custom Worlify Foundation awareness & community kiosk provides direct consultation, donation guidance, and information on child education, women empowerment, and social welfare programs.",
      location: "Lucknow City Center"
    },
    {
      id: 11,
      title: "Digital Literacy Laptop Labs for Rural Schools",
      category: "Community Support",
      image: slider2,
      description: "Solar-powered computer labs equipping rural primary schools with tech skills.",
      views: "4.3k Views",
      date: "Jan 2026",
      fullStory: "Bridging the digital divide starts early. We established 10 solar-powered computer labs with 150 laptops, enabling over 2,000 rural students to gain typing, computer literacy, and internet access.",
      location: "Madhya Pradesh Villages"
    },

    {
      id: 13,
      title: "Elderly Health & Comprehensive Checkup Camp",
      category: "Senior Care",
      image: elderlyWelfare,
      description: "Free blood sugar, vision, and cardiology checkups for vulnerable senior citizens.",
      views: "4.6k Views",
      date: "Dec 2025",
      fullStory: "Free comprehensive health camps organized for senior citizens without family support. Over 450 seniors received free blood tests, ECG screenings, and prescription medication.",
      location: "Ayodhya Outskirts"
    },
    {
      id: 14,
      title: "Widow Housing Repair & Shelter Renovation",
      category: "Community Support",
      image: homeRepair,
      description: "Rebuilding roofs & installing sanitation facilities for destitute single mothers.",
      views: "2.9k Views",
      date: "Nov 2025",
      fullStory: "Heavy monsoons damaged mud homes of widowed mothers. Volunteer construction teams repaired tin roofs, fortified brick walls, and built private clean toilets for 35 families.",
      location: "Purvanchal Hamlets"
    },
    {
      id: 15,
      title: "Sahara Hero Support & Community Empowerment",
      category: "Community Support",
      image: saharaHero,
      description: "Recognizing grassroots community heroes who volunteer daily for welfare drives.",
      views: "5.0k Views",
      date: "Nov 2025",
      fullStory: "Local champions drive grassroots progress. We honored 50 neighborhood leads who manage daily meal counters, distribution centers, and child protection committees.",
      location: "Patna Welfare Center"
    },
    {
      id: 16,
      title: "Clean Water Solar Aquifer Installation",
      category: "Community Support",
      image: slider3,
      description: "Solar-powered deep borewell filtration units supplying pure water to 500 homes.",
      views: "4.0k Views",
      date: "Oct 2025",
      fullStory: "Inaugurated solar-powered extraction rigs linked to sand filtration beds, delivering clean, chilled drinking water to community taps and dropping water-borne illnesses by 80%.",
      location: "Thar Desert Fringe"
    },

    {
      id: 18,
      title: "Community Warm Blanket & Winter Aid Drive",
      category: "Emergency Aid",
      image: slider1,
      description: "Distributing 3,000 heavy woolen blankets to homeless individuals during severe winters.",
      views: "5.8k Views",
      date: "Jan 2025",
      fullStory: "Night patrols distributed thick winter blankets, wool coats, and hot soup to urban homeless populations sleeping in unheated night shelters across Northern India.",
      location: "Delhi NCR Night Shelters"
    },
    {
      id: 19,
      title: "Girl Child Nutrition & Growth Monitoring Camp",
      category: "Health",
      image: heroGirl,
      description: "Fighting anemia & malnutrition in rural adolescent girls with fortified dietary supplements.",
      views: "4.2k Views",
      date: "Feb 2025",
      fullStory: "Anemia affects over 60% of rural teenage girls. Our healthcare workers provided hemoglobin screenings, iron-folic acid supplements, and nutrition education to 2,000 students.",
      location: "Chhota Nagpur Plateau"
    },
    {
      id: 20,
      title: "Senior Citizen Friendship & Recreation Center",
      category: "Senior Care",
      image: elderlyWelfare,
      description: "Creating safe community day centers with board games, books, and social companionship.",
      views: "3.4k Views",
      date: "Mar 2025",
      fullStory: "Combating loneliness among seniors by establishing day recreation centers equipped with libraries, board games, yoga sessions, and daily community meals.",
      location: "Kolkata Suburbs"
    },

    {
      id: 22,
      title: "Slum Sanitation & Clean Neighborhood Drive",
      category: "Community Support",
      image: slider4,
      description: "Community cleanup, waste segregation bins & sanitization in dense urban settlements.",
      views: "2.9k Views",
      date: "May 2025",
      fullStory: "Youth volunteers conducted waste cleanup drives, distributed color-coded recycling bins, and disinfected communal drainage lines serving over 3,000 residents.",
      location: "Mumbai Suburban Slums"
    },
    {
      id: 23,
      title: "Children's Art & Creative Expression Fest",
      category: "Volunteers",
      image: kidsStory,
      description: "Annual art competition & talent showcase celebrating creativity in primary school kids.",
      views: "4.9k Views",
      date: "Jun 2025",
      fullStory: "Over 500 children participated in an open-air painting workshop expressing their dreams for clean oceans, green forests, and equal access to education.",
      location: "Bhopal Cultural Center"
    },

    {
      id: 24,
      title: "Emergency Ambulance & Disaster Support Fleet",
      category: "Health",
      image: seniorMedicine,
      description: "24/7 free emergency patient transport for rural patients needing hospital ICU care.",
      views: "5.1k Views",
      date: "Jul 2025",
      fullStory: "Deployed 5 fully equipped life-support ambulances to transport critically ill patients from rural clinic outposts to city multi-specialty government hospitals.",
      location: "Gorakhpur Region"
    },
    {
      id: 25,
      title: "Annual Volunteer Appreciation & Fellowship",
      category: "Volunteers",
      image: awardCeremony,
      description: "Celebrating thousands of volunteer hours & community impact achievements.",
      views: "6.0k Views",
      date: "Aug 2025",
      fullStory: "Recognizing youth leaders and field volunteers whose dedication brings hope, warm meals, and education to thousands of underprivileged families every single day.",
      location: "National NGO HQs"
    },
    {
      id: 26,
      title: "Stray Animal Rescue & Veterinary Care",
      category: "Animal Welfare",
      image: "/images/gallery/animal-welfare/animal_2.jpg",
      description: "Rescuing and providing medical aid to injured stray animals in rural shelters.",
      views: "4.5k Views",
      date: "Jul 2025",
      fullStory: "Our veterinary teams conduct daily rescue operations, treating injured animals and placing them in safe, compassionate shelter sanctuaries.",
      location: "NGO Animal Sanctuary"
    },
    {
      id: 27,
      title: "Livestock Fodder & Health Inspection Drive",
      category: "Animal Welfare",
      image: "/images/gallery/animal-welfare/animal_3.jpg",
      description: "Regular health inspections and emergency feeding drives for farm livestock.",
      views: "3.8k Views",
      date: "Jun 2025",
      fullStory: "Supporting agrarian families by ensuring their cattle receive vaccinations, deworming treatment, and high-protein green fodder.",
      location: "Rural Agrarian Belt"
    },
    {
      id: 28,
      title: "Animal Habitat & Conservation Support",
      category: "Animal Welfare",
      image: "/images/gallery/animal-welfare/animal_4.jpg",
      description: "Promoting co-existence and protecting native animal habitats in community lands.",
      views: "5.2k Views",
      date: "May 2025",
      fullStory: "Community awareness campaigns promoting peaceful human-wildlife co-existence and establishing water troughs during dry summer months.",
      location: "Forest Fringe Villages"
    },
    {
      id: 29,
      title: "Community Animal Feed & Water Station Drive",
      category: "Animal Welfare",
      image: "/images/gallery/animal-welfare/animal_5.jpg",
      description: "Installing clean drinking water bowls and daily feeding spots for stray animals.",
      views: "4.1k Views",
      date: "Apr 2025",
      fullStory: "Volunteers set up and refill over 200 public water bowls daily across neighborhood centers, safeguarding strays against dehydration.",
      location: "Suburban Neighborhoods"
    },
    {
      id: 30,
      title: "Veterinary Medical Camp & Vaccination Drive",
      category: "Animal Welfare",
      image: "/images/gallery/animal-welfare/animal_6.jpg",
      description: "Free anti-rabies vaccination and health checks for community animals.",
      views: "3.9k Views",
      date: "Mar 2025",
      fullStory: "Protecting community animals through free vaccination camps, health checkups, and emergency medical kits for local animal caregivers.",
      location: "District Care Center"
    },

    { id: 32, category: "Environment", image: "/images/gallery/environment/plantation_8.jpg" },
    { id: 33, category: "Environment", image: "/images/gallery/environment/plantation_13.jpg" },
    { id: 34, category: "Environment", image: "/images/gallery/environment/plantation_14.jpg" },
    { id: 35, category: "Environment", image: "/images/gallery/environment/plantation_15.jpg" },
    { id: 36, category: "Environment", image: "/images/gallery/environment/plantation_16.jpg" },
    { id: 50, category: "Education", image: "/images/gallery/education/education_1.jpg" },
    { id: 51, category: "Education", image: "/images/gallery/education/education_2.jpg" },
    { id: 52, category: "Education", image: "/images/gallery/education/education_3.jpg" },
    { id: 53, category: "Education", image: "/images/gallery/education/education_4.jpg" },
    { id: 54, category: "Education", image: "/images/gallery/education/education_5.jpg" },
    { id: 55, category: "Education", image: "/images/gallery/education/education_6.jpg" },
    { id: 56, category: "Education", image: "/images/gallery/education/education_7.jpg" },
    { id: 57, category: "Education", image: "/images/gallery/education/education_8.jpg" },
    { id: 58, category: "Education", image: "/images/gallery/education/education_9.jpg" },
    { id: 59, category: "Education", image: "/images/gallery/education/education_10.jpg" },
    { id: 60, category: "Education", image: "/images/gallery/education/education_11.jpg" },
    { id: 61, category: "Education", image: "/images/gallery/education/education_12.jpg" },
    { id: 62, category: "Education", image: "/images/gallery/education/education_13.jpg" },
    { id: 63, category: "Education", image: "/images/gallery/education/education_14.jpg" },
    { id: 64, category: "Education", image: "/images/gallery/education/education_15.jpg" },
    { id: 65, category: "Education", image: "/images/gallery/education/education_16.jpg" },
    { id: 66, category: "Education", image: "/images/gallery/education/education_17.jpg" },
    { id: 67, category: "Education", image: "/images/gallery/education/education_18.jpg" },
    { id: 68, category: "Education", image: "/images/gallery/education/education_19.jpg" },
    { id: 69, category: "Education", image: "/images/gallery/education/education_20.jpg" },
    { id: 70, category: "Education", image: "/images/gallery/education/education_21.jpg" },
    { id: 71, category: "Education", image: "/images/gallery/education/education_22.jpg" },
    { id: 72, category: "Education", image: "/images/gallery/education/education_23.jpg" },
    { id: 73, category: "Education", image: "/images/gallery/education/education_24.jpg" },
    { id: 74, category: "Education", image: "/images/gallery/education/education_25.jpg" },
    { id: 75, category: "Education", image: "/images/gallery/education/education_26.jpg" },
    { id: 76, category: "Education", image: "/images/gallery/education/education_27.jpg" },
    { id: 77, category: "Education", image: "/images/gallery/education/education_28.jpg" }
  ], []);

  // Category Filter Options
  const categories = ['All', 'Education', 'Health', 'Environment', 'Women Empowerment', 'Senior Care', 'Emergency Aid', 'Volunteers', 'Animal Welfare'];

  // Filtered Items Logic
  const filteredItems = useMemo(() => {
    return galleryItems.filter(item => activeFilter === 'All' || item.category === activeFilter);
  }, [galleryItems, activeFilter]);

  // Displayed Items (Limited by visibleCount)
  const displayedItems = filteredItems.slice(0, visibleCount);

  // Load More Click Handler: +2 photos each click
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 2);
  };

  // Selected item modal details
  const currentSelectedItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

  // Keyboard navigation for Lightbox
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

  // Touch Swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) > 50) {
      if (distance > 0) handleNextLightbox();
      else handlePrevLightbox();
    }
  };

  return (
    <div className={styles.galleryPage} id="gallery-page-root">

      {/* 1. HEADER BANNER (Exact Match to User Reference Screenshot) */}
      <header className={styles.headerBanner} id="gallery-header-banner">
        <div className={styles.headerContainer}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <span
              className={styles.breadcrumbLink}
              onClick={() => setActiveTab && setActiveTab('home')}
              id="gallery-breadcrumb-home"
            >
              Home
            </span>
            <span className={styles.breadcrumbSeparator}>&gt;</span>
            <span className={styles.breadcrumbActive}>Worlify Memories</span>
          </nav>

          <h1 className={styles.bannerTitle}>Worlify Memories</h1>

          {/* Green accent line under the heading */}
          <div className={styles.greenAccentLine} />
        </div>
      </header>

      {/* 2. CATEGORY FILTER TOOLBAR */}
      <section className={styles.toolbarSection} id="gallery-toolbar">
        <div className={styles.container}>
          <div className={styles.toolbarWrapper}>

            {/* Category Pills */}
            <div className={styles.categoryPills}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`${styles.filterPill} ${activeFilter === cat ? styles.filterPillActive : ''}`}
                  onClick={() => {
                    setActiveFilter(cat);
                    setVisibleCount(4); // Reset count to 4 when switching category
                  }}
                  id={`gallery-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 3. GALLERY GRID (2 IMAGES IN A ROW WITH CURVED BORDERS & LAZY LOADING) */}
      <main className={styles.mainGridSection} id="gallery-grid-container">
        <div className={styles.container}>

          {filteredItems.length === 0 ? (
            <div className={styles.noResults}>
              <Filter size={40} className={styles.noResultsIcon} />
              <h3>No photos found</h3>
              <p>We couldn't find any photos matching your current search or filter selection.</p>
              <button
                type="button"
                className={styles.resetBtn}
                onClick={() => {
                  setActiveFilter('All');
                  setVisibleCount(4);
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className={styles.twoColumnGrid}>
              {displayedItems.map((item, index) => (
                <div
                  key={item.id}
                  className={styles.imageCard}
                  onClick={() => setSelectedItemIndex(index)}
                  id={`gallery-item-card-${item.id}`}
                >
                  {/* Curved Border Image Wrapper */}
                  <div className={styles.imageWrapper}>
                    <img
                      src={getImageSrc(item.image)}
                      alt={item.title || "Worlify Memory"}
                      loading="lazy"
                      className={styles.galleryImg}
                    />
                    <div className={styles.cardHoverOverlay}>
                      <span className={styles.viewBadge}>
                        <ZoomIn size={16} /> View Photo
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. VIEW MORE BUTTON (+5 IMAGES ON EACH CLICK) */}
          {filteredItems.length > visibleCount && (
            <div className={styles.viewMoreContainer}>
              <button
                type="button"
                className={styles.viewMoreBtn}
                onClick={handleLoadMore}
                id="gallery-view-more-btn"
              >
                <span>View More</span>
                <ChevronDown size={18} />
              </button>
              <p className={styles.showingCountText}>
                Showing {displayedItems.length} of {filteredItems.length} photos
              </p>
            </div>
          )}

          {/* Indicator when all photos in current filter are loaded */}
          {filteredItems.length > 0 && filteredItems.length <= visibleCount && (
            <div className={styles.allLoadedText}>
              <span>Showing {displayedItems.length} of {filteredItems.length} photos • All photos loaded</span>
            </div>
          )}

        </div>
      </main>

      {/* 5. LIGHTBOX MODAL */}
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
          >
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleMeta}>
                <span className={styles.modalCategory}>{currentSelectedItem.category}</span>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.modalZoomBtn}
                  onClick={() => setIsZoomed(prev => !prev)}
                  title={isZoomed ? "Zoom Out" : "Zoom In"}
                >
                  {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
                </button>
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

            {/* Modal Stage */}
            <div className={styles.modalStage}>
              {selectedItemIndex > 0 && (
                <button
                  type="button"
                  className={`${styles.navBtn} ${styles.prevBtn}`}
                  onClick={handlePrevLightbox}
                  title="Previous Photo"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              <div className={`${styles.modalImageWrapper} ${isZoomed ? styles.zoomed : ''}`}>
                <img
                  src={getImageSrc(currentSelectedItem.image)}
                  alt={currentSelectedItem.title || "Worlify Memory"}
                  className={styles.modalImg}
                />
              </div>

              {selectedItemIndex < filteredItems.length - 1 && (
                <button
                  type="button"
                  className={`${styles.navBtn} ${styles.nextBtn}`}
                  onClick={handleNextLightbox}
                  title="Next Photo"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>

            {/* Modal Footer */}
            <div className={styles.modalFooter}>
              <div className={styles.modalCtaCol}>
                <button
                  type="button"
                  className={styles.modalDonateBtn}
                  onClick={() => {
                    if (setDonationPreload) setDonationPreload(currentSelectedItem.category);
                    if (setActiveTab) setActiveTab('donate');
                    setSelectedItemIndex(null);
                  }}
                >
                  <span>Support {currentSelectedItem.category}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
