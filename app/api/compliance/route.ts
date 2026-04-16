import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: Request) {
  try {
    const { issueType, productName, issueDetails } = await req.json()

    const systemPrompt = `You are an expert Amazon seller consultant with 10+ years experience writing Plans of Action (POA), appeals, and compliance documents. You have deep knowledge of:
- Amazon's performance policies and enforcement
- Andon Cord process and POA requirements
- Account health and suspension appeals
- Listing compliance and reinstatement
- FDA, MHRA, Health Canada regulations for health products
- Multi-marketplace rules (US, UK, CA)

When writing POAs and appeals:
1. Always use professional, formal Amazon-appropriate language
2. Include detailed Root Cause Analysis
3. Include specific Immediate Corrective Actions taken
4. Include detailed Preventive Measures for the future
5. Be specific, detailed and thorough - never generic
6. Format with clear sections and headers
7. Include evidence and supporting details
8. Show Amazon you understand their policies
9. Be factual and solution-focused
10. Write as if the seller's account depends on it`

    const userPrompt = `Generate a complete, detailed, professional ${getDocumentType(issueType)} for the following situation:

Product: ${productName}

Issue Details: ${issueDetails}

Please write a full, detailed document that is ready to submit to Amazon. Include all necessary sections, be thorough and specific, and make it as strong as possible to maximize the chance of a successful appeal.`

    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4096,
      messages: [{ role: 'user', content: userPrompt }],
      system: systemPrompt
    })

    const result = message.content[0].type === 'text' ? message.content[0].text : ''

    return NextResponse.json({ result })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

function getDocumentType(issueType: string): string {
  const types: { [key: string]: string } = {
    andon: 'Andon Cord Plan of Action (POA)',
    suspension: 'Account Suspension Appeal',
    listing: 'Listing Reinstatement Appeal',
    compliance: 'Compliance Appeal Document',
    return: 'High Return Rate Plan of Action'
  }
  return types[issueType] || 'Plan of Action'
}