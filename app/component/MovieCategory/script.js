import { Movie } from "../Movie/script.js"
 
let templateFile = await fetch("./component/MovieCategory/template.html");
let template = await templateFile.text();

let templateFile2 = await fetch("./component/MovieCategory/templateCategory.html")
let templateCategory = await templateFile2.text();

let MovieCategory = {};

MovieCategory.formatOneCategory = function(name, moviesHTML){
  let Category = templateCategory;
  Category = Category.replace("{{name}}", name);
  Category = Category.replace("{{movies}}", moviesHTML)
  
  return Category;
}

MovieCategory.format = function (categories, movies) {
  let html = template;
  let liste="";

  for (let category of categories){
    let moviesHTML = ""

    for (let movie of movies){
      if (movie.name_category == category.name){
        moviesHTML += Movie.format(movie)
      }
    }

    let tpl_formate = MovieCategory.formatOneCategory(category.name, moviesHTML)
    liste = liste + tpl_formate
  }
  
  html = html.replace("{{category}}", liste)
  return html;
};

export { MovieCategory };
