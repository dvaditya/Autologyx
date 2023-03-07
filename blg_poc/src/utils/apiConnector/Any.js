import { GET_LIMIT } from './const';

class V1 {
  constructor(axios, apiKey, group) {
    this.axios = axios;
    this.apiKey = apiKey;
    this.group = group;

    this.getAll = this.getAll.bind(this);
    this.getSingle = this.getSingle.bind(this);
    this.update = this.update.bind(this);
    this.create = this.create.bind(this);
  }

  async getAll(data = { limit: GET_LIMIT }, search = true) {
    // To allow ordering we need to prevent query string to use V1 and V2 both in prod and development
    const inDevelopment = process.env.NODE_ENV === 'development';
    const apiKeyObj = inDevelopment ? { api_key: this.apiKey } : {};
    const parameters = {};
    let url = `/api/v2/targetgroup/${this.group}/`;

    if (inDevelopment) {
      parameters.type = this.group;
      url = `/api/v1/targets/`;
    } else if (search) {
      url = `/api/v2/targetsearch/${this.group}/`;
    }

    const { success, ...rest } = await this.makeRequest({
      method: 'get',
      url,
      qs: {
        ...data,
        ...apiKeyObj,
        ...parameters,
      },
    });

    if (success) {
      return {
        payload: inDevelopment ? rest.payload.objects : rest.payload.results,
        success,
        total: inDevelopment
          ? rest.payload.meta.total_count
          : rest.payload.count,
      };
    } else {
      return { success, ...rest };
    }
  }

  async getSingle(id) {
    return await this.makeRequest({
      url: `/api/v1/targets/${id}/`,
      method: 'get',
      qs: {
        type: this.group,
        api_key: this.apiKey,
      },
    });
  }

  async update(id, data = {}) {
    return await this.makeRequest({
      url: `/api/v1/targets/${id}/`,
      method: 'patch',
      data,
      qs: {
        type: this.group,
        api_key: this.apiKey,
      },
    });
  }

  async create(data = {}) {
    return await this.makeRequest({
      url: `/api/v1/targets/`,
      method: 'post',
      data: {
        ...data,
        type: this.group,
      },
      qs: {
        api_key: this.apiKey,
      },
    });
  }

  async makeRequest({ method = 'get', url = '', data = {}, qs = {} }) {
    const res = {
      success: true,
    };

    const queryString = new URLSearchParams({
      ...qs,
    }).toString();

    try {
      res['payload'] = (
        await this.axios({
          method,
          url: `${url}?${queryString}`,
          data,
        })
      ).data;
    } catch (e) {
      res['success'] = false;
      res['msg'] = e;
    }
    return res;
  }
}

export default V1;
