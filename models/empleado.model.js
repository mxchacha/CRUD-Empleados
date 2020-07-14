const mongoose = require('mongoose');

var empleadoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: 'This field is required.'
    },
    cedula: {
        type: String
    },
    email: {
        type: String
    },
    telefono: {
        type: String
    },
    ciudad: {
        type: String
    }
});

// Custom validation for email
empleadoSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('Empleado', empleadoSchema);
