const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

//4-Cria elemento lista html
function criaLi() {
  const li = document.createElement('li');
  return li;
}
//5-Adicionar tarefa quando o botão Enter for pressionado; Console.log(e) para ver o KeyCode da tecla Enter, que é 13.
inputTarefa.addEventListener('keypress', function (e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
  }
});
//6 - Executada após a função criaTarefa para limpar o campo de input
function limpaInput() {
  inputTarefa.value = '';
  inputTarefa.focus();
}

function criaBotaoApagar(li) {
  li.innerText += ' '; //Adiciona um espaço entre o innerText existente e o novo botão
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = 'Apagar'; //Adiciona o título do botão criado
  // botaoApagar.classList.add('apagar');
  botaoApagar.setAttribute('class', 'apagar'); //Adiciona um atributo class 'apagar' ao botão
  botaoApagar.setAttribute('title', 'Apagar esta tarefa');  //Adiciona um atributo título ao botão
  li.appendChild(botaoApagar); //Adiciona o filho button a li
}

//3.2
//O textoInput recebe o inputTarefa.value do item "3.1"
function criaTarefa(textoInput) {
  const li = criaLi();
  li.innerText = textoInput;
  tarefas.appendChild(li);
  limpaInput();
  criaBotaoApagar(li);
  salvarTarefas();
}

//1-Captura o evento de click do botão
btnTarefa.addEventListener('click', function () {
  if (!inputTarefa.value) return; //2-Se o campo input-nova-tarefa não tiver valor o click não submete a página
  criaTarefa(inputTarefa.value); //3.1
});

//8-e.target para mostrar qual elemento foi clicado. Se este el pai - parent - contem a class 'apagar' ele é removido quando clicamos no botão apagar
document.addEventListener('click', function (e) {
  const el = e.target;

  if (el.classList.contains('apagar')) {
    el.parentElement.remove();
    salvarTarefas();
  }
});

//9-
function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll('li');
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
    listaDeTarefas.push(tarefaTexto);
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefas);

  for (let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}
adicionaTarefasSalvas();
