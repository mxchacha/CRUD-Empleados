const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Empleado = mongoose.model('Empleado');

router.get('/', (req, res) => {
    res.render("empleado/addOrEdit", {
        viewTitle: "Insertar empleado"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var empleado = new Empleado();
    empleado.nombre = req.body.nombre;
    empleado.cedula = req.body.cedula;
    empleado.email = req.body.email;
    empleado.telefono = req.body.telefono;
    empleado.ciudad = req.body.ciudad;
    empleado.save((err, doc) => {
        if (!err)
            res.redirect('empleado/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("empleado/addOrEdit", {
                    viewTitle: "Insert empleado",
                    empleado: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Empleado.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('empleado/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("empleado/addOrEdit", {
                    viewTitle: 'Update empleado',
                    empleado: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Empleado.find((err, docs) => {
        if (!err) {
            res.render("empleado/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving empleado list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'nombre':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Empleado.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("empleado/addOrEdit", {
                viewTitle: "Update empleado",
                empleado: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Empleado.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/empleado/list');
        }
        else { console.log('Error in empleado delete :' + err); }
    });
});

module.exports = router;