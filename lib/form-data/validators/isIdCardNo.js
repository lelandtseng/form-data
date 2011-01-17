module.exports = exports = function isIdCardNo(num,params){
    if (isNaN(num)) {return false;}
    var len = num.length, re;
    if (len == 15)
    re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{3})$/);
    else if (len == 18)
    re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\d)$/);
    else {return false;}
    var a = num.match(re);
    if (a != null)
    {
    if (len==15)
    {
    var D = new Date("19"+a[3]+"/"+a[4]+"/"+a[5]);
    var B = D.getYear()==a[3]&&(D.getMonth()+1)==a[4]&&D.getDate()==a[5];
    }
    else
    {
    var D = new Date(a[3]+"/"+a[4]+"/"+a[5]);
    var B = D.getFullYear()==a[3]&&(D.getMonth()+1)==a[4]&&D.getDate()==a[5];
    }
    if (!B) {return false;}
    }
    return true;
    }
