const axios = require('axios')


class Busquedas{

    historial = ['Medellin','Madrid','Lima']

    constructor(){
        // TODO: leer DB si existe
    }

    // parametros que utiliza axios en la peticion get a Maptiler
    get parametrosMaptiler(){
        return {
            'key': process.env.MAPTILER_KEY,
            'language': 'es',
            'limit': 5
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

}


module.exports = Busquedas
