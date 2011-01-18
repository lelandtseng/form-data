// 我们来测试转换器的使用
var express = require('express');
var app = module.exports = express.createServer(require('connect-form')() , express.staticProvider(__dirname + '/public'), express.bodyDecoder(), express.cookieDecoder(), express.session(),function(req,res,next){
    (req.header("content-length") > 2 * 1024 * 1024) ? req.destroy() :  next();
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.register('.html', require('ejs'));

var FormData = require('../lib/form-data');

var form0 = new FormData();

var form1 = new FormData(); 
form1.validatnum(true," 验证码错误！ ");
form1.validat("age","isUrl",{},"URL地址不正确！");

app.get("/vage",form0.build(),function(req,res){
    res.render("age.html",{
        layout:false
    });
});

// 刚才是错误的，原因是因为没有加载 form1插件

app.post("/age",form1.build(),function(req,res){
    if(req.errmsg){
        res.render("age.html",{
            layout:false
        });
    }else{
        res.send("age 转换成功！");
    }
});

app.listen(3000);
