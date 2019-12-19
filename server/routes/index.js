////lo nuevo de farmacia
import Almacenes from '../controllers/almacen';
import GrupoDesignados from '../controllers/grupodesignado';
import Pedidos from '../controllers/pedido';
import RegMedicamento from '../controllers/regmedicamentos';
import SuministroHospi from '../controllers/sumunistrohopi';
import Venta from '../controllers/ventas';
import Proveedores from '../controllers/proveedor';
import Distribucion from '../controllers/distribuciones';
import Fecha_Cantidad from '../controllers/fecha_cantidad';




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

    app.get('/api/verAsignacion_data',GrupoDesignados.verAsignacion_data)

    //medicamento
    app.post('/api/medicamento', RegMedicamento.createMedicamento);
    app.get('/api/medicamento', RegMedicamento.verMedicamento);
    app.get('/api/OnlyMedicamento/:id', RegMedicamento.onlyMedicamento);
    app.post('/api/updateMedicamento/:id', RegMedicamento.updateMedicamento);
    app.post('/api/reduce/:id', RegMedicamento.reduce);// reducir medicamento
    app.post('/api/add_Unidad_update/:id',RegMedicamento.add_Unidad); //actualizar cantidad de RegMedicamento

    app.post('/api/mostrar_med', RegMedicamento.mostrar_med)    

    //proveedor
    app.post('/api/proveedor',Proveedores.createProveedor);
    app.get('/api/proveedor', Proveedores.verproveedor);
    app.get('/api/OnlyProveedor/:id', Proveedores.onlyProveedor);
    app.post('/api/updateProveedor/:id', Proveedores.updateMedicamento);

    //pedidos
    app.post('/api/pedido', Pedidos.createPedido);
    app.get('/api/pedido', Pedidos.verPedidos);
    app.get('/api/OnlyPedido/:id', Pedidos.OnlyPedido);
    app.get('/api/deletePedido/:id', Pedidos.deletePedido);

    app.post('/api/updatePedidod/:id', Pedidos.updatePedido)

    app.post('/api/filter_pedidos_fecha', Pedidos.filter_pedidos_fecha) /// ruta para poder filtar por fechas

    //distribuciones
    app.post('/api/distribucion', Distribucion.createDist);
    app.get('/api/distribucion', Distribucion.verDist);
    app.get('/api/onlyDist/:id', Distribucion.onlyDist)
    app.get('/api/delete/:id', Distribucion.delete);

    app.post('/api/filter_data_list', Distribucion.filter_data_list)

    //fecha cantidad
    app.post('/api/fehca_cantidad/:id_medicamento', Fecha_Cantidad.cerateFecha_Cantidad);
    app.get('/api/fecha_cantidad', Fecha_Cantidad.VerFechaCantidad);
    app.get('/api/listMedicamentos/:id_medicamento',Fecha_Cantidad.listMedicamentos)
    app.get('/api/mostrar_lista_med',Fecha_Cantidad.list_med_fechas)

    app.get('/api/list_med_fechas_id/:id_fecha', Fecha_Cantidad.list_med_fechas_id)

    app.post( '/api/reduce_fecha_cantidad/:id', Fecha_Cantidad.reduce_fecha_cantidad );

    app.post('/api/filter_data_med_grupo', Fecha_Cantidad.filter_data_med_grupo)

};