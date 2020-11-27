import * as studyServices from "../../services/studyServices.js";

const getStudys = async({response}) => {
    response.body = await studyServices.getNews();
};

const setStudy = async({request, response}) => {
    const body = request.body({type: 'json'});
    const document = await body.value;
    const newNews = {
        title: document.title,
        content: document.content
    }
    await studyServices.setNews(newNews);
    response.status = 200;
};

const getOneStudy = async({request, response}) => {
    const parts = request.url.pathname.split("/");
    const id = parts[3];
    response.body = await studyServices.getOneNews(id);
}

const deleteStudy = async({request, response}) => {
    const parts = request.url.pathname.split("/");
    const id = parts[3];
    await studyServices.deleteNews(id);
    response.status = 200;
}
   
export { getStudys, setStudy, getOneStudy, deleteStudy};