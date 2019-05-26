import model from '../models';

const { Ventas } = model

class Venta{
    static create(req, res){
        const { cod_receta,nit,fecha,monto_total,descripcion,id_almacen} = req.body
        return Ventas
        .create({
            cod_receta,
            nit,
            fecha,
            monto_total,
            descripcion,
            id_almacen
        })
        .then(data => res.status(201).send({
            message: 'se registro pedido',
            data
          }))
    }
    static ver(req, res) {
        return Ventas
          .findAll()
          .then(data => res.status(200).send(data));
      }
}
export default Venta;