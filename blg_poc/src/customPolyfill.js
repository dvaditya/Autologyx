// Missing polyfill for Object.entries

if (!Object.entries) {
  Object.entries = obj => {
    var ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i); // preallocate the Array
    while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };
}

// Missing polyfill for Object.values
if (!Object.values) Object.values = o => Object.keys(o).map(k => o[k]);
