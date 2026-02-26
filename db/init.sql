-- 1. Tabla de Paquetes
CREATE TABLE IF NOT EXISTS paquetes (
    id SERIAL PRIMARY KEY,
    ciudad VARCHAR(100) NOT NULL,
    pais VARCHAR(100) NOT NULL,
    precio_cop DECIMAL(12, 2) NOT NULL,
    cupos INTEGER NOT NULL,
    fecha_salida DATE NOT NULL,
    incluye JSONB, 
    descripcion TEXT,
    activo BOOLEAN DEFAULT true, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de Leads
CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    paquete_id INTEGER REFERENCES paquetes(id) ON DELETE SET NULL,
    mensaje TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'nuevo' 
);

-- Seed: 6 paquetes iniciales para el Mundial 2026
INSERT INTO paquetes (ciudad, pais, precio_cop, cupos, fecha_salida, incluye, descripcion) VALUES
('Miami', 'EE.UU.', 5200000, 15, '2026-06-15', '["Hotel 4*", "Tiquetes", "Entrada Colombia vs Polonia"]', 'Vive el debut de la tricolor'),
('Houston', 'EE.UU.', 4800000, 10, '2026-06-20', '["Hotel", "Traslados"]', 'Fase de grupos - Houston Stadium'),
('Dallas', 'EE.UU.', 5500000, 8, '2026-06-25', '["VIP Pass", "Hotel 5*"]', 'Experiencia premium en Dallas'),
('New York', 'EE.UU.', 6200000, 12, '2026-07-01', '["City Tour", "Entrada"]', 'Octavos de final en la Gran Manzana'),
('Los Angeles', 'EE.UU.', 5900000, 20, '2026-06-12', '["Vuelo directo", "Hotel"]', 'Inauguración en el SoFi Stadium'),
('Mexico DF', 'México', 4100000, 15, '2026-06-18', '["Hotel", "Cena de bienvenida"]', 'Siente el calor de la sede mexicana');