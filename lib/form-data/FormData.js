function FormData(){
    this.schema = null;
    this.vos = {};
    this.cos = {};
}

FormData.prototype.convert = function(name,co,cm){
    this.cos[name] = {converter:co,err:cm};
    return this;
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

