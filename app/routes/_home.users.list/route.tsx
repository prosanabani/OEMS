import productData from './productdata';
import { useUserListStore } from './store';
import { filterData } from './utils/functions';
import { actionBodyTemplate, SearchBodyTemplate } from './utils/generators';
import { t } from '@lingui/macro';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

export function Component() {
  const SearchInput = useUserListStore((state) => state.SearchInput);
  const [value, setValue] = useState<string>('');
  const displayedData = filterData(productData, SearchInput);
  return (
    <div className="card">
      <DataTable
        header={SearchBodyTemplate}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25]}
        stripedRows
        value={displayedData}
      >
        <Column field="code" header={t`Code`} sortable />
        <Column field="name" header="Name" sortable />
        <Column field="category" header="Category" sortable />
        <Column field="quantity" header="Quantity" sortable />
        <Column field="price" header="Student" sortable />
        <Column body={actionBodyTemplate} header="Actions" />
      </DataTable>
    </div>
  );
}
