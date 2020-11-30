import { validateMorningReport, validateEveningReport } from '../../middlewares/validations.js';
import { getMorningReportBasedOnDate, deleteMorningReportBasedOnDate, addMorningReportToDb, getEveningReportBasedOnDate , deleteEveningReportBasedOnDate, addEveningReportToDb} from "../../services/reportingServices.js";

const postMorningReporting = async ({ session, request, response, render}) => {
    const data = await validateMorningReport(request);
    const user = await session.get('user');
    data.userId = user.id;
    if(data.errors) {
        console.log(data);
        data.user = user;
        const date = new Date();
        const formattedDate = date.toISOString().substring(0,10);
        data.date = formattedDate;
        data.morningDone = false;
        data.eveningDone = false;
        console.log(data);
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

const postEveningReporting = async ({ session, request, response, render}) => {
    const data = await validateEveningReport(request);
    const user = await session.get('user');
    data.userId = user.id;
    if(data.errors) {
        data.user = user;
        const date = new Date();
        const formattedDate = date.toISOString().substring(0,10);
        data.date = formattedDate;
        data.morningDone = false;
        data.eveningDone = false;
        render('evening.ejs', data);
        return;
    }
    const existingMorningReportForTheDate = await getEveningReportBasedOnDate(data.date, user.id);
    if(existingMorningReportForTheDate.rowCount > 0){
        await deleteEveningReportBasedOnDate(data.date, data.userId);
    }
    await addEveningReportToDb(data);
    response.redirect('/behavior/reporting');
}

const showReporting = async ({ session, render }) => {
  const user = await session.get('user');
  const today = new Date();
  const formattedDate = today.toISOString().substring(0,10);
  const resMorningReport = await getMorningReportBasedOnDate(formattedDate, user.id);
  const resEveningReport = await getEveningReportBasedOnDate(formattedDate, user.id);
  const morningDone = resMorningReport.rowCount > 0;
  const eveningDone = resEveningReport.rowCount > 0;
  render('home.ejs', {user: user, morningDone: morningDone, eveningDone: eveningDone});
}

const showMorningReporting = async({ session, render }) => {
  const user = await session.get('user');
  const date = new Date();
  const formattedDate = date.toISOString().substring(0,10);
  render('morning.ejs', {user: user , date: formattedDate, morningDone: false, eveningDone: false, errors: {}});
}

const showEveningReporting = async({ session, render }) => {
const user = await session.get('user');
const date = new Date();
  const formattedDate = date.toISOString().substring(0,10);
  render('evening.ejs', {user: user, date: formattedDate, morningDone: false, eveningDone: true, errors: {}});
}

export { postMorningReporting, postEveningReporting, showReporting, showMorningReporting, showEveningReporting }
