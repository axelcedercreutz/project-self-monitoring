import { getAllByDate } from "../../services/summaryServices.js";
import { getFormattedDate, getYesterdayFormattedDate } from "../../utils/helpers.js";

const showLandingPage = async ({ render }) => {
  const date = getFormattedDate();
  const allDataToday = await getAllByDate(date);
  let moodToday = 1;
  let moodYesterday = 1;
  if(!allDataToday){
    render('landingpage.ejs', {moodToday: moodToday, moodYesterday: moodYesterday});
    return
  }
  moodToday = Number(allDataToday[0].avg_mood);
  const yesterday = getYesterdayFormattedDate();
  const allDataYesterday = await getAllByDate(yesterday);
  moodYesterday = Number(allDataYesterday[0].avg_mood);
  render('landingpage.ejs', {moodToday: moodToday, moodYesterday: moodYesterday});
}

export { showLandingPage }