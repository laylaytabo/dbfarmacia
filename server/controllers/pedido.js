import model from '../models';

const { Pedido } = model
const { Proveedor} = model
class Pedidos{
    static createPedido(req, res){
      console.log(req.body.codigoCompra)
      if(req.body.codigoCompra != ""){
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
                success: true,
                message: 'se registro pedido',
                data
              })) 
          }) 
      }else{
        res.status(400).json({
          success: false,
          message: "Llene codigo por favor"
        })
      }
      
    }
    //listar los pedidos
    static verPedidos(req, res) {
        return Pedido
          .findAll()
          .then(data => res.status(200).send(data));
    }

    //ver solo un pedido
    static OnlyPedido(req,res){
        const { id } = req.params;
        Pedido.findAll({
            where:{ id : id }
        })
        .then((data) => {
            res.status(200).json(data)
        })
    }

    //Borrar un pedido
    static deletePedido(req, res) {
        const { id } = req.params
        return Pedido
          .findByPk(id)
          .then(Pedido => {
            if(!Pedido) {
              return res.status(400).send({
              message: 'NO hay nada que eliminar',
              });
            }
            return Pedido
              .destroy()
              .then(() => res.status(200).send({
                message: 'Se elimino con exito'
              }))
              .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error))
    }
    
}
export default Pedidos;