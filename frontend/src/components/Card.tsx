import React from "react";
import styled from "styled-components";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};
const StyledCard = styled.div`
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }
  &:active {
    transform: scale(0.98);
  }
`;

export const Card = ({ children, className = "", onClick }: CardProps) => {
  return (
    <StyledCard
      className={`card shadow-sm mb-3 ${className}`}
      onClick={onClick}
    >
      <div className="card-body">{children}</div>
    </StyledCard>
  );
};
