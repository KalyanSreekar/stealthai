import React, { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { darkMode } from "../store/slices/dataSlice";

const Modal = ({ open, closeModal, handleSaveSession }) => {
  const [stars, setStars] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState(false);
  const darkmode = useSelector(darkMode);
  if (!open) return null;
  return (
    <div>
      <div
        className={`fixed left-1/2 top-1/2 z-20 flex min-h-12 w-1/2 translate-x-[-50%] translate-y-[-50%] flex-col items-center rounded-xl ${
          darkmode ? "bg-slate-50" : "bg-slate-400"
        }`}
      >
        <p
          className={`text-center text-lg font-bold ${
            darkmode ? "text-slate-600" : "text-slate-950"
          }`}
        >
          Submit Feedback
        </p>
        <textarea
          value={feedback}
          className={`my-4 w-10/12 p-2 ${
            darkmode
              ? "bg-slate-100 text-slate-800"
              : "bg-slate-800 text-slate-100"
          } `}
          onChange={(e) => {
            setFeedback(e.target.value);
            if (error) setError(false);
          }}
          rows={4}
        />
        <div className="my-2 flex">
          {new Array(5).fill(0).map((e, i) => {
            return i < stars ? (
              <FaStar
                key={i}
                onClick={() => {
                  setStars(i + 1);
                  if (error) setError(false);
                }}
                className="m-1 cursor-pointer text-xl text-slate-800"
              />
            ) : (
              <FaRegStar
                key={i}
                onClick={() => {
                  setStars(i + 1);
                  if (error) setError(false);
                }}
                className="m-1 cursor-pointer text-xl text-slate-800"
              />
            );
          })}
        </div>
        {error && (
          <span className="text-red-600">
            *please submit the feedback before continuing
          </span>
        )}
        <div className="my-4 flex">
          <button
            className={`mr-5 rounded-full ${
              darkmode ? "bg-slate-400" : "bg-slate-600"
            } px-4 py-1`}
            onClick={() => {
              if (feedback && stars > 0) {
                handleSaveSession(stars, feedback);
                closeModal();
              } else setError(true);
            }}
          >
            Submit
          </button>
          <button
            className={`rounded-full ${
              darkmode ? "bg-slate-400" : "bg-slate-600"
            } px-4 py-1`}
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
