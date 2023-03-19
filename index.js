require('dotenv').config()

const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async ()=>{
    
    const busquedas = new Busquedas()

    let opt

    do {
        
        // imprimiendo el menú
        opt = await inquirerMenu()
        console.log( {opt} ) // muestra la opcion seleccionada
        
        switch ( opt ) {
            case 1:
                // ========= Pedir la ciudad al usuario
                const termino = await leerInput( 'Ciudad: ' )
                // Buscar los lugares
                const lugares = await busquedas.ciudad( termino )
                // Seleccionar el lugar
                const id = await listarLugares(lugares)
                const lugarSeleccionado = lugares.find( lugar => lugar.id === id )
                console.log( lugarSeleccionado )

                // ========= Peticion http para buscar las ciudades que coincidan
                
                // ========= Mostrar el listado de ciudades para que el usuario seleccione
                
                // ========= Peticion hhtp para consultar el clima de la ciudad seleccionada
                
                // ========= Mostrar los resultados
                console.log( '\n==== Información de la ciudad ====\n'.green )
                console.log( 'Ciudad:', lugarSeleccionado.nombre )
                console.log( 'Lat:', lugarSeleccionado.latitud )
                console.log( 'Lng:', lugarSeleccionado.longitud )
                console.log( 'Temperatura:' )
                console.log( 'T. Mínima:' )
                console.log( 'T. Máxima:' )
                break;
        
        }


        if( opt !== 0 ) await pausa()

    } while ( opt !== 0 );


}

main()