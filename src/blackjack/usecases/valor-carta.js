
/**
 * Función que retorna el valor de una carta, para luego sumarizarlo
 * @param {String} carta 
 * @returns {Integer}
 */
export const valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length - 1);

    if ( isNaN( valor ) ) {
        return ( valor === 'A' ) ? 11 : 10;
    }

    return parseInt( valor );
}
