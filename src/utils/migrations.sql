CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE, 
    pwd VARCHAR(255),
    code_recover_pwd VARCHAR(6),
    pix_key VARCHAR(255),
    pix_key_type VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255),
    url_image TEXT,
    description TEXT,
    state VARCHAR(2),
    category VARCHAR(255),
    goal MONEY,
    amount_raised MONEY,
    deadline TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id UUID,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    txid VARCHAR(255),
    loc_id INTEGER,
    location TEXT,
    qr_code TEXT,
    pix_copy_paste TEXT,
    amount MONEY NOT NULL,
    alias VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    message VARCHAR(255),
    status VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    donation_id UUID,
    FOREIGN KEY (donation_id) REFERENCES donations(id)
);
