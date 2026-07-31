import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, GraduationCap, Laptop, Users, Utensils, Apple, Package, 
  Activity, Ambulance, HeartPulse, Pill, Stethoscope, Scale, Shield, 
  Megaphone, UserCheck, Trees, Droplet, Droplets, Recycle, Sun, Heart, Home, 
  Wrench, Code, Scissors, Briefcase, Coins, Sprout, Landmark, Award, 
  School, MapPin, CheckCircle, CheckCircle2, HeartHandshake, ShieldCheck,
  Building, TrendingUp, HelpCircle, PhoneCall, RefreshCw, Trash2, Gift,
  Clock, Eye
} from 'lucide-react';
import styles from '../../styles/CausePage.module.css';

const ICON_MAP = {
  BookOpen, GraduationCap, Laptop, Users, Utensils, Apple, Package, 
  Activity, Ambulance, HeartPulse, Pill, Stethoscope, Scale, Shield, 
  Megaphone, UserCheck, Trees, Droplet, Droplets, Recycle, Sun, Heart, Home, 
  Wrench, Code, Scissors, Briefcase, Coins, Sprout, Landmark, Award, 
  School, MapPin, CheckCircle, CheckCircle2, HeartHandshake, ShieldCheck,
  Building, TrendingUp, HelpCircle, PhoneCall, RefreshCw, Trash2, Gift,
  Clock, Eye
};

function AnimatedNumber({ targetNumber = 0, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let animFrameId = null;
    let startTimestamp = null;
    const duration = 1500;
    const num = Number(targetNumber) || 0;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(easedProgress * num));

      if (progress < 1) {
        animFrameId = window.requestAnimationFrame(step);
      }
    };

    let observer = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            animFrameId = window.requestAnimationFrame(step);
            if (observer) observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }
    } else {
      setCount(num);
    }

    return () => {
      if (observer) observer.disconnect();
      if (animFrameId && typeof window !== 'undefined') {
        window.cancelAnimationFrame(animFrameId);
      }
    };
  }, [targetNumber]);

  return (
    <span ref={ref}>
      {(count || 0).toLocaleString()}{suffix}
    </span>
  );
}

export default function ImpactStats({ stats = [] }) {
  if (!Array.isArray(stats)) return null;

  return (
    <section className={styles.impactStatsSection}>
      <div className={styles.container}>
        <div className={styles.statsGrid}>
          {stats.map((stat, idx) => {
            const RawIcon = stat?.iconName ? ICON_MAP[stat.iconName] : null;
            const IconComponent = RawIcon || CheckCircle;
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
