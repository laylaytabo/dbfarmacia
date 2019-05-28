import model from '../models';
 
const { GrupoDesignado } = model
class GrupoDesignados {
    static createAsignacion(req,res){
        GrupoDesignado.findAll({
            where:{codigo : req.body.codigo},
            })
            .then((data)=> {
                if(data != ""){
                    res.status(400).json({
                        message : "ya existe ese codigo"
                    })
                }else{
                    const { codigo, descripcion } = req.body
                    return GrupoDesignado
                    .create({
                        codigo,
                        descripcion
                    })
                    .then(data => res.status(201).send({
                        message: 'se enviaron los daros a la tabla asignacion',
                        data
                    }))
                }
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
                message: 'Sala actualizado',
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
    
}
export default GrupoDesignados;