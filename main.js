async function loadRaffles() {
  const res = await fetch("https://ljfreesignals.vercel.app/");
  const raffles = await res.json();

  const list = document.createElement("div");
  list.classList.add("card");

  raffles.forEach(r => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${r.title}</h3>
      <p><strong>Призы:</strong></p>
      <ol>${r.prizes.map(p => `<li>${p}</li>`).join('')}</ol>
      <p><em>Создан: ${new Date(r.createdAt).toLocaleString()}</em></p>
    `;
    list.appendChild(div);
  });

  document.body.appendChild(list);
}

window.onload = () => {
  loadRaffles();
};
