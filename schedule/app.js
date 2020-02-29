'use strict';

const User = require('./model/User');
const Event = require('./model/Event');
const Schedule = require('./model/Schedule');
const MESSAGE = require('./utils/messageMap');
const utils = require('./utils/utils');
const fs = require('fs');

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

function inputEventDateInfo() {
    return new Promise(resolve => {
        if (freeTime.length === 0) {
            console.log('Busy all the time');
            resolve();
        }
        let isValid = false;
        while (!isValid) {
            rl.setPrompt(MESSAGE.get('INPUT_EVENT_DATE'));
            rl.prompt();
            let date;
            rl.on('line', function (line) {
                date = new Date(line);
                if (!events.find(event => event.date === date)) {
                    rl.setPrompt(MESSAGE.get('NO_DATE'));
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
    return new Promise((resolve, reject) => {
        let isValid = false;
        while(!isValid) {
            rl.setPrompt(MESSAGE.get('INPUT_EVENT_START_END_TIME'));
            rl.prompt();
            rl.on('line', function(line) {
                let times = line.split(' ');
                let startEventInfo = freeTime.find(e => e.date === date && e.time === times[0]);
                if(!startEventInfo) {
                    isValid = false;
                } else {
                    //TODO
                }
            })
        }
    });
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

