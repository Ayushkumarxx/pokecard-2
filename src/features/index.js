import ComparePokemons from "./compare/Compare";
import DetailsPage from "./details/DetailsPage";
import FavoritesPage from "./favorites/Favorites";
import ListPage from "./listview/ListPage";
const routes = {
  home: ListPage,
  favorites: FavoritesPage,
  details: DetailsPage,
  compare:ComparePokemons

};
export default  routes;
