import React, { useState, useEffect } from "react";
import "./index.scss";
import { amazonS3Url } from "../../../config/config";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { writeCorrection } from "../../../reducers/comment";

function CorrectionModal(props) {
  const { setShowCorrectionModal, postId, postContent } = props;
  const [showInputModal, setShowInputModal] = useState(false);
  const [modifiedText, setModifiedText] = useState("");
  const [additionalText, setAdditionalText] = useState("");
  const [activeLine, setActiveLine] = useState(-1);
  const [correctContent, setCorrectContent] = useState([]);
  const { newCorrection } = useSelector((state) => state.comment);
  const dispatch = useDispatch();

  const onChangeAdditionalText = (e) => {
    setAdditionalText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(correctContent);
    console.log("포스트 아이디", postId);
    console.log("추가 코멘트 : ", additionalText);
    dispatch(
      writeCorrection({
        post_id: postId,
        correction_context: correctContent,
        additional_text: additionalText,
      })
    );
    setAdditionalText("");
  };

  const onChangeModifiedText = (e) => {
    setModifiedText(e.target.value);
  };

  const modifyText = () => {
    setShowInputModal(false);

    let newArr = correctContent.slice(); // 배열 복사
    newArr[activeLine] = {
      text: modifiedText,
      modified: true,
    };
    setCorrectContent(newArr);
    setModifiedText(""); // 수정하는 input data 리셋
  };

  useEffect(() => {
    // correction upload를 할 때 요구되는 데이터 형식을 만들어준다.
    let tempArr = [];
    for (let i = 0; i < postContent.length; i++) {
      let tmp = {
        text: postContent[i],
        modified: false,
      };
      tempArr.push(tmp);
    }

    setCorrectContent(tempArr);
  }, [newCorrection]);

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
        <form onSubmit={onSubmit}>
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
                {line}
              </div>
            ))}
            <h4>수정된 내용</h4>
            {correctContent.map((line, idx) => (
              <div key={idx}>{line.text}</div>
            ))}

            <div>
              {showInputModal && (
                <>
                  <input
                    placeholder={postContent[activeLine]}
                    value={modifiedText}
                    onChange={onChangeModifiedText}
                  />
                  <Button size="small" outline onClick={modifyText}>
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
            <h4>추가 코멘트</h4>
            <textarea
              className="text-area"
              value={additionalText}
              onChange={onChangeAdditionalText}
            />
          </div>
          <div className="complete-button">
            <Button fullWidth outline type="submit">
              첨삭 완료
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CorrectionModal;
