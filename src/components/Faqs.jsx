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

  // List of FAQs categorized
  const faqData = [
    {
      category: 'general',
      question: 'What is Worlify and what does it do?',
      answer: 'Worlify is a global registered non-governmental organization working across healthcare, education, environmental conservation, and social welfare programs. We believe in creating sustainable local changes through community-focused initiatives.',
      icon: BookOpen
    },
    {
      category: 'general',
      question: 'Where are your headquarters located?',
      answer: 'Our head office is located at A/1, JAN KALYAN BHAWAN-NEAR SMS COLLEGE, KASIMPUR BIRUHA, LUCKNOW, UTTAR PRADESH, 226501, INDIA. Our registered office is located at A/189, GROUND FLOOR NARAYAN ENCLAVE, KASIMPUR BIRUHA, LUCKNOW, UTTAR PRADESH, 226501, INDIA.',
      icon: BookOpen
    },
    {
      category: 'general',
      question: 'Is Worlify transparent about its fund allocations?',
      answer: 'Yes, transparency is one of our core values. 90% of all public contributions go directly toward community development programs, while the remaining 10% is used for transparency auditing, essential administration, and field operations logistics.',
      icon: BookOpen
    },
    {
      category: 'donations',
      question: 'How can I make a financial contribution?',
      answer: 'You can click the "Donate Now" button in the header menu, select your preferred campaign or cause, input your billing credentials, and securely complete the transaction. We support cards, net banking, and UPI payments.',
      icon: Heart
    },
    {
      category: 'donations',
      question: 'Are my contributions eligible for tax benefits?',
      answer: 'Yes, Worlify is a registered NGO with 80G and 12A certifications. All monetary donations are eligible for tax exemption benefits under the relevant local income tax codes. A receipt is automatically issued to your registered email.',
      icon: Heart
    },
    {
      category: 'donations',
      question: 'Can I donate items like books, clothing, or medical supplies?',
      answer: 'Yes! We actively collect and distribute physical educational materials, winter clothing, and medical supplies during relief drives. Please fill out our Helpdesk form or contact us via supportworlify@gmail.com to coordinate logistics.',
      icon: Heart
    },
    {
      category: 'volunteering',
      question: 'How do I apply as a volunteer?',
      answer: 'You can navigate to the "Get Involved" tab in the header menu, choose your area of interest, fill out the volunteer application form specifying your details and available hours, and submit. Our HR team will reach out to you within 3 business days.',
      icon: UserPlus
    },
    {
      category: 'volunteering',
      question: 'Can I volunteer remotely?',
      answer: 'Absolutely! We offer several remote volunteering tracks including copy editing, digital graphics design, software development, data research, and virtual student mentoring.',
      icon: UserPlus
    },
    {
      category: 'volunteering',
      question: 'Do volunteers get certificates of appreciation?',
      answer: 'Yes, all registered volunteers who successfully complete their assigned campaign objectives receive a signed NGO fellowship or experience certificate detailing their hours of service and project details.',
      icon: UserPlus
    },
    {
      category: 'partnerships',
      question: 'Who do I contact for Corporate Social Responsibility (CSR) partnerships?',
      answer: 'For CSR alignments and corporate sponsorships, please reach out to our team via the "Get in Touch" page, or send a detailed proposal directly to supportworlify@gmail.com.',
      icon: Briefcase
    },
    {
      category: 'partnerships',
      question: 'Can schools, colleges, and student groups partner with Worlify?',
      answer: 'Yes! We run dedicated youth outreach modules. Student groups can run campus donation campaigns, set up social service chapters, or register for institutional group volunteering tasks.',
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

  return (
    <div className={styles.faqsPage} id="faqs-page-container">
      
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
