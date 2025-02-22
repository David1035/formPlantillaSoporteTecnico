const sequelize = require('./config/db'); // Importamos la conexión a la BD

async function obtenerResumenPorMesYDia() {
    try {
        const resultados = await sequelize.query(
            `SELECT 
                tipoPlantilla, 
                COUNT(*) AS cantidad_registros, 
                SUM(tiempoPromedio) AS suma_tiempo,
                strftime('%Y-%m', fecha) AS mes,
                fecha AS dia
             FROM Forms
             WHERE tipoPlantilla IN ('N1', 'N2') 
               AND strftime('%Y-%m', fecha) = strftime('%Y-%m', 'now') -- Mes actual
               AND fecha = date('now') -- Día actual
             GROUP BY tipoPlantilla, mes, dia
             ORDER BY mes DESC, dia DESC`,
            { type: sequelize.QueryTypes.SELECT }
        );

        console.log(resultados);
        return resultados;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
    }
}

obtenerResumenPorMesYDia();
