

var fs = require('fs');
var vlib = {};

fs.readdirSync(__dirname + '/validators').forEach(function(filename){
    var name = filename.substr(0, filename.lastIndexOf('.'));
    vlib[name] = require('./validators/' + name);
});


var Validator = module.exports = exports = function Validator(){
}

Validator.create = function(){
    var o = new FormData();
    return o;
}




Validator.validat = function(FormData){

    return function(req, res, next){
    
        function vv(FormData){
        
            var _FormData = FormData;
            for (var fn in _FormData._vfs) {
                var vf = _FormData._vfs[fn];
                for (var i in vf) {
                    var v = vf[i];
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
                    
                        bool = vmethod(req.data[fn], v.params);
                    } 
                    catch (e) {
                        console.log(e)
                    }
                    if (bool) 
                        ;
                    else {
                        if (req.errmsg) 
                            ;
                        else {
                            req.errmsg = {};
                        }
                        if (req.errmsg[fn]) 
                            ;
                        else {
                            req.errmsg[fn] = [];
                        }
                        req.errmsg[fn].push(v.errmsg);
                    }
                    
                }
            }
            
        }
        
        
        
        req.data = {};
        var contentType = req.headers['content-type'];
        if (contentType && contentType.indexOf('multipart/form-data') != -1) {
            if (req.form) {
            
                //req.form.uploadDir = '/root/other'
                
                req.form.complete(function(err, fields, files){
                    if (err) {
                        vv(FormData);
                        next();
                    }
                    else {
                        req.data = fields;
                        
                        for (var fk in files) {
                            
                            var ss = files[fk].path.split('/');
                                                        
                            files[fk].path = ss[ss.length - 1];
                            
                            req.data[fk] = files[fk]
                            
                        }
                        
                        var d2 = {}
                        for(var k in FormData.fn){
                           var nn = FormData.fn[k];
                           d2[nn] = req.data[nn];
                        }
                                    
                        req.data = d2;
                        
                    }
                    vv(FormData);
                    next();
                });
            }
            else {
                vv(FormData);
                next();
            }
            
        }
        else {
            req.data = req.query;
            if (req.body) {
                for (var k in req.body) {
                    req.data[k] = req.body[k];
                }
            }
            
            var d2 = {}
            for(var k in FormData.fn){
               var nn = FormData.fn[k];
               d2[nn] = req.data[nn];
            }
                        
            req.data = d2;
            
            vv(FormData);
            next();
        }
        
        
    }
}

