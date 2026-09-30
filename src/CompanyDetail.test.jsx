import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import CompanyDetail from "./CompanyDetail";
import JoblyApi from "./api";

vi.mock("./api");
beforeEach(() => vi.resetAllMocks());

test("company errors can be retried successfully", async () => {
  JoblyApi.getCompany.mockRejectedValueOnce(new Error("Offline")).mockResolvedValue({
    name: "Example", description: "Company details", jobs: [],
  });
  render(<MemoryRouter initialEntries={["/companies/example"]}>
    <Route path="/companies/:company"><CompanyDetail /></Route>
  </MemoryRouter>);
  expect(await screen.findByRole("alert")).toHaveTextContent("Offline");
  fireEvent.click(screen.getByRole("button", { name: "Try again" }));
  expect(await screen.findByRole("heading", { name: "Example" })).toBeInTheDocument();
  expect(screen.getByText("No open jobs at this company.")).toBeInTheDocument();
});
