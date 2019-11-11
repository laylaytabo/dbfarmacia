import model from '../models';
const fetch = require('node-fetch');

const { Pedido } = model
const { Proveedor} = model
class Pedidos{
    static createPedido(req, res){
      console.log(req.body.codigoCompra, "esto es el resultado  12121212123123123123")
      
      if (!req.body.proveedor){
        res.status(400).json({
          success:false,
          message:"Inserte nombre del proveedor"
        })
      }else{
        Proveedor.findOne({
          where:{ nombre : req.body.proveedor },
          })
          .then((data)=> {
            if (!data){
              res.status(400).json({
                success:false,
                message:"No existe ese proveedor"
              })
            }else{
              var idProveedor = data.id
              console.log(idProveedor, "esto es el resultado")
              const { codigoCompra,boletaPago,responsable,fechaIngreso,proveedor,productosDelPedido,ProductosAceptados,Observaciones,subTotal,iva,total,id_personal } = req.body
              if ( !codigoCompra || isNaN(codigoCompra) || !boletaPago || !responsable || !fechaIngreso ){
                if (!codigoCompra){
                  res.status(400).json({
                    success:false,
                    message:" LLene el codigo de la compra "
                  })
                }else if (isNaN(codigoCompra)){
                  res.status(400).json({
                    success:false,
                    message:"Codigo de compra solo puede contener numeros"
                  })
                }else if (!boletaPago){
                  res.status(400).json({
                    success:false,
                    message:"Selecione boleta de pago"
                  })
                }else if (!responsable){
                  res.status(400).json({
                    success:false,
                    message:"No se esta mandando el nombre del responsable"
                  })
                }else if (!fechaIngreso){
                  res.status(400).json({
                    success:false,
                    message:"fecha es obligatorio"
                  })
                }else if (!id_personal){
                  res.status(400).json({
                    success:false,
                    message:"No se esta mandando el id del personal "
                  })
                }
                
              }else{
                var id_proveedor = idProveedor
                return Pedido
                .findAll({
                  where:{ codigoCompra : codigoCompra }
                })
                .then(data => {
                  fetch('http://localhost:3600/api/personal/'+id_personal)  // esto es para sacar el token del usuario
                      .then(resp => resp.json())
                      .then(resp => {
                        if(resp == "" || resp.length == 0){
                          res.status(400).json({
                            success:false,
                            message:"Ese personal no existe"
                          })
                        }else{
                          if (data == ""){
                            return Pedido
                            .create({
                                codigoCompra,
                                boletaPago,
            
                                responsable,
            
                                fechaIngreso,
                                proveedor,
                                productosDelPedido,
                                ProductosAceptados,
                                Observaciones,
                                subTotal,
                                iva,
                                total,
                                id_proveedor,
                                id_personal
                            })
                            .then(data => res.status(201).send({
                              success: true,
                              message: 'Se registro pedido',
                              data
                            }))                      
                            }else{
                            res.status(400).json({
                              success:false,
                              message:"Ya existe ese codigo"
                            })
                          }
                        }
                      })
                  
                });
                
              }
              
            }
              
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

  static updatePedido(req, res) {
    const { ProductosAceptados } = req.body
    return Pedido
      .findByPk(req.params.id)
      .then((data) => {
        data.update({
          ProductosAceptados: ProductosAceptados || data.ProductosAceptados              
        })
        .then(update => {
          res.status(200).send({
            success: true,
            msg: 'Se actualizo en pedidos',
            data: {
              ProductosAceptados: ProductosAceptados || update.ProductosAceptados
            }
          })
        })
        .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
    
}
export default Pedidos;