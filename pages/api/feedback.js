export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { description } = req.body;
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Du är en professionell e-sportcoach som ger taktisk feedback på spelarens klipp.'
        },
        {
          role: 'user',
          content: `Här är beskrivningen av klippet: "${description}". Ge konkret feedback som hjälper spelaren att bli bättre.`
        }
      ]
    })
  });

  const result = await openaiRes.json();
  const aiReply = result.choices?.[0]?.message?.content || 'Ingen feedback tillgänglig just nu.';

  res.status(200).json({ feedback: aiReply });
}
