import React, { useState, useEffect } from "react";
import "./index.scss";
import { amazonS3Url } from "../../../config/config";
import Button from "../../ui/Button";

function CorrectionModal(props) {
  const { setShowCorrectionModal, postContent } = props;
  const [showInputModal, setShowInputModal] = useState(false);
  const [modifiedText, setModifiedText] = useState("");
  const [activeLine, setActiveLine] = useState(-1);
  const [correctContent, setCorrectContent] = useState([]);

  const onChangeModifiedText = (e) => {
    setModifiedText(e.target.value);
  };

  const onSubmitModify = () => {
    setShowInputModal(false);

    let newArr = correctContent.slice(); // 배열 복사
    newArr[activeLine] = modifiedText;
    setCorrectContent(newArr);
    setModifiedText(""); // 수정하는 input data 리셋
  };

  useEffect(() => {
    setCorrectContent(postContent);
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
          {postContent.map((line, idx) => (
            <div
              className="word"
              key={idx}
              onClick={() => {
                setShowInputModal(true);
                setActiveLine(idx);
              }}
            >
              {line} {idx}
            </div>
          ))}
          <h4>수정된 내용</h4>
          {correctContent.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}

          <div>
            {showInputModal && (
              <>
                <input value={modifiedText} onChange={onChangeModifiedText} />
                <Button size="small" outline onClick={onSubmitModify}>
                  수정
                </Button>
                <Button
                  size="small"
                  outline
                  onClick={() => {
                    setShowInputModal(false);
                    setModifiedText("");
                  }}
                >
                  취소
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CorrectionModal;
