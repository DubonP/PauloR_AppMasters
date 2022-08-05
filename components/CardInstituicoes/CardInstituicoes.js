import React from "react";
import Link from "next/link";
import styles from "../../styles/CardInstituicoes.module.css";
import Image from "next/image";
import { BsInstagram, BsFacebook, BsWhatsapp } from "react-icons/bs";

/* criacao dos cards para instituicoes com os end points da instituicoesdata e usando react-icons para os icones dos links  */

export function CardInstituicoes(props) {
  return (
    <div className={styles.CardInstituicoes_all}>
      <div className={styles.CardInstituicoes_img}>
        <Image
          src={props.inst.image}
          layout="fill"
          alt="Background"
          className={styles.background}
        />
      </div>
      <div className={styles.CardInstituicoes_card}>
        <div className={styles.CardInstituicoes_title}>
          <h2>{props.inst.nome}</h2>
        </div>
        <div className={styles.CardInstituicoes_endereco}>
          <span>Cidade:{props.inst.cidade}</span>
          <span>Bairro:{props.inst.bairro}</span>
        </div>
        <div className={styles.CardInstituicoes_apresentacao}>
          <span>{props.inst.apresentacao}</span>
        </div>
        <div className={styles.CardInstituicoes_links}>
          Links:
          <Link href={props.inst.links.site}>Site</Link>
          <div className={styles.CardInstituicoes_link_border}>
            <Link href={props.inst.links.instagram}>
              <BsInstagram className={styles.CardInstituicoes_link} />
            </Link>
          </div>
          <div className={styles.CardInstituicoes_link_border}>
            <Link href={props.inst.links.facebook}>
              <BsFacebook className={styles.CardInstituicoes_link} />
            </Link>
          </div>
          <div className={styles.CardInstituicoes_link_border}>
            <Link href={props.inst.links.whatsapp}>
              <BsWhatsapp className={styles.CardInstituicoes_link} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
