import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateAISignal(marketData: any[]) {
  try {
    const prompt = `
You are TRADECORE AI.

Analyze the following crypto market data.

Return:
- sentiment
- strongest asset
- weakest asset
- market outlook
- confidence score
- autonomous bot actions

Market Data:
${JSON.stringify(marketData, null, 2)}

Respond in JSON format.
`

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a high-level autonomous crypto trading intelligence.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    })

    const content = response.choices[0].message.content

    return JSON.parse(content || "{}")
  } catch (err) {
    console.error(err)

    return {
      sentiment: "NEUTRAL",
      strongest: "BTC",
      weakest: "DOGE",
      outlook: "Market stable.",
      confidence: 50,
      actions: ["Awaiting data"],
    }
  }
}