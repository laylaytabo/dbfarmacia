import model from '../models';

const { distribuciones } = model

class Distribucion{
    static createDist(req, res){
      if(isNaN(req.body.codigo) ){
        console.log("esto es lo de los numeros")
        res.status(400).json({
          success: false,
          msg: "Codigo no puede contener letrar u otro caracter que no sea numero"
        })
      }else if(req.body.fechaLlegada == ""){
        res.status(400).json({
          success: false,
          msg: "Inserte una fecha por favor"
        })
      }else{
        distribuciones.findAll({
          where: { codigo: req.body.codigo }
        })
        .then((data) => {
          if(data == "" ){
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
              success: true,
              msg: 'Se incerto una distribucion',
              data
            }))
          }else{
            res.status(400).json({
              success: false,
              msg: "Ese codigo ya esta en uso por favor inserte otro codigo"
            })
          } 
            
        })

        
      }
        
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