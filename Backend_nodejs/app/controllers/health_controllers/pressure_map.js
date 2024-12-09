
const HealthRecord = require('../../models/health_model/health_records');
const plotly = require('plotly')('Esanta', 'yhXwYXY6xvxuzZ8xbsUG'); // Replace with your Plotly username and API key
const { Sequelize } = require('sequelize');

exports.displayPressureMap = async (req, res) => {
    try {
        const records = await HealthRecord.findAll({
            attributes: ['id', 'date', 'systolic', 'diastolic'],
            order: [['date', 'DESC']],
            limit: 7
        });

        const bloodPressureData = records.map(record => {
            const dateObj = new Date(record.date);
            return { ...record.dataValues };
        });

        const displayedRecordIds = records.map(record => record.id);

        await HealthRecord.destroy({
            where: {
                id: { [Sequelize.Op.notIn]: displayedRecordIds }
            }
        });

        const graphData = [
            {
                x: bloodPressureData.map(entry => entry.date),
                y: bloodPressureData.map(entry => entry.systolic),
                text: bloodPressureData.map(entry => `${entry.date}`),
                type: 'scatter',
                mode: 'lines+markers',
                name: 'Systolic',
                line: { color: 'blue' }
            },
            {
                x: bloodPressureData.map(entry => entry.date),
                y: bloodPressureData.map(entry => entry.diastolic),
                text: bloodPressureData.map(entry => `${entry.date}`),
                type: 'scatter',
                mode: 'lines+markers',
                name: 'Diastolic',
                line: { color: 'green' }
            }
        ];

        const layout = {
            title: 'Blood Pressure Variation',
            xaxis: {
                title: 'Date',
                tickvals: bloodPressureData.map(entry => entry.date),
                ticktext: bloodPressureData.map(entry => `${entry.date}`)
            },
            yaxis: {
                title: 'Pressure (mm Hg)'
            }
        };

        plotly.plot(graphData, layout, (err, msg) => {
            if (err) {
                console.error('Error generating graph:', err);
                res.status(500).json({ message: 'Error generating graph' });
            } else {
                console.log('Plotly response:', msg);
                if (msg && msg.url) {
                    res.json({ url: msg.url });
                } else {
                    console.error('Invalid Plotly response:', msg);
                    res.status(500).json({ message: 'Invalid Plotly response' });
                }
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};