# 2025年 ITSA生成式AI應用網頁設計競賽(試辦賽) - 初賽試題

本專案包含了四個網頁應用，全部內容由 Claude 3.5 Sonnet 生成。

## 第一題：計算機 (calculator)

一個功能完整的網頁計算機，具有以下功能：
- 基本數學運算
- 清晰的顯示界面
- 鍵盤輸入支援
- 運算歷史記錄

### 技術棧
- 前端：HTML, CSS, JavaScript
- 互動性：原生 JavaScript DOM 操作
- 設計：響應式設計

## 第二題：聊天機器人 (chatbot)

一個互動式的聊天機器人界面，具有以下功能：
- 自然語言對話
- 即時回應
- 使用者友好的界面
- 歷史訊息顯示

### 技術棧
- 前端：HTML, CSS, JavaScript
- 後端：Python (FastAPI)
- AI 模型：OpenAI API
- WebSocket：即時通訊

## 第三題：會員登入系統 (member-login)

一個安全的會員登入系統，具有以下功能：
- 會員註冊
- 會員登入
- 密碼加密存儲
- 會員資料管理
- 登入狀態維護

### 技術棧
- 前端：HTML, CSS, JavaScript
- 後端：PHP
- 資料庫：SQLite
- 安全性：密碼雜湊、Session 管理

## 第四題：商品管理系統 (product-manager)

一個完整的商品管理後台系統，具有以下功能：
- 商品列表顯示
- 新增商品
- 編輯商品資訊
- 刪除商品
- 商品搜尋功能

### 技術棧
- 前端：HTML, CSS, JavaScript, jQuery
- 後端：PHP
- 資料庫：SQLite
- AJAX：非同步資料處理

### 專案結構
```
ai_website/
├── calculator/        # 第一題：計算機應用
├── chatbot/          # 第二題：聊天機器人應用
├── member-login/     # 第三題：會員登入系統
└── product-manager/  # 第四題：商品管理系統
    ├── index.html  # 主頁面
    ├── style.css   # 樣式表
    ├── script.js     # 前端腳本
    ├── php/         # PHP 後端檔案
    │   ├── config.php
    │   ├── add_product.php
    │   ├── delete_product.php
    │   ├── get_product.php
    │   ├── get_products.php
    │   └── update_product.php
    └── start-server.sh
```

## 本地開發
1. 確保已安裝 PHP 和 MySQL
2. 配置 `product-manager/php/config.php` 中的資料庫連接資訊
3. 進入各個應用目錄執行對應的啟動腳本
4. 訪問對應的本地端口開始使用

## 注意事項
- 所有程式碼均由 Claude 3.5 Sonnet 生成
- 使用前請確保已正確配置所需的環境
- 建議在正式環境中進行安全性測試
- 這是 2025年 ITSA生成式AI應用網頁設計競賽(試辦賽) 的初賽試題作品

## 授權
本專案程式碼由 Claude 3.5 Sonnet 生成，僅供學習和參考使用。
