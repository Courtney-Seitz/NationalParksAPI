'use strict';

// put your own value below!
const apiKey = 'rxVneIU21uinLUrDPvfBZfILM1MUjOhwzLlI1cCo'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
return queryItems.join('&');
}

function displayResults(responseJson, maxResults) {
  // if there are previous results, remove them
console.log(responseJson);
$('#results-list').empty();
  // iterate through the items array
for (let i = 0; i < responseJson.data.length & i < maxResults; i++) {
    $('#results-list').append(`<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
    <p>${responseJson.data[i].description}</p>
    </li>`);
};
  //display the results section  
$('#results').removeClass('hidden');
};

function getParks(searchURL, stateArr, maxResults, apiKey) {

    const params = {
        stateCode: stateArr,
        limit: maxResults
    }

    // const queryString = formatQueryParams(params);
    const url = searchURL + '?' + formatQueryParams(params) + '&api_key=' + apiKey;
    console.log(url);

fetch(url)
    .then(response => {
    if (response.ok) {
        return response.json();
    }
    throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(error => {
    $('#js-error-message').text(`Something went wrong: ${error.message}`);
    });
}

function watchForm() {
$('#js-form').submit(event => {
    event.preventDefault();
    // const searchURL = 'https://developer.nps.gov/api/v1/parks';
    const stateArr = $('#js-search-term').val().split(",");
    const maxResults = $('#js-max-results').val();
    getParks(searchURL, stateArr, maxResults, apiKey);

});
}

$(watchForm);