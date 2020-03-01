'use strict';

const User = require('./model/User');
const Event = require('./model/Event');
const Schedule = require('./model/Schedule');
const MESSAGE = require('./utils/messageMap');
const utils = require('./utils/utils');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface( {
    input: process.stdin,
    output: process.stdout
});


let freeTime = [];
let events = new Map();
let startEventTime, endEventTime;
let startEventDate, endEventDate;

function fillTime() {
    let currentDate = startEventDate;
    while(currentDate <= endEventDate) {
        let times = [];
        for(let i = startEventTime; i < endEventTime; i++) {
            times.push(i);
        }
        freeTime.push({date: currentDate, startTimes: times});
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() +1);
    }
}

function askQuestion(question, rl) {
    return new Promise((resolve, reject) => {
        rl.question(question, (str) => {
            if(!str) {
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

//FIXME: check nested events
function generateEvents(eventsAmount) {
    for(let i = 0; i < eventsAmount; i++) {
        const randomDateInfoIndex = utils.randomInt(0, freeTime.length - 1);
        const randomDateInfo = freeTime[randomDateInfoIndex];
        const freeTimesAmount = randomDateInfo.startTimes.length;
        const randomStartTimeIndex = utils.randomInt(0, freeTimesAmount - 1);
        const randomStartTime = randomDateInfo.startTimes[randomStartTimeIndex];
        const randomEndTimeIndex = utils.randomInt(randomStartTimeIndex, freeTimesAmount - 1);
        const randomEndTime = randomDateInfo.startTimes[randomEndTimeIndex];
        const randomEventTitle = utils.randomStr(4) + ' ' + utils.randomStr(6);
        const randomEvent = new Event(randomEventTitle, randomDateInfo.date, randomStartTime, randomEndTime + 1);
        if(events.has(randomDateInfo.date)) {
            events.get(randomDateInfo.date).push(randomEvent);
        } else {
            events.set(randomDateInfo.date, [randomEvent]);
        }
        randomDateInfo.startTimes.splice(randomStartTimeIndex, randomEndTimeIndex - randomStartTimeIndex + 1);
        if(randomDateInfo.startTimes.length === 0) {
            freeTime.splice(randomDateInfoIndex, 1);
        }
    }
}

function printFreeTimeInfo() {
    freeTime.forEach(dayInfo => {
        console.log(`${utils.dayOfWeekAsString(dayInfo.date.getDay())} ${dayInfo.date.toLocaleString()}
        TIMES:
        ${dayInfo.startTimes}`);
    });
}

function printEvents(currentDate) {
    events.forEach((value, key, map) => {
        if(currentDate > key){
            console.log('The event already ended:');
        }
        console.log(`${utils.dayOfWeekAsString(key.getDay())} ${key.toLocaleString()}`);
        value.forEach(e => console.log(`${e.title} ${e.startTime} ${e.endTime}`));
    });
}

//TODO: check if date out of week
function inputEventDateInfo() {
    return new Promise(resolve => {
        let date;
        if (freeTime.length === 0) {
            console.log(MESSAGE.get('NO_DATE'));
            rl.close();
        }
        let isValid = false;
        while (!isValid) {
            rl.setPrompt(MESSAGE.get('INPUT_EVENT_DATE'));
            rl.prompt();
            rl.on('line', function (line) {
                date = new Date(line);
                if (!freeTime.find(dayObj => dayObj.date === date)) {
                    rl.setPrompt(MESSAGE.get('NO_TIME'));
                    rl.prompt(true);
                    isValid = false;
                } else {
                    isValid = true;
                    rl.close();
                }
            }).on('close', function () {
                resolve(date);
            });
        }
    });
}

function inputEventTimeInfo(date) {
    return new Promise(resolve => {
        let isValid = false;
        while(!isValid) {
            rl.setPrompt(MESSAGE.get('INPUT_EVENT_START_END_TIME'));
            rl.prompt();
            let times =[];
            rl.on('line', function(line) {
                times = line.split(' ');
                let dateStartTimes = freeTime.find(d=> d.date === date);
                if(!dateStartTimes.startTimes.find(times[0]) && !dateStartTimes.startTimes.find(times[1] - 1)) {
                    isValid = false;
                } else {
                    isValid = true;
                    rl.close();
                }
            }).on('close', function () {
                resolve(times);
            })
        }
    });
}

function createSchedule(user) {
    return new Schedule(user.id, Date.now(), events);
}
function printSchedule(schedule, path) {
    if(!fs.existsSync(path)) {
        fs.mkdir(path, {recursive: true}, (err) => {
            if(err) throw err;
        });
    }
    fs.writeFile(path + `schedule-${schedule.scheduleId}.txt`, JSON.stringify(schedule), function (error) {
        if(error) throw error;
    });
}

async function main() {
    let user = await registerUser();
    startEventTime = 8;
    endEventTime = 19;
    startEventDate = new Date(2020, 2, 2);
    endEventDate = new Date(2020, 2, 8);
    fillTime();
     printFreeTimeInfo();
    generateEvents(10);
    printEvents(Date.now());
    printFreeTimeInfo();
}

main();
