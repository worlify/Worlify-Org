'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/TestimonialsSlider.module.css';

const testimonialsData = [
  {
    id: 1,
    quote: "Being part of Worlify Foundation as a volunteer has been a deeply rewarding experience. The team is passionate, transparent, and deeply committed to bringing real educational change in rural schools.",
    name: "Anita Patel",
    role: "Volunteer",
    location: "Ahmedabad, Gujarat"
  },
  {
    id: 2,
    quote: "Worlify Foundation's initiatives in healthcare and social welfare have positively impacted many families in our community. Their mobile health units reach doorsteps where medical care is most needed.",
    name: "Sneha Tiwari",
    role: "Local Partner",
    location: "Varanasi, Uttar Pradesh"
  },
  {
    id: 3,
    quote: "The foundation operates with complete integrity and compassion. Every contribution is used meaningfully to support underprivileged children with mid-day nutrition and learning materials.",
    name: "Karan Mehta",
    role: "Donor",
    location: "Mumbai, Maharashtra"
  },
  {
    id: 4,
    quote: "The support and guidance provided by Worlify Foundation helped our children access better education and bright opportunities for their future.",
    name: "Rajesh Verma",
    role: "Parent Beneficiary",
    location: "Lucknow, Uttar Pradesh"
  },
  {
    id: 5,
    quote: "Watching young adolescent girls learn digital skills and build self-confidence through Worlify's workshops brings immense happiness. It is true grassroots empowerment in action.",
    name: "Priya Deshmukh",
    role: "Community Member",
    location: "Pune, Maharashtra"
  },
  {
    id: 6,
    quote: "Because of Worlify Foundation's learning center support and guidance, I could complete my higher secondary education smoothly. Today I am pursuing my college studies with full confidence.",
    name: "Rohan Verma",
    role: "Student",
    location: "Lucknow, Uttar Pradesh"
  },
  {
    id: 7,
    quote: "I have been supporting their rural health drives for over two years. The selfless commitment of their field workers in remote villages is really commendable and inspiring.",
    name: "Kavita Nair",
    role: "Health Worker",
    location: "Kochi, Kerala"
  },
  {
    id: 8,
    quote: "What sets Worlify Foundation apart is their absolute transparency and measurable social impact. Every rupee donated creates tangible transformation for families in need.",
    name: "Vikram Malhotra",
    role: "Donor",
    location: "Bengaluru, Karnataka"
  },
  {
    id: 9,
    quote: "Teaching children at Worlify's after-school learning centers has been an enriching journey. The joy and eagerness in their eyes when they pick up a book is priceless.",
    name: "Ananya Sen",
    role: "Volunteer",
    location: "Kolkata, West Bengal"
  },
  {
    id: 10,
    quote: "During monsoon floods, the Worlify team reached affected hamlets immediately with dry rations and hygiene kits. Their speed and empathy during crises are exemplary.",
    name: "Arjun Banerjee",
    role: "Social Worker",
    location: "Hyderabad, Telangana"
  },
  {
    id: 11,
    quote: "Worlify Foundation provided tailoring and handicraft skill training to 40 women in our village. Now we are earning independently and supporting our children's education.",
    name: "Sunita Rao",
    role: "SHG Member",
    location: "Mysuru, Karnataka"
  },
  {
    id: 12,
    quote: "Contributing monthly to Worlify Foundation gives me deep personal satisfaction. Knowing that my contribution educates a child or provides medical aid fills my heart with joy.",
    name: "Aditya Joshi",
    role: "Supporter",
    location: "Delhi NCR"
  },
  {
    id: 13,
    quote: "Worlify Foundation upgraded our government primary school library and provided sports kits. School attendance and enthusiasm among students have increased multi-fold!",
    name: "Meera Kulkarni",
    role: "Village Teacher",
    location: "Nagpur, Maharashtra"
  },
  {
    id: 14,
    quote: "Their skill development program gave me practical computer knowledge and job confidence. Now I am able to work and support my family proudly.",
    name: "Devansh Singhania",
    role: "Youth Trainee",
    location: "Jaipur, Rajasthan"
  },
  {
    id: 15,
    quote: "Volunteering as a medical officer in Worlify's health drives showed me their organized approach. They treat every villager with immense respect and care.",
    name: "Pooja Sundaram",
    role: "Volunteer Doctor",
    location: "Chennai, Tamil Nadu"
  }
];

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Update cards per view on resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCardsPerView(1);
      } else if (width < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonialsData.length - cardsPerView);

  // Adjust currentIndex if cardsPerView changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [cardsPerView, maxIndex, currentIndex]);

  // Smooth Auto Scroll Effect (every 3s)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
  };

  return (
    <section 
      className={styles.testimonialsSection} 
      id="testimonials-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
        
        {/* Section Header */}
        <div className={styles.headerWrapper}>
          <span className={styles.subHeading}>TESTIMONIALS</span>
          <h2 className={styles.mainHeading}>WHAT DONOR SAYS</h2>
          <div className={styles.accentBar}></div>
        </div>

        {/* Carousel Viewport & Cards */}
        <div 
          className={styles.carouselContainer}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className={styles.carouselTrack}
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
              transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            {testimonialsData.map((item) => (
              <div 
                key={item.id} 
                className={styles.cardWrapper}
                style={{ flex: `0 0 ${100 / cardsPerView}%` }}
              >
                <div className={styles.testimonialCard}>
                  
                  {/* Signature Top Border Frame with Cutout Quote */}
                  <div className={styles.topBorderLine}>
                    <div className={styles.borderSegmentLeft} />
                    <div className={styles.quoteAccentGroup}>
                      {/* Dual Red Solid Quote Icon */}
                      <svg className={styles.quoteSvg} viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 26V15.6C0 10.4 2.02 6.06 6.07 2.6C8.23 1.15 10.69 0.29 13.43 0L15.17 3.9C12.72 4.91 10.84 6.35 9.54 8.23C8.24 10.11 7.59 12.13 7.59 14.3H13V26H0ZM17 26V15.6C17 10.4 19.02 6.06 23.07 2.6C25.23 1.15 27.69 0.29 30.43 0L32.17 3.9C29.72 4.91 27.84 6.35 26.54 8.23C25.24 10.11 24.59 12.13 24.59 14.3H30V26H17Z" fill="#E62E2E" />
                      </svg>
                    </div>
                    <div className={styles.borderSegmentRight} />
                  </div>

                  {/* Body Text */}
                  <p className={styles.quoteText}>
                    “{item.quote}”
                  </p>

                  {/* Author Details - Equal height aligned bottom */}
                  <div className={styles.authorSection}>
                    <h3 className={styles.authorName}>{item.name}</h3>
                    <p className={styles.authorRole}>{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
