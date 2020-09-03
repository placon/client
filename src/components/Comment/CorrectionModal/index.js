import React, { useState, useEffect } from "react";
import "./index.scss";
import { amazonS3Url } from "../../../config/config";

function CorrectionModal(props) {
  const { setShowCorrectionModal, postContent } = props;
  // const [content, setContent] = useState([]);

  // useEffect(() => {
  //   let words = postContent.split(" ");
  //   console.log(words);
  //   setContent(words);
  // }, []);

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
          {postContent.map((line, idx) => (
            <div key={idx}>
              {line.split(" ")} {idx}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CorrectionModal;
