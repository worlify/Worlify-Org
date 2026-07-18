import React, { useState, useMemo, useRef } from 'react';
import {
  FileText,
  Shield,
  CheckCircle,
  Search,
  Grid,
  List,
  Download,
  Eye,
  Share2,
  Printer,
  Bookmark,
  Calendar,
  ArrowRight,
  Building,
  Award,
  HelpCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  BookOpen,
  Info
} from 'lucide-react';
import styles from '../styles/Legal.module.css';

// Initial Document Registry Data
const INITIAL_DOCUMENTS = [
  {
    id: 'doc-1',
    name: 'Certificate of Incorporation',
    category: 'Government',
    description: 'Official certificate of incorporation establishing Worlify Welfare Foundation under section 8 of the Companies Act, 2013.',
    authority: 'Ministry of Corporate Affairs, Govt of India',
    regNo: 'U88100UP2023NPL179402',
    issueDate: '05 Apr 2023',
    renewalDate: 'Permanent',
    fileSize: '465 KB',
    fileType: 'PDF',
    status: 'Verified',
    badgeType: 'verified',
    downloads: 1420,
    isFeatured: true,
    filePath: '/coi_worlify.pdf'
  },
  {
    id: 'doc-2',
    name: 'NGO Darpan Enrollment',
    category: 'Government',
    description: 'Official enrollment certificate under the NITI Aayog NGO Darpan Portal confirming transparency registry.',
    authority: 'NITI Aayog, Govt of India',
    regNo: 'UP/2023/0344068',
    issueDate: '12 May 2023',
    renewalDate: 'Permanent',
    fileSize: '257 KB',
    fileType: 'PDF',
    status: 'Active',
    badgeType: 'active',
    downloads: 852,
    isFeatured: false,
    filePath: '/niti_ayog.pdf'
  },
  {
    id: 'doc-3',
    name: 'PAN Card (e-PAN)',
    category: 'Identity',
    description: 'Permanent Account Number registered card under the Income Tax Department of India for tax filing and NGO financials.',
    authority: 'Income Tax Department, Govt of India',
    regNo: 'AADCW4932H',
    issueDate: '05 Apr 2023',
    renewalDate: 'Permanent',
    fileSize: '661 KB',
    fileType: 'PDF',
    status: 'Verified',
    badgeType: 'verified',
    downloads: 512,
    isFeatured: false,
    filePath: '/pan_card.pdf'
  },
  {
    id: 'doc-4',
    name: '12A Certificate',
    category: 'Tax',
    description: 'Tax exemption certification granted under Section 12A/12AB of the Income Tax Act, 1961 for charitable trust income.',
    authority: 'Income Tax Department, Govt of India',
    regNo: 'AADCW4932H25LK01',
    issueDate: '13 Feb 2026',
    renewalDate: 'Permanent',
    fileSize: '197 KB',
    fileType: 'PDF',
    status: 'Tax Exempt',
    badgeType: 'exempt',
    downloads: 984,
    isFeatured: false,
    filePath: '/12A.pdf'
  },
  {
    id: 'doc-5',
    name: '80G Certificate',
    category: 'Tax',
    description: 'Registration under section 80G enabling individual/corporate donors to claim 50% tax deductions on contributions.',
    authority: 'Income Tax Department, Govt of India',
    regNo: 'AADCW4932HF20231',
    issueDate: '21 Apr 2023',
    renewalDate: 'Permanent',
    fileSize: '1.3 MB',
    fileType: 'PDF',
    status: 'Tax Exempt',
    badgeType: 'exempt',
    downloads: 2108,
    isFeatured: false,
    filePath: '/80G.pdf'
  },
  {
    id: 'doc-6',
    name: 'Udyam Registration Certificate',
    category: 'Identity',
    description: 'Micro Services MSME registration certificate issued by the Ministry of Micro, Small and Medium Enterprises.',
    authority: 'Ministry of MSME, Govt of India',
    regNo: 'UDYAM-UP-50-0224618',
    issueDate: '04 Sep 2025',
    renewalDate: 'Permanent',
    fileSize: '5.6 MB',
    fileType: 'PDF',
    status: 'Active',
    badgeType: 'active',
    downloads: 420,
    isFeatured: false,
    filePath: '/udyam_registration.pdf'
  },
  {
    id: 'doc-7',
    name: 'Trust Deed',
    category: 'Legal',
    description: 'Constitutional document outlining Worlify foundation bylaws, trustee responsibilities, and operational scope.',
    authority: 'Registrar of Trust',
    regNo: 'TRUST/2020/987',
    issueDate: '12 Feb 2020',
    renewalDate: 'Permanent',
    fileSize: '2.4 MB',
    fileType: 'PDF',
    status: 'Verified',
    badgeType: 'verified',
    downloads: 1109,
    isFeatured: false
  },
  {
    id: 'doc-8',
    name: 'Audit Report 2023-24',
    category: 'Audit',
    description: 'Independent auditor report detailing complete asset allocations, expense audits, and financial statements.',
    authority: 'Chartered Accountant Firm',
    regNo: 'AUDIT/2023-24/09',
    issueDate: '30 Sep 2024',
    renewalDate: 'Annual',
    fileSize: '3.5 MB',
    fileType: 'PDF',
    status: 'Compliant',
    badgeType: 'active',
    downloads: 1980,
    isFeatured: false
  }
];

