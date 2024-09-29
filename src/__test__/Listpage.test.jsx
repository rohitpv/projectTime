import React from "react";
import App from "../App";
import { Provider } from "react-redux";
import store from "../store";
import { render, screen, fireEvent, within, waitFor, getByRole } from "@testing-library/react";


it("1. Default list page has 5 records", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  await waitFor(() => expect(screen.getByTestId("listpage")).toBeInTheDocument);
  const listElements = await screen.findAllByTestId("listitem");
  expect(listElements.length).toBe(5);
  
});

describe("2. Filter for Employee- Rohit and check if total records are equal to 3", async () => {
  beforeEach(async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await waitFor(() => expect(screen.getByTestId("listpage")).toBeInTheDocument);
    await waitFor(() => expect(screen.getAllByText("Sujatha Mallela")).toBeInTheDocument);
  });
  it("filter from default page", async () => {
    
    
    const memberDropDown = screen.getByTestId("memberDropDown");
    expect(memberDropDown).toBeInTheDocument();
    fireEvent.click(memberDropDown);
    
    const memberMenu =await screen.findAllByRole("menuitem");
    fireEvent.click(memberMenu[1]);
    
    await waitFor(() => expect(screen.getByTestId("listpage")).toBeInTheDocument, {
      timeout: 6000,
    });
    
    await waitFor(() => expect(screen.getByTestId("listpage")).toBeInTheDocument);
    const listElements = await screen.findAllByTestId("listitem");
    expect(listElements.length).toBe(3);
  });
});
describe("3. Filter for Employee- Padma Manda and should get message 'No records found'", async () => {
  beforeEach(async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    await waitFor(() => expect(screen.getByTestId("listpage")).toBeInTheDocument);
  });
  it("filter from default page", async () => {
    

    const memberDropDown = screen.getByTestId("memberDropDown");
    expect(memberDropDown).toBeInTheDocument();
    fireEvent.click(memberDropDown);
    
    const memberMenu =await screen.findAllByRole("menuitem"); // 5=index for Padma Manda
    fireEvent.click(memberMenu[5]);

    
    await waitFor(() => expect(screen.getByTestId("listpage")).toBeInTheDocument, {
      timeout: 6000,
    });

    
    await waitFor(() => expect(screen.getByTestId("message").textContent).toBe("No Records found"));
    
    
  });
});


it("4. Switch the browser language to your primary language and verify the list page shows in primary language.", async () => {
  global.navigator = {
    languages: ["te"],
  };


  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  let clockTime = await screen.findByTestId("clockTime");
  expect(clockTime).toBeInTheDocument;
  
  expect((await screen.findByTestId("clockTime")).textContent).toBe("సమయం");
  expect(await screen.findByText("చర్య")).toBeInTheDocument();
  expect(await screen.findByText("పేరు")).toBeInTheDocument();
  expect(await screen.findByText("సమయం నుండి")).toBeInTheDocument();
  
});

it("5. Switch the browser language to your secondary language and verify the list page shows in secondary language.", async () => {
  global.navigator = {
    languages: ["hi"],
  };

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  let clockTime = await screen.findByTestId("clockTime");
  expect(clockTime).toBeInTheDocument;
  
  expect(await screen.findByText("कार्रवाई")).toBeInTheDocument();
  expect(await screen.findByText("नाम")).toBeInTheDocument();
  expect(await screen.findByText("टिप्पणियाँ")).toBeInTheDocument();
  expect(await screen.findByText("समय से")).toBeInTheDocument();
  
});