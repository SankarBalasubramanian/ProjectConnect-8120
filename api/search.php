<?php
session_start();
require_once '../config/database.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

$query = $_GET['q'] ?? '';

if (empty($query)) {
    echo json_encode(['success' => true, 'results' => []]);
    exit;
}

$results = [];

// Search in discussions
$stmt = $conn->prepare("
    SELECT 
        id,
        title,
        'discussion' as type
    FROM discussions 
    WHERE title LIKE ? OR content LIKE ?
");
$searchTerm = "%$query%";
$stmt->bind_param("ss", $searchTerm, $searchTerm);
$stmt->execute();
$discussionResults = $stmt->get_result();
while ($row = $discussionResults->fetch_assoc()) {
    $results[] = $row;
}

// Search in resources
$stmt = $conn->prepare("
    SELECT 
        id,
        title,
        'resource' as type
    FROM resources 
    WHERE title LIKE ? OR category LIKE ?
");
$stmt->bind_param("ss", $searchTerm, $searchTerm);
$stmt->execute();
$resourceResults = $stmt->get_result();
while ($row = $resourceResults->fetch_assoc()) {
    $results[] = $row;
}

echo json_encode([
    'success' => true,
    'results' => $results
]);
?>