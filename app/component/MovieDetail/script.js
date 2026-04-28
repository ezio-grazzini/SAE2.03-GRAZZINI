let templateFile = await fetch("./component/MovieDetail/template.html");
let template = await templateFile.text();

let MovieDetail = {};

MovieDetail.format = function (data) {
  let html = template;

  html = html.replace("{{img}}", "../server/images/" + data[0].image); 
  html = html.replace("{{title}}", data[0].name);
  html = html.replace("{{description}}", data[0].description);
  html = html.replace("{{director}}", data[0].director);
  html = html.replace("{{year}}", data[0].year);
  html = html.replace("{{category}}", data[0].name_category);
  html = html.replace("{{min-age}}", data[0].min_age);
  html = html.replace("{{url}}", data[0].trailer);
  return html;
};

export { MovieDetail };
