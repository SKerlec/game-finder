'use strict';

const apiKey = 'c0f902f189bb199e2870a94be21f734d1ce1663b';
const baseUrl = 'https://cors-anywhere.herokuapp.com/https://www.giantbomb.com/api/search';

function displayResults(responseJson) {
    $('.img-box').empty();
    $('.game-title').empty();
    $('.info-box').empty();
    $('.error').empty();
    $('.img-box').append(`<img class="results-img" src="${responseJson.results[0].image.medium_url}">`);
    $('.game-title').append(`${responseJson.results[0].name}`)
    $('.info-box').append(`${responseJson.results[0].description}`);
    $('.results-box').removeClass('hide-me');
}

function getGame(apiKey, baseUrl) {
    const url = baseUrl + '?' + 'api_key=' + apiKey + '&format=json' + '&query=' + $('.search-text').val();
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
        $('.error-box').text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    $('.game-search').on('submit', function() {
        event.preventDefault();
        getGame(apiKey, baseUrl);
    });
}

$(watchForm);