# Déploiement

Application de signalement de dommages sur les terrains, pour l'association Sport dans la Ville
(81 centres sportifs). Un éducateur sportif signale un équipement abîmé ; le responsable
infrastructures reçoit le ticket.

## Services

- `frontend/` : interface Next.js exportée statiquement, servie par nginx. **Service exposé au
  public**, port 80 dans le conteneur.
- `api/` : service Node sans dépendance, port 8081 dans le conteneur. Expose `/health` et
  `/sante`.

## Services externes

Aucun pour cette itération : pas d'appel IA, e-mail, carte ou paiement. Le formulaire ne
persiste rien (pas de base de données branchée) et l'envoi de notification n'est pas encore codé.

## Connu comme fragile ou inachevé

- Le formulaire ne sauvegarde rien côté serveur : la validation réussit mais le ticket n'est pas
  transmis au responsable infrastructures (prévu dans une itération suivante).
- Pas d'upload réel de la photo jointe.
- Pas d'écran de sélection de rôle (« Qui êtes-vous ? »).

## Contact

Équipe 09 (hackathon eXaltemps Solidaire).
