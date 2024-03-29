
require('colors');

const mostraMenu = () => {
    // promesa porque la opcion seleccionada esta dentro de un callback del readline.question y es la unica forma de obtenerlo
    return new Promise(resolve => {

        console.clear();
        console.log('__________________________'.green);
        console.log('                          '.green);
        console.log(' Seleccione una opción '.green);
        console.log('__________________________\n'.green);

        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Listar Tareas`);
        console.log(`${'3.'.green} Tareas completadas`);
        console.log(`${'4.'.green} Tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green} Borrar tarea`);
        console.log(`${'0.'.green} Salir \n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout        
        });

        readline.question('Seleccione una opción: ', (opt) => {
            readline.close();
            resolve(opt);
        });

    });
    
}

const pausa = () => {
    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout        
        });

        readline.question(`\nPresione ${'ENTER'.blue} para continuar...\n`, (opt) => {
            readline.close();
            resolve();
        });
    });
}

module.exports = { mostraMenu, pausa };