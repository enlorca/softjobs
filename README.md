Desafio de backend donde se crea un servidor que autentique y autorize usuarios usando JWT. FEBRERO 2024

■ Se utiliza el frontend proporcionado para el desafio, pero solo se sube el backend al repositorio.

■ Se utiliza el puerto 3000 según frontend.

■ Se utiliza dotenv para proporcionar las credenciales.

■ Comandos para PostgreSQL especificados según desafio:

CREATE DATABASE softjobs;
\c softjobs;

CREATE TABLE usuarios ( id SERIAL, email VARCHAR(50) NOT NULL, password VARCHAR(60) NOT NULL, rol VARCHAR(25), lenguage VARCHAR(20) );

SELECT * FROM usuarios;