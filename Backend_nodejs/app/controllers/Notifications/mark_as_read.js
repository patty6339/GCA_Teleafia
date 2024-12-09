// controllers/notification_controller.js
const Notification = require('../../models/notification_model/notification_model');

exports.markAsRead = async (req, res) => {
    const { id } = req.params;

    try {
        const notification = await Notification.findOne({ where: { id: id }});

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        notification.isRead = true;
        await notification.save();

        return res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
