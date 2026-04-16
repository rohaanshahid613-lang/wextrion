import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const lastMessage = messages[messages.length - 1].content
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: lastMessage }] }]
      })
    })
    
    const data = await response.json()
    console.log('Gemini response:', JSON.stringify(data))
    
    if (data.error) {
      return NextResponse.json({ reply: `Error: ${data.error.message}` })
    }
    
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response'
    return NextResponse.json({ reply })
    
  } catch (error: any) {
    console.log('Catch error:', error.message)
    return NextResponse.json({ reply: `Error: ${error.message}` })
  }
}