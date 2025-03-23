import React from "react";
import { StoreContext } from "../stores/Root";

function useStore() {
  const store = React.useContext(StoreContext);
  return store;
}

export default useStore;
