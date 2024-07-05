import ChatApiSeparateQuestions from './ChatApiSeperateQuestions'
import OpenAI from 'openai'
import { useState } from 'react'

// remain : to make this in the backend
const ChatApi = () => {
  const [prompt, setPrompt] = useState('')
  const [ChatApiResponse, setChatApiResponse] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    const openAI = new OpenAI({
      apiKey: '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',
      dangerouslyAllowBrowser: true, // This is also the default, can be omitted
    })
    const getChatCompletion = async () => {
      const chatCompletion = await openAI.chat.completions.create({
        messages: [
          {
            content: `generate 10 formats of this question and make the choices in different order and return them to me in a json object format. format should be and array of objects each object has a question and 4 choices properties  : ${prompt}`,
            role: 'user',
          },
        ],
        model: 'gpt-3.5-turbo',
      })
      // console.log(JSON.parse(chatCompletion.choices[0].message.content));
      setChatApiResponse(JSON.parse(chatCompletion.choices[0].message.content))
    }

    getChatCompletion()
  }

  console.log(ChatApiResponse)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Enter your question"
          type="text"
        />
        <button type="submit">Submit</button>
      </form>
      {/* {ChatApiResponse && (
        <ChatApiSeparateQuestions ChatApiResponse={ChatApiResponse} />
      )} */}
    </div>
  )
}

export default ChatApi
