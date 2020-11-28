const showSummary = async ({render, session}) => {
const user = await session.get('user');
const date = new Date();
  render('summary.ejs', {user: user});
}

export { showSummary };