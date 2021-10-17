CREATE TABLE "list" (
"id" SERIAL PRIMARY KEY,
"item" VARCHAR (250),
"complete" BOOLEAN
);
INSERT INTO "list" 
("item", "complete")
VALUES
('Set up database', false),
('make coffee', false);