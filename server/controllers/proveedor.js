import model from '../models';
const fetch = require('node-fetch');

const { Proveedor} = model

class Proveedores{
  static createProveedor(req, res){
    const { nombre,email,direccion,telefono,empresa, id_personal } = req.body
    if ( !nombre || !email || !direccion || !telefono || isNaN(telefono) || !empresa || !id_personal ){
      if ( !nombre ){
        res.status(400).json({
          success: false,
          msg: " Inserte el nombre del proveedor "
        })
      }else if (!email){
        res.status(400).json({
          success: false,
          msg: " Inserte email del proveedor "
        })
      }else if(!direccion){
        res.status(400).json({
          success: false,
          msg: " Inserte direccion del proveedor "
        })
      }else if (!telefono){
        res.status(400).json({
          success: false,
          msg: " Inserte el telefeno del proveedor "
        })
      }else if ( !empresa ){
        res.status(400).json({
          success: false,
          msg: " Inserte la empresa del proveedor "
        })
      }else if (!id_personal){
        res.status(400).json({
          success: false,
          msg: " No se esta mandando el id del personal "
        })
      }else if (isNaN(telefono)){
        res.status(400).json({
          success: false,
          msg: " Telefono solo puede contener nuemeros "
        })
      }
    }else{
      return Proveedor
      .findAll({
        where:{ email: email }
      })
      .then(data => {
        if ( data != ""){
          res.status(400).json({
            success:false,
            msg: "Ese email ya se registro"
          })
        }else{
          fetch('http://localhost:3600/api/personal/'+id_personal)  // esto es para sacar el token del usuario
          .then(resp => resp.json())
          .then(resp => {
              if(resp == "" || resp.length == 0){
                  res.status(400).json({
                      success:false,
                      message:"Ese personal no existe"
                  })
              }else{
                return Proveedor
                .create({
                  nombre,
                  email,
                  direccion,
                  telefono,
                  empresa,
                  id_personal
                })
                .then(data => res.status(201).send({
                  success:true,
                  msg: 'se registro pedido',
                  data
                }))
              }
          })
          
        }
      });
      
    }
      
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
                success:true,
                msg: 'Se actualizo los datos',
                data: {
                    nombre: nombre || update.nombre ,
                    email: email || update.email,
                    direccion: direccion || update.direccion,                
                    telefono: telefono || update.telefono,
                    empresa: empresa || update.empresa,  
                }
              })
            })
            .catch(error => {
              console.log(error)
              res.status(400).json({
                success:false,
                msg:"No se pudo actualizar los datos"
              })
            });
          })
          .catch(error => {
            console.log(error)
            res.status(500).json({
              success:false,
              msg:"No se pudo actualizar los datos"
            })
          });
      }
}
export default Proveedores;