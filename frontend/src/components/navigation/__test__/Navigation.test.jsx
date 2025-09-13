import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navigation from "../index";
import { setScreenWidth } from "../../../setupTests";
import userEvent from "@testing-library/user-event";
import * as re from "./testRedux"
import { expect, vi } from "vitest";

test("renders desktop navigation on wide screen", () => {
  setScreenWidth(1200); 
  render(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>
  );

  expect(screen.getByText(/pastquiz ai/i)).toBeInTheDocument();
});

test("spy on  useDispatch", async() => {
    const mockFn = vi.fn()
    vi.spyOn(re, "useDispatch").mockReturnValue(mockFn)
  setScreenWidth(1200); 
  render(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>
  );
  const signoutButtton = screen.getByText(/sign out/i)
  expect(signoutButtton).toBeInTheDocument();
  await userEvent.click()
  expect(mockFn).toHaveBeenCalled()
//   expect(mockFn).toBeCalledWith()
});

test("renders desktop navigation on wide screen", () => {
  setScreenWidth(1200); 
  render(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>
  );

  expect(screen.getByText(/view/i)).toBeInTheDocument();
});

test("renders mobile menu on small screen", async() => {
  setScreenWidth(700); 
  render(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>
  );
  const button = screen.getByRole("button")
  expect(button).toBeInTheDocument(); 
  await userEvent.click(button)
  expect(screen.getByText(/view/i)).toBeInTheDocument()
 
});

test("checks if view is render on small screen when hanmburgericon is clicked", async() => {
  setScreenWidth(700); 
  render(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>
  );
  const button = screen.getByRole("button")
  await userEvent.click(button)
  expect(screen.getByText(/view/i)).toBeInTheDocument()
    await userEvent.click(button)
   expect(screen.getByRole("button")).toBeInTheDocument()
 
});
