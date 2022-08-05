import React from "react";
import { Header } from "../components/Header";
import { instituicoesData } from "../data/instituicoesdata";
import { CardInstituicoes } from "../components/CardInstituicoes/CardInstituicoes";
import styles from "../styles/Instituicoes.module.css";

/* pagina instituicoes foi criada separadamente dos cards para o codigo ficar mais organizado, caso seja necessario alterar o card, nao precisa alterar a pagina instituicoes e caso seja necessario adicionar elementos na pagina instituicoes eles podem ser adicionados aqui. */

export default function instituicoes() {
  return (
    <div>
      <Header />
      <h1 className={styles.instituicoes_all_title}>Instituições parceiras</h1>
      <div className={styles.instituicoes_order}>
        {/* map utilizando os dados de "instituicoesData" e renderizando "CardInstituicoes". */}
        {instituicoesData.map((item) => (
          <CardInstituicoes key={item.id} inst={item} />
        ))}
      </div>
    </div>
  );
}
