import React from "react";
import App from "../App";
import { Provider } from "react-redux";
import store from "../store";
import { render, screen, fireEvent, within, waitFor, getByRole } from "@testing-library/react";



describe("1. Clicking on Project Time resets filtered results", async () => {
  beforeEach(async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    await waitFor(() => expect(screen.getAllByText("Project Time")).toBeInTheDocument);
    await waitFor(() => expect(screen.getByTestId("listpage")).toBeInTheDocument);
  });
  it("filter from default page and click Project Time", async () => {
    
    const memberDropDown = screen.getByTestId("memberDropDown");
    expect(memberDropDown).toBeInTheDocument();
    fireEvent.click(memberDropDown);
    const memberMenu = await screen.findAllByRole("menuitem");
    fireEvent.click(memberMenu[1]);
    await waitFor(() => expect(screen.getByTestId("listpage")).toBeInTheDocument, {
      timeout: 6000,
    });
    await waitFor(() => expect(screen.getByTestId("listpage")).toBeInTheDocument);
    let listElements = await screen.findAllByTestId("listitem");
    expect(listElements.length).toBe(3);
    

    // click on project time
    await waitFor(() => expect(screen.getAllByText("Project Time")).toBeInTheDocument);
    const projectTime = screen.getByTestId("projectTime");
    fireEvent.click(projectTime);
    
    
    // wait  for default list page
    await waitFor(() => expect(screen.getByTestId("listpage")).toBeInTheDocument, {
      timeout: 6000,
    });
    await waitFor(() => expect(screen.getByTestId("listpage")).toBeInTheDocument);
    listElements = await screen.findAllByTestId("listitem");
    await waitFor(() => expect(listElements.length).toBe(5));
    
  });
});

it("2. Switch the browser language to your primary language and verify the navigation items show in secondary language when transaltion in primary language is not available.", async () => {
  global.navigator = {
    languages: ["te","hi"],
  };

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() => expect(screen.getByTestId("timelog")).toBeInTheDocument);
  
  
  expect((await screen.findByTestId("timelog")).textContent).toBe("समय अभिलेख");
});
it("3. Interchange primary and secondary languages prefrence order and verify the navigation items show in primary language when transaltion in secondary language is not available.", async () => {
  global.navigator = {
    languages: ["hi","te"],
  };

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() => expect(screen.getByTestId("timeSummary")).toBeInTheDocument);
  
  
  expect((await screen.findByTestId("timeSummary")).textContent).toBe("సమయం సారాంశం");
});
it("4. Switch the browser language to your primary language and verify the navigation couple of items shows in default (english) language when transaltion in primary language is not available.", async () => {
  global.navigator = {
    languages: ["te","hi"],
  };

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() => expect(screen.getByTestId("vacation")).toBeInTheDocument);
  
  
  expect((await screen.findByTestId("vacation")).textContent).toBe("Vacation");
});