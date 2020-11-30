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
        const resMorningReport = await getMorningReportBasedOnDate(formattedDate, user.id);
        const resEveningReport = await getEveningReportBasedOnDate(formattedDate, user.id);
        const morningDone = resMorningReport && resMorningReport.rowCount > 0;
        const eveningDone = resEveningReport && resEveningReport.rowCount > 0;
        data.morningDone = morningDone;
        data.eveningDone = eveningDone;
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
        const resMorningReport = await getMorningReportBasedOnDate(formattedDate, user.id);
        const resEveningReport = await getEveningReportBasedOnDate(formattedDate, user.id);
        const morningDone = resMorningReport && resMorningReport.rowCount > 0;
        const eveningDone = resEveningReport && resEveningReport.rowCount > 0;
        data.morningDone = morningDone;
        data.eveningDone = eveningDone;
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
  const morningDone = resMorningReport && resMorningReport.rowCount > 0;
  const eveningDone = resEveningReport && resEveningReport.rowCount > 0;
  render('home.ejs', {user: user, morningDone: morningDone, eveningDone: eveningDone});
}

const showMorningReporting = async({ session, render }) => {
  const user = await session.get('user');
  const date = new Date();
  const formattedDate = date.toISOString().substring(0,10);
  const resMorningReport = await getMorningReportBasedOnDate(formattedDate, user.id);
  const resEveningReport = await getEveningReportBasedOnDate(formattedDate, user.id);
  const morningDone = resMorningReport && resMorningReport.rowCount > 0;
  const eveningDone = resEveningReport && resEveningReport.rowCount > 0;
  render('morning.ejs', {user: user , date: formattedDate, morningDone: morningDone, eveningDone: eveningDone, errors: {}});
}

const showEveningReporting = async({ session, render }) => {
  const user = await session.get('user');
  const date = new Date();
  const formattedDate = date.toISOString().substring(0,10);
  const resMorningReport = await getMorningReportBasedOnDate(formattedDate, user.id);
  const resEveningReport = await getEveningReportBasedOnDate(formattedDate, user.id);
  const morningDone = resMorningReport && resMorningReport.rowCount > 0;
  const eveningDone = resEveningReport && resEveningReport.rowCount > 0;
  render('evening.ejs', {user: user, date: formattedDate, morningDone: morningDone, eveningDone: eveningDone, errors: {}});
}

export { postMorningReporting, postEveningReporting, showReporting, showMorningReporting, showEveningReporting }
