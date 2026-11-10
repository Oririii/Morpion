# Morpion

Jeu original récupéré depuis l’archive fournie, pour deux joueurs sur le même écran.

Ouvrir `morpion/index.html` par double-clic dans un navigateur. Le jeu fonctionne hors ligne, sans serveur ni ressource externe. X commence ; trois symboles alignés gagnent ; « Nouvelle partie » réinitialise la grille.

## Tests navigateur

Avec Node.js et npm :

```sh
npm ci
npx playwright install chromium
npm test
```

Sept tests exécutent les cinq essais de l’énoncé, une victoire de O en colonne et une victoire de X en diagonale sur le fichier HTML réel. `npm run test:headed` affiche le navigateur. Les échecs produisent captures et traces dans `test-results/`.

Avec Docker, depuis la racine du dépôt (PowerShell ou bash) :

```sh
docker run --rm --init --ipc=host -v "${PWD}:/source:ro" mcr.microsoft.com/playwright:v1.65.0-noble sh -c 'mkdir -p /tmp/check && cp -R /source/morpion /source/tests /source/package.json /source/package-lock.json /source/playwright.config.cjs /tmp/check/ && cd /tmp/check && npm ci && npm test'
```

Le montage est en lecture seule ; les dépendances et résultats restent dans le conteneur temporaire.

## Archive de remise

Le ZIP doit contenir seulement `morpion/` et `morpion/index.html`. Les tests, dépendances et fichiers du dépôt restent en dehors. Le questionnaire et la remise sur Cyberlearn sont à effectuer par l’étudiant.
