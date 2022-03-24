// Automatically focus input when popup is opened
document.querySelector("input").focus();

// Initialize state
const limit = 50;
let userInput = "";
let total = 0;
let offSet = 0;
let userIsOnTrending = false;
let currentSearchTerm = "";

// Copy to clipboard
const copyToClipboard = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

// Display error message
const displayError = (errorMessage) => {
  const errorMessageWrapperEl = document.createElement("div");
  const errorMessageEl = document.createElement("h1");

  errorMessageWrapperEl.classList.add("center-no-results");
  errorMessageWrapperEl.style.height = "150px";
  errorMessageEl.classList.add("no-results-small");
  errorMessageEl.textContent = errorMessage;

  errorMessageWrapperEl.appendChild(errorMessageEl);
  document.querySelector(".popup-container").appendChild(errorMessageWrapperEl);
};

// Use the current input to load more gifs
const loadGifs = async () => {
  userInput = document.querySelector("input").value;

  // Return if user cleared input and hit enter
  if (userInput.length === 0 && !userIsOnTrending) {
    return;
  }

  // Get trending gifs
  if (userIsOnTrending) {
    await getTrendingResults();
    return;
  }

  // Get search term gifs
  await getSearchResults(userInput);
};

// Handle when there are no results for search term
const noResults = async (
  string = "No gifs found. Try searching for something else."
) => {
  const sad = await getRandomGif("oops");
  document.querySelector(".popup-container").textContent = "";

  const errorMessageWrapperEl = document.createElement("div");
  const errorMessageEl = document.createElement("h1");
  const figureEl = document.createElement("figure");
  const figcapEl = document.createElement("figcaption");
  const imgEl = document.createElement("img");

  imgEl.classList.add("oops-gif");
  imgEl.src = sad;
  figcapEl.textContent = 'Randomly generated "oops" gif';
  figcapEl.classList.add("figcaption");
  errorMessageWrapperEl.classList.add("center-no-results");
  errorMessageEl.classList.add("no-results-small");
  errorMessageEl.textContent = string;

  figureEl.appendChild(imgEl);
  figureEl.appendChild(figcapEl);
  errorMessageWrapperEl.appendChild(errorMessageEl);
  errorMessageWrapperEl.appendChild(figureEl);
  document.querySelector(".popup-container").appendChild(errorMessageWrapperEl);
};

// Display message when there are no more gifs to load for the current search term
const endOfList = () => {
  const noResultsEl = document.querySelector(".center-no-results");
  const inputEl = document.querySelector("input");
  if (noResultsEl) {
    noResultsEl.remove();
  }

  const errorMessageWrapperEl = document.createElement("div");
  const errorMessageEl = document.createElement("h1");

  errorMessageWrapperEl.classList.add("center-no-results");
  errorMessageWrapperEl.style.height = "150px";
  errorMessageEl.classList.add("no-results-small");

  errorMessageEl.textContent =
    userIsOnTrending === true
      ? "Reached end of trending"
      : `No more results for "${inputEl.value}"`;

  errorMessageWrapperEl.appendChild(errorMessageEl);
  document.querySelector(".popup-container").appendChild(errorMessageWrapperEl);
};

// Generate the list of gifs and append to dom
const generateList = (data) => {
  total += data.results.length;
  offSet = data.next;

  // Return if user reaches end of list and there are no more results to load
  if (total > 0 && data.results.length === 0) {
    endOfList();
    return;
  }

  // Handle when there are no results for search term
  if (data.results.length === 0) {
    noResults();
    return;
  }

  data.results.forEach((resultsObj) => {
    const wrapperEl = document.createElement("div");
    const iconWrapperEl = document.createElement("div");
    const toolTipWrapper = document.createElement("div");
    const toolTipText = document.createElement("p");
    const iconBackground = document.createElement("div");
    const icon = document.createElement("img");
    const imgEl = document.createElement("img");

    wrapperEl.classList.add("gif-container");
    iconWrapperEl.classList.add("icon-wrapper");
    iconBackground.classList.add("icon-background");
    icon.setAttribute("data-src", resultsObj.url);
    toolTipWrapper.classList.add("tool-tip");
    toolTipText.classList.add("tool-tip-text");

    icon.classList.add("share-icon");
    icon.src = "icons/link.svg";
    imgEl.classList.add("gif-styles");
    imgEl.src = resultsObj.media[0].gif.url;
    imgEl.setAttribute("loading", "lazy");
    toolTipText.textContent = "Copy link to clipboard.";

    iconWrapperEl.appendChild(iconBackground);
    iconWrapperEl.appendChild(toolTipWrapper);
    iconBackground.appendChild(icon);
    toolTipWrapper.appendChild(toolTipText);

    // Copy gif url to clipboard when clicking icon
    iconBackground.addEventListener("click", (e) => {
      copyToClipboard(e.target.dataset.src);
      toolTipText.textContent = "Copied to clipboard!";
      // toolTipWrapper.classList.add("success");
      setTimeout(function () {
        // toolTipWrapper.classList.remove("success");
        toolTipText.textContent = "Copy link to clipboard.";
      }, 1500);
    });

    wrapperEl.appendChild(imgEl);
    wrapperEl.appendChild(iconWrapperEl);
    document.querySelector(".popup-container").appendChild(wrapperEl);
  });
};

