import { getOneUserAverageMonth } from "../../services/summaryServices.js";

const showSummary = async ({render, session}) => {
    const user = await session.get('user');
    const date = new Date();
    const month = date.getMonth();
    const summaryData = await getOneUserAverageMonth(user.id, month);

    if(summaryData && Array.isArray(summaryData)) {
    render('summary.ejs', {user: user, summaryData: summaryData[0]});
    } else {
        render('summary.ejs', {user: user, summaryData: []});
    }
}

export { showSummary };