////lo nuevo de farmacia
import Almacenes from '../controllers/almacen';
import GrupoDesignados from '../controllers/grupodesignado';
import Pedidos from '../controllers/pedido';
import RegMedicamento from '../controllers/regmedicamentos';
import SuministroHospi from '../controllers/sumunistrohopi';
import Venta from '../controllers/ventas';
import Proveedores from '../controllers/proveedor';


export default (app) => {

app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the bookStore API!',
}));

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// empisea las tablas de almacen
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//GrupoDesignado
app.post('/api/asignacion', GrupoDesignados.createAsignacion);
app.get('/api/asignacion', GrupoDesignados.verAsignacion);
app.get('/api/GrupoAsigONLY/:id', GrupoDesignados.onlyGPA); //serv para actualizar
app.post('/api/GrupoAsigUPDATE/:id', GrupoDesignados.updateGPA); //serv actualizar

//medicamento
app.post('/api/medicamento', RegMedicamento.createMedicamento);
app.get('/api/medico', RegMedicamento.verMedicamento)
};