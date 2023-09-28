import { commentQueries } from '../data/queries/index.js'

const addComment = async (req, res, next) => {
    try {
        const data = req.body;
        const comment = await commentQueries.addComment(data);
        
        res.send(comment);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteComment = async (req, res, next) => {
    try {
        const Comment_ID = req.body.Comment_ID;
        const deletedEvent = await commentQueries.deleteComment(Comment_ID);
        res.send(deletedEvent);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getCommentByMovie = async (req, res, next) => {
    try {
        const data = req.body.Movie_ID;
        const comments = await commentQueries.getCommentByMovie(data);

        res.send(comments);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default {
    addComment,
    deleteComment,
    getCommentByMovie
}