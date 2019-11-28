// puerto
process.env.PORT = process.env.PORT || 3000;

// entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//mongodb url

let urlDB = 'mongodb+srv://sealvarezlazo:Xebitay1@cluster0-klwbk.mongodb.net/cafe?retryWrites=true&w=majority';

if (process.env.NODE_ENV === 'production' )
{
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;