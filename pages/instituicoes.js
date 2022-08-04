import React from "react";
import { Header } from "../components/Header";
import { instituicoesData } from "../data/instituicoesdata";
import { CardInstituicoes } from "../components/CardInstituicoes/CardInstituicoes";
import styles from "../styles/Instituicoes.module.css";

export default function instituicoes() {
  return (
    <div>
      <Header />
      <h1 className={styles.instituicoes_all_title}>Instituições parceiras</h1>
      <div className={styles.instituicoes_order}>
        {instituicoesData.map((item) => (
          <CardInstituicoes key={item.id} inst={item} />
        ))}
      </div>
    </div>
  );
}
