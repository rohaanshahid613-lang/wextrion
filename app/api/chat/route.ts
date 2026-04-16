import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const anthropic = new Anthropic({ 
  apiKey: process.env.ANTHROPIC_API_KEY 
})

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    
    const formattedMessages = messages.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content
    }))

    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: 'You are Wextrion AI, a helpful assistant. Be friendly, concise and helpful.',
      messages: formattedMessages
    })

    const reply = message.content[0].type === 'text' 
      ? message.content[0].text 
      : 'No response'

    return NextResponse.json({ reply })

  } catch (error: any) {
    return NextResponse.json({ reply: `Error: ${error.message}` })
  }
}