const fs = require('fs')

const axios = require('axios')


class Busquedas{

    historial = []
    dbPath = 'db/database.json'

    constructor(){ 
        // TODO: leer DB si existe
        this.leerDB()
    }

    get historialCapitalizado(){
        return this.historial.map( lugar => {
            // Dividimos cada elemento por palabras
            let palabras = lugar.split(' ')
            // Mayúscula la primera letra y luego agregamos el resto
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) )
            // retornamos la union de las palabras separados con un espacio
            return palabras.join(' ')
        } )
    }

    // parametros que utiliza axios en la peticion get a Maptiler
    get parametrosMaptiler(){
        return {
            'key': process.env.MAPTILER_KEY,
            'language': 'es',
            // 'types': 'place',
            // 'fruzzyMatch': true,
            'country': 'co',
            // 'autocomplete': true,
            'limit': 10
        }
    }

    // parametros de OpenWeather
    get parametrosOpenW(){
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async ciudad( lugar = '' ){

        try {
            // peticion http
            
            // Creando la instancia de Axios
            const instaciaAxios = axios.create({
                baseURL: `https://api.maptiler.com/geocoding/${lugar}.json`,
                params: this.parametrosMaptiler
            })

            // haciendo la petición GET
            const resp = await instaciaAxios.get();
            
            // retornando la información de las ciudades 
            return resp.data.features.map( lugar => ({      // de forma explícita se retorna un objeto con '({})'
                id: lugar.id,
                nombre: lugar.place_name_es,
                longitud: lugar.center[1],
                latitud: lugar.center[0]
            }))


        } catch (error) {
            return []   // retornar la lista de lugares encontrados
        }
        

    }

    async climaLugar( lat, lon ){

        try {
            // 1. Crear la instancia de axios
            const instaciaAxios = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: { ...this.parametrosOpenW, lat, lon }
            })

            // 2. Haciendo la petición GET
            const resp = await instaciaAxios.get()
            const { weather, main } = resp.data     // destructurando los objetos devueltos en el GET

            // 3. Retornando la información del clima
            return{
                desc: weather[0].description,
                temperatura: main.temp,
                tempMin: main.temp_min,
                tempMax: main.temp_max
            }

        } catch (error) {
            // console.log(error)
            return false
        }

    }

    agregarHistorial( lugar = '' ){
        // prevenir duplicados
        if( this.historial.includes( lugar.toLocaleLowerCase() ) ){
            return
        }

        // Mantener solo 5 elementos en el historial
        this.historial = this.historial.splice( 0, 4 )

        // guardadno en el array
        this.historial.unshift( lugar.toLocaleLowerCase() )

        // Grabar en DB
        this.guardarDB()

    }

    guardarDB(){

        const datos = {     // payload
            historial: this.historial
        }

        fs.writeFileSync( this.dbPath, JSON.stringify(datos) )
    }

    leerDB(){
        // verificando que exista la base de datos
        if( !fs.existsSync( this.dbPath ) ) {
            return null
        }

        const info = fs.readFileSync( this.dbPath, {encoding: 'utf-8'} )

        const data = JSON.parse( info )
        
        this.historial = data.historial
    }

}


module.exports = Busquedas
