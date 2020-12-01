import { getOneUserAverageMonth, getOnUserAverageByStartAndEndDate } from "../../services/summaryServices.js";
import { getFormattedDate, getWeekAgoDateFormattedDate, getDateOfWeek, getWeekForwardDateFormattedDate, getWeekNumber } from "../../utils/helpers.js";

const renderingHelper = (render, summaryData, allDataWeek, user, formattedMonth, formattedWeek) => {
    if(summaryData){
        if(allDataWeek){
            render('summary.ejs', {user: user, summaryData: summaryData,  month: formattedMonth, weekSummary: allDataWeek, week: formattedWeek});
        } else {
        render('summary.ejs', {user: user, summaryData: summaryData, month: formattedMonth, weekSummary: [], week: formattedWeek});
        }
    } else if (allDataWeek){
        render('summary.ejs', {user: user, summaryData: [],  month: formattedMonth, weekSummary: allDataWeek, week: formattedWeek});
    } else {
        render('summary.ejs', {user: user, summaryData: [], month: formattedMonth, weekSummary: [], week: formattedWeek});
    }
}

const showSummary = async ({render, session}) => {
    const user = await session.get('user');
    const date = new Date();
    const month = date.getMonth() > 0 ? date.getMonth() : 12;
    const summaryData = await getOneUserAverageMonth(user.id, month);
    const endDate = getFormattedDate();
    const startDate = getWeekAgoDateFormattedDate();
    const allDataWeek = await getOnUserAverageByStartAndEndDate(user.id, startDate, endDate);
    const formattedMonth = month > 9 ? month : "0"+month;
    const firstWeekOfMonth = getWeekNumber(date)[1] - 1;
    const formattedWeek = firstWeekOfMonth > 9 ? firstWeekOfMonth : '0'+firstWeekOfMonth;
    renderingHelper(render, summaryData, allDataWeek, user, formattedMonth, formattedWeek)
}

const postChangeWeek = async({render, request, response, session}) => {
    const user = await session.get('user');
    const body = request.body();
    const params = await body.value;
    const newWeek = params.get("week");
    const numberOfYear = Number(newWeek.substring(0,4));
    const numberOfWeek = Number(newWeek.substring(6, 8));
    const mondayOfWeek = getDateOfWeek(numberOfWeek, numberOfYear);
    const numberOfMonth = mondayOfWeek.getMonth() +1;
    const summaryData = await getOneUserAverageMonth(user.id, numberOfMonth);
    const startDateFormatted = mondayOfWeek.toISOString().substring(0,10);
    const endDateFormatted = getWeekForwardDateFormattedDate(mondayOfWeek)
    const allDataWeek = await getOnUserAverageByStartAndEndDate(user.id,startDateFormatted , endDateFormatted);
    const formattedMonth = numberOfMonth > 9 ? numberOfMonth : "0"+numberOfMonth;
    const formattedWeek = numberOfWeek > 9 ? numberOfWeek : "0"+numberOfWeek;
    renderingHelper(render, summaryData, allDataWeek, user, formattedMonth, formattedWeek);
}

const postChangeMonth = async({render, request, session}) => {
    const user = await session.get('user');
    const body = request.body();
    const params = await body.value;
    const newMonth = params.get("month");
    const formattedYear = Number(newMonth.substring(0,4));
    const numberOfMonth = Number(newMonth.substring(5, 7));
    const summaryData =await getOneUserAverageMonth(user.id, numberOfMonth);
    const endDate = new Date(formattedYear, numberOfMonth -1, 8);
    const endDateFormatted = getFormattedDate(endDate);
    const startDateFormatted = getWeekAgoDateFormattedDate(endDate);
    const allDataWeek = await getOnUserAverageByStartAndEndDate(user.id,startDateFormatted , endDateFormatted);
    const formattedMonth = numberOfMonth > 9 ? numberOfMonth : "0"+numberOfMonth;
    const firstWeekOfMonth = getWeekNumber(endDate)[1];
    const formattedWeek = firstWeekOfMonth > 9 ? firstWeekOfMonth : '0'+firstWeekOfMonth;
    renderingHelper(render, summaryData, allDataWeek, user, formattedMonth, formattedWeek)
}

export { showSummary, postChangeWeek, postChangeMonth };