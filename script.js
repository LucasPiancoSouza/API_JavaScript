document.addEventListener("DOMContentLoaded", () => {
    id_input_cep = document.getElementById("input_cep");
    id_input_cep.addEventListener("keydown",(event) =>{
        if(event.key === "Enter"){
            buscar_cep();
        }
    })
});

function cep() {
   let id_cep = document.getElementById('cep');
    id_cep.classList.add('ativo');
   let id_endereco = document.getElementById('endereco');
    id_endereco.classList.remove('ativo');
}

function limpa_cep(){
    id_input =  document.getElementById("input_cep");
    id_resultado = document.getElementById("dados_resultado");

    id_input.value = ""
    id_resultado.innerText = "";
}

function endereco() {
    let id_cep = document.getElementById('cep');
    id_cep.classList.remove('ativo');
    let id_endereco = document.getElementById('endereco');
    id_endereco.classList.add('ativo');
}

async function buscar_cep(){
    let cep = document.getElementById("input_cep").value;

    if(cep.length !== 8){
        let id_resultado = document.getElementById('dados_resultado');
        id_resultado.innerText = "";
        id_resultado.innerText = "CEP Invalido, verique seu CEP";
        setTimeout(() =>{
        id_resultado.innerText = "";
        }, 5000
        )
    }else{
        let url = `https://viacep.com.br/ws/${cep}/json/`;
        const resposta = await fetch(url);

        if(!resposta.ok){
            console.log("Verifique o Link");
        }

        let dados = await resposta.json();

        let id_resultado = document.getElementById('dados_resultado'); 
        if (dados.erro){
             id_resultado.innerHTML = `
            <h4>Resultado</h4>
            <p>"CEP Invalido, verique seu CEP"</p>
        `;
        setTimeout(()=>{
            id_resultado.innerText ="";
        },5000)
        }
        else{
        id_resultado.innerHTML = `
            <p>${dados.logradouro}</p>
            <p>${dados.bairro}</p>
            <p>${dados.localidade}</p>
            <p>${dados.estado}</p>
        `;
    }
    }

}
