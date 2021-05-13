import api from "../utils/RequestUtils";
import Resource, { SUCCESSFUL, LOADING, FAILED } from '../model/Resource';

export const States = { SUCCESSFUL, LOADING, FAILED };

export function getRoutes() {
    return execute((resource) => api.get('routes')
        .then((response) => {
            if (!response.data) {
                resource.postState(FAILED, response);
                return;
            }

            const routes = response.data.data;
            resource.postState(SUCCESSFUL, routes);
        })
        .catch((error) => {
            resource.postState(FAILED, error);
        }));
}

export function getRoute(id) {
    return execute((resource) => api.get(`route/${id}`)
        .then((response) => {
            if (!response.data) {
                resource.postState(FAILED, response);
                return;
            }

            const routes = response.data.data;
            resource.postState(SUCCESSFUL, routes);
        })
        .catch((error) => {
            resource.postState(FAILED, error);
        }));
}

export function postRoute(data) {
    return execute((resource) => api
        .post("route", data)
        .then((response) => {
            if (!response.data) {
                resource.postState(FAILED, response);
                return;
            }

            resource.postState(SUCCESSFUL, response.data.data);
        })
        .catch((error) => {
            resource.postState(FAILED, error);
        }));
}

export function putRoute(id, data) {
    return execute((resource) => api
        .put(`route/${id}`, data)
        .then((response) => {
            if (!response.data) {
                resource.postState(FAILED, response);
                return;
            }

            resource.postState(SUCCESSFUL, response.data.data);
        })
        .catch((error) => {
            resource.postState(FAILED, error);
        }));
}

export function deleteRoute(id) {
    return execute((resource) => api.delete(`route/${id}`).then(response => {
        if (!response.data) {
            resource.postState(FAILED, response);
            return;
        }
        resource.postState(SUCCESSFUL, response.data.data);
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