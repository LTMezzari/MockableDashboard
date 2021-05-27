import api from "../utils/RequestUtils";
import Resource, { SUCCESSFUL, LOADING, FAILED } from '../model/Resource';

export const States = { SUCCESSFUL, LOADING, FAILED };

// ------------------------------------ Routes CRUD

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
        .post('route', data)
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

// -------------------------------- Importers

export function postSwaggerImporter(url) {
    return execute((resource) => api.post('extract/swagger', {
        url,
    }).then(response => {
        if (!response.data) {
            resource.postState(FAILED, response);
            return;
        }
        resource.postState(SUCCESSFUL, response.data.data);
    }).catch((error) => {
        resource.postState(FAILED, error);
    }));
}

export function postPostmanImporter(body) {
    return execute((resource) => api.post('extract/postman', {
        ...body,
    }).then(response => {
        if (!response.data) {
            resource.postState(FAILED, response);
            return;
        }
        resource.postState(SUCCESSFUL, response.data.data);
    }).catch((error) => {
        resource.postState(FAILED, error);
    }));
}

// -------------------------------- Converters

export function getRoutesPostmanConverter(name, grouped) {
    return execute((resource) => api.get(`converter/postman${addQueries({
        key: 'name',
        value: name,
    },{
        key: 'aggroup',
        value: grouped,
    })}`).then(response => {
        if (!response.data) {
            resource.postState(FAILED, response);
            return;
        }
        resource.postState(SUCCESSFUL, response.data);
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

function addQueries(...data) {
    let result = '';
    for (const {key, value} of data) {
        const query = addQuery(key, value);
        if (!query) {
            continue;
        }
        result += `${result.length === 0 ? '?' : '&'}${query}`;
    }
    return result;
}

function addQuery(key, value) {
    if (!value) {
        return undefined;
    }
    return `${key}=${value}`
}