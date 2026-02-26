function biggestNumberInArray(arr) {

  // validate is an array:
  if(!Array.isArray(arr)) throw new Error("Input is not an array!");

  // validate array contains numbers only:
  for(let num of arr) {
    if(!Number.isFinite(num)) throw new Error("Array must contain numbers only!");
  }

  return Math.max(...arr)
}



console.log(biggestNumberInArray([1,2,3,4,12,5,6,7,3,2,8,9, 3]))