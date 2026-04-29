import { Movie } from "../Movie/script.js"
 
let templateFile = await fetch("./component/MovieCategory/template.html");
let template = await templateFile.text();

let templateFile2 = await fetch("./component/MovieCategory/templateCategory.html")
let templateCategory = await templateFile2.text();

let MovieCategory = {};

MovieCategory.formatOneCategory = function(name, category){
  let Category = templateCategory;
  Category = Category.replace("{{name}}", name);
  console.log(category)
  if (category.Movie){
    console.log(name.Movie)
    let moviesHTML = Movie.format(name.Movie);
    Category = Category.replace("{{movies}}", moviesHTML);
  }
  
  return Category;
}

MovieCategory.format = function (categories) {
  let html = template;
  console.log(categories)
  let liste="";

  for (let category of categories){
    let tpl_formate = MovieCategory.formatOneCategory(category.name, category)
    console.log(category.name)
    liste = liste + tpl_formate
  }
  
  html = html.replace("{{category}}", liste)
  return html;
};

export { MovieCategory };
