import React from "react";

const ChatApiSeperateQuestions = ({ ChatApiResponse }) => {
  function separateQuestions(string) {
    const questionsArray = string.split(/\d+\.\s/).filter(Boolean);

    const formattedQuestions = questionsArray.map((questionString) => {
      const [question, ...choicesArray] = questionString
        .split("\n")
        .filter(Boolean);
      const [choice1, choice2, choice3, choice4] = choicesArray.map(
        (choiceString) => choiceString.trim().replace(/[A-Z]\)\s/, "")
      );

      return {
        question: question.trim(),
        choice1,
        choice2,
        choice3,
        choice4,
        choice5: "", // If you want to have a choice5 property, you can assign an empty string or null here
      };
    });

    return formattedQuestions;
  }

  //calling the ChatApiResponse SeperateQuestions function
  const formattedQuestions = separateQuestions(ChatApiResponse.content);
  console.log(formattedQuestions);
  return (
    <div>
      {formattedQuestions.map((question, index) => (
        <div key={index}>
          <h1>{question.question}</h1>
          <p>{question.choice1}</p>
          <p>{question.choice2}</p>
          <p>{question.choice3}</p>
          <p>{question.choice4}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatApiSeperateQuestions;
