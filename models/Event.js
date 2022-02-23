const mongoose = require('mongoose');
const moment = require('moment');
require('moment/locale/es-mx');
moment.locale('Es-mx');

const EventSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    insta: {
        type: String,
        require: true,
        trim: true,
    },
    rut: {
        type: String,
        //required: true,
        trim: true,
    },
    name: {
        type: String,
        //required: true,
    },
    reservePayment: {
        type: Number,
        require: true,
        trim: true,
    },
    hourPayment: {
        type: Number,
        require: true,
        trim: true,
    },
    totalPayment: {
        type: Number,
        require: true,
        trim: true,
    },
    imgUrl: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        //required: true,
    },
    address: {
        type: String,
    },
    birdDate: {
        type: Date,
        //TEST
        default: moment().format(),
    },
    phoneNumber: {
        type: String,
        trim: true,
        //required: true,
    },
    start: {
        type: Date,
        require: true,
        //TEST
        default: moment().format(),
    },
    end: {
        type: Date,
        require: true,
        //TEST
        default: moment().format(),
    },
    bgColor: {
        type: String,
        require: true,
        trim: true,
    },
    desc: {
        type: String,
        // required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Usuario',
    },
    hours: {
        type: Number,
    },
    createAt: {
        type: Date,
        default: moment().format(),
    }
});

module.exports = mongoose.model('Event', EventSchema);