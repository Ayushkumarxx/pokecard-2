/**
 * Exports utility module
 *
 * This module exports various components, images, and pages used throughout the application.
 */

/**
 *pages
 */

/**
 * components
 */
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import PokemonCard from "../components/PokemonCard";
import NoResults from "../components/NoResults";

/**
 * Image assets
 */
import logo from "../../assets/logo.png";
import pokeBall from "../../assets/pokeball.png";


let Exports = {
  pages: {},

  images: {
    logo: logo,
    pokeBall: pokeBall,
  },

  components: {
    navbar: Navbar,
    searchBar: SearchBar,
    pokemonCard: PokemonCard,
    noResults: NoResults,

  },
};

export default Exports;
