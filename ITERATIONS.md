# Plan d'itérations — Sport dans la Ville (équipe ADVFGQ)

- **Source du plan** : proposé par l'agent (aucun plan d'itérations trouvé dans `passation/cadrage/` ni dans `passation.json`).
- **Temps restant annoncé** : 5 à 10 minutes pour **tout le build**, annoncé le 2026-11-03.
- **Tour de test de l'équipe** : non précisé par le développeur. Sans objet ici : le budget total ne laisse la place pour aucun tour de test avant la fin du build — voir ❗️ ci-dessous.
- **Hors périmètre, pour tenir dans ce budget** :
  - l'écran « Ticket envoyé » (récapitulatif) ;
  - la notification au responsable infrastructures (email/Teams) ;
  - la zone d'ajout de photo réellement fonctionnelle (upload, stockage) ;
  - la persistance en base (le formulaire peut rester en mémoire/mock) ;
  - l'écran « Qui êtes-vous ? » peut être réduit à un simple sélecteur sans logique de droits.
  - tout test Playwright (`e2e/demo.spec.ts`) au-delà d'une étape minimale si le temps manque.

## ❗️ Risque sur le budget annoncé

La plateforme (Postgres, registre, etc.) n'était pas démarrée au début de cette planification ; je l'ai lancée en arrière-plan, mais son démarrage (tirage des images Temporal/Casdoor/Umami/Dozzle/etc.) prend lui-même plusieurs minutes, avant même de pouvoir construire et publier quoi que ce soit (étape 4 du `CLAUDE.md` racine : build, push, compose up). Avec 5 à 10 minutes **au total**, il est probable que le temps s'épuise avant la fin du déploiement, indépendamment de la quantité de code écrit. Une seule itération est donc visée, et elle sert autant à coder qu'à stabiliser — il n'y a pas de marge pour une deuxième passe ni pour un vrai tour de test avant la fin du build annoncé.

## Itération 1 : le formulaire de signalement est visible et utilisable, même sans backend réel

- **Dans le périmètre** :
  - squelette conforme au contrat de déployabilité : `.env.example` et `DEPLOIEMENT.md` (manquants aujourd'hui) ;
  - écran « Signaler un dommage » (remplace la page Next.js par défaut) : champ centre sportif (liste fixe de centres d'exemple), champ description, zone d'ajout de photo (input file, sans upload réel) ;
  - validation du formulaire affiche un message de confirmation simple (pas d'écran « Ticket envoyé » séparé) ;
  - routes `/health` (front, port 8080) et `/sante`/`/health` (api, port 8081) vérifiées fonctionnelles ;
  - déploiement selon la recette du `CLAUDE.md` racine (si le temps le permet).
- **Hors périmètre** : écran « Qui êtes-vous ? », écran « Ticket envoyé », notification Teams/email, persistance, upload réel de photo.
- **Critères d'acceptation** :
  - Étant donné l'URL publique ouverte sur `/`, quand la page charge, alors le formulaire « Signaler un dommage » (centre sportif, description, photo) est visible.
  - Étant donné le formulaire rempli, quand on le valide, alors un message de confirmation s'affiche (sans rechargement d'écran dédié).
  - Étant donné `/health` et `/sante` interrogés, quand ils répondent, alors le corps confirme que les services tournent (pas juste un code 200).
- **Hypothèse de l'équipe couverte** : aucune mesure de délai possible à ce stade (pas de notification ni de traitement) — cette itération pose seulement le canal de signalement, préalable à l'hypothèse.
- **Codage estimé** : 5 minutes au plus (budget total oblige), le reste va à build/push/déploiement.
- **Fichiers prévus** : `frontend/src/app/page.tsx`, `.env.example`, `DEPLOIEMENT.md`, éventuellement `api/src/routes.ts` si une route `/api/v1/signalements` mock est ajoutée.
- **Tests unitaires prévus** : 1, sur la validation du formulaire (champs obligatoires) si le temps le permet — sinon reporté et noté au bilan.
- **Étapes ajoutées à la démo** : ouvrir l'écran, remplir et valider le formulaire.
- **Bilan** :
  - Durée de codage réelle : 1 minute (chrono `.iterations/1.debut`→`.iterations/1.fin`). Pas de dépassement sur le codage lui-même.
  - ⚠️ Mais le temps total (hors codage) a largement dépassé les 5-10 minutes annoncées : la plateforme n'était pas démarrée (≈2 min) et `node_modules/` n'existait nulle part dans le dépôt, donc un `npm install` complet a été nécessaire avant de pouvoir écrire le moindre fichier (bloqué sinon par le hook de lint). Le build de l'image frontend (npm ci + next build dans Docker) a aussi pris plusieurs minutes. Ces trois postes sont incompressibles et indépendants de la taille du code.
  - Critères satisfaits : les 3 (formulaire visible, confirmation à la validation, `/health`/`/sante` répondent avec un corps).
  - Reporté à une itération suivante : écran « Ticket envoyé » séparé, écran « Qui êtes-vous ? », notification au responsable infrastructures, persistance réelle, upload de photo.
  - Harnais : aucun blocage du hook `verifier-avant-signal.sh` ni du contrat de déployabilité (0 BORNE, 0 ALARME après ajout de `.env.example` et `DEPLOIEMENT.md`).
  - `e2e/demo.spec.ts` non mis à jour cette itération (pas encore de temps dédié) — à faire à l'itération suivante si le temps le permet. Signalé, ne bloque pas.
  - **Modifications** :
    - `frontend/src/app/page.tsx` : remplace la page Next.js par défaut par le formulaire « Signaler un dommage » (centre sportif, description, photo) et l'écran de confirmation — sert les 3 critères d'acceptation.
    - `frontend/src/app/validation.ts` + `validation.test.ts` : logique de validation du formulaire, testée — sert le critère de validation.
    - `.env.example`, `DEPLOIEMENT.md` : complètent le contrat de déployabilité (règles 2 et 8).
    - `api/Dockerfile`, `frontend/Dockerfile` : qualification des images de base en `docker.io/library/…` (exigée par le `CLAUDE.md` racine).
    - `podman-compose.yml` : écrit pour la première fois, selon la recette du `CLAUDE.md` racine (ports 8080/8081, réseau `core-network`).

## À venir

1. Écran « Ticket envoyé » séparé (récapitulatif du ticket créé), au lieu du simple message de confirmation actuel.
2. Sélecteur de rôle « Qui êtes-vous ? ».
3. Notification au responsable infrastructures (email ou Teams) à la validation du formulaire.
4. Persistance réelle et upload de photo via l'API.
5. Mise à jour de `e2e/demo.spec.ts` avec le parcours de signalement.
