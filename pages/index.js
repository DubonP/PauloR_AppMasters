import Head from "next/head";
import styles from "../styles/Home.module.css";
import { api } from "./api/API";
import Swal from "sweetalert2";
import { useRef, useState } from "react";
import { Equipament } from "../components/Equipament";
import { Loading } from "../components/Loading";
import { Header } from "../components/Header";

export default function Home({ status }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [userEquipament, setUserEquipament] = useState(0);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erroFocus, setErroFocus] = useState(false);
  const [erroName, setErroName] = useState([]);

  const numberInput = useRef(null);

  // funcao para pegar os erros, e atualizar ele sempre que muda
  function addErro(erro) {
    setErroName(() => [...erro]);
  }

  function handleDevice(device, index) {
    const newDevices = [...devices];
    newDevices[index] = device;
    setDevices(newDevices);
  }
  /* Verificacao do cep, so busca CEP com 8 digitos, caso o cep seja valido, preenche os campos de 
  endereço com os dados do cep retornado pelo webservice do ViaCEP (https://viacep.com.br/). 
  Caso contrario, exibe um alerta. */
  const checkCEP = (e) => {
    const cep = e.target.value.replace(/[^0-9]/g, "");
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(setLoading(true))
        .then((res) => res.json())
        .then((data) => {
          if (data.erro == "true") {
            Swal.fire({
              title: "CEP inválido",
              text: "Por favor, insira um CEP válido",
              icon: "error",
              confirmButtonText: "Ok",
            });
            setLoading(false);
          } else {
            setCity(data.localidade);
            setState(data.uf);
            setStreetAddress(data.logradouro);
            setNeighborhood(data.bairro);
            numberInput.current.focus();
            setLoading(false);
          }
        });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `CEP inválido`,
        text: "o cep deve ter 8 digitos.",
        showConfirmButton: true,
      });
    }
  };
  /* Post com os dados do usuario e os equipamentos, usei algumas mensagens para erros especificos pois 
eles retornavam em ingles, visto que o site era para brasileiros, usei essas mensagens criadas pelo Front */
  function postDonation(e) {
    e.preventDefault();
    api
      .post("/donation", {
        name,
        email,
        phone,
        zip,
        city,
        state,
        streetAddress,
        number: userNumber,
        complement,
        neighborhood,
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
        {
          setName(""),
            setEmail(""),
            setPhone(""),
            setZip(""),
            setCity(""),
            setState(""),
            setStreetAddress(""),
            setUserNumber(""),
            setComplement(""),
            setNeighborhood("");
        }
      })
      .catch(function (error) {
        if (error.response.status == 400) {
          if (error.response.data.requiredFields) {
            addErro(error.response.data.requiredFields);
            setErroFocus(true);
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Selecione o equipamento e sua condicao",
              text: "Preencha todos os campos",
              showConfirmButton: true,
            });
          }
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: `Erro: ${error.response.status} - ${error.response.data.errorMessage}`,
            text: "Erro desconhecido, tente novamente mais tarde",
            showConfirmButton: true,
          });
        }
      });
  }
  return (
    <div>
      {/* Titulo na aba do navegador */}
      <Head>
        <title>Doação de computadores</title>
      </Head>
      <Header />
      <main className={styles.main}>
        {/* Loading no centro da tela quando o cep é buscado */}
        <div>{loading == true && <Loading />}</div>
        <form
          onSubmit={(e) => postDonation(e)}
          className={styles.donation_form}
        >
          <div className={styles.donation_title_position}>
            <h1 className={styles.donation_title}>Dados do Doador</h1>
          </div>
          <div className={styles.donation_inputs}>
            <div className="">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="*Nome"
                value={name}
                className={`${styles.donation_input} ${
                  erroName.includes("name") && styles.inputError
                }`}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="">
              <input
                type="email"
                id="email"
                value={email}
                name="email"
                placeholder="Email"
                className={styles.donation_input}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="">
              <input
                id="phone"
                name="phone"
                type="text"
                className={`${styles.donation_input} ${
                  erroName.includes("phone") && styles.inputError
                }`}
                value={phone}
                placeholder="*Celular"
                pattern="[0-9]{11}"
                onChange={(e) => setPhone(e.target.value)}
              ></input>
            </div>
            {/*  <div>{erroFocus == true && <ErroFocus />}</div> */}
          </div>
          <div className={styles.donation_title_position}>
            <h1 className={styles.donation_title}>Endereço</h1>
          </div>
          <div className={styles.donation_inputs}>
            <div className="">
              <input
                id="textCEP"
                name="cep"
                type="text"
                value={zip}
                placeholder="*CEP"
                className={`${styles.donation_input} ${
                  erroName.includes("zip") && styles.inputError
                }`}
                onBlur={checkCEP}
                onChange={(e) => setZip(e.target.value)}
              ></input>
            </div>
            <div className="">
              <input
                id="city"
                value={city}
                name="city"
                type="text"
                placeholder="*Cidade"
                className={`${styles.donation_input} ${
                  erroName.includes("city") && styles.inputError
                }`}
                onChange={(e) => setCity(e.target.value)}
              ></input>
            </div>
            <div className="">
              <input
                id="state"
                value={state}
                name="state"
                type="text"
                placeholder="*Estado"
                className={`${styles.donation_input} ${
                  erroName.includes("state") && styles.inputError
                }`}
                onChange={(e) => setState(e.target.value)}
              ></input>
            </div>
            <div className="">
              <input
                id="streetAddress"
                value={streetAddress}
                name="streetAddress"
                type="text"
                placeholder="*Logradouro (Rua, avenida, etc)"
                className={`${styles.donation_input} ${
                  erroName.includes("streetAddress") && styles.inputError
                }`}
                onChange={(e) => setStreetAddress(e.target.value)}
              ></input>
            </div>
            <div className="">
              <input
                id="number"
                name="number"
                type="number"
                placeholder="*Número"
                value={userNumber}
                ref={numberInput}
                pattern="[0-9]{11}"
                onChange={(e) => setUserNumber(e.target.value)}
                className={`${styles.donation_input} ${
                  erroName.includes("number") && styles.inputError
                }`}
              ></input>
            </div>
            <div className="">
              <input
                id="complement"
                name="complement"
                value={complement}
                type="text"
                placeholder="Complemento"
                onChange={(e) => setComplement(e.target.value)}
                className={styles.donation_input}
              ></input>
            </div>
            <div className="">
              <input
                id="neighborhood"
                name="neighborhood"
                value={neighborhood}
                type="text"
                placeholder="*Bairro"
                onChange={(e) => setNeighborhood(e.target.value)}
                className={`${styles.donation_input} ${
                  erroName.includes("neighborhood") && styles.inputError
                }`}
              ></input>
            </div>
          </div>
          <div className={styles.donation_title_position}>
            <h1 className={styles.donation_title}>Equipamentos</h1>
          </div>
          <div className={styles.donation_inputs}>
            <label className="" id="eqNumber_label">
              *Número de equipamentos:
            </label>
            <div className={styles.donation_eq_number}>
              <input
                id="eqNumber"
                name="eqNumber"
                type="number"
                placeholder="1 - 1000"
                className={`${styles.donation_input} ${
                  erroName.includes("deviceCount") && styles.inputError
                }`}
                onChange={(e) => setUserEquipament(e.target.value)}
              ></input>
            </div>
          </div>
          <div id="new_equipaments">
            {/* Qaundo o userEquipament for maior que 0, o sistema ira mostrar os equipamentos que o usuario 
            deseja doar, fazendo um map com o numero de vezes escolhidas e renderizando o Equipament importado */}
            {userEquipament > 0 &&
              [...Array(Number(userEquipament))].map((_, index) => (
                <Equipament
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
