let templateFile = await fetch("./component/Movie/template.html");
let template = await templateFile.text();

let templateFile2 = await fetch("./component/Movie/templateLi.html");
let template2 = await templateFile2.text();

let MovieList = {};

// MovieList.formatOneMenu = function(name, img){
//     let li = template2;
//     console.log(name)
//     li = li.replace("{{name}}", name);
//     li = li.replace("{{img}}", img);
//     return li;
// }

MovieList.format = function (data) {
  let html = template;

  let liste="";

  for (let item of data){
    let li = template2;
    li = li.replace("{{name}}", item.name);
    li = li.replace("{{img}}", "../server/images/" + item.image);
    li = li.replace("{id}", item.id);

    liste = liste += li;
  }
  html = html.replace("{{movies}}", liste)
  return html;
};

MovieList.render = function(where, what){
    let element = document.querySelector(where)
    element.innerHTML += MovieList.format(what);
}

export { MovieList };
