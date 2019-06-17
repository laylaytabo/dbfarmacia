////lo nuevo de farmacia
import Almacenes from '../controllers/almacen';
import GrupoDesignados from '../controllers/grupodesignado';
import Pedidos from '../controllers/pedido';
import RegMedicamento from '../controllers/regmedicamentos';
import SuministroHospi from '../controllers/sumunistrohopi';
import Venta from '../controllers/ventas';
import Proveedores from '../controllers/proveedor';
import Distribuciones from '../controllers/distribuciom'

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
app.get('/api/medicamento', RegMedicamento.verMedicamento);
app.get('/api/OnlyMedicamento/:id', RegMedicamento.onlyMedicamento);
app.post('/api/updateMedicamento/:id', RegMedicamento.updateMedicamento);

//proveedor
app.post('/api/proveedor',Proveedores.createProveedor);
app.get('/api/proveedor', Proveedores.verproveedor);
app.get('/api/OnlyProveedor/:id', Proveedores.onlyProveedor);
app.post('/api/updateProveedor/:id', Proveedores.updateMedicamento);

//pedidos
app.post('/api/pedido', Pedidos.createPedido);
app.get('/api/pedido', Pedidos.verPedidos);

//distribucion
app.post('/api/distribucion', Distribuciones.distribucion);
app.get('/api/distribucion', Distribuciones.listDistribucion);
};