function cep() {
   let id_cep = document.getElementById('cep');
    id_cep.classList.add('ativo');
   let id_endereco = document.getElementById('endereco');
    id_endereco.classList.remove('ativo');
}

function endereco() {
    let id_cep = document.getElementById('cep');
    id_cep.classList.remove('ativo');
    let id_endereco = document.getElementById('endereco');
    id_endereco.classList.add('ativo');
}

async function buscar_cep(){
    let cep = document.getElementById("input_cep").value;
    let url = `https://viacep.com.br/ws/${cep}/json/`;
    if(cep.length < 8 || cep.length > 8){
        let id_resultado = document.getElementById('resultado');
        id_resultado.innerText = "";
        id_resultado.innerText = "CEP Invalido, verique seu CEP";
        const cep_invalido = setInterval(() =>{
        id_resultado.innerText = "";
        }, 5000
        )
    }else{
        const resposta = await fetch(url);

        if(!resposta.ok){
            console.log("Verifique o Link");
        }

        let dados = await resposta.json();

        let id_resultado = document.getElementById('resultado'); 

        id_resultado.innerHTML = `
            <p>${dados.logradouro}</p>
            <p>${dados.bairro}</p>
            <p>${dados.localidade}</p>
            <p>${dados.estado}</p>
        `;
    }

}
