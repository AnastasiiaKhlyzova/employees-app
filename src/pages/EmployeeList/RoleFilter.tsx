import { useDispatch, useSelector } from 'react-redux';
import { memo } from 'react';
import { RootState } from '../../store';
import { setFilter } from '../../store/slices/employeesSlice';
import FormGroup from '../../components/base/FormGroup/FormGroup';
import Label from '../../components/base/Label/Label';
import Select from '../../components/base/Select/Select';

export const RoleFilter = () => {
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.employees.filter.role);

  const handleRoleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const role = e.target.value === 'all' ? null : e.target.value;
    dispatch(
      setFilter({
        role,
      }),
    );
  };

  return (
    <FormGroup>
      <Label>Должность</Label>
      <Select
        value={role || 'all'}
        onChange={handleRoleFilterChange}
        options={[
          { value: 'all', label: 'Все' },
          { value: 'driver', label: 'Водитель' },
          { value: 'waiter', label: 'Официант' },
          { value: 'cook', label: 'Повар' },
        ]}
        id={'role-filter'}
      />
    </FormGroup>
  );
};

export const MemoizedRoleFilter = memo(RoleFilter);
