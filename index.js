const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");
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
                // Pedir la ciudad al usuario
                const lugar = await leerInput( 'Ciudad: ' )
                busquedas.ciudad( lugar )

                // Peticion http para buscar las ciudades que coincidan
                
                // Mostrar el listado de ciudades para que el usuario seleccione
                
                // Peticion hhtp para consultar el clima de la ciudad seleccionada
                
                // Mostrar los resultados
                console.log( '\n==== Información de la ciudad ====\n'.green )
                console.log( 'Ciudad:' )
                console.log( 'Lat:' )
                console.log( 'Lng:' )
                console.log( 'Temperatura:' )
                console.log( 'T. Mínima:' )
                console.log( 'T. Máxima:' )
                break;
        
        }


        if( opt !== 0 ) await pausa()

    } while ( opt !== 0 );


}

main()