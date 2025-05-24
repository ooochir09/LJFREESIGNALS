const ADMIN_IDS = [5354822471, 5288984314];
let currentUser = null;

function onTelegramAuth(user) {
  currentUser = user;
  document.getElementById('user-info').innerHTML = `<p>Привет, ${user.first_name}!</p>`;
  if (ADMIN_IDS.includes(user.id)) {
    document.getElementById('admin-panel').style.display = 'block';
  }
  loadRaffles();
}

function addPrize() {
  const container = document.getElementById('prizes');
  const count = container.children.length + 1;
  const label = document.createElement('label');
  label.innerHTML = `Приз ${count}:<br><input type="text" name="prize[]" required>`;
  container.appendChild(label);
}

document.getElementById('raffle-form').addEventListener('submit', async e => {
  e.preventDefault();
  if (!currentUser || !ADMIN_IDS.includes(currentUser.id)) {
    alert('Доступ только для админов.');
    return;
  }
  const title = document.getElementById('title').value;
  const prizes = Array.from(document.querySelectorAll('input[name="prize[]"]')).map(i => i.value);
  const res = await fetch('https://<YOUR_BACKEND_URL>/api/createRaffle', {
    method: 'POST', headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ title, prizes, user_id: currentUser.id })
  });
  const data = await res.json();
  document.getElementById('status').innerText = data.message;
  if (res.ok) loadRaffles();
});

async function loadRaffles() {
  const res = await fetch('https://<YOUR_BACKEND_URL>/api/raffles');
  const raffles = await res.json();
  const list = document.getElementById('raffles-list');
  list.innerHTML = '';
  raffles.forEach(r => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${r.title}</h3>
      <ol>${r.prizes.map(p=>`<li>${p}</li>`).join('')}</ol>
      <small>Создан: ${new Date(r.createdAt).toLocaleString()}</small>
    `;
    list.appendChild(card);
  });
}
