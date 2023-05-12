const inquirer = require('inquirer');
require('colors');

const menuOptions = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Qué desea hacer ? ',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar Tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`},
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            new inquirer.Separator(),
            {
                value: '0',
                name: `${'0.'.green} Salir \n`
            },
        ],
        pageSize: 10
    }
];

const pauseOptions = [
    {
        type: 'input',
        name: 'opcion',
        message: `Ingrese ${'ENTER'.green} para continuar...`
    }
];

const inquirerMenu = async() => {

    console.clear();
    console.log('__________________________'.green);
    console.log('                          '.green);
    console.log(' Seleccione una opción '.white);
    console.log('__________________________\n'.green);

    const {opcion} = await inquirer.prompt(menuOptions);
    return opcion;
}

const inquirerPause = async() => {
    console.log('\n');
    const {opcion} = await inquirer.prompt(pauseOptions);
    return opcion;
}

const leerInput = async(message) => {
    const question = [
        {
            type:'input',
            name: 'desc',
            message,
            validate(value) {
                if(value.length === 0) {
                    return 'Por favor ingrese un valor.'
                }
                return true;
            }
        }    
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const crearMenuTareasBorrar = async(tareas = []) => {
    console.clear();
    
    const choices = []; 

    tareas.forEach((t, index) => {
        choices.push(
            {
                value: t.id,
                name: `${(index+1).toString().green} ${t.descripcion}`
            },
        );
    });

    choices.unshift(
        {
            value: '0',
            name: `${'0'.green} Cancelar`
        },
    );

    const options = [
        {
            type: 'list',
            name: 'id',
            message: 'Qué tarea desea eliminar ? ',
            choices,
            pageSize: 10
        }
    ];

    const {id} = await inquirer.prompt(options);

    return id;
}

const crearMenuCompletarTarea = async(tareas = []) => {
    console.clear();
    
    const choices = []; 

    tareas.forEach((t, index) => {
        choices.push(
            {
                value: t.id,
                name: `${t.descripcion.green}`,
                checked: t.fechaCompletado === null ? false : true
            },
        );
    });


    const options = [
        {
            type: 'checkbox',
            name: 'id',
            message: 'Seleccione la tarea que desea marcar como completada: ',
            choices,
            pageSize: 10
        }
    ];

    const {id} = await inquirer.prompt(options);

    return id;
}

module.exports = { inquirerMenu, inquirerPause, leerInput, crearMenuTareasBorrar, crearMenuCompletarTarea };