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
    id_resultado.innerHTML = "<br>";
}

function limpa_endereco(){
    input_UF =  document.getElementById("input_UF");
    input_cidade =  document.getElementById("input_cidade");
    input_logradouro =  document.getElementById("input_logradouro");
    id_resultado = document.getElementById("dados_resultado");

    input_UF.value = '' ;
    input_cidade.value = '' ;
    input_logradouro.value = ''; 
    id_resultado.innerText = "";
}
function endereco() {
    let id_cep = document.getElementById('cep');
    id_cep.classList.remove('ativo');
    let id_endereco = document.getElementById('endereco');
    id_endereco.classList.add('ativo');
}

async function buscar_cep(){
    let cep = document.getElementById("input_cep").value.replace(/[\.-]/g, "");
    cep_storage = localStorage.setItem("cep",cep);

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
            <br>
            <p>Rua: ${dados.logradouro}</p>
            <p>Bairro: ${dados.bairro}</p>
            <p>Cidade: ${dados.localidade}</p>
            <p>Estado: ${dados.estado}</p>
        `;

        let id_div = document.getElementById("dados_historico");
        let qtd_p = id_div.getElementsByTagName("p").length;
        let p = document.createElement("p");
        let cep_armezado = localStorage.getItem('cep');
        p.textContent = cep_armezado;

        p.onclick = async function(){
            let input = document.getElementById("input_cep");
            input.value = cep_armezado ;

            let url = `https://viacep.com.br/ws/${cep_armezado}/json/`;
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
            <br>
            <p>Rua: ${dados.logradouro}</p>
            <p>Bairro: ${dados.bairro}</p>
            <p>Cidade: ${dados.localidade}</p>
            <p>Estado: ${dados.estado}</p>`
        };
    };
        ultimo_cep = id_div.lastElementChild.textContent;
        if(cep != ultimo_cep){
           if(qtd_p >= 4){
            id_div.removeChild(id_div.firstElementChild);
             id_div.appendChild(p);
        }else{
            id_div.appendChild(p); 
        }
        }
        
    // E trouxe Efeito viu kakkaakaka oh gloriaaaaaa    
    // console.log("Me ajude Senhor, Em nome de Jesus, Amém")
    }
    
    }
   

}
async function buscar_endereco(){
let estado = document.getElementById("input_UF").value.replace(/\s/g, '');
let cidade = document.getElementById("input_cidade").value.replace(/\s/g, '');
let logradouro = document.getElementById("input_logradouro").value.replace(/\s/g, '');
let id_resultado = document.getElementById("dados_resultado");

let url = `https://viacep.com.br/ws/${estado}/${cidade}/${logradouro}/json/`;

const resposta = await fetch(url);


} 

