<?php
require_once 'config.php';

header('Content-Type: application/json');

try {
    $stmt = $pdo->prepare("SELECT * FROM tbl_product ORDER BY pro_id ASC");
    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // 添加調試信息
    error_log('Retrieved products: ' . print_r($products, true));
    
    echo json_encode($products, JSON_UNESCAPED_UNICODE);
} catch(PDOException $e) {
    error_log('Database error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
