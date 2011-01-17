module.exports = exports = function DateConverter(value){
    var num = parseFloat(value);
    if(num.toString() === 'NaN') throw new Error('NaN');
    return num;
}
