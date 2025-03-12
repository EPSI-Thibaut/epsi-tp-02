# API pour TP02 - Gestion de produits avec OpenAI

API simple pour gérer des produits et enrichir leurs descriptions à l'aide de l'API OpenAI.

## Installation

1. Cloner le dépôt
2. Installer les dépendances: `npm install`
3. Créer un fichier `.env` à la racine du projet avec le contenu suivant:
   ```
   PORT=3000
   OPENAI_API_KEY=votre_clé_api_openai
   DATABASE_FILE=./database/products.sqlite
   ```
4. Initialiser la base de données: `npm run init-db`
5. Démarrer le serveur: `npm start` ou `npm run dev` pour le mode développement

## Endpoints API

### Gestion des produits

- `GET /api/products` - Récupérer tous les produits
- `GET /api/products/:id` - Récupérer un produit par son ID
- `POST /api/products` - Créer un nouveau produit
  ```json
  {
    "name": "Nom du produit",
    "description": "Description du produit",
    "price": 99.99,
    "category": "Catégorie"
  }
  ```
- `PUT /api/products/:id` - Mettre à jour un produit
- `DELETE /api/products/:id` - Supprimer un produit

### Fonctionnalités OpenAI

- `POST /api/products/:id/enrich` - Enrichir la description d'un produit
  ```json
  {
    "model": "gpt-3.5-turbo" // Optionnel, par défaut: gpt-3.5-turbo
  }
  ```
- `POST /api/products/config/openai` - Configurer l'API OpenAI
  ```json
  {
    "apiKey": "votre_clé_api_openai"
  }
  ```

## Dépendances

- Express.js - Framework web
- SQLite3 - Base de données
- OpenAI - API pour l'enrichissement des descriptions
- dotenv - Gestion des variables d'environnement
- cors - Support des requêtes cross-origin