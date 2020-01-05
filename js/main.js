document.getElementById('formulario').addEventListener('submit', cadastraVeiculo);

function cadastraVeiculo (){

    //criando uma variavel para pegar o valor do input através do id
    var modeloCarro = document.getElementById('modeloCarro').value;
    var placaCarro = document.getElementById('placaCarro').value;
    var time = new Date(); //pegando a hora atual

    //FAÇO A VALIDAÇÃO PARA VER SE OS CAMPOS ESTÃO VAZIOS
    if(!modeloCarro){
        alert ('O MODELO DO CARRO PRECISA SER PREENCHIDO!');
        return false;
    }
    if(!placaCarro){
        alert ('A PLACA DO CARRO PRECISA SER PREENCHIDO');
        return false;
    }


    carro = {
        modelo: modeloCarro,
        placa: placaCarro,
        hora: time.getHours(),
        minutos: time.getMinutes()
    }
    if(localStorage.getItem('patio2') === null){
        var carros = [];    //array
        carros.push(carro);
        localStorage.setItem('patio2', JSON.stringify(carros)); //TENHO QUE RETORNAR EM STRINGFY (STRING)
    }  
    else{
        var carros = JSON.parse(localStorage.getItem('patio2')); //PARA VOLTAR A OBJETO (JSON.PARSE)
        carros.push(carro); //PUXADO DO OBJETO CARRO
        localStorage.setItem('patio2', JSON.stringify(carros));
    }

    document.getElementById('formulario').reset(); //RESETAR OS CAMPOS DO FORMULÁRIO APÓS ENVIAR
  
}
function apagarVeiculo(placa){
    var carros = JSON.parse(localStorage.getItem ('patio2'));

    for (var i=0; i<carros.length; i++){
        //AQUI EU VEJO SE A PLACA É A MESMA
        if(carros[i].placa == placa){
            carros.splice(i, 1);
        }

        localStorage.setItem('patio2', JSON.stringify(carros));
    }

    //MOSTRO COM OS VALORES NOVOS
    mostraPatio();
}

function mostraPatio(){
    var carros = JSON.parse(localStorage.getItem('patio2'));
    var carrosResultados= document.getElementById('resultados');

    carrosResultados.innerHTML = '';
    
    //BUSCO OS VALORES DO OBJETO NA POSIÇÃO i DO FOR
    for(var i = 0; i < carros.length; i++){
        var modelo = carros[i].modelo;
        var placa = carros[i].placa;
        var hora = carros[i].hora;
        var minutos = carros[i].minutos;

        //AQUI JOGO NA TABELA
        carrosResultados.innerHTML += '<tr> <td>' + modelo + '</td>' +
                                '<td>' + placa + '</td>' +
                                '<td>' + hora + ':' + minutos + '</td>' +
                                '<td> <button class="btn btn-dark" onclick="apagarVeiculo(\'' + placa + '\')">Excluir</button> <td>'  
                                +'</tr>'; 


    }
}