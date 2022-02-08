/**
 * Sort array from other array
 * @param {Array} sortArray The array to need sorf
 * @param {Array} orderArray The array to need sorf
 * @return {Array} The array after sort
 */
const sortArr = (sortArray, orderArray, key) => {
   sortArray.sort((a, b) => {
      return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]);
   });
   return sortArray;
}
export default sortArr;