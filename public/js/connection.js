const createForm = document.getElementById('create-form');
const card1 = document.getElementById('card1');
const name = document.getElementById('name');

async function createUser(e) {
  e.preventDefault();

  if(card1.value === '' || name.value ==='') {
    alert('Por favor complete los campos');
    return;
  }

  const sendBody = {
    card: card1.value,
    name: name.value,
  }

  try {
    const res = await fetch('/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendBody)
    });

    const message = (await res.json()).message;

    alert(message);
  } catch (error) {
    console.log(error);
  }
}

createForm.addEventListener('submit', createUser);

const reloadForm = document.getElementById('reload-form');
const card2 = document.getElementById('card2');
const money = document.getElementById('money');

async function reloadCard(e) {
  e.preventDefault();

  if(card2.value === '') {
    alert('Por favor escriba el número de la tarjeta');
    return;
  }

  const sendBody = {
    card: card2.value,
    load: money.value
  }

  try {
    const res = await fetch('/reload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendBody)
    });

    const message = (await res.json()).message;

    alert(message);
  } catch (error) {
    console.log(error);
  }
}

reloadForm.addEventListener('submit', reloadCard);
