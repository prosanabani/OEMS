import CoursesDropDown from './ExamInformation.CoursesDropDown';
import ExamDescription from './ExamInformation.ExamDescription';
import ExamMarkSliders from './ExamInformation.ExamMarkSliders';
import ExamName from './ExamInformation.ExamName';
import ExamTitle from './ExamInformation.ExamTitle';

const ExamInformation = () => {
  return (
    <div className="flex flex-wrap gap-6 justify-between items-center">
      {/* Exam Name Input */}
      <ExamName />
      {/* Course Dropdown */}
      <CoursesDropDown />
      {/* Exam Title Input */}
      <ExamTitle />
      {/* Exam Description Input */}
      <ExamDescription />
      <div className="flex flex-col gap-2">
        <ExamMarkSliders />
      </div>
    </div>
  );
};

export default ExamInformation;
