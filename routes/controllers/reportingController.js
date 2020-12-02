
import { validateMorningReport, validateEveningReport } from '../../middlewares/validations.js';
import { getReportBasedOnDate, updateReportMorningBasedOnDate, updateReportEveningBasedOnDate, addReportMorningToDb, addReportEveningToDb } from "../../services/reportingServices.js";

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
        const reportToday = await getReportBasedOnDate(formattedDate, user.id);
        const morningDone = reportToday && reportToday.morningmood;
        const eveningDone = reportToday && reportToday.eveningmood;
        data.morningDone = morningDone;
        data.eveningDone = eveningDone;
        render('morning.ejs', data);
        return;
    }
    const existingReport = await getReportBasedOnDate(data.date, data.userId);
    if(existingReport){
      await updateReportMorningBasedOnDate(data.date, data.userId, data);
    } else {
      await addReportMorningToDb(data);
    }
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
        const reportToday = await getReportBasedOnDate(formattedDate, user.id);
        const morningDone = reportToday && reportToday.morningmood;
        const eveningDone = reportToday && reportToday.eveningmood;
        data.morningDone = morningDone;
        data.eveningDone = eveningDone;
        render('evening.ejs', data);
        return;
    }
    const existingReport = await getReportBasedOnDate(data.date, data.userId);
    if(existingReport){
      await updateReportEveningBasedOnDate(data.date, data.userId, data);
    } else {
      await addReportEveningToDb(data);
    }
    response.redirect('/behavior/reporting');
}

const showReporting = async ({ session, render }) => {
  const user = await session.get('user');
  const today = new Date();
  const formattedDate = today.toISOString().substring(0,10);
  const reportToday = await getReportBasedOnDate(formattedDate, user.id);
  const morningDone = reportToday && reportToday.morningmood;
  const eveningDone = reportToday && reportToday.eveningmood;
  render('home.ejs', {user: user, morningDone: morningDone, eveningDone: eveningDone});
}

const showMorningReporting = async({ session, render }) => {
  const user = await session.get('user');
  const date = new Date();
  const formattedDate = date.toISOString().substring(0,10);
  const reportToday = await getReportBasedOnDate(formattedDate, user.id);
  if(!reportToday){
    render('morning.ejs', {user: user , date: formattedDate, sleepDuration: 0, morningDone: false, eveningDone: false, errors: {}});
  }
  const morningDone = reportToday && reportToday.morningmood;
  const eveningDone = reportToday && reportToday.eveningmood;
  render('morning.ejs', {user: user , date: formattedDate, sleepDuration: (reportToday.sleepduration || 0), morningDone: morningDone, eveningDone: eveningDone, errors: {}});
}

const showEveningReporting = async({ session, render }) => {
  const user = await session.get('user');
  const date = new Date();
  const formattedDate = date.toISOString().substring(0,10);
  const reportToday = await getReportBasedOnDate(formattedDate, user.id);
  if(!reportToday){
    render('evening.ejs', {user: user , date: formattedDate, exerciseTime: 0, studyTime: 0, morningDone: false, eveningDone: false, errors: {}});
  }
  const morningDone = reportToday && reportToday.morningmood;
  const eveningDone = reportToday && reportToday.eveningmood;
  render('evening.ejs', {user: user, date: formattedDate, exerciseTime: (reportToday.exercisetime || 0), studyTime: (reportToday.studytime || 0), morningDone: morningDone, eveningDone: eveningDone, errors: {}});
}

export { postMorningReporting, postEveningReporting, showReporting, showMorningReporting, showEveningReporting }
