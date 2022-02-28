const Event = require('../models/Event');
const moment = require('moment-timezone');
require('moment/locale/es-mx');
moment.locale('Es-mx');

const dateSantiago = moment.tz(moment().format(), 'America/Santiago');

async function getEvents() {
    try {
        const result = Event.find({});
        return result;
    } catch (err) {
        console.log(err);
    }
}

async function getEventById(id) {
    try {
        const result = await Event.findById(id).populate('user');
        return result;
    } catch (err) {
        console.log(err);
    }
}

async function createEvent(input, ctx) {
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

async function updateEvent(id, input, ctx) {
    if (!ctx.user) {
        throw new Error('Un usuario registrado debe crear el evento');
    }
    try {
        const result = await Event.findByIdAndUpdate(id, input, { new: true });
        return result;
    } catch (err) {
        console.log(err);
    }
}

async function deleteEvent(id, ctx) {
    if (!ctx.user) {
        throw new Error('Un usuario registrado debe eliminar el evento');
    }
    try {
        await Event.findByIdAndRemove(id);
        return "Evento Eliminado!";
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

async function search(search) {
    const events = await Event.find({
        title: { $regex: search, $options: 'i' }
    }).populate('user');
    return events;
}

async function todayEvent() {
    try {
        const today = dateSantiago.format('DD');
        const month = dateSantiago.format('MM');
        const year = dateSantiago.format('YYYY');
        const events = await Event.find({}).populate('user');
        const results = [];
        // console.log(events);
        for (const event of events) {
            const eventToday = moment(event.start).format('DD');
            const eventMonth = moment(event.start).format('MM');
            const eventYear = moment(event.start).format('YYYY');

            if(eventToday === today && eventMonth === month && eventYear === year){
                results.push(event);
            }
        }
        return results;
    } catch (err) {
        throw new Error(err);
    }
}

async function tomorrowEvent() {
    try {
        const today = dateSantiago.format('DD');
        const month = dateSantiago.format('MM');
        let tomorrow = moment(dateSantiago).date(parseInt(today)+1).format('DD-MM-YYYY');
        const events = await Event.find({}).populate('user');
        const endOfMonth = moment().endOf('month').format('DD');
        const results = [];
        if(today === endOfMonth){
            tomorrow = dateSantiago.month(parseInt(month)).date(1).format('DD-MM-YYYY');
        }
        for (const event of events) {
            const eventDate = moment(event.start).format('DD-MM-YYYY');
            if(eventDate === tomorrow){
                results.push(event);
            };
        }
        return results;
    } catch (err) {
        throw new Error(err);
    }
}


module.exports = {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    lastEventsAdded,
    search,
    todayEvent,
    tomorrowEvent
}


