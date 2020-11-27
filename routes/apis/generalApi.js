import * as generalServices from "../../services/generalServices.js";

const getGenerals = async({response}) => {
    response.body = await generalServices.getAllGeneralInfo();
};

const setGeneral = async({request, response}) => {
    const body = request.body({type: 'json'});
    const document = await body.value;
    const newGeneral = {
        date: document.date,
        screenTime: document.screenTime,
        mood: document.mood,
        }
    await generalServices.setGeneralInfo(newGeneral);
    response.status = 200;
};

const getOneGeneral = async({request, response}) => {
    const parts = request.url.pathname.split("/");
    const id = parts[3];
    response.body = await generalServices.getOneGeneralInfo(id);
}

const deleteGeneral = async({request, response}) => {
    const parts = request.url.pathname.split("/");
    const id = parts[3];
    await generalServices.deleteOneGeneralInfo(id);
    response.status = 200;
}
   
export { getGenerals, setGeneral, getOneGeneral, deleteGeneral};