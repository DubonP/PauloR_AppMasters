import React from "react";
import Link from "next/link";
import styles from "../../styles/CardInstituicoes.module.css";
import Image from "next/image";

export function CardInstituicoes(props) {
  return (
    <div className={styles.CardInstituicoes_all}>
      <div className={styles.CardInstituicoes_img}>
        <Image
          src="/images/Computadores.jpg"
          width={200}
          height={200}
          alt="Background"
          className={styles.background}
        />
      </div>
      <div className={styles.CardInstituicoes_card}>
        <div>
          <h2>{props.inst.nome}</h2>
        </div>
        <div>
          <span>{props.inst.cidade}</span>
          <span>{props.inst.bairro}</span>
        </div>
        <div>
          <span>{props.inst.apresentacao}</span>
        </div>
        <div>
          <Link href={props.inst.links.site}>Site</Link>
          <Link href={props.inst.links.instagram}>Instagram</Link>
          <Link href={props.inst.links.facebook}>Facebook</Link>
          <Link href={props.inst.links.whatsapp}>Whatsapp</Link>
        </div>
      </div>
    </div>
  );
}
