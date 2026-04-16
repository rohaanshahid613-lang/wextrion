import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const lastMessage = messages[messages.length - 1].content

    const response = await fetch(
      'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: lastMessage,
          wait_for_model: true
        }),
      }
    )

    const text = await response.text()
    console.log('Raw response:', text.substring(0, 300))
    
    try {
      const data = JSON.parse(text)
      const reply = data?.generated_text || 
                    data?.[0]?.generated_text ||
                    data?.conversation?.generated_responses?.[0] ||
                    JSON.stringify(data)
      return NextResponse.json({ reply })
    } catch {
      return NextResponse.json({ reply: text.substring(0, 200) })
    }

  } catch (error: any) {
    return NextResponse.json({ reply: `Error: ${error.message}` })
  }
}