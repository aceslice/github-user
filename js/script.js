const search = document.querySelector(".search");

search.addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelector(".container").style.display = "block";
  const input = document.getElementById("input").value;
  const URL = `https://api.github.com/users/${input}`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.querySelector(".details").style.display = "none"
      document.querySelector(".user").innerHTML = data.name;
      document.querySelector(".username").innerHTML = "@" + data.login;
      document.querySelector(".location").innerHTML =  data.location;
      document.querySelector(".image").setAttribute("src", data.avatar_url);
      document.querySelector(".joined").innerHTML = "Joined " + new Date(data.created_at);
      document.querySelector(".bio").innerHTML = data.bio || "Oops, this user does not have an about!!";
      document.getElementById("repo").innerHTML = data.public_repos;
      document.getElementById("followers").innerHTML = data.followers;
      document.getElementById("following").innerHTML = data.following;
      document.querySelector(".profile-link").setAttribute("href", data.html_url);
      document.querySelector(".twitter-link").setAttribute("href", `https://twitter.com/${data.twitter_username}`);
      if(data.twitter_username === null){
         document.querySelector(".twitter").style.display = "none";
      }else{
         document.querySelector(".twitter").style.display = "block";
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
});
