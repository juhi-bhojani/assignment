const winston = require('winston'); 
const DailyRotateFile = require("winston-daily-rotate-file"); 
const { combine, timestamp, json } = winston.format; 

const transport = new DailyRotateFile({ 
    filename: "movie-%DATE%.log", // This filename can include the %DATE% placeholder which will include the formatted datePattern at that point in the filename. 
    datePattern: "YYYY-MM-DD", 
    dirname: "/home/juhi/Techs/assignment/question-5-6-7/logs", // directory where log files will be saved 
    maxSize: "20m", // rotates after this maxFile is observed 
    maxFiles: "14d" // Maximum number of old logs to keep 
}); 

const logger = winston.createLogger({ 
    level: 'info', 
    format: combine(timestamp({ 
        format: 'YYYY-MM-DD hh:mm:ss A' // 2022-01-25 03:23:10.350 PM 
    }), 
    json()), 
    transports: [ 
        transport, 
        new winston.transports.Console() 
    ] 
}); 

module.exports = logger;
