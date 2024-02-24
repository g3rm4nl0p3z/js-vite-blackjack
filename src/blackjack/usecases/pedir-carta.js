
/**
 * Función que se encarga de pedir una carta de la baraja, y la quita de la misma
 * @param {Array<String>} baraja 
 * @returns {Array<String>}
 */
export const pedirCarta = ( baraja ) => {

    if ( baraja.length === 0 ) {
        throw 'No hay más cartas en la baraja';
    }

    return baraja.shift();
}
