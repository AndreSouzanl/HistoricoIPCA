import express from "express";
const app = express();

import {
  ListaTodosIpca,
  buscaIpcaPorAno,
  buscaPorId,
  calcularReajuste,
  validaErro,
} from "./servico/servico.js";

app.get("/historicoIPCA/calculo", (req, res) => {
  const valor = parseFloat(req.query.valor);
  const dataInicialMes = parseInt(req.query.mesInicial);
  const dataInicialAno = parseInt(req.query.anoInicial);
  const dataFinalMes = parseInt(req.query.mesFinal);
  const dataFinalAno = parseInt(req.query.anoFinal);

  if (
    validaErro(
      valor,
      dataInicialMes,
      dataInicialAno,
      dataFinalMes,
      dataFinalAno
    )
  ) {
    res.status(400).json({ erro: "Parâmetros inválidos" });
    return;
  }

  const resultado = calcularReajuste(
    valor,
    dataInicialMes,
    dataInicialAno,
    dataFinalMes,
    dataFinalAno
  );

  res.json({ resultado: resultado });
});

app.get("/historicoIPCA", (req, res) => {
  const anoIpca = parseInt(req.query.ano);
  if (isNaN(anoIpca)) {
    res.json(ListaTodosIpca());
  } else {
    const buscaPorAno = buscaIpcaPorAno(anoIpca);
    if (buscaPorAno.length > 0) {
      res.json(buscaPorAno);
    } else {
      res
        .status(404)
        .json({ erro: "Nenhum histórico encontrado para o ano especificado" });
    }
  }
});

app.get("/historicoIPCA/:id", (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    res.status(404).json({ errro: "ID inválido" });
    return;
  }

  const elemento = buscaPorId(id);
  if (elemento) {
    res.json(elemento);
  } else {
    res.status(404).json({ erro: "Elemento não encontrado" });
  }
});

app.listen(8080, () => {
  const data = new Date();
  console.log("Servidor rodando na porta 8080 ", data);
});
