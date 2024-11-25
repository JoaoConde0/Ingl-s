let teclas = {
    'q': '', 'w': '', 'e': '', 'r': '', 't': '', 'y': '', 'u': '', 'i': '', 'o': '', 'p': '', 'break': '',
    'a': '', 's': '', 'd': '', 'f': '', 'g': '', 'h': '', 'j': '', 'k': '', 'l': '', 'break2': '',
    'enter': '', 'z': '', 'x': '', 'c': '', 'v': '', 'b': '', 'n': '', 'm': '', '⌫': ''
  };
 
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${palavra}`;
  
  let tentativas = [];
  let tentativaAtual = [];
  
  const palavraSecreta = 'school';
  const numTentativas = 6;
  const correto = 'correto';
  const achou = 'achou';
  const errado = 'errado';
  
  function initialize() {
    let grade = document.getElementById("grade");
    for (let i = 0; i < numTentativas; i++) {
      for (let j = 0; j < palavraSecreta.length; j++) {
        grade.innerHTML += `<div id="${i}${j}" class="key-guess"></div>`
      }
      grade.innerHTML += '<br/>'
    }
  
    let teclado = document.getElementById("teclado");
    Object.keys(teclas).forEach((key) => {
      if (key.includes('break')) {
        teclado.innerHTML += '<br/>';
      } else {
        teclado.innerHTML += `<button id="${key}" class="key" onclick="keyClick('${key}')">` + key + '</button>';
      }
    });
  }
  initialize()
  
  function keyClick(key) {
    switch (key) {
      case '⌫':
        backspace();
        break;
      case 'enter':
        enter();
        break;
      default:
        if (tentativaAtual.length < palavraSecreta.length
          && tentativas.length < numTentativas) {
          tentativaAtual.push({ key: key, result: '' });
          updateTentativaAtual();
        }
    }
  }
  
  function backspace() {
    if (tentativaAtual.length > 0) {
      tentativaAtual.pop();
    }
    updateTentativaAtual();
  }
  
  function enter() {
    if (tentativaAtual.length < palavraSecreta.length || tentativas.length >= numTentativas) {
      return;
    }
    //TODO check a dictionary for a valid word
  
    tentativaAtual.forEach((keyGuess, index) => {
      if (palavraSecreta.charAt(index) == keyGuess.key) {
        keyGuess.result = correto
      } else if (palavraSecreta.includes(keyGuess.key)) {
        keyGuess.result = achou
      } else {
        keyGuess.result = errado
      }
  
      if (teclas[keyGuess.key] != correto) {
        teclas[keyGuess.key] = keyGuess.result
      }
    });
    updateTentativaAtual(true);
    tentativas.push(tentativaAtual);
    tentativaAtual = [];
  }
  
  function atualizarTeclado() {
    for (const key in teclas) {
      if (teclas[key] != '') {
        let keyElement = document.getElementById(`${key}`);
        keyElement.className = '';
        keyElement.classList.add(teclas[key]);
        keyElement.classList.add('key');
      }
    }
  }
  
  function updateTentativaAtual(guessed = false) {
    let index = tentativas.length;
    for (let i = 0; i < palavraSecreta.length; i++) {
      let grade = document.getElementById(`${index}${i}`);
      if (tentativaAtual[i]) {
        grade.innerHTML = tentativaAtual[i].key;
      } else {
        grade.innerHTML = '';
      }
      if (guessed) {
        grade.classList.add(tentativaAtual[i].result);
      }
    }
    if (guessed) {
      atualizarTeclado();
    }
  }