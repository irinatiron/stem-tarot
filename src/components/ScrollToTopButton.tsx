import { useState, useEffect } from "react";
import styled from "styled-components";

const ScrollButton = styled.button<{ visible: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: var(--aLightYellow);
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  font-size: 24px;
  cursor: pointer;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.3s ease;
  z-index: 1000;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return <ScrollButton visible={visible} onClick={handleClick}>↑</ScrollButton>;
}
