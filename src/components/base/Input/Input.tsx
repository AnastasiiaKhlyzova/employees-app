import React from 'react';
import Form from 'react-bootstrap/Form';

interface Props {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  isInvalid?: boolean;
  invalidFeedback?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({
  id,
  name,
  label,
  value,
  onChange,

  type = 'text',
  placeholder,
  required = false,
  isInvalid = false,
  invalidFeedback,
  onKeyDown,
}) => {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        required={required}
        isInvalid={isInvalid}
      />
      {isInvalid && invalidFeedback && (
        <Form.Control.Feedback type="invalid">
          {invalidFeedback}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default Input;
