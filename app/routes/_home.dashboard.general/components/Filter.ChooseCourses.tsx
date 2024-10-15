import { useAllCoursesLists } from '../services/query';
import { setSelectedCourses, useDashboardAnalyticsStore } from '../store';
import DoughnutChartDemo from './Basicchart';
import ChooseCoursesChart from './ChooseCoursesChart';
import { Trans } from '@lingui/macro';
import { Card } from 'primereact/card';
import { FloatLabel } from 'primereact/floatlabel';
import { MultiSelect } from 'primereact/multiselect';

function ChooseCourses() {
  const selectedCourses = useDashboardAnalyticsStore(
    (state) => state.selectedCourses
  );

  const { data, isLoading } = useAllCoursesLists();

  return (
    <div className="card p-5">
      <div className="flex flex-row justify-content-between gap-5">
        <Card className="rounded-2xl w-63.5vw h-50vm" title="Analytics">
          <div className="flex flex-row justify-content-between">
            <FloatLabel className="ml-auto bottom-17">
              <MultiSelect
                display="chip"
                loading={isLoading}
                onChange={(event) => {
                  if (event.value.length <= 4) {
                    setSelectedCourses(event.value);
                  } else {
                    showToast({
                      detail: 'You can only select up to 4 courses.',
                      severity: 'info',
                      summary: 'Info',
                    });
                  }
                }}
                optionLabel="label"
                options={data}
                placeholder="Select up to 4 courses"
                pt={{
                  header: {
                    className: 'hidden',
                  },
                  item: {
                    className:
                      'hover:bg-blue-200 flex flex-row justify-content-between',
                  },
                  root: {
                    className: 'w-20vw',
                  },
                }}
                showSelectAll={false}
                value={selectedCourses}
              />
              <label htmlFor="choose-courses">
                <Trans>Courses</Trans>
              </label>
            </FloatLabel>
          </div>
          <ChooseCoursesChart />
        </Card>
        <DoughnutChartDemo />
      </div>
    </div>
  );
}

export default ChooseCourses;
