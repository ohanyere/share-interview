import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navigation from "../index";
import { setScreenWidth } from "../../../setupTests";
import userEvent from "@testing-library/user-event";
import * as redux from "./testRedux"
import { expect, vi } from "vitest";
import { renderWithProvider } from "../../../utilis/test.utils";


test("renders desktop navigation on wide screen", () => {
  setScreenWidth(1200);

  const { store } = renderWithProvider(<Navigation />, {
    preloadedState: {
      auth: {
        user: { name: "Test" },
        isSucess: true,
      },
    },
  });

  expect(screen.getByText(/pastquiz ai/i)).toBeInTheDocument();

});

test("sign out dispatches logout action", async () => {
  const mockDispatch = vi.fn();
  vi.spyOn(redux, "useDispatch").mockReturnValue(mockDispatch);
  vi.spyOn(redux, "useSelector").mockReturnValue({ user: { id: 1, name: "francis" } });

   const { store } = renderWithProvider(<Navigation />, {
    preloadedState: {
      auth: { user: { id: 1, name: "francis" }, isSucess: true }
    }
  });

  const btn = screen.getByRole("button", { name: /sign out/i });
  await userEvent.click(btn);

  expect(mockDispatch).toHaveBeenCalled();
});

test("sign out clears user", async () => {
  const { store } = renderWithProvider(<Navigation />, {
    preloadedState: {
      auth: { user: { id: 1, name: "francis" }, isSucess: true }
    }
  });

  const btn = screen.getByRole("button", { name: /sign out/i });
  await userEvent.click(btn);

  expect(store.getState().auth.user).toBeNull();
});


test("second spy on  useDispatch", async() => {
    const mockFn = vi.fn()
    vi.spyOn(redux, "useDispatch").mockReturnValue(mockFn)
  setScreenWidth(1200); 
  const {store} = renderWithProvider(<Navigation/>, {
    preloadedState : {
      auth : {
        user : {name:"francis", email : "francis@gmail.com"}
      }
    }
  })
 
  const signoutButtton = screen.getByText(/sign out/i)
  expect(signoutButtton).toBeInTheDocument()
 
  
  // expect(signoutButtton).toBeInTheDocument();
  // await userEvent.click(signoutButtton)
  // console.log(store.getState().auth.user);
  
  // // expect(mockFn).toHaveBeenCalled()
  // expect(signinButtton).toBeInTheDocument()
//   expect(mockFn).toBeCalledWith()
});
test("renders desktop navigation on wide screen", () => {
  setScreenWidth(1200); 
  const {store} = renderWithProvider(<Navigation/>, {
    preloadedState : {
      auth : {
        user : {name:"francis", email : "francis@gmail.com"}
      }
    }
  })

  // expect(screen.getByText(/questions/i)).toBeInTheDocument();
});

test("renders mobile menu on small screen", async() => {
  setScreenWidth(700); 
  const {store} = renderWithProvider(<Navigation/>, {
    preloadedState : {
      auth : {
        user : {name:"francis", email : "francis@gmail.com"}
      }
    }
  })
  const button = screen.getByRole("button")
  expect(button).toBeInTheDocument(); 
  await userEvent.click(button)
  expect(screen.getByText(/share questions/i)).toBeInTheDocument()
 
});

// test("checks if view is render on small screen when hanmburgericon is clicked", async() => {
//   setScreenWidth(700); 
//   render(
//     <MemoryRouter>
//       <Navigation />
//     </MemoryRouter>
//   );
//   const button = screen.getByRole("button")
//   await userEvent.click(button)
//   expect(screen.getByText(/question/i)).toBeInTheDocument()
//     await userEvent.click(button)
//    expect(screen.getByRole("button")).toBeInTheDocument()
 
// }

// );
