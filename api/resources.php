<?php
session_start();
require_once '../config/database.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$user = $_SESSION['user'];

switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM resources";
        if (!in_array($user['role'], ['admin', 'manager'])) {
            $sql .= " WHERE access_level = 'public'";
        }
        $sql .= " ORDER BY category, title";
        
        $result = $conn->query($sql);
        $resources = [];
        
        while ($row = $result->fetch_assoc()) {
            $resources[] = $row;
        }
        
        echo json_encode(['success' => true, 'resources' => $resources]);
        break;

    case 'POST':
        if (!in_array($user['role'], ['admin', 'manager'])) {
            http_response_code(403);
            echo json_encode(['success' => false, 'message' => 'Forbidden']);
            exit;
        }

        // Handle file upload and resource creation
        if (isset($_FILES['file'])) {
            $uploadDir = '../uploads/';
            $fileName = uniqid() . '_' . basename($_FILES['file']['name']);
            $filePath = $uploadDir . $fileName;
            
            if (move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
                $stmt = $conn->prepare("INSERT INTO resources (category, title, file_type, file_size, file_path, access_level) VALUES (?, ?, ?, ?, ?, ?)");
                $stmt->bind_param("ssssss", 
                    $_POST['category'],
                    $_POST['title'],
                    $_POST['file_type'],
                    $_FILES['file']['size'],
                    $fileName,
                    $_POST['access_level']
                );
                
                if ($stmt->execute()) {
                    echo json_encode(['success' => true, 'message' => 'Resource added']);
                } else {
                    http_response_code(500);
                    echo json_encode(['success' => false, 'message' => 'Error adding resource']);
                }
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'message' => 'Error uploading file']);
            }
        }
        break;
}
?>