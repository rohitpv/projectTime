import React from "react";
import App from "../App";
import { Provider } from "react-redux";
import store from "../store";
import { render, screen, fireEvent, within, waitFor, getByRole, findByRole } from "@testing-library/react";

it("1. click on the create button and verify the create page has popped up without any data and save and goto list buttons are only available. Submit the form without any information and check all formik/yup errors are shown on the UI.", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() => expect(screen.getByTestId("listpage")).toBeInTheDocument);

  const Action = await screen.findByTestId("Action");
  expect(Action).toBeInTheDocument();
  fireEvent.click(Action);

  const Save = await screen.findByTestId("Save");
  expect(Save).toBeInTheDocument();
  fireEvent.click(Save);
  const messages = await screen.findAllByText(/is a required field/i);
  expect(messages.length).toBe(8);
});

it("2. Saving without changing any details on Edit page gives message 'No Changes to make'", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() => expect(screen.getByTestId("listpage")).toBeInTheDocument);

  const listElements = await screen.findAllByTestId("listitem");
  await waitFor(async () => {
    const detailsMenu = await screen.findAllByTestId("detailsMenu");
    fireEvent.click(detailsMenu[0]);
  }, 10000);

  await waitFor(async () => {
    const editMenus = await screen.findByTestId("editMenu");
    fireEvent.click(editMenus);
  }, 10000);

  const Save = await screen.findByTestId("Save");
  expect(Save).toBeInTheDocument();

  // Wait for the value to be non-null
  const recordId = await screen.findByPlaceholderText("#");
  expect(recordId.value).not.toBe("#");
  fireEvent.click(Save);
  const messages = await screen.findByTestId("messages");
  await waitFor(() => {
    expect(messages.textContent).toBeTruthy();
  });

  expect(messages.textContent).toBe("No changes to make ");
});

