import model from '../models';

const { Almacen } = model

class Almacenes{
    static createAlm(req, res){
        const { stock,id_grupodesignado} = req.body
        return Almacen
        .create({
            stock,
            id_grupodesignado
        })
        .then(data => res.status(201).send({
            message: 'se envio datos a la tabla almacen',
            data
          }))
    }
    static verAlm(req, res) {
        return Almacen
          .findAll()
          .then(data => res.status(200).send(data));
      }
}
export default Almacenes;