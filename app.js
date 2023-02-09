const express = require('express');
const uuid = require('uuid');
function startMedicalBillUploadService() {
  const app = express();
  app.use(express.json());

  // Define an array to store medical bills in memory
  

  // Define the GET /items endpoint to return a list of medical bills
  app.get('/items', (req, res) => {
    res.json(medicalBills);
  });

  // Define the POST /items endpoint to create a new medical bill
  app.post('/items', (req, res) => {
    
    const medicalBill = req.body;
    medicalBills.push(medicalBill);
    res.json(medicalBill);
  });

  // Start the Express app
  app.listen(3000, () => {
    console.log('Medical bill upload service is running on port 3000');
  });

  return app;
}

module.exports = startMedicalBillUploadService;
