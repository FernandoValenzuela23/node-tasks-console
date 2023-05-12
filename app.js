require('colors');
const { 
    inquirerMenu, 
    inquirerPause, 
    leerInput,
    crearMenuTareasBorrar,
    crearMenuCompletarTarea
} = require('./helpers/inquirer');
const Tarea = require('./models/tarea')
const Tareas = require('./models/tareas')
const { 
    guardarArchivo,
    leerArchivo
} = require('./helpers/file-manager')

const main = async () => {
    let opcion = ''; 
    const tareas = new Tareas();

    const fromFile = leerArchivo();
    if(fromFile) {
        tareas.obtenerDesdeArray(fromFile);
    }

    do {
        opcion = await inquirerMenu();
        
        switch (opcion) {
            case '1':
                const desc = await leerInput('Descripción: ');
                tareas.crearTareas(desc);
                break;
            case '2':
                tareas.listarTodas();
                break;
            case '3':
                tareas.listarPorEstado(true);
                break;
            case '4':
                tareas.listarPorEstado(false);
                break;
            case '5':
                let ids = [];
                ids = await crearMenuCompletarTarea(tareas.listadoArray);
                if(ids && ids.length > 0) {
                    tareas.completarTarea(ids);
                }
                break;
            case '6':
                const idBorrar = await crearMenuTareasBorrar(tareas.listadoArray);
                if(idBorrar) {
                    if (idBorrar === '0') {
                        break;
                    }
                    const answer = await leerInput('Esta seguro que desea elimnar esta tarea ? [s/n]');
                    if(answer === 'S' || answer === 's') {
                        tareas.eliminarTarea(idBorrar);
                    }                    
                }
                break;
            default:
                break;
        }


        guardarArchivo(tareas.listadoArray);

        if(opcion !== '0') await inquirerPause();
    } while (opcion !== '0');
    
}

main();