import { GET_LIMIT } from './const';

class Users {
  constructor(axios, apiKey) {
    this.axios = axios;
    this.apiKey = apiKey;
    this.getAll = this.getAll.bind(this);
    this.getSingle = this.getSingle.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
  }

  async getAllUsers() {
    let result;
    const qs = new URLSearchParams({
      api_key: this.apiKey,
      limit: 1000,
    }).toString();

    try {
      const { data: { results }, status } = await this.axios({
        method: 'get',
        url: `/api/v2/systemusers/?${qs}`,
      });

      if (status === 200) {
        result = results
          .filter(i => !i.email.includes('+DEL+'))
          .map(result => ({...result, company_name: result?.company_name?.split(',')}))
      }
    } catch(e) {
      console.log(e)
    }

    return result;
  }

  async getAll(payload = { limit: GET_LIMIT }) {
    const res = {
      success: true,
    };
    const qs = new URLSearchParams({
      api_key: this.apiKey,
      ...payload,
    }).toString();

    try {
      res['payload'] = (
        await this.axios({
          method: 'get',
          url: `/api/v1/systemuser/?${qs}`,
        })
      ).data;
    } catch (e) {
      res['success'] = false;
      res['msg'] = e;
    }
    return res;
  }

  async getSingle(id) {
    const res = {
      success: true,
    };
    const qs = new URLSearchParams({
      api_key: this.apiKey,
    }).toString();

    try {
      res['payload'] = (
        await this.axios({
          method: 'get',
          url: `/api/v1/systemuser/${id}/?${qs}`,
        })
      ).data;
    } catch (e) {
      res['success'] = false;
      res['msg'] = e;
    }
    return res;
  }

  get() {}
}

export default Users;
