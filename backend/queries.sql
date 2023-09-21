-- Activer les clés étrangères
PRAGMA foreign_keys = ON;

-- Créer la table “Ad” avec les champs correspondants
CREATE TABLE Category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100)
);
CREATE TABLE Ad (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(100) NOT NULL,
    -- description TEXT,
    owner VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    createdAt DATE NOT NULL,
    -- picture VARCHAR(100),
    location VARCHAR(100) NOT NULL,
    categoryId INTEGER,
    FOREIGN KEY (categoryId) REFERENCES Category(id)
);

-- Insérer 20 annonces dans ces 3 villes : Bordeaux, Paris, Lyon
INSERT INTO Category (name) VALUES 
('Bike'),
('Phone'),
('Other');

INSERT INTO Ad (title, owner, location, price, createdAt, categoryId) VALUES 
('Smartphone','Alice','Paris', 700, '2023-09-01',2),
('Digital Camera','Bob','Lyon', 300, '2023-09-01',3),
('Laptop','Eva','Bordeaux', 900, '2023-09-25',3),
('Fitness Tracker','Lucas','Lyon', 35, '2023-09-02',3),
('Bluetooth Speaker','Sophia','Paris', 40, '2023-09-10',3),
('Coffee Machine','Daniel','Bordeaux', 120, '2023-09-12',3),
('Tablet','Ava','Paris', 50, '2023-09-20',3),
('Headphones','Noah','Lyon', 38, '2023-09-06',3),
('Wristwatch','Emily','Bordeaux', 60, '2023-09-16',3),
('Gaming Console','Liam','Paris', 450, '2023-09-28',3),
('Drone','Michael','Lyon', 600, '2023-09-09',3),
('Action Camera','Snow','Paris', 70, '2023-09-19', NULL),
('Sewing Machine','Emma','Bordeaux', 85, '2023-09-14', NULL),
('Hiking Boots','George','Paris', 55, '2023-09-17', NULL),
('Backpack','Oliver','Lyon', 42, '2023-09-07', NULL),
('Digital Watch','William','Bordeaux', 75, '2023-09-26', NULL),
('Ebook Reader','Sophie','Paris', 80, '2023-09-22', NULL),
('Fitness Bike','John','Lyon', 110, '2023-09-03', NULL),
('Electric Guitar','Lily','Bordeaux', 180, '2023-09-23', NULL),
('Mountain Bike','Ava','Paris', 250, '2023-09-11',1);

-- Afficher toutes les annonces
SELECT * FROM Category;

SELECT * FROM Ad;

SELECT Ad.*, c.name
FROM Ad LEFT JOIN Category as c On c.id = Ad.categoryId
WHERE c.id = 3;

-- Afficher toutes les annonces de Bordeaux
SELECT * FROM Ad WHERE location = 'Bordeaux';

-- Supprimer les annonces avec un prix supérieur à 40€
DELETE FROM Ad WHERE price < 40;

-- Mettre à jour les annonces du 1er Septembre avec un prix à 0€
UPDATE Ad SET price = 0 WHERE createdAt = '2023-09-01';

-- Afficher la moyenne des prix des annonces de la ville de Paris
SELECT AVG(price) FROM Ad WHERE location = 'Lyon';

-- BONUS : Afficher la moyenne des prix des annonces par ville
SELECT location, AVG(price) FROM Ad GROUP BY location;

-- Supprimer la table et son contenu
DROP TABLE IF EXISTS Ad;