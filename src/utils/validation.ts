export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export const isRequired = (
  value: string,
  fieldName: string,
): ValidationError | null => {
  if (!value || value.trim() === '') {
    return {
      field: fieldName,
      message: 'Это поле обязательно для заполнения',
    };
  }
  return null;
};

export const validateEmployee = (employee: {
  name: string;
  phone: string;
  birthday: string;
  role: string;
}): ValidationResult => {
  const errors: ValidationError[] = [];

  const requiredFields = [
    { field: 'name', value: employee.name, label: 'ФИО' },
    { field: 'phone', value: employee.phone, label: 'Телефон' },
    { field: 'birthday', value: employee.birthday, label: 'Дата рождения' },
    { field: 'role', value: employee.role, label: 'Должность' },
  ];

  requiredFields.forEach(({ field, value, label }) => {
    const error = isRequired(value, field);
    if (error) {
      error.message = `${label}: ${error.message}`;
      errors.push(error);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};
