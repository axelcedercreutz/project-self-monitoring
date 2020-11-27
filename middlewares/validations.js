import { validate, required, isNumber, minLength, isEmail } from "../deps.js";

const emailPasswordRules = {
    email: [required, isEmail],
    password: [required, minLength(4)],
};

const morningReportRules = {
  sleepDuration: [required, isNumber],
  sleepQuality: [required, isNumber],
  mood: [required, isNumber]
}

const getDataMorningReport = async (request) => {
  const data = {
    date: '',
    sleepDuration:'',
    sleepQuality:'',
    mood: '',
  }
  if (request) {
    const body = request.body();
    const params = await body.value;
    data.date = params.get("date").substring(0,10);
    data.sleepDuration = Number(params.get("sleepDuration"));
    data.sleepQuality = Number(params.get("sleepQuality"));
    data.mood = Number(params.get("mood"));
  }

  return data;
}

const getDataRegistration = async (request) => {
  const data = {
    email: "",
    password: '',
    verification: '',
    errors: null // or errors: {}
  };

  if (request) {
    const body = request.body();
    const params = await body.value;
    data.email = params.get("email");
    data.password = params.get("password");
    data.verification = params.get("verification");
  }

  return data;
};

const validateMorningReport = async(request) => {
const data = await getDataMorningReport(request);
const [passes, errors] = await validate(data, morningReportRules);
    if(!passes){
        data.errors = errors;
    }
    return data;
}

const validateRegistration = async (request) => {
    const data = await getDataRegistration(request)
    const [passes, errors] = await validate(data, emailPasswordRules);
    if(!passes){
        data.errors = errors;
    }
    return data;
}
export { validateMorningReport, validateRegistration };