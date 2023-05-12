const Tarea = require('./tarea');

class Tareas {
    _listado = {};

    get listadoArray() {
       const listado = [];

       Object.keys(this._listado).forEach(k => {
        listado.push(this._listado[k]);
       });

       return listado;
    }

    constructor(){
        this._listado = {};
    }

    crearTareas(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    obtenerDesdeArray(fromFile = []) {
        fromFile.forEach(t => {
            this._listado[t.id] = t;
        });
    }

    listarTodas() {
        this.listadoArray.map(({descripcion, fechaCompletado}, index) => {  
            const estado = fechaCompletado == null ? 'Pendiente' : 'Completado';                  
            console.log(`${(index + 1).toString().green}. ${descripcion} :: ${estado === 'Pendiente' ? estado.red : estado.green}`);
        });
    }

    listarPorEstado(completadas = true) {
        this.listadoArray.filter(p => (completadas && p.fechaCompletado !== null) || (!completadas && p.fechaCompletado === null))
        .map(({descripcion, fechaCompletado}, index) => {  
            const estado = fechaCompletado == null ? 'Pendiente' : 'Completado';                  
            console.log(`${(index + 1).toString().green}. ${descripcion} :: ${estado === 'Pendiente' ? estado.red : estado.green}`);
        });
    }

    completarTarea(ids = []) {
        this.listadoArray.forEach(e => {
            if(!ids.some(i => i === e.id) && e.fechaCompletado !== null) {
                e.fechaCompletado = null;
            }
        });

        ids.forEach(id => {
            if(this._listado[id].fechaCompletado === null) {
                this._listado[id].fechaCompletado = new Date().toISOString();
            }
        });
    }

    eliminarTarea(id = '') {

        if(this._listado[id]) {
            delete this._listado[id];
            return true;
        }
        return false;
    }
}

module.exports = Tareas;