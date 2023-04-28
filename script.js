var tablero = document.getElementById('tablero')
var botonStart = document.getElementById("start");
var botonStop = document.getElementById("stop");
var botonRestart = document.getElementById("restart");
const divs = document.querySelectorAll('[id^="ficha"]');
let tiempo = 60;
let aciertos = 0;
let fichas = [];
let movimientos = 0;

divs.forEach((div) => {
    div.classList.add('acertado')
})

function empezar(){
    divs.forEach((div) => {
        div.classList.remove('acertado')
    })
    botonRestart.style.display = 'none'
    botonStop.disabled = false;
    for (let i = 0; i < 16; i++){
        let ficha = document.getElementById('ficha' + i)
        ficha.querySelector('img').style.visibility = 'hidden'
        ficha.classList.add('ficha-oculta')
    }
    juego()
}

function frenar(){
    for (let i = 0; i < 16; i++){
        let ficha = document.getElementById('ficha' + i)
        ficha.querySelector('img').style.visibility = 'visible'
        ficha.classList.remove('ficha-oculta')
    }
    botonRestart.style.display = 'block'
    detenerTemporizador();
    botonStart.disabled = true;
    divs.forEach((div) => {
        div.classList.add('acertado')
    })
}

function restart(){
    location.reload()
}

function juego(){
    intercambiarDivs()
    iniciarTemporizador()
}

function jugar(evento){
    fichas.push(this)
    this.classList.remove('ficha-oculta')
    this.classList.add('acertado')
    this.querySelector('img').style.visibility = 'visible'
    if (fichas.length > 1) {
        if (fichas[0].querySelector('img').alt === fichas[1].querySelector('img').alt) {
            aciertos++
            fichas[0].classList.add('acertado')
            fichas[1].classList.add('acertado')
            fichas = [];
            movimientos++

            if (aciertos > 7) {
                botonStart.style.display = 'none'
                botonStop.style.display = 'none'
                botonRestart.style.display = 'inline-block'
                document.querySelector('#tiempo').style.display = 'inline-block'
                document.querySelector('#tiempo').style.width = 'auto'
                clearInterval(timer);
                document.querySelector('#tiempo').textContent = (`Felicidades! Has ganado en ${60-tiempo} segundos y realizaste ${movimientos} movimientos!`);
            }
        } 
        else if ( fichas[0].querySelector('img').alt !== fichas[1].querySelector('img').alt) {
            movimientos++
            fichas.forEach((ficha) => {
                let timer = setInterval(() => {
                  ficha.classList.add("ficha-oculta");
                  ficha.classList.remove("acertado");
                  ficha.querySelector('img').style.visibility = 'hidden';
                  clearInterval(timer);
                }, 500);
              })
              fichas = [];
        }
    
    }   
        
    
}

function azar(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

function intercambiarDivs() {
    const container = document.getElementById('tablero')
    const divs = Array.from(document.querySelectorAll("div[id^='ficha']"));
    const shuffledDivs = azar(divs);
    shuffledDivs.forEach((div) => {
        const randomIndex = Math.floor(Math.random() * (divs.length));
        container.insertBefore(div, divs[randomIndex]);
        });
}

function iniciarTemporizador() {
    timer = setInterval(() => {
      tiempo--;
      if (tiempo >= 0) {
        document.querySelector('#tiempo').style.display = 'flex'
        document.querySelector('#tiempo').textContent = `${tiempo}`;
      } else {
        clearInterval(timer);
        document.querySelector('#tiempo').style.display = 'inline-block'
        document.querySelector('#tiempo').style.width = 'auto'
        document.querySelector('#tiempo').textContent = (`Perdiste! El tiempo ha terminado, tuviste ${aciertos} aciertos y realizaste ${movimientos} movimientos!`);
      }
    }, 1000);
}
  
function detenerTemporizador() {
    clearInterval(timer);
}



botonStart.addEventListener('click', empezar)
botonStop.addEventListener('click', frenar)
botonRestart.addEventListener('click', restart)
Array.from(divs).forEach((div) => {
    div.addEventListener("click", jugar);
  });
