const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/purchase', (req, res) => {
  res.render('purchase.ejs');
});

app.post('/purchase', (req, res) => {
  const paysafeCode = req.body.paysafeCode;
  const additionalInfo = req.body.additionalInfo;

  const data = `Paysafe Code: ${paysafeCode}\nAdditional Information: ${additionalInfo}\n\n`;

  fs.appendFile('data.txt', data, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.send('Multumim frumos! In 24 de ore comanda va fi livrata catre dumneavoastra');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
