import React, { useState } from "react";
import "./index.scss";
import Button from "../../ui/Button";
import S3FileUpload from "react-s3";
import amazonS3 from "../../../config/amazonS3";
import { amazonS3Url } from "../../../config/config";
import ChangeFileName from "../../../utils/changeFileName";
import { useDispatch } from "react-redux";
import { writePostRequest } from "../../../reducers/post";

function PostWriteFormModal(props) {
  const { userInfo, setShowWriteModal } = props;

  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [content, setContent] = useState("");

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const imageArray = [];
    images.forEach((item) => {
      imageArray.push(item.name);
    });

    dispatch(
      writePostRequest({
        posted_by: userInfo._id,
        post_context: content,
        post_images: imageArray,
      })
    );
  };

  const closeModal = () => {
    if (!content && images.length === 0) {
      setShowWriteModal(false);
      return;
    }

    const check = confirm(
      "포스트 작성을 취소하시겠습니까? 내용은 저장되지 않습니다."
    );
    if (check) {
      images.map((image) => deleteAmazonS3File(image.name));
      setShowWriteModal(false);
      resetPostData();
    } else {
      return;
    }
  };

  const resetPostData = () => {
    setImages([]);
    setContent("");
    console.log("데이터가 리셋됩니다.");
  };

  const deleteAmazonS3File = (name) => {
    amazonS3.dirName = `placon/user/${userInfo._id}`;
    S3FileUpload.deleteFile(name, amazonS3);
  };

  const onRemoveImage = (key, name) => {
    deleteAmazonS3File(name);
    setImages((prev) => prev.filter((img) => img.key !== key));
  };

  const onChangeImages = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    if (images.length === 6) {
      alert("이미지는 최대 6개까지 등록할 수 있습니다.");
      return;
    }

    const originFile = e.target.files[0];
    const newFileName = ChangeFileName(originFile.name);
    const newPostFile = new File([originFile], newFileName, {
      type: originFile.type,
    });

    console.log("new name", newPostFile.name);

    amazonS3.dirName = `placon/user/${userInfo._id}/post`;

    S3FileUpload.uploadFile(newPostFile, amazonS3)
      .then((data) => {
        var uploadResult = {
          key: data.key,
          name: newFileName,
          location: data.location,
        };
        setImages((prev) => [...prev, uploadResult]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="postFormModalWrapper">
      <div className="post-write-modal">
        <div className="modal-head">
          <h4>포스트 작성</h4>
          <figure className="close-button" onClick={closeModal}>
            <img src={`${amazonS3Url}/component/close-button.png`} />
          </figure>
        </div>

        <div className="data-area">
          <form onSubmit={onSubmit}>
            <textarea value={content} onChange={onChangeContent} />
            <div className="image-list">
              {images &&
                images.map((image, idx) => (
                  <span
                    className="image-wrapper"
                    key={idx}
                    onClick={() => {
                      onRemoveImage(image.key, image.name);
                    }}
                  >
                    <div className="image-item">
                      <img src={image.location} />
                    </div>
                  </span>
                ))}
            </div>
            <div className="icon-list">
              <input
                type="file"
                // name="file"
                id="file"
                className="inputfile"
                onChange={onChangeImages}
              />
              <div>
                <label htmlFor="file">파일 선택</label>
              </div>

              {/* 이미지
              <span>해쉬태그</span> */}
            </div>
            <div className="submit">
              <Button type="submit" size="small">
                작성
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostWriteFormModal;
