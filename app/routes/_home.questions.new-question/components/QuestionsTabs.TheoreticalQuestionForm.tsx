import { type TFormQuestions } from './Form';
import { t, Trans } from '@lingui/macro';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { useFormContext } from 'react-hook-form';
// AIzaSyAMDkXz6GiMI7KdhVm3T6i9Xc0i0mDwCEg

const TheoreticalQuestionForm = () => {
  // const navigate = useNavigate();
  const {
    formState: { errors },
    register,
    reset,
    setValue,
  } = useFormContext<TFormQuestions>();

  useEffect(() => {
    reset();
    setValue('questionType', 'theoretical');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const [Response, setResponse] = useState('');

  // const { data, error, isLoading } = useNewQuestionData(Response);

  // useEffect(() => {
  //   if (error) {
  //     showToast({
  //       detail: t`Something went wrong. Please try again later.`,
  //       severity: 'error',
  //     });
  //   }

  //   if (data) {
  //     navigate('/questions/pick-question', { state: data });
  //   }
  // }, [data, error, navigate]);

  return (
    <div className="flex flex-col gap-5">
      <FloatLabel>
        <InputText
          autoFocus
          className={errors.question ? 'p-invalid' : ''}
          id="question"
          pt={{
            root: {
              className: 'w-full',
            },
          }}
          {...register('question', { required: t`Question is required` })}
        />
        <label htmlFor="question">
          <Trans>Question</Trans>
        </label>
      </FloatLabel>

      {errors.question && (
        <small className="p-error">{errors.question.message}</small>
      )}

      {/* <Button
              label="Submit"
              onClick={handleSubmit((FromData) =>
                setResponse(
                  `make me 5 questions about ${FromData.question} and return them in array of {question , id } format.`
                )
              )}
            /> */}
    </div>
  );
};

export default TheoreticalQuestionForm;
