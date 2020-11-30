import { getAllByDate } from "../../services/summaryServices.js";

const getApiSummary = async ({ render }) => {
    const today = new Date();
    render('landingpage.ejs');
}

const getSpecificDayApiSummary = async ({ params, render, response }) => {
    const newDate = `${params.year}-${params.month}-${params.day}`;
    const allData = await getAllByDate(newDate);
    if(allData){
        response.body = allData;
    } else {
        response.body = 'No data found on selected date';
    }
}

export { getApiSummary, getSpecificDayApiSummary }