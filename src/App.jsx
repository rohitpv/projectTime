import Navbar from "./components/Navbar";
import ListPage from "./components/ListPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./components/Details";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { IntlProvider } from "react-intl";
import hindi from "./translations/hi.json";
import telugu from "./translations/te.json";
import english from "./translations/en-US.json";
import { FormattedMessage } from "react-intl";
const languages = ["te", "en-US", "hi"];
let lang, message;

const theme = createTheme();
theme.typography.h3 = {
  typography: {
    fontFamily: ["serif"].join(","),
  },
};
const setLanguage = (lang) => {
  if (lang == "te") return telugu;
  else if (lang == "hi") return hindi;
  else if (lang == "en-US") return english;
};
export const displayMessage = (value) => {
  // let locales = global.navigator.languages;
  let locales = navigator.languages;
  if (value == "") return <br />;
  for (let locale of locales) {
    if (languages.indexOf(locale) != -1) {
      lang = locale;
      message = setLanguage(lang);
      if (message[value]) break;
    }
  }

  return (
    <IntlProvider locale={lang} messages={message}>
      <FormattedMessage id={value} defaultMessage={value} />
    </IntlProvider>
  );
};
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<ListPage />} />
            <Route path="/project-record/:id" element={<Details />} />
            <Route path="/project-record/" element={<Details />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
