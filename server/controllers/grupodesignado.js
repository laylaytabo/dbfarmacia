import model from '../models';
const fetch = require('node-fetch');


const { GrupoDesignado } = model
class GrupoDesignados {
    static createAsignacion(req,res){
        const { codigo, descripcion,id_personal } = req.body
        if(!codigo || !descripcion || !id_personal){
            if(!codigo){
                res.status(400).json({
                    success:false,
                    message: "Inserte un codigo por favor"
                })
            }else if (!descripcion){
                res.status(400).json({
                    success:false,
                    message:"Inserte una descripcion por favor"
                })
            }else if (!id_personal){
                res.status(400).json({
                    success:false,
                    message:"El id del personal no se esta mandando"
                })
            }
        }else{
            fetch('http://localhost:3600/api/personal/'+id_personal)  // esto es para sacar el token del usuario
            .then(resp => resp.json())
            .then(resp => {
                if(resp == "" || resp.length == 0){
                    res.status(400).json({
                        success:false,
                        message:"Ese personal no existe"
                    })
                }else{
                    return GrupoDesignado
                    .findAll()
                    .then((data)=> {
            
                        for(var i = 0; i < data.length; i++ ){
                            if(data[i].codigo == req.body.codigo){
                              /*   res.status(400).json({
                                    success: false,
                                    message : "Ya existe ese Codigo"
                                }) */
                                return res.json({
                                    success: false,
                                    message : "Ya existe ese Codigo"
                                })
                            }else if(data[i].descripcion == req.body.descripcion){
                                return res.json({
                                    success: false,
                                    message : "Ya existe esa Descripcion"
                                })
                            }
                        }
                        
                        return GrupoDesignado
                        .create({
                            codigo,
                            descripcion,
                            id_personal
                        })
                        .then(data => res.status(201).send({
                            success:true,
                            message: 'Datos Insertados',
                            data
                        }))
                        .catch(error => {
                            console.log(error);
                            res.status(400).json({
                                success:false,
                                message:"No se pude insertar los datos",
                                error
                            })
                        })
                    });
                }
            })
           
        }
       

    }
    static verAsignacion(req, res) {
        return GrupoDesignado
          .findAll()
          .then(grupoasig => res.status(200).send(grupoasig));
    }
    static verAsignacion_data(req, res) {
        return GrupoDesignado
          .findAll({
              attributes:['id','descripcion','codigo']
          })
          .then(grupoasig => res.status(200).send(grupoasig));
    }
     //Servico para mostrar un grupo designacion para actualizar
     static onlyGPA(req, res){
        var id = req.params.id;
        GrupoDesignado.findAll({
           where: {id: id}
           //attributes: ['id', ['description', 'descripcion']]
         }).then((data) => {
           res.status(200).json(data);
        });
    }
    //servicio para actualizar
    static updateGPA(req, res) {

        return GrupoDesignado

        .findAll()
        .then((data)=> {
            var msg1,msg2;
            for(var i = 0; i < data.length; i++ ){
                if(data[i].codigo == req.body.codigo){

                    msg1 = "ya existe ese cod"
                    break;

                }else if(data[i].descripcion == req.body.descripcion){

                    msg2 = "ya hay esa descripcion"
                    break;

                }
            }

            if(msg1 == "ya existe ese cod"  || msg2 == "ya hay esa descripcion" ){
                console.log("no paso",msg1 ," sds ", msg2)
                if (msg1 == "ya existe ese cod"){
                     return res.json({
                        success: false,
                        message : "Ya existe ese Codigo"
                    })
                }else if(msg2 == "ya hay esa descripcion"){
                    return res.json({
                        success: false,
                        message : "Ya existe esa descripcion"
                    })
                }
                msg1 = ""
                msg2 = ""

            }else{
                const { codigo, descripcion } = req.body
                return GrupoDesignado
                  .findByPk(req.params.id)
                  .then((data) => {
                    data.update({
                        codigo: codigo || data.codigo,
                        descripcion: descripcion || data.descripcion
                    })
                    .then(update => {
                      return res.json({
                        success: true,
                        message: 'Datos Actualizados',
                        data: {
                            codigo: codigo || dataupdate.codigo,
                            descripcion: descripcion || update.descripcion
                        }
                      })
                    })
                    .catch(error => res.status(400).send(error));
                  })
                  .catch(error => res.status(400).send(error));
            }
        });

    }

}
export default GrupoDesignados;