it("3. click on the create button and verify the create page has popped up without any data. Fill the form and click save, and check whether you receive a new record id and successful message.", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() => expect(screen.getByTestId("listpage")).toBeInTheDocument);

  const Action = await screen.findByTestId("Action");
  expect(Action).toBeInTheDocument();
  fireEvent.click(Action);

  const Save = await screen.findByTestId("Save");
  expect(Save).toBeInTheDocument();
  

  let employeeName = await screen.findByPlaceholderText("Name");
  fireEvent.click(employeeName);
  fireEvent.change(employeeName, { target: { value: "Padma Manda" } });
  fireEvent.click(await screen.findByRole("option"));
  

  let project = await screen.findByPlaceholderText("Project Name");
  fireEvent.click(project);
  fireEvent.change(project, { target: { value: "ACC - RI Digitization" } });
  fireEvent.click(await screen.findByRole("option"));
  

  let task = await screen.findByPlaceholderText("Task Name");
  fireEvent.click(task);
  fireEvent.change(task, { target: { value: "SUPPORT - Support" } });
  fireEvent.click(await screen.findByRole("option"));
  

  let date = await screen.findByPlaceholderText("date");
  fireEvent.click(date);
  fireEvent.change(date, { target: { value: "2000-01-01" } });
  

  let note = await screen.findByPlaceholderText("Task Note");
  fireEvent.click(note);
  fireEvent.change(note, { target: { value: "Work In Progress" } });
  

  let totalTime = await screen.findByPlaceholderText("Total Time");
  fireEvent.click(totalTime);
  fireEvent.change(totalTime, { target: { value: "08:00" } });
  

  let tFrom = await screen.findByPlaceholderText("Time From");
  fireEvent.click(tFrom);

  fireEvent.click(Save);

  const recordId = await screen.findByPlaceholderText("#");
  expect(recordId.value).not.toBe("#");
  

  const messages = await screen.findByTestId("messages");
  expect(messages.textContent).toBe("Record added successfully");
});
it("4. Enter both 'time duration' and 'total time' and check for yup errors", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() => expect(screen.getByTestId("listpage")).toBeInTheDocument);
  
  const Action = await screen.findByTestId("Action");
  expect(Action).toBeInTheDocument();
  fireEvent.click(Action);
  
  const Save = await screen.findByTestId("Save");
  expect(Save).toBeInTheDocument();
  

  let employeeName = await screen.findByPlaceholderText("Name");
  fireEvent.click(employeeName);
  fireEvent.change(employeeName, { target: { value: "Padma Manda" } });
  fireEvent.click(await screen.findByRole("option"));
  
  let project = await screen.findByPlaceholderText("Project Name");
  fireEvent.click(project);
  fireEvent.change(project, { target: { value: "ACC - RI Digitization" } });
  fireEvent.click(await screen.findByRole("option"));
  
  
  let task = await screen.findByPlaceholderText("Task Name");
  fireEvent.click(task);
  fireEvent.change(task, { target: { value: "SUPPORT - Support" } });
  fireEvent.click(await screen.findByRole("option"));
  
  let date = await screen.findByPlaceholderText("date");
  fireEvent.click(date);
  fireEvent.change(date, { target: { value: "2000-01-01" } });
  
  
  let note = await screen.findByPlaceholderText("Task Note");
  fireEvent.click(note);
  fireEvent.change(note, { target: { value: "Work In Progress" } });
  
  let totalTime = await screen.findByPlaceholderText("Total Time");
  fireEvent.click(totalTime);
  fireEvent.change(totalTime, { target: { value: "08:00" } });
  
  
  let tFrom = await screen.findByPlaceholderText("Time From");
  fireEvent.click(tFrom);
  fireEvent.change(tFrom, { target: { value: "08:00" } });
  
  let tTo = await screen.findByPlaceholderText("Time To");
  fireEvent.click(tTo);
  fireEvent.change(tTo, { target: { value: "17:00" } });
  fireEvent.click(Save);
  
  const messages = await screen.findByText(/Total-time cannot be entered with time duration/i);
  expect(messages).toBeInTheDocument();

});
it("5. To edit a record change the information in all the fields to make a successful update and verify the response for the changes.", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() => expect(screen.getByTestId("listpage")).toBeInTheDocument);
  

  const listElements = await screen.findAllByTestId("listitem");
  await waitFor(async () => {
    const detailsMenu = await screen.findAllByTestId("detailsMenu");
    fireEvent.click(detailsMenu[0]); // index for rohit's record
  }, 10000);
  

  await waitFor(async () => {
    const editMenus = await screen.findByTestId("editMenu");
    fireEvent.click(editMenus);
  }, 10000);
  

  const Save = await screen.findByTestId("Save");
  expect(Save).toBeInTheDocument();
  

  // Wait for the value to be non-null
  const recordId = await screen.findByPlaceholderText("#");
  expect(recordId.value).not.toBe("#");

  let employeeName = await screen.findByPlaceholderText("Name");
  fireEvent.click(employeeName);
  fireEvent.change(employeeName, { target: { value: "Padma Manda" } });
  fireEvent.click(await screen.findByRole("option"));
  

  let date = await screen.findByPlaceholderText("date");
  fireEvent.click(date);
  fireEvent.change(date, { target: { value: "2000-01-01" } });
  

  fireEvent.click(Save);
  

  expect((await screen.findByPlaceholderText("#")).value).not.toBe("#");
  

  const messages = await screen.findByTestId("messages");
  expect(messages.textContent).toBe("Record updated successfully");
});

