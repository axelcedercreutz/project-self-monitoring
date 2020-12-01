import { executeQuery } from "../database/database.js";

const getOneUserAverageMonth = async (userId, month) => {
    console.log(month);
    const query = `
    SELECT DISTINCT EXTRACT(Month FROM date) as month, AVG(sleepduration) as avg_sleepduration, ROUND(AVG(sleepquality)) as avg_sleepquality, AVG(studytime) as avg_study, AVG(exercisetime) as avg_exercise, ROUND(AVG(mood)) as avg_mood
        FROM (
            SELECT morningreports.date, morningreports.sleepQuality, morningreports.sleepDuration,eveningreports.exercisetime, eveningreports.studytime, ((morningreports.mood +  eveningreports.mood) / 2) as mood FROM morningreports
            LEFT JOIN
            eveningreports
                ON morningreports.user_id = eveningreports.user_id AND morningreports.user_id = $1 AND morningreports.date = eveningreports.date
            WHERE morningreports.user_id = $1 AND EXTRACT(Month FROM morningreports.date) = $2
        ) AS subquery
    GROUP BY EXTRACT(Month FROM date)
    `;
    const res = await executeQuery(query, userId, month);
        if (res && res.rowCount > 0) {
    return res.rowsOfObjects();
    }
    console.log('no reports for specific month');
    return
}

const getOnUserAverageByStartAndEndDate = async (userId, startDate, endDate) => {
const query = `SELECT DISTINCT EXTRACT(WEEK FROM date) as week, AVG(sleepduration) as avg_sleepduration, ROUND(AVG(sleepquality)) as avg_sleepquality, AVG(studytime) as avg_study, AVG(exercisetime) as avg_exercise, ROUND(AVG(mood)) as avg_mood
        FROM (
            SELECT morningreports.date, morningreports.sleepQuality, morningreports.sleepDuration,eveningreports.exercisetime, eveningreports.studytime, ((morningreports.mood +  eveningreports.mood) / 2) as mood FROM morningreports
            LEFT JOIN
            eveningreports
                ON morningreports.user_id = eveningreports.user_id AND morningreports.user_id = $1 AND morningreports.date = eveningreports.date
            WHERE morningreports.user_id = $1 AND morningreports.date >= $2 AND morningreports.date <= $3
        ) AS subquery
    GROUP BY week
    `;
    const res = await executeQuery(query, userId, startDate, endDate);
    if(res && res.rowCount > 0) {
        return res.rowsOfObjects();
    } else {
        console.log('No data found on selected week');
        return;
    }
}

const getAllByDate = async(date) => {
    const query = `SELECT DISTINCT date, AVG(sleepduration) as avg_sleepduration, AVG(sleepquality) as avg_sleepquality, AVG(studytime) as avg_study, AVG(exercisetime) as avg_exercise, AVG(mood) as avg_mood
        FROM (
            SELECT morningreports.date, morningreports.sleepQuality, morningreports.sleepDuration,eveningreports.exercisetime, eveningreports.studytime, ((morningreports.mood +  eveningreports.mood) / 2) as mood FROM morningreports
            LEFT JOIN
            eveningreports
                ON morningreports.user_id = eveningreports.user_id AND morningreports.date = eveningreports.date
            WHERE morningreports.date = $1
        ) AS subquery
    GROUP BY date
    `;
    const res = await executeQuery(query, date);
    if(res && res.rowCount > 0) {
        return res.rowsOfObjects();
    } else {
        return 'No data found on selected date';
    }
}

const getAllByStartAndEndDate = async (startDate, endDate) => {
    const query = `SELECT DISTINCT EXTRACT(WEEK FROM date) as week, AVG(sleepduration) as avg_sleepduration, AVG(sleepquality) as avg_sleepquality, AVG(studytime) as avg_study, AVG(exercisetime) as avg_exercise, AVG(mood) as avg_mood
        FROM (
            SELECT morningreports.date, morningreports.sleepQuality, morningreports.sleepDuration,eveningreports.exercisetime, eveningreports.studytime, ((morningreports.mood +  eveningreports.mood) / 2) as mood FROM morningreports
            LEFT JOIN
            eveningreports
                ON morningreports.user_id = eveningreports.user_id AND morningreports.date = eveningreports.date
            WHERE morningreports.date >= $1 AND morningreports.date <= $2
        ) AS subquery
    GROUP BY week
    `;
    const res = await executeQuery(query, startDate, endDate);
    if(res && res.rowCount > 0) {
        return res.rowsOfObjects();
    } else {
        return 'No data found on selected week';
    }
}

export { getAllByDate, getOneUserAverageMonth, getOnUserAverageByStartAndEndDate, getAllByStartAndEndDate }