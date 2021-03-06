import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN

  // static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  //   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  //   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
  static token = "";


  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Login user returns ... */

  static async loginUser(userDetails) {
    let res = await this.request('auth/token',
    userDetails,
    "post"
    );
    //Returns JWT Token ""
    return res.token;
  }

  /** Registers user and returns JWT */

  static async registerUser(userDetails) {
    let res = await this.request('auth/register',
      userDetails,
      "post"
    );
    //Returns JWT Token ""
    return res.token;
  }

  /** Returns infomration about specific user */

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // obviously, you'll add a lot here ...

  /** Get every job object */

  static async getJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  }

  /** Get every job object which matches search param */

  static async jobsSearch(param) {
    let res = await this.request(`jobs?title=${param}`);
    return res.jobs;
  }

  /** Get every company object. */

  static async getCompanies() {
    let res = await this.request(`companies`);
    return res.companies;
  }

  /** Get every company object which matches search param. */

  static async companiesSearch(param) {
    let res = await this.request(`companies?name=${param}`);
    return res.companies;
  }

  //Create functino for User PATCH request

}

export default JoblyApi;