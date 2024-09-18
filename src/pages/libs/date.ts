export function getDate(timeStamp: string) {
  const date = new Date(parseInt(timeStamp));
  const formattedDate = date.toDateString();
  return formattedDate;
}
