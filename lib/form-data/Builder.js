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
    
    var cos = formdata.cos;
    var vos = formdata.vos;
    var schema = formdata.schema;    
    
    return function(req,res,next){
        
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
                        bool = vmethod(req.data[vk], v.params);
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
                        if (req.errmsg[vk]){}
                        else {
                            req.errmsg[vk] = [];
                        }
                        req.errmsg[fn].push(v.errmsg);
                    }
                    
                }
            }
            
            next();
            
        }
        
}
