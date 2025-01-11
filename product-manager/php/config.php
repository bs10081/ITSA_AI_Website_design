<?php
$db_path = __DIR__ . '/../db/crud.db';
$db_directory = dirname($db_path);

// 確保資料庫目錄存在
if (!file_exists($db_directory)) {
    mkdir($db_directory, 0777, true);
}

try {
    $pdo = new PDO("sqlite:$db_path");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // 創建產品表（如果不存在）
    $pdo->exec("CREATE TABLE IF NOT EXISTS tbl_product (
        pro_id INTEGER PRIMARY KEY AUTOINCREMENT,
        pro_name VARCHAR(100) NOT NULL,
        pro_price INTEGER NOT NULL,
        pro_details TEXT
    )");
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit;
}
?>
