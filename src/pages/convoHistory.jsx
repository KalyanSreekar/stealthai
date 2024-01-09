import React from "react";
import { useSelector } from "react-redux";
import { pastConversations } from "../store/slices/dataSlice";
import useDarkMode from "../hooks/useDarkMode";
import { useParams, Link } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const convoHistory = () => {
  const params = useParams();
  const [textColor, bgColor] = useDarkMode();
  const conversation = useSelector(pastConversations)[params.id];
  //   const conversation = { chat: [] };
  console.log(conversation, "conversation");
  return (
    <div className="flex h-screen w-screen flex-col items-center ">
      <div className="flex w-screen justify-between p-4">
        <Link to="/">
          <p className="text-2xl font-bold">Stealth AI</p>
        </Link>
      </div>
      <div
        className={`flex w-10/12 flex-col rounded-md ${bgColor} ${textColor}`}
      >
        <div
          id="chatDiv"
          className="m-1 flex flex-1 flex-col overflow-y-scroll p-3"
        >
          {conversation.chat.map((msg, idx) => (
            <div
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
              {msg.like && <FaThumbsUp className={`ml-2 text-xl`} />}
              {msg.dislike && <FaThumbsDown className={`ml-2 text-xl`} />}
            </div>
          ))}
        </div>
      </div>
      <p className="m-3 text-2xl">Feedback</p>
      <div className="w-10/12">
        <div className="flex">
          {new Array(conversation.stars).fill(0).map((ele, idx) => (
            <FaStar
              key={idx}
              className="m-1 cursor-pointer text-xl text-slate-800"
            />
          ))}
          {new Array(5 - conversation.stars).fill(0).map((ele, idx) => (
            <FaRegStar
              key={idx}
              className="m-1 cursor-pointer text-xl text-slate-800"
            />
          ))}
        </div>
        <p>{conversation.feedback}</p>
      </div>
    </div>
  );
};

export default convoHistory;
