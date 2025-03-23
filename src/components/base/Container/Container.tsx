import React from "react";
import { Container as BootstrapContainer } from "react-bootstrap";

interface Props {
  fluid?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<Props> = ({
  fluid = false,
  children,
  className = "",
  ...props
}) => {
  return (
    <BootstrapContainer fluid={fluid} className={className} {...props}>
      {children}
    </BootstrapContainer>
  );
};

export default Container;
