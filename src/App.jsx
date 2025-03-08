import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"

// Páginas
import HomePage from "./pages/HomePage"
import GameDetailsPage from "./pages/GameDetailsPage"
import TagsPage from "./pages/TagsPage"
import PublisherPage from "./pages/PublisherPage"
import PublishersSearchPage from "./pages/PublishersSearchPage"
import EventsPage from "./pages/EventsPage"
import MyEventsPage from "./pages/MyEventsPage"
import FavoritesPage from "./pages/FavoritesPage"
import JoinEventPage from "./pages/JoinEventPage"

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/:id" element={<GameDetailsPage />} />
          <Route path="/tags/:tag" element={<TagsPage />} />
          <Route path="/publisher/:publisher" element={<PublisherPage />} />
          <Route path="/buscarPublishers" element={<PublishersSearchPage />} />
          <Route path="/eventos" element={<EventsPage />} />
          <Route path="/mis-eventos" element={<MyEventsPage />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
          <Route path="/join-event/:eventId" element={<JoinEventPage />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App

