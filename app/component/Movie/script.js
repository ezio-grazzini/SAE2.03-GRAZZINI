let templateFile = await fetch("./component/Movie/template.html");
let template = await templateFile.text();

let templateFile2 = await fetch("./component/Movie/templateLi.html");
let template2 = await templateFile2.text();

let Movie = {};

Movie.format = function (data) {
  let html = template2;
  html = html.replace("{{name}}", data.name);
  html = html.replace("{{img}}", "../server/images/" + data.image);
  html = html.replace("{id}", data.id);

  return html;
};

export { Movie };
