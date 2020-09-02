import React from "react";
import "./index.scss";
import { amazonS3Url } from "../../../config/config";

function CorrectionModal(props) {
  const { setShowCorrectionModal } = props;
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
      </div>
    </div>
  );
}

export default CorrectionModal;
