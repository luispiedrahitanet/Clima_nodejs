require('dotenv').config()
require('colors')

const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async ()=>{
    
    const busquedas = new Busquedas()

    let opt

    do {
        
        // imprimiendo el menú
        opt = await inquirerMenu()
        // console.log( {opt} ) // muestra la opcion seleccionada
        // console.log( busquedas.historial )

        switch ( opt ) {
            case 1:
                // ========= Pedir la ciudad al usuario
                const termino = await leerInput( 'Ciudad: ' )
               
                // ========= Peticion http para buscar las ciudades que coincidan
                const lugares = await busquedas.ciudad( termino )
               
                // ========= Mostrar el listado de ciudades para que el usuario seleccione
                const id = await listarLugares(lugares)
                if( id == '0' ) continue
                const lugarSeleccionado = lugares.find( lugar => lugar.id === id )
                
                // Guardar en DB
                busquedas.agregarHistorial( lugarSeleccionado.nombre )
                
                // ========= Peticion hhtp para consultar el clima de la ciudad seleccionada
                const clima = await busquedas.climaLugar( lugarSeleccionado.latitud, lugarSeleccionado.longitud )

                // ========= Mostrar los resultados
                if( clima ){
                    console.log( '\n==== Información de la ciudad ====\n'.green )
                    console.log( 'Ciudad:', lugarSeleccionado.nombre.green )
                    console.log( 'Lat:', lugarSeleccionado.latitud )
                    console.log( 'Lng:', lugarSeleccionado.longitud )
                    console.log( 'Temperatura:', clima.temperatura )
                    console.log( 'T. Mínima:', clima.tempMin )
                    console.log( 'T. Máxima:', clima.tempMax )
                    console.log( 'Como está el clima:', clima.desc.green )
                } else {
                    console.log( '\nNo hay información del clima para este lugar.\n'.red )
                }
                break;

            case 2:
                busquedas.historialCapitalizado.forEach( (lugar, i) => {
                    const idx = `${ i + 1 }.`.green
                    console.log( `${ idx } ${ lugar }` )
                })
                break;
        
        }


        if( opt !== 0 ) await pausa()

    } while ( opt !== 0 );


}

main()