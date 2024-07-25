function ChatApiSeparateQuestions({ ChatApiResponse: any }) {
  // console.log(JSON.parse(ChatApiResponse));

  // function separateQuestions(string) {
  //   const questionsArray = string.split(/\d+\.\s/).filter(Boolean);

  //   const formattedQuestions = questionsArray.map((questionString) => {
  //     const [question, ...choicesArray] = questionString
  //       .split("\n")
  //       .filter(Boolean);
  //     const [choice1, choice2, choice3, choice4] = choicesArray.map(
  //       (choiceString) => choiceString.trim().replace(/[A-Z]\)\s/, "")
  //     );

  //     return {
  //       question: question.trim(),
  //       choice1,
  //       choice2,
  //       choice3,
  //       choice4,
  //       choice5: "", // If you want to have a choice5 property, you can assign an empty string or null here
  //     };
  //   });

  //   return formattedQuestions;
  // }

  // calling the ChatApiResponse SeparateQuestions function
  // const formattedQuestions = separateQuestions(ChatApiResponse.content);

  // console.log(formattedQuestions);
  // console.log(ChatApiResponse);
  return (
    <div>
      {ChatApiResponse?.questions?.map((question, index) => (
        <div key={index}>
          <h1>
            {index + 1}. {question.question}
          </h1>
          <p>A-{question.choices[0]}</p>
          <p>B-{question.choices[1]}</p>
          <p>C-{question.choices[2]}</p>
          <p>D-{question.choices[3]}</p>
        </div>
      ))}
    </div>
  );
}

export default ChatApiSeparateQuestions;
