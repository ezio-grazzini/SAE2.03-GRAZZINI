let templateFile = await fetch("./component/MovieForm/template.html");
let template = await templateFile.text();

let templateFile2 = await fetch("./component/MovieForm/templateOption.html")
let templateOption = await templateFile2.text();

let MovieForm = {};

MovieForm.formatOneCategory = function(name, id){
  let option = templateOption
  option = option.replace("{{category}}", name)
  option = option.replace("{{id_category}}", id)

  return option;
}

MovieForm.format = function (handler, categories) {
  let html = template;
  html = html.replace('{{handler}}', handler);
  console.log(categories)

  let liste="";

  for (let item of categories){
    let tpl_formate = MovieForm.formatOneCategory(categories.name, categories.id_categories)
    
  }
  return html;
};

MovieForm.render = function(where, what){
  let element = document.querySelector(where)
  element.innerHTML += MovieList.format(what)
}

export { MovieForm };
