const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    insta: {
        type: String,
        required: true,
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
    initPayment: {
        type: Number,
        required: true,
        trim: true,
    },
    totalPayment: {
        type: Number,
        required: true,
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
        default: new Date(),
    },
    phoneNumber: {
        type: String,
        trim: true,
        //required: true,
    },
    start: {
        type: Date,
        required: true,
        //TEST
        default: new Date(),
    },
    end: {
        type: Date,
        required: true,
        //TEST
        default: new Date(),
    },
    bgColor: {
        type: String,
        required: true,
        trim: true,
    },
    desc: {
        type: String,
        // required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario',
    },
    userName: {
        type: String,
        required: true,
    },
    hours: {
        type: Number,
    }
});

module.exports = mongoose.model('Event', EventSchema);