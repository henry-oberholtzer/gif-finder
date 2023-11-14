import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import getGif from './js/gif-search';
export { printError, displayResults };

const offsetAmount = 16;
let offset = -offsetAmount;

function printError(apiResponse, search) {
    document.querySelector('#error').innerText = `We ran into problems searching for ${search}: ${apiResponse.status} ${apiResponse.msg}`;
}

function displayResults(apiResponse, search) {
    document.querySelector('#error').innerText = `We found these for ${search}.`;
    const resultPage = document.querySelector('#results');
    resultPage.innerHTML = "";
    if (Array.isArray(apiResponse.data)) {
        apiResponse.data.forEach((data, i) => {
            const div = document.createElement("div");
            const link = document.createElement("a");
            const img = document.createElement("img");
            img.setAttribute("src", data.images.fixed_height.url);
            link.setAttribute("href", data.url);
            div.setAttribute("class", "gif-image m-2");
            link.append(img);
            div.append(link);
            resultPage.append(div);
            if ((i + 1) % 4 === 0) {
                const linebreak = document.createElement("div");
                linebreak.setAttribute("class", "break");
                resultPage.append(linebreak);
            }
        });
    } else {
        const div = document.createElement("div");
        const link = document.createElement("a");
        const img = document.createElement("img");
        img.setAttribute("src", apiResponse.data.images.fixed_height.url);
        link.setAttribute("href", apiResponse.data.url);
        div.setAttribute("class", "gif-image m-2");
        link.append(img);
        div.append(link);
        resultPage.append(div);
    }
}

function handleFormSubmission(e) {
    e.preventDefault();
    offset += offsetAmount;
    const search = document.querySelector("#search-string").value;
    const weird = document.getElementsByName("weird")[0].checked;
    const evil = document.getElementsByName("evil")[0].checked;
    getGif(search, [weird, evil], offset);
}

document.querySelector("form").addEventListener("submit", handleFormSubmission);