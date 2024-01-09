import React from "react";
import { useSelector } from "react-redux";
import { darkMode } from "../store/slices/dataSlice";

const useDarkMode = () => {
  const isDarkMode = useSelector(darkMode);
  const darkModeColor = isDarkMode ? "text-slate-200" : "text-slate-700";
  const darkModeBackground = isDarkMode ? "bg-slate-700" : "bg-slate-200";
  return [darkModeColor, darkModeBackground];
};

export default useDarkMode;
