import { getOneUserAverageMonth, getOnUserAverageByStartAndEndDate } from "../../services/summaryServices.js";
import { getFormattedDate, getWeekAgoDateFormattedDate } from "../../utils/helpers.js";

const showSummary = async ({render, session}) => {
    const user = await session.get('user');
    const date = new Date();
    const month = date.getMonth();
    const summaryData = await getOneUserAverageMonth(user.id, month);
    const endDate = getFormattedDate();
    const startDate = getWeekAgoDateFormattedDate();
    const allDataWeek = await getOnUserAverageByStartAndEndDate(user.id, startDate, endDate);
    if(summaryData && Array.isArray(summaryData)){
        if(allDataWeek && Array.isArray(allDataWeek)){
            render('summary.ejs', {user: user, summaryData: summaryData[0], weekSummary: allDataWeek[0]});
            return;
        } else {
        render('summary.ejs', {user: user, summaryData: summaryData[0], weekSummary: []});
        return;
        }
    } else if (allDataWeek && Array.isArray(allDataWeek)){
        render('summary.ejs', {user: user, summaryData: [], weekSummary: allDataWeek[0]});
        return;
    } else {
        render('summary.ejs', {user: user, summaryData: [], weekSummary: []});
        return;
    }
}

export { showSummary };