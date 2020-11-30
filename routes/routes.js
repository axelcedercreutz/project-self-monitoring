import { Router } from "../deps.js";

import { showLandingPage } from './controllers/homeController.js';
import { postMorningReporting, showReporting, showMorningReporting, showEveningReporting, postEveningReporting } from './controllers/reportingController.js';
import { postRegistrationForm, postLoginForm, postLogout, showLoginForm, showRegistrationForm } from './controllers/userController.js';
import { showSummary } from './controllers/summaryController.js';
import { getApiSummary, getSpecificDayApiSummary } from "./apis/summarizationApi.js";


const router = new Router();

router.get('/', showLandingPage);

router.get('/behavior/reporting', showReporting);
router.get('/behavior/reporting/morning', showMorningReporting);
router.post('/behavior/reporting/morning', postMorningReporting);
router.get('/behavior/reporting/evening', showEveningReporting);
router.post('/behavior/reporting/evening', postEveningReporting);

router.get('/behavior/summary', showSummary);

router.get('/auth/login', showLoginForm);
router.post('/auth/login', postLoginForm);
router.post('/auth/logout', postLogout);
router.get('/auth/registration', showRegistrationForm);
router.post('/auth/registration', postRegistrationForm);

router.get('/api/summary', getApiSummary);
router.get('/api/summary/:year/:month/:day', getSpecificDayApiSummary);

export { router };