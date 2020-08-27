const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://test:12345@cluster0.bykej.mongodb.net/rest?retryWrites=true&w=majority',
{ useNewUrlParser: true,useUnifiedTopology: true  },
 ()=>
    console.log('CXonexion con DB!')
);

require('./empleado.model');
require('./user.model');