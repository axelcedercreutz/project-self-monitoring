import * as sleepServices from "../../services/sleepServices.js";

const getSleeps = async({response}) => {
    response.body = await sleepServices.getNews();
};

const setSleep = async({request, response}) => {
    const body = request.body({type: 'json'});
    const document = await body.value;
    const newNews = {
        title: document.title,
        content: document.content
    }
    await sleepServices.setNews(newNews);
    response.status = 200;
};

const getOneSleep = async({request, response}) => {
    const parts = request.url.pathname.split("/");
    const id = parts[3];
    response.body = await sleepServices.getOneNews(id);
}

const deleteSleep = async({request, response}) => {
    const parts = request.url.pathname.split("/");
    const id = parts[3];
    await sleepServices.deleteNews(id);
    response.status = 200;
}
   
export { getSleeps, setSleep, getOneSleep, deleteSleep};