import { useDispatch, useSelector } from 'react-redux';
import { memo } from 'react';
import { RootState } from '../../store';
import { setSort } from '../../store/slices/employeesSlice';
import FormGroup from '../../components/base/FormGroup/FormGroup';
import Label from '../../components/base/Label/Label';
import Select from '../../components/base/Select/Select';

export const SortFieldFilter = () => {
  const dispatch = useDispatch();
  const sortField = useSelector(
    (state: RootState) => state.employees.sort.field,
  );

  const handleSortFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      setSort({
        field: e.target.value as 'name' | 'birthday',
      }),
    );
  };

  return (
    <FormGroup>
      <Label>Сортировка по</Label>
      <Select
        value={sortField}
        onChange={handleSortFieldChange}
        options={[
          { value: 'name', label: 'Имени' },
          { value: 'birthday', label: 'Дате рождения' },
        ]}
        id={'sort-field-filter'}
      />
    </FormGroup>
  );
};

export const MemoizedSortFieldFilter = memo(SortFieldFilter);
