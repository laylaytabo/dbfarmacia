import Users from '../controllers/user';
import Books from '../controllers/book';


////lo nuevo de farmacia
import Almacenes from '../controllers/almacen';
import GrupoDesignados from '../controllers/grupodesignado';
import Pedidos from '../controllers/pedido';
import RegMedicamento from '../controllers/regmedicamentos';
import SuministroHospi from '../controllers/sumunistrohopi';
import Venta from '../controllers/ventas';


export default (app) => {

app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the bookStore API!',
}));

app.post('/api/users', Users.signUp); // API route for user to signup
app.post('/api/users/:userId/books', Books.create); // API route for user to create a book
app.get('/api/users', Users.list); // API route for user to get all books in the database


//libros
app.get('/api/books', Books.list); // API route for user to get all books in the database
app.put('/api/books/:bookId', Books.modify); // API route for user to edit a book
app.delete('/api/books/:bookId', Books.delete); // API route for user to delete a book
app.get('/api/idLib/:id', Books.listOne);



//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// empisea las tablas de almacen
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//medicamentos
app.post('/api/medicamento', RegMedicamento.create);
app.get('/api/medicamento', RegMedicamento.ver);

//pedidos
app.post('/api/pedido', Pedidos.createPedido);
app.get('/api/pedido', Pedidos.verPedidos);

//regmedicamentos'
app.post('/api/susmedicamento', SuministroHospi.create);
app.get('/api/susmedicamentos', SuministroHospi.ver);

//GrupoDesignado
app.post('/api/asignacion', GrupoDesignados.createAsignacion);
app.get('/api/asignacion', GrupoDesignados.verAsignacion);

//almacenes
app.post('/api/Alm', Almacenes.createAlm);
app.get('/api/Alm', Almacenes.verAlm);

//proveedores
app.post('/api/proveedores', Proveedores.createProveedores);
app.get('/api/proveedores', Proveedores.verProveedores);

////Ventas

app.post('/api/venta', Venta.create);
app.get('/api/ventas', Venta.ver);


};