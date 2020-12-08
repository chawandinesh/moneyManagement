import moment from 'moment';
const getDates = (days) => {
  let DatesArray = [];
  for (var i = 1; i <= days; i++) {
    DatesArray.push(moment().subtract(i, 'days').format('DD-MM-YYYY'));
  }
  return DatesArray;
};

export {getDates};
