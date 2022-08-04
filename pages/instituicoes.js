import React from "react";
import { Header } from "../components/Header";
import { instituicoesData } from "../data/instituicoesdata";
import { CardInstituicoes } from "../components/CardInstituicoes/CardInstituicoes";

export default function instituicoes() {
  return (
    <div>
      <Header />
      <h1>Instituições</h1>
      <div>
        {instituicoesData.map((item) => (
          <CardInstituicoes key={item.id} inst={item} />
        ))}
      </div>
    </div>
  );
}
