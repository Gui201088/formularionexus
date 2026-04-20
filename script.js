const USER = "subgui";
const PASS = "nexus123";

let recrutamentos = JSON.parse(localStorage.getItem('recrutamentos')) || [];

/* NAVEGAÇÃO */
function go(id){
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function goHome(){
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
}

/* ENVIAR */
function enviar(e){
  e.preventDefault();

  recrutamentos.push({
    nick: document.getElementById('nick').value,
    motivo: document.getElementById('motivo').value,
    skill: document.getElementById('skill').value,
    tempo: document.getElementById('tempo').value,
    discord: document.getElementById('discord').value
  });

  localStorage.setItem('recrutamentos', JSON.stringify(recrutamentos));
  alert("Inscrição enviada!");
}

/* LOGIN */
function login(e){
  e.preventDefault();

  if (document.getElementById('user').value === USER && document.getElementById('pass').value === PASS) {
    go('admin');
    render();
  } else {
    alert("Acesso negado");
  }
}

/* RENDER */
function render(){
  let div = document.getElementById('lista');
  div.innerHTML = "";

  recrutamentos.forEach((r, i) => {
    div.innerHTML += `
      <div class="admin-card">
        <b>${r.nick}</b><br>
        Motivo: ${r.motivo}<br>
        Habilidade: ${r.skill}<br>
        Tempo: ${r.tempo}<br>
        Discord: ${r.discord}<br>
        <button onclick="aceitar(${i})">Aceitar</button>
        <button onclick="recusar(${i})">Recusar</button>
      </div>
    `;
  });
}

function aceitar(i){
  recrutamentos.splice(i, 1);
  localStorage.setItem('recrutamentos', JSON.stringify(recrutamentos));
  render();
}

function recusar(i){
  recrutamentos.splice(i, 1);
  localStorage.setItem('recrutamentos', JSON.stringify(recrutamentos));
  render();
}
