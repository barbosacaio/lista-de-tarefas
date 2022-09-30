function salvarElementos(){
    // Variáveis necessárias para adicionar uma nova tarefa
    const textoTarefa = document.getElementById("textoTarefa");
    const adicionarTarefa = document.getElementById("adicionarTarefa");
    const editarTarefa = document.getElementById("editarTarefa");
    const listaDeTarefas = document.getElementById("listaDeTarefas");
    const salvarID = document.getElementById("salvarID");

    // Array para salvar todas as tarefas
    let listaTarefas = [];

    // Atualiza a lista para caso já tenha tarefas salvas
    mostrarLista();

    // Salvar os dados das variáveis na array
    adicionarTarefa.addEventListener("click", (e) => {
        e.preventDefault();
        let tarefa = localStorage.getItem("tarefa");
        if (tarefa === null) {
        listaTarefas = [];
        } else {
        listaTarefas = JSON.parse(tarefa);
        }
        listaTarefas.push(textoTarefa.value);
        textoTarefa.value = "";
        localStorage.setItem("tarefa", JSON.stringify(listaTarefas));
        mostrarLista();
    });
}

// Função para atualizar a lista e mostrá-la
function mostrarLista() {
    let tarefa = localStorage.getItem("tarefa");
    if (tarefa === null) {
      listaTarefas = [];
    } else {
      listaTarefas = JSON.parse(tarefa);
    }
    let codigo = "";
    listaTarefas.forEach((list, ind) => {
      codigo += `<div class='flex mb-4 items-center'>
      <p class='w-full text-grey-darkest'>${list}</p>
      <button onclick='editar(${ind})' class='flex-no-shrink p-2 ml-4 mr-2 border-2 rounded text-white text-grey bg-green-600'>Editar</button>
      <button onclick='excluir(${ind})' class='flex-no-shrink p-2 ml-2 border-2 rounded text-white bg-red-500'>Excluir</button>
   </div>`;
    });
    listaDeTarefas.innerHTML = codigo;
}

// Função para excluir uma tarefa cadastrada
function excluir(ind) {
    let tarefa = localStorage.getItem("tarefa");
    listaTarefas = JSON.parse(tarefa);
    listaTarefas.splice(ind, 1);
    localStorage.setItem("tarefa", JSON.stringify(listaTarefas));
    mostrarLista();
}

// Função para editar uma tarefa cadastrada
function editar(ind) {
    salvarID.value = ind;
    let tarefa = localStorage.getItem("tarefa");
    listaTarefas = JSON.parse(tarefa);
    textoTarefa.value = listaTarefas[ind];
    adicionarTarefa.style.display = "none";
    editarTarefa.style.display = "block";

    editarTarefa.addEventListener("click", () => {
        let tarefa = localStorage.getItem("tarefa");
        listaTarefas = JSON.parse(tarefa);
        let id = salvarID.value;
        listaTarefas[id] = textoTarefa.value;
        adicionarTarefa.style.display = "block";
        editarTarefa.style.display = "none";
        localStorage.setItem("tarefa", JSON.stringify(listaTarefas));
        textoTarefa.value = "";
        mostrarLista();
    });
}