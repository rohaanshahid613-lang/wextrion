import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    
    const conversationHistory = messages.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }))

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: conversationHistory,
        generationConfig: {
          maxOutputTokens: 2048,
          temperature: 0.7
        }
      })
    })
    
    const data = await response.json()
    
    if (data.error) {
      return NextResponse.json({ reply: `Error: ${data.error.message}` })
    }
    
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response'
    return NextResponse.json({ reply })
    
  } catch (error: any) {
    return NextResponse.json({ reply: `Error: ${error.message}` })
  }
}