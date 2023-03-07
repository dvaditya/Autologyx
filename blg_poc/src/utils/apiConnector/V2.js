import { GET_LIMIT } from './const';
import store from 'store';

class V2 {
  constructor(axios, apiKey, group) {
    this.axios = axios;
    this.apiKey = apiKey;
    this.group = group;

    this.getAll = this.getAll.bind(this);
    this.getSingle = this.getSingle.bind(this);
    this.update = this.update.bind(this);
    this.deleteSingle = this.deleteSingle.bind(this)
  }

  async getAll(data = { limit: GET_LIMIT }) {
    return await this.makeRequest({
      url: `/api/v2/targetsearch/${this.group}/`,
      method: 'get',
      qs: {
        ...data,
      },
    });
  }

  async getSingle(id) {
    return await this.makeRequest({
      url: `/api/v2/targetgroup/${this.group}/`,
      method: 'get',
      qs: {
        id,
        type: this.group,
      },
    });
  }

  async deleteSingle(id) {
    return await this.makeRequest({
      url: `/api/v2/targetgroup/${this.group}/`,
      method: 'delete',
      qs: {
        id,
        type: this.group,
      },
    });
  }

  async getSingleWithQuery(id, query) {
    return await this.makeRequest({
      url: `/api/v2/targetgroup/${this.group}/`,
      method: 'get',
      qs: {
        field_client_id: id,
        ...query,
      },
    });
  }
  async getFields() {
    return await this.makeRequest({
      url: `/api/v2/targetsearch/${this.group}/target_fields/`,
      method: 'get',
      qs: {},
    });
  }

  async update(id, data = {}, files = []) {
    const formData = new FormData();

    if (files.length) {
      files.map(newFile => {
        let { file, fieldName } = newFile;
        let fileName = file.name;

        // Set filename if explicitly set.
        if (newFile.hasOwnProperty('fileName')) {
          let splitFileName = fileName.split('.');
          fileName = `${newFile.fileName}.${
            splitFileName[splitFileName.length - 1]
          }`;

          file = new File([file], fileName, { type: file.type });
        }

        formData.append(fieldName, file);
      });
    }

    for (const [field, value] of Object.entries(data)) {
      formData.append(field, value);
    }

    return await this.makeRequest({
      url: `/api/v2/targetgroup/${this.group}/`,
      method: 'patch',
      data: data,
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
      qs: {
        id,
        type: this.group,
      },
    });
  }

  async updateFormData(id, data = {}, files = []) {
    const formData = new FormData();

    if (files.length) {
      files.map(newFile => {
        let { file, fieldName } = newFile;
        let fileName = file.name;

        // Set filename if explicitly set.
        if (newFile.hasOwnProperty('fileName')) {
          let splitFileName = fileName.split('.');
          fileName = `${newFile.fileName}.${
            splitFileName[splitFileName.length - 1]
          }`;

          file = new File([file], fileName, { type: file.type });
        }

        formData.append(fieldName, file);
      });
    }

    for (const [field, value] of Object.entries(data)) {
      formData.append(field, value);
    }

    return await this.makeRequest({
      url: `/api/v2/targetgroup/${this.group}/`,
      method: 'patch',
      data: formData,
      headers: {
       'Content-Type': 'multipart/form-data',
       },
      qs: {
        id,
        type: this.group,
      },
    });
  }

  async upload(id, { field, file }) {
    const formData = new FormData();

    formData.append(field, file, file.name);

    return await this.makeRequest({
      url: `/api/v2/targetgroup/${this.group}/`,
      method: 'patch',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      qs: {
        id,
        type: this.group,
      },
    });
  }

  async makeRequest({
    method = 'get',
    url = '',
    data = {},
    qs = {},
    headers = {},
  }) {
    const res = {
      success: true,
    };

    const queryString = new URLSearchParams({
      api_key: this.apiKey,
      ...qs,
    }).toString();

    let csrfToken = store.getState()?.user?.csrfToken;

    try {
      res['payload'] = (
        await this.axios({
          method,
          url: `${url}?${queryString}`,
          data,
          headers: {
            ...headers,
            'X-CSRFToken': csrfToken,
          },
        })
      ).data;
    } catch (e) {
      res['success'] = false;
      res['msg'] = e;
    }
    return res;
  }
}

export default V2;
