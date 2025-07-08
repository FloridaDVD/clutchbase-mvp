import openai from '@/lib/openai';

export default async function handler(req, res) {
  const { videoUrl } = req.body;

  if (!videoUrl) return res.status(400).json({ error: 'Ingen video-URL angiven' });

  const prompt = `Du är en professionell e-sportcoach. Titta på denna highlight-video från en CS2-match: ${videoUrl}. 
Ge en konstruktiv feedback om spelarens prestation. Kommentera beslut, positionering, timing, aim, samt eventuella misstag. 
Gör det pedagogiskt men proffsigt.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });

  const feedback = response.choices[0]?.message?.content || 'Ingen feedback genererad.';
  res.status(200).json({ feedback });
}
