import model from '../models';
import RegMedicamento from './regmedicamentos';

const sequelize = require('sequelize');

const Op = sequelize.Op;

const { fecha_cantidad } = model
const { RegMedicamentos } = model
const { GrupoDesignado } = model

class Fecha_Cantidad{
    static cerateFecha_Cantidad(req,res){
        
        const { codigo_compra,fehca_vencimineto,cantidad_unidad,precio } = req.body
        const { id_medicamento } = req.params
        return fecha_cantidad
        .create({
            codigo_compra,
            fehca_vencimineto,
            cantidad_unidad,
            precio,
            id_medicamento
        })
        .then(data => res.status(201).send({
            success: true,
            message: 'Se registro fecha y cantidad',
            data
        })) 
    }
    static VerFechaCantidad(req, res) {
        return fecha_cantidad
        .findAll()
        .then(data => res.status(200).send(data));
    }
    static  listMedicamentos(req,res){
        const { id_medicamento } = req.params
        fecha_cantidad.findAll({
            where: { id_medicamento : id_medicamento }
        })
        .then((data) => {
            res.status(200).json(data);
        })
    }

    static list_med_fechas(req, res) {
        return fecha_cantidad
        .findAll({
            include:[{
                model: RegMedicamentos 
            }]
        })
        .then(data => res.status(200).send(data));
    }

    static list_med_fechas_id(req, res) {
        const { id_fecha } = req.params
        return fecha_cantidad
        .findAll({
            where:{ id : id_fecha }
        })
        .then(data => {
            if(data == ""){
                res.status(400).json({
                    success:false,
                    message:"No existe"
                })
            }else{
                res.status(200).json(data)
            }
        });
    }
    static reduce_fecha_cantidad(req,res){
        const { id } = req.params;
        const { cantidad_unidad } = req.body;
        fecha_cantidad.findOne({
            where:{ id : id }
        })
        .then((data) => {

            var reduce = data.cantidad_unidad - cantidad_unidad ;
            
            if(reduce < 0){
              res.status(200).json({
                message: " no hay cantidad suficiente para reducir solo hay: ",
                items:  data.cantidad_unidad
              })
            }else{
            return fecha_cantidad
            .findByPk(id)
            .then((data) => {
                data.update({
                  cantidad_unidad : reduce    
                })
                .then(update => {
                    res.status(200).json({
                        message: 'Se a reducido',
                        data:{
                            cantidad_unidad : reduce               
                        }          
                    })
                })
                .catch(error => res.status(400).json(error));
            })
            .catch(error => res.status(400).json(error));
            }      
        });      
    }

    static filter_data_med_grupo(req, res) {      
        console.log(req.body, "  <<<<<<<<<<<<<<<<<<<<<<<<< saddasd")
        const { fecha_inicio, fecha_final, id_medicamento }  = req.body
        if(!fecha_final || !fecha_inicio || ! id_medicamento){
            res.status(400).json({
                success:false,
                msg:"Inserte fecha inicio y fecha final y el personal para poder buscar un rago de fechas"
            })
        }else{
            var _q = fecha_cantidad;
            _q.findAll({
                where: {[Op.and]: [{id_medicamento: {[Op.eq]: id_medicamento}}, {createdAt: {[Op.gte]: fecha_inicio }}, {createdAt: {[Op.lte]: fecha_final }}]},
                include:[{
                    model: RegMedicamentos, attributes:['id', 'nombre'] 
                }]
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
export default Fecha_Cantidad;