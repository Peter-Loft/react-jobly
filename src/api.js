import axios from "axios";

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3001").replace(/\/$/, "");

/** The single boundary between the React UI and the Jobly REST API. */
class JoblyApi {
  static token = null;

  static async request(endpoint, data = {}, method = "get") {
    const headers = JoblyApi.token ? { Authorization: `Bearer ${JoblyApi.token}` } : {};
    try {
      const response = await axios({
        url: `${BASE_URL}/${endpoint}`, method, headers, timeout: 15000,
        ...(method === "get" ? { params: data } : { data }),
      });
      return response.data;
    } catch (err) {
      const message = err.response?.data?.error?.message;
      const error = new Error(
        Array.isArray(message) ? message.join(" ") :
          typeof message === "string" ? message :
            err.response ? "The request failed. Please try again." :
              "Unable to reach Jobly. Check your connection and try again."
      );
      error.status = err.response?.status;
      throw error;
    }
  }

  static async loginUser(details) {
    return (await this.request("auth/token", details, "post")).token;
  }

  static async registerUser(details) {
    return (await this.request("auth/register", details, "post")).token;
  }

  static async getUser(username) {
    return (await this.request(`users/${encodeURIComponent(username)}`)).user;
  }

  static async updateUser(username, { firstName, lastName, email }) {
    return (await this.request(`users/${encodeURIComponent(username)}`,
      { firstName, lastName, email }, "patch")).user;
  }

  static async getCompany(handle) {
    return (await this.request(`companies/${encodeURIComponent(handle)}`)).company;
  }

  static async getJobs() {
    return (await this.request("jobs")).jobs;
  }

  static async jobsSearch(title) {
    return (await this.request("jobs", title ? { title } : {})).jobs;
  }

  static async getCompanies() {
    return (await this.request("companies")).companies;
  }

  static async companiesSearch(name) {
    return (await this.request("companies", name ? { name } : {})).companies;
  }
}

export default JoblyApi;
