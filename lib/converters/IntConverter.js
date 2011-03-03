module.exports = exports = function IntConverter(value){
    var num = parseInt(value);
    if(num.toString() === 'NaN') throw new Error('NaN');
    return num;
}
