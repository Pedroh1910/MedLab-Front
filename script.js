const formcadastro = document.getElementById("formcadastro");
const apiUrl = "http://localhost:5183/api/Exames";
const apiUrl2 = "http://localhost:5183/api/Pacientes";
const divCards = document.getElementById("card");
const selectPaciente = document.getElementById("paciente");

async function buscarExames() {
    try {
        const resposta = await fetch(apiUrl);
        if (!resposta.ok) throw new Error(`Erro HTTP: ${resposta.status}`);

        const dados = await resposta.json();
        divCards.innerHTML = "";

        dados.forEach((dado) => {
            let card = document.createElement("div");
            card.className = "exame-card"; 
            card.innerHTML = `
                <h3>${dado.tipo}</h3>
                <p>Data: ${dado.dataRealizacao.split('T')[0]}</p>
                <p>Custo: R$ ${dado.custoLaboratorial || 'Privado'}</p>
                <p>Resultado: ${dado.resultado || 'Pendente'}</p>
                <p>ID Paciente: ${dado.pacienteId}</p>
            `;
            divCards.appendChild(card);
        });
    } catch (error) {
        console.error(error);
    }
}

async function listarPacientes() {
    try {
        const response = await fetch(apiUrl2);
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        
        const pacientes = await response.json();
        
        selectPaciente.innerHTML = "<option value=''>Selecione o Paciente</option>";
        
        pacientes.forEach((paciente) => {
            const option = document.createElement("option");
            option.value = paciente.id; 
            option.textContent = `ID: ${paciente.id} - ${paciente.nome}`; 
            selectPaciente.appendChild(option);
        });
    } catch (error) {
        console.error(error);
    }
}

async function cadastrarExame(event) {
    event.preventDefault();

    const pacienteIdSelecionado = selectPaciente.value;

    if (!pacienteIdSelecionado) {
        alert("Selecione um paciente!");
        return;
    }

    const corpoDados = {
        tipo: document.getElementById("tipo").value,
        dataRealizacao: document.getElementById("dataRealizacao").value,
        custoLaboratorial: Number(document.getElementById("custoLaboratorial").value),
        pacienteId: Number(pacienteIdSelecionado),
        resultado: "Aguardando Análise"
    };

    try {
        const resposta = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(corpoDados),
        });

        if (!resposta.ok) throw new Error("Erro ao cadastrar");

        formcadastro.reset();
        await buscarExames();
    } catch (error) {
        console.error(error);
    }
}

formcadastro.addEventListener("submit", cadastrarExame);
buscarExames();
listarPacientes();