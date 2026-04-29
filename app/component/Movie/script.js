let templateFile = await fetch("./component/Movie/template.html");
let template = await templateFile.text();

let templateFile2 = await fetch("./component/Movie/templateLi.html");
let template2 = await templateFile2.text();

let Movie = {};

// MovieList.formatOneMenu = function(name, img){
//     let li = template2;
//     console.log(name)
//     li = li.replace("{{name}}", name);
//     li = li.replace("{{img}}", img);
//     return li;
// }

Movie.format = function (data) {
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

export { Movie };
