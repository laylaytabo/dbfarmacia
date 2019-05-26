import model from '../models';

const { SuministroHopi } = model

class SuministroHospi{
    static create(req, res){
        const { tipo_sumunistro,descripcion,cantidad,fecha,id_almacen} = req.body
        return SuministroHopi
        .create({
            tipo_sumunistro,
            descripcion,
            cantidad,
            fecha,
            id_almacen
        })
        .then(data => res.status(201).send({
            message: 'se registro pedido',
            data
          }))
    }
    static ver(req, res) {
        return SuministroHopi
          .findAll()
          .then(data => res.status(200).send(data));
      }
}
export default SuministroHospi;