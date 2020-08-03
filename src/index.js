import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension"; // 리덕스 개발자 도구
import ReduxThunk from "redux-thunk";

// 스토어 생성
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk)) // 미들웨어 적용, logger 사용하는 경우 logger가 제일 마지막에 와야함.
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
