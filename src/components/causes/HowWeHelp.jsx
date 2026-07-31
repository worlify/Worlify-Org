import React from 'react';
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

export default function HowWeHelp({ items = [], causeTitle = '' }) {
  if (!Array.isArray(items)) return null;

  return (
    <section className={styles.howWeHelpSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>OUR STRATEGY & ACTION</span>
          <h2 className={styles.sectionTitle}>How We Help in {causeTitle}</h2>
          <p className={styles.sectionSubtitle}>
            Our targeted grassroots initiatives bring immediate relief and long-term sustainable impact.
          </p>
        </div>

        <div className={styles.cardsGrid}>
          {items.map((card, idx) => {
            const RawIcon = card?.iconName ? ICON_MAP[card.iconName] : null;
            const IconComponent = RawIcon || CheckCircle2;
            return (
              <div key={card.id || idx} className={styles.helpCard}>
                <div className={styles.cardIconBox}>
                  <IconComponent size={26} />
                </div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDesc}>{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
