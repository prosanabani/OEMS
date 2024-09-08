import { useCoursesList } from '../services/query';
import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown';

export default function EnrolledCourse() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const userLevel = '2';

  const { data } = useCoursesList(userLevel);

  return (
    <div className="card flex justify-content-center">
      <Dropdown
        className="w-full md:w-14rem"
        onChange={(event: DropdownChangeEvent) => {
          setSelectedCourse(event.value);
        }}
        optionLabel="label"
        options={data}
        placeholder="Select a City"
        value={selectedCourse}
      />
    </div>
  );
}
