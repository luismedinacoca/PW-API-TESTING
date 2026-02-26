function factorial(num){
  const result = 0;
  
  // validate number
  if(!Number.isFinite(num)) throw new Error("Input is not a number");
  
  // validate number is greater than 0:
  if(num <= 0) throw new Error("Input must be greater than Zero!");
  
  // base result
  if(num === 1) return 1;
  
  // recursive call:
  if(num > 1) {
    return num * factorial(num - 1);
  }
  
  return result;
}
factorial(1);
factorial(2);
factorial(3);
factorial(4);
factorial(5);
factorial(6);
factorial(10);