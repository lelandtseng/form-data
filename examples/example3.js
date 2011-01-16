var express = require('express');
var app = module.exports = express.createServer(require('connect-form')() , express.staticProvider(__dirname + '/public'), express.bodyDecoder(), express.cookieDecoder(), express.session());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.register('.html', require('ejs'));

var FormData = require('../lib/form-data');

var testform1 = new FormData();
var testform2 = new FormData();
testform2.validatnum(true,"error validat num !!! ");

app.get("/form",testform1.build(),function(req,res){
    res.render("form.html",{
        layout:false,
        first:req.session.vnum.first,
        second:req.session.vnum.second
    });   
});

app.post("/form",testform2.build(),function(req,res){
    if(req.errmsg){
        res.redirect("/form");
    }else{
        res.send("ok!! success!!!");
    }
});

app.listen(3000);

