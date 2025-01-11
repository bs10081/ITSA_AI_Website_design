<?php
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $id = $_POST['pro_id'];
        $name = $_POST['pro_name'];
        $price = $_POST['pro_price'];
        $details = $_POST['pro_details'];

        $stmt = $pdo->prepare("UPDATE tbl_product SET pro_name = ?, pro_price = ?, pro_details = ? WHERE pro_id = ?");
        $stmt->execute([$name, $price, $details, $id]);

        echo json_encode(['success' => true, 'message' => '商品更新成功']);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => '方法不允許']);
}
?>
