import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Hero } from "./sections/Hero";
import { Collection } from "./sections/Collection";
import { BrandExperience } from "./sections/BrandExperience";
import { Craftsmanship } from "./sections/Craftsmanship";
import { About } from "./sections/About";

function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Collection />
        <BrandExperience />
        <Craftsmanship />
        <About />
      </main>
      <Footer />
    </>
  );
}

export default App;
