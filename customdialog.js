export function createAlertDialog() {

  let dialog = document.createElement('dialog');
  dialog.innerHTML = `
    <p>Alert pressed!</p>
    <button>Ok</button>
  `
  dialog.querySelector('button').addEventListener('click', () => {
    dialog.close();
    dialog.remove();
  });
  document.body.appendChild(dialog);
  dialog.showModal();
}

export function createConfirmDialog() {

  let dialog = document.createElement('dialog');
  dialog.innerHTML = `
    <form method="dialog">
      <p>Do you confirm this?</p>
      <menu>
        <button value="false">Cancel</button>
        <button value="true">Confirm</button>
      </menu>
    </form>
  `

  dialog.addEventListener('close', () => {
    document.querySelector('output').innerHTML = `Confirm result: ${dialog.returnValue}`;
    dialog.remove();
  })

  document.body.appendChild(dialog);
  dialog.showModal();
}

export function createPromptDialog() {

  let dialog = document.createElement('dialog');
  dialog.innerHTML = `
    <form method="dialog">
      <label for="response">Enter a string:</label>
      <input id="response" name="response" type="text">
      <menu>
        <button value="">Cancel</button>
        <button id="prompt-confirm" value="">Confirm</button>
      </menu>
    </form>
  `

  dialog.querySelector('input').addEventListener('change', (e) => {
    dialog.querySelector('#prompt-confirm').value = e.target.value;
  })

  dialog.addEventListener('close', () => {
    let response = dialog.returnValue;
    response = DOMPurify.sanitize(response);
    document.querySelector('output').innerHTML = `User response: ${response ? response : 'User didn\'t enter anything'}`;
    dialog.remove();
  })

  document.body.appendChild(dialog);
  dialog.showModal();
}