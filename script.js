var link = document.querySelector(".link");
var btn = document.querySelector(".btnButton");
var objectElement = document.querySelector(".object");
// var paramElenment = objectElement.querySelector(".param");
// var embedElenment = objectElement.querySelector(".embed");
// var body = document.querySelector("body");

const ytVideo = (youtubeID) => {
  objectElement.innerHTML = `
    <param
      class="param"
      name="movie"
      value="https://www.youtube-nocookie.com/embed/${youtubeID}"
    />
    <embed
      class="embed"
      src="https://www.youtube-nocookie.com/embed/${youtubeID}"
      width="100%"
      height="90%"
    />`;
};

btn.addEventListener("click", () => {
  //   console.log(link.value);

  let result = link.value.replace("https://www.youtube.com/watch?v=", "");
  ytVideo(result);
  //   embedElenment.value = result;
  //   paramElenment.value = result;
});

// console.log(paramElenment.value);
