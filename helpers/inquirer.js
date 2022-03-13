require('colors');
const inquirer = require('inquirer');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear una tarea`,
            },
            {
                value: '2',
                name: `${'2.'.green} Listar Tareas`,
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`,
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`,
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tareas`,
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar una tarea`,
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`,
            },
        ],
    },
];

const inquirerMenu = async () => {
    console.clear();
    console.log('========================================='.green);
    console.log('\tSeleccione una opción'.white);
    console.log('=========================================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
};

const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar...\n`,
        },
    ];

    console.log('\n');
    await inquirer.prompt(question);
};

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            },
        },
    ];
    const { desc } = await inquirer.prompt(question);

    return desc;
};

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
};
