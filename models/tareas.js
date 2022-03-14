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

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    fromArray(tareas = []) {
        tareas.forEach((tarea) => (this._listado[tarea.id] = tarea));
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listarTodas() {
        this.listadoArr.forEach((tarea, index) => {
            const idx = `${index + 1}`.green;
            const estado = !!tarea.completadoEn
                ? 'Completado'.green
                : 'Pendiente'.red;

            console.log(`${idx}. ${tarea.desc} :: ${estado}`);
        });
    }

    listarPendientesCompletadas(completadas = true) {
        this.listadoArr
            .filter((tarea) =>
                completadas ? !!tarea.completadoEn : !tarea.completadoEn
            )
            .forEach((tarea, index) => {
                const idx = `${index + 1}`.green;
                const completado = !!tarea.completadoEn
                    ? `:: ${tarea.completadoEn}`.green
                    : ':: Pendiente'.red;
                console.log(`${idx}. ${tarea.desc} ${completado}`);
            });
    }
}

module.exports = Tareas;
