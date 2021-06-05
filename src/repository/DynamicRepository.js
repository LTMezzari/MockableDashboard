import api, { baseURL } from "../utils/RequestUtils";
import Resource, { SUCCESSFUL, LOADING, FAILED } from '../model/Resource';

export const States = { SUCCESSFUL, LOADING, FAILED };

export function testMethod(method, path, body, headers) {
    return execute((resource) => api({
        headers: headers,
        url: path,
        data: body,
        baseURL,
        method,
    }).then((response) => {
        resource.postState(SUCCESSFUL, response);
    }).catch((error) => {
        resource.postState(FAILED, error);
    }));
}

function execute(block) {
    const resource = new Resource();
    try {
        block(resource);
    } catch (error) {
        resource.postState(FAILED, error);
    }
    return resource;
}