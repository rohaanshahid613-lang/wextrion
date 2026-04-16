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
  safety: 'Safety Violation Appeal',
  medical: 'Medical Device Misclassification Appeal',
}

function toTitleCase(str: string): string {
  if (!str) return 'Our Product'
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}

function formatInput(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function generatePOA(type: string, productName: string, asin: string, details: string, marketplace: string): string {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const formattedProduct = toTitleCase(productName)
  const formattedDetails = formatInput(details)
  const formattedASIN = (asin || 'B00XXXXXXX').toUpperCase()

  const templates: any = {

    andon: `PLAN OF ACTION (POA) — ANDON CORD RESPONSE

**ASIN:** ${formattedASIN}
**Product:** ${formattedProduct}
**Marketplace:** Amazon ${marketplace}
**Date:** ${date}

---

**Dear Amazon RBS / Andon Cord Team,**

Thank you for notifying us regarding the Andon Cord raised for ASIN ${formattedASIN}. We have conducted a comprehensive investigation including product inspection, review of customer feedback, packaging validation, PDP content analysis, and user manual evaluation.

We confirm that the reported issues are isolated and do not indicate that all inventory is defective. The concerns are primarily attributed to usage misunderstanding, performance expectations, and limited quality variances.

---

## 1. Complaint Summary

Customer complaints received include:

${formattedDetails}

We have carefully reviewed all customer feedback, Voice of Customer (VOC) data, return records, and quality control records related to this matter.

---

## 2. Root Cause Analysis

### A. Usage & Performance Expectation Gap (Primary Cause)

- Customers may not have reviewed the user manual prior to use
- Product usage guidelines and intensity recommendations were not sufficiently highlighted on the PDP
- Performance expectations may not have aligned with the product's actual operating mechanism
- Customers using the product incorrectly or at incorrect settings may have perceived it as malfunctioning

### B. Setup & Charging / Operation Misunderstanding

- Improper setup or first-use steps may have led to perceived non-functionality
- Some reported issues may stem from customers skipping initial setup steps outlined in the user manual
- Battery/charging-related complaints may be due to insufficient initial charge before first use

### C. Product Handling & Transit Impact

- During transit, improper handling may result in loose components or perceived functional concerns
- Packaging may not have provided sufficient protection against handling variability during shipping

### D. Limited Quality Control Gaps (Isolated)

- In rare cases, minor functional inconsistencies may have occurred in isolated units
- These are isolated incidents and not indicative of a systemic manufacturing defect
- No recurring defect pattern has been identified across inventory

### E. PDP Content Clarity Gap

- The Product Detail Page did not sufficiently emphasize:
  - Proper usage technique and intensity recommendations
  - Importance of reading the user manual before first use
  - Expected performance characteristics and operating mechanism

---

## 3. Inventory Confirmation

We conducted a detailed inspection of our available inventory for ASIN ${formattedASIN}.

**Verified during inspection:**

- Core functionality confirmed working as designed
- All components present and properly assembled
- Performance consistent with product specifications
- No systemic defects identified across inspected units

✅ **Conclusion:** Inventory is fully functional and not broadly defective. Reported issues are isolated and not indicative of an inventory-wide problem.

---

## 4. Quality & Functional Testing (Minimum 5 Units)

We conducted real-use testing on a minimum of 5 units from current inventory.

**Test criteria covered:**

- Core functionality and performance verification
- Component fitment and stability
- Continuous operation under normal usage conditions
- Safety and compliance verification
- Packaging integrity and component completeness

**Result:** All tested units passed quality and functional checks successfully. Product performs as intended when used according to the user manual.

---

## 5. Immediate Corrective Actions Taken

### a. Inventory Inspection & Validation

- Conducted thorough inspection of available inventory
- Identified and quarantined any units with visible damage or functional concerns
- Confirmed remaining inventory meets quality standards

### b. Functional Testing

- Performed real-use testing based on user manual guidance
- Confirmed product performs correctly under proper usage conditions
- Documented test results for all inspected units

### c. Packaging & Component Audit

- Verified all components are present and properly secured
- Ensured secure placement of accessories to prevent transit movement
- Reinforced packaging where necessary to reduce transit-related concerns

### d. Customer Feedback Analysis

- Categorized all complaints into root cause categories
- No recurring manufacturing defect trend identified
- Majority of issues attributed to usage misunderstanding or expectation gaps

### e. PDP Content Enhancement (Clarity Updates Only — No Claims Added)

- Updated listing to clearly explain product functionality and operating mechanism
- Added prominent instruction to review user manual before first use
- Improved clarity around intensity settings and proper usage technique
- Enhanced expectation-setting language throughout the listing

### f. Customer Support Strengthening

- Updated internal SOPs to better assist customers with setup and usage questions
- Provided customer service team with detailed troubleshooting guidance
- Implemented proactive customer outreach for affected orders

### g. Logistics & Handling Reinforcement

- Coordinated with fulfillment partners to improve handling procedures
- Reviewed packaging specifications to reduce transit-related concerns

---

## 6. Preventive Measures

### A. Enhanced Quality Control

- Added pre-dispatch functional testing to QC checklist
- Implemented component verification step before shipment approval
- Increased batch-level quality audit frequency

### B. Packaging Improvements

- Reinforced internal cushioning for fragile components
- Secured accessories separately to prevent movement during transit
- Strengthened outer packaging to reduce handling-related damage

### C. PDP Optimization (Clarification Only — No New Claims Added)

- Added proper usage guidance and intensity adjustment recommendations
- Included clear reference to user manual before first use
- Enhanced product mechanism description to align customer expectations

### D. Customer Education

- Emphasized correct usage technique in listing content
- Added troubleshooting guidance to product inserts
- Reinforced importance of reading user manual before first use

### E. Continuous Monitoring

- Implemented ongoing tracking of return trends and customer feedback
- Established regular QA reviews and supplier performance evaluations
- Created escalation protocol for any safety-related feedback

---

## 7. Documentation Confirmation

The following documentation is available and has been verified:

- ✅ User Manual — available on PDP (includes setup, usage guidance, safety precautions, and troubleshooting)
- ✅ Product & Packaging Images — clearly showing model number and UPC
- ✅ Quality & Functional Inspection Report — covering minimum 5 units from current inventory
- ✅ Backend Content Confirmation — confirming listing content compliance

No recent product design or manufacturing changes have been made to this product.

---

## 8. Final Confirmation

Based on our comprehensive investigation:

- Inventory is **not broadly defective** — issues are isolated and not systemic
- Product performs as intended when used correctly per the user manual
- Root causes have been identified and fully addressed
- Corrective and preventive measures have been implemented

We are committed to maintaining Amazon's quality standards and improving the customer experience for ASIN ${formattedASIN}. We respectfully request reinstatement of the buying offer as soon as possible.

**Sincerely,**
[Your Name / Brand] Support Team
Date: ${date}`,

    suspension: `PLAN OF ACTION (POA) — ACCOUNT SUSPENSION APPEAL

**Marketplace:** Amazon ${marketplace}
**Product:** ${formattedProduct}
**ASIN:** ${formattedASIN}
**Date:** ${date}

---

**Dear Amazon Seller Performance Team,**

We are writing in response to the account suspension notice received for our selling account. We fully understand the gravity of this situation and sincerely apologize for any negative impact on our customers. We have conducted an immediate and comprehensive investigation and are committed to fully resolving this matter.

---

## 1. Issue Summary

${formattedDetails}

We have taken this notification extremely seriously and conducted a thorough review of our business operations, performance metrics, order history, and compliance with Amazon's policies.

---

## 2. Root Cause Analysis

### A. Primary Root Cause — Operational Process Failure

- We identified specific failures in our operational processes that directly contributed to the decline in our performance metrics
- Our order management workflow lacked sufficient checkpoints to prevent the issues that occurred
- Internal communication gaps between our fulfillment and customer service teams created delays in addressing customer concerns promptly

### B. Secondary Root Cause — Inadequate Performance Monitoring

- We did not have sufficient real-time visibility into our key performance indicators
- Warning signs in our metrics were not identified and escalated in a timely manner
- Our internal escalation process for performance issues was not clearly defined or consistently followed

### C. Contributing Factors

- Unexpected volume fluctuations were not adequately anticipated in our operational planning
- Staffing and resource allocation were insufficient to maintain service levels during peak periods
- Supplier delays impacted our ability to fulfill orders within the committed timeframes

---

## 3. Immediate Corrective Actions Taken

1. **Full Account Audit** — Conducted a comprehensive review of all active listings, pending orders, open cases, and customer communications
2. **Process Overhaul** — Immediately reviewed and updated all operational processes and standard operating procedures
3. **Performance Dashboard** — Implemented real-time monitoring of all key metrics including ODR, LSR, OTDR, and VTR
4. **Customer Resolution** — Proactively resolved all outstanding customer issues, complaints, and return requests
5. **Team Retraining** — Our entire operations and customer service team has completed updated training on Amazon's performance standards and policies
6. **Inventory Review** — Conducted a full inventory audit to ensure product quality and listing compliance
7. **Listing Compliance Audit** — All active listings reviewed and updated to ensure full policy compliance

---

## 4. Preventive Measures

### A. Performance Monitoring System

- Implemented daily review of all key performance indicators (ODR, LSR, VTR, OTDR)
- Established automated alerts when any metric approaches Amazon's performance threshold
- Created a weekly performance review meeting with all relevant team members
- Assigned a dedicated Account Health Manager responsible for ongoing monitoring

### B. Operational Process Improvements

- Developed and implemented comprehensive Standard Operating Procedures for all order fulfillment operations
- Established clear escalation procedures with defined response timeframes for all performance concerns
- Implemented quality control checkpoints at each stage of the order fulfillment process
- Created detailed daily operational checklists to ensure consistency

### C. Customer Service Enhancement

- Committed to a maximum 24-hour response time for all customer inquiries and complaints
- Implemented a structured customer resolution process with clear ownership and escalation paths
- Established a proactive customer follow-up system to address concerns before they escalate
- Implemented a post-order communication strategy to improve customer satisfaction

### D. Inventory and Quality Management

- Implemented enhanced pre-shipment quality inspection for all products
- Established a supplier performance review process with regular audits
- Created an inventory forecasting system to prevent stockouts and fulfillment delays
- Implemented batch tracking to enable rapid response to any emerging quality concerns

### E. Policy Compliance Program

- Completed a comprehensive review of all Amazon policies applicable to our business
- Implemented quarterly internal policy compliance audits
- Assigned team members responsible for monitoring Amazon policy updates and communications
- Created a policy compliance training program for all team members

---

## 5. Supporting Documentation Available

- Updated Standard Operating Procedures for all fulfillment operations
- Performance improvement plan with measurable targets and timelines
- Customer service training completion records
- Performance metric monitoring dashboard documentation
- Inventory management and QC documentation

---

## 6. Final Confirmation

We have taken immediate and comprehensive action to address all identified root causes. We are confident that:

- All root causes have been fully identified and addressed
- Our enhanced processes and monitoring will prevent recurrence
- Our team is fully trained and committed to Amazon's performance standards
- We have the systems in place to identify and address any future concerns proactively

We value our relationship with Amazon and our customers deeply and are fully committed to maintaining the highest standards going forward. We respectfully request the reinstatement of our selling privileges.

**Sincerely,**
[Your Name]
[Your Business Name]
Date: ${date}`,

    listing: `LISTING REINSTATEMENT APPEAL

**ASIN:** ${formattedASIN}
**Product:** ${formattedProduct}
**Marketplace:** Amazon ${marketplace}
**Date:** ${date}

---

**Dear Amazon Catalog / Seller Performance Team,**

We are writing to formally request the reinstatement of our product listing for ${formattedProduct} (ASIN: ${formattedASIN}) on Amazon ${marketplace}. We have thoroughly reviewed the reason for removal and have taken comprehensive corrective action to bring our listing into full compliance.

---

## 1. Issue Summary

${formattedDetails}

---

## 2. Root Cause Analysis

### A. Content Policy Non-Compliance

- Upon detailed review against Amazon's current content guidelines, we identified specific elements in our listing that did not fully comply
- Our listing creation and review process did not include a sufficiently rigorous compliance check step
- Team members responsible for listing creation were not fully current with the latest Amazon content policy requirements

### B. Policy Knowledge Gap

- Our internal processes did not adequately account for recent Amazon policy updates
- We have since conducted a comprehensive policy review and updated our team training accordingly

### C. Review Process Gap

- Our internal listing approval process lacked adequate compliance checkpoints before listings went live
- We have implemented a mandatory compliance review step for all new and updated listings

---

## 3. Corrective Actions Taken

1. **Title Revised** — Updated to comply with Amazon's title requirements: proper capitalization, no prohibited terms, within character limits, and accurate product representation
2. **Bullet Points Rewritten** — All bullet points reviewed and rewritten to remove any non-compliant claims, prohibited language, or inaccurate content
3. **Description Updated** — Product description revised to ensure accuracy, remove prohibited content, and comply with Amazon's content guidelines
4. **Images Reviewed** — All product images reviewed against Amazon's technical and content requirements; non-compliant images replaced
5. **Backend Keywords Updated** — Search terms reviewed and updated to remove any prohibited, irrelevant, or policy-violating terms
6. **Compliance Documentation** — All required product compliance documentation and certifications have been obtained and are available upon request

---

## 4. Preventive Measures

### A. Pre-Listing Compliance Review Process

- Implemented a mandatory compliance checklist that must be completed before any listing goes live
- All new and updated listings must be reviewed and approved by a designated compliance team member
- Created an accessible policy reference library for all team members

### B. Team Training

- All team members involved in listing creation have completed updated training on Amazon's content policies
- Scheduled quarterly policy training sessions to keep the team current with Amazon policy updates

### C. Regular Listing Audits

- Implemented monthly audits of all active listings to ensure ongoing compliance
- Established a process for rapid listing updates when policy changes are identified

---

## 5. Final Confirmation

Our listing for ${formattedProduct} (ASIN: ${formattedASIN}) has been fully updated to comply with all Amazon policies and guidelines. We respectfully request reinstatement of this listing.

**Sincerely,**
[Your Name]
[Your Business Name]
Date: ${date}`,

    ip: `INTELLECTUAL PROPERTY COMPLAINT APPEAL

**ASIN:** ${formattedASIN}
**Product:** ${formattedProduct}
**Marketplace:** Amazon ${marketplace}
**Date:** ${date}

---

**Dear Amazon Seller Performance Team,**

We are writing in response to the intellectual property complaint received regarding our listing for ${formattedProduct} (ASIN: ${formattedASIN}) on Amazon ${marketplace}. We take IP compliance extremely seriously and have conducted a thorough investigation of this matter.

---

## 1. Issue Summary

${formattedDetails}

---

## 2. Our Position and Supporting Evidence

### A. Authorization and Authenticity

- We are a fully authorized reseller / manufacturer of ${formattedProduct}
- All products are sourced directly from the brand owner or an authorized distributor
- We hold valid purchase invoices and supplier authorization documentation for all inventory

### B. Product Authenticity Confirmation

- All units sold through our account are 100% genuine and authentic products
- We do not source products from unauthorized channels, grey markets, or third-party unauthorized suppliers
- Our supply chain has been thoroughly reviewed and all sourcing documentation verified

### C. Documentation Available Upon Request

- Valid purchase invoices from authorized supplier
- Authorization letter from brand owner or authorized distributor
- Import documentation confirming product authenticity and sourcing

---

## 3. Corrective Actions Taken

1. **Immediate Listing Review** — Reviewed our listing upon receiving this notice to identify any content that may have triggered the complaint
2. **Supply Chain Audit** — Conducted a comprehensive audit of our supply chain and all sourcing documentation
3. **Inventory Verification** — All inventory has been physically verified for authenticity
4. **Documentation Compilation** — Compiled all relevant authorization letters, invoices, and authenticity documentation
5. **Complainant Outreach** — Attempted to contact the rights holder directly to resolve this matter amicably

---

## 4. Preventive Measures

### A. Enhanced Supplier Vetting

- Implemented a comprehensive supplier verification process requiring written proof of authorization before any purchases
- Established a supplier database with documented authorization status for all brands and products
- Created an annual supplier re-verification and documentation renewal process

### B. Documentation Management

- Implemented a centralized documentation system for all supplier invoices, authorization letters, and compliance certificates
- Established a document retention policy ensuring all records are maintained for a minimum of 5 years
- Created a process to maintain up-to-date authorization documentation for all active product lines

### C. IP Compliance Program

- Implemented a regular IP compliance review for all active listings
- Created a process to identify potential IP concerns before listing new products
- Assigned a team member responsible for monitoring IP-related communications and ensuring ongoing compliance

---

## 5. Final Confirmation

We are fully authorized to sell ${formattedProduct} (ASIN: ${formattedASIN}) on Amazon ${marketplace}. We respectfully request the reinstatement of our listing and are happy to provide any additional documentation required to resolve this matter.

**Sincerely,**
[Your Name]
[Your Business Name]
Date: ${date}`,

    fda: `FDA / REGULATORY COMPLIANCE APPEAL

**ASIN:** ${formattedASIN}
**Product:** ${formattedProduct}
**Marketplace:** Amazon ${marketplace}
**Date:** ${date}

---

**Dear Amazon Regulatory Compliance Team,**

We are writing in response to the regulatory compliance notice received for ${formattedProduct} (ASIN: ${formattedASIN}) on Amazon ${marketplace}. We fully understand and respect Amazon's commitment to regulatory compliance and have taken immediate and comprehensive corrective action.

---

## 1. Issue Summary

${formattedDetails}

---

## 2. Root Cause Analysis

### A. Content Compliance Gap

- Upon detailed review, we identified that certain language in our listing may have implied disease treatment, prevention, or cure claims that are not permitted under FDA / regulatory guidelines
- Our listing content was not reviewed by a qualified regulatory compliance professional prior to publication
- We did not have a sufficiently comprehensive health claims screening process in place during listing creation

### B. Policy Knowledge Gap

- Our team was not fully current with the most recent FDA / Health Canada guidance and Amazon's restricted product policies for health and wellness products
- We have since engaged a regulatory compliance specialist to conduct a full review of all relevant listings

### C. Copywriting Standards Gap

- Our product copy relied on language commonly used in the industry that, upon regulatory review, was found to contain implied claims not compliant with applicable regulations

---

## 3. Immediate Corrective Actions Taken

1. **Listing Immediately Updated** — Removed all non-compliant health claims from product title, bullet points, description, and backend keywords
2. **Image Review Completed** — All product images reviewed; any non-compliant text, claims, or imagery have been removed or replaced
3. **Backend Keywords Cleaned** — All search terms reviewed and any prohibited health-related terms removed
4. **Compliance Specialist Engaged** — Engaged a regulatory compliance specialist to review all health and wellness product listings
5. **PDP Content Repositioned** — All listing content repositioned to clearly reflect general wellness use without medical or therapeutic claims

**Specific Changes Made:**

- Removed all disease treatment, prevention, diagnosis, or cure claims
- Removed all unauthorized structure/function claims
- Updated language to use approved wellness-focused terminology only
- Added appropriate disclaimers where required by regulation
- Ensured all remaining claims are truthful, substantiated, and compliant

---

## 4. Preventive Measures

### A. Regulatory Compliance Review Process

- Implemented mandatory regulatory compliance review for all health and wellness product listings before going live
- Established ongoing relationship with a regulatory compliance consultant for periodic listing reviews
- Created a health claims policy reference guide accessible to all team members

### B. Approved Language Library

- Developed a library of pre-approved, compliant language for health and wellness product descriptions
- Created a prohibited terms list that is automatically screened during the listing creation process
- Established a review process to update our language library when regulatory guidance changes

### C. Team Training

- All team members involved in listing creation have completed training on FDA regulations and Amazon's health product policies
- Scheduled quarterly training updates to maintain current awareness of regulatory requirements

### D. Ongoing Compliance Monitoring

- Implemented quarterly audits of all health and wellness product listings
- Established a process for rapid listing updates when regulatory guidance changes
- Assigned a dedicated compliance monitor for all health category product listings

---

## 5. Final Confirmation

Our listing for ${formattedProduct} (ASIN: ${formattedASIN}) has been fully updated to comply with all applicable regulations and Amazon's health product policies. We are committed to full regulatory compliance and respectfully request reinstatement.

**Sincerely,**
[Your Name]
[Your Business Name]
Date: ${date}`,

    return: `HIGH RETURN RATE — PLAN OF ACTION

**ASIN:** ${formattedASIN}
**Product:** ${formattedProduct}
**Marketplace:** Amazon ${marketplace}
**Date:** ${date}

---

**Dear Amazon Seller Performance Team,**

We are writing to formally address our elevated Return Rate for ${formattedProduct} (ASIN: ${formattedASIN}) on Amazon ${marketplace}. We have conducted a comprehensive analysis of all return reasons, customer feedback, and Voice of Customer (VOC) data and have developed a detailed corrective action plan.

---

## 1. Issue Summary

${formattedDetails}

---

## 2. Return Analysis

We conducted a detailed analysis of all returns, categorizing them by return reason:

### A. Customer Expectation Mismatch (Primary Factor)

- A portion of returns indicate the product did not meet customer expectations
- Our product listing did not provide sufficient detail to set accurate pre-purchase expectations
- Customers expected features or performance characteristics that differed from actual product operation

### B. Usage & Setup Misunderstanding

- Some customers experienced issues that could have been avoided with clearer usage instructions
- The user manual and PDP did not sufficiently guide customers through proper first-use setup
- Customers unfamiliar with the product type may have had unrealistic performance expectations

### C. Isolated Quality Variances (Secondary Factor)

- A small number of returns indicated potential quality inconsistencies in isolated units
- These were not identified as a systemic defect — investigation found no recurring manufacturing issue
- Affected inventory has been reviewed and non-conforming units removed

---

## 3. Immediate Corrective Actions Taken

1. **Full Return Analysis** — Conducted a comprehensive review of all return reasons and customer feedback patterns
2. **Listing Updated** — Rewrote product listing with more detailed descriptions, accurate specifications, and clear usage guidance
3. **Image Enhancement** — Added product images including size reference, usage demonstrations, and key feature callouts
4. **Inventory Audit** — Conducted a full quality inspection of all available inventory; non-conforming units removed
5. **Customer Proactive Outreach** — Contacted recent customers to address concerns and provide usage support
6. **Customer Service Upskilling** — Updated customer service team with detailed product knowledge to better support pre and post-purchase customers

---

## 4. Preventive Measures

### A. Listing Optimization

- Added comprehensive specifications, compatibility information, and usage guidance to listing content
- Updated bullet points to clearly set accurate customer expectations
- Enhanced product images with detailed views and usage demonstrations
- Added FAQ content addressing the most common customer concerns

### B. Quality Control Enhancement

- Implemented 100% pre-shipment functional inspection for all units
- Added specific QC criteria targeting the identified return reasons
- Established batch-level tracking to enable rapid response to any emerging quality concerns

### C. Customer Education

- Created comprehensive usage guidance in the product listing
- Implemented a post-purchase follow-up email with usage tips and troubleshooting guidance
- Updated user manual and packaging inserts with clearer first-use instructions

### D. Return Rate Monitoring

- Implemented weekly monitoring of return reasons and rates
- Established an automated alert when return rate approaches threshold levels
- Created a monthly return analysis review to identify and address emerging trends early

---

## 5. Final Confirmation

We have taken immediate and comprehensive action to address the root causes of our elevated return rate. We are confident the implemented changes will result in a significant reduction in returns and improvement in customer satisfaction.

**Sincerely,**
[Your Name]
[Your Business Name]
Date: ${date}`,

    shipment: `LATE SHIPMENT RATE — PLAN OF ACTION

**Marketplace:** Amazon ${marketplace}
**Product:** ${formattedProduct}
**ASIN:** ${formattedASIN}
**Date:** ${date}

---

**Dear Amazon Seller Performance Team,**

We are writing to formally address our Late Shipment Rate on Amazon ${marketplace}. We fully acknowledge that our shipping performance fell below Amazon's required standards during the identified period and have taken immediate and comprehensive corrective action.

---

## 1. Issue Summary

${formattedDetails}

---

## 2. Root Cause Analysis

### A. Primary Root Cause — Fulfillment Process Breakdown

- Our order fulfillment process experienced operational bottlenecks during the identified period
- Specific gaps in our pick, pack, and dispatch workflow created delays that exceeded our promised ship dates
- We did not have sufficient real-time visibility into pending orders approaching their ship-by dates

### B. Carrier and Logistics Challenges

- We experienced unexpected carrier delays and pickup schedule changes during the affected period
- We did not have adequate backup carrier options in place to compensate for these delays

### C. Inventory and Capacity Issues

- Inventory replenishment delays impacted our ability to fulfill certain orders within the committed timeframe
- Our team capacity was not adequately scaled to handle order volume fluctuations during peak periods

---

## 3. Immediate Corrective Actions Taken

1. **Process Audit Completed** — Conducted an immediate end-to-end review of our fulfillment process from order receipt to shipment confirmation
2. **Same-Day Processing Implemented** — All orders received before 2:00 PM are now processed and dispatched same day
3. **Staffing Reinforced** — Added additional fulfillment team members and established shift coverage to handle all order volumes
4. **Carrier Diversification** — Established accounts with additional carrier options to ensure reliable fulfillment capacity at all times
5. **Automated Alerts Activated** — Implemented automated alerts for all orders approaching their ship-by deadline
6. **Daily Ship Review** — Established a mandatory daily review of all open orders and their dispatch status
7. **Emergency Restocking Protocol** — Implemented a rapid restock process for at-risk SKUs to prevent inventory-driven delays

---

## 4. Preventive Measures

### A. Fulfillment Process Improvements

- Documented and implemented comprehensive fulfillment SOPs with clear timeframes at each step
- Established a daily capacity review to ensure staffing matches expected order volume
- Implemented a real-time order tracking dashboard visible to all fulfillment team members
- Created a dedicated escalation process for any orders at risk of late shipment

### B. Carrier Strategy

- Established relationships with multiple carrier partners to ensure redundancy and reliability
- Implemented carrier performance monitoring with automatic switching protocols when needed
- Negotiated priority pickup times to ensure daily collections are never missed

### C. Inventory Management

- Implemented a 30-day inventory forecasting model with automatic reorder triggers
- Established safety stock levels for all top-selling SKUs
- Created an emergency restocking protocol for unexpected demand spikes

### D. Performance Monitoring

- Implemented daily monitoring of Late Shipment Rate with automated threshold alerts
- Established weekly performance review meetings with the fulfillment team
- Created escalation procedures for any orders at risk of late dispatch

---

## 5. Final Confirmation

We have implemented comprehensive improvements to our fulfillment operations. We are confident our Late Shipment Rate will return to and remain within Amazon's required standards.

**Sincerely,**
[Your Name]
[Your Business Name]
Date: ${date}`,

    feedback: `NEGATIVE FEEDBACK REMOVAL REQUEST

**Product:** ${formattedProduct}
**ASIN:** ${formattedASIN}
**Marketplace:** Amazon ${marketplace}
**Date:** ${date}

---

**Dear Amazon Seller Support Team,**

We are writing to respectfully request the removal of negative feedback received for ${formattedProduct} (ASIN: ${formattedASIN}) on Amazon ${marketplace}.

---

## 1. Feedback Details

${formattedDetails}

---

## 2. Grounds for Removal

We respectfully believe this feedback qualifies for removal based on the following grounds:

### A. Violation of Amazon's Feedback Policy

- The feedback contains content that references factors outside of our direct control as a seller
- The feedback may reference fulfillment, shipping, or logistics issues handled by Amazon (FBA)
- The feedback contains inaccurate or misleading information that does not accurately represent our product or service

### B. FBA-Related Issue (If Applicable)

- This order was fulfilled by Amazon (FBA) and any fulfillment-related concerns are outside our direct control
- Amazon's feedback guidelines confirm that feedback related to FBA fulfillment is eligible for removal
- We are not responsible for shipping delays, packaging damage, or fulfillment errors that occur within Amazon's fulfillment network

### C. Issue Fully Resolved

- We have been in direct contact with this customer and have fully resolved their concern
- A complete resolution has been offered and provided to the customer's satisfaction
- We have followed up with the customer to confirm their satisfaction with the resolution

---

## 3. Actions Taken to Resolve Customer Concern

1. **Immediate Response** — Contacted the customer within 24 hours of receiving the feedback
2. **Full Resolution Provided** — Offered and provided a complete resolution (refund/replacement) at no cost to the customer
3. **Customer Confirmation** — Followed up with the customer to confirm their satisfaction with the resolution
4. **Root Cause Investigation** — Investigated the underlying concern and taken steps to prevent recurrence

---

## 4. Preventive Measures

### A. Enhanced Customer Service

- Implemented a proactive customer follow-up system for all orders
- Established a maximum 24-hour response time for all customer inquiries
- Created a structured resolution process with clear ownership and escalation paths

### B. Quality and Fulfillment Improvements

- Reviewed and enhanced our quality control process to address the concern raised
- Implemented improved packaging and handling procedures where applicable
- Updated product documentation and instructions based on customer feedback received

### C. Feedback Monitoring

- Implemented real-time monitoring of all customer feedback
- Established a proactive outreach process to address customer concerns before they escalate

---

## 5. Final Request

We respectfully request the removal of this feedback as it does not accurately reflect our level of service and/or violates Amazon's feedback removal guidelines. We are committed to providing an exceptional customer experience and take all feedback seriously.

**Sincerely,**
[Your Name]
[Your Business Name]
Date: ${date}`,

    safety: `SAFETY VIOLATION APPEAL — PLAN OF ACTION

**ASIN:** ${formattedASIN}
**Product:** ${formattedProduct}
**Marketplace:** Amazon ${marketplace}
**Date:** ${date}

---

**Dear Amazon Product Safety Team,**

We respectfully submit this Plan of Action in response to Amazon's notification regarding safety concerns for ${formattedProduct} (ASIN: ${formattedASIN}).

Customer safety is our highest priority. Upon receiving this notification, we immediately conducted a comprehensive internal investigation in coordination with our manufacturing and compliance partners, reviewing customer feedback, Voice of Customer (VOC) data, return records, product performance logs, and PDP content.

---

## 1. Issue Summary

${formattedDetails}

---

## 2. Root Cause Analysis

### A. Isolated Customer Report Assessment

- We conducted a full review across Amazon customer reviews, Voice of Customer dashboard, internal support records, and return and warranty claims
- No additional similar safety-related incidents were identified, indicating the reported concern is isolated and not systemic
- No evidence indicates a design or manufacturing defect

### B. No Systemic Safety Issues Identified

Our investigation confirmed:

- No pattern of battery failure, overheating, or electrical hazards
- No reports of fire or smoke from current inventory
- No reports of injury or hazardous malfunction
- All other feedback relates to performance expectations, not safety

### C. Performance-Related Feedback Assessment

- A small number of customers reported performance-related concerns (not safety-related)
- Root cause identified as minor inconsistency in final QC verification on limited units
- These are performance perception issues, not safety defects

### D. PDP Communication Gap

- The Product Detail Page did not sufficiently emphasize:
  - Proper usage and safety guidelines
  - Importance of reading the user manual before use
  - Expected performance characteristics

### E. Safety-Sensitive Category Trigger

- As the product may include battery, heating, or electrical components, it falls within a safety-sensitive category
- Certain customer feedback wording may have triggered Amazon's automated safety monitoring despite the absence of systemic safety risks

---

## 3. Product Safety Design Confirmation

${formattedProduct} incorporates multiple safety protections:

- Controlled operating system with regulated performance limits
- Automatic protection mechanisms built into the product design
- Low-voltage / safe-current operation minimizing electrical risk
- Fully insulated internal components and enclosed wiring
- Battery / power components compliant with applicable safety standards

Internal verification confirms the product operates safely when used according to the user manual instructions.

---

## 4. Corrective Actions Taken

### A. PDP Content Enhancement

- Updated PDP to clearly explain product functionality, limitations, and safe usage guidelines
- Added prominent instruction to read the user manual before first use
- Improved clarity to align customer expectations with product performance and operating mechanism

### B. Inventory & Manufacturing Review

- Conducted a detailed internal quality review with the manufacturer
- Reviewed assembly processes and final quality control testing procedures
- Confirmed all units undergo functional testing prior to shipment
- No abnormalities found in current inventory

### C. Customer Safety Communication

- Verified and confirmed the correct user manual is attached and accessible on the PDP
- User manual clearly outlines: approved usage methods, warnings against improper use, and instructions to discontinue use if any concern is observed

### D. Product Inspection Testing

- Conducted random inspection testing on multiple units from current inventory
- Verified core functionality, safety mechanisms, and performance consistency
- **Result:** All tested units passed functional and quality inspection with no safety issues identified

### E. Quality Control Improvements

- Strengthened final inspection procedures with additional verification steps
- Added specific safety-focused QC checkpoints to pre-shipment inspection process

---

## 5. Preventive Measures

### A. Enhanced Quality Controls

- Reinforced incoming inspection requirements for all safety-critical components
- Added verification steps to ensure compliance with safety specifications
- Strengthened final QC checks focusing on safety mechanisms and functional integrity

### B. Supplier & Documentation Controls

- Maintained full traceability between component manufacturers, assembly factory, and final product
- Required updated compliance documentation for each production cycle

### C. Customer Education & Safe Use

- Ensured all units include clear printed safety instructions
- Maintained clear and accessible digital manuals on PDP
- Emphasized critical safety instructions throughout listing content and product inserts

### D. Ongoing Safety Monitoring

- Continuously monitoring Amazon reviews, returns, and customer feedback for any safety-related signals
- Immediately investigating and escalating any safety-related reports received

---

## 6. Supporting Documentation Submitted

- ✅ Product & Packaging Images (model number and UPC clearly visible)
- ✅ User Manual (PDF — includes safety instructions, usage guidance, and troubleshooting)
- ✅ Quality & Functional Inspection Report (minimum 5 units tested)
- ✅ Backend Content Confirmation (listing compliance confirmed)
- ✅ Applicable safety test reports and compliance certifications (available upon request)

---

## 7. Final Confirmation

Based on our comprehensive investigation:

- The reported issue is **isolated and not indicative of a systemic defect**
- No pattern of safety-related incidents has been identified across our inventory
- Product design and testing confirm compliance with applicable safety standards
- All corrective and preventive measures have been implemented

We respectfully request that Amazon review the submitted documentation and reinstate ASIN ${formattedASIN}.

**Sincerely,**
[Your Name / Brand] Compliance Team
Date: ${date}`,

    medical: `MEDICAL DEVICE MISCLASSIFICATION APPEAL

**ASINs Under Appeal:** ${formattedASIN}
**Product:** ${formattedProduct}
**Marketplace:** Amazon ${marketplace}
**Date:** ${date}

---

**Dear Amazon Regulatory Intelligence, Safety and Compliance Team,**

We are writing to formally appeal the classification of the above ASIN(s) as a medical device on Amazon ${marketplace}.

After carefully reviewing ${marketplace === 'CA' ? "Health Canada's Medical Device Regulations" : marketplace === 'UK' ? "the MHRA Medical Device Regulations" : "FDA medical device regulations"} and the product positioning of these items, we respectfully believe this ASIN has been misclassified as a medical device.

---

## 1. Issue Summary

${formattedDetails}

---

## 2. Regulatory Position

${marketplace === 'CA' ? `Under Health Canada's guidance, a medical device is defined as an instrument or product **intended to diagnose, treat, mitigate, or prevent a disease or abnormal physical condition.**

Our product is not intended for any diagnostic, therapeutic, or medical purpose and is marketed strictly as a general fitness and wellness accessory. Therefore, it does not meet the definition of a medical device under Health Canada's Medical Device Regulations.

**Reference:** https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/about-medical-devices.html` : `Under applicable regulations, a medical device is defined as a product intended to diagnose, treat, mitigate, or prevent a disease or medical condition. Our product is not intended for any diagnostic, therapeutic, or medical purpose and is marketed strictly as a general fitness and wellness accessory.`}

---

## 3. Why This Product Is NOT a Medical Device

${formattedProduct} is designed and marketed solely for general wellness, comfort, and personal care use. Specifically:

- The product is **non-invasive** and intended for **external use only**
- It is **not designed, labelled, or marketed** to diagnose, treat, cure, mitigate, or prevent any disease or medical condition
- All product content — including titles, bullet points, descriptions, backend keywords, and images — is positioned strictly for **general fitness, lifestyle, and wellness use**
- Products marketed exclusively for wellness purposes **without medical claims** do not fall under the medical device definition and therefore **do not require a Medical Device Licence or Establishment Licence**

---

## 4. Actions We Have Taken

To ensure full compliance with Amazon policies and applicable regulatory guidance, we have conducted a complete compliance review of the affected listing(s) and implemented the following actions:

1. **Content Audit Completed** — Removed any wording that could be interpreted as medical, therapeutic, or treatment-related claims from titles, bullet points, descriptions, backend keywords, and product images
2. **Listing Repositioned** — All listing content repositioned strictly as general fitness and lifestyle accessories
3. **Regulatory Alignment** — Ensured all listing content aligns with the applicable regulatory classification guidance for non-medical wellness products
4. **Documentation Compiled** — Prepared supplier declaration letters confirming the product's classification as a general wellness / fitness item, not a medical device

---

## 5. Supporting Documentation

We have attached / are prepared to provide the following documentation:

- ✅ **Supplier Declaration Letter** — Confirming product is classified as a fitness and wellness item, not a medical device
- ✅ **Product & Listing Content Review** — Demonstrating removal of all medical or therapeutic claims
- ✅ **Applicable Safety Certifications** — Confirming compliance with product safety standards in the relevant marketplace
- ✅ **Updated Listing Screenshots** — Confirming all content is now positioned for general wellness use only

The supplier declaration confirms:

- The product is classified as a **fitness and wellness item**
- It is **not considered a medical device** under applicable regulations
- It is **not required to hold a Medical Device Licence**
- It complies with applicable **safety and product standards** in the markets where it is sold

---

## 6. Our Request

Based on the product purpose, listing content, and supporting supplier documentation, we respectfully request that Amazon re-evaluate ASIN ${formattedASIN} and reinstate it as a **compliant general wellness product** on Amazon ${marketplace}.

We remain fully committed to complying with all Amazon policies and applicable regulatory requirements. If any additional information or documentation is required, we will provide it promptly.

Thank you for your time and consideration.

**Sincerely,**
[Your Name / Brand] Compliance Team
Date: ${date}`,

  }
  return templates[type] || templates.andon
}

function renderMarkdown(text: string) {
  const lines = text.split('\n')
  return lines.map((line, i) => {
    if (line.startsWith('## ')) {
      return <div key={i} style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px', fontWeight: 700, color: '#e8eaf2', marginTop: '20px', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>{line.replace('## ', '')}</div>
    }
    if (line.startsWith('### ')) {
      return <div key={i} style={{ fontSize: '13px', fontWeight: 700, color: '#5e9ef4', marginTop: '14px', marginBottom: '6px' }}>{line.replace('### ', '')}</div>
    }
    if (line.startsWith('---')) {
      return <hr key={i} style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)', margin: '14px 0' }} />
    }
    const parts = line.split(/\*\*(.*?)\*\*/)
    const rendered = parts.map((part, j) => j % 2 === 1 ? <strong key={j} style={{ color: '#e8eaf2', fontWeight: 700 }}>{part}</strong> : part)
    if (line.startsWith('- ')) {
      return <div key={i} style={{ fontSize: '13px', color: '#c5c9d8', lineHeight: 1.8, paddingLeft: '16px', marginBottom: '3px', display: 'flex', gap: '8px' }}><span style={{ color: '#5e9ef4', flexShrink: 0 }}>•</span><span>{rendered}</span></div>
    }
    if (/^\d+\.\s/.test(line)) {
      const num = line.match(/^(\d+)\./)?.[1]
      const content = line.replace(/^\d+\.\s/, '')
      const cp = content.split(/\*\*(.*?)\*\*/).map((p, j) => j % 2 === 1 ? <strong key={j} style={{ color: '#e8eaf2', fontWeight: 700 }}>{p}</strong> : p)
      return <div key={i} style={{ fontSize: '13px', color: '#c5c9d8', lineHeight: 1.8, paddingLeft: '16px', marginBottom: '4px', display: 'flex', gap: '8px' }}><span style={{ color: '#5e9ef4', flexShrink: 0, fontWeight: 700 }}>{num}.</span><span>{cp}</span></div>
    }
    if (line.startsWith('✅')) {
      return <div key={i} style={{ fontSize: '13px', color: '#4ef4b0', lineHeight: 1.8, marginBottom: '3px', fontWeight: 600 }}>{rendered}</div>
    }
    if (line === '') return <div key={i} style={{ height: '6px' }} />
    return <div key={i} style={{ fontSize: '13px', color: '#c5c9d8', lineHeight: 1.8, marginBottom: '3px' }}>{rendered}</div>
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
  const copyToClipboard = () => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  const downloadText = () => {
    const blob = new Blob([result], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `wextrion-${appealType}-${asin || 'appeal'}.txt`; a.click()
  }
  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return (
    <div style={{ minHeight: '100vh', background: '#0b0c10', display: 'flex', flexDirection: 'column' }}>

      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#13151c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '32px', maxWidth: '380px', width: '90%', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>🗑️</div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 700, color: '#e8eaf2', marginBottom: '8px' }}>Delete this appeal?</h3>
            <p style={{ color: '#7c8099', fontSize: '14px', marginBottom: '24px', lineHeight: 1.6 }}>This action cannot be undone. The appeal will be permanently removed from your history.</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ flex: 1, padding: '11px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#7c8099', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>Cancel</button>
              <button onClick={deleteAppeal} style={{ flex: 1, padding: '11px', background: 'linear-gradient(135deg, #f45e5e, #f4845e)', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: 700 }}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

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
              <button onClick={async () => { await supabase.auth.signOut(); window.location.href = '/' }} style={{ padding: '6px 14px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#7c8099', cursor: 'pointer', fontSize: '12px' }}>Logout</button>
            </>
          ) : (
            <Link href="/auth/signup" style={{ padding: '6px 14px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', color: 'white', textDecoration: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>Sign Up Free</Link>
          )}
        </div>
      </nav>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

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
                  <Link href="/auth/signup" style={{ display: 'block', padding: '8px', background: 'rgba(94,158,244,0.1)', border: '1px solid rgba(94,158,244,0.2)', borderRadius: '6px', color: '#5e9ef4', textDecoration: 'none', fontSize: '12px', fontWeight: 600 }}>Create Free Account</Link>
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
                      <button onClick={(e) => { e.stopPropagation(); setDeleteConfirm(item.id) }} style={{ background: 'rgba(244,94,94,0.08)', border: '1px solid rgba(244,94,94,0.15)', borderRadius: '4px', color: '#f45e5e', cursor: 'pointer', fontSize: '11px', padding: '3px 7px', flexShrink: 0, marginTop: '2px' }}>✕</button>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', overflow: 'auto', padding: '32px 40px' }}>
          <div style={{ paddingRight: result ? '20px' : '0', maxWidth: result ? '100%' : '900px', margin: result ? '0' : '0 auto', width: '100%' }}>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', fontWeight: 800, color: '#e8eaf2', marginBottom: '4px' }}>📋 Appeal Generator</h1>
            <p style={{ color: '#7c8099', fontSize: '14px', marginBottom: '24px' }}>Fill in the details to generate your professional appeal</p>

            <div style={{ background: 'rgba(19,21,28,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '28px' }}>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '6px' }}>Appeal Type</label>
                  <select value={appealType} onChange={e => setAppealType(e.target.value)} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#e8eaf2', fontSize: '14px', outline: 'none' }}>
                    {Object.entries(appealTypes).map(([key, value]) => (
                      <option key={key} value={key} style={{ background: '#13151c' }}>{value as string}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '6px' }}>Marketplace</label>
                  <select value={marketplace} onChange={e => setMarketplace(e.target.value)} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#e8eaf2', fontSize: '14px', outline: 'none' }}>
                    {['US','UK','CA','DE','FR','IT','ES'].map(m => <option key={m} value={m} style={{ background: '#13151c' }}>Amazon {m}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '6px' }}>Product Name</label>
                  <input value={productName} onChange={e => setProductName(e.target.value)} placeholder="e.g. LifePro Vibration Plate" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#e8eaf2', fontSize: '14px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '6px' }}>ASIN</label>
                  <input value={asin} onChange={e => setAsin(e.target.value)} placeholder="e.g. B09Y9G5QPS" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#e8eaf2', fontSize: '14px', outline: 'none' }} />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '6px' }}>Issue Details / Customer Complaints *</label>
                <textarea value={details} onChange={e => setDetails(e.target.value)}
                  placeholder="Paste the customer complaints, Amazon's email, or describe the issue in detail. Include: what customers reported, what Amazon said, any specific checkpoints they asked about. The more detail you provide, the better your appeal will be..."
                  rows={8}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#e8eaf2', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '6px' }}>Supporting Documents (Optional)</label>
                <div onClick={() => document.getElementById('fileInput')?.click()} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '2px dashed rgba(255,255,255,0.08)', borderRadius: '8px', padding: '16px', textAlign: 'center', cursor: 'pointer', color: '#7c8099', fontSize: '13px' }}>
                  📎 Attach invoices, test reports, user manuals, images, or compliance certificates
                  <div style={{ fontSize: '11px', marginTop: '4px', color: '#404357' }}>PDF, JPG, PNG, DOCX accepted</div>
                  <input id="fileInput" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.docx,.doc" style={{ display: 'none' }} onChange={e => setFiles(prev => [...prev, ...Array.from(e.target.files || [])])} />
                </div>
                {files.length > 0 && (
                  <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {files.map((file, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(94,158,244,0.08)', border: '1px solid rgba(94,158,244,0.15)', borderRadius: '6px', padding: '7px 12px' }}>
                        <span style={{ fontSize: '12px', color: '#5e9ef4' }}>📄 {file.name}</span>
                        <button onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))} style={{ background: 'transparent', border: 'none', color: '#f45e5e', cursor: 'pointer', fontSize: '13px' }}>✕</button>
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

              <button onClick={generateAppeal} disabled={!details.trim()} style={{ width: '100%', padding: '14px', background: details.trim() ? 'linear-gradient(135deg, #5e9ef4, #7c5ef4)' : 'rgba(255,255,255,0.05)', color: details.trim() ? 'white' : '#7c8099', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '15px', cursor: details.trim() ? 'pointer' : 'not-allowed' }}>
                {!user && freeUses >= FREE_LIMIT ? 'Sign Up to Continue →' : 'Generate Professional Appeal →'}
              </button>
            </div>
          </div>

          {result && (
            <div style={{ paddingLeft: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 700, color: '#e8eaf2' }}>Generated Appeal</h2>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={copyToClipboard} style={{ padding: '8px 16px', background: copied ? 'rgba(78,244,176,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${copied ? 'rgba(78,244,176,0.3)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '7px', color: copied ? '#4ef4b0' : '#7c8099', cursor: 'pointer', fontSize: '13px' }}>
                    {copied ? '✓ Copied!' : 'Copy'}
                  </button>
                  <button onClick={downloadText} style={{ padding: '8px 16px', background: 'rgba(94,158,244,0.1)', border: '1px solid rgba(94,158,244,0.2)', borderRadius: '7px', color: '#5e9ef4', cursor: 'pointer', fontSize: '13px' }}>Download</button>
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