import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const lastMessage = messages[messages.length - 1].content

    const response = await fetch(
      'https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: `<|system|>You are Wextrion AI, a helpful assistant.</s><|user|>${lastMessage}</s><|assistant|>`,
          parameters: {
            max_new_tokens: 512,
            temperature: 0.7,
            return_full_text: false,
            stop: ['</s>', '<|user|>']
          }
        }),
      }
    )

    const text = await response.text()
    
    try {
      const data = JSON.parse(text)
      const reply = Array.isArray(data) 
        ? data[0]?.generated_text?.trim() || 'No response'
        : data?.error || 'No response'
      return NextResponse.json({ reply })
    } catch {
      return NextResponse.json({ reply: 'Model is loading, please try again in 30 seconds.' })
    }

  } catch (error: any) {
    return NextResponse.json({ reply: `Error: ${error.message}` })
  }
}