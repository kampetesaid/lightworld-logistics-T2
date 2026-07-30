-- ========================================
-- CRÉATION DE LA BASE DE DONNÉES
-- Base de données pour Lightworld Logistics
-- ========================================

-- Créer la base de données
CREATE DATABASE IF NOT EXISTS lightworld_logistics;
USE lightworld_logistics;

-- ========================================
-- TABLE DES CONTACTS
-- Stocke les informations des utilisateurs qui contactent l'entreprise
-- ========================================

CREATE TABLE IF NOT EXISTS contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    message LONGTEXT NOT NULL,
    date_contact DATETIME DEFAULT CURRENT_TIMESTAMP,
    statut VARCHAR(50) DEFAULT 'nouveau' COMMENT 'nouveau, en_cours, répondu, archivé',
    notes TEXT,
    INDEX idx_date (date_contact),
    INDEX idx_statut (statut)
);

-- ========================================
-- TABLE DES LOCALISATIONS GPS
-- Enregistre les positions géographiques des visiteurs
-- ========================================

CREATE TABLE IF NOT EXISTS localisations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    accuracy FLOAT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    pays VARCHAR(100),
    ville VARCHAR(100),
    INDEX idx_timestamp (timestamp),
    INDEX idx_position (latitude, longitude)
);

-- ========================================
-- TABLE DES UTILISATEURS (ADMIN)
-- Pour la gestion des accès administrateur
-- ========================================

CREATE TABLE IF NOT EXISTS utilisateurs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin' COMMENT 'admin, moderateur',
    actif BOOLEAN DEFAULT TRUE,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
    derniere_connexion DATETIME,
    INDEX idx_username (username)
);

-- ========================================
-- TABLE DES SERVICES
-- Liste des services offerts par Lightworld Logistics
-- ========================================

CREATE TABLE IF NOT EXISTS services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    description TEXT,
    icone VARCHAR(50),
    image VARCHAR(255),
    actif BOOLEAN DEFAULT TRUE,
    ordre INT DEFAULT 0,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- TABLE DES SECTEURS
-- Les domaines d'activité couverts par l'entreprise
-- ========================================

CREATE TABLE IF NOT EXISTS secteurs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    description TEXT,
    icone VARCHAR(50),
    image VARCHAR(255),
    actif BOOLEAN DEFAULT TRUE,
    ordre INT DEFAULT 0,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- TABLE DES PROJETS
-- Projets et réalisations de l'entreprise
-- ========================================

CREATE TABLE IF NOT EXISTS projets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    categorie VARCHAR(100),
    date_realisation DATE,
    client VARCHAR(100),
    actif BOOLEAN DEFAULT TRUE,
    ordre INT DEFAULT 0,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- TABLE DES TÉMOIGNAGES
-- Avis et témoignages des clients
-- ========================================

CREATE TABLE IF NOT EXISTS temoignages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_nom VARCHAR(100) NOT NULL,
    client_entreprise VARCHAR(100),
    client_poste VARCHAR(100),
    temoignage TEXT NOT NULL,
    note INT COMMENT '1-5 étoiles',
    image_client VARCHAR(255),
    actif BOOLEAN DEFAULT TRUE,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- TABLE DES ARTICLES BLOG
-- Articles et actualités
-- ========================================

CREATE TABLE IF NOT EXISTS articles_blog (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(200) NOT NULL,
    contenu LONGTEXT NOT NULL,
    image_principale VARCHAR(255),
    categorie VARCHAR(100),
    auteur VARCHAR(100),
    date_publication DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_modification DATETIME ON UPDATE CURRENT_TIMESTAMP,
    actif BOOLEAN DEFAULT TRUE,
    vue_count INT DEFAULT 0,
    INDEX idx_date (date_publication),
    INDEX idx_categorie (categorie)
);

-- ========================================
-- TABLE DES LOGS
-- Enregistre toutes les actions importantes
-- ========================================

CREATE TABLE IF NOT EXISTS logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    action VARCHAR(255) NOT NULL,
    utilisateur_id INT,
    details TEXT,
    ip_address VARCHAR(45),
    date_action DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_date (date_action),
    INDEX idx_utilisateur (utilisateur_id)
);

-- Insérer un utilisateur admin par défaut (mot de passe: admin123)
INSERT INTO utilisateurs (username, email, password_hash, role) 
VALUES ('admin', 'admin@lightworld.com', '$2y$10$N7yHC5t/yKPjJF1D9.JiJ.nKHhJcGMTBZNO6LzPHZ4QJMhJ0J8gYi', 'admin')
ON DUPLICATE KEY UPDATE id=id;

-- Insérer les services par défaut
INSERT INTO services (nom, description, icone, ordre) VALUES
('Logistique', 'Services de transport et logistique', 'fa-truck', 1),
('Sécurité', 'Solutions de sécurité professionnelle', 'fa-shield', 2),
('Énergie Solaire', 'Solutions solaires durables', 'fa-sun', 3)
ON DUPLICATE KEY UPDATE id=id;
