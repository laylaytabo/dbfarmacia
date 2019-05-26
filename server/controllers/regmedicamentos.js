import model from '../models';

const { RegMedicamentos} = model

class RegMedicamento{
    static create(req, res){
        const { codigo,nombre,generico,unidad,presentacion,consentracion,id_grupodesignado} = req.body
        return RegMedicamentos
        .create({
            codigo,
            nombre,
            generico,
            unidad,
            presentacion,
            consentracion,
            id_grupodesignado
        })
        .then(data => res.status(201).send({
            message: 'se registro pedido',
            data
          }))
    }
    static ver(req, res) {
        return RegMedicamentos
          .findAll()
          .then(data => res.status(200).send(data));
      }
}
export default RegMedicamento;