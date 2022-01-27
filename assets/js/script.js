'use strict';
let banco = [];


// cria o banco de dados para armazenar valores inseridos
const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));


//cria o evento de click no botão checkbox para marcar o item como feito
const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
    <input type="checkbox"${status} data-indice=${indice}>
    <div>${tarefa}</div>
    <input type="button" value="X" data-indice=${indice}>`;

    document.getElementById('todoList').appendChild(item);
}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}
//cria alguns itens no banco de dados
const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}
// cria a entrada de texto e botão para adicionar novo item

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter') {
        const banco = getBanco();
        banco.push({
            tarefa: texto,
            status: ''
        });
        setBanco(banco);
        atualizarTela();
        evento.target.value = ''; //limpar o input

    }
}
// remove o item do banco de dados  e atualiza a tela
const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1); //remover a partir do item que pede com click no caso ele prorio
    setBanco(banco);
    atualizarTela();
}
const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();

}

// cria o evento de click no botão X para excluir o item
const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);

    }

}


document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);
atualizarTela();