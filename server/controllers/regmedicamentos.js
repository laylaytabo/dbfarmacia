import model from '../models';
const fetch = require('node-fetch');

const { RegMedicamentos } = model
const { GrupoDesignado } = model

class RegMedicamento{
  static createMedicamento(req, res){
      if (!req.body.grupoAsig){
        res.status(400).json({
          success:false,
          msg:"No se seleciono grupo Asignacion"
        })
      }else{
        
      
      GrupoDesignado.findAll({
        where: { descripcion: req.body.grupoAsig }
        //attributes: ['id', ['description', 'descripcion']]
      }).then((data) => {
        //console.log(data[0].id)
        var id_grupo_desig = data[0].id
        if(!data){
          res.status(400).json({
            success: false,
            msg: "No existe Designacion"
          })
        }else{

          if(!req.body.codificacion || isNaN(req.body.codificacion)){
            if(!req.body.codificacion){
              res.status(400).json({
                success : false,
                msg : "La codificacion no puede estar vacío "
              })
            }else if(isNaN(req.body.codificacion)){
              res.status(400).json({
                success : false,
                msg : "La codificacion solo puede contener numeros "
              })
            }
            
          }else if(!req.body.nombre){
            res.status(400).json({
              success : false,
              msg : "El nombre del medicamento no puede ir vacío"
            })
          }else{
            RegMedicamentos.findAll({
              where: { nombre: req.body.nombre }
            }).then((data) => {
              console.log(data, "  <<<< esto es lo que quiero")
              if(data != ""){
                res.status(400).json({
                  success : false,
                  msg : "Ya existe ese medicamento"
                })
              }else if(req.body.precio || req.body.unidades){
                RegMedicamentos.findAll({
                  where: { codificacion : req.body.codificacion }
                }).then((data) => {
                  if(data != ""){
                    res.status(400).json({
                      success : false,
                      msg : "Ya existe esa Codificacion"
                    })
                  }else{
                    const {codificacion,nombre,generico,concentracion,unidadMedida,presentacion,precio,unidades,id_personal } = req.body
                    if (!id_personal){
                      res.status(400).json({
                        success:false,
                        msg: "No se esta mandando el identificacor del personal"
                      })
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
                            var ventas = 0;
                            var entradas = 0;
                            var cantidad_inicial = unidades
                            return RegMedicamentos
                            .create({
                              codificacion,
                              nombre,
                              generico,
                              concentracion,
                              unidadMedida,
                              presentacion,
                              precio,
      
                              cantidad_inicial, // esta es la cantidad del producto lo que queda en stock
                              entradas, // esto es los pedidos o las entradas del producto
                              unidades, // esto es la cantidad que hay al momento de registrar el producto
      
                              ventas, // esto es el numero de ventas que se realizo del producto
      
                              id_grupo_desig,
                              id_personal
                            })
                            .then(data => res.status(201).send({
                              success: true,
                              msg: 'se registro Medicamento',
                              data
                            }))
                          }
                      })
                      
                    }
                    
                  }
                })               
              }else{
                res.status(200).json({
                  success : false,
                  msg : "Los campos de Precio o unidades no pueden ir vacío"
                })
              }
            })
          }
          
        } 
        
        
     });
    }
  }
    //serv para mostar todos los medicamentos
    static verMedicamento(req, res) {
      RegMedicamentos.findAll({
        include:[{
          model:GrupoDesignado
        }]
        //attributes: ['id', ['description', 'descripcion']]
      }).then((data) => {
        res.status(200).json(data);
     });   
    }

    //ser para mostar un solo medicamento
    static onlyMedicamento(req, res){                
        var id = req.params.id;  
        RegMedicamentos.findAll({
           where: {id: id},
           //attributes: ['id', ['description', 'descripcion']]
           include:[{
             model:GrupoDesignado
           }]
         }).then((data) => {
           res.status(200).json(data);
        });     
    }

    //serv para actualizar medicamento
    static updateMedicamento(req, res) {
      const { id_grupo_desig,codificacion,nombre,generico,concentracion,unidadMedida,presentacion,precio,unidades } = req.body
      
      return RegMedicamentos
        .findByPk(req.params.id)
        .then((data) => {
          data.update({
            id_grupo_desig: id_grupo_desig || data.id_grupo_desig,
            codificacion: codificacion || data.codificacion,
            nombre: nombre || data.nombre,
            generico: generico || data.generico,
            concentracion: concentracion || data.concentracion,
            unidadMedida: unidadMedida || data.unidadMedida,
            presentacion: presentacion || data.presentacion,    
            precio: precio || data.precio,   
            unidades: unidades || data.unidades  
          })
          .then(update => {
            res.status(200).send({
              success:true,
              msg: 'Se actualizo los datos',
              data: {
                id_grupo_desig: id_grupo_desig || update.id_grupo_desig,
                codificacion: codificacion || update.codificacion,
                nombre: nombre || update.nombre ,
                generico: generico || update.generico,
                concentracion: concentracion || update.concentracion,
                unidadMedida: unidadMedida || update.unidadMedida,
                presentacion: presentacion || update.presentacion,  
                precio: precio || update.precio,  
                unidades: unidades || update.unidades
              }
            })
          })
          .catch(error => {
            console.log(error);
            res.status(400).json({
              success:false,
              msg: "No se pudo actualizar los datos",
              error
            })
          });
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
            success:false,
            msg: "No se pudo actualizar los datos",
            error
          })
        });
    }

  //servicio para reducir items segun su id
  static reduce(req,res){
    const { id } = req.params;
    const { unidades } = req.body;
    RegMedicamentos.findAll({
      where:{ id:id }
    })
    .then((data) => {
      var reduce = data[0].unidades - unidades ;
      var ventas = data[0].ventas + unidades
      if(reduce < 0){
        res.status(200).json({
          message: " no hay cantidad suficiente para reducir solo hay: ",
          items:  data[0].unidades
        })
      }else{
        return RegMedicamentos
      .findByPk(id)
      .then((data) => {
        data.update({
          unidades : reduce || data.reduce,
          ventas: ventas || data.ventas
        })
        .then(update => {
          res.status(200).json({
            message: 'Se a reducido',
            data:{
              unidades : reduce || update.reduce,
              ventas: ventas || update.ventas
            }          
          })
        })
        .catch(error => res.status(400).json(error));
      })
      .catch(error => res.status(400).json(error));
      }      
   });      
  }

  static add_Unidad(req,res){
    const { id } = req.params;
    const { unidades } = req.body;
    RegMedicamentos.findAll({
      where:{ id:id }
    })
    .then((data) => {
      var add = data[0].unidades + unidades ;   
      var entradas = data[0].entradas + unidades ;  
      return RegMedicamentos
      .findByPk(id)
      .then((data) => {
        data.update({
          unidades : add || data.add,
          entradas : entradas || data.entradas 
        })
        .then(update => {
          res.status(200).json({
            success:true,
            message: 'Se añadio',
            data:{
              unidades : add || update.add,
              entradas : entradas || update.entradas 
            }          
          })
        })
        .catch(error => res.status(400).json(error));
      })
      .catch(error => res.status(400).json(error));
          
   });      
  }

    //serv para mostar todos los medicamentos
    static mostrar_med(req, res) {
      const { id_grupo } = req.body;
      if (!id_grupo){
        res.status(400).json({
          success:false,
          msg:"Selecione grupo por favor"
        })
      }else{
        RegMedicamentos.findAll({
          where:{ id_grupo_desig: id_grupo },
          include:[{
            model:GrupoDesignado
          }]
          //attributes: ['id', ['description', 'descripcion']]
        }).then((data) => {
          if(data == ""){
            res.status(400).json({
              success:false,
              msg:"No hay medicamentos en ese grupo"
            })
          }else{
            res.status(200).json(data);
          }
          
        });  
      }
       
    }
  
}
export default RegMedicamento;