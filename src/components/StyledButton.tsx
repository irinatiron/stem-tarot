import styled from "styled-components";

interface StyledButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "default" | "secondary";
}

const StyledButtonComponent: React.FC<StyledButtonProps> = ({
  onClick,
  children,
  variant = "default",
}) => {
  const StyledButton = styled.button`
    border: 0 solid;
    box-shadow: inset 0 0 20px ${variant === "secondary" ? "rgba(28, 28, 28, 0)" : "rgba(255, 255, 255, 0)"};
    outline: 1px solid ${variant === "secondary" ? "rgba(28, 28, 28, 0.5)" : "rgba(255, 255, 255, 0.5)"};
    outline-offset: 0px;
    text-shadow: none;
    transition: all 1.25s cubic-bezier(0.19, 1, 0.22, 1);
    color: ${variant === "secondary" ? "#1c1c1c" : "#fff"};
    background: transparent;
    cursor: pointer;
    padding: 12px 25px;
    font-size: 1.8em;
    font-family: 'Aboreto', sans-serif;
    text-transform: uppercase;
    display: inline-block;

    &:hover {
      border: 1px solid;
      box-shadow: inset 0 0 20px ${variant === "secondary" ? "rgba(28, 28, 28, 0.5)" : "rgba(255, 255, 255, 0.5)"},
                  0 0 20px ${variant === "secondary" ? "rgba(28, 28, 28, 0.2)" : "rgba(255, 255, 255, 0.2)"};
      outline-color: ${variant === "secondary" ? "rgba(28, 28, 28, 0)" : "rgba(255, 255, 255, 0)"};
      outline-offset: 15px;
      text-shadow: 1px 1px 2px var(--aLightBlue);
    }

    @media (max-width: 768px) {
    font-size: 1.2em;
    padding: 10px 20px;
    }

  `;

  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default StyledButtonComponent;
