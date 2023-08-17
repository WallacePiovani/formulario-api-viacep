async function buscaEndereço(cep){
    var mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML=''
    try{
        var consultaCEP = await fetch(`http://viacep.com.br/ws/${cep}/json/`)
        var consultaCEPConvertida = await consultaCEP.json()
        if(consultaCEPConvertida.erro){
            throw Error('CEP não existente')
        }

        const cidade = document.getElementById('cidade')
        const logradouro = document.getElementById('endereco')
        const estado = document.getElementById('estado')
        const bairro = document.getElementById('bairro')

        cidade.value = consultaCEPConvertida.localidade
        logradouro.value = consultaCEPConvertida.logradouro
        estado.value = consultaCEPConvertida.uf
        bairro.value = consultaCEPConvertida.bairro

        console.log(consultaCEPConvertida)
        return consultaCEPConvertida
    } catch(erro){
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
    }
}


const cep = document.getElementById('cep')

cep.addEventListener('focusout', ()=>buscaEndereço(cep.value))