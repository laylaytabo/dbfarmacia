import model from '../models';

const sequelize = require('sequelize');

const Op = sequelize.Op;

const { distribuciones } = model

class Distribucion{
    static createDist(req, res){
      console.log(req.body, "  <<<<<<<<<<<<<<<<<<<<<<asdasd")
      if(isNaN(req.body.codigo) ){
        console.log("esto es lo de los numeros")
        res.status(400).json({
          success: false,
          msg: "Codigo no puede contener letrar u otro caracter que no sea numero"
        })
      }else if(!req.body.fechaLlegada){
        res.status(400).json({
          success: false,
          msg: "Inserte una fecha por favor"
        })
      }else if ( !req.body.id_personal ){
        res.status(400).json({
          success:false,
          msg: "No se esta mandando el id del personal"
        })
      }else {
        distribuciones.findAll({
          where: { codigo: req.body.codigo }
        })
        .then((data) => {
          if(data == "" ){
            const { codigo,responsable,recibe,fechaLlegada,productos, id_personal } = req.body
            return distribuciones
            .create({
                codigo,
                responsable,
                recibe,
                fechaLlegada,
                productos,
                id_personal
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

    static filter_data_list(req, res) {
      const { fecha_inicio, fecha_final, id_personal }  = req.body
      if(!fecha_final || !fecha_inicio || ! id_personal){
        res.status(400).json({
            success:false,
            msg:"Inserte fecha inicio y fecha final y el personal para poder buscar un rago de fechas"
        })
      }else{
        var _q = distribuciones;
        _q.findAll({
        where: {[Op.and]: [{id_personal: {[Op.eq]: id_personal}}, {createdAt: {[Op.gte]: fecha_inicio }}, {createdAt: {[Op.lt]: fecha_final }}]},
        })
        .then(datas => {
          if(datas == ""){
            res.status(400).json({
                success:false,
                msg:"No hay nada que mostrar"
            })
        }else{
            res.status(200).json(datas)
        }
        });
      }
    }
}

export default Distribucion;