// "Duplicate entry not allowed "
it("6. Edit a record and Fill the form to generate a duplicate message and click save, and check whether you receive a duplicate error message.", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() => expect(screen.getByTestId("listpage")).toBeInTheDocument);
  

  const listElements = await screen.findAllByTestId("listitem");
  await waitFor(async () => {
    const detailsMenu = await screen.findAllByTestId("detailsMenu");
    fireEvent.click(detailsMenu[4]); // index for Sai Kalyan's record
  }, 10000);
  

  await waitFor(async () => {
    const editMenus = await screen.findByTestId("editMenu");
    fireEvent.click(editMenus);
  }, 10000);
  

  const Save = await screen.findByTestId("Save");
  expect(Save).toBeInTheDocument();
  

  // Wait for the value to be non-null
  const recordId = await screen.findByPlaceholderText("#");
  expect(recordId.value).not.toBe("#");

  let employeeName = await screen.findByPlaceholderText("Name");
  fireEvent.click(employeeName);
  fireEvent.change(employeeName, { target: { value: "Rohit Panchumarthy" } });
  fireEvent.click(await screen.findByRole("option"));
  

  let date = await screen.findByPlaceholderText("date");
  fireEvent.click(date);
  fireEvent.change(date, { target: { value: "2023-11-10" } });
  

  let project = await screen.findByPlaceholderText("Project Name");
  fireEvent.click(project);
  fireEvent.change(project, { target: { value: "ACC" } });
  fireEvent.click(await screen.findByRole("option"));
  

  let task = await screen.findByPlaceholderText("Task Name");
  fireEvent.click(task);
  fireEvent.change(task, { target: { value: "SUPPORT - Support" } });
  fireEvent.click(await screen.findByRole("option"));
  

  fireEvent.click(Save);
  

  expect((await screen.findByPlaceholderText("#")).value).not.toBe("#");
  

  const messages = await screen.findByTestId("messages");
  expect(messages.textContent).toBe("Duplicate entry not allowed ");
});

// Time Overlap error
it("7. Edit a record and Fill the form to generate a Time Overlap message and click save, and check whether you receive a Time overlap not allowed error message. **", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() => expect(screen.getByTestId("listpage")).toBeInTheDocument);
  

  const listElements = await screen.findAllByTestId("listitem");
  
  await waitFor(async () => {
    const detailsMenu = await screen.findAllByTestId("detailsMenu");
    fireEvent.click(detailsMenu[3]); // index for sai kalyan's record
  }, 10000);

  await waitFor(async () => {
    const editMenus = await screen.findByTestId("editMenu");
    fireEvent.click(editMenus);
  }, 10000);

  const Save = await screen.findByTestId("Save");
  expect(Save).toBeInTheDocument();

  // Wait for the value to be non-null
  const recordId = await screen.findByPlaceholderText("#");
  expect(recordId.value).not.toBe("#");

  let employeeName = await screen.findByPlaceholderText("Name");
  fireEvent.click(employeeName);
  fireEvent.change(employeeName, { target: { value: "Sujatha" } });
  fireEvent.click(await screen.findByRole("option"));
  

  let date = await screen.findByPlaceholderText("date");
  fireEvent.click(date);
  fireEvent.change(date, { target: { value: "2023-10-17" } });
  

  fireEvent.click(Save);
  

  expect((await screen.findByPlaceholderText("#")).value).not.toBe("#");
  

  const messages = await screen.findByTestId("messages");
  
  expect(messages.textContent).toBe("Time overlap not allowed ");
  
});

it("8. Change all the information on the page and click on switch to view, verify all information is reset back to the original data.", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() => expect(screen.getByTestId("listpage")).toBeInTheDocument);

  const listElements = await screen.findAllByTestId("listitem");
  await waitFor(async () => {
    const detailsMenu = await screen.findAllByTestId("detailsMenu");
    fireEvent.click(detailsMenu[0]); // index for rohit's record
  }, 10000);

  await waitFor(async () => {
    const editMenus = await screen.findByTestId("editMenu");
    fireEvent.click(editMenus);
  }, 10000);

  const Save = await screen.findByTestId("Save");
  expect(Save).toBeInTheDocument();

  // Wait for the value to be non-null
  const recordId = await screen.findByPlaceholderText("#");
  expect(recordId.value).not.toBe("#");

  let employeeName = await screen.findByPlaceholderText("Name");
  const oldValue = employeeName.value;
  fireEvent.click(employeeName);
  fireEvent.change(employeeName, { target: { value: "Padma Manda" } });
  fireEvent.click(await screen.findByRole("option"));

  const changedValue = employeeName.value;
  // click on view
  const switchToView = await screen.findByTestId("switchToView");
  fireEvent.click(switchToView);
  employeeName = await screen.findByPlaceholderText("Name");
  const newValue = employeeName.value;

  expect(oldValue).toBe(newValue);
});

