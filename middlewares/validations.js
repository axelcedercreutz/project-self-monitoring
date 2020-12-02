import { validate, required, isNumber, minLength, minNumber, isEmail, numberBetween } from "../deps.js";

const emailPasswordRules = {
    email: [required, isEmail],
    password: [required, minLength(4)],
};

const morningReportRules = {
  sleepDuration: [required, isNumber, minNumber(0)],
  sleepQuality: [required, isNumber, numberBetween(1,5)],
  mood: [required, isNumber, numberBetween(1,5)]
}

const eveningReportRules = {
  exerciseTime: [required, isNumber, minNumber(0)],
  studyTime: [required, isNumber, minNumber(0)],
  qualityOfEating: [required, isNumber, numberBetween(1,5)],
  mood: [required, isNumber, numberBetween(1,5)]
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

const getDataEveningReport = async (request) => {
  const data = {
    date: '',
    exerciseTime:'',
    studyTime:'',
    qualityOfEating:'',
    mood: '',
  }
  if (request) {
    const body = request.body();
    const params = await body.value;
    data.date = params.get("date").substring(0,10);
    data.exerciseTime = Number(params.get("exerciseTime"));
    data.studyTime = Number(params.get("studyTime"));
    data.qualityOfEating = Number(params.get("qualityOfEating"));
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

const validateEveningReport = async(request) => {
  const data = await getDataEveningReport(request);
  const [passes, errors] = await validate(data, eveningReportRules);
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
export { validateMorningReport, validateEveningReport, validateRegistration };