require('./models/db');

const express= require('express');
const path=require('path');
const exphbs=require('express-handlebars');
const bodyparser = require('body-parser');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const empleadoController=require('./controllers/empleadoController');
const usersController=require('./routes/users');
const methodOverride=require('method-override');
const session=require('express-session');
var app = express();
const flash = require('connect-flash');





//Middlewares
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'))//Sirve para que los formularios puedan enviar otro tipo de metodos.(PUT DELETE,GET POST)
app.use(session({
    secret:'mysecretapp',
    resave:true,
    saveUninitialized:true

}));
app.use(flash());//Muestra mesajes
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.erros_msg = req.flash('error_msg');
    next();
})

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));
app.use('/empleado',empleadoController);
app.use('/user',usersController);

//Static Files
app.use(express.static(__dirname+ '/templates'));

app.use(bodyparser.json());
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({ 
    extname: 'hbs', 
    defaultLayout: 'mainLayout', 
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir:path.join(app.get('views'),'partials'),
    handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'hbs');

app.listen(3001,()=>{
    console.log('Express server started at port:3001');
});

