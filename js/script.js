const search = document.querySelector(".search");
fetchData = () => {
  document.querySelector(".container").style.display = "block";
  const input = document.getElementById("input").value;
  const URL = `https://api.github.com/users/${input}`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      const nFormatter = (num, digits) => {
        const lookup = [
          { value: 1, symbol: "" },
          { value: 1e3, symbol: "K" },
          { value: 1e6, symbol: "M" },
          { value: 1e9, symbol: "G" },
          { value: 1e12, symbol: "T" },
          { value: 1e15, symbol: "P" },
          { value: 1e18, symbol: "E" },
        ];

        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        const item = lookup
          .slice()
          .reverse()
          .find((item) => {
            return num >= item.value;
          });
        return item
          ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
          : "0";
      };

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
      document.querySelector(".username").innerHTML = `@${login}`;
      document.querySelector(".location").innerHTML = location;
      document.querySelector(".image").setAttribute("src", avatar_url);
      document.querySelector(".joined").innerHTML = `Joined  ${new Date(
        created_at
      )};`;
      document.querySelector(".bio").innerHTML =
        bio || "Oops, this user does not have an about!!";
      document.getElementById("repo").innerHTML = nFormatter(public_repos);
      document.getElementById("followers").innerHTML = nFormatter(followers);
      document.getElementById("following").innerHTML = nFormatter(following);
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
