import { executeQuery } from "../database/database.js";


const getOneUserAverageMonth = async (userId, month) => {
    const query_one = "SELECT date, AVG(sleepDuration) as sleepDurationAvg, AVG(mood) as moodAvg FROM morningreports WHERE user_id = $1 AND EXTRACT(MONTH FROM date) = $2";
    const query_two = "SELECT date, AVG(exercisetime) as exersisetimeAvg FROM eveningreports WHERE user_id = $1 AND EXTRACT(MONTH FROM date) = $2";
    const query = `WITH query_one AS (${query_one}), query_two AS (${query_two}) SELECT EXTRACT(MONTH FROM date) as month, sleepDurationAvg, moodAvg, exersisetimeAvg FROM query_one LEFT JOIN query_two using (date) GROUP BY EXTRACT(MONTH FROM date)`;
    console.log(query);
    const res = await executeQuery(query, userId, month);
        if (res && res.rowCount > 0) {
    return res.rowsOfObjects();
    }
    return 'no morning reports for specific month';
}

const getAllUsersMorningReportsForSpecificDate = async(date) => {
    const res = await executeQuery("SELECT * FROM morningreports WHERE date = $1 ", date);
    if (res && res.rowCount > 0) {
    return res.rowsOfObjects();
    }
    return 'no morning reports for specific date';
}

const getAllUsersEveningReportsForSpecificDate = async(date) => {
    const res = await executeQuery("SELECT * FROM eveningReports WHERE date = $1 ", date);
    if (res && res.rowCount > 0) {
    return res.rowsOfObjects();
    }
    return 'no evening reports for specific date';
}

const getAllByDate = async(date) => {
    const query_one = "SELECT date, AVG(sleepDuration) as sleepDurationAvg, ROUND(AVG(mood)) as moodAvg FROM morningreports WHERE date = $1 GROUP BY 1 ORDER BY 1";
    const query_two = "SELECT date, AVG(exercisetime) as exersisetimeAvg FROM eveningreports WHERE date = $1 GROUP BY 1 ORDER BY 1";
    const query = `WITH query_one AS (${query_one}), query_two AS (${query_two}) SELECT * FROM query_one LEFT JOIN query_two using (date)`;
    console.log(query);
    const res = await executeQuery(query, date);
    console.log(res.rowCount);
    if(res && res.rowCount > 0) {
        return res.rowsOfObjects();
    } else {
        return 'No data found on selected date';
    }
}

export { getAllByDate, getOneUserAverageMonth }