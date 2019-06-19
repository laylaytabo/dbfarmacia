import model from '../models';

const { distribuciones } = model

class Distribucion{
    static createDist(req, res){
        const { codigo,responsable,recibe,fechaLlegada,productos } = req.body
        return distribuciones
        .create({
            codigo,
            responsable,
            recibe,
            fechaLlegada,
            productos
        })
        .then(data => res.status(201).send({
            message: 'se incerto en distribucion',
            data
          }))
    }
    static verDist(req, res) {
        return distribuciones
          .findAll()
          .then(data => res.status(200).send(data));
    }
    //serv para poder ver una sola distribucion
    static onlyDist(req,res){
        const { id } = req.params
        distribuciones.findAll({
            where: { id: id }
        })
        .then((data) => {
            res.status(200).json(data);
        })
    }

    //serv para poder eliminar
    static delete(req, res) {
        const { id } = req.params
        return distribuciones
          .findByPk(id)
          .then(distribuciones => {
            if(!distribuciones) {
              return res.status(400).send({
              message: 'NO hay nada que eliminar',
              });
            }
            return distribuciones
              .destroy()
              .then(() => res.status(200).send({
                message: 'Se elimino con exito'
              }))
              .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error))
    }

}

export default Distribucion;