const TIMELINE_MILESTONES = [
  { year: '2020', title: 'Trust Registration', desc: 'Began NGO setup with core charter trust deeds.' },
  { year: '2021', title: 'NGO Darpan & PAN', desc: 'Acquired central NGO registry status & tax PAN cards.' },
  { year: '2022', title: '12A Certification', desc: 'Authorized tax-free charitable status for trust funds.' },
  { year: '2023', title: '80G Certification', desc: 'Enabled 50% tax deductions benefit for all donors.' },
  { year: '2024', title: 'Audit Excellence', desc: 'Completed standard audits with clean transparency record.' },
  { year: '2026', title: 'Latest Audit', desc: 'Achieved verified compliance status for global operations.' }
];

const ANNUAL_REPORTS = [
  { name: 'Annual Impact Report 2024-25', size: '4.8 MB', count: 1845 },
  { name: 'Financial Audit Report 2023-24', size: '3.5 MB', count: 1290 },
  { name: 'Corporate CSR Impact Assessment', size: '2.9 MB', count: 852 },
  { name: 'Environmental Action Report', size: '1.8 MB', count: 432 },
  { name: 'Education Welfare Program Review', size: '3.2 MB', count: 1045 }
];

export default function Legal({ setActiveTab }) {
  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [sortBy, setSortBy] = useState('name');
  const [isGridView, setIsGridView] = useState(true);

  // Modal Preview States
  const [previewDoc, setPreviewDoc] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [bookmarkedDocs, setBookmarkedDocs] = useState({});
  const [downloadCounts, setDownloadCounts] = useState({});

  // Accordion active index
  const [expandedFaq, setExpandedFaq] = useState(0);

  // Milestone timeline selection state
  const [selectedMilestone, setSelectedMilestone] = useState(5); // Default to latest 2025

  // Search input element reference
  const docGridRef = useRef(null);

  const handleBrowseClick = () => {
    docGridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookmarkToggle = (id, e) => {
    e.stopPropagation();
    setBookmarkedDocs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleDownload = (doc, e) => {
    if (e) e.stopPropagation();
    setDownloadCounts(prev => ({
      ...prev,
      [doc.id]: (prev[doc.id] || doc.downloads) + 1
    }));

    const element = document.createElement("a");
    if (doc.filePath) {
      element.href = doc.filePath;
      element.download = doc.filePath.split('/').pop();
    } else {
      // Simulate File Download
      const file = new Blob([`Simulated download for ${doc.name}. Registration Number: ${doc.regNo}`], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${doc.name.replace(/\s+/g, '_')}_${doc.regNo}.txt`;
    }
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Filter Categories list
  const categories = ['All', 'Government', 'Tax', 'Identity', 'Reports', 'Policies', 'Audit', 'CSR', 'Legal'];

  // Filtered & Sorted documents calculation
  const processedDocs = useMemo(() => {
    return documents
      .filter(doc => {
        const matchesSearch =
          doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.regNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.authority.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;

        const matchesYear = selectedYear === 'All Years' || doc.issueDate.includes(selectedYear);

        const matchesStatus = selectedStatus === 'All Statuses' ||
          (selectedStatus === 'Verified' && doc.status === 'Verified') ||
          (selectedStatus === 'Active' && doc.status === 'Active') ||
          (selectedStatus === 'Tax Exempt' && doc.status === 'Tax Exempt') ||
          (selectedStatus === 'Compliant' && doc.status === 'Compliant');

        return matchesSearch && matchesCategory && matchesYear && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'downloads') {
          const dlA = downloadCounts[a.id] || a.downloads;
          const dlB = downloadCounts[b.id] || b.downloads;
          return dlB - dlA;
        }
        if (sortBy === 'date') return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime();
        return 0;
      });
  }, [documents, searchQuery, selectedCategory, selectedYear, selectedStatus, sortBy, downloadCounts]);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className={styles.legalPage}>

      {/* 1. HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>

            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <Shield size={16} />
                <span>Government Authorized Transparency Hub</span>
              </div>

              <h1 className={styles.heroTitle}>
                Legal & <span className={styles.heroTitleHighlight}>Transparency</span>
              </h1>

              <p className={styles.heroSubtitle}>
                We believe that transparency builds trust. Every legal registration, certification, financial report, and compliance document is publicly available for verification.
              </p>

              <div className={styles.trustBadges}>
                <div className={styles.trustBadgeItem}>
                  <CheckCircle size={16} className={styles.badgeIcon} />
                  <span>Government Registered</span>
                </div>
                <div className={styles.trustBadgeItem}>
                  <CheckCircle size={16} className={styles.badgeIcon} />
                  <span>NGO Darpan Verified</span>
                </div>
                <div className={styles.trustBadgeItem}>
                  <CheckCircle size={16} className={styles.badgeIcon} />
                  <span>12A Certified</span>
                </div>
                <div className={styles.trustBadgeItem}>
                  <CheckCircle size={16} className={styles.badgeIcon} />
                  <span>80G Approved</span>
                </div>
                <div className={styles.trustBadgeItem}>
                  <CheckCircle size={16} className={styles.badgeIcon} />
                  <span>Annual Audited</span>
                </div>
              </div>

              <div className={styles.heroActions}>
                <button className={styles.btnPrimary} onClick={handleBrowseClick}>
                  Browse Documents
                  <ArrowRight size={18} />
                </button>
                <button
                  className={styles.btnSecondary}
                  onClick={() => {
                    const doc = documents.find(d => d.category === 'Audit') || documents[0];
                    handleDownload(doc);
                  }}
                >
                  Download Annual Reports
                  <Download size={16} />
                </button>
              </div>
            </div>

            {/* Illustration */}
            <div className={styles.illustrationContainer}>
              <div className={styles.glowBlob}></div>

              <div className={styles.visualStack}>
                {/* Background Document Card */}
                <div className={styles.docBaseCard}>
                  <div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308' }}></div>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                    </div>
                    <div className={styles.visualLine}></div>
                    <div className={styles.visualLine}></div>
                    <div className={styles.visualLineShort}></div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '10px', backgroundColor: '#e2e8f0', borderRadius: '4px' }}></div>
                    <div className={styles.visualSeal}>
                      <Award size={20} color="#16a34a" />
                    </div>
                  </div>
                </div>

                {/* Foreground Document Card */}
                <div className={styles.docOverlayCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Shield size={32} color="#1d4ed8" />
                    <div className={styles.badgeVerified}>VERIFIED</div>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>LEGAL COMPLIANCE</h4>
                    <div className={styles.visualLine}></div>
                    <div className={styles.visualLineShort}></div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                    <span style={{ fontSize: '10px', fontWeight: '700', color: '#94a3b8' }}>STATUS: ACTIVE</span>
                    <CheckCircle size={18} color="#16a34a" />
                  </div>
                </div>

                {/* Floating trust points */}
                <div className={`${styles.floatingBadge} ${styles.fb1}`}>
                  <Award size={14} color="#f97316" />
                  <span>100% Tax Exempt</span>
                </div>

                <div className={`${styles.floatingBadge} ${styles.fb2}`}>
                  <Shield size={14} color="#1d4ed8" />
                  <span>Secure Records</span>
                </div>

                <div className={`${styles.floatingBadge} ${styles.fb3}`}>
                  <CheckCircle size={14} color="#ffffff" />
                  <span>Government Compliant</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATISTICS SECTION */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>

            <div className={styles.statsCard}>
              <div className={styles.statsIconWrapper}>
                <FileText size={24} />
              </div>
              <div>
                <div className={styles.statsValue}>45+</div>
                <div className={styles.statsLabel}>Legal Documents</div>
                <div className={styles.statsDesc}>Across all operational categories</div>
              </div>
            </div>

            <div className={styles.statsCard}>
              <div className={styles.statsIconWrapper}>
                <Building size={24} />
              </div>
              <div>
                <div className={styles.statsValue}>12</div>
                <div className={styles.statsLabel}>Government Registrations</div>
                <div className={styles.statsDesc}>Active & fully verified portals</div>
              </div>
            </div>

            <div className={styles.statsCard}>
              <div className={styles.statsIconWrapper}>
                <Award size={24} />
              </div>
              <div>
                <div className={styles.statsValue}>08</div>
                <div className={styles.statsLabel}>Verified Certificates</div>
                <div className={styles.statsDesc}>100% compliant audits & tax status</div>
              </div>
            </div>

            <div className={styles.statsCard}>
              <div className={styles.statsIconWrapper}>
                <Calendar size={24} />
              </div>
              <div>
                <div className={styles.statsValue}>11 July 2026</div>
                <div className={styles.statsLabel}>Last Updated</div>
                <div className={styles.statsDesc}>All documents are current</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. DOCUMENT SEARCH & CATEGORIES */}
      <section ref={docGridRef} style={{ padding: '40px 0' }}>
        <div className={styles.container}>

          <div className={styles.filterSection}>
            <div className={styles.searchBarWrapper}>

              {/* Search text input */}
              <div className={styles.searchBox}>
                <Search size={18} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search by name, reg number, authority..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>

              {/* Category selector */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="All">All Categories</option>
                {categories.filter(c => c !== 'All').map(c => (
                  <option key={c} value={c}>{c} Documents</option>
                ))}
              </select>

              {/* Year selector */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="All Years">All Years</option>
                <option value="2024">2024</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
              </select>

              {/* Status selector */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="All Statuses">All Statuses</option>
                <option value="Verified">Verified</option>
                <option value="Active">Active</option>
                <option value="Tax Exempt">Tax Exempt</option>
                <option value="Compliant">Compliant</option>
              </select>

              {/* Sort selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="name">Sort by Name</option>
                <option value="downloads">Sort by Downloads</option>
                <option value="date">Sort by Date</option>
              </select>

              {/* Grid/List layout toggle */}
              <div className={styles.toggleLayoutGroup}>
                <button
                  className={`${styles.toggleLayoutBtn} ${isGridView ? styles.toggleLayoutBtnActive : ''}`}
                  onClick={() => setIsGridView(true)}
                  title="Grid View"
                >
                  <Grid size={18} />
                </button>
                <button
                  className={`${styles.toggleLayoutBtn} ${!isGridView ? styles.toggleLayoutBtnActive : ''}`}
                  onClick={() => setIsGridView(false)}
                  title="List View"
                >
                  <List size={18} />
                </button>
              </div>

            </div>
          </div>

          {/* Category pills */}
          <div className={styles.categoryPillsWrapper}>
            {categories.map(c => (
              <button
                key={c}
                className={`${styles.categoryPill} ${selectedCategory === c ? styles.categoryPillActive : ''}`}
                onClick={() => setSelectedCategory(c)}
              >
                {c === 'All' ? 'All Documents' : c}
              </button>
            ))}
          </div>

          {/* Document Display (Grid or List view) */}
          <div className={isGridView ? styles.documentGrid : styles.documentList}>
            {processedDocs.length > 0 ? (
              processedDocs.map(doc => {
                const isBookmarked = !!bookmarkedDocs[doc.id];
                const downloads = downloadCounts[doc.id] || doc.downloads;

                return (
                  <div
                    key={doc.id}
                    className={`${styles.docCard} ${doc.isFeatured && isGridView ? styles.featuredCard : ''} ${!isGridView ? styles.docCardList : ''}`}
                  >

                    {/* Header */}
                    <div className={styles.cardHeader}>
                      <div className={styles.docTypeIconWrapper}>
                        <FileText size={24} />
                      </div>

                      {/* Status Badges */}
                      <div>
                        {doc.status === 'Verified' && <span className={styles.badgeVerified}>Verified</span>}
                        {doc.status === 'Active' && <span className={styles.badgeActive}>Active</span>}
                        {doc.status === 'Tax Exempt' && <span className={styles.badgeExempt}>Tax Exempt</span>}
                        {doc.status === 'Compliant' && <span className={styles.badgeVerified}>Compliant</span>}
                      </div>
                    </div>

                    {/* Content */}
                    <div className={styles.cardContent}>
                      <h3 className={styles.docTitle}>{doc.name}</h3>
                      <p className={styles.docDesc}>{doc.description}</p>

                      <div className={styles.docMetaGrid}>
                        <div className={styles.metaItem}>
                          <span className={styles.metaLabel}>Authority</span>
                          <span className={styles.metaVal}>{doc.authority}</span>
                        </div>
                        <div className={styles.metaItem}>
                          <span className={styles.metaLabel}>Reg / PAN No.</span>
                          <span className={styles.metaVal}>{doc.regNo}</span>
                        </div>
                        <div className={styles.metaItem}>
                          <span className={styles.metaLabel}>Issued On</span>
                          <span className={styles.metaVal}>{doc.issueDate}</span>
                        </div>
                        <div className={styles.metaItem}>
                          <span className={styles.metaLabel}>Renewal</span>
                          <span className={styles.metaVal}>{doc.renewalDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className={styles.cardFooter}>
                      <div className={styles.fileSizeBadge}>
                        <Info size={14} />
                        <span>{doc.fileType} • {doc.fileSize}</span>
                      </div>

                      <div className={styles.cardActions}>
                        <button
                          className={styles.actionBtn}
                          onClick={(e) => handleBookmarkToggle(doc.id, e)}
                          title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
                        >
                          <Bookmark size={15} fill={isBookmarked ? "#1d4ed8" : "none"} color={isBookmarked ? "#1d4ed8" : "currentColor"} />
                        </button>

                        <button
                          className={styles.actionBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Simple mock print command
                            alert(`Printing ${doc.name}...`);
                          }}
                          title="Print Document"
                        >
                          <Printer size={15} />
                        </button>

                        <button
                          className={styles.actionBtnPrimary}
                          onClick={() => setPreviewDoc(doc)}
                        >
                          Preview
                        </button>

                        <button
                          className={styles.actionBtn}
                          onClick={(e) => handleDownload(doc, e)}
                          title="Download Document"
                        >
                          <Download size={15} />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })
            ) : (
              <div className={styles.emptyGridState}>
                <HelpCircle size={48} color="#94a3b8" style={{ marginBottom: '16px' }} />
                <h3 className={styles.emptyStateTitle}>No compliance documents found</h3>
                <p className={styles.emptyStateDesc}>Try clearing your search query or choosing another category pill above.</p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 4. COMPLIANCE JOURNEY TIMELINE */}
      <section className={styles.journeySection}>
        <div className={styles.container}>

          <div className={styles.sectionHeaderCenter}>
            <h2 className={styles.sectionTitle}>Our Compliance Journey</h2>
            <p className={styles.sectionSubtitle}>A chronological path of our key legal and operational registrations</p>
          </div>

          <div className={styles.timeline}>
            {/* Horizontal Progress Line */}
            <div className={styles.timelineProgress} style={{ width: `${(selectedMilestone / (TIMELINE_MILESTONES.length - 1)) * 100}%` }}></div>

            {TIMELINE_MILESTONES.map((milestone, idx) => {
              const isActive = idx === selectedMilestone;
              const isCompleted = idx < selectedMilestone;

              return (
                <div
                  key={milestone.year}
                  className={styles.timelineNode}
                  onClick={() => setSelectedMilestone(idx)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={`${styles.nodeMilestoneCircle} ${isActive ? styles.nodeMilestoneCircleActive : ''} ${isCompleted ? styles.nodeMilestoneCircleCompleted : ''}`}>
                    {idx < selectedMilestone ? '✓' : milestone.year}
                  </div>
                  <div className={styles.nodeLabel}>{milestone.title}</div>
                  <div className={styles.nodeDesc}>{milestone.desc}</div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. TRANSPARENCY SECTION & FAQ */}
      <section className={styles.dualGridSection}>
        <div className={styles.container}>
          <div className={styles.dualGrid}>

            {/* Left side: Commitment to Transparency */}
            <div>
              <h2 className={styles.sectionTitle}>Our Commitment to Transparency</h2>
              <p className={styles.sectionSubtitle} style={{ marginTop: '8px' }}>
                Transparency is one of our core values. We openly share our registrations, compliance certifications, financial reports, and governance structures to build long-term trust with our supporters and partners.
              </p>

              <div className={styles.commitmentCardGrid}>

                <div className={styles.commitmentCard}>
                  <div className={styles.commitmentIconWrapper}>
                    <Shield size={20} />
                  </div>
                  <h3 className={styles.commitmentCardTitle}>Full Disclosure</h3>
                  <p className={styles.commitmentCardDesc}>Every legal certificate, tax record, and audit report is fully accessible to the public.</p>
                </div>

                <div className={styles.commitmentCard}>
                  <div className={styles.commitmentIconWrapper}>
                    <Award size={20} />
                  </div>
                  <h3 className={styles.commitmentCardTitle}>Independent Audits</h3>
                  <p className={styles.commitmentCardDesc}>Annual balance sheets and allocations are audited by registered independent firms.</p>
                </div>

                <div className={styles.commitmentCard}>
                  <div className={styles.commitmentIconWrapper}>
                    <Building size={20} />
                  </div>
                  <h3 className={styles.commitmentCardTitle}>Government Standards</h3>
                  <p className={styles.commitmentCardDesc}>Registered and compliant with NGO Darpan, MSME, 12A, 80G, and MCA guidelines.</p>
                </div>

                <div className={styles.commitmentCard}>
                  <div className={styles.commitmentIconWrapper}>
                    <CheckCircle size={20} />
                  </div>
                  <h3 className={styles.commitmentCardTitle}>Public Accountability</h3>
                  <p className={styles.commitmentCardDesc}>Committed to ethical governance, strict internal reporting, and public verification.</p>
                </div>

              </div>
            </div>

            {/* Right side: FAQ Accordion */}
            <div className={styles.faqSection}>
              <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
              <p className={styles.sectionSubtitle} style={{ marginTop: '8px' }}>Quick answers to common questions about our legal filings and auditing</p>

              <div className={styles.faqList}>

                <div className={styles.faqItem}>
                  <button className={styles.faqHeader} onClick={() => toggleFaq(0)}>
                    <span>Why are documents public?</span>
                    {expandedFaq === 0 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {expandedFaq === 0 && (
                    <div className={styles.faqAnswer}>
                      We make all compliance documents public to foster absolute transparency and compliance. Donors, institutional partners, and corporate CSR boards can independently verify our legal eligibility before initiating support campaigns.
                    </div>
                  )}
                </div>

                <div className={styles.faqItem}>
                  <button className={styles.faqHeader} onClick={() => toggleFaq(1)}>
                    <span>How can I verify NGO registration?</span>
                    {expandedFaq === 1 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {expandedFaq === 1 && (
                    <div className={styles.faqAnswer}>
                      You can copy our Registration Number (e.g. `UP/2021/0298789`) or PAN number and verify it on the official Indian NITI Aayog NGO Darpan portal or the MCA corporate registry dashboard.
                    </div>
                  )}
                </div>

                <div className={styles.faqItem}>
                  <button className={styles.faqHeader} onClick={() => toggleFaq(2)}>
                    <span>How often are documents updated?</span>
                    {expandedFaq === 2 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {expandedFaq === 2 && (
                    <div className={styles.faqAnswer}>
                      All permanent registration records (like PAN, Trust Deed, 12A) are static. Active audits, balance sheets, and CSR assessment reports are updated annually immediately after receiving official certification from our CA partners.
                    </div>
                  )}
                </div>

                <div className={styles.faqItem}>
                  <button className={styles.faqHeader} onClick={() => toggleFaq(3)}>
                    <span>Can I request additional documents?</span>
                    {expandedFaq === 3 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {expandedFaq === 3 && (
                    <div className={styles.faqAnswer}>
                      Yes, if your corporate CSR board or agency requires specific historical audit trails, FCRA details, or detailed tax certificates, please contact our legal desk directly at `supportworlify@gmail.com`.
                    </div>
                  )}
                </div>

                <div className={styles.faqItem}>
                  <button className={styles.faqHeader} onClick={() => toggleFaq(4)}>
                    <span>How do I report an issue?</span>
                    {expandedFaq === 4 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {expandedFaq === 4 && (
                    <div className={styles.faqAnswer}>
                      For corrections regarding documentation metadata, registration numbers, or missing files, write to us via support email, or fill out the direct Helpdesk form on our Contact tab.
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. DOWNLOAD CENTER SECTION */}
      <section className={styles.downloadCenterSection}>
        <div className={styles.container}>

          <div className={styles.sectionHeaderCenter}>
            <h2 className={styles.sectionTitle}>Annual Download Center</h2>
            <p className={styles.sectionSubtitle}>Download official, print-ready reports containing complete program reviews and audits</p>
          </div>

          <div className={styles.downloadGrid}>
            {ANNUAL_REPORTS.map((report, idx) => (
              <div
                key={report.name}
                className={styles.downloadReportCard}
                onClick={() => {
                  const doc = documents[0]; // mock download action
                  handleDownload(doc);
                }}
              >
                <div className={styles.reportIcon}>
                  <FileText size={20} />
                </div>
                <h3 className={styles.reportTitle}>{report.name}</h3>
                <span className={styles.reportDownloadsCount}>{report.size} • {report.count} DLs</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. WHY TRUST US GRID */}
      <section className={styles.whyTrustSection}>
        <div className={styles.container}>

          <div className={styles.sectionHeaderCenter}>
            <h2 className={styles.sectionTitle}>Why Partners Trust Us</h2>
            <p className={styles.sectionSubtitle}>Rigorous auditing standards and ethical oversight guide all operations</p>
          </div>

          <div className={styles.trustGrid}>
            <div className={styles.trustCard}>
              <div className={styles.trustIconWrapper}>
                <Building size={20} />
              </div>
              <div>
                <h4 className={styles.trustCardTitle}>Government Registered</h4>
                <p className={styles.trustCardDesc}>Fully incorporated under standard national NGO frameworks with verified filings.</p>
              </div>
            </div>

            <div className={styles.trustCard}>
              <div className={styles.trustIconWrapper}>
                <Shield size={20} />
              </div>
              <div>
                <h4 className={styles.trustCardTitle}>100% Verified Documents</h4>
                <p className={styles.trustCardDesc}>Every registration certificate matches government registries for validation.</p>
              </div>
            </div>

            <div className={styles.trustCard}>
              <div className={styles.trustIconWrapper}>
                <FileText size={20} />
              </div>
              <div>
                <h4 className={styles.trustCardTitle}>Annual Audit Reports</h4>
                <p className={styles.trustCardDesc}>Balance sheets are audited by certified firms and made public for clarity.</p>
              </div>
            </div>

            <div className={styles.trustCard}>
              <div className={styles.trustIconWrapper}>
                <Award size={20} />
              </div>
              <div>
                <h4 className={styles.trustCardTitle}>Tax Compliance</h4>
                <p className={styles.trustCardDesc}>Active 12A & 80G tax exemptions verified by the Department of Revenue.</p>
              </div>
            </div>

            <div className={styles.trustCard}>
              <div className={styles.trustIconWrapper}>
                <CheckCircle size={20} />
              </div>
              <div>
                <h4 className={styles.trustCardTitle}>Secure Records</h4>
                <p className={styles.trustCardDesc}>Secure storage and version auditing of files ensures no manipulation.</p>
              </div>
            </div>

            <div className={styles.trustCard}>
              <div className={styles.trustIconWrapper}>
                <Eye size={20} />
              </div>
              <div>
                <h4 className={styles.trustCardTitle}>Public Access</h4>
                <p className={styles.trustCardDesc}>Our transparency center remains open 365 days a year without paywalls.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. CONTACT SECTION CARD */}
      <section className={styles.contactTeamSection}>
        <div className={styles.container}>
          <div className={styles.contactTeamCard}>

            <div className={styles.contactLeft}>
              <div className={styles.contactIconCircle}>
                <Mail size={24} />
              </div>
              <div>
                <h3 className={styles.contactTeamTitle}>Need help verifying documents?</h3>
                <p className={styles.contactTeamDesc}>
                  Our corporate relations and legal desk team is available to answer any regulatory queries, address CSR requests, or provide physical print certifications.
                </p>

                <div className={styles.contactDetailsGrid}>
                  <div className={styles.detailCard}>
                    <Mail size={16} className={styles.detailIcon} />
                    <div>
                      <div className={styles.detailLabel}>Email</div>
                      <div className={styles.detailVal}>supportworlify@gmail.com</div>
                    </div>
                  </div>
                  <div className={styles.detailCard}>
                    <Phone size={16} className={styles.detailIcon} />
                    <div>
                      <div className={styles.detailLabel}>Call Us</div>
                      <div className={styles.detailVal}>+91 9161321513</div>
                    </div>
                  </div>
                  <div className={styles.detailCard}>
                    <MapPin size={16} className={styles.detailIcon} />
                    <div>
                      <div className={styles.detailLabel}>Office Address</div>
                      <div className={styles.detailVal}>Lucknow, Uttar Pradesh</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.contactBtnGroup}>
              <button className={styles.btnPrimary} onClick={() => setActiveTab('contact')}>
                Contact Legal Desk
              </button>
              <button
                className={styles.btnSecondary}
                onClick={() => {
                  const doc = documents[0];
                  handleDownload(doc);
                }}
              >
                Download Compliance Guide
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 9. FINAL CTA BANNER */}
      <section style={{ padding: '40px 0' }}>
        <div className={styles.container}>
          <div className={styles.finalBanner}>
            <h2 className={styles.bannerTitle}>Building Trust Through Transparency</h2>
            <p className={styles.bannerDesc}>
              Every registration, compliance certificate, and independent audit demonstrates our commitment to accountability, ethics, and clean operations.
            </p>
            <div className={styles.bannerActions}>
              <button className={styles.btnBannerWhite} onClick={() => setActiveTab('donate')}>
                Donate Now
              </button>
              <button className={styles.btnBannerOutline} onClick={() => setActiveTab('volunteer')}>
                Partner With Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. PREVIEW MODAL */}
      {previewDoc && (
        <div className={styles.modalOverlay} onClick={() => setPreviewDoc(null)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>

            {/* Close button */}
            <button className={styles.modalCloseBtn} onClick={() => setPreviewDoc(null)} title="Close Preview">
              &times;
            </button>

            {/* Viewer Stage (Left) */}
            <div className={styles.modalViewerContainer}>
              <div className={styles.viewerHeader}>
                <span className={styles.viewerTitle}>Previewing: {previewDoc.name}</span>

                <div className={styles.viewerControls}>
                  <button className={styles.viewerBtn} onClick={() => setZoomLevel(z => Math.max(50, z - 25))} title="Zoom Out">
                    <ZoomOut size={16} />
                  </button>
                  <span style={{ fontSize: '12px', fontWeight: '700', padding: '0 8px', alignSelf: 'center', color: '#334155' }}>
                    {zoomLevel}%
                  </span>
                  <button className={styles.viewerBtn} onClick={() => setZoomLevel(z => Math.min(200, z + 25))} title="Zoom In">
                    <ZoomIn size={16} />
                  </button>
                  <button className={styles.viewerBtn} onClick={() => setZoomLevel(100)} title="Reset Zoom">
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>

              {/* Real PDF iframe or Simulated Paper Document Canvas */}
              {previewDoc.filePath ? (
                <div style={{ flexGrow: 1, backgroundColor: '#ffffff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', marginBottom: '16px', border: '1px solid #e2e8f0', height: '100%', minHeight: '400px' }}>
                  <iframe
                    src={`${previewDoc.filePath}#zoom=FitH`}
                    width="100%"
                    height="100%"
                    style={{ border: 'none', display: 'block' }}
                    title={previewDoc.name}
                  />
                </div>
              ) : (
                <div className={styles.simulatedDocCanvas} style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}>
                  <div className={styles.docWatermark}>WORLIFY FOUNDATION</div>

                  <div className={styles.simulatedHeader}>
                    <div className={styles.simulatedLogo}>Worlify Foundation</div>
                    <div className={styles.simulatedSeal}>
                      <Shield size={24} />
                    </div>
                  </div>

                  <h3 className={styles.simulatedDocTitle}>{previewDoc.name}</h3>

                  <div className={styles.simulatedLineGroup}>
                    <p style={{ fontSize: '13px', color: '#334155', fontWeight: '500', lineHeight: '1.6', marginBottom: '16px' }}>
                      This certifies that the organization named **WORLIFY FOUNDATION** has been officially registered and verified by the designated authority.
                    </p>
                    <div className={styles.simulatedDocLine}></div>
                    <div className={styles.simulatedDocLine}></div>
                    <div className={styles.simulatedDocLine}></div>
                    <div className={styles.simulatedDocLineHalf}></div>
                  </div>

                  <div className={styles.simulatedMetadataRow}>
                    <div className={styles.simulatedMetaField}>
                      <strong>Registration Number</strong>
                      {previewDoc.regNo}
                    </div>
                    <div className={styles.simulatedMetaField}>
                      <strong>Filing Authority</strong>
                      {previewDoc.authority}
                    </div>
                    <div className={styles.simulatedMetaField}>
                      <strong>Filing Date</strong>
                      {previewDoc.issueDate}
                    </div>
                    <div className={styles.simulatedMetaField}>
                      <strong>Status</strong>
                      {previewDoc.status} (Verified)
                    </div>
                  </div>
                </div>
              )}

              {/* Viewer Footer controls */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  className={styles.btnSecondary}
                  onClick={() => alert('Link copied to clipboard! (Simulated)')}
                >
                  <Share2 size={14} />
                  Share Link
                </button>
                <button
                  className={styles.btnPrimary}
                  onClick={() => handleDownload(previewDoc)}
                >
                  <Download size={14} />
                  Download PDF
                </button>
              </div>
            </div>

            {/* Sidebar Metadata (Right) */}
            <div className={styles.modalSidebar}>
              <div>
                <h3 className={styles.sidebarMetaTitle}>Compliance Details</h3>

                <div className={styles.sidebarMetaList}>

                  <div className={styles.sidebarMetaItem}>
                    <span className={styles.sidebarMetaLabel}>Document Name</span>
                    <span className={styles.sidebarMetaValue}>{previewDoc.name}</span>
                  </div>

                  <div className={styles.sidebarMetaItem}>
                    <span className={styles.sidebarMetaLabel}>Category</span>
                    <span className={styles.sidebarMetaValue}>{previewDoc.category}</span>
                  </div>

                  <div className={styles.sidebarMetaItem}>
                    <span className={styles.sidebarMetaLabel}>Registration Number</span>
                    <span className={styles.sidebarMetaValue}>{previewDoc.regNo}</span>
                  </div>

                  <div className={styles.sidebarMetaItem}>
                    <span className={styles.sidebarMetaLabel}>Issuing Authority</span>
                    <span className={styles.sidebarMetaValue}>{previewDoc.authority}</span>
                  </div>

                  <div className={styles.sidebarMetaItem}>
                    <span className={styles.sidebarMetaLabel}>Issue Date</span>
                    <span className={styles.sidebarMetaValue}>{previewDoc.issueDate}</span>
                  </div>

                  <div className={styles.sidebarMetaItem}>
                    <span className={styles.sidebarMetaLabel}>Verification Status</span>
                    <span className={styles.sidebarMetaValue} style={{ color: '#16a34a', fontWeight: '800' }}>
                      ✓ {previewDoc.status}
                    </span>
                  </div>

                </div>

                <div className={styles.sidebarAuditTrail}>
                  <h4 className={styles.auditTitle}>Verification Log</h4>
                  <div className={styles.auditTimeline}>
                    <div className={styles.auditStep}>
                      <div className={styles.auditDot}></div>
                      <div>
                        <div className={styles.auditDesc}>Verified by **Legal Counsel**</div>
                        <div className={styles.auditTime}>11 July 2026</div>
                      </div>
                    </div>
                    <div className={styles.auditStep}>
                      <div className={styles.auditDot} style={{ backgroundColor: '#3b82f6' }}></div>
                      <div>
                        <div className={styles.auditDesc}>Digitized in **Transparency Center**</div>
                        <div className={styles.auditTime}>11 July 2026</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>

          </div>
        </div>
      )}

    </div>
  );
}
