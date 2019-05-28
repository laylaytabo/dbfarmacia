import model from '../models';

const { RegMedicamentos } = model

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
    //serv para mostar todos los medicamentos
    static verMedicamento(req, res) {
        return RegMedicamentos
          .findAll()
          .then(data => res.status(200).send(data));
    }

    //ser para mostar un solo medicamento
    static onlyMedicamento(req, res){                
        var id = req.params.id;  
        RegMedicamentos.findAll({
           where: {id: id}
           //attributes: ['id', ['description', 'descripcion']]
         }).then((data) => {
           res.status(200).json(data);
        });     
    }

    //serv para actualizar medicamento
    static updateMedicamento(req, res) {
        const { grupoAsig,codificacion,nombre,generico,concentracion,unidadMedida,presentacion,fechaLLEgada,fechaVencimiento,cantidad,precio } = req.body
        return RegMedicamentos
          .findByPk(req.params.id)
          .then((data) => {
            data.update({
                grupoAsig: grupoAsig || data.grupoAsig,
                codificacion: codificacion || data.codificacion,
                nombre: nombre || data.nombre ,
                generico: generico || data.generico,
                concentracion: concentracion || data.concentracion,
                unidadMedida: unidadMedida || data.unidadMedida,
                presentacion: presentacion || data.presentacion,
                fechaLLEgada: fechaLLEgada || data.fechaLLEgada,
                fechaVencimiento: fechaVencimiento || data.fechaVencimiento,
                cantidad: cantidad || data.cantidad,
                precio: precio || data.precio                      
            })
            .then(update => {
              res.status(200).send({
                message: 'Sala actualizado',
                data: {
                    grupoAsig: grupoAsig || update.grupoAsig,
                    codificacion: codificacion || update.codificacion,
                    nombre: nombre || update.nombre ,
                    generico: generico || update.generico,
                    concentracion: concentracion || update.concentracion,
                    unidadMedida: unidadMedida || update.unidadMedida,
                    presentacion: presentacion || update.presentacion,
                    fechaLLEgada: fechaLLEgada || update.fechaLLEgada,
                    fechaVencimiento: fechaVencimiento || update.fechaVencimiento,
                    cantidad: cantidad || update.cantidad,
                    precio: precio || update.precio     
                }
              })
            })
            .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
}
export default RegMedicamento;