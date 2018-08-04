import 'whatwg-fetch';
import { stringify } from 'qs';
import {
  CONTENT_TYPE_APPLICATION_JSON,
  CONTENT_TYPE_FORM_DATA,
} from './constants';

export class RequestError extends Error {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
}

export const getRequest = (url, searchParams) => {
  let newURL = url;
  if (searchParams) {
    const newSearchParams = stringify(searchParams, { arrayFormat: 'indices' });
    newURL = `${url}?${newSearchParams}`;
  }
  return request(newURL, {
    method: 'GET',
  });
};

export const postRequest = (url, body, options) =>
  request(url, {
    ...options,
    body,
    method: 'POST',
  });

export const patchRequest = (url, body) =>
  request(url, {
    method: 'PATCH',
    body,
  });

export const putRequest = (url, body) =>
  request(url, {
    method: 'PUT',
    body,
  });

export const deleteRequest = (url, body) =>
  request(url, {
    method: 'DELETE',
    body,
  });

export const requestDownload = (
  url,
  downloadFileName = 'download',
  params = {
    method: 'GET',
    contentType: CONTENT_TYPE_APPLICATION_JSON,
  }
) => {
  const { method, contentType, ...customOptions } = params;
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  let userToken = '';
  if (currentUser) {
    userToken = currentUser.token ? currentUser.token : null;
  }

  const headers = {
    Authorization: `Bearer ${userToken}`,
  };

  if (contentType) {
    headers['Content-type'] = contentType;
  }

  const options = {
    ...customOptions,
    method,
    headers,
  };

  const newOptions = options;
  if (newOptions.body) {
    newOptions.body =
      contentType === CONTENT_TYPE_FORM_DATA
        ? newOptions.body
        : JSON.stringify(newOptions.body);
  }
  return fetch(url, newOptions)
    .then((response) => {
      if (response.status.toString().match(/^4/)) {
        throw new RequestError(`${response.status} Error`, response);
      }
      if (response.status.toString().match(/^5/)) {
        throw new RequestError(`${response.status} Error`, response);
      }
      return Promise.resolve(response.blob());
    })
    .then((blob) => {
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = downloadFileName;
      a.click();
      return downloadUrl;
    })
    .catch((error) => {
      throw new RequestError(error.message, { status: 500 });
    });
};

const request = (
  url,
  { contentType = CONTENT_TYPE_APPLICATION_JSON, ...customOptions }
) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  let userToken = '';
  if (currentUser) {
    userToken = currentUser.token ? currentUser.token : null;
  }

  const headers = {
    Authorization: `Bearer ${userToken}`,
  };

  if (contentType) {
    headers['Content-type'] = contentType;
  }

  const options = {
    ...customOptions,
    headers,
  };

  const newOptions = options;
  if (newOptions.body) {
    newOptions.body =
      contentType === CONTENT_TYPE_FORM_DATA
        ? newOptions.body
        : JSON.stringify(newOptions.body);
  }
  return fetch(url, newOptions)
    .then((response) => {
      if (response.status.toString().match(/^4/)) {
        throw new RequestError(`${response.status} Error`, response);
      }
      if (response.status.toString().match(/^5/)) {
        throw new RequestError(`${response.status} Error`, response);
      }
      return Promise.resolve(response.json());
    })
    .catch((error) => {
      throw new RequestError(error.message, { status: 500 });
    });
};
