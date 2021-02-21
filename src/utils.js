var dateFormat = require("dateformat");

export const formatMillisecs = (time) => {
    let minutes = Math.floor(time / (1000*60)),
        seconds = Math.floor((time / 1000) % 60),
        millisecs = parseInt((time % 1000));

    minutes = minutes < 10 ? "0"+minutes : minutes;
    seconds = seconds < 10 ? "0"+seconds : seconds;

    let numOfZeros = 0;
    millisecs < 100 && numOfZeros++;
    millisecs < 10 && numOfZeros++;
    while (numOfZeros > 0) {
        millisecs = "0"+millisecs;
        numOfZeros--;
    }
    
    return `${minutes}:${seconds}:${millisecs}`;
}

export const formatDate = (date) => {
    return dateFormat(date, "dd.mm.yyyy.");
}