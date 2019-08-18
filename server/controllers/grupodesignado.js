import model from '../models';
 
const { GrupoDesignado } = model
class GrupoDesignados {
    static createAsignacion(req,res){
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
            const { codigo, descripcion } = req.body
                return GrupoDesignado
                .create({
                    codigo,
                    descripcion
                })
                .then(data => res.status(201).send({
                    message: 'Datos Insertados',
                    data
                }))
               /*  return res.json({
                    success: false,
                    message : " si paso "
                }) */
        });
       
    }
    static verAsignacion(req, res) {
        return GrupoDesignado
          .findAll()
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
                      res.status(200).send({
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