import {api} from "./Api";

export default class templates {
    static getAllTemplates() {
        return api.get('templates/all')
    }

    static getSingleTemplates(id) {
        return api.get(`templates/single/${id}`)
    }
}