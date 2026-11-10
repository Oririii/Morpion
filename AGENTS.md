# Consignes de travail — Morpion

## Repères et périmètre

- Lire `README.md`, puis les fichiers utiles à la tâche. Le jeu est dans `morpion/index.html` et les tests dans `tests/morpion.spec.cjs`.
- Préserver le jeu original récupéré depuis l’archive utilisateur, sauf changement demandé. Ne pas remplacer son apparence sans demande.
- Garder le jeu autonome : un seul fichier HTML, ouvrable par double-clic, sans serveur, dépendance réseau ni ressource externe.
- Conserver l’interface en français et les règles : X commence, alternance, cases occupées inchangées, victoires sur trois symboles, match nul, blocage après la fin et bouton « Nouvelle partie ».

## Méthode et Git

- Préserver les modifications de l’utilisateur ; limiter les changements à la demande et signaler les ambiguïtés qui changent le résultat.
- Travailler sur `dev` ou une branche `feat/...` ; ne jamais créer de commit, pousser, fusionner ni forcer une mise à jour sur `main`.
- Les commits et les push sur les branches de travail sont autorisés. Faire des commits cohérents et faciles à examiner après les vérifications pertinentes.
- L’utilisateur crée la pull request et décide de sa fusion dans `main`.
- Ne pas inclure les conversations, fichiers personnels, secrets, dépendances installées ou résultats temporaires dans les commits.

## Vérifications

- Depuis la racine du dépôt, avec Node.js et npm disponibles : `npm ci`, puis `npx playwright install chromium`, puis `npm test`. La procédure Docker alternative est dans le README.
- Après un changement du comportement, exécuter les sept tests Chromium sur le fichier HTML réel. Vérifier les cinq essais de l’énoncé, une victoire de O en colonne et une victoire de X en diagonale.
- Après un changement visuel, vérifier aussi le rendu et l’utilisation au clavier dans un navigateur.
- Pour un ZIP de remise, inclure uniquement `morpion/` et `morpion/index.html`, ouvrir l’archive et vérifier que le HTML correspond au fichier du projet. Garder les tests et les fichiers du dépôt hors de l’archive.
- Distinguer les contrôles réussis, échoués et non exécutés. Ne pas présenter une ancienne exécution comme une nouvelle vérification.

## Restitution et limites

- Résumer en français les changements, les tests réellement exécutés, la branche publiée et les limites restantes.
- Signaler les accès manquants sans contourner un refus ; ne pas supprimer définitivement sans autorisation.
- L’étudiant remplit lui-même le questionnaire et effectue la remise sur Cyberlearn.
