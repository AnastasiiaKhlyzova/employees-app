import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore, Store } from '@reduxjs/toolkit';
import employeesReducer, {
  EmployeesState,
} from '../../store/slices/employeesSlice';

import { Employee } from '../../data/employees';
import '@testing-library/jest-dom';
import EmployeesList from './EmployeeList';

jest.mock('./ArchiveFilter', () => ({
  MemoizedArchiveFilter: () => (
    <div data-testid="archive-filter">Archive Filter</div>
  ),
}));
jest.mock('./RoleFilter', () => ({
  MemoizedRoleFilter: () => <div data-testid="role-filter">Role Filter</div>,
}));
jest.mock('./SortFieldFilter', () => ({
  MemoizedSortFieldFilter: () => (
    <div data-testid="sort-field-filter">Sort Field Filter</div>
  ),
}));
jest.mock('./SortDirectionFilter', () => ({
  MemoizedSortDirectionFilter: () => (
    <div data-testid="sort-direction-filter">Sort Direction Filter</div>
  ),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

interface RootState {
  employees: EmployeesState;
}

describe('EmployeesList', () => {
  const createTestStore = (employees: Employee[] = []) => {
    const preloadedState: { employees: EmployeesState } = {
      employees: {
        list: employees,
        filteredList: employees,
        filter: {
          isArchive: false,
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

  const renderWithProviders = (store: Store<RootState>) => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <EmployeesList />
        </BrowserRouter>
      </Provider>,
    );
  };

  const sampleEmployees: Employee[] = [
    {
      id: 1,
      name: 'Иван Иванов',
      phone: '+7 (999) 123-45-67',
      birthday: '1990-01-01',
      role: 'driver',
      isArchive: false,
    },
    {
      id: 2,
      name: 'Мария Петрова',
      phone: '+7 (999) 987-65-43',
      birthday: '1985-05-15',
      role: 'waiter',
      isArchive: true,
    },
    {
      id: 3,
      name: 'Алексей Сидоров',
      phone: '+7 (999) 555-55-55',
      birthday: '1992-12-31',
      role: 'cook',
      isArchive: false,
    },
  ];

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('должен отображать все компоненты фильтрации', () => {
    const store = createTestStore();
    renderWithProviders(store);

    expect(screen.getByTestId('archive-filter')).toBeInTheDocument();
    expect(screen.getByTestId('role-filter')).toBeInTheDocument();
    expect(screen.getByTestId('sort-field-filter')).toBeInTheDocument();
    expect(screen.getByTestId('sort-direction-filter')).toBeInTheDocument();
  });

  it('должен отображать кнопку добавления сотрудника', () => {
    const store = createTestStore();
    renderWithProviders(store);

    const addButton = screen.getByText('Добавить сотрудника');
    expect(addButton).toBeInTheDocument();
  });

  it('должен перенаправлять на страницу создания сотрудника при нажатии на кнопку добавления', () => {
    const store = createTestStore();
    renderWithProviders(store);

    const addButton = screen.getByText('Добавить сотрудника');
    fireEvent.click(addButton);

    expect(mockNavigate).toHaveBeenCalledWith('/employees/new');
  });

  it('должен отображать сообщение, когда список сотрудников пуст', () => {
    const store = createTestStore([]);
    renderWithProviders(store);

    expect(
      screen.getByText('Нет сотрудников для отображения'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Измените параметры фильтрации или добавьте новых сотрудников',
      ),
    ).toBeInTheDocument();
  });

  it('должен отображать карточки сотрудников, когда список не пуст', () => {
    const store = createTestStore(sampleEmployees);
    renderWithProviders(store);

    expect(screen.getByText('Иван Иванов')).toBeInTheDocument();
    expect(screen.getByText('Мария Петрова')).toBeInTheDocument();
    expect(screen.getByText('Алексей Сидоров')).toBeInTheDocument();
  });

  it('должен корректно отображать информацию о сотруднике в карточке', () => {
    const store = createTestStore([sampleEmployees[0]]);
    renderWithProviders(store);

    expect(screen.getByText('Иван Иванов')).toBeInTheDocument();
    expect(screen.getByText(/\+7 \(999\) 123-45-67/)).toBeInTheDocument();
    expect(screen.getByText(/1990-01-01/)).toBeInTheDocument();
    expect(screen.getByText('Водитель')).toBeInTheDocument();
    expect(screen.getByText('Активен')).toBeInTheDocument();
  });

  it('должен корректно отображать статус сотрудника (в архиве)', () => {
    const store = createTestStore([sampleEmployees[1]]);
    renderWithProviders(store);

    expect(screen.getByText('В архиве')).toBeInTheDocument();
  });

  it('должен корректно отображать должности сотрудников', () => {
    const store = createTestStore(sampleEmployees);
    renderWithProviders(store);

    expect(screen.getByText('Водитель')).toBeInTheDocument();
    expect(screen.getByText('Официант')).toBeInTheDocument();
    expect(screen.getByText('Повар')).toBeInTheDocument();
  });

  it('должен перенаправлять на страницу редактирования при нажатии кнопки "Редактировать"', () => {
    const store = createTestStore(sampleEmployees);
    renderWithProviders(store);

    const editButtons = screen.getAllByText('Редактировать');
    fireEvent.click(editButtons[0]);

    expect(mockNavigate).toHaveBeenCalledWith('/employees/1');
  });
});
