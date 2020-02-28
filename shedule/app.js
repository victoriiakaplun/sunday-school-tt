'use strict';

const User = require('./model/User');
const Event = require('./model/Event');
const MESSAGE = require('./utils/messageMap');
const utils = require('./utils/utils');

const rl = readline.createInterface( {
    input: process.stdin,
    output: process.stdout
});


let freeTime = [];
let events =[];

function fillTime(startDate, endDate, startTime, endTime) {
    let currentDate = startDate, currentTime = startTime;
    while(currentDate <= endDate) {
        freeTime.push({date: currentDate, time: currentTime});
        if( currentTime !== endTime) {
            currentTime++;
        } else {
            currentTime = 8;
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() +1);
        }
    }
}

function askQuestion(question, rl) {
    return new Promise((resolve, reject) => {
        rl.question(question, (str) => {
            if(str === "") {
                reject();
            }
            resolve(str);
        });
    });
}

async function registerUser() {
    const name = await askQuestion(MESSAGE.get('INPUT_NAME'), rl);
    const email = await askQuestion(MESSAGE.get('INPUT_EMAIL'), rl);
    let user = new User(name, email);
    console.log(MESSAGE.get('USER_NAME'), `${name}`);
    console.log(MESSAGE.get('USER_EMAIL'), `${email}`);
    console.log(MESSAGE.get('USER_ID'), `${user.id}`);
    return user;
}

function generateEvents(eventsAmount) {
    for(let i = 0; i < eventsAmount; i++) {
        const title = `${utils.randomStr(4)} ${utils.randomStr(6)}`;
        const startDateFindIndex = utils.randomInt(0, freeTime.length);
        const startDate = freeTime[startDateFindIndex];
        const endDateFindIndex = utils.randomInt(startDateFindIndex, freeTime.length);
        const endDate = freeTime[endDateFindIndex];
        const deleteCount = (endDateFindIndex - startDateFindIndex) === 0
            ? 1
            : endDateFindIndex - startDateFindIndex;
        freeTime.splice(startDateFindIndex, deleteCount);
        events.push(new Event(title, startDate, endDate));
    }
}

//TODO: list of time for every day
function printTimeInfo(info) {
    info.forEach(info => {
        console.log(`${utils.dayOfWeekAsString(info.date.getDay())} ${info.date.getFullYear()}.${info.date.getMonth()}.${info.date.getDate()}
        TIME:${info.time}:00`);
    });
}

function inputEventDateAndTimeInfo() {
    return new Promise(((resolve, reject) => {
        rl.setPrompt(MESSAGE.get('INPUT_EVENT_DATE'));
        rl.prompt();
        let output = '';
        rl.on('line', function (line) {
            const date = new Date(line);
            let isValid = true;
            //TODO:
        });
        )
        })
    );
}
