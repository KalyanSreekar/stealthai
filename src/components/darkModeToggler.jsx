import React from "react";
import useDarkMode from "../hooks/useDarkMode";
import { MdDarkMode } from "react-icons/md";
import { PiSunDimFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, darkMode } from "../store/slices/dataSlice";

const darkModeToggler = () => {
  const dispatch = useDispatch();
  const darkmode = useSelector(darkMode);
  const [textColor, background] = useDarkMode();
  return (
    <div
      onClick={() => dispatch(toggleDarkMode())}
      className={`absolute bottom-0 right-0 mb-12 flex h-10 w-10 cursor-pointer items-center justify-center rounded-es-full rounded-ss-full ${
        darkmode ? "bg-slate-50" : "bg-slate-500"
      }`}
    >
      {darkmode ? (
        <PiSunDimFill className="text-2xl" />
      ) : (
        <MdDarkMode className="text-2xl" />
      )}
    </div>
  );
};

export default darkModeToggler;
