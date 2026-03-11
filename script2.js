const formcadastro = document.getElementById('pacienteCadastro');

const apiUrl = "http://localhost:5183/api/Pacientes";

const divCards = document.getElementById('card');



async function buscarPaciente() {

    try{

        const resposta = await fetch(apiUrl);

        if (!resposta.ok) {

            throw new Error(`Erro HTTP:  ${resposta.status}`);

        }

        const dados = await resposta.json();

        divCards.innerHTML = '';

        dados.forEach((dado) => {

            // criar elemento HTML para exibir os dados

            let card = document.createElement('div');

            card.innerHTML = `<h3>${dado.nome}</h3><p>${dado.numeroSUS}</p></h3><p>${dado.dataNascimento}</p></h3><p>${dado.telefone}</p>`;

            divCards.appendChild(card);

        });        

    } catch (error) {

        console.error('Erro ao buscar dados:', error);

}}



async function cadastrarPaciente(event) {

    event.preventDefault();

    const nome = document.getElementById('nome').value;

    const numeroSUS = document.getElementById('numeroSUS').value;

    const dataNascimento = document.getElementById('dataNascimento').value;

    const telefone = document.getElementById('telefone').value;

    

    try {
        const resposta = await fetch(apiUrl, {
          method: "POST",
    
          headers: {
            "Content-Type": "application/json",
          },
    
          body: JSON.stringify({
            nome : nome,
    
            numeroSUS: numeroSUS,
    
            dataNascimento: dataNascimento,
    
            telefone: telefone
          }),
        });
    
        console.log("Resposta da API", resposta);
    
        if (!resposta.ok) {
          throw new Error("Error ao cadastrar o exame");
        }
    
        const dados = await resposta.json();
    
        console.log("Exame cadastrado com sucesso", dados);
    
        formcadastro.reset();
    
        await buscarPaciente();
      } catch (error) {
        console.error("Erro ao cadastrar exame", error);
      }
    }
    
    formcadastro.addEventListener("submit", cadastrarPaciente);
    
    buscarPaciente();
    
    