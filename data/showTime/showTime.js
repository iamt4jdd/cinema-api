import utils from '../utils.js';
import config from '../../config/config.js';
import sql from 'mssql';

const addShowTime = async (data) => {
    try {
        let pool = await sql.connect(config.sql);

        const sqlQueries = await utils.loadSqlQueries('showTime/sql');

        const showTimeId = utils.generateRandomID();
            
        const insertShowTime = await pool.request()
                            .input('showTimeId', sql.NVarChar, showTimeId)
                            .input('movieId', sql.NVarChar, data.movieId)
                            .input('showingDate', sql.NVarChar, data.showingDate)
                            .input('startTime', sql.NVarChar, data.startTime)
                            .query(sqlQueries.addShowTime);   
       
        console.log("Added showtime: " + insertShowTime.recordset[0]);

        return {
            message: "Add showtime successfully",
            ...insertShowTime.recordset[0]
        }
    } catch (error) {
        return error.message;
    }
}

const getComingShowTime = async() => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('showTime/sql');

        const showTimes = await pool.request().query(sqlQueries.getComingShowTime);

        if (showTimes.recordset == "") {
            return {
                message: "No coming showtime",
            }
        }
        return showTimes.recordset;
    } catch (error) {
        return error.message;
    }
}

const getNowShowTime = async() => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('showTime/sql');

        const showTimes = await pool.request().query(sqlQueries.getNowShowTime);

        if (showTimes.recordset == "") {
            return {
                message: "No show time today",
            }
        }
        return showTimes.recordset;
    } catch (error) {
        return error.message;
    }
}

const getSeatsOfShowTime = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries("ticket/sql");

        const seats = await pool
            .request()
            .input("showTimeId", sql.NVarChar, data.showTimeId)
            .query(sqlQueries.getSeatsOfShowTime);

        const showTimeSeats = seats.recordset.map(item => item.seatNumber);

        return showTimeSeats;
    } catch (error) {
        return error.message;
    }
}

const getCostOfShowTime = async(showTimeId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('showTime/sql');

        const showTime = await pool.request()
                                .input('showTimeId', sql.NVarChar, showTimeId)
                                .query(sqlQueries.getCostOfShowTime);

        return showTime.recordset[0].cost;
    } catch (error) {
        return error.message;
    }
}

export default {
    addShowTime,
    getNowShowTime,
    getComingShowTime,
    getCostOfShowTime,
    getSeatsOfShowTime
}