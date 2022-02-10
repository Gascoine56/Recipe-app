export function random(count, length){
    let results = [];
    for (let index = 0; index < count; index++) {
        const temp =(Math.ceil(Math.random()*length))
        if(temp != results[index-1]){
            results.push(temp);
        }else{
            index--
        }
    }
    return results
}