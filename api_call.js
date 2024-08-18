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
      messages: [
        { role: 'system', content: "You are an expert data scientist" } ,
        { role: 'system', content: prompt},
        { role: 'user', content:  `Without any comment, return the result in the following JSON format 
    {{column: look every single column very carefully and from these steps select one or more (try to select more steps if possible ) also if imputing tell the strategy [dropna,impute:mean/median/most_frequent,encoding_categorical_data,drop_duplicates,drop_column,outlier_removing]}}` } 

      ],
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

