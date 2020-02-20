let inputCPF = document.getElementById('cpfUsuario');
let inputSenha = document.getElementById('senhaUsuario');
let inputConfirmaSenha = document.getElementById('confimarSenhaUsuario');

let inputCEP = document.getElementById('cepUsuario');
let inputEndereco = document.getElementById('enderecoUsuario');
let inputBairro = document.getElementById('bairroUsuario');
let inputComplemento = document.getElementById('complementoUsuario');
let inputCidade = document.getElementById('cidadeUsuario');
let selectEstado = document.getElementById('estadoUsuario');

let inputNumeroCartao = document.getElementById('numeroCartao');
let inputCPFTitular = document.getElementById('cpfTitularCartao');
let inputCVV = document.getElementById('codSegurancaCartao');

//validacao cpf
inputCPF.addEventListener('keyup',()=>validarCampo(inputCPF,11));

inputCEP.addEventListener('input',()=>{
    validarCampo(inputCEP,8);
    if(inputCEP.value.length==8){
        buscaCep(inputCEP.value);
    }
});

inputCVV.addEventListener('keyup',()=>validarCampo(inputCVV,3));

inputNumeroCartao.addEventListener('keyup',()=>validarCampo(inputNumeroCartao,16));

inputCPFTitular.addEventListener('keyup',()=>validarCampo(inputCPFTitular,11));

inputConfirmaSenha.addEventListener('input',()=>{
    if(inputSenha.value !=inputConfirmaSenha.value){
        inputConfirmaSenha.setAttribute('class','form-control is-invalid');
    }
    else{
        inputConfirmaSenha.setAttribute('class','form-control is-valid');
    }
    if(inputSenha.value == "" && inputConfirmaSenha.value == ""){
        inputConfirmaSenha.removeAttribute('is-valid');
        inputConfirmaSenha.removeAttribute('is-invalid');
        inputConfirmaSenha.setAttribute('class','form-control');
    }
});

inputSenha.addEventListener('input',()=>{
    if(inputSenha.value !=inputConfirmaSenha.value){
        inputConfirmaSenha.setAttribute('class','form-control is-invalid');
    }
    else{
        inputConfirmaSenha.setAttribute('class','form-control is-valid');
    }
    if(inputSenha.value == "" && inputConfirmaSenha.value == ""){
        inputConfirmaSenha.removeAttribute('is-valid');
        inputConfirmaSenha.removeAttribute('is-invalid');
        inputConfirmaSenha.setAttribute('class','form-control');
    }
});

function validarCampo(input,i){
    if(isNaN(input.value)){
        input.value =  input.value.substring(0,( input.value.length - 1));
    }
    if(input.value.length>=i){
        input.value =  input.value.substring(0,i);
    }
}

function buscaCep(cep){
    if(cep.length==8){
        let a = "https://viacep.com.br/ws/"+cep+"/json"
        let resposta = fetch(a)
        .then((resposta)=>{
            return resposta.json();
        })
        .then((json)=>{
            if(json.erro==true){
                inputCEP.setAttribute('class','form-control is-invalid');
                inputEndereco.value="";
                inputBairro.value="";
                inputComplemento="";
                inputCidade.value="";
            }else{
                inputEndereco.value=json.logradouro;
                inputBairro.value=json.bairro;
                inputComplemento=json.complemento;
                inputCidade.value=json.localidade;
                inputCEP.setAttribute('class','form-control is-valid');
            }
        });
    }
}