const App = (function(){
  let currentState;

  const Ui = {
    currentMode: document.getElementById('currentMode'),
    modeBtn: document.getElementById('switchMode'),
    textarea: document.getElementById('messageArea'),
    securityKey: document.getElementById('securityKey'),
    cryptBtn: document.getElementById('cryptBtn')
  }

  //Updating Text
  const updateText = (mode) => {
    Ui.currentMode.textContent = mode;
    Ui.cryptBtn.textContent = mode;
    Ui.modeBtn.textContent = (mode === 'Encrypt' ? 'Decryptor' : 'Encryptor');
    currentState = mode;
  }

  //Switch switchState
  const switchState = () => {
    (currentState === 'Encrypt' ? updateText('Decrypt') : updateText('Encrypt'));
  }

  //Attaching Event Listeners
  const attachEventListener = () => {
    Ui.modeBtn.addEventListener('click', switchState),
    Ui.cryptBtn.addEventListener('click', cryption)
  }

  //Validating
  const cryption = () => {
    if((Ui.securityKey.value <= 5) && !isNaN(Ui.securityKey.value) && !!Ui.securityKey.value){
      if (Boolean(Ui.textarea.value.trim()) === true) return (currentState === 'Encrypt' ? encrypt(Ui.textarea.value, Ui.securityKey.value) : decrypt (Ui.textarea.value, Ui.securityKey.value));
    }
    alert('Security key must be a number with a value of 5 or lower');
  };

  function encrypt(text, n) {
  let itr = 0;
  const encrypting = (text) => {
    	if (itr == n || n < 0 || text == null) return displayCrypted(text, n);
      	let str = Array.of(...text);
      	let f = str.filter((c,i) => i % 2);
      	let s = str.filter((c,i) => !(i % 2));
      	itr++;
        encrypting(f.concat(s).join(''));
  };
return encrypting(text);
};


function decrypt(encryptedText, n) {
    let itr = 0;
    const decrypting = (text) => {
        if (itr == n || n < 0 || text == null) return displayCrypted(text, n);
        let str = Array.of(...text);
        let e = str.slice(0, str.length/2);
        let o = str.slice(Math.floor(str.length / 2), str.length);
        let newStr = [];
        str.forEach((c,i) => {
          newStr.push(o[i], e[i]);
          });
        itr++
        return decrypting(newStr.join(''));
    };
    return decrypting(encryptedText);
}

  const displayCrypted = (text, securityKey) => {
    Ui.textarea.value = text;
    Ui.securityKey.value = securityKey;
  }

  const init = () => {
    updateText('Encrypt'),
    attachEventListener()
  }

  return {
    init
  }

})();

App.init();