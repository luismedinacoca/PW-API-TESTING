/* Determinal numero primo: */

function primeNumber(num){
  if(!Number.isFinite(num)) throw new Error("Input is not a number");
  const sqrt = num ** 0.5;
  //console.log(sqrt);
  
  if(num === 1 || num === 2) return true;
  
  for(let i = 2; i <= Math.floor(sqrt); i++){
    if(num % i === 0) return false;
  }
  return true;
}


primeNumber(1)
primeNumber(2)
primeNumber(3)
primeNumber(4)
primeNumber(5)
primeNumber(6)
primeNumber(13)
primeNumber(15)