var express = require('express');
var app = module.exports = express.createServer(require('connect-form')() , express.staticProvider(__dirname + '/public'), express.bodyDecoder(), express.cookieDecoder(), express.session(),function(req,res,next){
    (req.header("content-length") > 2 * 1024 * 1024) ? req.destroy() :  next();
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.register('.html', require('ejs'));

var Builder = require('../lib/form-data').Builder;
var FormData = require('../lib/form-data').FormData;

var testform = new FormData();
testform.validat("name", 
   function(value,params){
      if(value.length > 3) throw new Error('error!');   
      return true;              
   }, null, "hava error!")
   .convert('Int','Name int convert error!');

app.post("/form",Builder(testform),function(req,res){
    console.log(req.errmsg);
    res.send("haha");    
    
});

app.listen(3000);

