import { executeQuery } from "../database/database.js";

const getMorningReportBasedOnDate = async(date, userId) => {
    const res = await await executeQuery("SELECT * FROM morningreports WHERE date = $1 AND user_id = $2", date, userId);
    return res;
}

const getEveningReportBasedOnDate = async(date, userId) => {
    const res = await await executeQuery("SELECT * FROM eveningreports WHERE date = $1 AND user_id = $2", date, userId);
    return res;
}

const deleteMorningReportBasedOnDate = async(date, userId) => {
    const res = await await executeQuery("DELETE FROM morningreports WHERE date = $1 AND user_id = $2", date, userId);
    return res;
}

const deleteEveningReportBasedOnDate = async(date, userId) => {
    const res = await await executeQuery("DELETE FROM eveningreports WHERE date = $1 AND user_id = $2", date, userId);
    return res;
}

const addMorningReportToDb = async(data) => {
   await executeQuery("INSERT INTO morningreports (date, sleepDuration, sleepQuality, mood, user_id) VALUES ($1, $2, $3, $4, $5);", data.date, data.sleepDuration, data.sleepQuality, data.mood, data.userId);
}

const addEveningReportToDb = async(data) => {
    console.log(data);
   await executeQuery("INSERT INTO eveningreports (date, exerciseTime, studyTime, qualityOfEating, mood, user_id) VALUES ($1, $2, $3, $4, $5, $6);", data.date, data.exerciseTime, data.studyTime, data.qualityOfEating, data.mood, data.userId);
}


export {getMorningReportBasedOnDate, addMorningReportToDb, deleteMorningReportBasedOnDate, getEveningReportBasedOnDate, deleteEveningReportBasedOnDate, addEveningReportToDb }