import { logger } from '@oas-tools/commons';
import axios from 'axios';

export function requestUrl(_, res) {
    if (Array.isArray(res.locals.oas.body)) {
        return Promise.all(res.locals.oas.body.map(request))
        .then((responses) => {
            res.status(200).send(responses.map((response) => {
                return {code: response.status, data: response.data};
            }));
        }).catch((errors) => {
            res.status(500).send(errors.map((error) => {
                return {code: error.response.status, data: error.response.data};
            }));
        });
    } else {
        return request(res.locals.oas.body)
        .then((response) => {
            res.status(response.status).send({code: response.status, data: response.data});
        }).catch((error) => {
            res.status(error.response.status).send({code: error.response.status, data: error.response.data});
        });;
    }
}

function request(requestBody) {
    const { url, method, headers, body} = requestBody;
    
    logger.debug(`Requesting ${method?.toUpperCase() ?? 'GET'}: ${url}`);
    logger.debug(`Headers: ${JSON.stringify(headers, null, 2)}`);
    logger.debug(`Body: ${JSON.stringify(body, null, 2)}`);

    return axios({
        method: method?.toUpperCase() ?? 'GET',
        url: `${url}`,
        data: body,
        headers: headers
    });
}