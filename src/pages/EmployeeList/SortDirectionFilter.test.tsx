import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { SortDirectionFilter } from './SortDirectionFilter';
import employeesReducer, {
  EmployeesState,
  setSort,
} from '../../store/slices/employeesSlice';
import '@testing-library/jest-dom';

describe('SortDirectionFilter', () => {
  const createTestStore = (initialDirection: 'asc' | 'desc' = 'asc') => {
    const preloadedState: { employees: EmployeesState } = {
      employees: {
        list: [],
        filteredList: [],
        filter: {
          isArchive: false,
          role: null,
        },
        sort: {
          field: 'name',
          direction: initialDirection,
        },
      },
    };

    return configureStore({
      reducer: {
        employees: employeesReducer,
      },
      preloadedState,
    });
  };

  it('должен отображать направление сортировки "По возрастанию" по умолчанию', () => {
    const store = createTestStore('asc');

    render(
      <Provider store={store}>
        <SortDirectionFilter />
      </Provider>,
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('asc');
  });

  it('должен отображать выбранное направление сортировки "По убыванию"', () => {
    const store = createTestStore('desc');

    render(
      <Provider store={store}>
        <SortDirectionFilter />
      </Provider>,
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('desc');
  });

  it('должен отправлять действие setSort при изменении направления сортировки', () => {
    const store = createTestStore('asc');
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <SortDirectionFilter />
      </Provider>,
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'desc' } });

    expect(dispatchSpy).toHaveBeenCalledWith(setSort({ direction: 'desc' }));
  });

  it('должен содержать опции "По возрастанию" и "По убыванию"', () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <SortDirectionFilter />
      </Provider>,
    );

    expect(screen.getByText('По возрастанию')).toBeInTheDocument();
    expect(screen.getByText('По убыванию')).toBeInTheDocument();
  });
});
