const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Store apiQuotes
let apiQuotes = [];

// ahow Loading Spinner
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading Spinner
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Get Random Quote
function newQuote() {
  //  Show Loader
  loading();
  // Pick a random quote form quote array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Author field is null and add "Unknown"
  if (!quote.author) {
    quoteAuthor.textContent = `- Unknown`;
  } else {
    quoteAuthor.textContent = `- ${quote.author}`;
  }
  // Check Quote length to determine styling
  if (quote.text.length > 100) {
    quoteText.classList.add("quote-text-long");
  } else {
    quoteText.classList.remove("quote-text-long");
  }
  // Set Quote and hide spinner
  quoteText.textContent = quote.text;
  complete();
}
// Fetch Quotes API
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const res = await fetch(apiUrl);
    apiQuotes = await res.json();
    newQuote();
  } catch (err) {
    console.log(err);
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
