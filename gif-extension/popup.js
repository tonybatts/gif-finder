// automatically focus input when popup is opened
document.querySelector("input").focus();

// Initialize state
const limit = 50;
let userInput = "";
let total = 0;

const oopsGifs = [
  "canyounot.gif",
  "dancecat.gif",
  "doggo.gif",
  "nevergonna.gif",
  "superhot.gif",
  "thumbsup.gif",
  "typingcat.gif",
  "typingcat2.gif",
  "spongebob.gif"
];

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Use the current input to load more gifs
const loadGifs = async (total, limit) => {
  userInput = document.querySelector("input").value;

  // return if user cleared input and hit enter
  if (userInput.length === 0) {
    return;
  }

  try {
    // call the API to get gifs
    await getSearchResults(userInput, total, limit);
  } catch (error) {
    console.log(error.message);
  }
};

// Use the data from the API to generate the list of gifs and append to dom
const generateList = ({ data }) => {
  if (data.length === 0) {
    document.querySelector(".popup-container").textContent = "";

    const randomNum = getRandomNumber(0, oopsGifs.length - 1);
    const noResultWrapperEl = document.createElement("div");
    const noResultEl = document.createElement("h1");
    const imgEl = document.createElement("img");

    imgEl.classList.add("oops-gif");
    imgEl.src = `oops/${oopsGifs[randomNum]}`;
    noResultWrapperEl.classList.add("center-no-results");
    noResultEl.classList.add("no-results-small");
    noResultEl.textContent =
      "No results found. Here's a gif I picked just for you!";

    noResultWrapperEl.appendChild(noResultEl);
    noResultWrapperEl.appendChild(imgEl);
    document.querySelector(".popup-container").appendChild(noResultWrapperEl);

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
const getSearchResults = async (searchTerm, total, limit) => {
  const response = await fetch(
    `http://api.giphy.com/v1/gifs/search?api_key=H2vDwH21VkkjmAKNUMQUz0gB1omdiDCf&q=${searchTerm}&limit=${limit}&offset=${total}`
  );

  if (!response.ok) {
    throw new Error(`An error occured: ${response.status}`);
  }

  total = total + response.total;

  const parsedData = await response.json();

  generateList(parsedData);
};

// When user hits enter call start the data flow
document.querySelector("input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    document.querySelector(".popup-container").textContent = "";
    window.scrollTo(0, 0);
    getSearchResults(e.target.value, limit);
  }
});

// Infinite scroll
document.addEventListener(
  "scroll",
  () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (
      scrollTop + clientHeight >= scrollHeight - 350 &&
      !document.querySelector(".center-no-results")
    ) {
      loadGifs(total, limit);
    }
  },
  {
    passive: true
  }
);

// chrome.storage.sync.set({ hex2: true });
