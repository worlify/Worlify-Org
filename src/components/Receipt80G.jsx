import React from 'react';
import logoImport from '../assets/images/logo.png';
import { numberToWords } from '../utils/numberToWords';
import styles from '../styles/Receipt80G.module.css';

export default function Receipt80G({ donationData }) {
  const logo = logoImport?.src || logoImport;

  // Extract donor payment information
  const donorName = donationData?.name || donationData?.donor_name || 'Anonymous Donor';
  const amount = donationData?.amount || 0;
  const words = donationData?.amountInWords || numberToWords(amount) || 'Rupees Only';
  const paymentId = donationData?.paymentId || donationData?.id || donationData?.razorpay_payment_id || 'N/A';
  const date = donationData?.date || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  
  const address = donationData?.address || donationData?.donor_address || 'N/A';
  const contactNo = donationData?.phone || donationData?.donor_phone || 'N/A';
  const panNo = donationData?.pan || donationData?.donor_pan || ''; // Kept blank if not provided
  const email = donationData?.email || donationData?.donor_email || 'N/A';

  return (
    <div className={styles.receiptWrapper} id="receipt-print-area">
      <div className={styles.receiptPaper}>
        {/* Header Section */}
        <div className={styles.headerSection}>
          <img src={logo} alt="Worlify Foundation" className={styles.logoImg} />
          <h1 className={styles.title}>WORLIFY WELFARE FOUNDATION</h1>
          <div className={styles.subTitle}>Registered Under Company Act 2013</div>
          <div className={styles.addressLine}>
            Plot No A189 Ground Floor, Kashimpur Biruha, Lucknow, Uttar Pradesh, India, 226501
          </div>
          <div className={styles.contactLine}>
            Website-www.worlify.org | Email- worlifyfoundation@gmail.com
          </div>
          <div className={styles.contactLine}>
            Phone- +91 9161321513
          </div>
        </div>

        {/* Receipt & 80G Meta Info */}
        <div className={styles.metaGrid}>
          <div className={styles.receiptTag}>Receipt -</div>
          <div className={styles.complianceBlock}>
            <div className={styles.complianceRow}>
              <span className={styles.compNo}>12AA No. AADCW4932HE2023101</span>
              <span className={styles.compDate}>Dated. 20.04.2023</span>
            </div>
            <div className={styles.complianceRow}>
              <span className={styles.compNo}>80G No. &nbsp;AADCW4932HE202310</span>
              <span className={styles.compDate}>Dated. 20.04.2023</span>
            </div>
            <div className={styles.complianceRow}>
              <span className={styles.compNo}>12AB No. AADCW4932H25LK01</span>
              <span className={styles.compDate}>Dated. 13.02.2026</span>
            </div>
          </div>
        </div>

        {/* Fill-in-the-blanks Receipt Body */}
        <div className={styles.bodyContent}>
          <div className={styles.lineRow}>
            <span>Received with thanks from Ms /Mr.</span>
            <span className={styles.fillValue}>{donorName}</span>
            <span className={styles.dotsFlex}></span>
          </div>

          <div className={styles.lineRow}>
            <span>Amount.</span>
            <span className={styles.fillValue}>₹{amount?.toLocaleString('en-IN')}/-</span>
            <span className={styles.dotsFlex}></span>
          </div>

          <div className={styles.lineRow}>
            <span>The sum of Amount (in Words ).</span>
            <span className={styles.fillValue}>{words}</span>
            <span className={styles.dotsFlex}></span>
          </div>

          <div className={styles.lineRow}>
            <span>By Cash/ Draft /NEFT /RTGS/ Cheqe* No.</span>
            <span className={styles.fillValue}>{paymentId}</span>
            <span style={{ marginLeft: '12px', marginRight: '6px' }}>Dated</span>
            <span className={styles.fillValue}>{date}</span>
            <span className={styles.dotsFlex}></span>
          </div>

          <div className={styles.lineRow} style={{ marginTop: '12px' }}>
            <span>Address.</span>
            <span className={styles.fillValue}>{address}</span>
            <span className={styles.dotsFlex}></span>
          </div>

          <div className={styles.lineRow}>
            <span>Contact No.</span>
            <span className={styles.fillValue}>{contactNo}</span>
            <span style={{ marginLeft: '24px', marginRight: '6px' }}>PAN No.</span>
            <span className={styles.fillValue}>{panNo || '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}</span>
            <span className={styles.dotsFlex}></span>
          </div>

          <div className={styles.lineRow}>
            <span>Email:</span>
            <span className={styles.fillValue}>{email}</span>
            <span className={styles.dotsFlex}></span>
          </div>
        </div>

        {/* Digital Signature & Encashment Section */}
        <div className={styles.signatureSection}>
          <div className={styles.leftNotice}>
            *Suject to encashment of cheque
          </div>
          <div className={styles.rightSignBox}>
            <div className={styles.digitalSignature}>Ravi Kumar Verma</div>
            <div className={styles.signLine}>(Authorised Signature)</div>
          </div>
        </div>

        {/* Bottom Compliance Exemption Footer */}
        <div className={styles.footerBanner}>
          All Contributions for WORLIFY WELFARE FOUNDATION are exempted 12AA/80G of I.T.Act 2013
        </div>
      </div>
    </div>
  );
}