it("9. Click on the Delete button and make sure a prompt appears, click confirm, data removes from the list and control goes to list page", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() => expect(screen.getByTestId("listpage")).toBeInTheDocument);

  const listElements = await screen.findAllByTestId("listitem");
  await waitFor(async () => {
    const detailsMenu = await screen.findAllByTestId("detailsMenu");
    fireEvent.click(detailsMenu[0]); // index for rohit's record
  }, 10000);

  await waitFor(async () => {
    const editMenus = await screen.findByTestId("editMenu");
    fireEvent.click(editMenus);
  }, 10000);

  // Wait for the value to be non-null
  const recordId = await screen.findByPlaceholderText("#");
  expect(recordId.value).not.toBe("#");

  const deleteButton = await screen.findByTestId("deleteButton");
  expect(deleteButton).toBeInTheDocument();

  fireEvent.click(deleteButton);

  await waitFor(() => {
    const Dialog = screen.queryByRole("dialog");
    expect(Dialog).toBeInTheDocument();
  });
  const noButton = await screen.findByRole("button", { name: "Yes" });
  fireEvent.click(noButton);
  waitFor(async () => {
    expect(await screen.findByTestId("listpage")).toBeInTheDocument();
  });
});

it("10. Click on the Delete button and make sure a prompt appears, click cancel and verify the prompt closes.", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() => expect(screen.getByTestId("listpage")).toBeInTheDocument);

  const listElements = await screen.findAllByTestId("listitem");
  await waitFor(async () => {
    const detailsMenu = await screen.findAllByTestId("detailsMenu");
    fireEvent.click(detailsMenu[0]); // index for rohit's record
  }, 10000);

  await waitFor(async () => {
    const editMenus = await screen.findByTestId("editMenu");
    fireEvent.click(editMenus);
  }, 10000);

  // Wait for the value to be non-null
  const recordId = await screen.findByPlaceholderText("#");
  expect(recordId.value).not.toBe("#");

  const deleteButton = await screen.findByTestId("deleteButton");
  expect(deleteButton).toBeInTheDocument();

  fireEvent.click(deleteButton);
  waitFor(async () => {
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });
  
  const noButton = await screen.findByRole("button", { name: "No" });
  fireEvent.click(noButton);

  await waitFor(() => {
    const closedDialog = screen.queryByRole("dialog");
    expect(closedDialog).toBeNull();
  });
  
  
  
});


it("11. Switch the browser language to your primary language and verify the detail page shows in primary language.", async () => {
  global.navigator = {
    languages: ["te"],
  };

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() => expect(screen.getByTestId("listpage")).toBeInTheDocument);

  const Action = await screen.findByTestId("Action");
  expect(Action).toBeInTheDocument();
  fireEvent.click(Action);

  const Save = await screen.findByTestId("Save");
  expect(Save).toBeInTheDocument();
  

  expect((await screen.findByTestId("employee")).textContent.includes("ఉద్యోగి")).toBe(true);
  expect((await screen.findByTestId("timelogId")).textContent.includes("టైమ్‌లాగ్ గుర్తింపు")).toBe(true);



});
it("12. Switch the browser language to your secondary language and verify the detail page shows in secondary language.", async () => {
  global.navigator = {
    languages: ["hi"],
  };

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() => expect(screen.getByTestId("listpage")).toBeInTheDocument);

  const Action = await screen.findByTestId("Action");
  expect(Action).toBeInTheDocument();
  fireEvent.click(Action);

  const Save = await screen.findByTestId("Save");
  expect(Save).toBeInTheDocument();
  

  expect((await screen.findByTestId("employee")).textContent.includes("कर्मचारी")).toBe(true);
  expect((await screen.findByTestId("timelogId")).textContent.includes("समय अभिलेख")).toBe(true);

});
