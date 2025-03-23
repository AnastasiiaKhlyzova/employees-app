import React from "react";
import { Form as BootstrapForm } from "react-bootstrap";

interface Props {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
}

const Form: React.FC<Props> = ({
  children,
  onSubmit,
  className = "",
  ...props
}) => {
  return (
    <BootstrapForm onSubmit={onSubmit} className={className} {...props}>
      {children}
    </BootstrapForm>
  );
};

export default Form;
