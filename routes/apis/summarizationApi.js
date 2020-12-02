import { getAllByDate, getAllByStartAndEndDate } from "../../services/summaryServices.js";
import { getFormattedDate, getWeekAgoDateFormattedDate } from "../../utils/helpers.js";

const getApiSummary = async ({ response }) => {
    const endDate = getFormattedDate();
    const startDate = getWeekAgoDateFormattedDate();
    const allDataWeek = await getAllByStartAndEndDate(startDate, endDate);
    if(allDataWeek && Array.isArray(allDataWeek)){
        response.body = allDataWeek[0];
        response.status = 200;
    } else {
        response.body = 'No data found for the past week';
        response.status = 404;
    }
}

const getSpecificDayApiSummary = async ({ params, response }) => {
    const newDate = `${params.year}-${params.month}-${params.day}`;
    const allData = await getAllByDate(newDate);
    if(allData && Array.isArray(allData)){
        response.body = allData;
        response.status = 200;
    } else {
        response.body = 'No data found on selected date';
        response.status = 404;
    }
}

export { getApiSummary, getSpecificDayApiSummary }