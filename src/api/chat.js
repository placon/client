import axios from "axios";

// 메세지 룸 생성. (이미 만들어져 있으면 원래 있던 방 가져옴)
async function createMessageRoom({ user_id }) {
  const result = await axios.get(`/api/room/create/${user_id}`);
  console.log(result);

  return null;
}

// 메세지 룸 리스트.
async function getMessageRoomList({ page_index, page_size }) {
  const { data } = await axios.get(
    `/api/messages/room/list/${page_index}/${page_size}`
  );

  return data;
}

// 메세지 룸 진입
async function enterMessageRoom({ room_info, user_id }) {
  const result = await axios.get(`/api/room/enter/${room_info}/${user_id}`);
  console.log(result);

  return null;
}

// 메세지 리스트
async function getMessageList({ room_info, page_index, page_size }) {
  const result = await axios.get(
    `/api/room/enter/${room_info}/${page_index}/${page_size}`
  );
  console.log(result);

  return null;
}

// 메세지 전송
async function sendMessage(sendingData) {
  const result = await axios.post(`/api/message/send`, sendingData);
  console.log(result);

  return null;
}

// 방 삭제
async function deleteMessageRoom({ room_info }) {
  const result = await axios.get(`/api/room/enter/${room_info}`);
  console.log(result);

  return null;
}

export default {
  createMessageRoom,
  getMessageRoomList,
  enterMessageRoom,
  getMessageList,
  sendMessage,
  deleteMessageRoom,
};
