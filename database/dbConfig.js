const mongoose = require('mongoose');
const figlet = require('figlet');
require('dotenv').config({
    path: '.env'
});

const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGOURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
        figlet('DATABASE CONNECTED', function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(data)
        });
    } catch (err) {
        console.log('Error: :', err);
        procces.exit(1);
    }
}
module.exports = connect;