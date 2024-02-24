
import _ from 'underscore';

/**
 * Función que se encarga de crear una baraja
 * @param {Array<String>} tiposPalos Ejemplo: ['C','D','H','S']
 * @param {Array<String>} tiposFiguras Ejemplo: ['A','J','Q','K']
 * @returns {Array<String>}
 */
export const crearBaraja = ( tiposPalos, tiposFiguras ) => {

    if ( !tiposPalos || tiposPalos.length === 0 ) throw new Error('Son necesarios los "tipos de cartas" para crear una baraja');

    if ( !tiposFiguras || tiposFiguras.length === 0 ) throw new Error('Son necesarias las "cartas especiales" para crear una baraja');

    let baraja = [];

    for ( let palo of tiposPalos ) {
        for ( let i = 2; i <= 10; i++ ) {
            baraja.push(i + palo);
        }

        for ( let figura of tiposFiguras ) {
            baraja.push(figura + palo);
        }
    }

    return _.shuffle( baraja );
}
