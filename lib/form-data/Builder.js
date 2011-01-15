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
               req.data[cok] = cmethod(req.formdata[cok]);
            }catch(e){
            
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
                        bool = vmethod(req.data[vok], v.params);
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
       }


        req.formdata = {};
        var contentType = req.headers['content-type'];
        if (contentType && contentType.indexOf('multipart/form-data') != -1) {
            if (req.form) {
            
                //req.form.uploadDir = '/root/other'
                
                req.form.complete(function(err, fields, files){
                    if (err) {
                        cv(formdata);
                        next();
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
                cv(formdata);
                next();
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
            next();
        }
        
}
