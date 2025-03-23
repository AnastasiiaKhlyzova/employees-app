import { useDispatch, useSelector } from 'react-redux';
import { memo } from 'react';
import { RootState } from '../../store';
import { setSort } from '../../store/slices/employeesSlice';
import FormGroup from '../../components/base/FormGroup/FormGroup';
import Label from '../../components/base/Label/Label';
import Select from '../../components/base/Select/Select';

export const SortDirectionFilter = () => {
  const dispatch = useDispatch();
  const sortDirection = useSelector(
    (state: RootState) => state.employees.sort.direction,
  );

  const handleSortDirectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch(
      setSort({
        direction: e.target.value as 'asc' | 'desc',
      }),
    );
  };

  return (
    <FormGroup>
      <Label>Направление</Label>
      <Select
        value={sortDirection}
        onChange={handleSortDirectionChange}
        options={[
          { value: 'asc', label: 'По возрастанию' },
          { value: 'desc', label: 'По убыванию' },
        ]}
        id={'sort-direction-filter'}
      />
    </FormGroup>
  );
};

export const MemoizedSortDirectionFilter = memo(SortDirectionFilter);
