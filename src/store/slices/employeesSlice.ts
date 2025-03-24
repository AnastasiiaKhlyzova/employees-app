import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from '../../data/employees';
import { employees as initialEmployees } from '../../data/employees';
import {
  loadEmployeesFromStorage,
  saveEmployeesToStorage,
} from './localStorage';

const savedEmployees = loadEmployeesFromStorage();
const employeesList = savedEmployees || initialEmployees;

export interface EmployeesState {
  list: Employee[];
  filteredList: Employee[];
  filter: {
    role: string | null;
    isArchive: boolean;
  };
  sort: {
    field: 'name' | 'birthday';
    direction: 'asc' | 'desc';
  };
}

const initialState: EmployeesState = {
  list: employeesList,
  filteredList: employeesList,
  filter: {
    role: null,
    isArchive: false,
  },
  sort: {
    field: 'name',
    direction: 'asc',
  },
};

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{
        role?: string | null;
        isArchive?: boolean;
      }>,
    ) => {
      state.filter = { ...state.filter, ...action.payload };
      state.filteredList = applyFilters(state.list, state.filter);
    },

    setSort: (
      state,
      action: PayloadAction<{
        field?: 'name' | 'birthday';
        direction?: 'asc' | 'desc';
      }>,
    ) => {
      state.sort = { ...state.sort, ...action.payload };
      state.filteredList = applySorting(state.filteredList, state.sort);
    },
    addEmployee: (state, action: PayloadAction<Omit<Employee, 'id'>>) => {
      const newId = Math.max(...state.list.map((emp) => emp.id)) + 1;
      const newEmployee = { ...action.payload, id: newId };
      state.list.push(newEmployee);
      state.filteredList = applyFilters(state.list, state.filter);
      state.filteredList = applySorting(state.filteredList, state.sort);

      saveEmployeesToStorage(state.list);
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.list.findIndex((emp) => emp.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
      state.filteredList = applyFilters(state.list, state.filter);
      state.filteredList = applySorting(state.filteredList, state.sort);

      saveEmployeesToStorage(state.list);
    },
  },
});

const applyFilters = (
  employees: Employee[],
  filter: EmployeesState['filter'],
) => {
  return employees.filter((emp) => {
    const roleMatch = !filter.role || emp.role === filter.role;

    const archiveMatch =
      !filter.isArchive || emp.isArchive === filter.isArchive;

    return roleMatch && archiveMatch;
  });
};

const applySorting = (employees: Employee[], sort: EmployeesState['sort']) => {
  return [...employees].sort((a, b) => {
    if (sort.field === 'name') {
      return sort.direction === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      const dateA = new Date(a.birthday.split('.').reverse().join('-'));
      const dateB = new Date(b.birthday.split('.').reverse().join('-'));
      return sort.direction === 'asc'
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    }
  });
};

export const { setFilter, setSort, addEmployee, updateEmployee } =
  employeesSlice.actions;

export default employeesSlice.reducer;
