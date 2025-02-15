const Form = require('../models/Form')

// Obtener todos los registros con opción de límite
const getAllForm = async (req, res) => {
    try {
        // Obtener el parámetro "limit" de la consulta, si no se define, traer todos
        const limit = req.query.limit ? parseInt(req.query.limit) : null;

        // Validar el límite
        if (limit !== null && (isNaN(limit) || limit <= 0)) {
            return res.status(400).json({ message: '"limit" debe ser un número positivo.' });
        }

        // Consulta con Sequelize
        const forms = await Form.findAll({
            order: [['id', 'DESC']], // Ordenar de manera descendente
            limit: limit // Se aplicará solo si se define en la consulta
        });

        // Responder con los resultados
        res.json(forms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// crear un nuevo registtro
const createForm = async (req, res) => {
    try {
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

const searchDocumentoForm = async (req, res) => {
    try {
        const { documentoIdentidad } = req.params;
        if(!documentoIdentidad) return res.status(400).json({ message: 'Documento requerido' })
        const form = await Form.findAll({ where: { documentoIdentidad } });
        if(!form.length === 0) return res.status(404).json({ message: 'No se encontraron resultados' })
        res.json(form)
    } catch (error) {
        res.status(500).json({ message: 'Documento no encontradol' })
    }
}

const searchIdLlamadaForm = async (req, res) => {
    try {
        const { idLlamada } = req.params;
        if(!idLlamada) return res.status(400).json({ message: 'Idllamada es requerido' })
        const form = await Form.findOne( { where: { idLlamada}})
        if(!form.length === 0) return res.status(404).json({ message: 'Id llamada no encontrado'})
        res.json(form)
    } catch (error) {
        res.status(500).json({ message: 'id no encontrado en mi bd'} )
    }
}


module.exports = { getAllForm, createForm, getFormById, updateForm, deleteForm, searchDocumentoForm, searchIdLlamadaForm }

