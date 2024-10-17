import { useStartExamStore } from '../store';

const AiMonitoring = () => {
  // useTabMonitoring();
  const cheatingAttempt = useStartExamStore((state) => state.cheatingAttempt);

  console.log(cheatingAttempt);

  return <div>{/* <TensorFlowPoseMonitoring /> */}</div>;
};

export default AiMonitoring;
