import _ from 'underscore';
import { crearBaraja, pedirCarta, valorCarta } from './usecases';

// Función autoinvocada
const moduloBlackjack = (() => {
  'use strict'

  /*
  * 2C = Two of Clubs (Tréboles)
  * 2D = Two of Diamonds (Diamantes)
  * 2H = Two of Hearts (Corazones)
  * 2S = Two of Spades (Picas)
  */

  const BLACKJACK = 21,
        FIGURA_AS = 11;

  const figuras = ['A','J','Q','K'],
        palos   = ['C','D','H','S'];

  let nroJugadores = 0,
      nroJugador   = 0;

  let baraja = [],
      puntajeJugadores = [];

  // Referencias HTML
  const btnNuevoJuego = document.querySelector('#btn-nuevo-juego'),
        btnPedirCarta = document.querySelector('#btn-pedir-carta'),
        btnDetener    = document.querySelector('#btn-detener');

  const spanJugador   = document.querySelectorAll('.puntaje-jugador'),
        playerCards   = document.querySelectorAll('.player-cards');


  // Función que se encarga de iniciar el juego
  const iniciarJuego = () => {

      baraja = crearBaraja( palos, figuras );

      for ( let i = 0; i <= nroJugadores; i++ ) {
          puntajeJugadores[i] = 0;
          spanJugador[i].innerText = puntajeJugadores[i];
          playerCards[i].innerHTML = '';
      }

      btnPedirCarta.disabled = false;
      btnDetener.disabled = false;

  };

  // Función que calcula el puntaje del jugador, según la carta
  const acumularPuntaje = ( carta, turnoJugador ) => {

      let cartaValor = valorCarta( carta );

      // El As puede tomar tanto 11 puntos como 1, pero siempre se queda con el puntaje máximo
      if ( cartaValor === FIGURA_AS && ( puntajeJugadores[turnoJugador] + cartaValor ) > BLACKJACK ) {
          cartaValor = 1;
      }

      puntajeJugadores[turnoJugador] += cartaValor;

      spanJugador[turnoJugador].innerText = puntajeJugadores[turnoJugador];

      return puntajeJugadores[turnoJugador];
  };

  // Función que muestra la carta repartida
  const agregarCartaJugador = ( carta, turnoJugador ) => {

      const playerCard = document.createElement('img');

      playerCard.classList.add( 'cards' );
      playerCard.src = `assets/img/${ carta }.png`;
      playerCard.alt = carta;

      playerCards[turnoJugador].append( playerCard );

  };

  // Función que determina el ganador del juego
  const determinarGanador = () => {

      setTimeout(() => {
          // Evalúo puntaje del dealer
          if ( puntajeJugadores[nroJugadores] > BLACKJACK ) {
              alert(`Has ganado el juego :)`);
          } else {
              alert(`Has perdido el juego :(`);
          };

          btnPedirCarta.disabled = true;
          btnDetener.disabled = true;
      }, 50);

  };

  // Función que reparte las cartas al dealer
  const turnoDealer = ( puntajeMaximo ) => {

      do {
          let carta = pedirCarta( baraja );

          acumularPuntaje( carta, nroJugadores );

          agregarCartaJugador( carta, nroJugadores );

      } while ( puntajeMaximo > puntajeJugadores[nroJugadores] );

      determinarGanador();

  }

  // Eventos HTML
  // Evento para iniciar un nuevo juego
  btnNuevoJuego.addEventListener('click', () => {

//      nroJugadores = parseInt(prompt('¿De cuántos jugadores es la partida? '));
      nroJugadores = 1;
      nroJugador   = 0;

      iniciarJuego();

  });

  // Evento para solicitar una nueva carta de la baraja
  btnPedirCarta.addEventListener('click', () => {

      let carta = pedirCarta( baraja );

      acumularPuntaje( carta, nroJugador );

      agregarCartaJugador( carta, nroJugador );

      // Evalúo puntaje del jugador
      if ( puntajeJugadores[nroJugador] === BLACKJACK ) {
          console.warn(`¡Blackjack! Has obtenido 21 puntos :)`);
          nroJugador++;
      } else if ( puntajeJugadores[nroJugador] > BLACKJACK ) {
          puntajeJugadores[nroJugador] = 0;
          nroJugador++;
      };

      // Se comienzan a repartir las cartas al dealer
      if ( nroJugador === nroJugadores ) {
          turnoDealer( _.max( puntajeJugadores ) );
      };
  });

  // Evento para repartir las cartas al dealer
  btnDetener.addEventListener('click', () => {

      turnoDealer( _.max( puntajeJugadores ) );

  });

  return {
      nuevoJuego : iniciarJuego,
  };

})();
