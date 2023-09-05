import React, {useContext, useState} from 'react';

export class AccountConflictError {}
export class AuthenticationFailedError {}
export class RegistUserFailedError {}

interface ContextValueType {
  login: (
    userName: string,
    password: string,
  ) => Promise<void | AuthenticationFailedError>;
  logout: () => Promise<void>;
  userName: string;
  isLoggedIn: boolean;
}

export const UserContext = React.createContext<ContextValueType>(
  {} as ContextValueType,
);

export const useUserContext = () => useContext(UserContext);

type MyComponenProps = {
  children: React.PropsWithChildren;
};

const UserContextProvider: React.FC<MyComponenProps> = props => {
  const [userName, setUserName] = useState<string>('');

  const contextValue: ContextValueType = {
    login: async (userName, password) => {
      // TODO
      setUserName(userName);
    },
    logout: async () => {
      // TODO
      setUserName('');
    },
    userName,
    isLoggedIn: userName !== '',
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
