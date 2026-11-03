import { describe, expect, it } from "vitest";
import { signalementValide } from "./validation";

describe("signalementValide", () => {
  it("est valide quand le centre sportif et la description sont renseignés", () => {
    expect(signalementValide("Vaulx-en-Velin — Terrain 3", "But tordu")).toBe(true);
  });

  it("est invalide si la description est vide ou ne contient que des espaces", () => {
    expect(signalementValide("Vaulx-en-Velin — Terrain 3", "   ")).toBe(false);
  });
});
