const Event = require('../models/Event');

async function getEvents() {
    try {
        const result = Event.find({});
        return result;
    } catch (err) {
        console.log(err);
    }
}

async function getEventById( id ) {
    try {
        const result = await Event.findById( id ).populate('user');
        return result;
    } catch (err) {
        console.log(err);
    }
}

async function createEvent( input, ctx ) {
    //Validator IV: user who create event must be exist 
    if (!ctx.user) {
        throw new Error('Un usuario registrado debe crear el evento');
    }
    const newEvent = new Event(input);
    // newEvent.start
    try {
        const result = await newEvent.save();
        return result;
    } catch (err) {
        console.log(err);
    }
}

async function updateEvent( id, input, ctx ) {
    if (!ctx.user) {
        throw new Error('Un usuario registrado debe crear el evento');
    }
    try {
        const result = await Event.findByIdAndUpdate(id, input, { new: true });
        console.log(result);
        return result;
    } catch (err) {
        console.log(err);
    }
}

async function deleteEvent( id, ctx ) {
    if (!ctx.user) {
        throw new Error('Un usuario registrado debe eliminar el evento');
    }
    try {
        await Event.findByIdAndRemove(id);
        return "Evento Eliminado!"
    } catch (err) {
        console.log(err);
    }
}

async function lastEventsAdded() {
    try {
        const result = await Event.find().sort({ createAt: -1 }).populate('user').limit(5);
        return result;
    } catch (err) {
        console.log(err);
        return [];
    }
}

async function search( search ){
    const events = await Event.find({
        title: { $regex: search, $options: 'i' }
    }).populate('user');
    return events;
}

module.exports = {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    lastEventsAdded,
    search,
}


