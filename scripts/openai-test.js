require('dotenv').config();

async function run() {
  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY not set');
    process.exit(1);
  }
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: 'Hello from CI' }],
      max_tokens: 5
    })
  });
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
