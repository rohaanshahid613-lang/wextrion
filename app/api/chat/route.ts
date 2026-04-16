import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const lastMessage = messages[messages.length - 1].content

    const response = await fetch(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: `<s>[INST] ${lastMessage} [/INST]`,
          parameters: {
            max_new_tokens: 1024,
            temperature: 0.7,
            return_full_text: false
          }
        }),
      }
    )

    const data = await response.json()
    
    const reply = Array.isArray(data) 
      ? data[0]?.generated_text || 'No response'
      : data?.error || 'No response'

    return NextResponse.json({ reply })
  } catch (error: any) {
    return NextResponse.json({ reply: `Error: ${error.message}` })
  }
}