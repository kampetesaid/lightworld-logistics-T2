<?php
// ========================================
// CONFIGURATION DE LA BASE DE DONNÉES
// Connexion à MySQL pour Lightworld Logistics
// ========================================

// Paramètres de connexion
define('DB_HOST', 'localhost');      // Hôte du serveur MySQL
define('DB_USER', 'root');           // Utilisateur MySQL
define('DB_PASS', 'Lightworld@2024')
define('DB_NAME', 'lightworld_logistics'); // Nom de la base de données

// Créer la connexion
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Vérifier la connexion
if ($conn->connect_error) {
    die(json_encode([
        'success' => false,
        'message' => 'Erreur de connexion à la base de données: ' . $conn->connect_error
    ]));
}

// Définir le charset UTF-8
$conn->set_charset("utf8mb4");

// En-tête pour JSON
header('Content-Type: application/json; charset=utf-8');

?>
