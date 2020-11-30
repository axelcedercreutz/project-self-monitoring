import { getAllByDate } from "../../services/summaryServices.js";
import { getFormattedDate, getYesterdayFormattedDate } from "../../utils/helpers.js";

const showLandingPage = async ({ render }) => {
  const date = getFormattedDate();
  const allDataToday = await getAllByDate(date);
  const moodToday = Number(allDataToday[0].moodavg);
  const yesterday = getYesterdayFormattedDate();
  const allDataYesterday = await getAllByDate(yesterday);
  const moodYesterday = Number(allDataYesterday[0].moodavg);
  render('landingpage.ejs', {moodToday: moodToday, moodYesterday: moodYesterday});
}

export { showLandingPage }