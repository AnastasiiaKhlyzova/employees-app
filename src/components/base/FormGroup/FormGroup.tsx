import React from "react";
import { Form } from "react-bootstrap";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const FormGroup: React.FC<Props> = ({ children, className = "", ...props }) => {
  return (
    <Form.Group className={className} {...props}>
      {children}
    </Form.Group>
  );
};

export default FormGroup;
