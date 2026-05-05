let templateFile = await fetch("./component/Movie/template.html");
let template = await templateFile.text();

let Movie = {};

Movie.format = function (data) {
  let html = template;
  html = html.replace("{{name}}", data.name);
  html = html.replace("{{img}}", "../server/images/" + data.image);
  html = html.replaceAll("{id}", data.id);

  return html;
};

export { Movie };
