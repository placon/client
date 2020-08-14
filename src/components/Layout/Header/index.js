import React, { useEffect, useState } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import useInput from "../../../lib/hooks/useInput";
import Button from "../../UI/Button";

function index({ login, userInfo }) {
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
          {login ? (
            <>
              <figure className="mailbox"></figure>
              <figure
                className={`profile ${
                  !userInfo.profile_image && "default-image"
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
