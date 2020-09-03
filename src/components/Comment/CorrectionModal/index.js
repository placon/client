import React, { useState, useEffect } from "react";
import "./index.scss";
import { amazonS3Url } from "../../../config/config";
import CorrectionInput from "../CorrectionInput";

function CorrectionModal(props) {
  const { setShowCorrectionModal, postContent } = props;
  const [showInputModal, setShowInputModal] = useState(false);
  const [content, setContent] = useState([]);
  const [modifiedText, setModifiedText] = useState("");

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < postContent.length; i++) {
      arr[i] = postContent[i].split(" ");
      console.log(arr);
      setContent((prev) => [...prev, arr]);
    }
  }, []);

  return (
    <div className="correction-modal-wrapper">
      <div className="correction-modal">
        <div className="header">
          <h4>포스트 첨삭</h4>
          <figure
            className="close-button"
            onClick={() => {
              setShowCorrectionModal(false);
            }}
          >
            <img src={`${amazonS3Url}/component/close-button.png`} />
          </figure>
        </div>
        <div className="content">
          {content.map((line, idx) => (
            <div>
              {line[idx].map((word) => (
                <span
                  className="word"
                  onClick={() => {
                    console.log(word);
                    setShowInputModal(true);
                  }}
                >
                  {word}{" "}
                </span>
              ))}{" "}
              {idx}
            </div>
          ))}
        </div>
      </div>
      {showInputModal && (
        <CorrectionInput
          modifiedText={modifiedText}
          setModifiedText={setModifiedText}
          setShowInputModal={setShowInputModal}
        />
      )}
    </div>
  );
}

export default CorrectionModal;
