module.exports = exports = function isPrice(value,params){
    if(/^(\d*\.\d{0,2})$/.test(value)) {
        return true;
    }
    else return false;
}
