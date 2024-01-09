import React, { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const Modal = ({ open, closeModal, handleSaveSession }) => {
  const [stars, setStars] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState(false);
  if (!open) return null;
  return (
    <div>
      <div className="fixed left-1/2 top-1/2 z-20 flex min-h-12 w-1/2 translate-x-[-50%] translate-y-[-50%] flex-col items-center rounded-xl bg-slate-100">
        <p className="text-center text-lg font-bold text-slate-600">
          Submit Feedback
        </p>
        <textarea
          value={feedback}
          className="my-4 w-10/12 p-2 text-slate-800"
          onChange={(e) => {
            setFeedback(e.target.value);
            if (error) setError(false);
          }}
          rows={4}
        />
        <div className="my-2 flex">
          {new Array(5).fill(0).map((e, i) => {
            console.log(i, stars, i < stars);
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
            className="mr-5 rounded-full bg-slate-600 px-4 py-1"
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
            className="rounded-full bg-slate-600 px-4 py-1"
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
