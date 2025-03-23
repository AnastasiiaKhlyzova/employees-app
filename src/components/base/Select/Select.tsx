import React, { ChangeEvent } from "react";
import { Form } from "react-bootstrap";

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  id: string;
  label?: string;
  value?: string | number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  isValid?: boolean;
  invalidFeedback?: string;
  validFeedback?: string;
  className?: string;
  labelClassName?: string;
  name?: string;
  required?: boolean;
}

const Select: React.FC<Props> = ({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  isInvalid = false,
  isValid = false,
  invalidFeedback,
  validFeedback,
  className = "",
  labelClassName = "",
  name,
  required = false,
  ...props
}) => {
  return (
    <Form.Group className={`mb-3 ${className}`}>
      {label && (
        <Form.Label htmlFor={id} className={labelClassName}>
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </Form.Label>
      )}
      <Form.Select
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        isInvalid={isInvalid}
        isValid={isValid}
        name={name}
        required={required}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
      {isInvalid && invalidFeedback && (
        <Form.Control.Feedback type="invalid">
          {invalidFeedback}
        </Form.Control.Feedback>
      )}
      {isValid && validFeedback && (
        <Form.Control.Feedback type="valid">
          {validFeedback}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default Select;
