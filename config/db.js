const mongose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB Conected...');
  } catch (err) {
    console.error(err.message);
    //salir el proceso con la falla
    process.exit;
  }
};

module.exports = connectDB;
