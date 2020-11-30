import { executeQuery } from "../database/database.js";


/*   SELECT DISTINCT date, AVG(sleepduration) as avg_sleepduration, AVG(sleepquality) as avg_sleepquality, AVG(studytime) as avg_study, AVG(exercisetime) as avg_exercise, AVG(mood1 + mood2 /2) as avg_mood
FROM (
SELECT morningreports.date, sleepQuality, sleepDuration,exercisetime, studytime, morningreports.mood as mood1, eveningreports.mood as mood2 FROM morningreports
LEFT JOIN
eveningreports ON morningreports.user_id = eveningreports.user_id AND morningreports.user_id = 1 and morningreports.date = eveningreports.date
) AS subquery
GROUP BY date
*/

const getOneUserAverageMonth = async (userId, month) => {
    const query = `
    SELECT DISTINCT EXTRACT(Month FROM date) as month, AVG(sleepduration) as avg_sleepduration, ROUND(AVG(sleepquality)) as avg_sleepquality, AVG(studytime) as avg_study, AVG(exercisetime) as avg_exercise, ROUND(AVG(mood)) as avg_mood
        FROM (
            SELECT morningreports.date, morningreports.sleepQuality, morningreports.sleepDuration,eveningreports.exercisetime, eveningreports.studytime, ((morningreports.mood +  eveningreports.mood) / 2) as mood FROM morningreports
            LEFT JOIN
            eveningreports
                ON morningreports.user_id = eveningreports.user_id AND morningreports.user_id = 1 AND morningreports.date = eveningreports.date
            WHERE morningreports.user_id = $1 AND EXTRACT(Month FROM morningreports.date) = $2
        ) AS subquery
    GROUP BY EXTRACT(Month FROM date)
    `;
    const res = await executeQuery(query, userId, month);
        if (res && res.rowCount > 0) {
    return res.rowsOfObjects();
    }
    return 'no morning reports for specific month';
}

const getAllByDate = async(date) => {
    const query = `SELECT DISTINCT date, AVG(sleepduration) as avg_sleepduration, AVG(sleepquality) as avg_sleepquality, AVG(studytime) as avg_study, AVG(exercisetime) as avg_exercise, AVG(mood) as avg_mood
        FROM (
            SELECT morningreports.date, morningreports.sleepQuality, morningreports.sleepDuration,eveningreports.exercisetime, eveningreports.studytime, ((morningreports.mood +  eveningreports.mood) / 2) as mood FROM morningreports
            LEFT JOIN
            eveningreports
                ON morningreports.user_id = eveningreports.user_id AND morningreports.user_id = 1 AND morningreports.date = eveningreports.date
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

export { getAllByDate, getOneUserAverageMonth }