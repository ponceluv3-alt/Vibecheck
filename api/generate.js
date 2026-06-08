export const config = {
  maxDuration: 60
};

export default async function handler(req, res) {
  try {
    let body = '';
    await new Promise((resolve) => {
      req.on('data', chunk => body += chunk);
      req.on('end', resolve);
    });
    
    const parsed = JSON.parse(body);
    
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify(parsed)
    });
    
    const text = await response.text();
    console.log("ANTHROPIC RESPONSE:", text);
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
