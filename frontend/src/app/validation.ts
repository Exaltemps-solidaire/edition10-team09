export function signalementValide(centreSportif: string, description: string): boolean {
  return centreSportif.trim().length > 0 && description.trim().length > 0;
}
