/**
 *   @author Meyerson, Gabe (gabemeyerson@gmail.com)
 *   @version 0.0.1
 *   @summary Movie Rating Booth || created: 10.26.2016
 *   @todo
 */

"use strict";
const PROMPT = require('readline-sync');

let movies = [];
let userActionChoice, movieChoice, averageMovieRating;

function main() {
    process.stdout.write('\x1Bc'); //Clears the screen
    let infinite = 0;
    while (infinite < 1) {
        if (movies.length > 0) {
            setUserActionChoice();
            if (userActionChoice === 0) {
                populateMovies();
            } else {
                chooseMovie();
                calculateAverageMovieRating();
                displayAverageMovieRating();
            }
        } else {
            populateMovies();
        }
    }
}

main();

function setUserActionChoice() {
    userActionChoice = -1;
    const RATE_MOVIE = 0, VIEW_MOVIE_RATING = 1;
    while (userActionChoice !== RATE_MOVIE && userActionChoice !== VIEW_MOVIE_RATING) {
        userActionChoice = Number(PROMPT.question(`\nWould you like to rate a movie [0] or view a movie rating [1]?`));
    }
}

function populateMovies() {
    const COLUMNS = 4, MOVIE_TITLE = 0, MOVIE_RATING = 1, TOTAL_MOVIE_RATING = 2, NUMBER_MOVIE_RATINGS = 3, MIN_STARS = 1, MAX_STARS = 5;
    let movieChoice, newTitle = 0;
    if (movies.length !== 0) {
        for (let i = 0; i < movies.length; i++) {
            console.log (`\n ${i} = ${movies[i][0]}`);
            newTitle++;
        }
        while (typeof movieChoice == `undefined` || isNaN(movieChoice) || movieChoice < MOVIE_TITLE || movieChoice > movies.length) {
            movieChoice = Number(PROMPT.question (`\nPlease enter number of movie or ${newTitle} to enter a new movie title:`))
        }
        if (movieChoice !== newTitle) {
            movies[movieChoice][MOVIE_RATING] = -1;
            while (isNaN(movies[movieChoice][MOVIE_RATING]) || movies[movieChoice][MOVIE_RATING] < 1 || movies[movieChoice][MOVIE_RATING] > 5) {
                movies[movieChoice][MOVIE_RATING] = Number(PROMPT.question(`\nPlease rate the movie on a scale of one to five [5 stars is the best]: `));
            }
            movies[movieChoice][TOTAL_MOVIE_RATING] = movies[movieChoice][TOTAL_MOVIE_RATING] + movies[movieChoice][MOVIE_RATING];
            movies[movieChoice][NUMBER_MOVIE_RATINGS] = movies[movieChoice][NUMBER_MOVIE_RATINGS] + 1;
        } else {
            movies[newTitle] = [];
            for (let i = 0; i < COLUMNS; i++) {
                if (i === MOVIE_TITLE) {
                    while (movies[newTitle][i] == null || !/[a-zA-Z0-9 -,']{1,40}/.test(movies[newTitle][i])) {
                        movies[newTitle][i] = PROMPT.question(`\nPlease enter a movie title: `);
                    }
                } else if (i === MOVIE_RATING) {
                    while (movies[newTitle][i] == null || isNaN(movies[newTitle][i]) || movies[newTitle][i] < MIN_STARS || movies[newTitle][i] > MAX_STARS) {
                        movies[newTitle][i] = Number(PROMPT.question(`\nPlease enter a rating [5 stars is the best]: `));
                    }
                } else if (i === TOTAL_MOVIE_RATING) {
                    movies[newTitle][i] = movies[newTitle][MOVIE_RATING];
                } else {
                    movies[newTitle][i] = 1;
                }
            }
        }
    } else {
        movies[0] = [];
        for (let i = 0; i < COLUMNS; i++) {
            if (i === MOVIE_TITLE) {
                while (movies[0][i] == null || !/[a-zA-Z0-9 -,']{1,40}/.test(movies[0][i])) {
                    movies[0][i] = PROMPT.question(`\nEnter a movie title:`);
                }
            } else if (i === MOVIE_RATING) {
                while (movies[0][i] == null || isNaN(movies[0][i]) || movies[0][i] < MIN_STARS || movies[0][i] > MAX_STARS) {
                    movies[0][i] = PROMPT.question(`\nRate ${movies[0][1]} on a scale 1 to 5 (5 being the best):`)
                }
            } else if (i === TOTAL_MOVIE_RATING) {
                movies[0][i] = movies[0][MOVIE_RATING];
            } else {
                movies[0][i] = 1;
            }
        }
    }
}

function chooseMovie() {
    for (let i = 0; i < movies.length; i++) {
        console.log(`\n ${i} = ${movies[i][0]}`);
    }
    movieChoice = Number(PROMPT.question('\n What is the number of the movie that you would like to view the rating of?:'));
}

function calculateAverageMovieRating() {
    averageMovieRating = Number(movies[movieChoice][2] / movies[movieChoice][3]);
}

function displayAverageMovieRating() {
    process.stdout.write('\x1Bc'); //Clears the screen
    console.log(`\nThe average movie rating for ${movies[movieChoice][0]} is: ${averageMovieRating} stars`)
}