(function () {
  try {
    var theme = localStorage.getItem("blizzen-theme");
    if (theme === "light") document.documentElement.classList.add("light");
    var lang = localStorage.getItem("blizzen-lang");
    document.documentElement.lang = lang === "en" ? "en" : "de";
  } catch (e) {}
})();
