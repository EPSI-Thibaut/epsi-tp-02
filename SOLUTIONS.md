# TP 2 - Application 

**Thibaut MOSTEAU**  
Classe B3 DEV IA FS - EPSI 2024-2025  

---

## Instructions d'installation et d'exécution du frontend ANGULAR

### Prérequis
- **Angular CLI** (`npm install -g @angular/cli`)
- Une clé API **Jina.AI** (gratuite) à insérer dans un fichier .env(se référer au sample)

### Installation du frontend Angular
1. **Accédez au dossier frontend** :  
    ```
    cd frontend
    ```
2. **Installez les dépendances** :  
    ```
    npm install
    ```
3. **Configurez le proxy** (fichier déjà créé) : `proxy.conf.json`
4. **Démarrez l'application Angular** :  
    ```
    ng serve
    ```
    L'application sera accessible à l'adresse :  
    [http://localhost:4200](http://localhost:4200)

---

## Documentation de l'application

### Fonctionnalités principales

#### Liste des produits
- Affichage de tous les produits disponibles
- Recherche en temps réel
- Tri par **nom**, **prix** ou **catégorie**
- Présentation sous forme de cartes avec informations essentielles

#### Détail d'un produit
- Affichage de toutes les informations du produit sélectionné (**nom**, **prix**, **catégorie**, **description**)
- Possibilité d'enrichir la description avec **Jina.AI**
- Options de personnalisation pour la desription JINA (**ton**, **longueur**)
- Possibilité de conserver ou rejeter la description générée par IA

#### Navigation et gestion
- Navigation fluide entre les différentes vues
- Actions pour modifier ou supprimer un produit

### Architecture de l'application

#### Composants
- `ProductListComponent`
- `ProductDetailComponent`

#### Services
- `ProductService`
- `JinaService`

#### Routage
- Configuration pour naviguer entre les vues

### Choix techniques

#### Architecture Angular Standalone
- Utilisation de la nouvelle approche **standalone** d'Angular pour les composants
- Injection de dépendances simplifiée
- Importations explicites pour les pipes et directives

#### Communication avec le backend
- Configuration d'un **proxy** pour éviter les problèmes **CORS**
- Utilisation de `HttpClient` pour les requêtes API
- Services dédiés pour isoler la logique métier

#### Gestion d'état
- État local dans les composants pour une meilleure isolation
- **Observables** pour la gestion asynchrone des données

#### UI/UX
- Interface responsive avec **CSS** et **Flexbox** pour la partie responsive
- Gestion des états de chargement et des erreurs

#### Intégration Jina.AI
- Options de personnalisation (**ton**, **longueur**)
- Interface avant/après pour évaluer les améliorations
- Validation avant de conserver les changements

---

## Difficultés rencontrées et solutions

1. **Configuration du proxy Angular**  
    - **Problème** : Communication entre le frontend Angular (port 4200) et le backend Express (port 3000).  
    - **Solution** : Configuration d'un fichier `proxy.conf.json` pour rediriger les requêtes `/api/*` vers le backend.

2. **Utilisation des pipes dans l'architecture standalone**  
    - **Problème** : Erreur "No pipe found with name 'currency'" dans les composants standalone.  
    - **Solution** : Import explicite des pipes dans les métadonnées du composant, oublie fréaquent de l'importation des pipes Angular dans les composants.

3. **Configuration des routes**  
    - **Problème** : Erreurs de navigation (`NG04002: Cannot match any routes`).  
    - **Solution** : Vérification des routes par rapport au backend et ajustement des chemins dans le fichier `app-routing.module.ts`. Utilisation de `pathMatch: 'full'` pour les routes exactes.

5. **Ordre des routes**  
    - **Problème** : Conflit entre routes similaires (ex: `product/:id` et `product/edit/:id`).  
    - **Solution** : Réorganisation des routes pour placer les routes spécifiques avant les routes génériques avec paramètres.