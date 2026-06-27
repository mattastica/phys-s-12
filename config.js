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

document.title = `${config.student_name} | PHYS S-12 ${config.student_year_sem}`;

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

// Site root is the directory holding config.js, derived from this script's URL.
// Works at any page depth and on file:// or http(s)://.
const SITE_BASE = (() => {
  const src = document.currentScript && document.currentScript.src;
  return src ? src.substring(0, src.lastIndexOf('/') + 1) : './';
})();

document.querySelector("footer").innerHTML = `
  <img src="${SITE_BASE}placeholder_assets/harvard.png" alt="Harvard" class="footer-mark">
  <a href="${SITE_BASE}index.html#final-project">Work</a>
  <a href="${SITE_BASE}about.html">About</a>
`;

document.querySelectorAll('#student-name').forEach(el => {
  el.innerHTML = `${config.student_name}`;
});