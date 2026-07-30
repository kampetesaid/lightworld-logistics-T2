<?php
// ========================================
// RÉCUPÉRATION DES CONTACTS
// Permet de consulter tous les contacts enregistrés (pour l'admin)
// ========================================

include 'config.php';

// Vérifier que c'est une requête GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    
    // Récupérer les paramètres de filtrage optionnels
    $statut = isset($_GET['statut']) ? $_GET['statut'] : '';
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 100;
    $offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
    
    // Construire la requête SQL
    $sql = "SELECT * FROM contacts";
    
    if ($statut !== '') {
        $statut = $conn->real_escape_string($statut);
        $sql .= " WHERE statut = '$statut'";
    }
    
    $sql .= " ORDER BY date_contact DESC LIMIT $limit OFFSET $offset";
    
    // Exécuter la requête
    $result = $conn->query($sql);
    
    if ($result) {
        $contacts = [];
        
        while ($row = $result->fetch_assoc()) {
            $contacts[] = $row;
        }
        
        echo json_encode([
            'success' => true,
            'count' => count($contacts),
            'data' => $contacts
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Erreur lors de la récupération: ' . $conn->error
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
