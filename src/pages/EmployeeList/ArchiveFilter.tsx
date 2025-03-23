import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '../../components/base/Checkbox/Checkbox';
import { setFilter } from '../../store/slices/employeesSlice';
import { RootState } from '../../store';
import { memo } from 'react';
import Label from '../../components/base/Label/Label';

export const ArchiveFilter = () => {
  const dispatch = useDispatch();
  const isChecked = useSelector(
    (state: RootState) => state.employees.filter.isArchive,
  );

  const handleArchiveFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(
      setFilter({
        isArchive: e.target.checked,
      }),
    );
  };

  return (
    <>
      <Label>Статус</Label>
      <div className="mt-2">
        <Checkbox
          id="archive-filter"
          checked={isChecked}
          onChange={handleArchiveFilterChange}
          label="В архиве"
        />
      </div>
    </>
  );
};

export const MemoizedArchiveFilter = memo(ArchiveFilter);
