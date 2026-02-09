import { Link, Route, Routes } from "react-router-dom";
import Characters from "./pages/Characters";
import CharacterDetails from "./pages/CharacterDetails";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="container">
      <header className="navbar">
        <Link className="brand" to="/">
          Rick &amp; Morty Explorer
        </Link>
      </header>

      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/characters/:id" element={<CharacterDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
