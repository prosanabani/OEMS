import { OpenAI } from 'openai';

export const fetchChatCompletion = async (prompt: string) => {
  const openAI = new OpenAI({
    apiKey: 'sk-proj-Ku1BGeUWGTrGxIruQaynT3BlbkFJ1wF4CGFWs8CXfSdph5fW',
    dangerouslyAllowBrowser: true, // This is also the default, can be omitted
  });
  return await openAI.chat.completions.create({
    messages: [
      {
        content: `generate 10 formats of this question and make the choices in different order and return them to me in a json object format. format should be and array of objects each object has a question and 4 choices properties  : ${prompt}`,
        role: 'user',
      },
    ],
    model: 'gpt-3.5-turbo',
  });
};
