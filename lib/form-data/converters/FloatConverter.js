module.exports = exports = function FloatConverter(value){
    var num = parseFloat(value);
    if(num.toString() === 'NaN') throw new Error('NaN');
    return num;
}
