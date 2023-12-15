import React from "react";
import {UserContext} from "./UserContextUtils"
import { UserType } from "../utils/Types";

   type UserContextType = {
    user: UserType;
    setUser: React.Dispatch<React.SetStateAction<UserType>>;
   };
  
   export const useUserContext = (): UserContextType => {
    const context = React.useContext(UserContext);
    if (!context) {
      throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
   };