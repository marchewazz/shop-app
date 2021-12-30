import express, { Router } from 'express';
import CommentsController from '../controllers/commentsController';

const commentsRouter = Router();
const commentsController = new CommentsController();

commentsRouter.post('/add', commentsController.addComment);
commentsRouter.post('/get', commentsController.getComments);
commentsRouter.post('/average', commentsController.averageRating);

export default commentsRouter;