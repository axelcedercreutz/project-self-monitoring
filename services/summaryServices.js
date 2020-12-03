import { executeQuery } from "../database/database.js";

const getOneUserAverageMonth = async (userId, month) => {
    const query = `
    SELECT DISTINCT EXTRACT(Month FROM date::timestamp) as month, AVG(sleepduration) as avg_sleepduration, ROUND(AVG(sleepquality), 2) as avg_sleepquality, AVG(studytime) as avg_study, AVG(exercisetime) as avg_exercise, ROUND(AVG((morningmood + eveningmood) /2), 2) as avg_mood
        FROM reports
            WHERE user_id = $1 AND EXTRACT(Month FROM date::timestamp) = $2
        GROUP BY EXTRACT(Month FROM date::timestamp)
    `;
    const res = await executeQuery(query, userId, month);
        if (res && res.rowCount > 0) {
    return res.rowsOfObjects();
    }
    console.log('no reports for specific month');
    return
}

const getOnUserAverageByWeek = async (userId, week) => {
    const query = `SELECT DISTINCT EXTRACT(WEEK FROM date::timestamp) as week, AVG(sleepduration) as avg_sleepduration, ROUND(AVG(sleepquality), 2) as avg_sleepquality, AVG(studytime) as avg_study, AVG(exercisetime) as avg_exercise, ROUND(AVG((morningmood + eveningmood) /2), 2) as avg_mood
        FROM reports
            WHERE reports.user_id = $1 AND EXTRACT(WEEK FROM reports.date::timestamp) = $2
    GROUP BY week
    `;
    const res = await executeQuery(query, userId, week);
    if(res && res.rowCount > 0) {
        return res.rowsOfObjects();
    } else {
        console.log('No data found on selected week');
        return;
    }
}

const getAllByDate = async(date) => {
    const query = `SELECT DISTINCT date, AVG(sleepduration) as avg_sleepduration, ROUND(AVG(sleepquality), 2) as avg_sleepquality, AVG(studytime) as avg_study, AVG(exercisetime) as avg_exercise, ROUND(AVG((morningmood + eveningmood) /2), 2) as avg_mood
        FROM reports
            WHERE reports.date = $1
    GROUP BY date
    `;
    const res = await executeQuery(query, date);
    if(res && res.rowCount > 0) {
        return res.rowsOfObjects();
    } else {
        console.log('No data found on selected date');
        return;
    }
}

const getAllByStartAndEndDate = async (startDate, endDate) => {
    const query = `SELECT DISTINCT (reports.date >= $1 AND reports.date <= $2) as grp, AVG(sleepduration) as avg_sleepduration, ROUND(AVG(sleepquality), 2) as avg_sleepquality, AVG(studytime) as avg_study, AVG(exercisetime) as avg_exercise, ROUND(AVG((morningmood + eveningmood) /2), 2) as avg_mood
        FROM reports
            WHERE reports.date >= $1 AND reports.date <= $2
    GROUP BY grp
    `;
    const res = await executeQuery(query, startDate, endDate);
    if(res && res.rowCount > 0) {
        return res.rowsOfObjects();
    } else {
        console.log('No data found on selected week');
        return;
    }
}

export { getAllByDate, getOneUserAverageMonth, getOnUserAverageByWeek, getAllByStartAndEndDate }