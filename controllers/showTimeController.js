import { showTimeQueries } from '../data/index.js'

const addShowTime = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await showTimeQueries.addShowTime(data);
        
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getComingShowTime = async (req, res, next) => {
    try {
        const showTime = await showTimeQueries.getComingShowTime();

        res.send(showTime);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getTodayShowTime = async (req, res, next) => {
    try {
        const showTime = await showTimeQueries.getTodayShowTime();

        res.send(showTime);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getSeatsOfShowTime = async (req, res, next) => {
    try {
        const data = req.body;
        const response = await showTimeQueries.getSeatsOfShowTime(data);
        
        res.send(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default {
    addShowTime,
    getComingShowTime,
    getTodayShowTime,
    getSeatsOfShowTime
}