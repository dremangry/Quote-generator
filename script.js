
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

let apiQuotes = [];//empty array


// show loading animation
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading animation
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// this function show the new quote
function newQuote() {
    loading()// loading function

 // this pick a random quote from apiQuotes array
 const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

 // check if author field is blanc with an if/else statement
 if (!quote.author) {
    authorText.textContent = 'Unknown'
 } else {
    authorText.textContent = quote.author;//select the author part of the array
 }

 // check quote length to determine styling
 if (quote.text.length > 120) {
    quoteText.classList.add('long-quote')
 } else {
    quoteText.classList.remove('long-quote')
 }
 // set quote 
 quoteText.textContent = quote.text;//select the text part of the array
 //  hide loader
 complete()// complete function 
 //console.log(quote);
}
/////////////////////////////////////////////////////////////////////




// get quote from API (Application Program Interface)
// we will use an asynchronous function that can run at any time independently and it won't stop the browser from completing the loading of the page
async function getQuote() {
    loading()// loading function

    // this variable is the API url of the page
    const apiURL = 'https://type.fit/api/quotes';

    // try/catch allow us to attempt to complete a fetch request if it doesn't work we can catch the error information and do something with it
    try {
        // this is the fetch request
        const response = await fetch(apiURL);

        // this turn the response (apiURL) into a JSON object and then we pass it in apiQuote (empty array)
        apiQuotes = await response.json();
        newQuote()// call the function 
        //console.log(apiQuotes[12]);
    } catch (error) {
        // cath error here ex alert('error')
    }
}
getQuote();
/////////////////////////////////////////////////////////////////////////

// tweet quote function
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}
// event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
