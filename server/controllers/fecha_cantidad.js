import model from '../models';

const { fecha_cantidad } = model

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
   

}
export default Fecha_Cantidad;