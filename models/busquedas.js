const axios = require('axios')


class Busquedas{

    historial = ['Medellin','Madrid','Lima']

    constructor(){
        // TODO: leer DB si existe
    }

    // parametros que utiliza axios en la peticion get a Maptiler
    get parametrosMaptiler(){
        return {
            'key': 'yhuQplY1NtDOO47nIhoP',
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
            
            console.log( resp.data )
        } catch (error) {
            return []   // retornar la lista de lugares encontrados
        }
        

    }

}


module.exports = Busquedas
