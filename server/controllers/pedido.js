import model from '../models';

const { Pedido } = model
const { Proveedor} = model
class Pedidos{
    static createPedido(req, res){
        Proveedor.findOne({
            where:{ nombre : req.body.proveedor },
            })
            .then((data)=> {

                var idProveedor = data.id

                console.log(idProveedor, "esto es el resultado")
                const { codigoCompra,boletaPago,tipoMaterial,fechaIngreso,proveedor,productosDelPedido,Observaciones,subTotal,iva,total } = req.body
                var id_proveedor = idProveedor
                return Pedido
                .create({
                    codigoCompra,
                    boletaPago,
                    tipoMaterial,
                    fechaIngreso,
                    proveedor,
                    productosDelPedido,
                    Observaciones,
                    subTotal,
                    iva,
                    total,
                    id_proveedor
                })
                .then(data => res.status(201).send({
                    message: 'se registro pedido',
                    data
                  })) 
            }) 
    }

    static verPedidos(req, res) {
        return Pedido
          .findAll()
          .then(data => res.status(200).send(data));
      }
}
export default Pedidos;