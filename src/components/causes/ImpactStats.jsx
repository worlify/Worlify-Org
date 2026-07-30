import React, { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, School, Users, MapPin, Utensils, Package, Home, 
  Stethoscope, HeartPulse, Ambulance, Scale, Shield, Trees, Droplets, 
  Recycle, Heart, Wrench, Award, Briefcase, Coins, Sprout, CheckCircle
} from 'lucide-react';
import styles from '../../styles/CausePage.module.css';

const ICON_MAP = {
  GraduationCap, School, Users, MapPin, Utensils, Package, Home, 
  Stethoscope, HeartPulse, Ambulance, Scale, Shield, Trees, Droplets, 
  Recycle, Heart, Wrench, Award, Briefcase, Coins, Sprout
};

function AnimatedNumber({ targetNumber, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 2000; // 2 seconds animation

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out quad
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(easedProgress * targetNumber));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [targetNumber]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function ImpactStats({ stats }) {
  return (
    <section className={styles.impactStatsSection}>
      <div className={styles.container}>
        <div className={styles.statsGrid}>
          {stats.map((stat, idx) => {
            const IconComponent = ICON_MAP[stat.iconName] || CheckCircle;
            return (
              <div key={idx} className={styles.statItem}>
                <div className={styles.statIconBox}>
                  <IconComponent size={24} />
                </div>
                <div className={styles.statInfo}>
                  <span className={styles.statNumber}>
                    <AnimatedNumber targetNumber={stat.number} suffix={stat.suffix} />
                  </span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
