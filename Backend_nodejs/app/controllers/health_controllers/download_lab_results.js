
const LabResults = require('../../models/health_model/lab_results');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');

exports.downloadLabResults = async (req, res) => {
    const { id } = req.params;
    try {
        const record = await LabResults.findByPk(id);

        if (!record) {
            return res.status(404).send('Record not found');
        }

        // Create a new PDF document
        const doc = new PDFDocument();

        // Define the directory where files are stored
        const uploadDirectory = path.join(__dirname, '../../../uploads');

        // Function to embed an image with title and return its height
        const embedImage = (doc, filePath, title) => {
            if (fs.existsSync(filePath)) {
                const stats = fs.statSync(filePath);
                if (stats.size > 0) { // Check if file is not empty
                    const dimensions = sizeOf(filePath);
                    const imageHeight = dimensions.height * (doc.page.width - 100) / dimensions.width;

                    // Add title if necessary
                    if (title) {
                        doc.text(title, { paragraphGap: 10 });
                    }

                    // Check if the image fits on the current page
                    if (doc.y + imageHeight + 10 > doc.page.height - doc.page.margins.bottom) {
                        doc.addPage();
                        if (title) {
                            doc.text(title, { paragraphGap: 10 });
                        }
                    }

                    // Add the image
                    doc.image(filePath, {
                        fit: [doc.page.width - 100, imageHeight],
                        align: 'center',
                        valign: 'center'
                    });
                    doc.moveDown(2); // Add some space after the image

                    return imageHeight + 10; // Return the height of the embedded image with some padding
                } else {
                    doc.text(`${title ? title + ' ' : ''}is empty.`);
                    doc.moveDown(2); // Add some space after the error message
                    return 0; // Return 0 for empty images
                }
            } else {
                doc.text(`${title ? title + ' ' : ''}not found.`);
                doc.moveDown(2); // Add some space after the error message
                return 0; // Return 0 for missing images
            }
        };

        // Add record information to the PDF
        doc.fontSize(12).text(`Record ID: ${record.id}`, { paragraphGap: 10 });

        // Add the diagnosis text to the PDF
        doc.text('Diagnosis:', { paragraphGap: 10 });
        doc.text(record.diagnosis || 'No diagnosis provided.', { paragraphGap: 10 });

        let totalHeight = 0;

        // Embed xray images
        if (record.xray) {
            const xrayFiles = record.xray.split(',');
            doc.text('X-ray Images:', { paragraphGap: 10 });
            xrayFiles.forEach(file => {
                const filePath = path.join(uploadDirectory, file);
                totalHeight += embedImage(doc, filePath, null);
            });
        }

        // Adjust spacing based on the height of xray images
        if (totalHeight > 0) {
            doc.moveDown(totalHeight / 12); // Convert height to points (assuming font size 12)
        }

        totalHeight = 0; // Reset total height for the next field

        // Embed ctscan images
        if (record.ctscan) {
            const ctscanFiles = record.ctscan.split(',');
            doc.text('CT Scan Images:', { paragraphGap: 10 });
            ctscanFiles.forEach(file => {
                const filePath = path.join(uploadDirectory, file);
                totalHeight += embedImage(doc, filePath, null);
            });
        }

        // Adjust spacing based on the height of ctscan images
        if (totalHeight > 0) {
            doc.moveDown(totalHeight / 12); // Convert height to points (assuming font size 12)
        }

        totalHeight = 0; // Reset total height for the next field

        // Embed ultrasound images
        if (record.ultrasound) {
            const ultrasoundFiles = record.ultrasound.split(',');
            doc.text('Ultrasound Images:', { paragraphGap: 10 });
            ultrasoundFiles.forEach(file => {
                const filePath = path.join(uploadDirectory, file);
                totalHeight += embedImage(doc, filePath, null);
            });
        }

        // Send the PDF to the client as a downloadable attachment
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="lab-result-${id}.pdf"`);
        doc.pipe(res);

        // Finalize the PDF
        doc.end();

    } catch (error) {
        console.error('Error generating lab results PDF:', error);
        res.status(500).send('Error generating lab results PDF. Please try again later.');
    }
};
