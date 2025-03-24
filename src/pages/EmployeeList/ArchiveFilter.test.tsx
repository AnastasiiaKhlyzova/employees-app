import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ArchiveFilter } from './ArchiveFilter';
import employeesReducer, {
  EmployeesState,
  setFilter,
} from '../../store/slices/employeesSlice';
import '@testing-library/jest-dom';

describe('ArchiveFilter', () => {
  const createTestStore = (initialIsArchive = false) => {
    const preloadedState: { employees: EmployeesState } = {
      employees: {
        list: [],
        filteredList: [],
        filter: {
          isArchive: initialIsArchive,
          role: null,
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

  it('должен отображать неотмеченный чекбокс по умолчанию', () => {
    const store = createTestStore(false);

    render(
      <Provider store={store}>
        <ArchiveFilter />
      </Provider>,
    );

    const checkbox = screen.getByLabelText('В архиве');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('должен отображать отмеченный чекбокс, когда фильтр активен', () => {
    const store = createTestStore(true);

    render(
      <Provider store={store}>
        <ArchiveFilter />
      </Provider>,
    );

    const checkbox = screen.getByLabelText('В архиве');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  it('должен отправлять действие setFilter при клике на чекбокс', () => {
    const store = createTestStore(false);
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <ArchiveFilter />
      </Provider>,
    );

    const checkbox = screen.getByLabelText('В архиве');
    fireEvent.click(checkbox);

    expect(dispatchSpy).toHaveBeenCalledWith(setFilter({ isArchive: true }));
  });

  it('должен переключать состояние фильтра при многократных кликах на чекбокс', () => {
    const store = createTestStore(false);
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <ArchiveFilter />
      </Provider>,
    );

    const checkbox = screen.getByLabelText('В архиве');

    fireEvent.click(checkbox);
    expect(dispatchSpy).toHaveBeenCalledWith(setFilter({ isArchive: true }));

    store.dispatch(setFilter({ isArchive: true }));

    fireEvent.click(checkbox);
    expect(dispatchSpy).toHaveBeenCalledWith(setFilter({ isArchive: false }));
  });

  it('должен отображать метку "Статус" над чекбоксом', () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <ArchiveFilter />
      </Provider>,
    );

    const label = screen.getByText('Статус');
    expect(label).toBeInTheDocument();
  });
});
