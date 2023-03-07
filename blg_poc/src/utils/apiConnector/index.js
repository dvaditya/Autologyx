import axios from 'axios';
import V1 from './V1';
import V2 from './V2';
import Any from './Any';
import Users from './Users';

export default ({ apiKey = null, resources }) => {
  const availableResources = {};
  var _axios = axios.create({
    baseURL:
      process.env.NODE_ENV === 'development'
        ? `http://localhost:${process.env.REACT_APP_PROXY_PORT}`
        : `${window.location.origin}`,
  });

  Object.keys(resources).map(function (res) {
    let resource = resources[res];
    let group = -1;
    let _apiKey = apiKey;
    if (!resource.hasOwnProperty('group')) {
      console.error(
        `API Connector has received a resource with no group ${res}`
      );
    } else {
      group = resource.group;
    }

    if (
      resource.hasOwnProperty('apiKey') &&
      process.env.NODE_ENV !== 'development'
    ) {
      _apiKey = resource.apiKey;
    }

    availableResources[res] = {
      v1: new V1(_axios, _apiKey, group),
      v2: new V2(_axios, _apiKey, group),
      any: new Any(_axios, _apiKey, group),
    };
  });

  // If global apiKey available then allow additional objects
  if (apiKey !== null) {
    availableResources.users = new Users(_axios, apiKey);
  }

  return availableResources;
};
