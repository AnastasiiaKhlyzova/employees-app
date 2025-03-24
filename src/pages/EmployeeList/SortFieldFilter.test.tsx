import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { SortFieldFilter } from './SortFieldFilter';
import employeesReducer, {
  EmployeesState,
  setSort,
} from '../../store/slices/employeesSlice';
import '@testing-library/jest-dom';

describe('SortFieldFilter', () => {
  const createTestStore = (initialField: 'name' | 'birthday' = 'name') => {
    const preloadedState: { employees: EmployeesState } = {
      employees: {
        list: [],
        filteredList: [],
        filter: {
          isArchive: false,
          role: null,
        },
        sort: {
          field: initialField,
          direction: 'asc',
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

  it('должен отображать поле сортировки "Имени" по умолчанию', () => {
    const store = createTestStore('name');

    render(
      <Provider store={store}>
        <SortFieldFilter />
      </Provider>,
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('name');
  });

  it('должен отображать выбранное поле сортировки "Дате рождения"', () => {
    const store = createTestStore('birthday');

    render(
      <Provider store={store}>
        <SortFieldFilter />
      </Provider>,
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('birthday');
  });

  it('должен отправлять действие setSort при изменении поля сортировки', () => {
    const store = createTestStore('name');
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <SortFieldFilter />
      </Provider>,
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'birthday' } });

    expect(dispatchSpy).toHaveBeenCalledWith(setSort({ field: 'birthday' }));
  });

  it('должен содержать опции "Имени" и "Дате рождения"', () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <SortFieldFilter />
      </Provider>,
    );

    expect(screen.getByText('Имени')).toBeInTheDocument();
    expect(screen.getByText('Дате рождения')).toBeInTheDocument();
  });

  it('должен отображать метку "Сортировка по" над селектом', () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <SortFieldFilter />
      </Provider>,
    );

    const label = screen.getByText('Сортировка по');
    expect(label).toBeInTheDocument();
  });
});
