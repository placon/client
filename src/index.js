import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { rootSaga } from "./sagas";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension"; // 리덕스 개발자 도구
import createSagaMiddleware from "redux-saga";
import Layout from "./components/Layout";

const sagaMiddleWare = createSagaMiddleware(); // saga 미들웨어

// 스토어 생성
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleWare)) // 미들웨어 적용, logger 사용하는 경우 logger가 제일 마지막에 와야함.
);

// 스토어 생성된 뒤 실행해야할 코드
sagaMiddleWare.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Layout>
      <App />
    </Layout>
  </Provider>,
  document.getElementById("root")
);
