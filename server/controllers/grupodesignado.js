import model from '../models';
 
const { GrupoDesignado} = model
class GrupoDesignados {
    static createAsignacion(req,res){
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
    static verAsignacion(req, res) {
        return GrupoDesignado
          .findAll()
          .then(grupoasig => res.status(200).send(grupoasig));
    }
}
export default GrupoDesignados;