import { UserType } from "../utils/Types";
import React from 'react';
   
   type UserContextType = {
    user: UserType;
    setUser: React.Dispatch<React.SetStateAction<UserType>>;
   };
   
   const UserContext = React.createContext<UserContextType>({
    user: {
      id: 0,
      name: '',
      email: '',
      bio: '',
      photo: ''
    },
    setUser: () => {},
   });
   
   export {UserContext};