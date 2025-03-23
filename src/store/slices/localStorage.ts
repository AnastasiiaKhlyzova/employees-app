import { Employee } from '../../data/employees';

const EMPLOYEES_STORAGE_KEY = 'employees_data';

export const loadEmployeesFromStorage = (): Employee[] | null => {
  try {
    const serializedData = localStorage.getItem(EMPLOYEES_STORAGE_KEY);
    if (serializedData === null) {
      return null;
    }
    return JSON.parse(serializedData);
  } catch (err) {
    console.error('Ошибка загрузки данных из localStorage:', err);
    return null;
  }
};

export const saveEmployeesToStorage = (employees: Employee[]): void => {
  try {
    const serializedData = JSON.stringify(employees);
    localStorage.setItem(EMPLOYEES_STORAGE_KEY, serializedData);
  } catch (err) {
    console.error('Ошибка сохранения данных в localStorage:', err);
  }
};
