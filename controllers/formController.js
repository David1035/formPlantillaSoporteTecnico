const Form = require('../models/Form')

//Obtener todos los registros
const getAllForm = async (req, res) => {
    try {
        console.log('entrando al getAllForm...')
        const forms = await Form.findAll();
        console.log('registros encontrados')
        res.json(forms)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// crear un nuevo registtro
const createForm = async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body);
        const form = await Form.create(req.body);
        res.status(201).json(form)
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el formulario' })
    }
}

//Obtener registro por id
const getFormById = async (req, res) => {
    try {
        const form = await Form.findByPk(req.params.id)
        if (!form) return res.status(404).json({ error: 'cliente no encontrado' })
        res.json(form)
    } catch (error) {
        res.status(500).json({ error: 'No existe el registro' })
    }
}

//Actualizar un registro por Id
const updateForm = async (req, res) => {
    try {
        const form = await Form.findByPk(req.params.id);
        if(!form) return res.status(404).json({ error: 'El registro no existe' })
        await form.update(req.body);
        res.json(form)
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el registro' })
    }
}


//Eliminar un registro por Id
const deleteForm = async (req, res) => {
    try {
        const form = await Form.findByPk(req.params.id);
        if(!form) return res.status(404).json({ error: 'El registro no existe' })
        await form.destroy();
        res.json({ message: 'Registro eliminado con exito' })
    } catch (error) {
        res.status(500).json({ error: 'error al eliminar el registro' })
    }
}

module.exports = { getAllForm, createForm, getFormById, updateForm, deleteForm }

