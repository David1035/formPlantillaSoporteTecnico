const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const Form = sequelize.define('Form', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    idLlamada: {type: DataTypes.STRING, allowNull: true},
    name: {type: DataTypes.STRING, allowNull: true},
    documentoIdentidad: {type: DataTypes.STRING, allowNull: true},
    observaciones: {type: DataTypes.STRING, allowNull: true},
    actualizacionDatos: {type: DataTypes.STRING, allowNull: true},
    fecha: {type: DataTypes.STRING, allowNull: true},
    hora: {type: DataTypes.STRING, allowNull: true},
    tiempoPromedio: {type: DataTypes.FLOAT, allowNull: true}, 
    tipoPlantilla: {type: DataTypes.STRING, allowNull: true}
})

module.exports = Form;  

//exportando el modelo Form para que se pueda utilizar en otros archivos.  //
//  export default Form;  //exportando el modelo Form para que se pueda utilizar en otros
// archivos.  //  export {Form} from './Form';  //exportando el modelo
// Form para que se pueda utilizar en otros archivos.  //  export {default as Form}
// from './Form';  //exportando el modelo Form para que se pueda utilizar en otros
// archivos.  //  export {Form as default} from './Form';  //exportando