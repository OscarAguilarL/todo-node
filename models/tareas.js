const Tarea = require('./tarea');

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach((key) => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    fromArray(tareas = []) {
        tareas.forEach((tarea) => (this._listado[tarea.id] = tarea));
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listarTodas() {
        /**
         * 1: en verde
         * Completada: verde
         * pendiente: rojo
         * 1. tarea1 :: Completada | Pendiente
         */

        this.listadoArr.forEach((tarea, index) => {
            const idx = `${index + 1}`.green;
            const estado = !!tarea.completadoEn
                ? 'Completado'.green
                : 'Pendiente'.red;

            console.log(`${idx}. ${tarea.desc} :: ${estado}`);
        });
    }
}

module.exports = Tareas;
