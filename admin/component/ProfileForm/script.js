let templateFile = await fetch("./component/ProfileForm/template.html");
let template = await templateFile.text();

let templateFile2 = await fetch("./component/ProfileForm/templateOption.html")
let templateOption = await templateFile2.text();

let ProfileForm = {};

ProfileForm.formatOneOption = function(name, id){
  let option = templateOption
  option = option.replace("{{nomprofil}}", name)
  option = option.replaceAll("{{id}}", id)

  return option;
}

ProfileForm.format = function (handler, profiles) {
  let html = template;
  html = html.replace('{{handler}}', handler);

  let liste ="";

  for(let profile of profiles){
    let tpl_formate = ProfileForm.formatOneOption(profile.name, profile.id)
    liste = liste + tpl_formate
  }
  html = html.replace("{{options}}", liste)
  return html;
};

export { ProfileForm };