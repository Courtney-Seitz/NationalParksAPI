'use strict';

const apiKey = 'rxVneIU21uinLUrDPvfBZfILM1MUjOhwzLlI1cCo'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function displayResults(responseJson, maxResults) {

    $('#results-list').empty();

for (let i = 0; i < responseJson.data.length; i++) {
    $('#results-list').append(`<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
    <p><strong>Description:</strong> ${responseJson.data[i].description}</p>
    <p><strong>States:</strong> ${responseJson.data[i].states}</p></li>`);
};

$('#results').removeClass('hidden');
};

function getParks(stateArr, maxResults = 10) {
    const params = {
        stateCode: stateArr,
        api_key: apiKey,
        limit: maxResults
    }

    const url = `${searchURL}?api_key=${apiKey}&stateCode=${stateArr}&limit=${maxResults}`;
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
$('#js-form').on('submit', function(event) {
    event.preventDefault();
    const stateArr = $('#js-search-term').val();
    console.log(stateArr);
    const maxResults = $('#js-max-results').val();
    getParks(stateArr, maxResults);
});
}

$(watchForm);