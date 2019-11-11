import model from '../models';

const { fecha_cantidad } = model
const { RegMedicamentos } = model

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
   

}
export default Fecha_Cantidad;