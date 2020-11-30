import { getAllByDate, getAllByStartAndEndDate } from "../../services/summaryServices.js";
import { getFormattedDate, getWeekAgoDateFormattedDate } from "../../utils/helpers.js";

const getApiSummary = async ({ response }) => {
    const endDate = getFormattedDate();
    const startDate = getWeekAgoDateFormattedDate();
    const allDataWeek = await getAllByStartAndEndDate(startDate, endDate);
    console.log(allDataWeek);
    if(allDataWeek){
    response.body = allDataWeek[0];
    } else {
        response.body = 'No data found for the past week';
    }
}

const getSpecificDayApiSummary = async ({ params, response }) => {
    const newDate = `${params.year}-${params.month}-${params.day}`;
    const allData = await getAllByDate(newDate);
    if(allData){
        response.body = allData;
    } else {
        response.body = 'No data found on selected date';
    }
}

export { getApiSummary, getSpecificDayApiSummary }