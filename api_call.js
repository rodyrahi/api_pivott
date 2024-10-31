// Import the required modules
const { response } = require('express');
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
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: "You are an expert data analyst , provide output in valid json" } ,
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

async function generateReport(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: "You are an expert data scientist , provide output in valid json" } ,
        { role: 'system', content: prompt ? prompt : "" },
        { role: 'user', content:  `Without any comment, return the result in json , the json in which write what kinda graph to make and what are the varibales to add in the graps and what are the columns to use` }
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
exports.generateReport = generateReport

