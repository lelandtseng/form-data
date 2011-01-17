module.exports = exports = function isLetNum(value,params){
    if(/[^0-9a-zA-Z]/g.test(value)) return false;
    else return true
}
