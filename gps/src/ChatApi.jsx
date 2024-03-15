import React, { useEffect, useState } from "react";
import axios from "axios";
import OpenAI from "openai";
import ChatApiSeperateQuestions from "./ChatApiSeperateQuestions";

//remain : to make this in the backend
const ChatApi = () => {
  // const [prompt, setPrompt] = useState("");
  // const [response, setResponse] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:8080/chat", { prompt })
  //     .then((res) => {
  //       setResponse(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  let [ChatApiResponse, setChatApiResponse] = useState({});
  // let [ChatApiResponse, setChatApiResponse] = useState({
  //   role: "assistant",
  //   content:
  //     "1. For each secondary index, which of the following is generated as an index entry?\n   A) Pointer\n   B) Record\n   C) Unique Value\n   D) Block\n\n2. In a secondary index, which option below is created as an index entry?\n   A) Block\n   B) Pointer\n   C) Record\n   D) Unique Value\n\n3. What is generated as an index entry for each secondary index?\n   A) Unique Value\n   B) Block\n   C) Record\n   D) Pointer\n\n4. In a secondary index, which of the following options represents an index entry?\n   A) Record\n   B) Unique Value\n   C) Pointer\n   D) Block\n\n5. Which of the following choices represents an index entry in a secondary index?\n   A) Pointer\n   B) Block\n   C) Unique Value\n   D) Record\n\n6. Which option below is generated as an index entry in a secondary index?\n   A) Record\n   B) Pointer\n   C) Block\n   D) Unique Value\n\n7. What type of index entry is generated for each secondary index?\n   A) Block\n   B) Record\n   C) Pointer\n   D) Unique Value\n\n8. In a secondary index, what is created as an index entry?\n   A) Block\n   B) Pointer\n   C) Unique Value\n   D) Record\n\n9. For each secondary index, which of the following choices is generated as an index entry?\n   A) Unique Value\n   B) Record\n   C) Block\n   D) Pointer\n\n10. Which option below serves as an index entry in a secondary index?\n    A) Record\n    B) Unique Value\n    C) Pointer\n    D) Block",
  // });

  // //////////////////////// OpenAI api request and response

  useEffect(() => {
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
            content:
              "generate 10 formats of this question and make the choices in different order and return them to me in a json object format. format should be and array of objects each object has a question and 4 choices properties  : In a secondary index, an index entry is generated for each A) Pointer B) Record C) Block D) Unique Value.",
          },
        ],
      });
      console.log(chatCompletion.choices[0].message);
      setChatApiResponse(chatCompletion.choices[0].message);
      // console.log(ChatApiResponse);
    };
    getChatCompletion();
  }, []);
  // console.log("response is :", ChatApiResponse);
  return (
    <div>
      {/* {ChatApiResponse.content && (
        <ChatApiSeperateQuestions ChatApiResponse={ChatApiResponse} />
      )} */}
      {JSON.stringify(ChatApiResponse.content)}
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your question"
          // value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
};

export default ChatApi;
