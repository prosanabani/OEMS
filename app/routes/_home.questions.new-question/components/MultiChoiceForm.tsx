import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Controller, useForm } from 'react-hook-form';

type FormInputs = {
  SubmitAnswer: string;
  answers: Array<{ text: string }>;
  correctAnswer: number;
  question: string;
};

const MultiChoiceForm = () => {
  const {
    control,
    formState: { errors },
    register,
  } = useForm<FormInputs>();

  // const onSubmit: SubmitHandler<FormInputs> = (data) => {
  //   console.log('Form Data:', data);
  //   // Handle form submission logic here
  // };

  return (
    <Card title="Multiple Choice Question Form">
      <div className="field">
        <label htmlFor="question">Question</label>
        <InputText
          id="question"
          pt={{
            root: {
              className: 'w-full',
            },
          }}
          {...register('question', { required: 'Question is required' })}
        />
        {errors.question && (
          <small className="p-error">{errors.question.message}</small>
        )}
      </div>

      {[0, 1, 2, 3].map((index) => (
        <div className="field" key={index}>
          <label htmlFor={`answer${index}`}>Answer {index + 1}</label>
          <InputText
            id={`answer${index}`}
            pt={{
              root: {
                className: 'w-full',
              },
            }}
            {...register(`answers.${index}`, {
              required: 'Answer is required',
            })}
          />
          {errors.answers && errors.answers?.[index] && (
            <small className="p-error">
              {errors.answers?.[index]?.message}
            </small>
          )}
        </div>
      ))}

      <div className="field">
        <label>Correct Answer</label>
        <div className="flex justify-center items-center gap-2">
          {[0, 1, 2, 3].map((index) => (
            <div key={index}>
              <Controller
                control={control}
                name="correctAnswer"
                render={({ field }) => (
                  <RadioButton
                    checked={field.value === index}
                    inputId={`correctAnswer${index}`}
                    onChange={(event) => field.onChange(event.value)}
                    value={index}
                  />
                )}
                rules={{ required: 'Correct answer is required' }}
              />
              <label
                className="hover:cursor-pointer"
                htmlFor={`correctAnswer${index}`}
              >
                Answer {index + 1}
              </label>
            </div>
          ))}
        </div>

        {errors.correctAnswer && (
          <small className="p-error">{errors.correctAnswer.message}</small>
        )}
      </div>

      <Button
        label="Submit"
        onClick={() => {
          // const answers = getValues().answers.join(',');
        }}
      />
    </Card>
  );
};

export default MultiChoiceForm;
