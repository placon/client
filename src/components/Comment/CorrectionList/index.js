import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Correction from "../Correction";
import commentApi from "../../../api/comment";

function CorrectionList(props) {
  const { postId, postContent } = props;

  const [list, setList] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [myInfo, setMyInfo] = useState();

  const { newCorrection } = useSelector((state) => state.comment);

  const loadMoreCorrection = async () => {
    if (!hasMore) {
      return;
    }

    let pageSize = 5; // 메서드를 한 번 호출할 때마다 가져올 댓글의 개수

    const { data } = await commentApi.correctionList({
      post_id: postId,
      page_index: pageIndex,
      page_size: pageSize,
    });

    if (data) {
      if (data.correction_list.length < pageSize) {
        setHasMore(false);
      }
      setList((prev) => [...prev, ...data.correction_list]);
      setPageIndex(data.next_page_index);
    }
  };

  useEffect(() => {
    let info = JSON.parse(window.sessionStorage.getItem("myInfo"));
    setMyInfo(info);

    loadMoreCorrection();
  }, []);

  useEffect(() => {
    if (newCorrection.comment && myInfo) {
      let addedCorrection = newCorrection.comment;

      let correction = {
        _id: addedCorrection._id,
        correction_context: addedCorrection.correction_context,
        correction_by: {
          _id: addedCorrection.correction_by,
          name: myInfo.name,
          profile_image: myInfo.profile_image,
        },
      };

      setList((prev) => [...prev, correction]);
    }
  }, [newCorrection]);

  return (
    <>
      {list &&
        list.map((comment, idx) => (
          <Correction
            key={idx}
            postContent={postContent}
            commentData={comment}
          />
        ))}
      {hasMore && (
        <div className="show-more-button" onClick={loadMoreCorrection}>
          첨삭 댓글 더보기
        </div>
      )}
    </>
  );
}

export default CorrectionList;
