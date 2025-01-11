<?php
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $name = $_POST['name'];
        $price = $_POST['price'];
        $details = $_POST['description'];

        $stmt = $pdo->prepare("INSERT INTO tbl_product (pro_name, pro_price, pro_details) VALUES (?, ?, ?)");
        $stmt->execute([$name, $price, $details]);

        echo json_encode(['success' => true, 'message' => '商品新增成功']);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => '方法不允許']);
}
?>
