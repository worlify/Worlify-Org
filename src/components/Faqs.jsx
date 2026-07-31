import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, Check, BookOpen, Heart, UserPlus, Briefcase } from 'lucide-react';
import styles from '../styles/Faqs.module.css';

/**
 * Faqs Component
 * Dedicated page for handling frequently asked questions with interactive search and category filtering.
 */
export default function Faqs({ setActiveTab }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(null);

  // List of FAQs categorized and optimized with targeted SEO keywords for Google SERP Rich Snippets
  const faqData = [
    {
      category: 'general',
      question: 'What is Worlify Foundation and what social work does this NGO in India do?',
      answer: 'Worlify Foundation is a registered non-governmental organization (NGO) based in Lucknow, Uttar Pradesh, India. We operate across key social impact pillars including child education, free healthcare camps, food security & nutrition drives (Ann Seva), women empowerment, skill development, and environmental conservation.',
      icon: BookOpen
    },
    {
      category: 'general',
      question: 'Where is Worlify Foundation NGO located in Lucknow, Uttar Pradesh?',
      answer: 'Our registered office is located at A/189, Ground Floor, Narayan Enclave, Kasimpur Biruha, Lucknow, Uttar Pradesh 226501, India. Our head office is at A/1, Jan Kalyan Bhawan, near SMS College, Kasimpur Biruha, Lucknow, UP.',
      icon: BookOpen
    },
    {
      category: 'general',
      question: 'Is Worlify Foundation registered with NITI Aayog NGO Darpan and MCA?',
      answer: 'Yes, Worlify Foundation is an officially registered NGO under Section 8 of the Companies Act (Ministry of Corporate Affairs, Govt of India) with active NITI Aayog NGO Darpan enrollment (Reg No: UP/2023/0344068) and 12A certification.',
      icon: BookOpen
    },
    {
      category: 'general',
      question: 'Is Worlify Foundation transparent about fund allocations for charity in India?',
      answer: 'Yes, 100% transparency is maintained. 90% of all public contributions directly fund grassroots community development, child education scholarships, and healthcare camps across India, while 10% supports annual audits and operations logistics.',
      icon: BookOpen
    },
    {
      category: 'donations',
      question: 'How can I donate online to NGO India with 80G tax exemption?',
      answer: 'You can easily donate online via our secure donation page using UPI (Google Pay, PhonePe, Paytm), credit/debit cards, or net banking via Razorpay. All donations to Worlify Foundation qualify for 80G tax exemption benefits under Section 80G of the Income Tax Act.',
      icon: Heart
    },
    {
      category: 'donations',
      question: 'How do I receive my 80G tax exemption certificate for my donation?',
      answer: 'When you donate online and enter your PAN card number, an official 80G tax exemption certificate and receipt is generated and emailed directly to your registered email address for your income tax return filing.',
      icon: Heart
    },
    {
      category: 'donations',
      question: 'Can I donate items like books, clothes, or food materials for underprivileged children?',
      answer: 'Yes! We regularly collect and distribute educational books, school supplies, winter clothing, and food grains for underprivileged children and families across Uttar Pradesh. Contact us via supportworlify@gmail.com to coordinate logistics.',
      icon: Heart
    },
    {
      category: 'volunteering',
      question: 'How do I apply for NGO volunteer opportunities or social work internships in India?',
      answer: 'You can apply online through our Volunteer Hub by choosing your preferred focus area (Education, Healthcare, Environment, etc.). Our team reviews applications and issues official volunteer certificates and fellowship experience letters.',
      icon: UserPlus
    },
    {
      category: 'volunteering',
      question: 'Can I volunteer remotely or online for NGO social projects?',
      answer: 'Yes, we offer flexible remote volunteering and online internship tracks including content writing, digital graphic design, social media management, software engineering, and virtual student mentoring.',
      icon: UserPlus
    },
    {
      category: 'volunteering',
      question: 'Do volunteers receive an official NGO certificate of service?',
      answer: 'Yes, all registered volunteers and interns who successfully complete their project hours receive a verified experience certificate detailing their community contribution and service hours.',
      icon: UserPlus
    },
    {
      category: 'partnerships',
      question: 'How can companies partner with Worlify Foundation for Corporate Social Responsibility (CSR) in India?',
      answer: 'Worlify Foundation is registered under CSR-1 with the Ministry of Corporate Affairs (MCA). We partner with corporates to execute, monitor, and report high-impact CSR projects in education, healthcare, and skill development. Contact us at supportworlify@gmail.com.',
      icon: Briefcase
    },
    {
      category: 'partnerships',
      question: 'Can schools, colleges, and university student clubs collaborate with Worlify NGO?',
      answer: 'Yes! We actively collaborate with schools, colleges, and university chapters for campus donation drives, social awareness campaigns, student volunteering, and community service projects.',
      icon: Briefcase
    }
  ];

  const handleToggleFaq = (index) => {
    if (expandedFaqIndex === index) {
      setExpandedFaqIndex(null);
    } else {
      setExpandedFaqIndex(index);
    }
  };

  // Filter FAQs based on category and search query
  const filteredFaqs = faqData.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // FAQ Schema.org JSON-LD for Google Rich Results (FAQ dropdowns in SERPs)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className={styles.faqsPage} id="faqs-page-container">
      {/* FAQ Schema.org Structured Data for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Banner Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Frequently Asked Questions</h1>
          <p className={styles.subtitle}>Have questions about how we work, how your donations are used, or how you can participate? Find the answers here.</p>

          {/* Search bar inside hero */}
          <div className={styles.searchBarContainer}>
            <Search className={styles.searchIcon} size={20} />
            <input
              type="text"
              placeholder="Search questions or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
      </section>

      {/* Category Tabs & FAQ Content Grid */}
      <section className={styles.contentContainer}>
        
        {/* Category Tabs */}
        <div className={styles.tabsRow}>
          <button 
            className={`${styles.tabBtn} ${activeCategory === 'all' ? styles.activeTabBtn : ''}`}
            onClick={() => { setActiveCategory('all'); setExpandedFaqIndex(null); }}
          >
            All FAQs
          </button>
          <button 
            className={`${styles.tabBtn} ${activeCategory === 'general' ? styles.activeTabBtn : ''}`}
            onClick={() => { setActiveCategory('general'); setExpandedFaqIndex(null); }}
          >
            General
          </button>
          <button 
            className={`${styles.tabBtn} ${activeCategory === 'donations' ? styles.activeTabBtn : ''}`}
            onClick={() => { setActiveCategory('donations'); setExpandedFaqIndex(null); }}
          >
            Donations
          </button>
          <button 
            className={`${styles.tabBtn} ${activeCategory === 'volunteering' ? styles.activeTabBtn : ''}`}
            onClick={() => { setActiveCategory('volunteering'); setExpandedFaqIndex(null); }}
          >
            Volunteering
          </button>
          <button 
            className={`${styles.tabBtn} ${activeCategory === 'partnerships' ? styles.activeTabBtn : ''}`}
            onClick={() => { setActiveCategory('partnerships'); setExpandedFaqIndex(null); }}
          >
            Partnerships
          </button>
        </div>

        {/* FAQs List container */}
        <div className={styles.faqList}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const IconComponent = faq.icon || HelpCircle;
              const isExpanded = expandedFaqIndex === index;

              return (
                <div 
                  key={index} 
                  className={`${styles.faqCard} ${isExpanded ? styles.faqCardExpanded : ''}`}
                  onClick={() => handleToggleFaq(index)}
                >
                  <div className={styles.faqHeader}>
                    <div className={styles.questionWrapper}>
                      <div className={styles.categoryIconWrapper}>
                        <IconComponent size={18} className={styles.categoryIcon} />
                      </div>
                      <h3 className={styles.questionText}>{faq.question}</h3>
                    </div>
                    <button className={styles.toggleBtn} aria-label="Toggle FAQ">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                  
                  {isExpanded && (
                    <div className={styles.faqBody}>
                      <p className={styles.answerText}>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className={styles.emptyState}>
              <HelpCircle size={48} className={styles.emptyIcon} />
              <h3>No FAQ matches found</h3>
              <p>We couldn&apos;t find any questions matching &quot;{searchQuery}&quot;. Try modifying your keywords or select another tab.</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} 
                className={styles.clearBtn}
              >
                Clear Search &amp; Filters
              </button>
            </div>
          )}
        </div>

      </section>

      {/* Direct Contact Prompt Section */}
      <section className={styles.promptSection}>
        <div className={styles.promptContainer}>
          <h2>Still have questions?</h2>
          <p>If you couldn&apos;t find the answers you were looking for, please don&apos;t hesitate to reach out to our Helpdesk directly.</p>
          <button 
            className={styles.contactBtn}
            onClick={() => setActiveTab('contact')}
          >
            Get In Touch
          </button>
        </div>
      </section>

    </div>
  );
}
