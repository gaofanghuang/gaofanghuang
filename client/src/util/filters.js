export const time2tips = timespan => {
    let dateTime = new Date(parseInt(timespan))
    let year = dateTime.getFullYear()
    let month = dateTime.getMonth() + 1
    let day = dateTime.getDate()
    let hour = dateTime.getHours()
    let minute = dateTime.getMinutes()
    let nowNew = new Date().getTime()
    let milliseconds = 0
    let timeSpanStr
    milliseconds = nowNew - timespan
    if (milliseconds <= 1000 * 60 * 1) {
        timeSpanStr = '刚刚'
    } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
        timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前'
    } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前'
    } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前'
    } else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year === new Date().getFullYear()) {
        if (month < 10) {
            month = '0' + month
        }
        if (day < 10) {
            day = '0' + day
        }
        if (hour < 10) {
            hour = '0' + hour
        }
        if (minute < 10) {
            minute = '0' + minute
        }
        timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute
    } else {
        if (month < 10) {
            month = '0' + month
        }
        if (day < 10) {
            day = '0' + day
        }
        if (hour < 10) {
            hour = '0' + hour
        }
        if (minute < 10) {
            minute = '0' + minute
        }
        timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    }
    return timeSpanStr
};