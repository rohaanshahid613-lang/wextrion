'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

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

function generatePOA(type: string, productName: string, asin: string, details: string, marketplace: string): string {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  
  const templates: any = {
    andon: `Dear Amazon Seller Performance Team,

We are writing to formally address the Andon Cord notification received for our product "${productName}" (ASIN: ${asin}) on the Amazon ${marketplace} marketplace. We take all safety concerns with the utmost seriousness and have conducted a thorough investigation.

ISSUE SUMMARY:
${details}

ROOT CAUSE ANALYSIS:
After conducting a comprehensive internal investigation, we have identified the following root causes:

1. We acknowledge the concern raised regarding our product and have taken immediate steps to investigate the matter thoroughly.
2. Our quality control processes were reviewed and we identified gaps that may have contributed to this issue.
3. We have traced the specific batch/lot numbers associated with any reported concerns.

IMMEDIATE CORRECTIVE ACTIONS TAKEN:
1. We have immediately placed a hold on all inventory of ASIN ${asin} pending investigation.
2. We have contacted our manufacturer to review production processes and quality standards.
3. We have reviewed all customer feedback and returns related to this product.
4. We have conducted a full audit of our product compliance documentation.
5. We have engaged a third-party safety testing laboratory to conduct independent testing.

PREVENTIVE MEASURES:
1. Enhanced Quality Control: We have implemented a stricter quality control process including 100% inspection of all units before shipment.
2. Supplier Audit: We have conducted a comprehensive audit of our supplier and manufacturing facility.
3. Updated Testing Protocols: All products will now undergo additional safety testing before being listed on Amazon.
4. Customer Communication: We have proactively reached out to all customers who purchased this product.
5. Documentation Review: We have reviewed and updated all product safety documentation and compliance certificates.
6. Training: Our team has received additional training on Amazon's safety standards and policies.

EVIDENCE OF COMPLIANCE:
- Product safety test reports from accredited laboratory
- Updated product documentation and compliance certificates
- Supplier audit report
- Quality control checklists
- Customer communication records

We sincerely apologize for any inconvenience caused and are fully committed to maintaining the highest safety standards. We respectfully request the reinstatement of our listing and assure Amazon and our customers that we have taken all necessary steps to prevent any recurrence.

We remain committed to providing safe, high-quality products and maintaining full compliance with all Amazon policies and applicable regulations.

Sincerely,
[Your Name]
[Your Business Name]
Date: ${date}`,

    suspension: `Dear Amazon Seller Performance Team,

We are writing in response to the suspension notice received for our selling account. We fully understand the gravity of this situation and have conducted an immediate and thorough investigation into the root causes.

ACCOUNT DETAILS:
Product: ${productName}
ASIN: ${asin}
Marketplace: Amazon ${marketplace}

ISSUE DETAILS:
${details}

ROOT CAUSE ANALYSIS:
After careful review, we have identified the following root causes that led to this situation:

1. We acknowledge that our performance metrics fell below Amazon's required standards.
2. Upon investigation, we identified specific operational weaknesses that contributed to this decline.
3. We have traced the timeline of events and identified the exact points where our processes failed.

IMMEDIATE CORRECTIVE ACTIONS:
1. We have conducted a full audit of all active listings to ensure complete policy compliance.
2. We have reviewed and updated our order management processes.
3. We have implemented real-time monitoring of all performance metrics.
4. We have retrained our customer service team on Amazon's policies and best practices.
5. We have reviewed all pending orders and resolved any outstanding customer issues.
6. We have implemented a daily review process for account health metrics.

PREVENTIVE MEASURES FOR THE FUTURE:
1. Performance Monitoring: Daily review of all key performance indicators including ODR, LSR, and VTR.
2. Process Improvement: Implementation of new Standard Operating Procedures for all fulfillment operations.
3. Customer Service Enhancement: 24-hour response time commitment for all customer inquiries.
4. Inventory Management: New inventory forecasting system to prevent stockouts and fulfillment issues.
5. Quality Assurance: Enhanced product quality checks before shipment.
6. Policy Compliance: Regular internal audits to ensure ongoing compliance with all Amazon policies.
7. Staff Training: Quarterly training sessions on Amazon policies and performance standards.

SUPPORTING DOCUMENTATION:
- Updated Standard Operating Procedures
- Performance improvement plan
- Customer service training records
- Quality control documentation
- Inventory management procedures

We are fully committed to meeting and exceeding Amazon's performance standards. We have already implemented the above changes and are seeing positive results. We respectfully request the reinstatement of our selling privileges and commit to maintaining full compliance going forward.

We value our partnership with Amazon and our customers, and we are dedicated to providing an exceptional buying experience.

Sincerely,
[Your Name]
[Your Business Name]
Date: ${date}`,

    listing: `Dear Amazon Catalog Team,

We are writing to request the reinstatement of our product listing for "${productName}" (ASIN: ${asin}) on Amazon ${marketplace}. We have thoroughly reviewed the reasons for the listing removal and have taken comprehensive corrective actions.

LISTING DETAILS:
Product Name: ${productName}
ASIN: ${asin}
Marketplace: Amazon ${marketplace}

ISSUE DETAILS:
${details}

ROOT CAUSE ANALYSIS:
1. We have carefully reviewed Amazon's listing policies and identified the specific areas where our listing did not fully comply.
2. We understand the exact nature of the violation and have taken immediate steps to correct it.
3. We have reviewed our listing creation process to identify how this non-compliance occurred.

CORRECTIVE ACTIONS TAKEN:
1. We have completely reviewed and updated our product listing to ensure full compliance with Amazon's policies.
2. All product images have been reviewed and updated to meet Amazon's image requirements.
3. Product title, bullet points, and description have been rewritten to comply with Amazon's content guidelines.
4. We have removed any prohibited claims or content from our listing.
5. We have verified that all product information is accurate and truthful.
6. We have obtained all necessary compliance documentation for our product.

LISTING IMPROVEMENTS MADE:
1. Title: Updated to comply with Amazon's title requirements
2. Images: All images now meet Amazon's technical and content requirements
3. Bullet Points: Revised to remove any non-compliant claims
4. Description: Updated to ensure accuracy and policy compliance
5. Keywords: Reviewed and updated backend keywords
6. Compliance Documentation: All required certificates and documentation obtained

PREVENTIVE MEASURES:
1. Pre-listing Review: All new listings will undergo thorough compliance review before going live.
2. Policy Training: Our listing team has completed updated training on Amazon's content policies.
3. Regular Audits: Monthly review of all active listings to ensure ongoing compliance.
4. Documentation Management: Improved system for managing product compliance documentation.

We are confident that our listing now fully complies with all Amazon policies and guidelines. We respectfully request the reinstatement of ASIN ${asin} and commit to maintaining full compliance going forward.

Sincerely,
[Your Name]
[Your Business Name]
Date: ${date}`,

    ip: `Dear Amazon Seller Performance Team,

We are writing in response to the intellectual property complaint received regarding our product "${productName}" (ASIN: ${asin}) on Amazon ${marketplace}. We take IP compliance extremely seriously and have conducted a thorough investigation.

COMPLAINT DETAILS:
${details}

ROOT CAUSE ANALYSIS:
1. We have carefully reviewed the IP complaint and investigated our supply chain thoroughly.
2. We have verified the authenticity of our products and sourcing documentation.
3. We have reviewed our supplier relationships and authorization documentation.

EVIDENCE OF AUTHENTICITY / NON-INFRINGEMENT:
1. We are an authorized reseller/manufacturer of this product.
2. We have obtained all necessary authorization from the rights holder.
3. Our products are genuine and sourced directly from authorized distributors.
4. We have invoices and authorization letters from our supplier.

CORRECTIVE ACTIONS TAKEN:
1. We have immediately removed the listing pending investigation.
2. We have contacted our supplier to verify product authenticity.
3. We have gathered all relevant invoices and authorization documentation.
4. We have reviewed all our other listings for potential IP issues.
5. We have contacted the complainant to resolve the matter directly.

PREVENTIVE MEASURES:
1. Supplier Verification: Enhanced due diligence process for all new suppliers.
2. Authorization Documentation: Maintaining complete records of all brand authorizations.
3. Regular IP Audits: Quarterly review of all listings for potential IP issues.
4. Legal Review: All new products reviewed for potential IP concerns before listing.
5. Training: Staff trained on IP laws and Amazon's IP policies.

SUPPORTING DOCUMENTS AVAILABLE:
- Purchase invoices from authorized supplier
- Authorization letter from brand/manufacturer
- Import documents showing product authenticity
- Communication with rights holder

We respectfully request the reinstatement of our listing and are happy to provide any additional documentation required to resolve this matter.

Sincerely,
[Your Name]
[Your Business Name]
Date: ${date}`,

    fda: `Dear Amazon Regulatory Compliance Team,

We are writing in response to the regulatory compliance notice received for our product "${productName}" (ASIN: ${asin}) on Amazon ${marketplace}. We fully understand Amazon's commitment to regulatory compliance and have taken immediate corrective action.

ISSUE DETAILS:
${details}

ROOT CAUSE ANALYSIS:
1. We have reviewed our product listing and identified the specific claims or content that triggered this notice.
2. We acknowledge that certain language in our listing may have implied medical or health claims beyond what is permitted.
3. We have reviewed FDA guidelines and Amazon's restricted products policies in detail.

IMMEDIATE CORRECTIVE ACTIONS:
1. We have immediately updated our product listing to remove all non-compliant health claims.
2. We have reviewed all marketing materials associated with this product.
3. We have consulted with a regulatory compliance specialist.
4. We have updated our product description, bullet points, and backend keywords.
5. We have reviewed our product packaging to ensure compliance.

LISTING CHANGES MADE:
1. Removed all disease treatment or prevention claims
2. Removed all structure/function claims that are not permitted
3. Updated product imagery to remove non-compliant text
4. Added appropriate disclaimers where required
5. Ensured all remaining claims are truthful and substantiated

PREVENTIVE MEASURES:
1. Compliance Review Process: All listings reviewed by compliance specialist before going live.
2. Claim Substantiation: All health-related claims must be substantiated with scientific evidence.
3. Regular Audits: Quarterly review of all health and wellness product listings.
4. Training: Marketing team trained on FDA regulations and Amazon's health claims policies.
5. Legal Review: Products in health category reviewed by legal counsel before listing.

REGULATORY COMPLIANCE DOCUMENTATION:
- FDA registration/exemption documentation (if applicable)
- Third-party testing results
- Ingredient/component safety documentation
- Compliance review checklist

We are committed to full regulatory compliance and respectfully request the reinstatement of our listing.

Sincerely,
[Your Name]
[Your Business Name]
Date: ${date}`,

    return: `Dear Amazon Seller Performance Team,

We are writing to address our High Return Rate for product "${productName}" (ASIN: ${asin}) on Amazon ${marketplace} and to present our comprehensive plan to reduce returns to acceptable levels.

ISSUE DETAILS:
${details}

ROOT CAUSE ANALYSIS:
After analyzing all returns and customer feedback, we have identified the following primary causes:

1. Product Description Accuracy: Some customers had expectations that didn't match the product.
2. Product Quality: A small number of units had quality issues that we have now addressed.
3. Sizing/Compatibility: Some customers experienced fit or compatibility issues.
4. Packaging: A few items arrived damaged due to inadequate packaging.

IMMEDIATE CORRECTIVE ACTIONS:
1. We have reviewed all return reasons and customer feedback in detail.
2. We have updated our product listing to be more accurate and detailed.
3. We have improved our product quality control processes.
4. We have enhanced our packaging to prevent damage during shipping.
5. We have added detailed size charts and compatibility information.
6. We have improved our product images to better represent the actual product.

LISTING IMPROVEMENTS:
1. More accurate and detailed product description
2. Additional product images showing all angles and details
3. Detailed size guide and compatibility information
4. Updated FAQ section addressing common customer concerns
5. Video content showing product in use

QUALITY IMPROVEMENTS:
1. Enhanced pre-shipment quality inspection process
2. Updated packaging with better protection
3. Improved product instructions and documentation
4. Direct communication with manufacturer for quality improvements

PREVENTIVE MEASURES:
1. Return Analysis: Monthly analysis of all return reasons to identify trends.
2. Listing Accuracy: Regular review of listings to ensure accuracy.
3. Customer Communication: Proactive communication to set correct expectations.
4. Quality Control: 100% inspection of products before shipment.
5. Packaging Standards: Updated packaging standards to prevent damage.

We are confident these measures will significantly reduce our return rate. We respectfully request the continuation of our selling privileges.

Sincerely,
[Your Name]
[Your Business Name]
Date: ${date}`,

    shipment: `Dear Amazon Seller Performance Team,

We are writing to address our Late Shipment Rate for our account and specifically for product "${productName}" (ASIN: ${asin}) on Amazon ${marketplace}.

ISSUE DETAILS:
${details}

ROOT CAUSE ANALYSIS:
1. We experienced unexpected fulfillment challenges that impacted our shipping performance.
2. We identified specific operational bottlenecks in our order processing workflow.
3. We reviewed all late shipments and identified the common causes.

IMMEDIATE CORRECTIVE ACTIONS:
1. We have reviewed all processes from order receipt to shipment confirmation.
2. We have implemented same-day order processing for all orders received before 2 PM.
3. We have added additional fulfillment staff during peak hours.
4. We have set up automated alerts for orders approaching the ship-by deadline.
5. We have updated our carrier pickup schedule to ensure daily collection.
6. We have implemented a backup carrier option for urgent shipments.

PROCESS IMPROVEMENTS:
1. Order Management: New system to prioritize and track all orders in real-time.
2. Staffing: Additional fulfillment staff added to handle order volume.
3. Carrier Relations: Established relationship with multiple carriers for reliability.
4. Cut-off Times: Clearly defined order cut-off times to manage customer expectations.
5. Inventory: Improved inventory management to prevent stockouts causing delays.

PREVENTIVE MEASURES:
1. Daily monitoring of all pending orders and ship-by dates.
2. Automated alerts when orders are at risk of being late.
3. Weekly review of shipping performance metrics.
4. Contingency plans for high-volume periods.
5. Regular carrier performance reviews.

We are committed to maintaining our shipping performance above Amazon's standards and respectfully request the continuation of our selling privileges.

Sincerely,
[Your Name]
[Your Business Name]
Date: ${date}`,

    feedback: `Dear Amazon Seller Support Team,

We are writing to request the removal of negative feedback left for our account regarding product "${productName}" (ASIN: ${asin}) on Amazon ${marketplace}.

FEEDBACK DETAILS:
${details}

GROUNDS FOR REMOVAL:
We respectfully request this feedback be reviewed and removed for the following reasons:

1. The feedback contains content that violates Amazon's feedback policies.
2. The issue described was related to Amazon's fulfillment service (FBA), not our product or service.
3. The customer's concern has been fully resolved to their satisfaction.
4. The feedback contains false or misleading information.

ACTIONS TAKEN TO RESOLVE CUSTOMER CONCERN:
1. We immediately contacted the customer upon receiving the feedback.
2. We offered a full refund or replacement at no cost to the customer.
3. We investigated the issue thoroughly and found it to be an isolated incident.
4. We have resolved the underlying issue to prevent recurrence.
5. The customer has confirmed their satisfaction with our resolution.

EVIDENCE OF RESOLUTION:
- Customer communication history showing our prompt response
- Refund/replacement confirmation
- Customer's acknowledgment of satisfactory resolution

PREVENTIVE MEASURES:
1. Enhanced quality control to prevent similar issues.
2. Improved customer communication processes.
3. Faster response times to customer concerns.
4. Regular review of customer feedback to identify improvement opportunities.

We value all customer feedback and are committed to providing exceptional service. We respectfully request the removal of this feedback as it does not accurately reflect our level of service and violates Amazon's feedback guidelines.

Sincerely,
[Your Name]
[Your Business Name]
Date: ${date}`,
  }

  return templates[type] || templates.suspension
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

  const generateAppeal = () => {
    if (!details.trim()) return
    const poa = generatePOA(appealType, productName || 'Your Product', asin || 'B00XXXXXXX', details, marketplace)
    setResult(poa)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadText = () => {
    const blob = new Blob([result], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `wextrion-${appealType}-appeal.txt`
    a.click()
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0b0c10', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>⚡</div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: 800, color: '#e8eaf2' }}>Wextrion</span>
        </div>
        <Link href="/dashboard" style={{ fontSize: '13px', color: '#7c8099', textDecoration: 'none' }}>← Back to Dashboard</Link>
      </nav>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: '0', maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '24px 20px' }}>
        
        <div style={{ paddingRight: result ? '20px' : '0' }}>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '24px', fontWeight: 800, color: '#e8eaf2', marginBottom: '4px' }}>
            📋 Appeal Generator
          </h1>
          <p style={{ color: '#7c8099', fontSize: '14px', marginBottom: '24px' }}>Fill in the details below to generate your appeal</p>

          <div style={{ background: 'rgba(19,21,28,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '6px' }}>Appeal Type</label>
              <select value={appealType} onChange={e => setAppealType(e.target.value)}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 14px', color: '#e8eaf2', fontSize: '14px', outline: 'none' }}>
                {Object.entries(appealTypes).map(([key, value]) => (
                  <option key={key} value={key} style={{ background: '#13151c' }}>{value as string}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '6px' }}>Marketplace</label>
              <select value={marketplace} onChange={e => setMarketplace(e.target.value)}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 14px', color: '#e8eaf2', fontSize: '14px', outline: 'none' }}>
                <option value="US" style={{ background: '#13151c' }}>Amazon US</option>
                <option value="UK" style={{ background: '#13151c' }}>Amazon UK</option>
                <option value="CA" style={{ background: '#13151c' }}>Amazon CA</option>
                <option value="DE" style={{ background: '#13151c' }}>Amazon DE</option>
                <option value="FR" style={{ background: '#13151c' }}>Amazon FR</option>
                <option value="IT" style={{ background: '#13151c' }}>Amazon IT</option>
                <option value="ES" style={{ background: '#13151c' }}>Amazon ES</option>
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '6px' }}>Product Name</label>
              <input value={productName} onChange={e => setProductName(e.target.value)}
                placeholder="e.g. LifePro Vibration Plate"
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 14px', color: '#e8eaf2', fontSize: '14px', outline: 'none' }} />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '6px' }}>ASIN</label>
              <input value={asin} onChange={e => setAsin(e.target.value)}
                placeholder="e.g. B09Y9G5QPS"
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 14px', color: '#e8eaf2', fontSize: '14px', outline: 'none' }} />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#7c8099', marginBottom: '6px' }}>Issue Details *</label>
              <textarea value={details} onChange={e => setDetails(e.target.value)}
                placeholder="Describe the issue in detail. What did Amazon say? What happened? The more detail you provide, the better your appeal will be..."
                rows={6}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 14px', color: '#e8eaf2', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
            </div>

            <button onClick={generateAppeal} disabled={!details.trim()}
              style={{ width: '100%', padding: '14px', background: details.trim() ? 'linear-gradient(135deg, #5e9ef4, #7c5ef4)' : 'rgba(255,255,255,0.05)', color: details.trim() ? 'white' : '#7c8099', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '15px', cursor: details.trim() ? 'pointer' : 'not-allowed' }}>
              Generate Professional Appeal →
            </button>
          </div>
        </div>

        {result && (
          <div style={{ paddingLeft: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: 700, color: '#e8eaf2' }}>
                Generated Appeal
              </h2>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={copyToClipboard}
                  style={{ padding: '8px 16px', background: copied ? 'rgba(78,244,176,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${copied ? 'rgba(78,244,176,0.3)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '8px', color: copied ? '#4ef4b0' : '#7c8099', cursor: 'pointer', fontSize: '13px' }}>
                  {copied ? '✓ Copied!' : 'Copy'}
                </button>
                <button onClick={downloadText}
                  style={{ padding: '8px 16px', background: 'rgba(94,158,244,0.1)', border: '1px solid rgba(94,158,244,0.2)', borderRadius: '8px', color: '#5e9ef4', cursor: 'pointer', fontSize: '13px' }}>
                  Download
                </button>
              </div>
            </div>
            <div style={{ background: 'rgba(19,21,28,0.8)', border: '1px solid rgba(244,196,94,0.2)', borderRadius: '16px', padding: '24px', maxHeight: '70vh', overflowY: 'auto' }}>
              <pre style={{ color: '#c5c9d8', fontSize: '13px', lineHeight: 1.8, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{result}</pre>
            </div>
          </div>
        )}
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