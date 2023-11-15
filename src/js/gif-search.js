import { displayResults, printError } from "..";

export default function getGif(search, options, offset) {
    let request = new XMLHttpRequest();
    const limit = 16;
    // let offset = 0;
    const rating = "r";
    const lang = "en";
    const searchString = (search, options) => {
        if (options[1] === true) {
            return search + " EVIL";
        } else {
            return search;
        }
    };
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${searchString(search, options)}&limit=${limit}&offset=${offset}&rating=${rating}&lang=${lang}&bundle=messaging_non_clips`;
    const weirdUrl = `https://api.giphy.com/v1/gifs/translate?api_key=${process.env.API_KEY}&s=${searchString(search, options)}&weirdness=8`;
    request.addEventListener("loadend", function () {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
            displayResults(response, searchString(search, options));
        } else {
            printError(this, response, searchString(search, options));
        }
    });

    if (options[0] === true) {
        request.open("GET", weirdUrl, true);
    }   else {
        request.open("GET", url, true);
    }
    request.send();
}