// Get search results
const getSearchResults = async (searchTerm) => {
  if (searchTerm.length === 0 && userIsOnTrending === false) {
    noResults("Don't forget to enter a search term");
    return;
  }

  try {
    const response = await fetch(
      `https://g.tenor.com/v1/search?q=${searchTerm}&key=2JGQI46NCEOI&limit=${limit}&pos=${offSet}&media_filter=minimal`
    );

    if (!response.ok) {
      throw new Error(`status ${response.status}`);
    }

    const parsedData = await response.json();

    generateList(parsedData);
  } catch (error) {
    displayError(error);
  }
};

// Get trending gifs
const getTrendingResults = async () => {
  document.querySelector("input").value = "";
  const apiUrl =
    offSet === 0
      ? `https://g.tenor.com/v1/trending?key=2JGQI46NCEOI&limit=${limit}`
      : `https://g.tenor.com/v1/trending?key=2JGQI46NCEOI&limit=${limit}&pos=${offSet}`;
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`An error occured: ${response.status}`);
    }

    const parsedData = await response.json();

    generateList(parsedData);
  } catch (error) {
    displayError(error);
  }
};

// Get random gif
const getRandomGif = async (keyWord) => {
  try {
    const response = await fetch(
      `https://g.tenor.com/v1/random?key=2JGQI46NCEOI&q=${keyWord}&contentfilter=high&media_filter=minimal&limit=1`
    );

    if (!response.ok) {
      throw new Error(`An error occured: ${response.status}`);
    }

    const parsedData = await response.json();

    return parsedData.results[0].media[0].gif.url;
  } catch (error) {
    console.log(error);
    // Return a fallback gif when there is a problem with the API request
    return "https://media4.giphy.com/media/a5viI92PAF89q/giphy.gif?cid=182a43489cmtjmbk2e5sopnxihvjas1v5qb92tauc8m9sjka&rid=giphy.gif&ct=g";
  }
};

// When user hits enter call start the data flow
document.querySelector("input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.target.value = e.target.value.trim();
    userIsOnTrending = false;
    total = 0;
    offSet = 0;
    document.querySelector(".popup-container").textContent = "";
    window.scrollTo(0, 0);
    getSearchResults(e.target.value);
  }
});

// When user clicks search icon start data flow
document.querySelector(".search-icon").addEventListener("click", (e) => {
  const searchInput = document.querySelector("input");
  searchInput.value = searchInput.value.trim();
  searchInput.focus();
  userIsOnTrending = false;
  total = 0;
  offSet = 0;
  document.querySelector(".popup-container").textContent = "";
  window.scrollTo(0, 0);
  getSearchResults(searchInput.value);
});

// When user clicks trending icon start data flow
document.querySelector(".trending-hover").addEventListener("click", (e) => {
  document.querySelector("input").focus();
  total = 0;
  offSet = 0;
  userIsOnTrending = true;
  document.querySelector(".popup-container").textContent = "";
  window.scrollTo(0, 0);
  getTrendingResults();
});

// Infinite scroll
document.addEventListener(
  "scroll",
  () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (
      scrollTop + clientHeight >= scrollHeight - 0 &&
      !document.querySelector(".center-no-results") &&
      offSet !== ""
    ) {
      loadGifs();
    }
  },
  {
    passive: true
  }
);
