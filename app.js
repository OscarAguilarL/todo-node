require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist,
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

console.clear();

const main = async () => {
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareas) {
        //establecer tareas
        tareas.fromArray(tareasDB);
        console.log(tareas._listado);
    }

    do {
        // imprimir el menú
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                break;
            case '2': //* Listar todas las tareas
                tareas.listarTodas();
                break;
            case '3': //* Listar las tareas COMPLETADAS
                tareas.listarPendientesCompletadas(true);
                break;
            case '4': //* Listar las tareas PENDIENTES
                tareas.listarPendientesCompletadas(false);
                break;
            case '5': //* Marcar como completado | pendientes
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6': //* borrar una tarea
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('¿Estás seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
                break;
            default:
                break;
        }

        guardarDB(tareas.listadoArr);

        if (opt !== '0') {
            await pausa();
            console.clear();
        }
    } while (opt !== '0');
};

main();
