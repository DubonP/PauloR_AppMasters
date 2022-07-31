import { useState } from "react";
import styles from "../styles/Equipaments.module.css";

export function Equipaments({ index, handleDevice }) {
  const [userEquipamentType, setUserEquipamentType] = useState("");
  const [userEquipamentDescription, setUserEquipamentDescription] =
    useState("");
  function handleChange() {
    if (userEquipamentType && userEquipamentDescription) {
      const device = {
        type: userEquipamentType,
        condition: userEquipamentDescription,
      };
      handleDevice(device, index);
    }
  }

  return (
    <div className={styles.equipament_all_h1}>
      <h2>Sobre o equipamento -{index + 1}</h2>
      <div className={styles.equipament_all}>
        <select
          className={styles.equipament_type}
          onBlur={handleChange}
          onChange={(e) => setUserEquipamentType(e.target.value)}
          required
        >
          <option disabled selected>
            Equipamento
          </option>
          <option value="notebook">Notebook</option>
          <option value="desktop">Desktop</option>
          <option value="netbook">Netbook</option>
          <option value="monitor">Monitor</option>
          <option value="printer">Impressora</option>
          <option value="scanner">Scanner</option>
        </select>
        <select
          className={styles.equipament_type}
          onBlur={handleChange}
          onChange={(e) => setUserEquipamentDescription(e.target.value)}
          required
        >
          <option disabled selected>
            Selecione o estado do equipamento
          </option>
          <option value="working">
            Tem todas as partes, liga e funciona normalmente
          </option>
          <option value="notWorking">
            Tem todas as partes, mas não liga mais
          </option>
          <option value="broken">
            Faltam peças, funciona só as vezes ou está quebrado
          </option>
        </select>
      </div>
    </div>
  );
}
