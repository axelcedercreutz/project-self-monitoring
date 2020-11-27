import * as physicalServices from "../../services/physicalServices.js";

const getPhysicals = async({response}) => {
    response.body = await physicalServices.getAllPhysicalInfo();
};

const setPhysical = async({request, response}) => {
    const body = request.body({type: 'json'});
    const document = await body.value;
    const newPhysical = {
        date: document.date,
        sport: document.sport,
        duration: document.duration,
    }
    await physicalServices.setPhysicalInfo(newPhysical);
    response.status = 200;
};

const getOnePhysical = async({request, response}) => {
    const parts = request.url.pathname.split("/");
    const id = parts[3];
    response.body = await physicalServices.getOneNews(id);
}

const deletePhysical = async({request, response}) => {
    const parts = request.url.pathname.split("/");
    const id = parts[3];
    await physicalServices.deleteNews(id);
    response.status = 200;
}
   
export { getPhysicals, setPhysical, getOnePhysical, deletePhysical};