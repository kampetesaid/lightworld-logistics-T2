# BACKEND - Lightworld Logistics

## Guide d'Installation et de Configuration

Ce dossier contient tous les fichiers backend nécessaires pour gérer les contacts, localisations et données de l'application Lightworld Logistics.

---

## 📋 Structure du Backend

```
backend/
├── config.php              # Configuration de la base de données
├── save_contact.php        # API pour sauvegarder les contacts
├── save_location.php       # API pour sauvegarder les GPS
├── get_contacts.php        # API pour récupérer les contacts
├── get_locations.php       # API pour récupérer les localisations
├── setup_database.sql      # Script de création de la base de données
└── admin/                  # (À créer) Panneau d'administration
```

---

## 🔧 Installation Requise

### 1. Serveur Web
- **PHP 7.4+** (recommandé PHP 8.0+)
- **Apache ou Nginx**
- Modules PHP: PDO, MySQLi

### 2. Base de Données
- **MySQL 5.7+** ou **MariaDB 10.3+**
- Accès root pour créer la base de données

### 3. Installation sur Windows (WAMP/XAMPP)

#### Étape 1: Télécharger et installer XAMPP
- Télécharger depuis: https://www.apachefriends.org/
- Installation par défaut dans `C:\xampp\`

#### Étape 2: Placer les fichiers
```
C:\xampp\htdocs\ligthwold_logistic\
├── index.html
├── script.js
├── style.css
├── image/
└── backend/      ← Copier le dossier ici
```

#### Étape 3: Démarrer XAMPP
1. Ouvrir XAMPP Control Panel
2. Cliquer "Start" pour Apache et MySQL

#### Étape 4: Créer la Base de Données
1. Ouvrir phpMyAdmin: http://localhost/phpmyadmin/
2. Créer une nouvelle base de données:
   - Nom: `lightworld_logistics`
   - Charset: `utf8mb4_unicode_ci`
3. Importer le fichier `setup_database.sql`:
   - Cliquer sur l'onglet "Import"
   - Sélectionner `backend/setup_database.sql`
   - Cliquer "Import"

#### Étape 5: Configurer le fichier config.php
Modifier `backend/config.php` selon votre configuration:

```php
define('DB_HOST', 'localhost');      // Généralement 'localhost'
define('DB_USER', 'root');           // Utilisateur MySQL
define('DB_PASS', '');               // Mot de passe (vide par défaut)
define('DB_NAME', 'lightworld_logistics');
```

---

## 🚀 Utilisation

### API Endpoints

#### 1. Sauvegarder un Contact
**URL:** `backend/save_contact.php`
**Méthode:** POST
**Données JSON:**
```json
{
  "nom": "John Doe",
  "email": "john@example.com",
  "telephone": "+237123456789",
  "message": "Message du client..."
}
```

**Réponse:**
```json
{
  "success": true,
  "message": "Contact enregistré avec succès",
  "id": 1
}
```

#### 2. Sauvegarder une Localisation GPS
**URL:** `backend/save_location.php`
**Méthode:** POST
**Données JSON:**
```json
{
  "latitude": 3.8480,
  "longitude": 11.5021,
  "accuracy": 50,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Réponse:**
```json
{
  "success": true,
  "message": "Localisation enregistrée avec succès",
  "id": 1
}
```

#### 3. Récupérer Tous les Contacts
**URL:** `backend/get_contacts.php?limit=50&offset=0&statut=nouveau`
**Méthode:** GET
**Paramètres optionnels:**
- `limit` (défaut: 100)
- `offset` (défaut: 0)
- `statut` (nouveau, en_cours, répondu, archivé)

**Réponse:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "id": 1,
      "nom": "John Doe",
      "email": "john@example.com",
      "telephone": "+237123456789",
      "message": "Message...",
      "date_contact": "2024-01-15 10:30:00",
      "statut": "nouveau"
    }
  ]
}
```

#### 4. Récupérer Toutes les Localisations
**URL:** `backend/get_locations.php?limit=100&order=DESC`
**Méthode:** GET
**Paramètres optionnels:**
- `limit` (défaut: 100)
- `offset` (défaut: 0)
- `order` (ASC ou DESC)

---

## 🔐 Sécurité

### Points Importants

1. **Validation des données**: Tous les inputs sont validés et échappés
2. **HTTPS recommandé**: En production, utilisez HTTPS obligatoirement
3. **CORS**: À configurer selon vos besoins
4. **Authentification**: À ajouter pour l'accès aux données sensibles

### À Implémenter (Sécurité Avancée)

```php
// Ajouter à config.php pour HTTPS en production
if (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === 'off') {
    header('Location: https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);
    exit();
}
```

---

## 📊 Structure des Tables

### Table: contacts
| Colonne | Type | Description |
|---------|------|-------------|
| id | INT | ID unique |
| nom | VARCHAR(100) | Nom du contact |
| email | VARCHAR(150) | Email |
| telephone | VARCHAR(20) | Téléphone |
| message | LONGTEXT | Message |
| date_contact | DATETIME | Date/heure |
| statut | VARCHAR(50) | État (nouveau/répondu) |
| notes | TEXT | Notes internes |

### Table: localisations
| Colonne | Type | Description |
|---------|------|-------------|
| id | INT | ID unique |
| latitude | DECIMAL | Latitude GPS |
| longitude | DECIMAL | Longitude GPS |
| accuracy | FLOAT | Précision en mètres |
| timestamp | DATETIME | Date/heure |
| ip_address | VARCHAR(45) | Adresse IP |
| user_agent | TEXT | Info du navigateur |

---

## 🛠️ Dépannage

### Problème: "Erreur de connexion à la base de données"
**Solution:**
1. Vérifier que MySQL est démarré
2. Vérifier les identifiants dans `config.php`
3. Vérifier que la base de données existe

### Problème: "Données incomplètes"
**Solution:**
- S'assurer que tous les champs obligatoires sont envoyés
- Vérifier le format JSON

### Problème: CORS Error
**Solution:** Ajouter en haut de config.php:
```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit();
}
```

---

## 📞 Support

Pour toute question ou problème, consultez la documentation ou contactez l'équipe de développement.

**Email:** support@lightworld.com
**WhatsApp:** +237696362393

---

## 📝 Notes de Développement

### Prochaines Améliorations
- [ ] Système d'authentification admin
- [ ] Tableau de bord admin avec statistiques
- [ ] Export des données (CSV, PDF)
- [ ] Notifications email
- [ ] Validation avec reCAPTCHA
- [ ] Graphiques des localisations sur carte
- [ ] Backup automatique de la base de données

### Version
- **Version:** 1.0
- **Date:** 2024
- **Développé pour:** Lightworld Logistics
