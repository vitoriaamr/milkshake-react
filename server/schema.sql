-- Banco de dados da "Coração de Ouro - Milkshake Builder"
CREATE DATABASE IF NOT EXISTS shake_haven CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shake_haven;

DROP TABLE IF EXISTS stores;

CREATE TABLE stores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  address VARCHAR(255) NOT NULL,
  neighborhood VARCHAR(120) NOT NULL,
  city VARCHAR(120) NOT NULL,
  state CHAR(2) NOT NULL,
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL,
  phone VARCHAR(20),
  opening_hours VARCHAR(120)
);

-- Lojas fictícias espalhadas por bairros de São Paulo - SP
INSERT INTO stores (name, address, neighborhood, city, state, latitude, longitude, phone, opening_hours) VALUES
('Coração de Ouro - Pinheiros', 'Rua dos Pinheiros, 480', 'Pinheiros', 'São Paulo', 'SP', -23.5640, -46.6890, '(11) 3061-1234', '10h às 22h'),
('Coração de Ouro - Vila Madalena', 'Rua Harmonia, 120', 'Vila Madalena', 'São Paulo', 'SP', -23.5530, -46.6900, '(11) 3032-5678', '11h às 23h'),
('Coração de Ouro - Moema', 'Av. Ibirapuera, 2332', 'Moema', 'São Paulo', 'SP', -23.6080, -46.6650, '(11) 5052-4321', '10h às 22h'),
('Coração de Ouro - Itaim Bibi', 'Rua Joaquim Floriano, 850', 'Itaim Bibi', 'São Paulo', 'SP', -23.5860, -46.6760, '(11) 3168-9911', '10h às 23h'),
('Coração de Ouro - Tatuapé', 'Rua Tuiuti, 2010', 'Tatuapé', 'São Paulo', 'SP', -23.5390, -46.5760, '(11) 2095-3344', '10h às 22h'),
('Coração de Ouro - Santana', 'Av. Cruzeiro do Sul, 1100', 'Santana', 'São Paulo', 'SP', -23.5010, -46.6230, '(11) 2950-7766', '10h às 22h'),
('Coração de Ouro - Liberdade', 'Rua Galvão Bueno, 430', 'Liberdade', 'São Paulo', 'SP', -23.5580, -46.6350, '(11) 3209-8855', '11h às 21h'),
('Coração de Ouro - Morumbi', 'Av. Giovanni Gronchi, 5930', 'Morumbi', 'São Paulo', 'SP', -23.6000, -46.7270, '(11) 3742-2233', '10h às 22h'),
('Coração de Ouro - Santo Amaro', 'Av. Santo Amaro, 5750', 'Santo Amaro', 'São Paulo', 'SP', -23.6520, -46.7080, '(11) 5181-4499', '10h às 22h'),
('Coração de Ouro - Higienópolis', 'Rua Maranhão, 350', 'Higienópolis', 'São Paulo', 'SP', -23.5440, -46.6550, '(11) 3661-2200', '10h às 22h');
