// controllers/notification_controller.js
const Notification = require('../../models/notification_model/notification_model');

exports.getAllNotifications = async (req, res) => {
    const { idNumber } = req.params;

    try {
        const notifications = await Notification.findAll({where: {userId:idNumber,isRead: false  },order: [['createdAt', 'DESC']]});
        
        return res.status(200).json({ notifications});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
