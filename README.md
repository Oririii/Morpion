# Morpion

Un morpion en français pour deux personnes qui jouent à tour de rôle sur le même écran. Le jeu tient dans un fichier HTML et fonctionne hors ligne, sans serveur ni ressource externe.

## État actuel

- Jeu original récupéré depuis l’archive fournie : grille de 3 × 3, alternance X/O, détection des victoires et des matchs nuls, blocage après la fin et bouton « Nouvelle partie ».
- Sept tests automatiques disponibles et réussis dans Chromium sous Windows le 10 novembre 2026, avec Playwright 1.65.0.
- Développement sur `dev` ; les modifications sont proposées à la fusion dans `main` par le propriétaire du dépôt.
- Le rendu visuel et le parcours au clavier n’ont pas fait l’objet d’une vérification manuelle dans cette session. Les tests couvrent les scénarios décrits ci-dessous, sans garantir l’absence de tout défaut.

## Commencer

Pour jouer, aucune installation de Node.js, de Playwright ou de Docker n’est nécessaire : il suffit d’un navigateur.

1. Récupérer les fichiers de la branche `dev` de ce dépôt sur l’ordinateur.
2. Dans le dossier récupéré, ouvrir `morpion`, puis double-cliquer sur `index.html`.
3. La grille vide et le message « Au tour de X » apparaissent. Cliquer sur une case vide ; l’autre personne joue ensuite O.

X commence chaque partie. Trois symboles identiques alignés à l’horizontale, à la verticale ou en diagonale donnent la victoire. Une grille pleine sans vainqueur donne un match nul. « Nouvelle partie » vide la grille et redonne la main à X.

Le [fichier du jeu](morpion/index.html) est consultable dans le dépôt ; pour jouer, ouvrir sa copie locale dans le navigateur.

## Vérifier le jeu

### Essais manuels

Numéroter les cases de gauche à droite, puis de haut en bas :

```text
1 | 2 | 3
4 | 5 | 6
7 | 8 | 9
```

| Essai | Actions | Résultat attendu |
| --- | --- | --- |
| Alternance et case occupée | Nouvelle partie, puis 1, encore 1, puis 4 | X en 1, O en 4 ; c’est à X de jouer. |
| Victoire de X | Nouvelle partie, puis 1, 4, 2, 5, 3 | « X a gagné ! » ; première ligne mise en évidence. |
| Partie terminée | Après cette victoire, cliquer 9 | Aucun nouveau symbole. |
| Recommencer | Cliquer « Nouvelle partie », puis une case vide | Grille réinitialisée ; le premier symbole est X. |
| Match nul | Nouvelle partie, puis 1, 2, 3, 5, 4, 6, 8, 7, 9 | « Match nul ! » ; aucun coup supplémentaire accepté. |

### Tests automatiques dans un navigateur

Les tests utilisent Playwright, un outil qui pilote le navigateur Chromium et vérifie le contenu affiché. Ils ouvrent le véritable fichier HTML local, sans serveur.

Prérequis pour cette méthode : Node.js et npm disponibles dans le terminal, et un accès réseau lors de la première installation des dépendances et du navigateur. Depuis la racine du dépôt, le dossier contenant `package.json` :

```sh
npm ci
npx playwright install chromium
npm test
```

Le résultat attendu est `7 passed` : les cinq essais de l’énoncé, une victoire de O en colonne et une victoire de X en diagonale. `npm run test:headed` permet de voir le navigateur. Les échecs produisent des captures et des traces de diagnostic dans `test-results/`.

Vérification effectuée dans cette session : installation avec `npm ci` depuis le cache local et exécution du script `npm test`, avec le npm et le navigateur installés pour cet environnement. Les commandes standard ci-dessus supposent que npm est accessible dans le terminal du lecteur. Le mode avec fenêtre visible n’a pas été exécuté ici.

### Alternative Docker

Cette méthode évite d’installer Node.js sur l’ordinateur. Elle nécessite Docker en cours d’exécution et un accès réseau. Depuis la racine du dépôt, dans PowerShell ou bash :

```sh
docker run --rm --init --ipc=host -v "${PWD}:/source:ro" mcr.microsoft.com/playwright:v1.65.0-noble sh -c 'mkdir -p /tmp/check && cp -R /source/morpion /source/tests /source/package.json /source/package-lock.json /source/playwright.config.cjs /tmp/check/ && cd /tmp/check && npm ci && npm test'
```

Le dossier du projet est monté en lecture seule ; les dépendances et les résultats restent dans le conteneur temporaire et sont supprimés à sa fermeture. L’image et la dépendance Playwright utilisent toutes deux la version 1.65.0. Cette commande Docker n’a pas été exécutée dans cette session ; elle reste à vérifier dans un environnement disposant de Docker.

## Se repérer

| Fichier | Rôle |
| --- | --- |
| [morpion/index.html](morpion/index.html) | Jeu complet : interface, styles et logique. |
| [tests/morpion.spec.cjs](tests/morpion.spec.cjs) | Les sept scénarios de test navigateur. |
| [playwright.config.cjs](playwright.config.cjs) | Configuration de Chromium et des diagnostics. |
| [package.json](package.json) et [package-lock.json](package-lock.json) | Commandes de test et versions des dépendances. |
| [AGENTS.md](AGENTS.md) | Consignes de travail pour Codex, dont les règles sur les branches. |

## Archive de remise

Compresser uniquement le sous-dossier `morpion` en `morpion.zip`, puis ouvrir l’archive pour vérifier qu’elle contient seulement :

```text
morpion/
└── index.html
```

Le HTML de l’archive doit correspondre au fichier actuel du projet. Les tests, dépendances, fichiers Git et documents restent hors de l’archive. Le questionnaire et la remise sur Cyberlearn sont à effectuer par l’étudiant.

## Aide et contributions

Pour signaler un problème, ouvrir une [issue dans le dépôt](https://github.com/Oririii/Morpion/issues) en précisant le navigateur, les actions réalisées et le résultat observé.

Le dépôt appartient à [Oririii](https://github.com/Oririii). Les changements se font sur `dev` ou une branche `feat/...` ; le propriétaire crée la pull request et décide de la fusion dans `main`.
