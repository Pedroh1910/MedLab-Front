async function carregarPacientes() {
    try{
        const response = await fetch(apiUrl2);
        if (!response.ok) {
            throw new Error(`Erro HTTP:  ${response.status}`);
        };
        const data = await response.json();
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}
