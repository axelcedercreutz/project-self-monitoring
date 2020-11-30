import { getAllByDate } from "../../services/summaryServices.js";

const showLandingPage = async ({ render }) => {
  const date = new Date()
  const allDataToday = await getAllByDate(date.toISOString().substring(0,10));
  const moodToday = Number(allDataToday[0].moodavg);
  
  console.log(allDataToday);
  date.setDate(date.getDate() - 1);
   const allDataYesterday = await getAllByDate(date.toISOString().substring(0,10));
  const moodYesterday = Number(allDataYesterday[0].moodavg);
  render('landingpage.ejs', {moodToday: moodToday, moodYesterday: moodYesterday});
}

export { showLandingPage }