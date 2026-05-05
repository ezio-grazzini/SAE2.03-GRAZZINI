<?php
/**
 * Ce fichier contient toutes les fonctions qui réalisent des opérations
 * sur la base de données, telles que les requêtes SQL pour insérer, 
 * mettre à jour, supprimer ou récupérer des données.
 */

/**
 * Définition des constantes de connexion à la base de données.
 *
 * HOST : Nom d'hôte du serveur de base de données, ici "localhost".
 * DBNAME : Nom de la base de données
 * DBLOGIN : Nom d'utilisateur pour se connecter à la base de données.
 * DBPWD : Mot de passe pour se connecter à la base de données.
 */
define("HOST", "localhost");
define("DBNAME", "grazzini2");
define("DBLOGIN", "grazzini2");
define("DBPWD", "grazzini2");


function getAllMovies($age){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour récupérer le menu avec des paramètres
    $sql = "SELECT Movie.name, Movie.id AS id, image, id_category, min_age, Category.name AS name_category FROM Movie INNER JOIN Category ON Movie.id_category = Category.id WHERE Movie.min_age<=:age";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':age', $age);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère les résultats de la requête sous forme d'objets
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; // Retourne les résultats
}

function getAllCategories(){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour récupérer le menu avec des paramètres
    $sql = "select id, name from Category";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère les résultats de la requête sous forme d'objets
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; // Retourne les résultats
}

function getAllProfiles(){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour récupérer le menu avec des paramètres
    $sql = "select id, name, avatar, min_age from Profile";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère les résultats de la requête sous forme d'objets
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; // Retourne les résultats
}

function getMovieDetail($id){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour récupérer le menu avec des paramètres
    $sql = "SELECT Movie.name, image, description, director, year, id_category, min_age, trailer, Category.name as name_category FROM Movie INNER JOIN Category ON Movie.id_category = Category.id WHERE Movie.id=:id";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':id', $id);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère les résultats de la requête sous forme d'objets
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; // Retourne les résultats
}

function addMovies($n, $y, $l, $d, $dir, $im, $i, $t, $m ){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD); 
    $sql = "INSERT INTO Movie (name, year, length, description, director, image, id_category, trailer, min_age)
            VALUES (:name, :year, :length, :description, :director, :image, :id_category, :trailer, :min_age)";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':name', $n);
    $stmt->bindParam(':year', $y);
    $stmt->bindParam(':length', $l);
    $stmt->bindParam(':description', $d);
    $stmt->bindParam(':director', $dir);
    $stmt->bindParam(':image', $im);
    $stmt->bindParam(':id_category', $i);
    $stmt->bindParam(':trailer', $t);
    $stmt->bindParam(':min_age', $m);

    $stmt->execute();
    $res = $stmt->rowCount();

    return $res;
}

function addProfile($n, $a, $m, $id){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD); 
    $sql = "REPLACE INTO Profile (id, name, avatar, min_age)
            VALUES (:id, :name, :avatar, :min_age)";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':name', $n);
    $stmt->bindParam(':avatar', $a);
    $stmt->bindParam(':min_age', $m);
    $stmt->bindParam(':id', $id);

    $stmt->execute();
    $res = $stmt->rowCount();

    return $res;
}

function addFavorite($movie_id, $profile_id){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD); 
    $sql = "INSERT INTO Favorites (movie_id, profile_id)
            VALUES (:movie_id, :profile_id)";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':movie_id', $movie_id);
    $stmt->bindParam(':profile_id', $profile_id);

    $stmt->execute();
    $res = $stmt->rowCount();

    return $res;
}

function getAllFavorites($id){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour récupérer le menu avec des paramètres
    $sql = "SELECT Movie.id, Movie.name, Movie.image FROM Favorites INNER JOIN Movie ON Favorites.movie_id=Movie.id WHERE Favorites.profile_id=:id;";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':id', $id);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère les résultats de la requête sous forme d'objets
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; // Retourne les résultats
}

function removeFavorite($movie_id, $profile_id){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD); 
    $sql = "DELETE FROM Favorites WHERE movie_id=:movie_id AND profile_id=:profile_id";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':movie_id', $movie_id);
    $stmt->bindParam(':profile_id', $profile_id);

    $stmt->execute();
    $res = $stmt->rowCount();

    return $res;
}