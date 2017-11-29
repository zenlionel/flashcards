var inquirer = require('inquirer');
var basicard = require('./basicard.js');
var clozecard = require('./clozecard.js');
var questions = require('./trivia.js');


var clozeTrivia = [];

function newq() {
    for (var i = 0; i < questions.length; i++) {
        var q = new clozecard(questions[i].full, questions[i].cloze);
        clozeTrivia.push(q);
    }
}
newq();
var count = 0;

function start() {
    inquirer.prompt([{
            type: 'list',
            message: 'Choose your Destiny',
            choices: ['Make card', 'Ask me again', 'End'],
            name: 'choice'

        }])
        .then(function (answer) {
            if (answer.choice === 'Make card') {
                makeCard()
            } else if (answer.choice === 'Ask me again') {
                askQuestion();
            } else if (answer.choice === 'End') {
                console.log('Fatality');
                console.log('\n------------\n')
                end()
            }
        })
}

function makeCard() {
    inquirer.prompt([{
                type: 'input',
                message: 'What should the piece of trivia be?',
                name: 'text'
            },
            {
                type: 'input',
                message: 'What should be the word or text you wish to cloze?',
                name: 'cloze'
            }
        ])
        .then(function (answer) {
            var newQ = new clozecard(answer.text, answer.cloze);
            clozeTrivia.push(newQ);
            start();
        });
}

function askQuestion() {
    inquirer.prompt([{
        type: 'input',
        message: clozeTrivia[count].partial + '\nAnswer: ',
        name: 'userGuess'
    }]).then(function (answers) {
        console.log('\n');

        if (answers.userGuess.toLowerCase() === clozeTrivia[count].cloze.toLowerCase()) {
            console.log('Correct!');
        } else {
            console.log('Incorrect!');
        }
        console.log(clozeTrivia[count].full);
        console.log('-------------------------------------\n');
        if (count < clozeTrivia.length - 1) {
            count++;
            askQuestion();
        } else {
            end();
           
        }
    })
}

function end() {
    inquirer.prompt([{
            type: 'confirm',
            message: 'Would you like start over? "(please say no)"',
            name: 'playAgain'
        }]).then(function (answers) {
            if (answers.playAgain) {
                count = 0;
                start();
            } else {
                console.log('Get out');
            }
        })
}

start();