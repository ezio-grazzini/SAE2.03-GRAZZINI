let templateFile = await fetch("./component/Profile/template.html");
let template = await templateFile.text();

let templateFile2 = await fetch("./component/Profile/templateProfile.html")
let templateProfile = await templateFile2.text();

let Profile = {};

Profile.formatOneProfile = function(name, avatar, handler, min_age){
  let oneProfile = templateProfile
  oneProfile = oneProfile.replace("{{name}}", name)
  oneProfile = oneProfile.replace("{{avatar}}", "../server/avatars/" + avatar)
  oneProfile = oneProfile.replace("{id}", handler)
  oneProfile = oneProfile.replace("{age}", min_age)

  return oneProfile;
}

Profile.format = function (handler, profiles) {
  let html = template;
  let liste="";

  for (let profile of profiles){
    let tpl_formate = Profile.formatOneProfile(profile.name, profile.avatar, profile.id, profile.min_age)
    liste = liste + tpl_formate
  }
  html = html.replace("{{Profiles}}", liste)
  return html;
};

export { Profile };
