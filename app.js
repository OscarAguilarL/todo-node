require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');
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
            case '5':
                // Crear opción
                break;
            case '6':
                // Crear opción
                break;
            default:
                break;
        }

        guardarDB(tareas.listadoArr);

        if (opt !== '0') await pausa();
    } while (opt !== '0');
};

main();
