# Weather Dashboard

Application web asynchrone réalisée dans le cadre du devoir 2 du cours LOG3500.

## Description

Cette application permet de rechercher une ville et d’afficher la météo actuelle en utilisant Open-Meteo.

Le fonctionnement se déroule en deux étapes :
1. Recherche des coordonnées de la ville via l’API de géocodage Open-Meteo.
2. Recherche de la météo actuelle à partir de la latitude et de la longitude trouvées.

## Fonctionnalités

- Recherche d’une ville.
- Affichage du nom de la ville et du pays.
- Affichage de la température actuelle.
- Affichage de la vitesse du vent.
- Affichage d’un statut météo en texte clair.
- Icône météo dynamique selon le `weathercode`.
- Animation douce du spinner et de l’icône météo.
- Gestion des erreurs :
  - champ vide,
  - ville introuvable,
  - erreur de connexion réseau.

## Technologies utilisées

- HTML5.
- CSS3.
- JavaScript.
- Open-Meteo Geocoding API.
- Open-Meteo Forecast API.

## Structure du projet

```text
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── README.md
```

## Comment utiliser

1. Ouvrir le fichier `index.html` dans un navigateur.
2. Entrer le nom d’une ville.
3. Cliquer sur **Rechercher**.
4. Attendre le chargement et consulter le résultat affiché.

## API utilisées

### Géocodage
`https://geocoding-api.open-meteo.com/v1/search?name={ville}&count=1&language=fr&format=json`

### Météo
`https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true&timezone=auto`

## Messages d’erreur

- Si le champ est vide : un message demande d’entrer le nom d’une ville.
- Si aucune ville n’est trouvée : un message indique qu’aucun résultat n’est disponible.
- Si la connexion échoue : un message indique que la connexion internet doit être vérifiée.

## Accessibilité

- Utilisation de `aria-describedby` pour le message d’erreur.
- Utilisation de `aria-invalid` lorsque le champ est vide.
- Mise à jour des messages via `textContent` pour éviter l’injection HTML.

## Auteur

Chrisling Bijoux