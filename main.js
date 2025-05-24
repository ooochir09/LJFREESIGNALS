const ADMIN_IDS = [5354822471, 5288984314];
let currentUser = null;

function onTelegramAuth(user) {
  currentUser = user;
  document.getElementById("user-info").innerHTML = `<p>Привет, ${user.first_name}!</p>`;
  if (ADMIN_IDS.includes(user.id)) {
    document.getElementById("admin-panel").style.display = "block";
  }
}

function addPrize() {
  const prizeContainer = document.getElementById("prizes");
  const count = prizeContainer.children.length + 1;
  const label = document.createElement("label");
  label.innerHTML = `Приз ${count}:<br><input type="text" name="prize[]" required>`;
  prizeContainer.appendChild(label);
}

document.getElementById("raffle-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!currentUser || !ADMIN_IDS.includes(currentUser.id)) {
    alert("Доступ запрещён: только для админов.");
    return;
  }

  const title = document.getElementById("title").value;
  const prizes = Array.from(document.querySelectorAll("input[name='prize[]']")).map(el => el.value);

  const response = await fetch("https://your-backend-host/api/createRaffle", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title, prizes, user_id: currentUser.id})
  });

  const result = await response.json();
  document.getElementById("status").innerText = result.message || "Ошибка";
});
