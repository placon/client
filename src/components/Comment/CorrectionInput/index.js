import React from "react";
import "./index.scss";
import Button from "../../ui/Button";

function CorrectionInput(props) {
  const { modifiedText, setModifiedText, setShowInputModal } = props;
  return (
    <div className="correction-input-wrapper">
      <div className="correction-input-modal">
        <div>
          <h4>수정할 문구를 입력해주세요</h4>
          <form>
            <div>
              <input />{" "}
            </div>
            <div>
              <Button size="small" outline>
                수정
              </Button>
              <Button
                size="small"
                outline
                onClick={() => {
                  setShowInputModal(false);
                }}
              >
                취소
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CorrectionInput;
