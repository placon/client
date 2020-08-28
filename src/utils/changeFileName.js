import moment from "moment";
export default function (fileName) {
  // 랜덤 스트링으로 가공한 파일이름과 파일의 확장자 리턴

  const lastDotIndex = fileName.lastIndexOf(".");
  const fileExt = fileName.substring(lastDotIndex);
  const pureFileName = fileName.substring(0, lastDotIndex);

  const date = moment().format("YYYYMMDD");
  const randomString = Math.random().toString(36).substring(2, 8);
  const cleanFileName = pureFileName.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const newFileName = `${date}-${randomString}-${cleanFileName}`.substring(
    0,
    50
  );

  return newFileName + fileExt;
}
