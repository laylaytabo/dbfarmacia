import model from '../models';

const { RegMedicamentos} = model

class RegMedicamento{
    static createMedicamento(req, res){
        const { grupoAsig,codificacion,nombre,generico,concentracion,unidadMedida,presentacion,fechaLLEgada,fechaVencimiento,cantidad,precio } = req.body
        return RegMedicamentos
        .create({
            grupoAsig,
            codificacion,
            nombre,
            generico,
            concentracion,
            unidadMedida,
            presentacion,
            fechaLLEgada,
            fechaVencimiento,
            cantidad,
            precio
        })
        .then(data => res.status(201).send({
            message: 'se registro Medicamento',
            data
          }))
    }
    static verMedicamento(req, res) {
        return RegMedicamentos
          .findAll()
          .then(data => res.status(200).send(data));
      }
}
export default RegMedicamento;