import model from '../models';

const { Pedido } = model

class Pedidos{
    static createPedido(req, res){
        const { cantidad,fecha,descripcion,id_proveedor} = req.body
        return Pedido
        .create({
            cantidad,
            fecha,
            descripcion,
            id_proveedor
        })
        .then(data => res.status(201).send({
            message: 'se registro pedido',
            data
          }))
    }
    static verPedidos(req, res) {
        return Pedido
          .findAll()
          .then(data => res.status(200).send(data));
      }
}
export default Pedidos;