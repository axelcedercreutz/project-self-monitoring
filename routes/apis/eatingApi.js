import * as eatingServices from "../../services/eatingServices.js";

const getEatings = async({response}) => {
    response.body = await eatingServices.getNews();
};

const setEating = async({request, response}) => {
    const body = request.body({type: 'json'});
    const document = await body.value;
    const newNews = {
        title: document.title,
        content: document.content
    }
    await eatingServices.setNews(newNews);
    response.status = 200;
};

const getOneEating = async({request, response}) => {
    const parts = request.url.pathname.split("/");
    const id = parts[3];
    response.body = await eatingServices.getOneNews(id);
}

const deleteEating = async({request, response}) => {
    const parts = request.url.pathname.split("/");
    const id = parts[3];
    await eatingServices.deleteNews(id);
    response.status = 200;
}
   
export { getEatings, setEating, getOneEating, deleteEating};