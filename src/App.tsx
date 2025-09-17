import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./views/MainPage";
import MoviePage from "./views/MoviePage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AppContainer from "./components/styled/AppContainer";
import ScrollToTop from "./components/ScrollToTop";
import loadable from "@loadable/component";

// redux
import { store } from "./store/redux/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const Loading = () => <h1>Loading</h1>;

const LoadableMoviePage = loadable(() => import("./views/MoviePage"), {
  fallback: <Loading />,
});

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppContainer>
          <Router>
            <Header></Header>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/movie/:id" element={<LoadableMoviePage />} />
            </Routes>
            <ScrollToTop />
          </Router>
          <Footer></Footer>
        </AppContainer>
      </QueryClientProvider>
    </Provider>
  );
}
