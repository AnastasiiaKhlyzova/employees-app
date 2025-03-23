import React, { ChangeEvent } from "react";
import { Form } from "react-bootstrap";

interface Props {
  id: string;
  label?: string;
  checked?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  isInvalid?: boolean;
  invalidFeedback?: string;
  className?: string;
  name?: string;
}

const Checkbox: React.FC<Props> = ({
  id,
  label,
  checked,
  onChange,
  disabled = false,
  isInvalid = false,
  invalidFeedback,
  className = "",
  name,
  ...props
}) => {
  return (
    <Form.Group className={`mb-3 ${className}`}>
      <Form.Check
        type="checkbox"
        id={id}
        label={label}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        isInvalid={isInvalid}
        feedback={invalidFeedback}
        feedbackType="invalid"
        name={name}
        {...props}
      />
    </Form.Group>
  );
};

export default Checkbox;
