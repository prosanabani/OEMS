const openai = require("../config/openaiConfig");

const generateMeta = async (title) => {
  const description = await openai.createCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `${title}`,
      },
    ],
    max_tokens: 100,
  });
  console.log(description.data.choices[0].message);
};

module.exports = { generateMeta };
