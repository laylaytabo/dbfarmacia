import model from '../models';
 
const { grupoasig} = model
class Asignacion {
    static createAsignacion(req,res){
        const { codigo, descripcion } = req.body
        return grupoasig
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
        return grupoasig
          .findAll()
          .then(grupoasig => res.status(200).send(grupoasig));
    }
}
export default Asignacion;