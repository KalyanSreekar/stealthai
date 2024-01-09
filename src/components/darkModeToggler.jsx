import React from "react";
import useDarkMode from "../hooks/useDarkMode";

const darkModeToggler = () => {
  const [textColor, background] = useDarkMode();
  return <div className="h-10 w-10 "></div>;
};

export default darkModeToggler;
