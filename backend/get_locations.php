<?php
// ========================================
// RÉCUPÉRATION DES LOCALISATIONS GPS
// Permet de consulter toutes les localisations enregistrées (pour l'admin)
// ========================================

include 'config.php';

// Vérifier que c'est une requête GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    
    // Récupérer les paramètres de filtrage optionnels
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 100;
    $offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
    $order = isset($_GET['order']) ? $_GET['order'] : 'DESC';
    
    // Sécuriser le paramètre order
    $order = ($order === 'ASC') ? 'ASC' : 'DESC';
    
    // Construire la requête SQL
    $sql = "SELECT * FROM localisations 
            ORDER BY timestamp $order 
            LIMIT $limit OFFSET $offset";
    
    // Exécuter la requête
    $result = $conn->query($sql);
    
    if ($result) {
        $localisations = [];
        
        while ($row = $result->fetch_assoc()) {
            $localisations[] = $row;
        }
        
        echo json_encode([
            'success' => true,
            'count' => count($localisations),
            'data' => $localisations
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
