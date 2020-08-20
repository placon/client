import moment from "moment";
export default function (fileName) {
  const date = moment().format("YYYYMMDD");
  const randomString = Math.random().toString(36).substring(2, 8);
  const cleanFileName = fileName.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const newFileName = `${date}-${randomString}-${cleanFileName}`;
  return newFileName.substring(0, 60);
}
