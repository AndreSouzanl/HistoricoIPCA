import  historicoInflacao  from "../dados/dados.js";

function ListaTodosIpca() {
  return historicoInflacao;
}

function buscaIpcaPorAno(ano) {
  let anoSelecionado = historicoInflacao.filter(
    anoIpca => anoIpca.ano === ano
  );
  return anoSelecionado;
}

function buscaPorId(id) {
  const idIpca = parseInt(id);
  return historicoInflacao.find((id_ipca) => id_ipca.id === idIpca);
}

function calcularReajuste(valor,dataInicialMes, dataInicialAno, dataFinalMes,  dataFinalAno){

  const historicoFiltrado = historicoInflacao.filter(anoSelecionado => {
    if(dataInicialAno === dataFinalAno){
      return anoSelecionado.ano === dataInicialAno && anoSelecionado.mes >= dataInicialMes && anoSelecionado.mes <= dataFinalMes;
    }else{
      return(
        (anoSelecionado.ano === dataInicialAno && anoSelecionado.mes >= dataInicialMes) ||
        (anoSelecionado.ano > dataInicialAno && anoSelecionado.ano < dataFinalAno) ||
        (anoSelecionado.ano === dataFinalAno && anoSelecionado.mes <= dataFinalMes)
      );
    }
  }
);
let taxaMensais = 1;
for(const elemento of historicoFiltrado){
  taxaMensais *=  (elemento.ipca / 100) + 1;
}

const resultado = valor * taxaMensais
return parseFloat(resultado.toFixed(2))

}

function validaErro(valor, dataInicialMes, dataInicialAno, dataFinalMes, dataFinalAno) {
  const anoLimiteFinal = historicoInflacao[historicoInflacao.length - 1].ano;
  const anoLimiteInicial = historicoInflacao[0].ano
  const mesLimiteFinal = historicoInflacao[historicoInflacao.length - 1].mes;
  if (
    isNaN(valor) ||
    isNaN(dataInicialMes) ||
    isNaN(dataInicialAno) ||
    isNaN(dataFinalMes) ||
    isNaN(dataFinalAno) ||
    dataInicialMes < 1 || dataInicialMes > 12 ||
    dataInicialAno < anoLimiteInicial || dataInicialAno > anoLimiteFinal ||
    dataFinalMes < 1 || dataFinalMes > 12 ||
    dataFinalAno < anoLimiteInicial || dataFinalAno > anoLimiteFinal ||
    (dataFinalAno === anoLimiteFinal && dataFinalMes > mesLimiteFinal) ||
    dataFinalAno < dataInicialAno ||
    (dataFinalAno == dataInicialAno && dataFinalMes < dataInicialMes)
  ) {
    return true;
  } else {
    return false;
  }
}


export { ListaTodosIpca, buscaIpcaPorAno, buscaPorId, calcularReajuste, validaErro};
