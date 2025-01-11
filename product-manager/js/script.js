$(document).ready(function() {
    // 側邊欄收合功能
    $('#sidebarToggle').click(function() {
        $('.sidebar').toggleClass('collapsed');
        $('.main-content').toggleClass('expanded');
    });

    // 子選單展開/收合
    $('.menu-link').click(function(e) {
        e.preventDefault();
        $(this).next('.submenu').slideToggle();
        $(this).find('.fa-chevron-down').toggleClass('fa-chevron-up');
    });

    // 視圖切換功能
    $('#viewProducts').click(function(e) {
        e.preventDefault();
        $('#addProductView').hide();
        $('#productListView').show();
        loadProducts();
    });

    $('#addProduct').click(function(e) {
        e.preventDefault();
        $('#productListView').hide();
        $('#addProductView').show();
    });

    // 載入商品列表
    function loadProducts() {
        console.log('Loading products...');
        $.ajax({
            url: 'php/get_products.php',
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                console.log('Products loaded:', response);
                if (Array.isArray(response)) {
                    updateProductTable(response);
                } else {
                    console.error('Invalid response format:', response);
                    alert('載入商品失敗：伺服器回應格式錯誤');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error loading products:', error);
                console.error('Server response:', xhr.responseText);
                alert('載入商品失敗：' + error);
            }
        });
    }

    // 更新商品表格
    function updateProductTable(products) {
        console.log('Updating product table with:', products);
        const tbody = $('#productTableBody');
        tbody.empty();

        if (products.length === 0) {
            tbody.append('<tr><td colspan="4" class="text-center">沒有商品資料</td></tr>');
            return;
        }

        products.forEach(function(product) {
            const row = `
                <tr>
                    <td>${product.pro_id}</td>
                    <td>${product.pro_name}</td>
                    <td>${product.pro_price}</td>
                    <td>
                        <button class="action-btn edit-btn" data-id="${product.pro_id}">
                            <i class="fas fa-edit"></i>編輯
                        </button>
                        <button class="action-btn delete-btn" data-id="${product.pro_id}">
                            <i class="fas fa-trash"></i>刪除
                        </button>
                    </td>
                </tr>
            `;
            tbody.append(row);
        });
    }

    // 新增商品表單提交
    $('#addProductForm').submit(function(e) {
        e.preventDefault();
        const formData = {
            name: $('#productName').val(),
            price: $('#productPrice').val(),
            description: $('#productDesc').val()
        };

        console.log('Submitting product:', formData);

        $.ajax({
            url: 'php/add_product.php',
            method: 'POST',
            data: formData,
            dataType: 'json',
            success: function(response) {
                console.log('Product added:', response);
                alert('商品新增成功！');
                $('#addProductForm')[0].reset();
                $('#addProductView').hide();
                $('#productListView').show();
                loadProducts();
            },
            error: function(xhr, status, error) {
                console.error('Error adding product:', error);
                console.error('Server response:', xhr.responseText);
                alert('商品新增失敗：' + error);
            }
        });
    });

    // 刪除商品
    $(document).on('click', '.delete-btn', function() {
        const productId = $(this).data('id');
        if (confirm('確定要刪除此商品嗎？')) {
            console.log('Deleting product:', productId);
            $.ajax({
                url: 'php/delete_product.php',
                method: 'POST',
                data: { id: productId },
                dataType: 'json',
                success: function(response) {
                    console.log('Product deleted:', response);
                    alert('商品刪除成功！');
                    loadProducts();
                },
                error: function(xhr, status, error) {
                    console.error('Error deleting product:', error);
                    console.error('Server response:', xhr.responseText);
                    alert('商品刪除失敗：' + error);
                }
            });
        }
    });

    // 編輯商品
    $(document).on('click', '.edit-btn', function() {
        const productId = $(this).data('id');
        // 獲取商品詳細信息
        $.ajax({
            url: 'php/get_product.php',
            method: 'GET',
            data: { id: productId },
            success: function(product) {
                // 填充表單
                $('#editProductId').val(product.pro_id);
                $('#editProductName').val(product.pro_name);
                $('#editProductPrice').val(product.pro_price);
                $('#editProductDetails').val(product.pro_details);
                
                // 顯示編輯視圖
                $('#productListView').hide();
                $('#addProductView').hide();
                $('#editProductView').show();
            },
            error: function(xhr, status, error) {
                alert('載入商品資料失敗：' + error);
            }
        });
    });

    // 取消編輯
    $('#editCancelBtn').click(function() {
        $('#editProductForm')[0].reset();
        $('#editProductView').hide();
        $('#productListView').show();
    });

    // 提交編輯表單
    $('#editProductForm').submit(function(e) {
        e.preventDefault();
        const formData = {
            pro_id: $('#editProductId').val(),
            pro_name: $('#editProductName').val(),
            pro_price: $('#editProductPrice').val(),
            pro_details: $('#editProductDetails').val()
        };

        $.ajax({
            url: 'php/update_product.php',
            method: 'POST',
            data: formData,
            success: function(response) {
                alert('商品更新成功！');
                $('#editProductForm')[0].reset();
                $('#editProductView').hide();
                $('#productListView').show();
                loadProducts();
            },
            error: function(xhr, status, error) {
                alert('商品更新失敗：' + error);
            }
        });
    });

    // 初始載入商品列表
    console.log('Initial products load');
    loadProducts();
});
