const fs = require('fs');

const filename = './persistencia/data.json';

const guardarArchivo = (data) => {    
    fs.writeFileSync(filename, JSON.stringify(data));
}

const leerArchivo = () => {
    if(!fs.existsSync(filename)) {
        return null;
    }

    const info = fs.readFileSync(filename, {encoding: 'utf-8'});
    return JSON.parse(info);
}

module.exports = { guardarArchivo, leerArchivo };