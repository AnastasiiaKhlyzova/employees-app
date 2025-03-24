import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Employee } from '../../data/employees';
import { addEmployee, updateEmployee } from '../../store/slices/employeesSlice';
import Container from '../../components/base/Container/Container';
import Row from '../../components/base/Row/Row';
import Col from '../../components/base/Col/Col';
import Card from '../../components/base/Card/Card';
import Form from 'react-bootstrap/Form';
import Button from '../../components/base/Button/Button';
import Input from '../../components/base/Input/Input';
import Select from '../../components/base/Select/Select';
import Checkbox from '../../components/base/Checkbox/Checkbox';
import { validateEmployee, ValidationError } from '../../utils/validation';

const EmployeeEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const employees = useSelector((state: RootState) => state.employees.list);
  const isEditing = id !== undefined && id !== 'new';

  const [employee, setEmployee] = useState<Employee>({
    id: 0,
    name: '',
    phone: '',
    birthday: '',
    role: 'driver',
    isArchive: false,
  });

  const [errors, setErrors] = useState<ValidationError[]>([]);

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      const employeeId = parseInt(id);
      const existingEmployee = employees.find((emp) => emp.id === employeeId);
      if (existingEmployee) {
        setEmployee(existingEmployee);
      } else {
        navigate('/employees');
      }
    }
  }, [id, employees, isEditing, navigate]);

  const getFieldError = (fieldName: string): string => {
    if (!submitted) return '';
    const error = errors.find((err) => err.field === fieldName);
    return error ? error.message : '';
  };

  const hasFieldError = (fieldName: string): boolean => {
    return submitted && errors.some((err) => err.field === fieldName);
  };

  const formatPhoneNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '');

    if (!digits) return '';

    let phoneDigits = digits;
    if (phoneDigits.length > 0) {
      if (!phoneDigits.startsWith('7')) {
        if (phoneDigits.startsWith('8')) {
          phoneDigits = '7' + phoneDigits.substring(1);
        } else {
          phoneDigits = '7' + phoneDigits;
        }
      }
    }

    phoneDigits = phoneDigits.substring(0, 11);

    let formatted = '';

    if (phoneDigits.length > 0) {
      formatted += '+' + phoneDigits.substring(0, 1);
    }

    if (phoneDigits.length > 1) {
      formatted +=
        ' (' + phoneDigits.substring(1, Math.min(4, phoneDigits.length)) + ')';
    }

    if (phoneDigits.length > 4) {
      formatted +=
        ' ' + phoneDigits.substring(4, Math.min(7, phoneDigits.length));
    }

    if (phoneDigits.length > 7) {
      formatted +=
        '-' + phoneDigits.substring(7, Math.min(11, phoneDigits.length));
    }

    return formatted;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setEmployee((prev) => ({
        ...prev,
        [name]: checked,
      }));
      return;
    }

    let newValue = value;
    if (name === 'phone') {
      newValue = formatPhoneNumber(value);
    }

    setEmployee((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (submitted) {
      const { errors: newErrors } = validateEmployee({
        ...employee,
        [name]: newValue,
      });
      setErrors(newErrors);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const validationResult = validateEmployee(employee);
    setErrors(validationResult.errors);

    if (validationResult.isValid) {
      if (isEditing) {
        dispatch(updateEmployee(employee));
      } else {
        const newEmployee = {
          ...employee,
          id: Date.now(),
        };
        dispatch(addEmployee(newEmployee));
      }
      navigate('/employees');
    }
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      const input = e.currentTarget;
      const cursorPosition = input.selectionStart;

      if (cursorPosition && input.value[cursorPosition - 1]?.match(/\D/)) {
        e.preventDefault();

        const valueBeforeCursor = input.value.substring(0, cursorPosition);
        const lastDigitIndex = valueBeforeCursor
          .split('')
          .reverse()
          .findIndex((char) => /\d/.test(char));

        if (lastDigitIndex >= 0) {
          const indexToRemove = cursorPosition - 1 - lastDigitIndex;
          const newValue =
            input.value.substring(0, indexToRemove) +
            input.value.substring(indexToRemove + 1);

          setEmployee((prev) => ({
            ...prev,
            phone: formatPhoneNumber(newValue),
          }));
        }
      }
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8} className="mx-auto">
          <Card>
            <h2 className="mb-4">
              {isEditing
                ? 'Редактирование сотрудника'
                : 'Добавление сотрудника'}
            </h2>

            <Form onSubmit={handleSubmit} noValidate>
              <Input
                id="name"
                name="name"
                label="ФИО"
                value={employee.name}
                onChange={handleChange}
                required
                isInvalid={hasFieldError('name')}
                invalidFeedback={getFieldError('name')}
              />

              <Input
                id="phone"
                name="phone"
                label="Телефон"
                marginBottom="mb-0"
                type="tel"
                value={employee.phone}
                onChange={handleChange}
                placeholder="+7 (XXX) XXX-XXXX"
                required
                isInvalid={hasFieldError('phone')}
                invalidFeedback={getFieldError('phone')}
                onKeyDown={handlePhoneKeyDown}
              />
              <div className="mb-3">
                <Form.Text className="text-muted">
                  Формат: +7 (XXX) XXX-XXXX
                </Form.Text>
              </div>
              <Input
                id="birthday"
                name="birthday"
                label="Дата рождения"
                type="date"
                value={employee.birthday}
                onChange={handleChange}
                required
                isInvalid={hasFieldError('birthday')}
                invalidFeedback={getFieldError('birthday')}
              />

              <Select
                id="role"
                name="role"
                label="Должность"
                value={employee.role}
                onChange={handleChange}
                options={[
                  { value: 'driver', label: 'Водитель' },
                  { value: 'waiter', label: 'Официант' },
                  { value: 'cook', label: 'Повар' },
                ]}
                required
                isInvalid={hasFieldError('role')}
                invalidFeedback={getFieldError('role')}
              />

              <Checkbox
                id="isArchive"
                label="В архиве"
                name="isArchive"
                checked={employee.isArchive}
                onChange={handleChange}
              />

              <div className="d-flex justify-content-between mt-4">
                <Button
                  variant="secondary"
                  onClick={() => navigate('/employees')}
                >
                  Отмена
                </Button>
                <Button variant="primary" type="submit">
                  {isEditing ? 'Сохранить' : 'Добавить'}
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeEdit;
