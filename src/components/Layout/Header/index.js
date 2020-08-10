import React from "react";
import "./index.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useInput from "../../../lib/hooks/useInput";
import Button from "../../UI/Button";

function index() {
  const { isLoggedIn, myInfo } = useSelector((state) => state.user); // 로그인 되어있는지 체크
  // const isLoggedIn = true;
  // const myInfo = true;
  const [searchKeyword, onChangeSearchKeyword] = useInput("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("키워드 : ", searchKeyword);
  };

  return (
    <header className="header-container">
      <div className="inner">
        <div className="left">
          <Link to="/">P L A C O N .</Link>
        </div>
        <form className="middle" onSubmit={onSubmit}>
          <input
            className="search-input"
            type="text"
            value={searchKeyword}
            onChange={onChangeSearchKeyword}
          />
          <button className="magnifier" type="submit"></button>
        </form>
        <div className="right">
          {isLoggedIn && myInfo ? (
            <>
              <figure className="mailbox"></figure>
              <figure
                className={`profile ${
                  !myInfo.profile_image && "default-image"
                }`}
              ></figure>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button size="small">로그인</Button>
              </Link>
              <Link to="/signup">
                <Button size="small">회원가입</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default index;
