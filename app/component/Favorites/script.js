import { Movie } from "../Movie/script.js"
 
let templateFile = await fetch("./component/Favorites/template.html");
let template = await templateFile.text();

let templateFile2 = await fetch("./component/Favorites/templateMovie.html")
let templateFavorite = await templateFile2.text()

let Favorites = {};

Favorites.formatOneFavorite = function(name, image, id){
  let oneFavorite = templateFavorite
  oneFavorite = oneFavorite.replace("{{name}}", name)
  oneFavorite = oneFavorite.replace("{{img}}", "../server/images/" + image)
  oneFavorite = oneFavorite.replace("{id}", id)

  return oneFavorite;
}

Favorites.format = function (movies) {
  let html = template;
  let liste="";

  for (let movie of movies){
    let tpl_formate = Favorites.formatOneFavorite(movie.name, movie.image, movie.id)
    liste = liste + tpl_formate
  }
  html = html.replace("{{movies}}", liste)
  return html;
};

export { Favorites };
