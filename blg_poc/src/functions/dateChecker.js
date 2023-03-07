export default (noteDate, currentDate) => {
  const date = noteDate.split(',')[0];
  const time = noteDate.split(',')[1];
  return date === currentDate ? time : date;
};
