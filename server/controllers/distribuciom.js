import model from '../models';

const { distribucion } = model

class Distribuciones{
    static distribucion(req, res){
        const { codigo,responsable,recibe,fechaLlegada } = req.body
        return distribucion
        .create({
            codigo,
            responsable,
            recibe,
            fechaLlegada 
        })
        .then(data => res.status(201).send({
            message: 'se registro pedido',
            data
          }))
    }
    static listDistribucion(req, res) {
        return distribucion
          .findAll()
          .then(data => res.status(200).send(data));
    }
}

export default Distribuciones;