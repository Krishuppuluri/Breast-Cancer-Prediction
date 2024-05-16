//Terms & Conditions-Christina Sebastian-300279317- Sanika Liya Sunil-300315207-eHealth//
import React from 'react';

const styles = {
  container: {
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.6',
      margin: '0 auto', // Center the content
      maxWidth: '800px', // Set a maximum width for the content
      padding: '20px',
      backgroundColor: '#f8f8f8',
      paddingLeft: '20px', // Add left padding
    
  },
  section: {
    marginBottom: '20px',
  },
  heading: {
    fontSize: '1.2rem',
    color: '#333',
    marginBottom: '10px',
  },
  content: {
    color: '#555',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
  linkHover: {
    textDecoration: 'underline',
  },
  subSection1: {
    marginRight: '5px', 
  },
  subSection2: {
    marginLeft: '20px', // Adjust as needed for indentation
  },
  
  list: {
    listStyleType: 'disc', 
    marginLeft: '20px',
  }
};

function Terms() {
  return (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.heading}>1. Introduction</h2>
        <p style={styles.content}>
          Welcome to our e-Hospital Platform. These Terms and Conditions govern your use of our e-hospital platform. By using our platform, you agree to these terms. Please read them carefully.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.heading}>2. Acceptance of Terms</h2>
        <p style={styles.content}>
          By using our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our platform.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.heading}>3. Eligibility</h2>
        <p style={styles.content}>
        To use our platform, you must be of legal age in your jurisdiction or have the consent of a legal guardian. You must also comply with any other eligibility criteria specified on the platform.
        </p>
      </div>

      <div style={styles.section}>
  <h2 style={styles.heading}>4. User Account</h2>
  <p style={styles.content}>
    <span style={styles.subSection2}>4.1.</span> Users are responsible for maintaining the confidentiality of their account credentials and ensuring that their passwords are strong and secure. If you suspect any unauthorized access to your account, you must notify us immediately.
  </p>
  <p style={styles.content}>
    <span style={styles.subSection2}>4.2.</span> Users are encouraged to keep their account information up-to-date, including contact information, medical history, and insurance details if applicable.
  </p>
</div>

<div style={styles.section}>
  <h2 style={styles.heading}>5. Medical Services</h2>
  <p style={styles.content}>
    <span style={styles.subSection2}>5.1.</span> Appointment Scheduling: Users can view the availability of healthcare providers, select preferred appointment slots, and receive confirmation details through email or in-app notifications.
  </p>
  <p style={styles.content}>
    <span style={styles.subSection2}>5.2.</span> Telemedicine: Telemedicine services are offered for non-emergency medical consultations. Users are responsible for providing accurate and detailed information during telemedicine sessions.
  </p>
  <p style={styles.content}>
    <span style={styles.subSection2}>5.3.</span> Specialized Care: Seeking specialized care may require additional consent or agreements with the respective specialist and any costs associated with specialized care will be clearly communicated.
  </p>
  <p style={styles.content}>
    <span style={styles.subSection2}>5.4.</span> AI Tools: Our AI tools are designed to assist healthcare providers in making informed decisions. Users should be aware that AI recommendations are based on available data and may not replace the expertise of a healthcare professional.
  </p>
</div>

<div style={styles.section}>
  <h2 style={styles.heading}>6. User Conduct</h2>
  <div style={styles.subSection1}>
  <p style={styles.content}>
    <span style={styles.subSection2}>6.1.</span> Prohibited activities include, but are not limited to:
  </p>
    <ul style={styles.list}>
      <li>1. Impersonating another individual or misrepresenting your identity.</li>
      <li>2. Engaging in any form of harassment or hate speech within the platform.</li>
      <li>3. Uploading or sharing content that is illegal, harmful, or infringes on the intellectual property rights of others.</li>
    </ul>
  <p style={styles.content}>
    <span style={styles.subSection2}>6.2.</span> We reserve the right to suspend or terminate accounts of users found engaging in prohibited activities or violating the Code of Conduct.
  </p>
  </div>
</div>

