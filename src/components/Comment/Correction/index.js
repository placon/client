import React from "react";
import "./index.scss";
import ProfileImage from "../../ui/ProfileImage";
import { amazonS3Url } from "../../../config/config";

function Correction(props) {
  const { postContent } = props;
  const {
    _id,
    correction_context,
    additional_text,
    correction_by,
    register_date,
  } = props.commentData;
  const { name, profile_image } = correction_by;

  return (
    <div className="correction-component">
      <section className="profile">
        <ProfileImage
          size="small"
          imageUrl={`${amazonS3Url}/user/${correction_by._id}/${profile_image}`}
        />
      </section>

      <section className="content">
        <div className="user-id">
          <h4>{name && name}</h4>
          {/* {isMyComment && (
            <>
              <Button
                size="small"
                outline
                onClick={() => {
                  onDeleteComment(_id);
                }}
              >
                삭제
              </Button>
            </>
          )} */}
        </div>
        <div
          className="text original"
          style={{ borderBottom: "1px solid gray" }}
        >
          {postContent}
        </div>
        <div
          className="text correction original"
          style={{ borderBottom: "1px solid gray" }}
        >
          {correction_context &&
            correction_context.map((line, idx) => (
              <div key={idx} className={`${line.modified ? "modified" : ""}`}>
                {line.text}
              </div>
            ))}
        </div>
        <div className="text correction">{additional_text}</div>
      </section>
    </div>
  );
}

export default Correction;
