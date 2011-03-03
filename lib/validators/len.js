module.exports = exports = function len(value,params){
    var min = params.min;
    var max = params.max;
    
    if(min <= max && value.length >= min && value.length <= max) return true;
    else return false;
}