<div style={styles.section}>
  <h2 style={styles.heading}>7. Privacy and Data Security</h2>
  <p style={styles.content}>
    <span style={styles.subSection2}>7.1.</span> Our Privacy Policy includes information about how we collect, store, and protect user data. It also outlines user rights regarding their personal information, including the right to request data access or deletion.
  </p>
  <p style={styles.content}>
    <span style={styles.subSection2}>7.2.</span> While we take measures to safeguard your data, including encryption and secure storage, users are encouraged to take additional precautions on their end, such as using updated antivirus software and safeguarding their login credentials.
  </p>
</div>

<div style={styles.section}>
  <h2 style={styles.heading}>8. Payments and Billing</h2>
  <p style={styles.content}>
    <span style={styles.subSection2}>8.1.</span> Payment for medical services, including telemedicine and specialized care, is due as outlined in our Payment and Billing Policies. We accept various payment methods for user convenience.
  </p>
  <p style={styles.content}>
    <span style={styles.subSection2}>8.2.</span> Refunds may be issued in accordance with our Refund and Cancellation Policies, subject to certain terms and conditions.
  </p>
</div>

<div style={styles.section}>
  <h2 style={styles.heading}>9. Cookies and Tracking Technologies</h2>
  <p style={styles.content}>
    <span style={styles.subSection2}>9.1.</span> Our platform may use cookies, web beacons, and similar tracking technologies to enhance the user experience and collect information about your usage of the platform. By using our platform, you consent to the use of cookies and tracking technologies as described in our Cookie Policy.
  </p>
  <p style={styles.content}>
    <span style={styles.subSection2}>9.2.</span> Cookies are small text files that are stored on your device when you access our platform. These files help us remember your preferences and improve the performance and functionality of our platform.
  </p>
  <div style={styles.subSection1}>
  <p style={styles.content}>
    <span style={styles.subSection2}>9.3.</span> We use cookies for various purposes, including but not limited to:
  </p>
    <ul style={styles.list}>
      <li>1. Authentication: Cookies are used to identify and authenticate users, allowing you to access your account and personalized content.</li>
      <li>2. Analytics: We use cookies to collect data on how users interact with our platform, helping us improve our services and user experience.</li>
      <li>3. Advertising: Cookies may be used to deliver targeted advertising based on your interests and activities on our platform and across the internet.</li>
    </ul>
    </div>
    <p style={styles.content}>
    <span style={styles.subSection2}>9.4.</span> You can manage your cookie preferences through your web browser settings. Please note that disabling or blocking cookies may limit certain features and functionalities of our platform.
  </p>
  <p style={styles.content}>
    <span style={styles.subSection2}>9.5.</span> For more information about the use of cookies and how your data is processed, please refer to our Cookie Policy, which is an integral part of these Terms and Conditions.
  </p>
</div>

<div style={styles.section}>
  <h2 style={styles.heading}>10. Termination and Suspension</h2>
  <p style={styles.content}>
    <span style={styles.subSection2}>10.1.</span> For account termination or suspension may include repeated violations of our terms, failure to pay for services, or any actions that compromise the safety and well-being of other users or healthcare providers.
  </p>
</div>

<div style={styles.section}>
  <h2 style={styles.heading}>11. Intellectual Property</h2>
  <p style={styles.content}>
    <span style={styles.subSection2}>11.1.</span> All content and materials provided on our platform are protected by copyright, trademark, and other intellectual property rights. Users must seek permission from the platform or content owner for any reproduction, distribution, or use of such materials.
  </p>
  <p style={styles.content}>
    <span style={styles.subSection2}>11.2.</span> These additional sentences offer further clarification and guidance to users regarding their responsibilities and the platform's services. Be sure to adapt these statements to align with the specific services and policies of your e-hospital platform.

  </p>
</div>
      
      <div style={styles.section}>
        <h2 style={styles.heading}>12. Questions on General Terms and Conditions</h2>
        <p style={styles.content}>
          Should you have any questions regarding the General Terms and Conditions, including in respect of any use or disclosure of the information made available by you, you may contact e-hospital at:
          <a href="mailto:example@email.com" style={styles.link}>uottawabiomedicalsystems@gmail.com</a>
        </p>
      </div>
    </div>
  );
}

export default Terms;
//Terms & Conditions-Christina Sebastian-300279317- Sanika Liya Sunil-300315207-eHealth//
