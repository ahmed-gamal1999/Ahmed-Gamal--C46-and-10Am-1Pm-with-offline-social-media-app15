import { createContext, useState } from "react";

export let UserData = createContext();

export function UserDataProvider(props) {
  const [Token, setToken] = useState(localStorage.getItem("userToken"));
  const [ID, setID] = useState(localStorage.getItem("userID"));

  return (
    <UserData.Provider value={{ Token, setToken, ID, setID }}>
      {props.children}
    </UserData.Provider>
  );
}
