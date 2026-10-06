// ==============
// Elementos DOM
// ==============

const form = document.querySelector('#form-tarefa') 
const inputTarefa = document.querySelector('#tarefa')
const contador = document.querySelector('#contador')
const listaTarefas = document.querySelector('#lista-tarefas')

// Resgate das tarefas no localStorage

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Ouvir o evento click

form.addEventListener("submit", adicionarTarefa)

// Funções

function adicionarTarefa() {

    event.preventDefault();

    let texto = inputTarefa.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const novaTarefa = {
        id: Date.now(),
        texto: texto,
        concluido: false
    };

    tarefas.push(novaTarefa);

    salvarTarefa();

    renderizarTarefas();
    
    inputTarefa.value = "";
    inputTarefa.focus();
}

function salvarTarefa () {

    localStorage.setItem("tarefas", JSON.stringify(tarefas));

}

function renderizarTarefas () {

    listaTarefas.innerHTML = "";

    tarefas.forEach(function (tarefa, indice) {

        const linha = document.createElement("tr");

        const colunaNumero = document.createElement("td");
        colunaNumero.textContent = indice + 1;

        const colunaTarefa = document.createElement("td");
        colunaTarefa.textContent = tarefa.texto;

        if (tarefa.concluido){

            colunaTarefa.classList.add(
                "text-decoration-line-through",
                "text-muted",
            );
        }

        const colunaStatus = document.createElement("td");
        if (tarefa.concluido) {
            colunaStatus.innerHTML = '<span class="badge text-bg-success">Concluida</span>';
        } else {
            colunaStatus.innerHTML = '<span class="badge text-bg-warning">Pendente</span>';
        }


        linha.appendChild(colunaNumero);
        linha.appendChild(colunaTarefa);
        linha.appendChild(colunaStatus);

        listaTarefas.appendChild(linha);

    });

}