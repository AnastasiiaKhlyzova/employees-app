import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import EmployeeEdit from './EmployeeEdit';
import employeesReducer, {
  EmployeesState,
} from '../../store/slices/employeesSlice';
import '@testing-library/jest-dom';
import { Employee } from '../../data/employees';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
  useParams: jest.fn().mockReturnValue({ id: 'new' }),
}));

describe('EmployeeEdit', () => {
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

  beforeEach(() => {
    mockedNavigate.mockReset();
    jest
      .spyOn(require('react-router-dom'), 'useParams')
      .mockReturnValue({ id: 'new' });
  });

  it('должен отображать форму для добавления нового сотрудника', () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <EmployeeEdit />
      </Provider>,
    );

    expect(screen.getByText('Добавление сотрудника')).toBeInTheDocument();
    expect(screen.getByLabelText('ФИО')).toBeInTheDocument();
    expect(screen.getByLabelText('Телефон')).toBeInTheDocument();
    expect(screen.getByLabelText('Дата рождения')).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', { name: /должность/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('В архиве')).toBeInTheDocument();
    expect(screen.getByText('Отмена')).toBeInTheDocument();
    expect(screen.getByText('Добавить')).toBeInTheDocument();
  });

  it('должен отображать форму для редактирования существующего сотрудника', () => {
    const employees = [
      {
        id: 1,
        name: 'Иван Иванов',
        phone: '+7 (999) 123-4567',
        birthday: '1990-01-15',
        role: 'driver' as 'driver',
        isArchive: false,
      },
    ];
    const store = createTestStore(employees);

    jest
      .spyOn(require('react-router-dom'), 'useParams')
      .mockReturnValue({ id: '1' });

    render(
      <Provider store={store}>
        <EmployeeEdit />
      </Provider>,
    );

    expect(screen.getByText('Редактирование сотрудника')).toBeInTheDocument();
    expect(screen.getByLabelText('ФИО')).toHaveValue('Иван Иванов');
    expect(screen.getByLabelText('Телефон')).toHaveValue('+7 (999) 123-4567');
    expect(screen.getByLabelText('Дата рождения')).toHaveValue('1990-01-15');
    expect(screen.getByRole('combobox', { name: /должность/i })).toHaveValue(
      'driver',
    );
    expect(screen.getByLabelText('В архиве')).not.toBeChecked();
    expect(screen.getByText('Отмена')).toBeInTheDocument();
    expect(screen.getByText('Сохранить')).toBeInTheDocument();
  });

  it('должен отображать ошибки валидации при отправке пустой формы', async () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <EmployeeEdit />
      </Provider>,
    );

    fireEvent.click(screen.getByText('Добавить'));

    await waitFor(() => {
      expect(
        screen.getByText('ФИО: Это поле обязательно для заполнения'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Телефон: Это поле обязательно для заполнения'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Дата рождения: Это поле обязательно для заполнения'),
      ).toBeInTheDocument();
    });
  });

  it('должен отправлять действие addEmployee при добавлении нового сотрудника', async () => {
    const store = createTestStore();
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <EmployeeEdit />
      </Provider>,
    );

    fireEvent.change(screen.getByLabelText('ФИО'), {
      target: { value: 'Петр Петров' },
    });
    fireEvent.change(screen.getByLabelText('Телефон'), {
      target: { value: '9991234567' },
    });
    fireEvent.change(screen.getByLabelText('Дата рождения'), {
      target: { value: '1995-05-20' },
    });
    fireEvent.change(screen.getByRole('combobox', { name: /должность/i }), {
      target: { value: 'cook' },
    });
    fireEvent.click(screen.getByLabelText('В архиве'));

    fireEvent.click(screen.getByText('Добавить'));

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: expect.stringContaining('employees/addEmployee'),
          payload: expect.objectContaining({
            name: 'Петр Петров',
            phone: '+7 (999) 123-4567',
            birthday: '1995-05-20',
            role: 'cook',
            isArchive: true,
          }),
        }),
      );
      expect(mockedNavigate).toHaveBeenCalledWith('/employees');
    });
  });

  it('должен отправлять действие updateEmployee при редактировании сотрудника', async () => {
    const employees = [
      {
        id: 1,
        name: 'Иван Иванов',
        phone: '+7 (999) 123-4567',
        birthday: '1990-01-15',
        role: 'driver' as 'driver',
        isArchive: false,
      },
    ];
    const store = createTestStore(employees);
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    jest
      .spyOn(require('react-router-dom'), 'useParams')
      .mockReturnValue({ id: '1' });

    render(
      <Provider store={store}>
        <EmployeeEdit />
      </Provider>,
    );

    fireEvent.change(screen.getByLabelText('ФИО'), {
      target: { value: 'Иван Иванов Обновленный' },
    });
    fireEvent.click(screen.getByLabelText('В архиве'));

    fireEvent.click(screen.getByText('Сохранить'));

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: expect.stringContaining('employees/updateEmployee'),
          payload: expect.objectContaining({
            id: 1,
            name: 'Иван Иванов Обновленный',
            isArchive: true,
          }),
        }),
      );
      expect(mockedNavigate).toHaveBeenCalledWith('/employees');
    });
  });

  it('должен форматировать телефонный номер корректно', () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <EmployeeEdit />
      </Provider>,
    );

    const phoneInput = screen.getByLabelText('Телефон');

    fireEvent.change(phoneInput, { target: { value: '9991234567' } });
    expect(phoneInput).toHaveValue('+7 (999) 123-4567');

    fireEvent.change(phoneInput, { target: { value: '8999' } });
    expect(phoneInput).toHaveValue('+7 (999)');
  });

  it('должен перенаправлять на страницу списка сотрудников при нажатии кнопки "Отмена"', () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <EmployeeEdit />
      </Provider>,
    );

    fireEvent.click(screen.getByText('Отмена'));
    expect(mockedNavigate).toHaveBeenCalledWith('/employees');
  });
});
