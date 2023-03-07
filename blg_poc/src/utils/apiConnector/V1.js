import { GET_LIMIT } from './const';
import store from 'store';

class V1 {
  constructor(axios, apiKey, group) {
    this.axios = axios;
    this.apiKey = apiKey;
    this.group = group;

    this.getAll = this.getAll.bind(this);
    this.getSingle = this.getSingle.bind(this);
    this.update = this.update.bind(this);
    this.create = this.create.bind(this);
    this.deleteAttachment = this.deleteAttachment.bind(this);
    this.addAttachment = this.addAttachment.bind(this);
    this.deleteSingle = this.deleteSingle.bind(this)
  }

  async getAll(data = { limit: GET_LIMIT }) {
    return await this.makeRequest({
      url: `/api/v1/targets/`,
      method: 'get',
      qs: {
        ...data,
        type: this.group,
      },
    });
  }

  async getSingle(id) {
    if (id) {
      return await this.makeRequest({
        url: `/api/v1/targets/${id}/`,
        method: 'get',
        qs: {
          type: this.group,
        },
      });
    }
  }

  async deleteSingle(id) {
    if (id) {
      "delete single called"
      return await this.makeRequest({
        url: `/api/v1/targets/${id}/`,
        method: 'delete',
        qs: {
          type: this.group,
        },
      });
    } else {
      console.log("No id provided")
    }
  }

  async update(id, data = {}) {
    return await this.makeRequest({
      url: `/api/v1/targets/${id}/`,
      method: 'patch',
      data,
      qs: {
        type: this.group,
      },
    });
  }

  async create(data = {}) {
    return await this.makeRequest({
      url: `/api/v1/targets/`,
      method: 'post',
      data: { ...data, type: this.group },
    });
  }

  async deleteAttachment(id) {
    return await this.makeRequest({
      url: `/api/v1/targetattachment/${id}/`,
      method: 'delete',
      qs: {},
    });
  }

  async addAttachment(file, id) {
    let data = new FormData()
    console.log('dataaaaa----- xD', data);

    data.append('attachment', file);
    data.append('target_instance', `/api/v1/targets/${id}/`);

    return await this.makeRequest({
      url: `/api/v1/targetattachment/`,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    });
  }

  async makeRequest({ method = 'get', url = '', data = {}, qs = {}, headers = {} }) {
    const res = {
      success: true,
    };

    let csrfToken = store.getState()?.user?.csrfToken;

    const queryString = new URLSearchParams({
      api_key: this.apiKey,
      type: this.group,
      ...qs,
    }).toString();

    try {
      res['payload'] = (
        await this.axios({
          method,
          url: `${url}?${queryString}`,
          data,
          headers: {
            'X-CSRFToken': csrfToken,
            ...headers,
          },
        })
      ).data;
    } catch (e) {
      res['success'] = false;
      res['msg'] = e;
      res["msg_body"] = e?.response?.data
    }
    return res;
  }
}

export default V1;
