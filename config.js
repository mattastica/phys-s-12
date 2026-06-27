var config = {
  student_name: "Matthew Ryan Grace", // ie. John Doe
  student_year_sem: "Summer 2026", // ie. Fall 2025

  background_color: "#f1f3f4",
  text_color: "#202124",
  accent_color: "#FFFFFF",

  // Make sure to add the @import from Google Fonts to style.css, ask if you need help!
  font_family: "Inter",
  code_font_family: "Roboto Mono"
};

document.title = `${config.student_name}'s S-12 Website`;

document.documentElement.style.setProperty(
  "--background-color",
  config.background_color
);
document.documentElement.style.setProperty(
  "--text-color",
  config.text_color
);
document.documentElement.style.setProperty(
  "--accent-color",
  config.accent_color
);
document.documentElement.style.setProperty(
  "--font-family",
  config.font_family
);
document.documentElement.style.setProperty(
  "--mono-font-family",
  config.code_font_family
);

document.querySelector("footer").innerHTML = `
  <a href="./index.html#final-project">Work</a>
  <a href="./about.html">About</a>
`;

document.querySelectorAll('#student-name').forEach(el => {
  el.innerHTML = `${config.student_name}`;
});