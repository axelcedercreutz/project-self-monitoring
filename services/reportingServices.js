import { executeQuery } from "../database/database.js";

const getReportBasedOnDate = async (date, userId) => {
    const res = await executeQuery("SELECT * FROM reports WHERE date = $1 AND user_id = $2", date, userId);
    if(res && res.rowCount > 0) {
        return res.rowsOfObjects()[0];
    }
    return;
}

const deleteReportBasedOnDate = async (date, userId) => {
    const res =  await executeQuery("DELETE FROM reports WHERE date = $1 AND user_id = $2", date, userId);
    return res;
}

const updateReportMorningBasedOnDate = async (date, userId, data) => {
    const res = await executeQuery(`UPDATE reports SET sleepDuration = $3, sleepQuality = $4, morningMood = $5 WHERE date = $1 AND user_id = $2;`, date, userId, data.sleepDuration, data.sleepQuality, data.mood);
}

const updateReportEveningBasedOnDate = async (date, userId, data) => {
    const res = await executeQuery(`UPDATE reports SET exerciseTime = $3, studyTime = $4, qualityOfEating = $5, eveningMood = $6 WHERE date = $1 AND user_id = $2;`, date, userId, data.exerciseTime, data.studyTime, data.qualityOfEating, data.mood);
}

const addReportMorningToDb = async(data) => {
   await executeQuery("INSERT INTO reports (date, sleepDuration, sleepQuality, morningMood, user_id) VALUES ($1, $2, $3, $4, $5);", data.date, data.sleepDuration, data.sleepQuality, data.mood, data.userId);
}

const addReportEveningToDb = async(data) => {
    console.log(data);
   await executeQuery("INSERT INTO reports (date, exerciseTime, studyTime, qualityOfEating, eveningMood, user_id) VALUES ($1, $2, $3, $4, $5, $6);", data.date, data.exerciseTime, data.studyTime, data.qualityOfEating, data.mood, data.userId);
}


export { getReportBasedOnDate, deleteReportBasedOnDate, updateReportMorningBasedOnDate, updateReportEveningBasedOnDate, addReportMorningToDb, addReportEveningToDb }