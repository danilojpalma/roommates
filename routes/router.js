import express from 'express';
import { home, addRandomUser, getUsers, addExpense, getExpenses, deleteExpense, updateExpense } from '../controllers/controller.js';


const router = express.Router();

router.get('/', home);

router.get('/roommates', getUsers);

router.get('/gastos', getExpenses);

router.post('/roommate', addRandomUser);

router.post('/gasto', addExpense);

router.put('/gasto', updateExpense);

router.delete('/gasto', deleteExpense);

router.get('*', (req, res) => {
    res.status(404).send('Not Found');
});

export default router;