
const birthYear = 2004,
    experienceStart = {
      expPython: 2018,
      expJavascript: 2018,
      expLua: 2019,
      expWeb: 2019,
      expWebd: 2019
    },
    githubUsername = 'Mahdios';

async function langToColor (language) {
    let langColors = await axios.get('https://raw.githubusercontent.com/ozh/github-colors/master/colors.json');
    return langColors.data[language] ? langColors.data[language].color : 'white';
}
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
function fillProjects() {
  axios.get(`https://api.github.com/users/${githubUsername}/repos`)
    .then(result => {
      let cleanData = result.data.map(async repo => {
        let repoColor = await langToColor(repo.language);
        let starCount = await axios.get(repo.stargazers_url);
        return {
          name: repo.name,
          desc: repo.description,
          url: repo.homepage ? repo.homepage : repo.html_url,
          language: repo.language,
          colorCode: repoColor,
          license: repo.license.spdx_id,
          forks: repo.forks,
          stars: starCount.data.length
        }
      });
      cleanData.forEach(async (repo, i) => {
        repo = await repo;
        document.querySelector('#projects').innerHTML += `
          <a href=${repo.url}>
            <div id=${repo.name} style="border: 2px solid ${repo.colorCode}">
              <p style="text-align: left; margin-top: 0;">${repo.language}</p>
              <h2>${repo.name}</h2>
              <p>${repo.desc}</p>
              <p>${repo.stars} <i class="fas fa-star"></i>   ${repo.forks} <i class="fas fa-code-branch"></i>   ${repo.license} <i class="fas fa-id-badge"></i></p>
              <div>
          </a>
        `;
      });
    }).catch(console.error)
}
function loadData() {
  fillExperience();
  fillAge();
  fillProjects();
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
