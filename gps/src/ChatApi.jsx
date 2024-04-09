import React, { useState } from "react";
import OpenAI from "openai";
import ChatApiSeperateQuestions from "./ChatApiSeperateQuestions";

//remain : to make this in the backend
const ChatApi = () => {
  const [prompt, setPrompt] = useState("");
  let [ChatApiResponse, setChatApiResponse] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const openai = new OpenAI({
      apiKey: "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",
      dangerouslyAllowBrowser: true, // This is also the default, can be omitted
    });
    const getChatCompletion = async () => {
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `generate 10 formats of this question and make the choices in different order and return them to me in a json object format. format should be and array of objects each object has a question and 4 choices properties  : ${prompt}`,
          },
        ],
      });
      // console.log(JSON.parse(chatCompletion.choices[0].message.content));
      setChatApiResponse(JSON.parse(chatCompletion.choices[0].message.content));
    };
    getChatCompletion();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your question"
          // value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {ChatApiResponse && (
        <ChatApiSeperateQuestions ChatApiResponse={ChatApiResponse} />
      )}
    </div>
  );
};

export default ChatApi;
