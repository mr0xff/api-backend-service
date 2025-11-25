-- CREATE TABLE notes_tb (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   title VARCHAR(255) NOT NULL,
--   details TEXT NOT null
-- )

create table notes_tb (
  id bigserial primary key,
  title varchar(255) not null,
  detail text not null
);

-- samples
insert into notes_tb (title, detail) values
('r', 'nota de exemplo'),
('Primeira nota', 'Conteúdo detalhado da primeira nota.'),
('Segunda nota', 'Mais detalhes sobre outra nota.'),
('Teste', 'Texto de teste para preenchimento.');
