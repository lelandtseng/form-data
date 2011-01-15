module.exports = exports = function BooleanConverter(value){
    
    var value = value.toString().toLocaleLowerCase();
    if(value === "true" || value === "1") return true;
    if(value === "false" || value === "0") return false;
    throw new Error();
}
