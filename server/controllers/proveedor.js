import model from '../models';

const { Proveedor} = model

class Proveedores{
    static create(req, res){
        const { nombre,email,direccion,telefono,empresa} = req.body
        return Proveedor
        .create({
            nombre,
            email,
            direccion,
            telefono,
            empresa
        })
        .then(data => res.status(201).send({
            message: 'se registro pedido',
            data
          }))
    }
    static ver(req, res) {
        return Proveedor
          .findAll()
          .then(data => res.status(200).send(data));
      }
}
export default Proveedores;