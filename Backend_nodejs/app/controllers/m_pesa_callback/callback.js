const fs = require('fs');
const path = require('path');
const Data = require('../../controllers/billing_and_payment_controller/make_stk_payment')


// exports.callback = async (req, res) => {
  
//   try {
    
//     res.setHeader('Content-Type', 'application/json');

//     const mpesaResponse = req.body;

//     // Create the response folder if it doesn't exist
//     const responseFolderPath = path.join(__dirname, '../util/m-pesa_response');
//     if (!fs.existsSync(responseFolderPath)) {
//       fs.mkdirSync(responseFolderPath);
//     }

//     // Write M-Pesa response to file in the response folder
//     const responseFilePath = path.join(responseFolderPath, 'response.txt');
//     fs.writeFileSync(responseFilePath, JSON.stringify(mpesaResponse));

//     // Send response
//     res.status(200).json({ success: true, message: 'Callback received successfully' });

//   } catch (error) {

//     console.error('Error handling callback:', error);
//     res.status(500).json({ error: 'Failed to process M-Pesa callback' });
    
//   }

// }



exports.callback = async (req, res) => {
  try {
      const mpesaResponse = req.body;

      // Construct the log file path
      const logDir = path.join(__dirname, '../util');
      const logFile = path.join(logDir, 'm-pesa_response.txt');

      // Ensure the directory exists
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
      }

      // Append the response to the log file
      fs.appendFileSync(logFile, JSON.stringify(mpesaResponse) + '\n');

      console.log("Received mpesaResponse:", JSON.stringify(mpesaResponse, null, 2));

      // Extract the ResultCode
      if (!mpesaResponse.Body || !mpesaResponse.Body.stkCallback) {
        console.error("Invalid M-PESA response structure:", mpesaResponse);
        return res.status(400).json({ message: "Invalid M-PESA response structure" });
      }
      const resultCode = mpesaResponse.Body.stkCallback.ResultCode;

      if (resultCode === 0) {
          // Extract additional information from the CallbackMetadata
          if (!mpesaResponse.Body.stkCallback.CallbackMetadata || !Array.isArray(mpesaResponse.Body.stkCallback.CallbackMetadata.Item)) {
            console.error("Invalid CallbackMetadata structure:", mpesaResponse);
            return res.status(400).json({ message: "Invalid CallbackMetadata structure" });
          }
          const callbackMetadata = mpesaResponse.Body.stkCallback.CallbackMetadata.Item;

          // Initialize variables to store the extracted data
          let mpesaReceiptNumber, transactionDate, phoneNumber, amount;

          // Iterate through the metadata to extract the required fields
          callbackMetadata.forEach(item => {
              if (item.Name === 'MpesaReceiptNumber') {
                  mpesaReceiptNumber = item.Value;
              } else if (item.Name === 'TransactionDate') {
                  transactionDate = item.Value;
              } else if (item.Name === 'PhoneNumber') {
                  phoneNumber = item.Value;
              } else if (item.Name === 'Amount') {
                  amount = item.Value;
              }
          });

          // Print the extracted values
          console.log("MpesaReceiptNumber:", mpesaReceiptNumber);
          console.log("TransactionDate:", transactionDate);
          console.log("PhoneNumber:", phoneNumber);
          console.log("Amount:", amount);

          // Return the success response
          const response = {
              ResultCode: 0,
              ResultDesc: "Confirmation Received Successfully"
          };
          console.log(response);

          return res.status(200).json(response);
      } else {
          // Return a response indicating that the transaction failed
          const response = {
              ResultCode: resultCode,
              ResultDesc: "Transaction failed"
          };
          console.log(response);
          return res.status(400).json(response);
      }
  } catch (error) {
      console.error("Error processing request:", error.message);
      return res.status(500).json({ message: error.message });
  }
};

// Example route to generate an invoice number
// app.get('/api/generateInvoiceNumber', async (req, res) => {
//   try {
//       const currentYear = new Date().getFullYear();
//       // Assuming Invoices is a database model
//       const invoicesCount = await Invoices.countDocuments();
      
//       let invoiceNumber;
//       if (invoicesCount === 0) {
//           invoiceNumber = `INV/${currentYear}/001`;
//       } else {
//           const lastInvoice = await Invoices.findOne().sort({ _id: -1 });
//           const lastInvoiceNumber = lastInvoice.invoice_number.split('/').pop();
//           const nextInvoiceNumber = parseInt(lastInvoiceNumber, 10) + 1;
//           invoiceNumber = `INV/${currentYear}/${nextInvoiceNumber.toString().padStart(3, '0')}`;
//       }

//       res.status(200).json({ invoiceNumber });
//   } catch (error) {
//       console.error("Error generating invoice number:", error.message);
//       res.status(500).json({ message: error.message });
//   }
// });
