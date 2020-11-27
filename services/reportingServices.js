import { executeQuery } from "../database/database.js";

const getMorningReportBasedOnDate = async(date, userId) => {
    const res = await await executeQuery("SELECT * FROM morningreports WHERE date = $1 AND user_id = $2", date, userId);
    return res;
}

const deleteMorningReportBasedOnDate = async(date, userId) => {
    const res = await await executeQuery("DELETE FROM morningreports WHERE date = $1 AND user_id = $2", date, userId);
    return res;
}

const getEveningReportBasedOnDate = async(email) => {
    const res = await await executeQuery("SELECT * FROM eveningReports WHERE date = $1 AND user_id = $2", date, userId);
    return res;
}

const deleteEveningReportBasedOnDate = async(date, userId) => {
    const res = await await executeQuery("DELETE FROM eveningReports WHERE date = $1 AND user_id = $2", date, userId);
    return res;
}

const addMorningReportToDb = async(data) => {
   await executeQuery("INSERT INTO morningreports (date, sleepDuration, sleepQuality, mood, user_id) VALUES ($1, $2, $3, $4, $5);", data.date, data.sleepDuration, data.sleepQuality, data.mood, data.userId);
}

const addEveningReportToDb = async(data) => {
   await executeQuery("INSERT INTO eveningReports (date, excerciseTime, studyTime, qualityOfEating, mood, user_id) VALUES ($1, $2, $3, $4, $5, $6);", data.date, data.excerciseTime, data.studyTime, data.qualityOfEating, data.mood, data.userId);
}


export {getMorningReportBasedOnDate, addMorningReportToDb, deleteMorningReportBasedOnDate, getEveningReportBasedOnDate, deleteEveningReportBasedOnDate, addEveningReportToDb }