const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const rolesalidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido',
}

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El Nombre es necesario'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'el email es obligatorio'],  
    },
    password: {
        type: String,
        required: [true,' el password es requerido'],
    },
    img: {
        type: String,
        required: [false,' la img es requerido'],
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesalidos,
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    }
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    delete userObject.__v;
    return userObject;
}

usuarioSchema.plugin(uniqueValidator, {message: '{PATH} Debe de ser unico'})

module.exports = mongoose.model('Usuario', usuarioSchema)
