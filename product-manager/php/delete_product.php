<?php
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $id = $_POST['id'];

        $stmt = $pdo->prepare("DELETE FROM tbl_product WHERE pro_id = ?");
        $stmt->execute([$id]);

        echo json_encode(['success' => true, 'message' => '商品刪除成功']);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => '方法不允許']);
}
?>
