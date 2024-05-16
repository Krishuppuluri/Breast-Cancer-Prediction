//Patients rights & responsibilities-Christina Sebastian-300279317- Sanika Liya Sunil-300315207-eHealth//
import React from 'react';

const Rights = () => {
  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textDecoration: 'underline',
  };

  const sectionHeadingStyle = {
    fontSize: '24px', // Adjusted font size for section headings
    fontWeight: 'bold',
    marginBottom: '10px', // Adjusted spacing
  };

  const listContainerStyle = {
    textAlign: 'left', 
    margin: '0 auto', 
    maxWidth: '600px', 
  };

  const paragraphStyle = {
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '20px',
  };

  const listItemStyle = {
    textAlign: 'left',
    marginBottom: '10px',
    fontStyle: 'italic', 
  };

  const boldText = {
    fontWeight: 'bold', 
  };
  const introParagraphStyle = {
    fontSize: '18px', 
    fontWeight: 'bold', 
    lineHeight: '1.6',
    marginBottom: '20px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Patient Rights and Responsibilities</h1>
      <p style={introParagraphStyle}>
        <span style={boldText}>Your Rights, Your Health:</span> Welcome to E-Hospital, your guide for understanding patient rights and duties in Canada's e-hospital setting. As we embark on this digital healthcare adventure, it is critical that you understand your rights and obligations to receive the best possible treatment while respecting your privacy and dignity. As a valued part of our e-hospital community, we detail what you may anticipate and what is required of you here.
      </p>
      <h2 style={sectionHeadingStyle}>As a patient, you have the right to …</h2>
      <div style={listContainerStyle}>
        <ol style={paragraphStyle}>
          <li style={listItemStyle}>
            <span style={boldText}>Quality Care:</span> <span> You have the right to high-quality healthcare services via our e-hospital platform.</span>
            </li>
            <li style={listItemStyle}>
            <span style={boldText}>Informed Consent:</span> <span> You have the right to be fully informed about your medical condition, treatment alternatives, and potential risks and benefits before providing consent for any e-healthcare procedures.</span>
            </li>
            <li style={listItemStyle}>
            <span style={boldText}>Choice of Provider:</span> <span> When using our e-hospital platform, you should be able to select your healthcare provider.</span>
            </li>
            <li style={listItemStyle}>
            <span style={boldText}>Nondiscrimination:</span> <span> You should not face discrimination because of your race, gender, religion, sexual orientation, or disability.</span>
            </li>
            <li style={listItemStyle}>
            <span style={boldText}>Collaborative Treatment Planning:</span> <span> You can work with the healthcare team to develop a treatment or care plan that meets your needs.</span>
            </li>
            <li style={listItemStyle}>
            <span style={boldText}>Obtaining a Second Opinion:</span> <span> you may obtain a second medical opinion.</span>
            </li>
            <li style={listItemStyle}>
            <span style={boldText}>Preferred Language and Translator Services:</span> <span> You have the right to be acknowledged in your preferred language (English or French). Our e-hospital will attempt to provide translator services wherever available to facilitate effective communication between patients and healthcare team members.</span>
            </li>
            <li style={listItemStyle}>
            <span style={boldText}>Informed Consent:</span> <span> You have the right to be fully informed about your medical condition, treatment alternatives, and potential risks and benefits before providing consent for any e-healthcare procedures.</span>
            </li>
          
        </ol>
      </div>
      <h2 style={sectionHeadingStyle}>As a patient, it is your responsibility to …</h2>
      <div style={listContainerStyle}>
        <ol style={paragraphStyle}>
          <li style={listItemStyle}>
            <span style={boldText}>Accurate Information:</span> <span> Complete and accurate information regarding your medical history, symptoms, and current health state should be provided.</span>
          </li>
          <li style={listItemStyle}>
            <span style={boldText}>Treatment Compliance: </span> <span> You are responsible for adhering to the treatment plans and suggestions offered by your healthcare providers via our e-hospital platform.</span>
          </li>
          <li style={listItemStyle}>
            <span style={boldText}>Respect for professionals: </span> <span> You should show respect and decency to healthcare professionals and platform staff.</span>
          </li>
          <li style={listItemStyle}>
            <span style={boldText}>Security and privacy:</span> <span>You are responsible for protecting your personal and medical information, including using secure passwords and not disclosing your login credentials.</span> 
          </li>
          <li style={listItemStyle}>
            <span style={boldText}>Making Informed Decisions:</span> <span>You should actively participate in your healthcare decisions, asking questions and seeking explanations as needed.</span> 
          </li>
          <li style={listItemStyle}>
            <span style={boldText}>Emergency protocols: </span> <span> You should be aware of our platform's emergency protocols as well as how to seek immediate treatment if necessary.</span>
          </li>
          <li style={listItemStyle}>
            <span style={boldText}>Payment and Insurance:</span> <span> It is your responsibility to understand the prices of e-healthcare services, including insurance coverage, and to make the necessary payments.</span>
          </li>
          <li style={listItemStyle}>
            <span style={boldText}>Input and Improvement: </span> <span> We welcome your input on our e-hospital platform to help us enhance the quality of care and services we deliver.</span>
          </li>
          <li style={listItemStyle}>
            <span style={boldText}>Questioning Unclear Instructions: </span> <span> You have the right to inquire about any instructions that are unclear or difficult to follow. Your understanding is essential for your well-being, so feel free to ask for clarification when needed.</span>
          </li>
        </ol>
      </div>
    </div>
      
  );
};

export default Rights;
//Patients rights & responsibilities-Christina Sebastian-300279317- Sanika Liya Sunil-300315207-eHealth//

