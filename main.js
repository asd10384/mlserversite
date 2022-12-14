const parmas = location.search.split(/[?&]/).slice(1).map(paramPair => paramPair.split(/=(.+)?/).slice(0,2)).reduce((obj, pairArray) => {
  obj[pairArray[0]] = pairArray[1];
  return obj;
}, {});

if (parmas["category"] == "role") {
  
}