import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const lastMessage = messages[messages.length - 1].content

    const response = await fetch(
      'https://api-inference.huggingface.co/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mistralai/Mistral-7B-Instruct-v0.3',
          messages: [
            { role: 'system', content: 'You are Wextrion AI, a helpful assistant.' },
            { role: 'user', content: lastMessage }
          ],
          max_tokens: 1024,
          stream: false
        }),
      }
    )

    const data = await response.json()
    const reply = data?.choices?.[0]?.message?.content || 'No response'
    return NextResponse.json({ reply })

  } catch (error: any) {
    return NextResponse.json({ reply: `Error: ${error.message}` })
  }
}