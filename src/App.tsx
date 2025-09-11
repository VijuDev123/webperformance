import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./views/MainPage";
import MoviePage from "./views/MoviePage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AppContainer from "./components/styled/AppContainer";
import ScrollToTop from "./components/ScrollToTop";

// redux
import { store } from "./store/redux/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppContainer>
          <Router>
            <Header></Header>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/movie/:id" element={<MoviePage />}></Route>
            </Routes>
            <ScrollToTop />
          </Router>
          <Footer></Footer>
        </AppContainer>
      </QueryClientProvider>
    </Provider>
  );
}
