const inquirer = require('inquirer')

const preguntas = [
    {
        type: 'list',
        name: 'opcion',     // nombre del objeto que devuelve el menú
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            }
        ]
    }
]

const inquirerMenu = async()=>{
    
    console.clear()
    console.log('╔════════════════════════════════════╗'.green)
    console.log('║ INFORMACIÓN DEL CLIMA EN COLOMBIA  ║'.green)
    console.log('╠════════════════════════════════════╣'.green)
    console.log('║          Luis Piedrahita           ║'.green)
    console.log('║  luispiedrahita.net@gmail.com      ║'.green)
    console.log('╚════════════════════════════════════╝'.green)
    console.log()
    console.log('======================================'.white)
    console.log('         SELECCIONE UNA OPCION        '.white)
    console.log('======================================\n'.white)
 
    const { opcion } = await inquirer.prompt(preguntas)     // desestructuramos el objeto 'opción', que devuelve la opción seleccionada

    return opcion
}


const pausa = async()=>{
    const pregunta = [
        {
            type: 'input',
            name: 'enter',
            message: `\nDe ${'ENTER'.green} para continuar \n`
        }
    ]

    await inquirer.prompt(pregunta)

}


const leerInput = async( message ) => {
    const question = {
        type: 'input',
        name: 'desc',
        message,
        validate( value ){
            if( value.length === 0 ){
                return 'Por favor ingrese un valor'
            }
            return true
        }
    }

    const { desc } = await inquirer.prompt(question)
    return desc

}

const listarLugares = async( lugares = [] )=>{

    const choices = lugares.map( (lugar, indice) => {
        const idx = `${indice + 1}.`.green

        return{
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })
    
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione un lugar',
            choices
        }
    ]

    const { id } = await inquirer.prompt( preguntas )

    return id
}

const confirmar = async ( mensaje ) => {
    
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message: mensaje
        }
    ]

    const { ok } = await inquirer.prompt( pregunta )
    return ok
}

const mostrarListadoChecklist = async( tareas = [] )=>{

    const choices = tareas.map( (tarea, indice) => {
        const idx = `${indice + 1}.`.green

        return{
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`,
            checked: tarea.completadoEn ? true : false
        }
    })
    
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt( pregunta )

    return ids
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoChecklist
}