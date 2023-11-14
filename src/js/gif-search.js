import { displayResults, printError } from "..";

export default function getGif(search, weird) {
    let request = new XMLHttpRequest();
    const limit = 9;
    const offset = 0;
    const rating = "g";
    const lang = "en";
    const searchString = search;
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${searchString}&limit=${limit}&offset=${offset}&rating=${rating}&lang=${lang}&bundle=messaging_non_clips`;
    const weirdUrl = `https://api.giphy.com/v1/gifs/translate?api_key=${process.env.API_KEY}&s=${searchString}&weirdness=10`;
    request.addEventListener("loadend", function () {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
            displayResults(response, search);
        } else {
            printError(this, response, search);
        }
    });

    if (weird === true) {
        request.open("GET", weirdUrl, true);
    }   else {
        request.open("GET", url, true);
    }
    request.send();
}