var Builder = require("./Builder");

function FormData(){
    this.bootvnum = false;
    this.validatnumerr = "validat number error ! ";
    this.schema = null;
    this.vos = {};
    this.cos = {};
    this.uploadDir = "/tmp";
}

FormData.prototype.convert = function(name,co,cm){
    this.cos[name] = {converter:co,err:cm};
    return this;
}

FormData.prototype.validatnum = function(bool,err){
    this.bootvnum = bool;
    this.validatnumerr = err;
}

FormData.prototype.validat = function(fieldname, validat, params, errmsg){
    if (!this.vos[fieldname]) {
        this.vos[fieldname] = []
    }
    this.vos[fieldname].push({
        validat: validat,
        params: params,
        errmsg: errmsg
    });
    return this;
}

FormData.prototype.schema = function(schema){
    if(typeof schema === "array"){
        this.schema = schema;
    }
}

FormData.prototype.build = function(){    
    return Builder(this);
}

module.exports = exports = FormData;
