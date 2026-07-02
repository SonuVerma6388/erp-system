-- =========================================================
-- STORE ERP DATABASE SCHEMA
-- Database: PostgreSQL
-- =========================================================

-- =========================================================
-- EXTENSIONS
-- =========================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================================================
-- DROP TABLES (FOR DEVELOPMENT)
-- =========================================================

DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS stock_movements CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

-- =========================================================
-- ROLES TABLE
-- =========================================================

CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(50) UNIQUE NOT NULL,

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- USERS TABLE
-- =========================================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    role_id UUID REFERENCES roles(id) ON DELETE SET NULL,

    first_name VARCHAR(100) NOT NULL,

    last_name VARCHAR(100),

    email VARCHAR(255) UNIQUE NOT NULL,

    phone VARCHAR(20) UNIQUE,

    password TEXT NOT NULL,

    avatar TEXT,

    is_active BOOLEAN DEFAULT TRUE,

    last_login TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- PRODUCTS TABLE
-- =========================================================

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(255) NOT NULL,

    sku VARCHAR(100) UNIQUE NOT NULL,

    barcode VARCHAR(100) UNIQUE,

    description TEXT,

    category VARCHAR(100),

    brand VARCHAR(100),

    unit VARCHAR(50) DEFAULT 'pcs',

    cost_price NUMERIC(12,2) NOT NULL DEFAULT 0,

    selling_price NUMERIC(12,2) NOT NULL DEFAULT 0,

    tax_percent NUMERIC(5,2) DEFAULT 0,

    image_url TEXT,

    is_active BOOLEAN DEFAULT TRUE,

    created_by UUID REFERENCES users(id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- CUSTOMERS TABLE
-- =========================================================

CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    first_name VARCHAR(100) NOT NULL,

    last_name VARCHAR(100),

    phone VARCHAR(20) UNIQUE,

    email VARCHAR(255),

    address TEXT,

    city VARCHAR(100),

    state VARCHAR(100),

    postal_code VARCHAR(20),

    gst_number VARCHAR(50),

    loyalty_points INTEGER DEFAULT 0,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- ORDERS TABLE
-- =========================================================

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    order_number VARCHAR(100) UNIQUE NOT NULL,

    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,

    created_by UUID REFERENCES users(id) ON DELETE SET NULL,

    subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,

    tax_amount NUMERIC(12,2) NOT NULL DEFAULT 0,

    discount_amount NUMERIC(12,2) DEFAULT 0,

    total_amount NUMERIC(12,2) NOT NULL DEFAULT 0,

    payment_method VARCHAR(50),

    payment_status VARCHAR(50) DEFAULT 'pending',

    order_status VARCHAR(50) DEFAULT 'completed',

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- ORDER ITEMS TABLE
-- =========================================================

CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,

    product_id UUID NOT NULL REFERENCES products(id),

    quantity INTEGER NOT NULL CHECK (quantity > 0),

    unit_price NUMERIC(12,2) NOT NULL,

    tax_percent NUMERIC(5,2) DEFAULT 0,

    discount_amount NUMERIC(12,2) DEFAULT 0,

    subtotal NUMERIC(12,2) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- INVENTORY TABLE
-- =========================================================

CREATE TABLE inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    product_id UUID UNIQUE NOT NULL REFERENCES products(id) ON DELETE CASCADE,

    quantity INTEGER NOT NULL DEFAULT 0,

    reserved_quantity INTEGER DEFAULT 0,

    reorder_level INTEGER DEFAULT 5,

    warehouse_location VARCHAR(255),

    last_stock_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- STOCK MOVEMENTS TABLE
-- =========================================================

CREATE TABLE stock_movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    product_id UUID NOT NULL REFERENCES products(id),

    reference_order_id UUID REFERENCES orders(id) ON DELETE SET NULL,

    movement_type VARCHAR(50) NOT NULL,

    quantity INTEGER NOT NULL,

    previous_stock INTEGER NOT NULL,

    new_stock INTEGER NOT NULL,

    notes TEXT,

    created_by UUID REFERENCES users(id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- AUDIT LOGS TABLE
-- =========================================================

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID REFERENCES users(id) ON DELETE SET NULL,

    action VARCHAR(100) NOT NULL,

    table_name VARCHAR(100) NOT NULL,

    record_id UUID,

    old_data JSONB,

    new_data JSONB,

    ip_address VARCHAR(100),

    user_agent TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- INDEXES
-- =========================================================

CREATE INDEX idx_users_email
ON users(email);

CREATE INDEX idx_products_sku
ON products(sku);

CREATE INDEX idx_products_barcode
ON products(barcode);

CREATE INDEX idx_orders_customer
ON orders(customer_id);

CREATE INDEX idx_orders_created_at
ON orders(created_at);

CREATE INDEX idx_order_items_order
ON order_items(order_id);

CREATE INDEX idx_stock_movements_product
ON stock_movements(product_id);

CREATE INDEX idx_audit_logs_user
ON audit_logs(user_id);

CREATE INDEX idx_audit_logs_table
ON audit_logs(table_name);

-- =========================================================
-- UPDATED_AT TRIGGER FUNCTION
-- =========================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- =========================================================
-- TRIGGERS
-- =========================================================

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at
BEFORE UPDATE ON customers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inventory_updated_at
BEFORE UPDATE ON inventory
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- =========================================================
-- INSERT DEFAULT ROLES
-- =========================================================

INSERT INTO roles (name, description)
VALUES
('admin', 'Full system access'),
('manager', 'Store manager access'),
('cashier', 'Billing and sales access'),
('inventory_staff', 'Inventory management access');

-- =========================================================
-- INSERT DEFAULT ADMIN USER
-- =========================================================

INSERT INTO users (
    role_id,
    first_name,
    last_name,
    email,
    password
)
VALUES (
    (SELECT id FROM roles WHERE name = 'admin'),
    'System',
    'Admin',
    'admin@storeerp.com',
    '$2b$10$examplehashedpassword'
);

-- =========================================================
-- SAMPLE PRODUCTS
-- =========================================================

INSERT INTO products (
    name,
    sku,
    barcode,
    category,
    brand,
    cost_price,
    selling_price,
    tax_percent
)
VALUES
(
    'Apple iPhone 15',
    'IPHONE15',
    '100000001',
    'Mobiles',
    'Apple',
    60000,
    75000,
    18
),
(
    'Samsung Galaxy S24',
    'S24',
    '100000002',
    'Mobiles',
    'Samsung',
    50000,
    68000,
    18
);

-- =========================================================
-- INITIAL INVENTORY
-- =========================================================

INSERT INTO inventory (
    product_id,
    quantity,
    reorder_level,
    warehouse_location
)
SELECT
    id,
    50,
    5,
    'Main Warehouse'
FROM products;

-- =========================================================
-- END OF SCHEMA
-- =========================================================