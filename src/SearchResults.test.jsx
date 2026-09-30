import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import JobList from "./JobList";
import CompanyList from "./CompanyList";
import JoblyApi from "./api";

vi.mock("./api");
beforeEach(() => vi.resetAllMocks());

test.each([
  ["jobs", JobList, "jobsSearch", "Search jobs by title", "No jobs found."],
  ["companies", CompanyList, "companiesSearch", "Search companies by name", "No companies found."],
])("%s recover from a failed fetch and support an empty search", async (_name, Component, method, label, empty) => {
  JoblyApi[method].mockRejectedValueOnce(new Error("Offline")).mockResolvedValue([]);
  render(<MemoryRouter><Component /></MemoryRouter>);
  expect(await screen.findByRole("alert")).toHaveTextContent("Offline");
  fireEvent.submit(screen.getByRole("search"));
  expect(await screen.findByText(empty)).toBeInTheDocument();
  expect(JoblyApi[method]).toHaveBeenLastCalledWith("");
  expect(screen.getByLabelText(label)).toBeInTheDocument();
});

test("Enter submits a trimmed search and slow earlier results cannot overwrite it", async () => {
  let finishFirst;
  JoblyApi.jobsSearch
    .mockReturnValueOnce(new Promise(resolve => { finishFirst = resolve; }))
    .mockResolvedValueOnce([{ id: 2, title: "New result", equity: "0" }]);
  render(<JobList />);
  fireEvent.change(screen.getByLabelText("Search jobs by title"), { target: { value: "  R&D + C#  " } });
  fireEvent.submit(screen.getByRole("search"));
  expect(await screen.findByText("New result")).toBeInTheDocument();
  expect(JoblyApi.jobsSearch).toHaveBeenLastCalledWith("R&D + C#");
  await act(async () => finishFirst([{ id: 1, title: "Stale result", equity: "0" }]));
  expect(screen.queryByText("Stale result")).not.toBeInTheDocument();
  expect(screen.getByText("New result")).toBeInTheDocument();
});
