const birthYear = 2004,
    experienceStart = {
      expPython: 2018,
      expJavascript: 2018,
      expLua: 2019,
      expWeb: 2019,
      expWebd: 2019
    };
function fillExperience() {
  let currentDate = new Date();
  Object.keys(experienceStart).forEach((item, i) => {
    document.querySelector(`.${item}`).innerText = `+${currentDate.getFullYear() - experienceStart[item]} years`;
  });
}
function fillAge() {
  let currentDate = new Date();
  document.querySelector('.age').innerText = currentDate.getFullYear() - birthYear;
}
function loadData() {
  fillExperience();
  fillAge();
}
loadData();
// Toggle light mode
function toggleMode() {
  if(!document.documentElement.getAttribute('data-theme')) document.documentElement.setAttribute('data-theme', 'dark');
  if(document.documentElement.getAttribute('data-theme') == 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
    document.querySelector('.toggle-mode > i').className = 'far fa-moon fa-3x';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.querySelector('.toggle-mode > i').className = 'fas fa-moon fa-3x';
  }
}
