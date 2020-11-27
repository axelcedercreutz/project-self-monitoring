import { validateMorningReport } from '../../middlewares/validations.js';
import { getMorningReportBasedOnDate, deleteMorningReportBasedOnDate, addMorningReportToDb } from "../../services/reportingServices.js";

const postMorningReporting = async ({ session, request, response, render}) => {
    const data = await validateMorningReport(request);
    const user = await session.get('user');
    data.userId = user.id;
    console.log(data);
    if(data.errors) {
        console.log(data);
        data.user = user;
        render('morning.ejs', data);
        return;
    }
    const existingMorningReportForTheDate = await getMorningReportBasedOnDate(data.date, data.userId);
    if(existingMorningReportForTheDate.rowCount > 0){

        await deleteMorningReportBasedOnDate(data.date, data.userId);
    }
    await addMorningReportToDb(data);
    response.redirect('/behavior/reporting');
}
/*
const postEveningReporting = async ({ session, request, response, render}) => {
    const data = await validateEveningReport(request);
    const user = await session.get('user');
    if(data.errors) {
        data.user = user;
        render('evening.ejs', data);
        return;
    }
    const existingMorningReportForTheDate = await getEveningReportBasedOnDate(data.date, user.id);
    if(existingMorningReportForTheDate.rowCount > 0){
        const deletableId = existingMorningReportForTheDate.rowsOfObjects()[0].id
        await deleteEveningReportBasedOnId(deletableId, user.id);
    }
    await addEveningReportToDb(data, user.id);
    response.redirect('/behavior/reporting');
}
*/
const showReporting = async ({ session, render }) => {
  const user = await session.get('user');
  render('home.ejs', {user: user, morningDone: false, eveningDone: true});
}

const showMorningReporting = async({ session, render }) => {
  const user = await session.get('user');
  const date = new Date();
  const formattedDate = date.toISOString().substring(0,10);
  render('morning.ejs', {user: user , date: formattedDate, morningDone: true, eveningDone: true});
}

const showEveningReporting = async({ session, render }) => {
const user = await session.get('user');
const date = new Date();
  const formattedDate = date.toISOString().substring(0,10);
  render('evening.ejs', {user: user, date: formattedDate, morningDone: false, eveningDone: true });
}
export { postMorningReporting, showReporting, showMorningReporting, showEveningReporting }