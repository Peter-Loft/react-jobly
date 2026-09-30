import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import JoblyApi from "./api";

vi.mock("./api");

const user = { username: "demo", firstName: "Demo", lastName: "User", email: "demo@example.com", applications: [1] };
const token = payload => `eyJhbGciOiJub25lIn0.${btoa(JSON.stringify(payload))}.test`;

beforeEach(() => {
  vi.resetAllMocks();
  localStorage.clear();
  JoblyApi.token = null;
  window.history.replaceState({}, "", "/");
});

test("visitors see the home page and account links", async () => {
  render(<App />);
  expect(await screen.findByRole("heading", { name: "Jobly" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Create an account" })).toHaveAttribute("href", "/signup");
  expect(JoblyApi.getUser).not.toHaveBeenCalled();
});

test.each([
  ["malformed", "not-a-token"],
  ["expired", token({ username: "demo", exp: 1 })],
])("%s stored tokens recover without a loading loop", async (_label, savedToken) => {
  localStorage.setItem("token", savedToken);
  render(<App />);
  expect(await screen.findByRole("alert")).toHaveTextContent("Please log in again");
  expect(localStorage.getItem("token")).toBeNull();
  expect(JoblyApi.token).toBeNull();
  expect(JoblyApi.getUser).not.toHaveBeenCalled();
});

test("a rejected session clears stale authentication and leaves login accessible", async () => {
  localStorage.setItem("token", token({ username: "demo" }));
  JoblyApi.getUser.mockRejectedValue(new Error("Unauthorized"));
  window.history.replaceState({}, "", "/profile");
  render(<App />);
  expect(await screen.findByLabelText("Password:")).toBeInTheDocument();
  expect(localStorage.getItem("token")).toBeNull();
  expect(screen.queryByText("Loading Jobly...")).not.toBeInTheDocument();
});

test("restores the user once and logout clears both storage and API authorization", async () => {
  localStorage.setItem("token", token({ username: "demo" }));
  JoblyApi.getUser.mockResolvedValue(user);
  render(<App />);
  expect(await screen.findByText("Welcome back, Demo")).toBeInTheDocument();
  expect(JoblyApi.getUser).toHaveBeenCalledTimes(1);
  fireEvent.click(screen.getByRole("link", { name: "Logout: demo" }));
  expect(localStorage.getItem("token")).toBeNull();
  expect(JoblyApi.token).toBeNull();
  expect(screen.getByLabelText("Password:")).toBeInTheDocument();
});

test("login verifies the user before completing the session", async () => {
  const savedToken = token({ username: "demo" });
  JoblyApi.loginUser.mockResolvedValue(savedToken);
  JoblyApi.getUser.mockResolvedValue(user);
  window.history.replaceState({}, "", "/login");
  render(<App />);
  fireEvent.change(await screen.findByLabelText("Username:"), { target: { value: "demo" } });
  fireEvent.change(screen.getByLabelText("Password:"), { target: { value: "example" } });
  fireEvent.click(screen.getByRole("button", { name: "Log in" }));
  expect(await screen.findByText("Welcome back, Demo")).toBeInTheDocument();
  expect(localStorage.getItem("token")).toBe(savedToken);
});

test("profile saves persist editable fields and update the shared user", async () => {
  localStorage.setItem("token", token({ username: "demo" }));
  JoblyApi.getUser.mockResolvedValue(user);
  JoblyApi.updateUser.mockResolvedValue({ ...user, firstName: "Updated" });
  window.history.replaceState({}, "", "/profile");
  render(<App />);
  fireEvent.change(await screen.findByLabelText("First name"), { target: { value: "Updated" } });
  fireEvent.click(screen.getByRole("button", { name: "Save changes" }));
  expect(await screen.findByText("Profile saved.")).toBeInTheDocument();
  expect(JoblyApi.updateUser).toHaveBeenCalledWith("demo", {
    firstName: "Updated", lastName: "User", email: "demo@example.com",
  });
  fireEvent.click(screen.getByRole("link", { name: "Jobly" }));
  expect(screen.getByText("Welcome back, Updated")).toBeInTheDocument();
});

test("profile save failures stay on the form and allow retry", async () => {
  localStorage.setItem("token", token({ username: "demo" }));
  JoblyApi.getUser.mockResolvedValue(user);
  JoblyApi.updateUser.mockRejectedValue(new Error("Unable to save"));
  window.history.replaceState({}, "", "/profile");
  render(<App />);
  fireEvent.click(await screen.findByRole("button", { name: "Save changes" }));
  expect(await screen.findByRole("alert")).toHaveTextContent("Unable to save");
  expect(screen.queryByText("Profile saved.")).not.toBeInTheDocument();
  await waitFor(() => expect(screen.getByRole("button", { name: "Save changes" })).toBeEnabled());
});

test("failed login shows an inline error and enables another attempt", async () => {
  JoblyApi.loginUser.mockRejectedValue(new Error("Invalid credentials"));
  window.history.replaceState({}, "", "/login");
  render(<App />);
  fireEvent.change(await screen.findByLabelText("Username:"), { target: { value: "demo" } });
  fireEvent.change(screen.getByLabelText("Password:"), { target: { value: "example" } });
  fireEvent.click(screen.getByRole("button", { name: "Log in" }));
  expect(await screen.findByRole("alert")).toHaveTextContent("Invalid credentials");
  expect(screen.getByRole("button", { name: "Log in" })).toBeEnabled();
});

test("pending profile saves disable duplicate submission", async () => {
  localStorage.setItem("token", token({ username: "demo" }));
  JoblyApi.getUser.mockResolvedValue(user);
  let finish;
  JoblyApi.updateUser.mockReturnValue(new Promise(resolve => { finish = resolve; }));
  window.history.replaceState({}, "", "/profile");
  render(<App />);
  fireEvent.click(await screen.findByRole("button", { name: "Save changes" }));
  expect(screen.getByRole("button", { name: "Saving..." })).toBeDisabled();
  await act(async () => finish(user));
  expect(screen.getByText("Profile saved.")).toBeInTheDocument();
});

test("signup starts a verified session", async () => {
  const savedToken = token({ username: "demo" });
  JoblyApi.registerUser.mockResolvedValue(savedToken);
  JoblyApi.getUser.mockResolvedValue(user);
  window.history.replaceState({}, "", "/signup");
  render(<App />);
  fireEvent.change(await screen.findByLabelText("Username:"), { target: { value: "demo" } });
  fireEvent.change(screen.getByLabelText("Password:"), { target: { value: "example" } });
  fireEvent.change(screen.getByLabelText("First:"), { target: { value: "Demo" } });
  fireEvent.change(screen.getByLabelText("Last:"), { target: { value: "User" } });
  fireEvent.change(screen.getByLabelText("Email:"), { target: { value: "demo@example.com" } });
  fireEvent.click(screen.getByRole("button", { name: "Sign up" }));
  expect(await screen.findByText("Welcome back, Demo")).toBeInTheDocument();
  expect(localStorage.getItem("token")).toBe(savedToken);
});

test("a late profile response cannot sign the user back in after logout", async () => {
  localStorage.setItem("token", token({ username: "demo" }));
  JoblyApi.getUser.mockResolvedValue(user);
  let finish;
  JoblyApi.updateUser.mockReturnValue(new Promise(resolve => { finish = resolve; }));
  window.history.replaceState({}, "", "/profile");
  render(<App />);
  fireEvent.click(await screen.findByRole("button", { name: "Save changes" }));
  fireEvent.click(screen.getByRole("link", { name: "Logout: demo" }));
  await act(async () => finish({ ...user, firstName: "Updated" }));
  expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
  expect(localStorage.getItem("token")).toBeNull();
  expect(JoblyApi.token).toBeNull();
});
