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

export { getFormattedDate, getYesterdayFormattedDate };