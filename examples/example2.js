var express = require('express');
var app = module.exports = express.createServer(require('connect-form')() , express.staticProvider(__dirname + '/public'), express.bodyDecoder(), express.cookieDecoder(), express.session(),function(req,res,next){
    (req.header("content-length") > 2 * 1024 * 1024) ? req.destroy() :  next();
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.register('.html', require('ejs'));

var FormData = require('../lib/form-data');

var testform = new FormData();
testform.validat("name", 
   function(value,params){
      if(value > 3) throw new Error('error!');   
      return true;              
   }, null, "hava error!")
   .convert('name','Int','Name int convert error!')
   .convert('float','Float','FfLOAT float 转换失败！')
   .convert('bool','Boolean','BBBBB BLO 转换失败！');

app.post("/form",testform.build(),function(req,res){
    console.log(req.modeldata);
    res.send("haha");    
    
});

app.get("/form",testform.build(),function(req,res){
    console.log(req.modeldata);
    res.send("haha");    
    
});

app.listen(3000);

