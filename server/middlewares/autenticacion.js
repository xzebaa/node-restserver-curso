const jwt = require('jsonwebtoken');
//=================
// VERIFICAR TOKEN
//=================
let verificaToken = (req, res, next) => {
    const token  = req.get('token');
    //console.log(token);

    jwt.verify(token, process.env.SEED, (error, decode) => {

        console.log(decode);
        if (error){
            return res.status(401).json({
                ok: false,
                error: {
                    message: 'Token no valido.'
                }
            })
        }
        req.usuario = decode.usuarioDB;
        next();
    })
}

//=================
// VERIFICAR ADMIN-ROLE 
//=================
const verificaAdminRole = (req, res, next) => {
    const { usuario } = req;

    if(usuario.role !== 'ADMIN_ROLE'){
         
        res.status(401);
        return res.json({
            ok: false,
            error: {
                message: 'Usuario no autorizado.'
            }
        })
    }

    next();
}

module.exports = {
    verificaToken,
    verificaAdminRole,
}