import {api} from "./Api";

export default class templates {
    static getAllTemplates() {
        return api.get('templates/all')
    }
}