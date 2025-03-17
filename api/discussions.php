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
        $sql = "SELECT d.*, u.name as author, u.avatar, 
                (SELECT COUNT(*) FROM discussion_replies WHERE discussion_id = d.id) as replies
                FROM discussions d
                JOIN users u ON d.user_id = u.id
                ORDER BY d.created_at DESC";
        
        $result = $conn->query($sql);
        $discussions = [];
        
        while ($row = $result->fetch_assoc()) {
            // Get tags for each discussion
            $tagSql = "SELECT tag FROM discussion_tags WHERE discussion_id = ?";
            $stmt = $conn->prepare($tagSql);
            $stmt->bind_param("i", $row['id']);
            $stmt->execute();
            $tagResult = $stmt->get_result();
            
            $tags = [];
            while ($tag = $tagResult->fetch_assoc()) {
                $tags[] = $tag['tag'];
            }
            
            $row['tags'] = $tags;
            $discussions[] = $row;
        }
        
        echo json_encode(['success' => true, 'discussions' => $discussions]);
        break;

    case 'POST':
        if (!in_array($user['role'], ['admin', 'manager', 'user'])) {
            http_response_code(403);
            echo json_encode(['success' => false, 'message' => 'Forbidden']);
            exit;
        }

        $data = json_decode(file_get_contents('php://input'), true);
        
        $stmt = $conn->prepare("INSERT INTO discussions (title, content, user_id) VALUES (?, ?, ?)");
        $stmt->bind_param("ssi", $data['title'], $data['content'], $user['id']);
        
        if ($stmt->execute()) {
            $discussion_id = $stmt->insert_id;
            
            // Insert tags
            if (!empty($data['tags'])) {
                $tagStmt = $conn->prepare("INSERT INTO discussion_tags (discussion_id, tag) VALUES (?, ?)");
                foreach ($data['tags'] as $tag) {
                    $tagStmt->bind_param("is", $discussion_id, $tag);
                    $tagStmt->execute();
                }
            }
            
            echo json_encode(['success' => true, 'message' => 'Discussion created']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Error creating discussion']);
        }
        break;

    case 'DELETE':
        if (!in_array($user['role'], ['admin', 'manager'])) {
            http_response_code(403);
            echo json_encode(['success' => false, 'message' => 'Forbidden']);
            exit;
        }

        $id = $_GET['id'] ?? null;
        if ($id) {
            $stmt = $conn->prepare("DELETE FROM discussions WHERE id = ?");
            $stmt->bind_param("i", $id);
            
            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Discussion deleted']);
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'message' => 'Error deleting discussion']);
            }
        }
        break;
}
?>