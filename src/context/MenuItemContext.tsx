import { createContext } from "react";
import { MenuItem } from "../utils/types";

const MenuItemContext = createContext<MenuItem[]>([]);

export default MenuItemContext
