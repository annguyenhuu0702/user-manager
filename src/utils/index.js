export const renderNote = (result) => {
  let newResult = "";
  result.forEach((item, index) => {
    if (index === 0) {
      newResult += item.content;
    } else {
      newResult += "," + item.content;
    }
  });
  return newResult;
};
