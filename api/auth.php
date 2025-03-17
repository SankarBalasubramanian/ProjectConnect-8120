<?php
session_start();
require_once '../config/database.php';

header('Content-Type: application/json');

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'login':
        $data = json_decode(file_get_contents('php://input'), true);
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        $stmt = $conn->prepare("SELECT id, name, email, role, avatar, password FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($user = $result->fetch_assoc()) {
            if (password_verify($password, $user['password'])) {
                unset($user['password']);
                $_SESSION['user'] = $user;
                echo json_encode(['success' => true, 'user' => $user]);
            } else {
                http_response_code(401);
                echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
            }
        } else {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'User not found']);
        }
        break;

    case 'logout':
        session_destroy();
        echo json_encode(['success' => true]);
        break;

    case 'check':
        if (isset($_SESSION['user'])) {
            echo json_encode(['success' => true, 'user' => $_SESSION['user']]);
        } else {
            http_response_code(401);
            echo json_encode(['success' => false]);
        }
        break;
}
?>