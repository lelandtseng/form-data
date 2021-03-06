var fs = require('fs');

var vlib = {};
var clib = {};

fs.readdirSync(__dirname + '/validators').forEach(function(filename){
    var name = filename.substr(0, filename.lastIndexOf('.'));
    vlib[name] = require('./validators/' + name);
});

fs.readdirSync(__dirname + '/converters').forEach(function(filename){
    var name = filename.substr(0, filename.lastIndexOf('.'));
    clib[name] = require('./converters/' + name);
});

module.exports = function Buidler(formdata){

    return function(req,res,next){
           
       
function cv(formdata){
    var cos = formdata.cos;
    var vos = formdata.vos;
    var schema = formdata.schema;    
    var modeldata = req.formdata; 
    var errdata = {}
    
    if(formdata.bootvnum){
    if(req.formdata['validatnum']  && parseInt(req.formdata['validatnum']) === req.session.vnum.total){
    }else{
              if(req.errmsg){}
              else {
                req.errmsg = {};
              }
              if (req.errmsg['validatnum']){}
              else {
                req.errmsg['validatnum'] = [];
              }
              
              req.errmsg['validatnum'].push(formdata.validatnumerr);
    }
    }

    var a = Math.round(Math.random()*10);
    var b = Math.round(Math.random()*10);
    var h = a + b;
    req.validatnum = req.session.vnum = {first:a,second:b,total:h}

     
    for(var cok in cos){
            var co = cos[cok];
            var converter = co.converter;
            var cmethod;
            if (typeof converter === "string") {
                cmethod = clib[converter+'Converter'];
                
            }else if(typeof converter === "function"){
                cmethod = converter;
            }
            
            try{
               modeldata[cok] = cmethod(req.formdata[cok]);
            }catch(e){
               errdata[cok] = true;
              if(req.errmsg){}
              else {
                req.errmsg = {};
              }
              if (req.errmsg[cok]){}
              else {
                req.errmsg[cok] = [];
              }
              req.errmsg[cok].push(co.err);
              
            }
      }    
      
      
      
      for (var vok in vos) {
          if(errdata[vok]){ continue; }
                var vs = vos[vok];
                for (var vk in vs) {
                    var v = vs[vk];
                    var vmethod;
                    
                    if (typeof v.validat === "string") {
                        vmethod = vlib[v.validat];
                    }
                    else 
                        if (typeof v.validat === "function") { 
                            vmethod = v.validat;
                        }
                    var bool = false;
                    try {
                        bool = vmethod(req.formdata[vok], v.params);
                    } 
                    catch (e) {
                        console.log(e)
                    }
                    if (bool){}
                    else {
                        if (req.errmsg){}
                        else {
                            req.errmsg = {};
                        }
                        if (req.errmsg[vok]){}
                        else {
                            req.errmsg[vok] = [];
                        }
                        req.errmsg[vok].push(v.errmsg);
                   }
                    
              }
        }
        
        if(req.errmsg){
        }else{
            if(formdata.schema){
                req.modeldata = {};
                for(var k in schema){
                    req.modeldata[schema[k]] = modeldata[schema[k]];
                }                
            }else{
                req.modeldata = modeldata;
            }
        }
}
                               

        req.formdata = {};
        
        var contentType = req.headers['content-type'];
        
        if (contentType && contentType.indexOf('multipart/form-data') != -1) {
       
            if (req.form) {    
                    
                req.form.complete(function(err, fields, files){

                    if (err) {
                    }
                    else {
                        
                        req.formdata = fields;
                        for (var fk in files) {
                            var ss = files[fk].path.split('/');
                            files[fk].path = ss[ss.length - 1];
                            req.formdata[fk] = files[fk]
                        }
                    }
                    
                    
                    cv(formdata);  
                    next();
                });
            }
            else {
                throw new Error("No have req.form object!!");
            }
            
        }
        else {
            req.formdata = req.query;
            if (req.body) {
                for (var k in req.body) {
                    req.formdata[k] = req.body[k];
                }
            }

            cv(formdata);
            next();
        }
           
        }
        
}
