import React from "react";
import { Form } from "react-bootstrap";

interface Props {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}

const Label: React.FC<Props> = ({
  children,
  htmlFor,
  className = "",
  ...props
}) => {
  return (
    <Form.Label htmlFor={htmlFor} className={className} {...props}>
      {children}
    </Form.Label>
  );
};

export default Label;
