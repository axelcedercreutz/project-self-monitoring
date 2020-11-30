import { getUserBasedOnEmail, addUserToDb } from "../../services/userServices.js";
import { bcrypt } from '../../deps.js';
import { validateRegistration } from '../../middlewares/validations.js';

const postRegistrationForm = async({request, response, render}) => {
  const data = await validateRegistration(request);
  if(data.errors) {
    console.log(data);
    render('register.ejs', data);
    return;
  }
  const password = data.password;
  const email = data.email;
  const verification = data.verification;

  if (password !== verification) {
    response.body = 'The entered passwords did not match';
    response.status = 401;
    return;
  }

  const existingUsers = await getUserBasedOnEmail(email);
  if (existingUsers.rowCount > 0) {
    response.body = 'The email is already reserved.';
    return;
  }

  const hash = await bcrypt.hash(password);
  await addUserToDb(email, hash);
  response.redirect('/auth/login');
};

const postLoginForm = async({request, response, session, render}) => {
  const body = request.body();
  const params = await body.value;

  const email = params.get('email');
  const password = params.get('password');

  // check if the email exists in the database
  const existingUsers = await getUserBasedOnEmail(email);
  if (existingUsers.rowCount === 0) {
      const data = {
        errors: {
          errror: { error: "Invalid email or password" },
        }
      }
      render('login.ejs', data)
      response.status = 401;
      return;
  }

  // take the first row from the results
  const userObj = existingUsers.rowsOfObjects()[0];

  const hash = userObj.password;

  const passwordCorrect = await bcrypt.compare(password, hash);
  if (!passwordCorrect) {
      response.status = 401;
      return;
  }
  await session.set('authenticated', true);
  await session.set('user', {
      id: userObj.id,
      email: userObj.email
  });
  response.body = 'Authentication successful!';
  response.redirect('/behavior/reporting');
}

const postLogout = async({response, session}) => {
    await session.set('user', undefined)
    await session.set('authenticated', undefined);
    response.redirect('/auth/login');
}

const showLoginForm = ({render}) => {
  render('login.ejs', { errors: [], email: ''});
}

const showRegistrationForm = ({render}) => {
  render('register.ejs', { errors: [], email: ''});
}

export { postRegistrationForm, postLoginForm, postLogout, showLoginForm, showRegistrationForm };