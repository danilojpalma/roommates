import axios from 'axios';
import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const __dirname = path.resolve();

const home = (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
};

const addRandomUser = async (req, res) => {
    try {
        const response = await axios.get('https://randomuser.me/api/');
        const randomUser = response.data.results[0];

        const user = {
            id: uuidv4().slice(0, 6),
            name: `${randomUser.name.first} ${randomUser.name.last}`,
            debe: 0,
            recibe: 0
        };

        const fileContent = await fs.readFile(__dirname + '/data/roommates.json', 'utf-8');
        const existingData = JSON.parse(fileContent);

        existingData.roommates.push(user);

        await fs.writeFile(__dirname + '/data/roommates.json', JSON.stringify(existingData, null, 2));

        res.status(201).json(user);
        
    } catch (error) {
        res.status(500).json({ error: 'Error añadiendo un nuevo usuario' });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = JSON.parse(await fs.readFile(__dirname + '/data/roommates.json', 'utf-8'));
        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json({ error: 'Error leyendo el archivo roommates' });
    }
}

const addExpense = async (req, res) => {

    try {
        const { roommate, descripcion, monto } = req.body;
        
        const fileContent = await fs.readFile(__dirname + '/data/gastos.json', 'utf-8');
        const existingData = JSON.parse(fileContent);


        existingData.gastos.push({
            id: uuidv4().slice(0, 6),
            roommate,
            descripcion,
            monto,
        });

        await fs.writeFile(__dirname + '/data/gastos.json', JSON.stringify(existingData, null, 2));
        await updateAccounts(roommate, monto, 'add');

        res.status(201).json({ message: 'Gasto añadido correctamente' });
        

    } catch (error) {
        console.error('Error al agregar gasto:', error);
        res.status(500).send({ message: 'Error interno del servidor' });
    }
};

const getExpenses = async (req, res) => {   
    try {
        const expenses = JSON.parse(await fs.readFile(__dirname + '/data/gastos.json', 'utf-8'));
        res.status(200).json(expenses);
        
    } catch (error) {
        console.error(error);
    }
}

const deleteExpense = async (req, res) => {
    try {
        const { id } = req.query;

        const fileContent = await fs.readFile(__dirname + '/data/gastos.json', 'utf-8');
        const existingData = JSON.parse(fileContent);

        const indexToDelete = existingData.gastos.findIndex(gasto => gasto.id === id);

        const { roommate, monto } = existingData.gastos[indexToDelete];
        existingData.gastos.splice(indexToDelete, 1); 

        await fs.writeFile(__dirname + '/data/gastos.json', JSON.stringify(existingData, null, 2));
        await updateAccounts(roommate, monto, 'subtract');

        res.status(200).json({ message: 'Gasto eliminado' });


    } catch (error) {
        console.error('Error al eliminar gasto:', error);
        res.status(500).send({ message: 'Error interno del servidor' });
    }
}

const updateExpense = async (req, res) => {
    try {
        const { id } = req.query; 
        const { roommate, descripcion, monto } = req.body;
        
        const fileContent = await fs.readFile(__dirname + '/data/gastos.json', 'utf-8');
        const existingData = JSON.parse(fileContent);

        const indexToUpdate = existingData.gastos.findIndex(gasto => gasto.id === id);

        if (indexToUpdate !== -1) {

            const oldMonto = existingData.gastos[indexToUpdate].monto;
            existingData.gastos[indexToUpdate] = {
                id,
                roommate,
                descripcion,
                monto,
            };


            await fs.writeFile(__dirname + '/data/gastos.json', JSON.stringify(existingData, null, 2));
            await updateAccounts(roommate, oldMonto, 'subtract');
            await updateAccounts(roommate, monto, 'add');

        } else {
            console.log(`Gasto con ID "${id}" no encontrado.`);
        }

        res.status(200).json({ message: 'Gasto actualizado correctamente' });

    } catch (error) {
        console.error('Error al actualizar gasto:', error);
        res.status(500).send({ message: 'Error interno del servidor' });
    }
};

const updateAccounts = async (roommate, monto, action) => {

    const roommatesData = await fs.readFile(__dirname + '/data/roommates.json', 'utf-8');
    const roommatesObj = JSON.parse(roommatesData);
    const roommates = roommatesObj.roommates;

    const roommateIndex = roommates.findIndex(r => r.name === roommate);
    if (roommateIndex !== -1) {
        switch (action) {
            case 'add':
                roommates[roommateIndex].debe = Math.round(roommates[roommateIndex].debe + monto);
                roommates.forEach((r, index) => {
                    if (index!== roommateIndex) {
                        r.recibe = Math.round(r.recibe + monto / (roommates.length - 1));
                    }
                });
                break;

            case 'subtract':
                roommates[roommateIndex].debe = Math.round(roommates[roommateIndex].debe - monto);
                roommates.forEach((r, index) => {
                    if (index!== roommateIndex) {
                        r.recibe = Math.round(r.recibe - monto / (roommates.length - 1 ));
                    }
                });
                break;

            default:
                console.log(`Acción desconocida: ${action}`);
                break;
        }
    
            await fs.writeFile(__dirname + '/data/roommates.json', JSON.stringify(roommatesObj, null, 2), 'utf-8');

            res.status(200).json({ message: 'Cuentas actualizados correctamente' });
        
    } else {
        console.log(`Roommate con el nombre "${roommate}" no encontrado.`);
    }
};


export {
    home,
    addRandomUser,
    getUsers,
    addExpense,
    getExpenses,
    deleteExpense,
    updateExpense
}