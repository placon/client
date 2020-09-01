import React, { useState, useEffect } from "react";
import Comment from "../Comment";
import "./index.scss";
import { writeComment, deleteComment } from "../../../reducers/comment";
import { useDispatch, useSelector } from "react-redux";
import commentApi from "../../../api/comment";

function CommentList(props) {
  const { postId } = props; // 포스트 아이디
  const dispatch = useDispatch();

  const [pageIndex, setPageIndex] = useState(0); // 페이지 번호
  const [hasMore, setHasMore] = useState(true);

  const [commentList, setCommentList] = useState([]); // 댓글 리스트
  const [commentContent, setCommentContent] = useState("");
  const [commentTab, setCommentTab] = useState(0);

  const [myInfo, setMyInfo] = useState();

  const loadMoreComments = async () => {
    if (!hasMore) {
      return;
    }

    console.log("요청하는 pageIndex", pageIndex);

    let pageSize = 5; // 메서드를 한 번 호출할 때마다 가져올 댓글의 개수
    const { data } = await commentApi.commentList({
      post_id: postId,
      page_index: pageIndex,
      page_size: pageSize,
    });

    if (data) {
      console.log("댓글리스트 컴포넌트에서 확인", data);
      if (data.comment_list.length < pageSize) {
        setHasMore(false);
      }
      setCommentList((prev) => [...prev, ...data.comment_list]);
      setPageIndex(data.next_page_index);
    }
  };

  useEffect(() => {
    let info = JSON.parse(window.sessionStorage.getItem("myInfo"));
    setMyInfo(info);

    loadMoreComments();
  }, []);

  const onChangeCommentTab = (tab) => {
    if (commentTab === tab) {
      return;
    }
    setCommentTab(tab);
  };

  const onChangeCommentContent = (e) => {
    setCommentContent(e.target.value);
  };
  const onSubmitComment = (e) => {
    e.preventDefault();
    if (commentContent.length === 0) {
      return;
    }
    dispatch(
      writeComment({
        post_id: postId,
        comment_context: commentContent,
      })
    );
  };

  const onDeleteComment = (comment_id) => {
    let check = confirm("댓글을 정말 삭제하시겠습니까?");
    if (!check) {
      return;
    }
    dispatch(
      deleteComment({
        _id: comment_id,
        post_id: postId,
      })
    );
    setCommentList(commentList.filter((comment) => comment._id !== comment_id));
  };

  return (
    <div className="comment-list-container">
      <div className="comment-tab">
        <div
          className={`tab ${commentTab === 0 ? "active" : ""}`}
          onClick={() => {
            onChangeCommentTab(0);
          }}
        >
          일반 댓글
        </div>
        <div
          className={`tab ${commentTab === 1 ? "active" : ""}`}
          onClick={() => {
            onChangeCommentTab(1);
          }}
        >
          첨삭 댓글
        </div>
      </div>

      {myInfo &&
        commentList.map((comment, idx) => (
          <Comment
            key={idx}
            commentData={comment}
            isMyComment={myInfo._id === comment.commented_by._id}
            onDeleteComment={onDeleteComment}
          />
        ))}
      <div className="show-more-button" onClick={loadMoreComments}>
        댓글 더 보기 ...
      </div>
      <form onSubmit={onSubmitComment}>
        <div className="comment-write-form">
          <textarea
            placeholder="댓글을 입력하세요.."
            value={commentContent}
            onChange={onChangeCommentContent}
          />
          <button type="submit">전송</button>
        </div>
      </form>
    </div>
  );
}

export default CommentList;
