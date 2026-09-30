import axios from "axios";
import JoblyApi from "./api";

vi.mock("axios");

beforeEach(() => { vi.resetAllMocks(); JoblyApi.token = null; });

test("public requests omit authorization and send credentials only in the body", async () => {
  axios.mockResolvedValue({ data: { token: "token" } });
  await expect(JoblyApi.loginUser({ username: "demo", password: "example" })).resolves.toBe("token");
  expect(axios).toHaveBeenCalledWith(expect.objectContaining({
    headers: {}, method: "post", data: { username: "demo", password: "example" },
  }));
});

test("search uses query parameters so reserved characters remain part of the search", async () => {
  axios.mockResolvedValue({ data: { jobs: [] } });
  JoblyApi.token = "session";
  await JoblyApi.jobsSearch("R&D + C#");
  expect(axios).toHaveBeenCalledWith(expect.objectContaining({
    url: "http://localhost:3001/jobs", params: { title: "R&D + C#" },
    headers: { Authorization: "Bearer session" },
  }));
});

test("empty company search omits filters", async () => {
  axios.mockResolvedValue({ data: { companies: [] } });
  await JoblyApi.companiesSearch("");
  expect(axios).toHaveBeenCalledWith(expect.objectContaining({ params: {} }));
});

test("profile updates send only editable fields", async () => {
  axios.mockResolvedValue({ data: { user: { firstName: "Updated" } } });
  await JoblyApi.updateUser("demo", {
    firstName: "Updated", lastName: "User", email: "demo@example.com", isAdmin: true, username: "other",
  });
  expect(axios).toHaveBeenCalledWith(expect.objectContaining({
    method: "patch", url: "http://localhost:3001/users/demo",
    data: { firstName: "Updated", lastName: "User", email: "demo@example.com" },
  }));
});

test("network failures produce a useful error without requiring a response", async () => {
  axios.mockRejectedValue(new Error("Network Error"));
  await expect(JoblyApi.getJobs()).rejects.toThrow("Unable to reach Jobly");
});

test("server validation errors preserve the message and status", async () => {
  axios.mockRejectedValue({ response: { status: 400, data: { error: { message: ["Invalid email", "Missing name"] } } } });
  await expect(JoblyApi.getJobs()).rejects.toMatchObject({ message: "Invalid email Missing name", status: 400 });
});
