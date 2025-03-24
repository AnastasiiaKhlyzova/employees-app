import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { RoleFilter } from './RoleFilter';
import employeesReducer, {
  EmployeesState,
  setFilter,
} from '../../store/slices/employeesSlice';
import '@testing-library/jest-dom';

describe('RoleFilter', () => {
  const createTestStore = (initialRole: string | null = null) => {
    const preloadedState: { employees: EmployeesState } = {
      employees: {
        list: [],
        filteredList: [],
        filter: {
          isArchive: false,
          role: initialRole,
        },
        sort: {
          field: 'name',
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

  it('должен отображать выбор "Все" по умолчанию', () => {
    const store = createTestStore(null);

    render(
      <Provider store={store}>
        <RoleFilter />
      </Provider>,
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('all');
  });

  it('должен отображать выбранную роль, когда фильтр активен', () => {
    const store = createTestStore('driver');

    render(
      <Provider store={store}>
        <RoleFilter />
      </Provider>,
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('driver');
  });

  it('должен отправлять действие setFilter при изменении выбора роли', () => {
    const store = createTestStore(null);
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <RoleFilter />
      </Provider>,
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'cook' } });

    expect(dispatchSpy).toHaveBeenCalledWith(setFilter({ role: 'cook' }));
  });

  it('должен содержать все необходимые опции выбора', () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <RoleFilter />
      </Provider>,
    );

    expect(screen.getByText('Все')).toBeInTheDocument();
    expect(screen.getByText('Водитель')).toBeInTheDocument();
    expect(screen.getByText('Официант')).toBeInTheDocument();
    expect(screen.getByText('Повар')).toBeInTheDocument();
  });
});
