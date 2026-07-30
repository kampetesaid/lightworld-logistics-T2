<?php
// ========================================
// SAUVEGARDE DES CONTACTS
// Reçoit les données du formulaire de contact et les stocke en base de données
// ========================================

include 'config.php';

// Vérifier que c'est une requête POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Récupérer les données JSON
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Valider les données
    if (!isset($data['nom']) || !isset($data['email']) || !isset($data['telephone']) || !isset($data['message'])) {
        echo json_encode([
            'success' => false,
            'message' => 'Données incomplètes'
        ]);
        exit();
    }
    
    // Nettoyer les données
    $nom = $conn->real_escape_string(trim($data['nom']));
    $email = $conn->real_escape_string(trim($data['email']));
    $telephone = $conn->real_escape_string(trim($data['telephone']));
    $message = $conn->real_escape_string(trim($data['message']));
    $date_contact = date('Y-m-d H:i:s');
    
    // Préparer la requête SQL
    $sql = "INSERT INTO contacts (nom, email, telephone, message, date_contact, statut) 
            VALUES ('$nom', '$email', '$telephone', '$message', '$date_contact', 'nouveau')";
    
    // Exécuter la requête
    if ($conn->query($sql) === TRUE) {
        echo json_encode([
            'success' => true,
            'message' => 'Contact enregistré avec succès',
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
