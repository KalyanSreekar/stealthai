import React, { useState } from "react";
import useDarkMode from "../hooks/useDarkMode";
import { IoMdSend } from "react-icons/io";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchMessage,
  messages,
  likeMessage,
  dislikeMessage,
  saveSessionData,
  darkMode,
} from "../store/slices/dataSlice";
import Modal from "./Modal";
import { Link } from "react-router-dom";

const ChatBox = () => {
  const [textColor, bgColor, shadedText, shadedBg] = useDarkMode();
  const [showIcon, setShowIcon] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const darkmode = useSelector(darkMode);
  const chat = useSelector(messages);
  const [message, setMessage] = useState("");

  const handleInputSubmit = async () => {
    dispatch(
      dispatchMessage({ message, from: "user", like: false, dislike: false }),
    );
    setMessage("");
    const response = await handleAiResponse();
    dispatch(dispatchMessage(response));
  };

  const handleAiResponse = () => {
    const responses = [
      "Hello there",
      "I am Naruto Uzumaki.",
      "I love instant ramen treated by Irukka Sensei at Ichiraku ",
      "I want to become hokage and surpass all my precidators",
    ];
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          message: responses[Math.floor(Math.random() * responses.length)],
          from: "bot",
          like: false,
          dislike: false,
        });
      }, 1000);
    });
  };

  const handleSaveSession = (stars, feedback) => {
    dispatch(saveSessionData({ chat: chat, stars, feedback }));
  };

  return (
    <div className={`flex h-screen w-screen flex-col items-center ${bgColor}`}>
      <div className="flex w-screen justify-between p-4">
        <p className={`text-2xl font-bold ${textColor}`}>Stealth AI</p>
        <Link to={"/conversations"}>
          <p className={`cursor-pointer text-lg ${textColor}`}>Conversations</p>
        </Link>
      </div>
      <div
        className={`flex h-5/6 w-10/12 flex-col rounded-md ${shadedBg} ${textColor}`}
      >
        <div
          id="chatDiv"
          className="m-1 flex flex-1 flex-col overflow-y-scroll p-3"
        >
          {chat.map((msg, idx) => (
            <div
              onMouseEnter={() => {
                setShowIcon(idx);
              }}
              onMouseLeave={() => {
                setShowIcon(null);
              }}
              className={`m-2 flex w-fit items-center ${
                msg.from === "user" ? "self-end" : "self-start"
              }`}
              key={idx}
            >
              <div
                className={`flex rounded-full bg-slate-200 px-4 py-2 text-slate-700`}
              >
                {msg.message}
              </div>
              {msg.from === "bot" && (
                <>
                  {msg.like ? (
                    <FaThumbsUp
                      className={`ml-2 cursor-pointer text-xl ${
                        showIcon === idx ? "opacity-100" : "opacity-0"
                      } transition`}
                      onClick={() => {
                        dispatch(likeMessage(idx));
                      }}
                    />
                  ) : (
                    <FaRegThumbsUp
                      className={`ml-2 cursor-pointer text-xl ${
                        showIcon === idx ? "opacity-100" : "opacity-0"
                      } transition`}
                      onClick={() => {
                        dispatch(likeMessage(idx));
                      }}
                    />
                  )}
                  {msg.dislike ? (
                    <FaThumbsDown
                      className={`ml-2 cursor-pointer text-xl ${
                        showIcon === idx ? "opacity-100" : "opacity-0"
                      } transition`}
                      onClick={() => {
                        dispatch(dislikeMessage(idx));
                      }}
                    />
                  ) : (
                    <FaRegThumbsDown
                      className={`ml-2 cursor-pointer text-xl ${
                        showIcon === idx ? "opacity-100" : "opacity-0"
                      } transition`}
                      onClick={() => {
                        dispatch(dislikeMessage(idx));
                      }}
                    />
                  )}
                </>
              )}
            </div>
          ))}
          {chat.find((data) => data.from === "bot") && (
            <p
              onClick={() => setModalOpen(true)}
              className={`cursor-pointer rounded-lg bg-slate-500 px-4 py-2 text-center`}
            >
              End Conversation
            </p>
          )}
        </div>
        <div className="m-2 flex">
          <input
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            value={message}
            className={`w-full rounded-full px-4 py-2 ${
              darkmode
                ? "bg-slate-300 text-slate-900"
                : "bg-slate-600 text-slate-200"
            }`}
            placeholder="Speak your mind"
            onKeyDown={(e) => {
              if (e.key === "Enter" && message) handleInputSubmit();
            }}
          />
          <div
            onClick={() => {
              if (message) handleInputSubmit();
            }}
            className="justify mx-3 flex h-10 w-11 cursor-pointer items-center justify-center rounded-full bg-gray-300"
          >
            <IoMdSend className={`text-lg text-slate-700`} />
          </div>
        </div>
        <Modal
          open={modalOpen}
          closeModal={() => setModalOpen(false)}
          handleSaveSession={handleSaveSession}
        />
      </div>
    </div>
  );
};

export default ChatBox;
