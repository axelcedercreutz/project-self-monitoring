const getFormattedDate = (date) => {
    if(date){
        return date.toISOString().substring(0,10);
    }
    const newDate = new Date();
    return newDate.toISOString().substring(0,10);
}

const getYesterdayFormattedDate = (date) => {
    if(date){
        date.setDate(date.getDate() - 1);
        return date.toISOString().substring(0,10);
    }
    const newDate = new Date();
    newDate.setDate(newDate.getDate() - 1);
    return newDate.toISOString().substring(0,10);
}

const getWeekAgoDateFormattedDate = (date) => {
    if(date){
    date.setDate(date.getDate() - 7);
    return date.toISOString().substring(0,10);
    }
    const newDate = new Date();
    newDate.setDate(newDate.getDate() - 7);
    return newDate.toISOString().substring(0,10);
}

const getDateOfWeek = (w, y) => {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
}

const getWeekNumber = (d) => {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getUTCFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
}

export { getFormattedDate, getYesterdayFormattedDate, getWeekAgoDateFormattedDate, getDateOfWeek, getWeekNumber };