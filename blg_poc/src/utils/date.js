export const getHumanReadable = (date, utc = false) => {

  if(!date) {
    return 
  }
  let d = new Date(date);

  // Check if type date
  if (Object.prototype.toString.call(d) === '[object Date]') {
    let curDate = new Date();
    // if (eu) {
    //   d = new Date(`${d.toLocaleDateString()} ${d.toTimeString()}`);
    // }

    if (d.toDateString() === curDate.toDateString()) {
      return `Today at ${getTime(date, utc)}`;
    } else if (curDate.getDate() - 1 === d.getDate()) {
      return `Yesterday at ${getTime(date, utc)}`;
    }
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da} ${mo} ${ye}`;
  } else {
    return '';
  }
};

export const getTime = (date, utc = false) => {
  let d = new Date(date);
  if (utc) {
    return (
      ('0' + (d.getHours() + 1)).slice(-2) +
      ':' +
      ('0' + d.getMinutes()).slice(-2)
    );
  } else {
    return (
      ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2)
    );
  }
};

export const getDate = (date, utc = false, dateFormat ) => {
  if(!date) {
    return 
  }
  let d = new Date(date);

  // Check if type date
  if (Object.prototype.toString.call(d) === '[object Date]' && !isNaN(d.getTime())) {
    let curDate = new Date();

    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

    if(dateFormat && dateFormat === 'DD') {
      return `${da}/${mo}/${ye}`
    } else if (dateFormat === 'MM') {
      return `${mo}/${da}/${ye}`;
    }

    return `${da}-${mo}-${ye}`;
  } else {
    return '';
  }
}

export const sortDates = (dates) => {
  dates.sort(function(a, b){
    let aa = a.split('/').reverse().join(),
        bb = b.split('/').reverse().join();
    return aa < bb ? -1 : (aa > bb ? 1 : 0);
});
}
