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

function generatePOA(type: string, productName: string, asin: string, details: string, marketplace: string): string {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const templates: any = {
    andon: `Dear Amazon Seller Performance Team,

We are writing to formally address the Andon Cord notification received for our product "${productName}" (ASIN: ${asin}) on the Amazon ${marketplace} marketplace. We take all safety concerns with the utmost seriousness and have conducted a thorough investigation.

ISSUE SUMMARY:
${details}

ROOT CAUSE ANALYSIS:
1. We acknowledge the concern raised regarding our product and have taken immediate steps to investigate.
2. Our quality control processes were reviewed and we identified gaps that contributed to this issue.
3. We have traced the specific batch/lot numbers associated with any reported concerns.

IMMEDIATE CORRECTIVE ACTIONS TAKEN:
1. We have immediately placed a hold on all inventory of ASIN ${asin} pending investigation.
2. We have contacted our manufacturer to review production processes and quality standards.
3. We have reviewed all customer feedback and returns related to this product.
4. We have conducted a full audit of our product compliance documentation.
5. We have engaged a third-party safety testing laboratory to conduct independent testing.

PREVENTIVE MEASURES:
1. Enhanced Quality Control: Stricter quality control process including 100% inspection before shipment.
2. Supplier Audit: Comprehensive audit of our supplier and manufacturing facility.
3. Updated Testing Protocols: All products undergo additional safety testing before listing.
4. Customer Communication: Proactively reached out to all customers who purchased this product.
5. Documentation Review: Reviewed and updated all product safety documentation.
6. Training: Team received additional training on Amazon's safety standards and policies.

SUPPORTING EVIDENCE ATTACHED:
- Product safety test reports from accredited laboratory
- Updated compliance certificates
- Supplier audit report
- Quality control checklists

We sincerely apologize for any inconvenience and are fully committed to the highest safety standards. We respectfully request reinstatement of our listing.

Sincerely,
[Your Name]
[Your Business Name]
Date: ${date}`,

    suspension: `Dear Amazon Seller Performance Team,

We are writing in response to the suspension notice received for our selling account. We fully understand the gravity of this situation and have conducted an immediate and thorough investigation.

ACCOUNT DETAILS:
Product: ${productName}
ASIN: ${asin}
Marketplace: Amazon ${marketplace}

ISSUE DETAILS:
${details}

ROOT CAUSE ANALYSIS:
1. We acknowledge that our performance metrics fell below Amazon's required standards.
2. We identified specific operational weaknesses that contributed to this decline.
3. We traced the timeline and identified exact points where our processes failed.

IMMEDIATE CORRECTIVE ACTIONS:
1. Full audit of all active listings to ensure complete policy compliance.
2. Reviewed and updated our order management processes.
3. Implemented real-time monitoring of all performance metrics.
4. Retrained customer service team on Amazon's policies and best practices.
5. Resolved all pending orders and outstanding customer issues.
6. Implemented daily review process for account health metrics.

PREVENTIVE MEASURES:
1. Performance Monitoring: Daily review of ODR, LSR, and VTR metrics.
2. Process Improvement: New Standard Operating Procedures for all operations.
3. Customer Service: 24-hour response time commitment for all inquiries.
4. Inventory Management: New forecasting system to prevent stockouts.
5. Quality Assurance: Enhanced product quality checks before shipment.
6. Staff Training: Quarterly training sessions on Amazon policies.

We respectfully request the reinstatement of our selling privileges.

Sincerely,
[Your Name]
[Your Business Name]
Date: ${date}`,

    listing: `Dear Amazon Catalog Team,

We are writing to request the reinstatement of "${productName}" (ASIN: ${asin}) on Amazon ${marketplace}.

ISSUE DETAILS:
${details}

ROOT CAUSE ANALYSIS:
1. We reviewed Amazon's listing policies and identified specific areas of non-compliance.
2. We understand the exact nature of the violation and have corrected it immediately.

CORRECTIVE ACTIONS TAKEN:
1. Completely reviewed and updated product listing for full compliance.
2. All product images reviewed and updated to meet Amazon's requirements.
3. Title, bullet points, and description rewritten to comply with guidelines.
4. Removed any prohibited claims or content from listing.
5. Verified all product information is accurate and truthful.

PREVENTIVE MEASURES:
1. Pre-listing Review: All new listings undergo thorough compliance review.
2. Policy Training: Listing team completed updated training on content policies.
3. Regular Audits: Monthly review of all active listings.

We respectfully request the reinstatement of ASIN ${asin}.

Sincerely,
[Your Name]
[Your Business Name]
Date: ${date}`,

    ip: `Dear Amazon Seller Performance Team,

We are writing in response to the IP complaint for "${productName}" (ASIN: ${asin}) on Amazon ${marketplace}.

COMPLAINT DETAILS:
${details}

EVIDENCE OF AUTHENTICITY:
1. We are an authorized reseller/manufacturer of this product.
2. We have all necessary authorization from the rights holder.
3. Products are genuine and sourced from authorized distributors.
4. We have invoices and authorization letters from our supplier.

CORRECTIVE ACTIONS:
1. Reviewed supply chain and sourcing documentation thoroughly.
2. Gathered all relevant invoices and authorization documentation.
3. Reviewed all other listings for potential IP issues.
4. Contacted the complainant to resolve the matter directly.

PREVENTIVE MEASURES:
1. Enhanced due diligence process for all new suppliers.
2. Complete records of all brand authorizations maintained.
3. Quarterly review of all listings for potential IP issues.

We respectfully request reinstatement of our listing.

Sincerely,
[Your Name]
[Your Business Name]
Date: ${date}`,

    fda: `Dear Amazon Regulatory Compliance Team,

We are writing in response to the regulatory compliance notice for "${productName}" (ASIN: ${asin}) on Amazon ${marketplace}.

ISSUE DETAILS:
${details}

IMMEDIATE CORRECTIVE ACTIONS:
1. Updated product listing to remove all non-compliant health claims.
2. Reviewed all marketing materials associated with this product.
3. Consulted with a regulatory compliance specialist.
4. Updated product description, bullet points, and backend keywords.
5. Reviewed product packaging to ensure compliance.

CHANGES MADE:
1. Removed all disease treatment or prevention claims.
2. Removed non-permitted structure/function claims.
3. Updated imagery to remove non-compliant text.
4. Added appropriate disclaimers where required.

PREVENTIVE MEASURES:
1. All listings reviewed by compliance specialist before going live.
2. Quarterly review of all health and wellness product listings.
3. Marketing team trained on FDA regulations and Amazon's health claims policies.

We are committed to full regulatory compliance and respectfully request reinstatement.

Sincerely,
[Your Name]
[Your Business Name]
Date: ${date}`,

    return: `Dear Amazon Seller Performance Team,

We are writing to address our High Return Rate for "${productName}" (ASIN: ${asin}) on Amazon ${marketplace}.

ISSUE DETAILS:
${details}

ROOT CAUSE ANALYSIS:
1. Product Description: Some customers had expectations that didn't match the product.
2. Product Quality: A small number of units had quality issues now addressed.
3. Packaging: A few items arrived damaged due to inadequate packaging.

CORRECTIVE ACTIONS:
1. Reviewed all return reasons and customer feedback in detail.
2. Updated product listing to be more accurate and detailed.
3. Improved quality control processes.
4. Enhanced packaging to prevent damage during shipping.
5. Added detailed size charts and compatibility information.

PREVENTIVE MEASURES:
1. Monthly analysis of all return reasons to identify trends.
2. Regular review of listings to ensure accuracy.
3. 100% inspection of products before shipment.
4. Updated packaging standards to prevent damage.

We are confident these measures will significantly reduce our return rate.

Sincerely,
[Your Name]
[Your Business Name]
Date: ${date}`,

    shipment: `Dear Amazon Seller Performance Team,

We are writing to address our Late Shipment Rate for "${productName}" (ASIN: ${asin}) on Amazon ${marketplace}.

ISSUE DETAILS:
${details}

ROOT CAUSE ANALYSIS:
1. We experienced unexpected fulfillment challenges impacting shipping performance.
2. We identified specific operational bottlenecks in our order processing workflow.

CORRECTIVE ACTIONS:
1. Implemented same-day order processing for all orders received before 2 PM.
2. Added additional fulfillment staff during peak hours.
3. Set up automated alerts for orders approaching ship-by deadline.
4. Updated carrier pickup schedule to ensure daily collection.
5. Implemented backup carrier option for urgent shipments.

PREVENTIVE MEASURES:
1. Daily monitoring of all pending orders and ship-by dates.
2. Automated alerts when orders are at risk of being late.
3. Weekly review of shipping performance metrics.
4. Contingency plans for high-volume periods.

We are committed to maintaining shipping performance above Amazon's standards.

Sincerely,
[Your Name]
[Your Business Name]
Date: ${date}`,

    feedback: `Dear Amazon Seller Support Team,

We are writing to request removal of negative feedback for "${productName}" (ASIN: ${asin}) on Amazon ${marketplace}.

FEEDBACK DETAILS:
${details}

GROUNDS FOR REMOVAL:
1. The feedback contains content violating Amazon's feedback policies.
2. The issue was related to Amazon's fulfillment service (FBA), not our product.
3. The customer's concern has been fully resolved to their satisfaction.

ACTIONS TAKEN:
1. Immediately contacted the customer upon receiving the feedback.
2. Offered full refund or replacement at no cost to the customer.
3. Customer has confirmed satisfaction with our resolution.

PREVENTIVE MEASURES:
1. Enhanced quality control to prevent similar issues.
2. Improved customer communication processes.
3. Faster response times to customer concerns.

We respectfully request removal of this feedback as it violates Amazon's feedback guidelines.

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
  const [files, setFiles] = useState<File[]>([])
  const [history, setHistory] = useState<any[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [freeUses, setFreeUses] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('wextrion_free_uses') || '0')
    }
    return 0
  })
  const FREE_LIMIT = 3

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user)
        loadHistory(session.user.id)
      }
    })
  }, [])

  const loadHistory = async (userId: string) => {
    const { data } = await supabase
      .from('appeals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (data) setHistory(data)
  }

  const saveToHistory = async (type: string, product: string, content: string) => {
    if (!user) return
    const { data } = await supabase
      .from('appeals')
      .insert({
        user_id: user.id,
        appeal_type: appealTypes[type],
        product_name: product || 'Unknown Product',
        content: content,
        created_at: new Date().toISOString()
      })
      .select()
      .single()
    if (data) {
      setHistory(prev => [data, ...prev])
      setActiveId(data.id)
    }
  }

  const generateAppeal = () => {
    if (!details.trim()) return
    if (!user && freeUses >= FREE_LIMIT) {
      window.location.href = '/auth/signup'
      return
    }
    const poa = generatePOA(appealType, productName || 'Your Product', asin || 'B00XXXXXXX', details, marketplace)
    setResult(poa)
    if (user) {
      saveToHistory(appealType, productName, poa)
    } else {
      const newCount = freeUses + 1
      setFreeUses(newCount)
      if (typeof window !== 'undefined') {
        localStorage.setItem('wextrion_free_uses', newCount.toString())
      }
    }
  }

  const loadAppeal = (item: any) => {
    setResult(item.content)
    setActiveId(item.id)
  }

  const startNew = () => {
    setResult('')
    setDetails('')
    setProductName('')
    setAsin('')
    setActiveId(null)
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

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0b0c10', display: 'flex', flexDirection: 'column' }}>

      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ background: 'transparent', border: 'none', color: '#7c8099', cursor: 'pointer', fontSize: '18px', padding: '4px' }}>☰</button>
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
              <button onClick={startNew}
                style={{ width: '100%', padding: '10px', background: 'linear-gradient(135deg, #5e9ef4, #7c5ef4)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
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
                    <div key={item.id}
                      onClick={() => loadAppeal(item)}
                      style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', marginBottom: '4px', background: activeId === item.id ? 'rgba(94,158,244,0.1)' : 'transparent', border: activeId === item.id ? '1px solid rgba(94,158,244,0.2)' : '1px solid transparent', transition: 'all 0.15s' }}
                      onMouseEnter={e => { if (activeId !== item.id) e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                      onMouseLeave={e => { if (activeId !== item.id) e.currentTarget.style.background = 'transparent' }}>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: activeId === item.id ? '#5e9ef4' : '#e8eaf2', marginBottom: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.product_name}
                      </div>
                      <div style={{ fontSize: '11px', color: '#7c8099', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.appeal_type}
                      </div>
                      <div style={{ fontSize: '10px', color: '#404357', marginTop: '2px' }}>
                        {formatDate(item.created_at)}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', overflow: 'auto', padding: '32px 40px' }}>

          {/* FORM */}
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

          {/* RESULT */}
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
                <pre style={{ color: '#c5c9d8', fontSize: '13px', lineHeight: 1.8, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{result}</pre>
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