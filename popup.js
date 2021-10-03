// automatically focus input when popup is opened
document.querySelector("input").focus();

// Initialize state
const limit = 50;
let userInput = "";
let total = 0;

// Gifs used when there are no results
const oopsGifs = [
  "https://media0.giphy.com/media/AAsj7jdrHjtp6/giphy.gif?cid=182a4348jfwti0jl6ak7m0krwue26dzfvh11qopb270bguug&rid=giphy.gif&ct=g",
  "https://media3.giphy.com/media/jpbnoe3UIa8TU8LM13/giphy.gif?cid=182a4348o24dqxbn5fm7f9568ctlson1a9fs2ex8ycyk4651&rid=giphy.gif&ct=g",
  "https://media1.giphy.com/media/54Vj1kxvgyF4k/giphy.gif?cid=182a4348gbltento7lxsg2j5yg3eokhy3smbb6jfne7wtyei&rid=giphy.gif&ct=g",
  "https://media2.giphy.com/media/olAik8MhYOB9K/giphy.gif?cid=182a4348jfwti0jl6ak7m0krwue26dzfvh11qopb270bguug&rid=giphy.gif&ct=g",
  "https://media1.giphy.com/media/cF7QqO5DYdft6/giphy.gif?cid=182a4348jfwti0jl6ak7m0krwue26dzfvh11qopb270bguug&rid=giphy.gif&ct=g",
  "https://media2.giphy.com/media/111ebonMs90YLu/giphy.gif?cid=182a4348jfwti0jl6ak7m0krwue26dzfvh11qopb270bguug&rid=giphy.gif&ct=g",
  "https://media0.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif?cid=182a4348v2md4cbo7vffdpjfzpvzw7w95kdhgew6gufsoz2z&rid=giphy.gif&ct=g",
  "https://media4.giphy.com/media/o0vwzuFwCGAFO/giphy.gif?cid=182a4348jfwti0jl6ak7m0krwue26dzfvh11qopb270bguug&rid=giphy.gif&ct=gcat2.gif",
  "https://media0.giphy.com/media/tvU9iTev6uBIQ/giphy.gif?cid=182a43483wo1z7u13dql1ftfljnn03vb7fnqyw6eiq6dthud&rid=giphy.gif&ct=g",
  "https://media1.giphy.com/media/v0eHX3n28wvoQ/giphy.gif?cid=182a4348jyh6an2korkw8m2wlbnep3u42m80upvzsbrsfgoo&rid=giphy.gif&ct=g",
  "https://media0.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif?cid=182a4348v2md4cbo7vffdpjfzpvzw7w95kdhgew6gufsoz2z&rid=giphy.gif&ct=g",
  "https://media2.giphy.com/media/l0IylOPCNkiqOgMyA/giphy.gif?cid=182a4348plfr05yv1wv0t320srz1eas5ijhll5jzfv16x1yp&rid=giphy.gif&ct=g",
  "https://media3.giphy.com/media/W0QduXZQEcNEa8r0oY/giphy.gif?cid=182a43487i0wek45juxhkgrw9pdyixjn5ns0ycbbbitcjizz&rid=giphy.gif&ct=g",
  "https://media1.giphy.com/media/20k1punZ5bpmM/giphy.gif?cid=182a4348sx75np3xn0f5u3qa74o0bbyvy1cr1roqmmyy3wfo&rid=giphy.gif&ct=g",
  "https://media4.giphy.com/media/xUPGcvrXl7RBEp3zC8/giphy.gif?cid=182a434869cz5xp8h6v76ff4vvl538gpqt8htc97xf5f2qsu&rid=giphy.gif&ct=g",
  "https://media2.giphy.com/media/B37cYPCruqwwg/giphy.gif?cid=182a4348f1rym9ed8nsla9rfb28v5qn0titsqlevihzrdtn0&rid=giphy.gif&ct=g",
  "https://media0.giphy.com/media/LSmULmByAQHQs/giphy.gif?cid=182a43485b646qzlg2nuiig5p2oo0ib7aolr3gdelgnrwtjg&rid=giphy.gif&ct=g",
  "https://media0.giphy.com/media/3ornk6UHtk276vLtkY/giphy.gif?cid=182a43485b646qzlg2nuiig5p2oo0ib7aolr3gdelgnrwtjg&rid=giphy.gif&ct=g",
  "https://media4.giphy.com/media/Jn9Td3EAh6cJfiyg60/giphy.gif?cid=182a43483udg5pfkwcx9bsjxhenbn890848kmt5q8tbpj75s&rid=giphy.gif&ct=g",
  "https://media1.giphy.com/media/a93jwI0wkWTQs/giphy.gif?cid=182a4348kxk8fzhrnhtdg5a00js4ssss7owwt3n8dsmwfm05&rid=giphy.gif&ct=g",
  "https://media4.giphy.com/media/baPIkfAo0Iv5K/giphy.gif?cid=182a4348kfkn1zs3fuioos7napeou6cqzrc1itt07papqcwt&rid=giphy.gif&ct=g",
  "https://media1.giphy.com/media/SUzPI5wAkp6UXMEkok/giphy.gif?cid=182a4348kfkn1zs3fuioos7napeou6cqzrc1itt07papqcwt&rid=giphy.gif&ct=g",
  "https://media1.giphy.com/media/gfO3FcnL8ZK9wVgr6t/giphy.gif?cid=182a4348vpa2h9ufibofbh7gvh2rw0y1ekmxzn7dyr23w6l4&rid=giphy.gif&ct=g",
  "https://media2.giphy.com/media/dwRwAXIe0tkz0EWFTr/giphy.gif?cid=182a4348vpa2h9ufibofbh7gvh2rw0y1ekmxzn7dyr23w6l4&rid=giphy.gif&ct=g",
  "https://media3.giphy.com/media/26hkhPJ5hmdD87HYA/giphy.gif?cid=182a4348za7a4spgeh71y38r1xl505n6z4am023zki2enke9&rid=giphy.gif&ct=g",
  "https://media1.giphy.com/media/OSuaE6AknuRc7syZXp/giphy.gif?cid=182a4348za7a4spgeh71y38r1xl505n6z4am023zki2enke9&rid=giphy.gif&ct=g",
  "https://media3.giphy.com/media/Az1CJ2MEjmsp2/giphy.gif?cid=182a4348za7a4spgeh71y38r1xl505n6z4am023zki2enke9&rid=giphy.gif&ct=g",
  "https://media1.giphy.com/media/giXLnhxp60zEEIkq8K/giphy.gif?cid=182a4348za7a4spgeh71y38r1xl505n6z4am023zki2enke9&rid=giphy.gif&ct=g",
  "https://media3.giphy.com/media/3o7bu7Xzqkq8K3MsUg/giphy.gif?cid=182a4348vvhd4n24dw6o2c5m0vqrbxsrwtaaer7f8r4gykii&rid=giphy.gif&ct=g",
  "https://media1.giphy.com/media/3orieMhcr3rkME9hkI/giphy.gif?cid=182a4348vvhd4n24dw6o2c5m0vqrbxsrwtaaer7f8r4gykii&rid=giphy.gif&ct=g"
];

