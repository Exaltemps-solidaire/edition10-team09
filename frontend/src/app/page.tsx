"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { signalementValide } from "./validation";

const CENTRES = [
  "Vaulx-en-Velin — Terrain 3",
  "Lyon 8e — Terrain 1",
  "Vénissieux — Terrain 2",
];

export default function Home() {
  const [centreSportif, setCentreSportif] = useState(CENTRES[0]);
  const [description, setDescription] = useState("");
  const [envoye, setEnvoye] = useState(false);

  function envoyer(evenement: React.FormEvent) {
    evenement.preventDefault();
    if (signalementValide(centreSportif, description)) {
      setEnvoye(true);
    }
  }

  if (envoye) {
    return (
      <main className={styles.page}>
        <h1>Ticket envoyé</h1>
        <p>Centre sportif : {centreSportif}</p>
        <p>Description : {description}</p>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <h1>Signaler un dommage</h1>
      <form onSubmit={envoyer}>
        <label htmlFor="centreSportif">Centre sportif</label>
        <select
          id="centreSportif"
          value={centreSportif}
          onChange={(e) => setCentreSportif(e.target.value)}
        >
          {CENTRES.map((centre) => (
            <option key={centre} value={centre}>
              {centre}
            </option>
          ))}
        </select>

        <label htmlFor="description">Description du dommage</label>
        <textarea
          id="description"
          placeholder="Décrivez le dommage constaté…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="photo">Photo du dommage</label>
        <input id="photo" type="file" accept="image/*" />

        <button type="submit">Envoyer le signalement</button>
      </form>
    </main>
  );
}
