import CoursesDropDown from './Content.CoursesDropDown';
import ExamDescription from './Content.ExamDescription';
import ExamMarkSliders from './Content.ExamMarkSliders';
import ExamName from './Content.ExamName';
import ExamTitle from './Content.ExamTitle';

const Content = () => {
  return (
    <div className="w-50vh m-auto flex flex-col gap-7 mt-5">
      {/* Exam Name Input */}
      <ExamName />
      {/* Course Dropdown */}
      <CoursesDropDown />
      {/* Exam Title Input */}
      <ExamTitle />
      {/* Exam Description Input */}
      <ExamDescription />
      <div className="flex gap-5 justify-center ">
        <ExamMarkSliders />
      </div>
    </div>
  );
};

export default Content;
