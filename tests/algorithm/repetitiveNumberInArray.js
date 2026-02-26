/* El número que más se repite en un arreglo */

function repeatedNumberInArray( arr){
  // validation in case is not an array:
  if(!Array.isArray(arr)) throw new Error("Input is not an array!");
  
  // Validation in case a value is not a number:
  for(let num of arr) {
    if(!Number.isFinite(num)) throw new Error("This array must contain numbers only!")
  }
  
  // each number and its quanity:
  const count = {};
  
  // creating the count obj <number, quantity>
  for(let num of arr) {
    count[num] = (count[num] || 0) + 1;
  }
  
  const values = Object.values(count); // array
  
  const maxNumber = Math.max(...values);
  console.log(maxNumber);
  console.log(typeof maxNumber);
  
  const results = [];
  
  for(const [num, qty] of Object.entries(count)) {
    console.log(num, qty,"\n")
    if(qty === maxNumber) results.push(num);
  }
  
  return results
}

console.log(repeatedNumberInArray([1,2,3,4,2,5,6,7,3,2,8,9, 3])) //2, 3