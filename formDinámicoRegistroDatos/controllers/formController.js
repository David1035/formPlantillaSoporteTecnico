const Form = require('../models/Form')

const getAllForm = async (req, res) => {
    try {
        const forms = await Form.findAll();
        res.json(forms)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllForm }
// explicar código 