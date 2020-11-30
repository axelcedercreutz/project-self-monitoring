import { getOneUserAverageMonth } from "../../services/summaryServices.js";

const showSummary = async ({render, session}) => {
const user = await session.get('user');
const date = new Date();
const summaryData = await getOneUserAverageMonth(user.id, date.toISOString().substring(5,7));
console.log(summaryData);
  render('summary.ejs', {user: user, summaryData: summaryData});
}

export { showSummary };