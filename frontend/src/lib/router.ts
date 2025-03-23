import { Location, NavigateFunction } from "react-router-dom";

export const history: {
  navigate: NavigateFunction | null;
  location: Location | null;
} = {
  navigate: null,
  location: null,
};
