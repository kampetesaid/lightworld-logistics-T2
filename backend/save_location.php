<?php
// ========================================
// SAUVEGARDE DES LOCALISATIONS GPS
// Enregistre la position géographique des utilisateurs
// ========================================

include 'config.php';

// Vérifier que c'est une requête POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Récupérer les données JSON
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Valider les coordonnées GPS
    if (!isset($data['latitude']) || !isset($data['longitude'])) {
        echo json_encode([
            'success' => false,
            'message' => 'Coordonnées GPS manquantes'
        ]);
        exit();
    }
    
    // Nettoyer les données
    $latitude = floatval($data['latitude']);
    $longitude = floatval($data['longitude']);
    $accuracy = isset($data['accuracy']) ? floatval($data['accuracy']) : 0;
    $timestamp = isset($data['timestamp']) ? $conn->real_escape_string($data['timestamp']) : date('Y-m-d H:i:s');
    $user_agent = $conn->real_escape_string($_SERVER['HTTP_USER_AGENT']);
    $ip_address = $_SERVER['REMOTE_ADDR'];
    
    // Préparer la requête SQL
    $sql = "INSERT INTO localisations (latitude, longitude, accuracy, timestamp, ip_address, user_agent) 
            VALUES ('$latitude', '$longitude', '$accuracy', '$timestamp', '$ip_address', '$user_agent')";
    
    // Exécuter la requête
    if ($conn->query($sql) === TRUE) {
        echo json_encode([
            'success' => true,
            'message' => 'Localisation enregistrée avec succès',
            'id' => $conn->insert_id
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Erreur lors de l\'enregistrement: ' . $conn->error
        ]);
    }
    
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Méthode non autorisée'
    ]);
}

$conn->close();
?>
