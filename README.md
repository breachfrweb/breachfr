# BreachFR - Plateforme OSINT Professionnelle

## 🚀 Fonctionnalités Principales

### ✅ Recherche OSINT Complète
- **Affichage complet des données** : IBAN, BIC, adresses complètes, téléphones, dates de naissance, etc.
- **Intégration API OathNet** : Recherche de fuites de données en temps réel
- **Formatage professionnel** : Résultats organisés avec emojis et sections claires
- **Barre de recherche améliorée** : Design professionnel, responsive, effets visuels

### ✅ Backend Complet
- **Système d'emails réel** : Invitations d'équipe avec Nodemailer
- **Authentification JWT** : Sécurité renforcée
- **Base de données SQLite** : Stockage local des données
- **API complète** : Tous les endpoints fonctionnels

### ✅ Interface Utilisateur
- **Dashboard professionnel** : Statistiques en temps réel
- **Gestion d'équipe** : Invitations par email, rôles, permissions
- **Système de notifications** : Alertes en temps réel
- **Rapports et investigations** : Génération et export

## 📦 Installation

### 1. Cloner le projet
```bash
git clone <votre-repo>
cd breachfr-project
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration
Créer un fichier `.env` à la racine du projet :
```env
# Configuration Email (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Clé API OathNet
OATHNET_API_KEY=votre-cle-api-oathnet

# JWT Secret
JWT_SECRET=breachfr-super-secret-jwt-key-2024

# Port du serveur
PORT=3000

# Base de données
DB_PATH=./database.sqlite
```

### 4. Configuration Gmail (pour les emails)
1. Activer l'authentification à 2 facteurs sur votre compte Gmail
2. Générer un "Mot de passe d'application" :
   - Aller dans Paramètres Google → Sécurité → Authentification à 2 facteurs
   - Cliquer sur "Mots de passe des applications"
   - Sélectionner "Autre" et nommer "BreachFR"
   - Utiliser le mot de passe généré dans `EMAIL_PASS`

## 🚀 Démarrage

```bash
npm start
```

Le serveur sera accessible sur : `http://localhost:3000`

## 👥 Comptes de Test

### Compte Fondateur
- **Email** : `thankoyes@gmail.com`
- **Mot de passe** : `Vbnx1224`
- **Rôle** : Founder (accès complet)

### Compte Admin
- **Email** : `admin@breach.fr`
- **Mot de passe** : `admin123`
- **Rôle** : Admin

### Compte Utilisateur
- **Email** : `user@example.com`
- **Mot de passe** : `user123`
- **Rôle** : User

## 🔧 API Endpoints

### Authentification
- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription

### Recherche OSINT
- `POST /api/oathnet-proxy` - Proxy vers l'API OathNet
- `POST /api/tools/domain` - Analyse de domaine
- `POST /api/tools/email` - Investigation email
- `POST /api/tools/ip` - Géolocalisation IP
- `POST /api/tools/phone` - Analyse téléphone
- `POST /api/tools/social` - Réseaux sociaux

### Gestion d'équipe
- `GET /api/team/members` - Liste des membres
- `POST /api/team/invite` - Inviter un membre (email réel)

### Notifications et Alertes
- `GET /api/notifications` - Récupérer notifications
- `POST /api/notifications` - Créer notification
- `GET /api/alerts` - Liste des alertes
- `POST /api/alerts/create` - Créer alerte

### Investigations et Rapports
- `GET /api/investigations` - Liste investigations
- `POST /api/investigations/create` - Créer investigation
- `GET /api/reports` - Liste rapports
- `POST /api/reports/generate` - Générer rapport

### Paramètres et Logs
- `POST /api/settings/update` - Mettre à jour paramètres
- `GET /api/logs` - Récupérer logs d'activité

## 🎯 Fonctionnalités Implémentées

### ✅ Recherche Avancée
- Détection automatique du type de recherche (email, domaine, IP, nom)
- Affichage complet de TOUS les champs de données :
  - **Informations personnelles** : Nom, prénom, civilité, genre
  - **Dates** : Naissance, activation, formatées en français
  - **Contact** : Emails, téléphones multiples, VoIP
  - **Adresse complète** : Rue, numéro, ville, code postal, complément, étage, porte
  - **Informations bancaires** : IBAN, BIC
  - **Professionnel** : Société, entreprise, poste
  - **Sécurité** : Mots de passe, passeport, SSN
  - **Web** : Réseaux sociaux, sites web, Facebook ID
  - **Technique** : IP, version, ID unique

### ✅ Interface Utilisateur
- **Barre de recherche professionnelle** : 1400px max-width, effets visuels
- **Responsive design** : Adaptation mobile et tablette
- **Effets visuels** : Hover, focus, glow, gradients
- **Modal de résultats** : Pagination, export TXT
- **Restriction Premium** : Floutage pour utilisateurs gratuits

### ✅ Backend Fonctionnel
- **Envoi d'emails réels** : Templates HTML professionnels
- **Authentification sécurisée** : JWT, bcrypt
- **Base de données** : SQLite intégrée
- **Gestion d'erreurs** : Logs détaillés, notifications

## 🔒 Sécurité

- **Authentification JWT** : Tokens sécurisés
- **Hachage bcrypt** : Mots de passe protégés
- **Variables d'environnement** : Configuration sécurisée
- **Validation des entrées** : Protection contre les injections

## 📱 Responsive Design

- **Mobile** : < 768px - Interface adaptée
- **Tablette** : 768px - 1024px - Layout optimisé
- **Desktop** : > 1024px - Expérience complète

## 🎨 Thème Cyberpunk

- **Couleurs** : Violet (#8a2be2), noir, gradients
- **Effets** : Matrix background, cyber grid, animations
- **Typographie** : Orbitron (cyber), Rajdhani (moderne)
- **Icônes** : Font Awesome 6.0

## 📊 Statistiques Temps Réel

- **Utilisateurs en ligne** : Compteur dynamique
- **Requêtes API** : Suivi de l'utilisation
- **Investigations** : Nombre et croissance
- **Données collectées** : Volume en TB

## 🚨 Résolution des Problèmes

### Problème : Résultats incomplets
**Solution** : ✅ Corrigé - Tous les champs sont maintenant affichés

### Problème : Barre de recherche trop petite
**Solution** : ✅ Corrigé - Barre élargie à 1400px avec design professionnel

### Problème : Boutons non fonctionnels
**Solution** : ✅ Corrigé - Backend complet avec tous les endpoints

### Problème : Emails d'invitation simulés
**Solution** : ✅ Corrigé - Nodemailer configuré pour vrais emails

## 📞 Support

Pour toute question ou problème :
1. Vérifier la configuration `.env`
2. Consulter les logs du serveur
3. Tester avec les comptes de démonstration

## 🔄 Mises à Jour

Le projet est maintenant **COMPLET** avec :
- ✅ Affichage de toutes les données API
- ✅ Barre de recherche professionnelle
- ✅ Backend fonctionnel complet
- ✅ Système d'emails réel
- ✅ Interface responsive
- ✅ Sécurité renforcée

**Version actuelle** : 2.0.0 - Production Ready
