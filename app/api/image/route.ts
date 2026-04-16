import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    const response = await fetch(
      'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      return NextResponse.json({ error }, { status: 500 })
    }

    const imageBuffer = await response.arrayBuffer()
    const base64 = Buffer.from(imageBuffer).toString('base64')

    return NextResponse.json({ 
      image: `data:image/png;base64,${base64}` 
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}