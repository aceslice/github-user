var search_terms = [
  "apple",
  "apple watch",
  "apple macbook",
  "apple macbook pro",
  "iphone",
  "iphone 12",
  "theappau",
  "mojombo",
  "aceslice",
  "facebook",
  "meta",
];
function autocompleteMatch(input) {
  if (input == "") {
    return [];
  }
  var reg = new RegExp(input);
  return search_terms.filter(function (term) {
    if (term.match(reg)) {
      return term;
    }
  });
}

function showResults(val) {
  res = document.getElementById("result");
  res.innerHTML = "";
  let list = "";
  let terms = autocompleteMatch(val);
  for (i = 0; i < terms.length; i++) {
    list += `<li class="app">${terms[i]}</li>`;
  }
  res.innerHTML = `<ul>${list}</ul>`;
}
fetchData = () => {
  document.querySelector(".container").style.display = "block";
  const input = document.getElementById("input").value;
  const URL = `https://api.github.com/users/${input}`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      const {
        name,
        login,
        location,
        avatar_url,
        created_at,
        bio,
        public_repos,
        followers,
        following,
        html_url,
        twitter_username,
      } = data;
      document.querySelector(".details").style.display = "none";
      document.querySelector(".user").innerHTML = name;
      document.querySelector(".username").innerHTML = ` ${login}`;
      document.querySelector(".location").innerHTML = location;
      document.querySelector(".image").setAttribute("src", avatar_url);
      document.querySelector(".joined").innerHTML = `Joined  ${new Date(
        created_at
      )};`;
      document.querySelector(".bio").innerHTML =
        bio || "Oops, this user does not have an about!!";
      document.getElementById("repo").innerHTML = public_repos;
      document.getElementById("followers").innerHTML = followers;
      document.getElementById("following").innerHTML = following;
      document.querySelector(".username").setAttribute("href", html_url);
      document.querySelector(".profile-link").setAttribute("href", html_url);
      document
        .querySelector(".twitter-link")
        .setAttribute("href", `https://twitter.com/${twitter_username}`);
      if (twitter_username === null) {
        document.querySelector(".twitter").style.display = "none";
      } else {
        document.querySelector(".twitter").style.display = "block";
      }
    })
    .catch((err) => {
      console.warn(err.message);
    });
};
search.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchData();
});
console.log(data);
