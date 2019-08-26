import model from '../models';

const { RegMedicamentos } = model
const { GrupoDesignado } = model

class RegMedicamento{
    static createMedicamento(req, res){
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

          if(req.body.codificacion == "" || isNaN(req.body.codificacion)){
            if(req.body.codificacion == ""){
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
                    const {codificacion,nombre,generico,concentracion,unidadMedida,presentacion,precio,unidades } = req.body
                    
                    return RegMedicamentos
                    .create({
                      codificacion,
                      nombre,
                      generico,
                      concentracion,
                      unidadMedida,
                      presentacion,
                      precio,
                      unidades,
                      id_grupo_desig
                    })
                    .then(data => res.status(201).send({
                      success: true,
                      message: 'se registro Medicamento',
                      data
                    }))
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
        const { grupoAsig,codificacion,nombre,generico,concentracion,unidadMedida,presentacion,precio,unidades } = req.body
        return RegMedicamentos
          .findByPk(req.params.id)
          .then((data) => {
            data.update({
                grupoAsig: grupoAsig || data.grupoAsig,
                codificacion: codificacion || data.codificacion,
                nombre: nombre || data.nombre ,
                generico: generico || data.generico,
                concentracion: concentracion || data.concentracion,
                unidadMedida: unidadMedida || data.unidadMedida,
                presentacion: presentacion || data.presentacion,    
                precio: precio || data.precio,   
                unidades: unidades || data.unidades                  

            })
            .then(update => {
              res.status(200).send({
                message: 'Sala actualizado',
                data: {
                    grupoAsig: grupoAsig || update.grupoAsig,
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
            .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
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
          unidades : reduce || data.reduce 
        })
        .then(update => {
          res.status(200).json({
            message: 'Se a reducido',
            data:{
              unidades : reduce || update.reduce
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
      return RegMedicamentos
      .findByPk(id)
      .then((data) => {
        data.update({
          unidades : add || data.add 
        })
        .then(update => {
          res.status(200).json({
            success:true,
            message: 'Se añadio',
            data:{
              unidades : add || update.add
            }          
          })
        })
        .catch(error => res.status(400).json(error));
      })
      .catch(error => res.status(400).json(error));
          
   });      
  }
}
export default RegMedicamento;