var express = require('express');
var app = module.exports = express.createServer(require('connect-form')() , express.staticProvider(__dirname + '/public'), express.bodyDecoder(), express.cookieDecoder(), express.session({ secret: 'keyboard cat' }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.register('.html', require('ejs'));

// 导入FormData库
// FormData 用来做什么呢？
// look ==> https://github.com/lelandtseng/form-data
// 第一个实验，用于验证码的实验。
var FormData = require('../lib/form-data');

// new 一个对象，用于生成验证码
var testform1 = new FormData();
// 第二个对象用于 验证 这个验证码。
var testform2 = new FormData();
// 第一个参数表示开启验证码功能，后面参数是验证失败的错误信息。
testform2.validatnum(true," 验证码错误！ ");


// 调用 testform1 的 build() 表示生成 connect插件
// 记住哦，testform1 用于生成验证码
app.get("/form",testform1.build(),function(req,res){
    res.render("form.html",{
        layout:false
    });   
});

// 调用 testform2 builde方法，验证
app.post("/form",testform2.build(),function(req,res){
    // 如果验证成功就不会有 req.errmsg对象
    if(req.errmsg){        
    res.render("form.html",{
        layout:false
    });   
        
    }else{
        res.send("ok!! success!!!"); // 这个表示验证成功！
        // 让我们试试看吧！
    }
});

app.listen(3000);

