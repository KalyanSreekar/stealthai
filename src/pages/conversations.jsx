import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pastConversations, darkMode } from "../store/slices/dataSlice";
import { FaSortNumericDown } from "react-icons/fa";
import { FaSortNumericDownAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";

const conversations = () => {
  const darkmode = useSelector(darkMode);
  const [sortStars, setSortStars] = useState(false);
  const [conversations, setConversations] = useState(
    useSelector(pastConversations),
  );
  const [textColor, bgColor, shadedText, shadedBg] = useDarkMode();
  //   const conversations = useSelector(pastConversations);
  const downloadFile = ({ data, fileName, fileType }) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType });
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const exportToJson = (item) => {
    let html_data = `<html><body>`;
    //started chat div
    html_data =
      html_data +
      `<div style="display: flex;background-color: rgb(51 65 85);border-radius: 20px;flex-direction: column;">`;
    item.chat.forEach((chat) => {
      html_data =
        html_data +
        `<div
        style="
          background-color: rgb(226 232 240);
          padding: 10px 20px;
          width: fit-content;
          margin: 10px;
          border-radius: 30px;
          ${chat.from === "user" ? "align-self: flex-end;" : ""}
        "
      >` +
        chat.message +
        `</div>`;
    });
    html_data = html_data + `</div>`;
    //ended chat div
    html_data =
      html_data + `<h2 style="text-align: center; margin: 10px">Feedback</h2>`;
    //print stars
    html_data = html_data + `<div style="display: flex">`;
    new Array(item.stars)
      .fill(0)
      .forEach((ele) => (html_data = html_data + `<span>&#9733;</span>`));
    html_data = html_data + `</div>`;
    //print feedback
    html_data = html_data + `<p>${item.feedback}</p>`;
    html_data = html_data + `</body></html>`;

    downloadFile({
      data: html_data,
      fileName: `chatData${item.time}.html`,
      fileType: "text/html",
    });
  };

  const sortByStars = () => {
    let convo = [...conversations];
    setConversations(
      convo.sort((a, b) => (sortStars ? a.stars - b.stars : b.stars - a.stars)),
    );
    setSortStars(!sortStars);
  };

  return (
    <div className={`h-screen w-screen overflow-scroll ${bgColor}`}>
      <div className="flex w-screen justify-between p-4">
        <Link to={"/"}>
          <p className={`text-2xl font-bold ${textColor}`}>Stealth AI</p>
        </Link>
      </div>
      {conversations.length === 0 ? (
        <p className={`text-center text-2xl ${textColor}`}>
          No Past Conversations Data
        </p>
      ) : (
        <>
          <div className="grid grid-cols-5">
            <p className={"text-center text-xl font-semibold " + textColor}>
              Time
            </p>
            <div className="flex items-center justify-center">
              <p className={"text-center text-xl font-semibold " + textColor}>
                stars
              </p>
              {sortStars ? (
                <FaSortNumericDownAlt
                  onClick={sortByStars}
                  className="ml-2 mt-1 cursor-pointer"
                />
              ) : (
                <FaSortNumericDown
                  onClick={sortByStars}
                  className="ml-2 mt-1 cursor-pointer"
                />
              )}
            </div>
            <p className={"text-center text-xl font-semibold " + textColor}>
              Feedback
            </p>
            <p className={"text-center text-xl font-semibold " + textColor}>
              View
            </p>
            <p className={"text-center text-xl font-semibold " + textColor}>
              Export
            </p>
          </div>

          {conversations.map((item, idx) => {
            return (
              <div key={idx} className="m-2 grid grid-cols-5 gap-4">
                <p className={"text-center " + textColor}>{item.time}</p>
                <p className={"text-center " + textColor}>{item.stars}</p>
                <p
                  className={
                    "overflow-hidden text-ellipsis whitespace-nowrap " +
                    textColor
                  }
                >
                  {item.feedback}
                </p>
                <Link to={`/conversations/${idx}`}>
                  <p
                    className={
                      "h-fit cursor-pointer rounded-full bg-slate-600 px-4 py-2 text-center " +
                      textColor
                    }
                  >
                    View
                  </p>
                </Link>
                <p
                  onClick={() => {
                    exportToJson(item);
                  }}
                  className={
                    "h-fit cursor-pointer rounded-full bg-slate-600 px-4 py-2 text-center " +
                    textColor
                  }
                >
                  Export
                </p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default conversations;
