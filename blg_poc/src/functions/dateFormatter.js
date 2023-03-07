export default date => {
  try {
    const arr = date.split('-');
    const day = `${arr[2].split('')[0]}${arr[2].split('')[1]}`;
    const month = arr[1];
    const year = arr[0];
    return `${year}-${month}-${day}`;
  } catch(e) {
    return null
  }
  
};

export const MMDDYY = date => {
  var dd = date.getDate();

  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  return (date = mm + '/' + dd + '/' + yyyy);
};
