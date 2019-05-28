import model from '../models';

const { Proveedor} = model

class Proveedores{
    static createProveedor(req, res){
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
    static verproveedor(req, res) {
        return Proveedor
          .findAll()
          .then(data => res.status(200).send(data));
      }
    
      //serv para mostrar un solo proveedor
      static onlyProveedor(req, res){                
        var id = req.params.id;  
        Proveedor.findAll({
           where: {id: id}
           //attributes: ['id', ['description', 'descripcion']]
         }).then((data) => {
           res.status(200).json(data);
        });     
    }

    //ser para actualizar proveedor
    static updateMedicamento(req, res) {
        const { nombre,email,direccion,telefono,empresa } = req.body
        return Proveedor
          .findByPk(req.params.id)
          .then((data) => {
            data.update({
                nombre: nombre || data.nombre ,
                email: email || data.email,
                direccion: direccion || data.direccion,                
                telefono: telefono || data.telefono,
                empresa: empresa || data.empresa,                 
            })
            .then(update => {
              res.status(200).send({
                message: 'Sala actualizado',
                data: {
                    nombre: nombre || update.nombre ,
                    email: email || update.email,
                    direccion: direccion || update.direccion,                
                    telefono: telefono || update.telefono,
                    empresa: empresa || update.empresa,  
                }
              })
            })
            .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
}
export default Proveedores;