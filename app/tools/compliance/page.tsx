'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { supabase } from '@/lib/supabase'

const appealTypes: any = {
  andon: 'Andon Cord POA',
  suspension: 'Account Suspension Appeal',
  listing: 'Listing Reinstatement Appeal',
  ip: 'IP / Counterfeit Appeal',
  fda: 'FDA / Health Violation Appeal',
  return: 'High Return Rate Appeal',
  shipment: 'Late Shipment Appeal',
  feedback: 'Negative Feedback Removal',
}

function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}

function formatInput(str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function generatePOA(type: string, productName: string, asin: string, details: string, marketplace: string): string {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const formattedProduct = toTitleCase(productName || 'Our Product')
  const formattedDetails = formatInput(details)
  const formattedASIN = asin.toUpperCase() || 'B00XXXXXXX'

  const templates: any = {
    andon: `PLAN OF ACTION (POA)

**ASIN:** ${formattedASIN}
**Product:** ${formattedProduct}
**Marketplace:** Amazon ${marketplace}
**Date:** ${date}

**Dear Amazon Seller Performance Team,**

Thank you for bringing this matter to our attention. We take all safety-related concerns with the utmost seriousness and have conducted a comprehensive internal investigation. We are fully committed to maintaining the highest safety and quality standards on Amazon.

---

## 1. Issue Summary

${formattedDetails}

We have carefully reviewed all customer feedback, return data, and quality control records related to this matter and are providing the following detailed response.

---

## 2. Root Cause Analysis

After conducting a thorough internal investigation, we have identified the following root causes:

**A. Quality Control Gap**
- Our pre-shipment inspection process did not adequately capture the specific concern raised.
- We identified a gap in our batch-level testing protocol that may have allowed affected units to pass initial inspection.

**B. Manufacturing Process Variance**
- A minor variance in our manufacturing process was identified that could have contributed to the reported concern.
- This variance was within our original tolerance range but has since been corrected.

**C. Customer Communication Gap**
- Our product listing and user manual did not sufficiently communicate important usage guidelines.
- This may have led to improper use in some instances.

---

## 3. Inventory Confirmation

We have conducted a full inspection of our current inventory of ${formattedProduct} (ASIN: ${formattedASIN}).

**Findings:**
- All inspected units have been physically examined for the reported concern.
- Units that do not meet our updated quality standards have been quarantined and removed from fulfillable inventory.
- Remaining inventory has been verified as fully compliant and safe.

✅ **Conclusion:** Our current fulfillable inventory is safe, functional, and compliant with all applicable standards.

---

## 4. Immediate Corrective Actions Taken

The following actions have been implemented immediately upon receiving this notification:

1. **Inventory Hold:** We immediately placed a hold on all inventory of ASIN ${formattedASIN} pending our investigation.
2. **Full Inventory Audit:** We conducted a 100% inspection of all available inventory units.
3. **Supplier Notification:** We immediately notified our manufacturer and halted further production pending resolution.
4. **Customer Communication:** We proactively reached out to all customers who recently purchased this product to provide safety guidance.
5. **Return Policy Update:** We have authorized full refunds or replacements for any affected customers without requiring product return.
6. **Third-Party Testing:** We have engaged an accredited third-party laboratory to conduct independent safety testing of our product.
7. **Documentation Review:** We have reviewed and updated all product safety documentation and compliance certificates.

---

## 5. Preventive Measures (Long-Term Actions)

### A. Enhanced Quality Control

- Implemented a stricter pre-shipment quality control process requiring 100% unit inspection.
- Added specific test criteria directly addressing the reported concern to our QC checklist.
- Introduced batch-level testing with detailed documentation for every production run.
- Established a dedicated quality control team member responsible for final approval before shipment.

### B. Supplier and Manufacturing Improvements

- Conducted a comprehensive audit of our manufacturing facility and supplier processes.
- Updated our manufacturing specifications to eliminate the identified process variance.
- Implemented mandatory supplier training on updated quality standards.
- Established monthly supplier review meetings to monitor ongoing compliance.

### C. Product Listing and Documentation Updates

- Updated our product title, bullet points, and description to clearly communicate usage guidelines.
- Revised our user manual to include clearer safety instructions and usage warnings.
- Added prominent safety information to product packaging and inserts.
- Created a Quick Start Guide emphasizing critical safety information for customers.

### D. Customer Education Initiative

- Updated our product listing to include clear usage instructions and safety guidelines.
- Implemented an automated follow-up email system to provide customers with usage tips after purchase.
- Created a dedicated FAQ section addressing common concerns and proper usage.

### E. Ongoing Monitoring and Compliance

- Established a weekly review process for all customer feedback and return reasons.
- Implemented a real-time alert system for any new safety-related concerns.
- Scheduled quarterly internal audits to ensure ongoing compliance.
- Created a direct feedback loop between customer service and our quality control team.

---

## 6. Supporting Documentation Available

The following documentation is available upon request:

- Third-party safety test reports from accredited laboratory
- Updated compliance certificates and product documentation
- Supplier audit report and corrective action plan
- Inventory inspection records and QC checklists
- Customer communication records and resolution documentation
- Updated user manual and product inserts

---

## 7. Final Confirmation

We have conducted a thorough investigation and taken immediate and comprehensive corrective action. We are confident that:

- The root cause has been fully identified and addressed.
- Our current inventory is safe and compliant.
- Our enhanced quality control processes will prevent recurrence.
- Our customers are being supported with clear communication and resolution options.

We remain fully committed to providing safe, high-quality products and maintaining the highest standards on Amazon. We respectfully request the reinstatement of our listing and assure Amazon and our customers that we have taken all necessary steps to prevent any recurrence.

**Sincerely,**
[Your Name]
[Your Business Name]
Date: ${date}`,

    suspension: `PLAN OF ACTION (POA) — ACCOUNT SUSPENSION APPEAL

**Account:** Amazon Seller Account
**Product:** ${formattedProduct}
**ASIN:** ${formattedASIN}
**Marketplace:** Amazon ${marketplace}
**Date:** ${date}

**Dear Amazon Seller Performance Team,**

We are writing in response to the suspension notice received for our selling account. We fully understand the gravity of this situation and sincerely apologize for any impact on our customers. We have conducted an immediate and thorough investigation and are committed to resolving this matter.

---

## 1. Issue Summary

${formattedDetails}

We have taken this matter extremely seriously and conducted a comprehensive review of our business operations, performance metrics, and compliance with Amazon's policies.

---

## 2. Root Cause Analysis

After a detailed internal investigation, we have identified the following root causes that contributed to this situation:

**A. Primary Root Cause — Operational Process Failure**
- We identified specific failures in our operational processes that directly contributed to the decline in our performance metrics.
- Our order management system did not have adequate safeguards to prevent the issues that occurred.
- Internal communication breakdowns between our fulfillment and customer service teams created delays in addressing customer concerns.

**B. Secondary Root Cause — Inadequate Monitoring**
- We did not have sufficient real-time monitoring of our key performance indicators.
- Warning signs in our metrics were not identified and addressed in a timely manner.
- Our escalation process for performance issues was not clearly defined or consistently followed.

**C. Contributing Factor — Resource Constraints**
- During the period in question, we experienced unexpected staffing challenges that impacted our operational capacity.
- This contributed to delays in order processing, customer response times, and quality control oversight.

---

## 3. Immediate Corrective Actions Taken

The following actions have been implemented immediately:

1. **Full Account Audit:** We conducted a comprehensive review of all active listings, pending orders, and customer communications.
2. **Process Review:** We immediately reviewed and updated all operational processes and standard operating procedures.
3. **Performance Monitoring:** We implemented real-time dashboards for all key performance metrics including ODR, LSR, and VTR.
4. **Customer Resolution:** We have proactively resolved all outstanding customer issues and complaints.
5. **Team Training:** Our entire team has completed updated training on Amazon's performance standards and policies.
6. **Inventory Review:** We have conducted a full inventory audit to ensure product quality and compliance.
7. **Listing Audit:** All active listings have been reviewed and updated to ensure full policy compliance.

---

## 4. Preventive Measures (Long-Term Actions)

### A. Performance Monitoring System

- Implemented daily review of all key performance indicators including Order Defect Rate, Late Shipment Rate, and Valid Tracking Rate.
- Established automated alerts when any metric approaches Amazon's performance threshold.
- Created a weekly performance review meeting with all team members.
- Assigned a dedicated Account Health Manager responsible for ongoing monitoring.

### B. Operational Process Improvements

- Developed and implemented comprehensive Standard Operating Procedures for all fulfillment operations.
- Established clear escalation procedures for performance issues with defined response timeframes.
- Implemented a quality control checkpoint at each stage of the order fulfillment process.
- Created detailed checklists for order processing, shipping, and customer communication.

### C. Customer Service Enhancement

- Committed to a maximum 24-hour response time for all customer inquiries and complaints.
- Implemented a structured customer resolution process with clear ownership and escalation paths.
- Created a proactive customer follow-up system to address concerns before they escalate to returns or complaints.
- Established a customer feedback review process to identify and address recurring issues.

### D. Inventory and Quality Management

- Implemented enhanced pre-shipment quality inspection for all products.
- Established a supplier performance review process with regular audits.
- Created an inventory forecasting system to prevent stockouts and fulfillment delays.
- Implemented batch tracking to enable rapid response to any quality concerns.

### E. Policy Compliance Program

- Conducted a comprehensive review of all Amazon policies relevant to our business.
- Implemented regular internal policy compliance audits (quarterly).
- Assigned team members responsible for monitoring Amazon policy updates and communicating changes.
- Created a policy compliance training program for all team members.

---

## 5. Supporting Documentation Available

- Updated Standard Operating Procedures
- Performance improvement plan with measurable targets and timelines
- Customer service training records and updated protocols
- Inventory management system documentation
- Staff training completion records
- Performance metric monitoring dashboard screenshots

---

## 6. Final Confirmation

We have taken immediate and comprehensive action to address the root causes of this situation. We are confident that:

- All identified root causes have been fully addressed.
- Our enhanced processes will prevent recurrence of these issues.
- Our team is fully trained and committed to maintaining Amazon's performance standards.
- We have the systems in place to identify and address any future concerns proactively.

We value our partnership with Amazon and our customers deeply. We are fully committed to maintaining the highest standards of performance and customer service going forward.

We respectfully request the reinstatement of our selling privileges and commit to full compliance with all Amazon policies and performance standards.

**Sincerely,**
[Your Name]
[Your Business Name]
Date: ${date}`,

    listing: `LISTING REINSTATEMENT APPEAL

**ASIN:** ${formattedASIN}
**Product:** ${formattedProduct}
**Marketplace:** Amazon ${marketplace}
**Date:** ${date}

**Dear Amazon Catalog / Seller Performance Team,**

We are writing to formally request the reinstatement of our product listing for ${formattedProduct} (ASIN: ${formattedASIN}) on Amazon ${marketplace}. We have thoroughly reviewed the reason for removal and have taken comprehensive corrective action.

---

## 1. Issue Summary

${formattedDetails}

We have conducted a detailed review of our listing against Amazon's current policies and guidelines and have identified and corrected all areas of non-compliance.

---

## 2. Root Cause Analysis

**A. Content Policy Non-Compliance**
- Upon detailed review, we identified specific elements in our listing that did not fully comply with Amazon's content guidelines.
- We acknowledge that our listing contained content that violated Amazon's policies in the following areas: [specific areas identified].
- This was the result of insufficient review of Amazon's updated policy guidelines at the time of listing creation.

**B. Policy Knowledge Gap**
- Our listing creation process did not include a comprehensive policy compliance review step.
- Team members responsible for listing creation were not fully up to date with the latest Amazon content policies.

**C. Review Process Failure**
- Our internal listing approval process did not have adequate checks to catch policy violations before the listing went live.

---

## 3. Corrective Actions Taken

The following changes have been made to bring our listing into full compliance:

1. **Title Updated:** Product title has been revised to comply with Amazon's title requirements — proper capitalization, no prohibited terms, within character limits.
2. **Bullet Points Revised:** All bullet points have been reviewed and rewritten to remove any non-compliant claims or content.
3. **Product Description Updated:** Description has been revised to ensure accuracy, remove prohibited content, and comply with HTML usage guidelines.
4. **Images Reviewed:** All product images have been reviewed to ensure they meet Amazon's technical and content requirements.
5. **Backend Keywords Updated:** Search terms have been reviewed and updated to remove any prohibited terms.
6. **Compliance Documentation:** All required compliance documentation and certifications have been obtained and are available upon request.

---

## 4. Preventive Measures

### A. Pre-Listing Compliance Review Process
- Implemented a mandatory compliance checklist that must be completed before any new listing goes live.
- All new listings must be reviewed and approved by a designated compliance team member.
- Created a library of Amazon policy guidelines accessible to all team members.

### B. Team Training
- All team members involved in listing creation have completed updated training on Amazon's content policies.
- Scheduled quarterly policy training sessions to keep the team current with any Amazon policy updates.

### C. Regular Listing Audits
- Implemented monthly audits of all active listings to ensure ongoing compliance.
- Established a process for rapid listing updates when policy changes are identified.

### D. Policy Monitoring
- Assigned a team member to monitor Amazon Seller Central for policy updates and announcements.
- Created an internal communication process to ensure all relevant team members are notified of policy changes.

---

## 5. Final Confirmation

Our listing for ${formattedProduct} (ASIN: ${formattedASIN}) has been fully updated to comply with all Amazon policies and guidelines. We are confident that the listing now meets all requirements and respectfully request its reinstatement.

**Sincerely,**
[Your Name]
[Your Business Name]
Date: ${date}`,

    ip: `INTELLECTUAL PROPERTY COMPLAINT APPEAL

**ASIN:** ${formattedASIN}
**Product:** ${formattedProduct}
**Marketplace:** Amazon ${marketplace}
**Date:** ${date}

**Dear Amazon Seller Performance Team,**

We are writing in response to the intellectual property complaint received regarding our listing for ${formattedProduct} (ASIN: ${formattedASIN}). We take IP compliance extremely seriously and have conducted a thorough investigation of this matter.

---

## 1. Issue Summary

${formattedDetails}

---

## 2. Our Position and Evidence

**A. Authorization and Authenticity**
- We are a fully authorized reseller/manufacturer of this product.
- We source all products directly from the brand owner or an authorized distributor.
- We hold valid purchase invoices and authorization documentation for all inventory.

**B. Product Authenticity Confirmation**
- All units sold by our account are 100% genuine and authentic products.
- We do not source products from unauthorized channels, grey markets, or counterfeit suppliers.
- Our supply chain has been thoroughly reviewed and verified.

**C. Documentation Available**
- Valid purchase invoices from authorized supplier (available upon request)
- Authorization letter from the brand owner or authorized distributor (available upon request)
- Import documentation confirming product authenticity (available upon request)

---

## 3. Corrective Actions Taken

1. **Immediate Listing Review:** We immediately reviewed our listing upon receiving this complaint.
2. **Supply Chain Audit:** We conducted a comprehensive audit of our supply chain and sourcing documentation.
3. **Inventory Verification:** All inventory has been physically verified for authenticity.
4. **Complainant Contact:** We have attempted to contact the rights holder directly to resolve this matter.
5. **Documentation Compilation:** We have compiled all relevant authorization and authenticity documentation.

---

## 4. Preventive Measures

### A. Enhanced Supplier Vetting
- Implemented a comprehensive supplier verification process requiring proof of authorization before any purchases.
- Established a supplier database with documented authorization status for all brands.
- Created an annual supplier re-verification process.

### B. Documentation Management
- Implemented a centralized documentation system for all supplier invoices and authorization letters.
- Established a process to maintain up-to-date authorization documentation for all brands.
- Created a document retention policy ensuring all records are maintained for a minimum of 5 years.

### C. IP Compliance Review
- Implemented a regular IP compliance review for all active listings.
- Created a process to identify and address potential IP concerns before listing products.
- Assigned a team member responsible for monitoring IP-related communications.

---

## 5. Final Confirmation

We are fully authorized to sell ${formattedProduct} (ASIN: ${formattedASIN}) on Amazon. We respectfully request the reinstatement of our listing and are happy to provide any additional documentation required.

**Sincerely,**
[Your Name]
[Your Business Name]
Date: ${date}`,

    fda: `FDA / REGULATORY COMPLIANCE APPEAL

**ASIN:** ${formattedASIN}
**Product:** ${formattedProduct}
**Marketplace:** Amazon ${marketplace}
**Date:** ${date}

**Dear Amazon Regulatory Compliance Team,**

We are writing in response to the regulatory compliance notice received for ${formattedProduct} (ASIN: ${formattedASIN}). We fully understand and respect Amazon's commitment to regulatory compliance and have taken immediate and comprehensive corrective action.

---

## 1. Issue Summary

${formattedDetails}

---

## 2. Root Cause Analysis

**A. Content Review Gap**
- Our listing content review process did not adequately screen for FDA-regulated claims.
- Certain language in our listing may have implied disease treatment, prevention, or cure claims that are not permitted.

**B. Policy Knowledge Gap**
- Our team was not fully current with the most recent FDA guidance and Amazon's restricted product policies for health and wellness products.

**C. Copywriting Standards**
- Our product copy was not reviewed by a qualified regulatory compliance professional prior to listing creation.

---

## 3. Immediate Corrective Actions Taken

1. **Listing Updated:** We have immediately removed all non-compliant health claims from our product title, bullet points, and description.
2. **Image Review:** All product images have been reviewed and any non-compliant text or claims have been removed.
3. **Backend Keywords:** All backend search terms have been reviewed and any prohibited health-related terms have been removed.
4. **Compliance Consultation:** We have engaged a regulatory compliance specialist to review all of our health and wellness product listings.
5. **Documentation Review:** We have reviewed all product documentation to ensure compliance with applicable FDA regulations.

**Specific Changes Made to Listing:**
- Removed all disease treatment, prevention, or cure claims
- Removed all structure/function claims that are not substantiated
- Updated language to use approved wellness-focused terminology
- Added appropriate disclaimers where required
- Ensured all remaining claims are truthful, substantiated, and compliant

---

## 4. Preventive Measures

### A. Regulatory Compliance Review Process
- Implemented a mandatory regulatory compliance review for all health and wellness product listings before going live.
- Engaged an ongoing relationship with a regulatory compliance consultant for periodic listing reviews.
- Created a health claims policy reference guide for all team members.

### B. Approved Language Library
- Developed a library of pre-approved, compliant language for health and wellness product descriptions.
- Created a list of prohibited terms and phrases that are automatically flagged in our listing creation process.
- Established a review process to update our language library when regulations change.

### C. Team Training
- All team members involved in listing creation have completed training on FDA regulations and Amazon's health product policies.
- Scheduled quarterly training updates to keep the team current with regulatory changes.

### D. Ongoing Compliance Monitoring
- Implemented quarterly audits of all health and wellness product listings.
- Established a process for rapid listing updates when regulatory guidance changes.

---

## 5. Final Confirmation

Our listing for ${formattedProduct} (ASIN: ${formattedASIN}) has been fully updated to comply with all applicable FDA regulations and Amazon's health product policies. We are committed to full regulatory compliance and respectfully request reinstatement.

**Sincerely,**
[Your Name]
[Your Business Name]
Date: ${date}`,

    return: `HIGH RETURN RATE — PLAN OF ACTION

**ASIN:** ${formattedASIN}
**Product:** ${formattedProduct}
**Marketplace:** Amazon ${marketplace}
**Date:** ${date}

**Dear Amazon Seller Performance Team,**

We are writing to formally address our High Return Rate for ${formattedProduct} (ASIN: ${formattedASIN}) on Amazon ${marketplace}. We have conducted a comprehensive analysis of all return reasons and customer feedback and have developed a detailed action plan to reduce our return rate to acceptable levels.

---

## 1. Issue Summary

${formattedDetails}

---

## 2. Return Analysis

We have conducted a detailed analysis of all returns received, categorizing them by return reason:

**Primary Return Reasons Identified:**

**A. Customer Expectation Mismatch (Primary Factor)**
- A portion of returns indicate that the product did not meet customer expectations.
- Analysis reveals that our product listing did not provide sufficient detail to set accurate expectations.
- Customers expected features or performance characteristics that differed from the actual product.

**B. Product Fit and Compatibility Issues**
- Some customers experienced fit or compatibility issues that could have been prevented with clearer listing information.
- Size charts, compatibility guides, or technical specifications were not sufficiently detailed.

**C. Limited Product Quality Variance (Secondary Factor)**
- A small number of returns indicated potential quality inconsistencies.
- Investigation revealed minor variance in a limited number of units — not a systemic defect.
- Affected units have been identified and removed from inventory.

---

## 3. Immediate Corrective Actions Taken

1. **Return Analysis:** Conducted a comprehensive review of all return reasons and customer feedback.
2. **Listing Update:** Updated product listing with more detailed descriptions, specifications, and customer guidance.
3. **Image Enhancement:** Added additional product images including size reference, compatibility guides, and usage demonstrations.
4. **Inventory Audit:** Conducted a full quality inspection of all available inventory.
5. **Customer Outreach:** Proactively contacted recent customers to address concerns and prevent additional returns.
6. **Customer Service Training:** Updated customer service team with detailed product knowledge to better assist customers before purchase.

---

## 4. Preventive Measures

### A. Listing Optimization
- Added comprehensive size charts, compatibility guides, and technical specifications.
- Updated bullet points to clearly set accurate customer expectations.
- Added comparison charts where applicable to help customers make informed purchasing decisions.
- Enhanced product images with detailed views, size references, and usage demonstrations.

### B. Quality Control Enhancement
- Implemented 100% pre-shipment inspection for all units.
- Added specific quality criteria to our QC checklist targeting the identified return reasons.
- Established batch-level tracking to enable rapid response to any emerging quality concerns.

### C. Customer Education
- Created a comprehensive FAQ section addressing common customer concerns.
- Implemented a post-purchase follow-up email with usage tips and troubleshooting guidance.
- Updated user manual and packaging inserts with clearer instructions.

### D. Return Rate Monitoring
- Implemented weekly monitoring of return reasons and rates.
- Established an alert system when return rate approaches threshold levels.
- Created a monthly return analysis review process to identify and address emerging trends.

---

## 5. Final Confirmation

We have taken immediate and comprehensive action to address the root causes of our elevated return rate. We are confident that the implemented changes will result in a significant reduction in returns and an improvement in customer satisfaction.

**Sincerely,**
[Your Name]
[Your Business Name]
Date: ${date}`,

    shipment: `LATE SHIPMENT RATE — PLAN OF ACTION

**Account:** Amazon Seller Account
**Product:** ${formattedProduct}
**ASIN:** ${formattedASIN}
**Marketplace:** Amazon ${marketplace}
**Date:** ${date}

**Dear Amazon Seller Performance Team,**

We are writing to formally address our Late Shipment Rate on Amazon ${marketplace}. We fully acknowledge that our shipping performance fell below Amazon's required standards and have taken immediate and comprehensive corrective action.

---

## 1. Issue Summary

${formattedDetails}

---

## 2. Root Cause Analysis

**A. Primary Root Cause — Fulfillment Process Breakdown**
- Our order fulfillment process experienced a breakdown during the identified period.
- Specific bottlenecks in our pick, pack, and ship process created delays that exceeded our promised ship dates.

**B. Carrier and Logistics Challenges**
- We experienced unexpected delays from our primary carrier during the affected period.
- We did not have adequate backup carrier options in place to handle these delays.

**C. Inventory Management Issue**
- Stockout situations on certain SKUs caused fulfillment delays as we worked to replenish inventory.
- Our inventory forecasting did not adequately anticipate demand during the affected period.

**D. Operational Capacity**
- Our team capacity was insufficient to handle order volume during peak periods.
- We did not have adequate staffing contingency plans in place for high-volume situations.

---

## 3. Immediate Corrective Actions Taken

1. **Process Audit:** Conducted an immediate review of our entire fulfillment process from order receipt to shipment confirmation.
2. **Same-Day Processing:** Implemented same-day order processing for all orders received before 2:00 PM local time.
3. **Staffing:** Added additional fulfillment staff and established shift coverage to handle all order volumes.
4. **Carrier Diversification:** Established accounts with two additional carrier options to ensure reliable fulfillment capacity.
5. **Automated Alerts:** Implemented automated alerts for all orders approaching their ship-by date.
6. **Daily Ship Review:** Established a daily review process to ensure all orders are shipped on time.
7. **Inventory Restocking:** Implemented an emergency restocking process for all at-risk SKUs.

---

## 4. Preventive Measures

### A. Fulfillment Process Improvements
- Documented and implemented comprehensive fulfillment SOPs with clear timeframes at each step.
- Established a daily fulfillment capacity review to ensure staffing matches order volume.
- Implemented a real-time order tracking dashboard visible to all fulfillment team members.

### B. Carrier Strategy
- Established relationships with three carrier options to ensure redundancy.
- Implemented carrier performance monitoring with automatic switching protocols.
- Negotiated priority pickup times with primary carrier.

### C. Inventory Management
- Implemented a 30-day inventory forecasting model with automatic reorder triggers.
- Established safety stock levels for all top-selling SKUs.
- Created an emergency restocking protocol for unexpected demand spikes.

### D. Performance Monitoring
- Implemented daily monitoring of Late Shipment Rate with automated alerts.
- Established weekly performance review meetings.
- Created escalation procedures for any orders at risk of late shipment.

---

## 5. Final Confirmation

We have implemented comprehensive improvements to our fulfillment operations and are confident that our Late Shipment Rate will return to and remain within Amazon's required standards.

**Sincerely,**
[Your Name]
[Your Business Name]
Date: ${date}`,

    feedback: `NEGATIVE FEEDBACK REMOVAL REQUEST

**Order / Feedback Reference:** [Feedback ID]
**Product:** ${formattedProduct}
**ASIN:** ${formattedASIN}
**Marketplace:** Amazon ${marketplace}
**Date:** ${date}

**Dear Amazon Seller Support Team,**

We are writing to respectfully request the removal of negative feedback received for ${formattedProduct} (ASIN: ${formattedASIN}) on Amazon ${marketplace}.

---

## 1. Feedback Details and Grounds for Removal

${formattedDetails}

We believe this feedback qualifies for removal based on the following grounds:

**A. Violation of Amazon's Feedback Policy**
- The feedback contains content that violates Amazon's community guidelines.
- The feedback references factors outside of the seller's control (e.g., Amazon fulfillment, carrier delays).
- The feedback contains inaccurate or misleading information about our product or service.

**B. FBA-Related Issue**
- This order was fulfilled by Amazon (FBA) and any fulfillment-related issues are outside our direct control.
- Amazon's feedback guidelines specify that feedback related to FBA fulfillment qualifies for removal.

**C. Issue Fully Resolved**
- We have been in direct contact with this customer and have fully resolved their concern.
- A full refund / replacement has been issued to the customer's satisfaction.
- The customer has acknowledged that their issue has been resolved.

---

## 2. Actions Taken to Resolve Customer Concern

1. **Immediate Response:** We contacted the customer within 24 hours of receiving the feedback.
2. **Full Resolution:** We offered and provided a complete resolution including [refund/replacement/repair] at no cost to the customer.
3. **Customer Satisfaction:** We followed up with the customer to confirm their satisfaction with the resolution.
4. **Root Cause Review:** We investigated the underlying cause and have taken steps to prevent recurrence.

---

## 3. Preventive Measures

### A. Enhanced Customer Service
- Implemented a proactive customer follow-up system after all deliveries.
- Established a maximum 24-hour response time for all customer inquiries.
- Created a structured resolution process with clear escalation paths.

### B. Quality Improvements
- Reviewed and enhanced our quality control process to address the concern raised.
- Implemented additional packaging protections where applicable.
- Updated product documentation and instructions based on customer feedback.

### C. Feedback Monitoring
- Implemented real-time monitoring of all customer feedback.
- Established a proactive outreach process to address concerns before they become negative feedback.

---

## 4. Final Request

We respectfully request the removal of this feedback as it does not accurately reflect our level of service and/or violates Amazon's feedback removal guidelines. We are committed to providing an exceptional customer experience and take all feedback seriously.

**Sincerely,**
[Your Name]
[Your Business Name]
Date: ${date}`,
  }
  return templates[type] || templates.suspension
}

function renderMarkdown(text: string) {
  const lines = text.split('\n')
  return lines.map((line, i) => {
    if (line.startsWith('## ')) {
      return <div key={i} style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: 700, color: '#e8eaf2', marginTop: '24px', marginBottom: '10px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>{line.replace('## ', '')}</div>
    }
    if (line.startsWith('### ')) {
      return <div key={i} style={{ fontSize: '14px', fontWeight: 700, color: '#c5c9d8', marginTop: '16px', marginBottom: '6px' }}>{line.replace('### ', '')}</div>
    }
    if (line.startsWith('---')) {
      return <hr key={i} style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)', margin: '16px 0' }} />
    }
    if (line.startsWith('**') && line.endsWith('**') && !line.includes(':**')) {
      return <div key={i} style={{ fontSize: '13px', fontWeight: 700, color: '#e8eaf2', marginBottom: '4px' }}>{line.replace(/\*\*/g, '')}</div>
    }
    // Render inline bold
    const parts = line.split(/\*\*(.*?)\*\*/)
    const rendered = parts.map((part, j) => j % 2 === 1 ? <strong key={j} style={{ color: '#e8eaf2', fontWeight: 700 }}>{part}</strong> : part)
    if (line.startsWith('- ') || line.startsWith('* ')) {
      return <div key={i} style={{ fontSize: '13px', color: '#c5c9d8', lineHeight: 1.7, paddingLeft: '16px', marginBottom: '4px', display: 'flex', gap: '8px' }}><span style={{ color: '#5e9ef4', flexShrink: 0 }}>•</span><span>{rendered}</span></div>
    }
    if (/^\d+\.\s/.test(line)) {
      const num = line.match(/^(\d+)\./)?.[1]
      const content = line.replace(/^\d+\.\s/, '')
      const contentParts = content.split(/\*\*(.*?)\*\*/)
      const contentRendered = contentParts.map((part, j) => j % 2 === 1 ? <strong key={j} style={{ color: '#e8eaf2', fontWeight: 700 }}>{part}</strong> : part)
      return <div key={i} style={{ fontSize: '13px', color: '#c5c9d8', lineHeight: 1.7, paddingLeft: '16px', marginBottom: '6px', display: 'flex', gap: '8px' }}><span style={{ color: '#5e9ef4', flexShrink: 0, fontWeight: 700 }}>{num}.</span><span>{contentRendered}</span></div>
    }
    if (line.startsWith('✅')) {
      return <div key={i} style={{ fontSize: '13px', color: '#4ef4b0', lineHeight: 1.7, marginBottom: '4px', fontWeight: 600 }}>{rendered}</div>
    }
    if (line === '') return <div key={i} style={{ height: '8px' }} />
    return <div key={i} style={{ fontSize: '13px', color: '#c5c9d8', lineHeight: 1.7, marginBottom: '4px' }}>{rendered}</div>
  })
}

