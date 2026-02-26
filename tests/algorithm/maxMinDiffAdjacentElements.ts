/**
 * Encuentra la mayor y menor diferencia absoluta entre elementos consecutivos
 * @param arr Array de números
 * @returns { max: number, min: number } o null si no hay suficientes elementos
 */
function diferenciasAdyacentesMaxMin(arr: number[]): { max: number; min: number } | null {
    if (!Array.isArray(arr) || arr.length < 2) {
        return null;
    }

    let maxDiff = -Infinity;
    let minDiff = Infinity;

    for (let i = 1; i < arr.length; i++) {
        const diff = Math.abs(arr[i] - arr[i - 1]);
        
        if (diff > maxDiff) maxDiff = diff;
        if (diff < minDiff) minDiff = diff;
    }

    return { max: maxDiff, min: minDiff };
}

// Ejemplos de uso:
console.log(diferenciasAdyacentesMaxMin([4, 8, 3, 10, 2, 15]));  
// { max: 13, min: 4 }

console.log(diferenciasAdyacentesMaxMin([1, 3, 2, 8, 7]));      
// { max: 6, min: 1 }

console.log(diferenciasAdyacentesMaxMin([5]));                   
// null

console.log(diferenciasAdyacentesMaxMin([]));                    
// null

