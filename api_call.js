// Import the required modules
const OpenAI = require('openai');
require('dotenv').config();

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to generate text using the OpenAI API
async function generateText(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100,
      temperature: 0.7,
    });

    const result = response.choices[0].message.content.trim();

    // console.log(response.choices[0].message.content.trim());
    return result;
  } catch (error) {
    return 'Error generating text:', error.response ? error.response.data : error.message
    // console.error('Error generating text:', error.response ? error.response.data : error.message);
  }
}

exports.generateText = generateText

