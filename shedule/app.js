'use strict';

const User = require('./model/User');
const MESSAGE = require('./utils/messageMap');
const utils = require('../utils/utils');

const rl = readline.createInterface( {
    input: process.stdin,
    output: process.stdout
});


let freeTime = [];

function fillTime(startDate, endDate, startTime, endTime) {
    let currentDate = startDate, currentTime = startTime;
    console.log(startDate);
    console.log(endDate);
    while(currentDate <= endDate) {
        freeTime.push({date: currentDate, time: currentTime});
        if( currentTime !== endTime) {
            currentTime++;
        } else {
            currentTime = 8;
            //TODO: if next day is a new month or year
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
    let events = [];
    for(let i = 0; i < eventsAmount; i++) {
        const title = random.randomStr(4) + " " + random.randomStr(6);
        const startDateFindIndex = random.randomInt(0, freeTime.length);
        const startDate = freeTime[startDateFindIndex];
        const endDateFindIndex = random.randomInt(startDate, freeTime.length);
        const endDate = freeTime[endDateFindIndex];
        freeTime.splice(startDateFindIndex, endDateFindIndex - startDateFindIndex);
        events.push(new Event(title, startDate, endDate));
    }
    return events;
}

//TODO: list of time for every day
function printFreeTime() {
    freeTime.forEach(time => {
        console.log(`${utils.dayOfWeekAsString(time.date.getDay())} ${time.date.getFullYear()}.${time.date.getMonth()}.${time.date.getDate()}
        TIME:${time.time}:00`);
    });
}

