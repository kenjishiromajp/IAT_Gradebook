export default function transformObjectToArray(objectData) {
  const obj = objectData.toJS();
  return Object.keys(obj).map((key) => obj[key]);
}
