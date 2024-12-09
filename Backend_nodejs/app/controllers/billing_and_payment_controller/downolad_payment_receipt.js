
const Receipt = require('../../models/payment_and_billing/receipt')
const PDFDocument = require('pdfkit');

exports.downloadPaymentReceipt = async (req, res) => {
    try {

        const id = req.params.id;
        const receipt = await Receipt.findByPk(id);

        if (!receipt) {
            return res.status(404).send('Receipt not found');
        }

        // Create a new PDF document
        const doc = new PDFDocument();

        // Set the filename
        let filename = `receipt_${id}`;
        filename = encodeURIComponent(filename) + '.pdf';

        // Set headers for the response
        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
        res.setHeader('Content-type', 'application/pdf');

        // Pipe the PDF into the response
        doc.pipe(res);

        // Add content to the PDF
        doc.fontSize(20).text('Payment Receipt', { align: 'center' });
        doc.moveDown();

        doc.fontSize(12).text(`Date Paid: ${receipt.DatePaid}, { paragraphGap: 10 }`);
        doc.fontSize(12).text(`User ID: ${receipt.UserId}, { paragraphGap: 10 }`);
        doc.fontSize(12).text(`Status: ${receipt.Status}, { paragraphGap: 10 }`);
        doc.fontSize(12).text(`Amount: ${receipt.Amount}, { paragraphGap: 10 }`);
        doc.fontSize(12).text(`Transaction ID: ${receipt.TransactionId}, { paragraphGap: 10 }`);

        // Finalize the PDF and end the stream
        doc.end();
    } 
    catch (error) {
        console.error('Error generating receipt PDF:', error);
        res.status(500).send('Error generating receipt PDF. Please try again later.');
      }
};
