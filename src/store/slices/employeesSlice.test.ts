import employeesReducer, {
  setFilter,
  setSort,
  addEmployee,
  updateEmployee,
} from './employeesSlice';
import { Employee } from '../../data/employees';
import { saveEmployeesToStorage } from './localStorage';

jest.mock('./localStorage', () => ({
  loadEmployeesFromStorage: jest.fn().mockReturnValue(null),
  saveEmployeesToStorage: jest.fn(),
}));

const mockedSaveEmployees = saveEmployeesToStorage as jest.MockedFunction<
  typeof saveEmployeesToStorage
>;

describe('employeesSlice', () => {
  const testEmployees: Employee[] = [
    {
      id: 1,
      name: 'Иван Иванов',
      phone: '+7 (123) 456-7890',
      birthday: '01.01.1990',
      role: 'driver',
      isArchive: false,
    },
    {
      id: 2,
      name: 'Мария Петрова',
      phone: '+7 (987) 654-3210',
      birthday: '15.05.1985',
      role: 'cook',
      isArchive: true,
    },
  ];

  const initialState = {
    list: testEmployees,
    filteredList: testEmployees,
    filter: {
      role: null as string | null,
      isArchive: false,
    },
    sort: {
      field: 'name' as const,
      direction: 'asc' as const,
    },
  };

  it('должен вернуть начальное состояние', () => {
    const result = employeesReducer(undefined, { type: 'unknown' });

    expect(result).toHaveProperty('list');
    expect(result).toHaveProperty('filteredList');
    expect(result).toHaveProperty('filter');
    expect(result).toHaveProperty('sort');
    expect(result.filter).toEqual({ role: null, isArchive: false });
    expect(result.sort).toEqual({ field: 'name', direction: 'asc' });
  });

  it('должен фильтровать по роли при вызове setFilter', () => {
    const action = setFilter({ role: 'driver' });
    const state = employeesReducer(initialState, action);

    expect(state.filter.role).toBe('driver');
    expect(state.filteredList).toHaveLength(1);
    expect(state.filteredList[0].name).toBe('Иван Иванов');
  });

  it('должен фильтровать по архивности при вызове setFilter', () => {
    const action = setFilter({ isArchive: true });
    const state = employeesReducer(initialState, action);

    expect(state.filter.isArchive).toBe(true);
    expect(state.filteredList).toHaveLength(1);
    expect(state.filteredList[0].name).toBe('Мария Петрова');
  });

  it('должен сортировать по имени при вызове setSort', () => {
    const action = setSort({ field: 'name', direction: 'desc' });
    const state = employeesReducer(initialState, action);

    expect(state.sort).toEqual({ field: 'name', direction: 'desc' });
    expect(state.filteredList[0].name).toBe('Мария Петрова');
    expect(state.filteredList[1].name).toBe('Иван Иванов');
  });

  it('должен сортировать по дате рождения при вызове setSort', () => {
    const action = setSort({ field: 'birthday', direction: 'asc' });
    const state = employeesReducer(initialState, action);

    expect(state.sort).toEqual({ field: 'birthday', direction: 'asc' });
    expect(state.filteredList[0].name).toBe('Мария Петрова');
    expect(state.filteredList[1].name).toBe('Иван Иванов');
  });

  it('должен добавлять нового сотрудника при вызове addEmployee', () => {
    const newEmployee: Omit<Employee, 'id'> = {
      name: 'Петр Сидоров',
      phone: '+7 (111) 222-3333',
      birthday: '10.10.1980',
      role: 'waiter',
      isArchive: false,
    };

    const action = addEmployee(newEmployee);
    const state = employeesReducer(initialState, action);

    expect(state.list).toHaveLength(3);
    expect(state.list[2].id).toBe(3);
    expect(state.list[2].name).toBe('Петр Сидоров');
  });

  it('должен обновлять существующего сотрудника при вызове updateEmployee', () => {
    const updatedEmployee: Employee = {
      id: 1,
      name: 'Иван Иванов Обновленный',
      phone: '+7 (123) 456-7890',
      birthday: '01.01.1990',
      role: 'driver',
      isArchive: true,
    };

    const action = updateEmployee(updatedEmployee);
    const state = employeesReducer(initialState, action);

    const foundEmployee = state.list.find((emp) => emp.id === 1);
    expect(foundEmployee).toBeDefined();
    expect(foundEmployee?.name).toBe('Иван Иванов Обновленный');
    expect(foundEmployee?.isArchive).toBe(true);
  });

  it('должен сохранять в localStorage при добавлении сотрудника', () => {
    mockedSaveEmployees.mockClear();

    const newEmployee: Omit<Employee, 'id'> = {
      name: 'Тестовый Сотрудник',
      phone: '+7 (999) 888-7777',
      birthday: '20.02.2000',
      role: 'cook',
      isArchive: false,
    };

    const action = addEmployee(newEmployee);
    employeesReducer(initialState, action);

    expect(mockedSaveEmployees).toHaveBeenCalled();
  });

  it('должен сохранять в localStorage при обновлении сотрудника', () => {
    mockedSaveEmployees.mockClear();

    const updatedEmployee: Employee = {
      id: 1,
      name: 'Иван Иванов',
      phone: '+7 (123) 456-7890',
      birthday: '01.01.1990',
      role: 'cook',
      isArchive: false,
    };

    const action = updateEmployee(updatedEmployee);
    employeesReducer(initialState, action);

    expect(mockedSaveEmployees).toHaveBeenCalled();
  });
});
