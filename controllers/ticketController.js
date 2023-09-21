import { ticketQueries } from '../data/queries/index.js'

const addTicket = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await ticketQueries.addTicket(data);
        
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default {
    addTicket
}