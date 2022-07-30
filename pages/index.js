import Head from "next/head";
import styles from "../styles/Home.module.css";
import { api } from "./api/API";
import Swal from "sweetalert2";
import { useState } from "react";
import { Equipaments } from "./components/Equipaments";

export async function getStaticProps() {
  const data = await fetch(`https://doar-computador-api.herokuapp.com/`);
  const status = await data.json();
  return {
    props: { status },
  };
}

export default function Home({ status }) {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userState, setUserState] = useState("");
  const [userZipCode, setUserZipCode] = useState("");
  const [userHouseNumber, setUserHouseNumber] = useState("");
  const [userComplement, setUserComplement] = useState("");
  const [userNeighborhood, setUserNeighborhood] = useState("");
  const [userEquipament, setUserEquipament] = useState(0);
  const [devices, setDevices] = useState([]);

  function handleDevice(device, index) {
    const newDevices = [...devices];
    newDevices[index] = device;
    setDevices(newDevices);
  }

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/[^0-9]/g, "");
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          setUserCity(data.localidade);
          setUserState(data.uf);
          setUserAddress(data.logradouro);
          setUserNeighborhood(data.bairro);
          document.getElementById("number").focus();
        });
    }
  };

  function postDonation(e) {
    e.preventDefault();
    api
      .post("/donation", {
        name: userName,
        email: userEmail,
        phone: userPhone,
        zip: userZipCode,
        city: userCity,
        state: userState,
        streetAddress: userAddress,
        number: "123",
        complement: "cdgfg",
        neighborhood: "fdsfsdf",
        deviceCount: Number(userEquipament),
        devices,
      })
      .then(function (response) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Doacao realizada com sucesso",
          showConfirmButton: false,
          timer: 3000,
        });
      })
      .catch(function (error) {
        if (error.response) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: `Erro: ${error.response.status}`,
            text: error.response.statusText,
            showConfirmButton: true,
          });
        }
      });
  }

  return (
    <div>
      <Head>
        <title>Paulo Rossi App Masters</title>
      </Head>
      <header className={styles.All_header}>
        <h1>Doação de computadores usados:</h1>
        {status.alive ? (
          <p className={styles.API_online}>API Online</p>
        ) : (
          <p className={styles.API_offline}>API Offline</p>
        )}
      </header>
      <main className={styles.main}>
        <form
          onSubmit={(e) => postDonation(e)}
          className={styles.donation_form}
        >
          <h1 className={styles.donation_title}>Dados do Doador</h1>
          <div className={styles.donation_inputs}>
            <div className="">
              <label aria-required className="" for="name" id="name_label">
                Nome
              </label>
              <div className="">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nome"
                  value={userName}
                  required
                  className=""
                  onChange={(e) => setUserName(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="">
              <label className="" for="email" id="email_label">
                Email
              </label>
              <div className="">
                <input
                  type="email"
                  id="email"
                  value={userEmail}
                  name="email"
                  placeholder="exemplo@exemp.com.br"
                  className=""
                  onChange={(e) => setUserEmail(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="">
              <label className="" for="phone" id="phone_label">
                Telefone
              </label>
              <div className="">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  className=""
                  required
                  value={userPhone}
                  placeholder="ex:17999998888"
                  pattern="[0-9]{11}"
                  onChange={(e) => setUserPhone(e.target.value)}
                ></input>
              </div>
            </div>
          </div>
          <h1 className={styles.donation_title}>Endereco</h1>
          <div className={styles.donation_inputs}>
            <div className="">
              <label aria-required className="" for="cep" id="cep_label">
                Cep
              </label>
              <div className="">
                <input
                  id="textCEP"
                  name="cep"
                  type="text"
                  value={userZipCode}
                  placeholder="ex: 11777000"
                  required
                  className=""
                  onBlur={checkCEP}
                  onChange={(e) => setUserZipCode(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="">
              <label aria-required className="" for="city" id="city_label">
                Cidade
              </label>
              <div className="">
                <input
                  id="city"
                  value={userCity}
                  name="city"
                  type="text"
                  placeholder="Cidade"
                  required
                  className=""
                  onChange={(e) => setUserCity(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="">
              <label aria-required className="" for="state" id="state_label">
                Estado
              </label>
              <div className="">
                <input
                  id="state"
                  value={userState}
                  name="state"
                  type="text"
                  placeholder="Estado"
                  required
                  className=""
                  onChange={(e) => setUserState(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="">
              <label
                aria-required
                className=""
                for="streetAddress"
                id="streetAddress_label"
              >
                Logradouro
              </label>
              <div className="">
                <input
                  id="streetAddress"
                  value={userAddress}
                  name="streetAddress"
                  type="text"
                  placeholder="Rua, avenida, travessa"
                  required
                  className=""
                  onChange={(e) => setUserAddress(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="">
              <label aria-required className="" for="number" id="number_label">
                numero
              </label>
              <div className="">
                <input
                  id="number"
                  name="number"
                  type="number"
                  placeholder="ex:999"
                  required
                  pattern="[0-9]{11}"
                  className=""
                ></input>
              </div>
            </div>
            <div className="">
              <label
                aria-required
                className=""
                for="complement"
                id="complement_label"
              >
                Complemento
              </label>
              <div className="">
                <input
                  id="complement"
                  name="complement"
                  type="text"
                  placeholder="ex: Proximo ao mercado"
                  className=""
                ></input>
              </div>
            </div>
            <div className="">
              <label
                aria-required
                className=""
                for="neighborhood"
                id="neighborhood_label"
              >
                Bairro
              </label>
              <div className="">
                <input
                  id="neighborhood"
                  name="neighborhood"
                  type="text"
                  placeholder="ex:Centro"
                  required
                  className=""
                ></input>
              </div>
            </div>
          </div>
          <h1 className={styles.donation_title}>Equipamentos</h1>
          <div className={styles.donation_inputs}>
            <label className="" for="eqNumber" id="eqNumber_label">
              Numero de equipamentos
            </label>
            <div className="">
              <input
                id="eqNumber"
                name="eqNumber"
                type="number"
                placeholder="1 - 1000"
                required
                className=""
                onChange={(e) => setUserEquipament(e.target.value)}
              ></input>
            </div>
          </div>
          <div id="new_equipaments">
            {userEquipament > 0 &&
              [...Array(Number(userEquipament))].map((_, index) => (
                <Equipaments
                  key={index}
                  index={index}
                  handleDevice={handleDevice}
                />
              ))}
          </div>
          <button type="submit" className={styles.button_form}>
            enviar
          </button>
        </form>
      </main>
    </div>
  );
}
