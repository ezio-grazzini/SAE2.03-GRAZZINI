let templateFile = await fetch("./component/NavBar/template.html");
let template = await templateFile.text();

let NavBar = {};

NavBar.format = function (hHome, hProfile, hFavorites) {
  let html = template;
  console.log(hProfile)
  console.log(hHome)
  console.log(hFavorites)
  html = html.replace("{{hHome}}", hHome);
  html = html.replace("{{hProfile}}", hProfile);
  html = html.replace("{{hFavorites}}", hFavorites);
  return html;
};

export { NavBar };
