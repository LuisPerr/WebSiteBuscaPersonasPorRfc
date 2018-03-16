var PersonaView = require('../views/reference'),
    PersonaModel = require('../models/dataAccess');

var personas = function (conf) {
    this.conf = conf || {};
    this.view = new PersonaView();
    this.model = new PersonaModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

/*/api/personas/personasrfc
Funcionalidad de traer una persona con su RFC*/
personas.prototype.get_personasrfc = function (req, res, next) {
    var respuesta = {
        success: 0,
        msg: '',
        data: []
    };
    var self = this;

    var clienteRfc = req.query.clienteRfc;

    var params = [
        { name: 'clienteRfc', value: clienteRfc, type: self.model.types.STRING }
    ];
    console.log("Params", params);
    this.model.query('[dbo].[Rfc_getPersonaByRFC_SP]', params, function (error, result) {
        
        try{
            if( result.length > 0 ){
                respuesta.success = 1;
                respuesta.msg = 'Registro encontrado.';
                respuesta.data = result[0];
            }else{
                respuesta.success = 0;
                respuesta.msg = 'No se encontro ningun registro con para ese el RFC ' + clienteRfc;
            }
        }
        catch(e){
            respuesta.success = 0;
            respuesta.msg = 'No se encontro ningun registro con para ese el RFC ' + clienteRfc;
        }
        self.view.expositor(res, {
            error: error,
            result: respuesta,
        });
    });
};

module.exports = personas;