// used to pick random gif for no results view
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Use the current input to load more gifs
const loadGifs = async () => {
  userInput = document.querySelector("input").value;

  if (userInput.length === 0) {
    // return if user cleared input and hit enter
    return;
  }

  try {
    // call the API to get gifs
    await getSearchResults(userInput);
  } catch (error) {
    console.log(error.message);
  }
};

const noResults = () => {
  document.querySelector(".popup-container").textContent = "";

  const randomNum = getRandomNumber(0, oopsGifs.length - 1);
  const noResultWrapperEl = document.createElement("div");
  const noResultEl = document.createElement("h1");
  const imgEl = document.createElement("img");

  imgEl.classList.add("oops-gif");
  imgEl.src = oopsGifs[randomNum];
  noResultWrapperEl.classList.add("center-no-results");
  noResultEl.classList.add("no-results-small");
  noResultEl.textContent = "No results found :( Try another search term";

  noResultWrapperEl.appendChild(noResultEl);
  noResultWrapperEl.appendChild(imgEl);
  document.querySelector(".popup-container").appendChild(noResultWrapperEl);
};

const endOfList = () => {
  const noResultsEl = document.querySelector(".center-no-results");
  if (noResultsEl) {
    noResultsEl.remove();
  }

  const noResultWrapperEl = document.createElement("div");
  const noResultEl = document.createElement("h1");

  noResultWrapperEl.classList.add("center-no-results");
  noResultWrapperEl.style.height = "150px";
  noResultEl.classList.add("no-results-small");
  noResultEl.textContent = "No more results for this search term";

  noResultWrapperEl.appendChild(noResultEl);
  document.querySelector(".popup-container").appendChild(noResultWrapperEl);
};

// Use the data from the API to generate the list of gifs and append to dom
const generateList = ({ data }) => {
  total = total + data.length;

  // return if user reaches end of list and there are no more results to load
  if (total > 0 && data.length === 0) {
    console.log("end of list");
    endOfList();
    return;
  }

  // handle no results
  if (data.length === 0) {
    noResults();
    return;
  }

  data.forEach((image) => {
    const wrapperEl = document.createElement("div");
    const imgEl = document.createElement("img");

    wrapperEl.classList.add("gif-container");
    imgEl.classList.add("gif-styles");
    imgEl.src = image.images.original.url;

    wrapperEl.appendChild(imgEl);
    document.querySelector(".popup-container").appendChild(wrapperEl);
  });
};

// make API request for gif data
const getSearchResults = async (searchTerm) => {
  if (searchTerm.length === 0) {
    noResults();
    return;
  }

  const response = await fetch(
    `http://api.giphy.com/v1/gifs/search?api_key=YOUR_API_KEY&q=${searchTerm}&limit=${limit}&offset=${total}`
  );

  console.log("fetched");

  if (!response.ok) {
    throw new Error(`An error occured: ${response.status}`);
  }

  const parsedData = await response.json();

  generateList(parsedData);
};

// When user hits enter call start the data flow
document.querySelector("input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    total = 0;
    document.querySelector(".popup-container").textContent = "";
    window.scrollTo(0, 0);
    getSearchResults(e.target.value);
  }
});

// Infinite scroll
document.addEventListener(
  "scroll",
  () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (
      scrollTop + clientHeight >= scrollHeight - 5 &&
      !document.querySelector(".center-no-results") &&
      total !== 0
    ) {
      console.log("bottom of page, loading more gifs");
      loadGifs();
    }
  },
  {
    passive: true
  }
);

// chrome.storage.sync.set({ hex2: true });
