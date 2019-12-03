// puerto
process.env.PORT = process.env.PORT || 3000;

// entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// mongodb url
let urlDB = 'mongodb+srv://sealvarezlazo:Xebitay1@cluster0-klwbk.mongodb.net/cafe?retryWrites=true&w=majority';
if (process.env.NODE_ENV === 'production' )
{
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

// venciomiento del token: 60 segun * 60 minutos * 24 horas * 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// seed token jwt
process.env.SEED = process.env.SEED || 'jwt-seed-dev';

// CLIENT ID GOOGLE
process.env.CLIENT_ID_GOOGLE = process.env.CLIENT_ID_GOOGLE || '12886019346-lu2l5lbq77glb74j5st8cullcvm1daj4.apps.googleusercontent.com';

