const Helpers=require('../../util/helpers')


const helper= new Helpers();

exports.getLogs = async (req, res) => {
    await helper.log(req);
    try {
       
        const { date } = req.params;

        const logsForDate = await helper.getLogsForDate(date);

        res.json({ message: 'Logs retrieved successfully', log: logsForDate });

    } catch (error) {

        console.error(error);
        
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
