module.exports = exports = function isIP(s){
    var check=function(v){try{return (v<=255 && v>=0)}catch(x){return false}};
    var re=s.split(".")
    return (re.length==4)?(check(re[0]) && check(re[1]) && check(re[2]) && check(re[3])):false
}
