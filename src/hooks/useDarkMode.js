import React from "react";
import { useSelector } from "react-redux";
import { darkMode } from "../store/slices/dataSlice";

const useDarkMode = () => {
  const isDarkMode = useSelector(darkMode);
  const shade1text = isDarkMode ? "text-slate-950" : "text-slate-300";
  const shade1bg = isDarkMode ? "bg-slate-300" : "bg-slate-950";
  const shade2text = isDarkMode ? "text-slate-500" : "text-slate-500";
  const shade2bg = isDarkMode ? "bg-slate-100" : "bg-slate-800";
  return [shade1text, shade1bg, shade2text, shade2bg];
};

export default useDarkMode;