function ComplianceContent() {
  const searchParams = useSearchParams()
  const initialType = searchParams.get('type') || 'andon'
  const [appealType, setAppealType] = useState(initialType)
  const [productName, setProductName] = useState('')
  const [asin, setAsin] = useState('')
  const [marketplace, setMarketplace] = useState('US')
  const [details, setDetails] = useState('')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [history, setHistory] = useState<any[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [freeUses, setFreeUses] = useState(() => {
    if (typeof window !== 'undefined') return parseInt(localStorage.getItem('wextrion_free_uses') || '0')
    return 0
  })
  const FREE_LIMIT = 3

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) { setUser(session.user); loadHistory(session.user.id) }
    })
  }, [])

  const loadHistory = async (userId: string) => {
    const { data } = await supabase.from('appeals').select('*').eq('user_id', userId).order('created_at', { ascending: false })
    if (data) setHistory(data)
  }

  const saveToHistory = async (type: string, product: string, content: string) => {
    if (!user) return
    const { data } = await supabase.from('appeals').insert({
      user_id: user.id, appeal_type: appealTypes[type], product_name: product || 'Unknown Product', content, created_at: new Date().toISOString()
    }).select().single()
    if (data) { setHistory(prev => [data, ...prev]); setActiveId(data.id) }
  }

  const deleteAppeal = async () => {
    if (!deleteConfirm) return
    await supabase.from('appeals').delete().eq('id', deleteConfirm)
    setHistory(prev => prev.filter(h => h.id !== deleteConfirm))
    if (activeId === deleteConfirm) { setResult(''); setActiveId(null) }
    setDeleteConfirm(null)
  }

  const generateAppeal = () => {
    if (!details.trim()) return
    if (!user && freeUses >= FREE_LIMIT) { window.location.href = '/auth/signup'; return }
    const poa = generatePOA(appealType, productName || 'Your Product', asin || 'B00XXXXXXX', details, marketplace)
    setResult(poa)
    if (user) saveToHistory(appealType, productName, poa)
    else {
      const newCount = freeUses + 1
      setFreeUses(newCount)
      if (typeof window !== 'undefined') localStorage.setItem('wextrion_free_uses', newCount.toString())
    }
  }

  const loadAppeal = (item: any) => { setResult(item.content); setActiveId(item.id) }
  const startNew = () => { setResult(''); setDetails(''); setProductName(''); setAsin(''); setActiveId(null) }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadText = () => {
    const blob = new Blob([result], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `wextrion-${appealType}-appeal.txt`; a.click()
  }

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return (
    <div style={{ minHeight: '100vh', background: '#0b0c10', display: 'flex', flexDirection: 'column' }}>

      {/* Delete Confirmation Popup */}
      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#13151c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '32px', maxWidth: '380px', width: '90%', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>🗑️</div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 700, color: '#e8eaf2', marginBottom: '8px' }}>Delete this appeal?</h3>
            <p style={{ color: '#7c8099', fontSize: '14px', marginBottom: '24px', lineHeight: 1.6 }}>This action cannot be undone. The appeal will be permanently removed from your history.</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setDeleteConfirm(null)}
                style={{ flex: 1, padding: '11px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#7c8099', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>
                Cancel
              </button>
              <button onClick={deleteAppeal}
                style={{ flex: 1, padding: '11px', background: 'linear-gradient(135deg, #f45e5e, #f4845e)', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: 700 }}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'transparent', border: 'none', color: '#7c8099', cursor: 'pointer', fontSize: '18px', padding: '4px' }}>☰</button>
          <div style={{ width: '26px', height: '26px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>⚡</div>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: 800, color: '#e8eaf2' }}>Wextrion</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {user ? (
            <>
              <span style={{ fontSize: '12px', color: '#7c8099' }}>{user.email}</span>
              <button onClick={async () => { await supabase.auth.signOut(); window.location.href = '/' }}
                style={{ padding: '6px 14px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#7c8099', cursor: 'pointer', fontSize: '12px' }}>
                Logout
              </button>
            </>
          ) : (
            <Link href="/auth/signup" style={{ padding: '6px 14px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', color: 'white', textDecoration: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>
              Sign Up Free
            </Link>
          )}
        </div>
      </nav>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* LEFT SIDEBAR */}
        {sidebarOpen && (
          <div style={{ width: '260px', minWidth: '260px', background: '#0f1117', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 53px)', overflowY: 'auto' }}>
            <div style={{ padding: '12px' }}>
              <button onClick={startNew} style={{ width: '100%', padding: '10px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                ✏️ New Appeal
              </button>
            </div>
            <div style={{ padding: '0 12px', flex: 1 }}>
              {!user ? (
                <div style={{ textAlign: 'center', padding: '24px 12px' }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔒</div>
                  <p style={{ fontSize: '12px', color: '#7c8099', marginBottom: '12px', lineHeight: 1.5 }}>Sign up free to save your appeal history</p>
                  <Link href="/auth/signup" style={{ display: 'block', padding: '8px', background: 'rgba(94,158,244,0.1)', border: '1px solid rgba(94,158,244,0.2)', borderRadius: '6px', color: '#5e9ef4', textDecoration: 'none', fontSize: '12px', fontWeight: 600 }}>
                    Create Free Account
                  </Link>
                </div>
              ) : history.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '24px 12px' }}>
                  <p style={{ fontSize: '12px', color: '#404357' }}>No appeals yet. Generate your first appeal!</p>
                </div>
              ) : (
                <>
                  <p style={{ fontSize: '11px', color: '#404357', padding: '8px 4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>History</p>
                  {history.map((item) => (
                    <div key={item.id} style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', marginBottom: '4px', background: activeId === item.id ? 'rgba(94,158,244,0.1)' : 'transparent', border: activeId === item.id ? '1px solid rgba(94,158,244,0.2)' : '1px solid transparent', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                      <div onClick={() => loadAppeal(item)} style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: activeId === item.id ? '#5e9ef4' : '#e8eaf2', marginBottom: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.product_name}</div>
                        <div style={{ fontSize: '11px', color: '#7c8099', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.appeal_type}</div>
                        <div style={{ fontSize: '10px', color: '#404357', marginTop: '2px' }}>{formatDate(item.created_at)}</div>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); setDeleteConfirm(item.id) }}
                        style={{ background: 'rgba(244,94,94,0.08)', border: '1px solid rgba(244,94,94,0.15)', borderRadius: '4px', color: '#f45e5e', cursor: 'pointer', fontSize: '11px', padding: '3px 7px', flexShrink: 0, marginTop: '2px' }}>
                        ✕
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', overflow: 'auto', padding: '32px 40px' }}>
          <div style={{ paddingRight: result ? '20px' : '0', maxWidth: result ? '100%' : '900px', margin: result ? '0' : '0 auto', width: '100%' }}>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', fontWeight: 800, color: '#e8eaf2', marginBottom: '4px' }}>📋 Appeal Generator</h1>
            <p style={{ color: '#7c8099', fontSize: '14px', marginBottom: '24px' }}>Fill in the details to generate your professional appeal</p>

            <div style={{ background: 'rgba(19,21,28,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '28px' }}>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '6px' }}>Appeal Type</label>
                  <select value={appealType} onChange={e => setAppealType(e.target.value)}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#e8eaf2', fontSize: '14px', outline: 'none' }}>
                    {Object.entries(appealTypes).map(([key, value]) => (
                      <option key={key} value={key} style={{ background: '#13151c' }}>{value as string}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '6px' }}>Marketplace</label>
                  <select value={marketplace} onChange={e => setMarketplace(e.target.value)}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#e8eaf2', fontSize: '14px', outline: 'none' }}>
                    {['US','UK','CA','DE','FR','IT','ES'].map(m => (
                      <option key={m} value={m} style={{ background: '#13151c' }}>Amazon {m}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '6px' }}>Product Name</label>
                  <input value={productName} onChange={e => setProductName(e.target.value)}
                    placeholder="e.g. LifePro Vibration Plate"
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#e8eaf2', fontSize: '14px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '6px' }}>ASIN</label>
                  <input value={asin} onChange={e => setAsin(e.target.value)}
                    placeholder="e.g. B09Y9G5QPS"
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#e8eaf2', fontSize: '14px', outline: 'none' }} />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '6px' }}>Issue Details *</label>
                <textarea value={details} onChange={e => setDetails(e.target.value)}
                  placeholder="Describe the issue in detail. What did Amazon say? What happened? The more detail you provide, the better your appeal will be..."
                  rows={7}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#e8eaf2', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '6px' }}>Supporting Documents (Optional)</label>
                <div onClick={() => document.getElementById('fileInput')?.click()}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '2px dashed rgba(255,255,255,0.08)', borderRadius: '8px', padding: '16px', textAlign: 'center', cursor: 'pointer', color: '#7c8099', fontSize: '13px' }}>
                  📎 Click to attach invoices, test reports or images
                  <input id="fileInput" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.docx,.doc"
                    style={{ display: 'none' }}
                    onChange={e => setFiles(prev => [...prev, ...Array.from(e.target.files || [])])} />
                </div>
                {files.length > 0 && (
                  <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {files.map((file, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(94,158,244,0.08)', border: '1px solid rgba(94,158,244,0.15)', borderRadius: '6px', padding: '7px 12px' }}>
                        <span style={{ fontSize: '12px', color: '#5e9ef4' }}>📄 {file.name}</span>
                        <button onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))}
                          style={{ background: 'transparent', border: 'none', color: '#f45e5e', cursor: 'pointer', fontSize: '13px' }}>✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {!user && (
                <div style={{ marginBottom: '10px', textAlign: 'center' }}>
                  {freeUses < FREE_LIMIT ? (
                    <p style={{ fontSize: '12px', color: '#4ef4b0' }}>✓ {FREE_LIMIT - freeUses} free appeals remaining — no signup needed</p>
                  ) : (
                    <p style={{ fontSize: '12px', color: '#f4c45e' }}>⚡ Free limit reached — sign up free to continue</p>
                  )}
                </div>
              )}

              <button onClick={generateAppeal} disabled={!details.trim()}
                style={{ width: '100%', padding: '14px', background: details.trim() ? 'linear-gradient(135deg, #5e9ef4, #7c5ef4)' : 'rgba(255,255,255,0.05)', color: details.trim() ? 'white' : '#7c8099', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '15px', cursor: details.trim() ? 'pointer' : 'not-allowed' }}>
                {!user && freeUses >= FREE_LIMIT ? 'Sign Up to Continue →' : 'Generate Professional Appeal →'}
              </button>
            </div>
          </div>

          {result && (
            <div style={{ paddingLeft: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 700, color: '#e8eaf2' }}>Generated Appeal</h2>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={copyToClipboard}
                    style={{ padding: '8px 16px', background: copied ? 'rgba(78,244,176,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${copied ? 'rgba(78,244,176,0.3)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '7px', color: copied ? '#4ef4b0' : '#7c8099', cursor: 'pointer', fontSize: '13px' }}>
                    {copied ? '✓ Copied!' : 'Copy'}
                  </button>
                  <button onClick={downloadText}
                    style={{ padding: '8px 16px', background: 'rgba(94,158,244,0.1)', border: '1px solid rgba(94,158,244,0.2)', borderRadius: '7px', color: '#5e9ef4', cursor: 'pointer', fontSize: '13px' }}>
                    Download
                  </button>
                </div>
              </div>
              <div style={{ background: 'rgba(19,21,28,0.8)', border: '1px solid rgba(244,196,94,0.15)', borderRadius: '14px', padding: '24px', height: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                {renderMarkdown(result)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Compliance() {
  return (
    <Suspense fallback={<div style={{ background: '#0b0c10', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e8eaf2' }}>Loading...</div>}>
      <ComplianceContent />
    </Suspense>
  )
}