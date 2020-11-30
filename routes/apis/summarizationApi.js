import { getAllByDate } from "../../services/summaryServices.js";

const getApiSummary = async ({ render }) => {
  render('landingpage.ejs');
}

const getSpecificDayApiSummary = async ({ params, render, response }) => {
    console.log(params);
    const newDate = `${params.year}-${params.month}-${params.day}`;
    const allData = await getAllByDate(newDate);
    if(allData){
        response.body = allData;
    } else {
        response.body = 'No data found on selected date';
    }
}

export { getApiSummary, getSpecificDayApiSummary }