# 🎯 Objectif du test
Concevoir et développer une **interface de catalogue produits** à partir de maquettes fournies, en respectant les bonnes pratiques d’intégration et de développement front-end.

---

# 📚 Mockups

Les mockups de la maquette sont disponibles dans [ce fichier Figma][1].

---

# 📐 Contexte
L’interface doit permettre :
- La navigation via une **sidenav** et un **header**
- L’affichage d’une **liste de produits paginée** avec possibilité de **filtrage**
- L’ajout et la **gestion de produits dans un panier**
- L’affichage du **détail d’un produit** dans une **fenêtre modal**
- Le passage d’une commande avec un **faux processus de paiement**

---

# 📝 Fonctionnalités attendues

## 1. Page d’accueil – Catalogue produits
La page d’accueil comporte :
- Une **sidenav** (menu latéral)
- Un **header**
- Une **liste de produits affichée sous forme de cartes**

Lors du chargement : utiliser les **composants Ghost (squelettes)** pour simuler le placement des éléments en attendant l’affichage des données.

La liste doit être :
- **Paginée**
- **Filtrable via un champ de recherche**
- **Afficher le nombre d’éléments par page**

Chaque carte produit doit inclure les actions suivantes :
- **Ajouter au panier** (action principale)
- **Mettre en favoris** (icône)
- **Voir les détails** (dans un menu contextuel)
- **Sélectionner** (dans un menu contextuel)

### 💡 Interaction
- **Clique sur la carte** → ouverture du détail produit
- Lorsqu’un ou plusieurs produits sont sélectionnés → la barre de filtres passe en **mode multi-sélection** (apparence spécifique, ex. fond violet), avec deux actions disponibles :
  - Ajouter les éléments sélectionnés au panier
  - Mettre les éléments sélectionnés en favoris

>Note: Le mode multi-sélection est un composant qui n'existe pas encore dans UIK, vous devrez en implémenter un.
---

## 2. Détails du produit (modal)
La fenêtre **modal** doit présenter :
- Une **image** du produit
- Un **titre**
- Des **tags (chips)**
- Une **description**
- Une liste de **spécifications**
- Une **durée de garantie**
- Un **prix**
- Un **sélecteur de quantité**
- Un bouton **Ajouter au panier**
- Un bouton pour **fermer la modal**

---

## 3. Panier et commande
Après ajout de produits :
- Le **header** affiche un accès au panier avec un **badge** indiquant le nombre de produits ajoutés.

### Page “Votre panier”
Affiche :
- Le **récapitulatif des produits ajoutés**
- Un **bouton pour valider la commande**

### Processus de paiement simulé
1. Le bouton **Valider la commande** ouvre un **formulaire de paiement** (tous les champs obligatoires).
2. En cliquant sur **Payer** :
  - Afficher une **dialog indiquant que le paiement est en cours**
  - Afficher un loader puis après 2 secondes, fermer la dialog
  - Puis un **message de confirmation** : *“Paiement accepté”*
3. Après confirmation :
  - Rediriger automatiquement vers la **page d’accueil**
  - Le **panier est vidé**

---

# ☝ Règles à respecter

- Créer une branche dédiée pour le développement, pas de push direct sur `main`
- Créer une PR (Pull Request) vers `main` à la fin du développement

---

# ✅ Critères d’évaluation
- Respect des maquettes et du scénario
- Qualité de l’intégration (**HTML / SCSS**)
- Bonne utilisation du framework (**Angular, Angular Material, UIK, Bootstrap**)
- Cohérence avec des pratiques de **Design System** (réutilisation, modularité)
- Gestion correcte des **états** (chargement, vide, erreurs simulées éventuelles)
- Qualité du code (**clarté, maintenabilité, organisation**)  
- Commits **clairs et fréquents** (Idéalement, utiliser la convention [Conventional Commits](https://gist.github.com/Zekfad/f51cb06ac76e2457f11c80ed705c95a3))



[1]: /figma/mockups.fig
