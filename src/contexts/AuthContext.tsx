import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_SESSION_USER, GET_USER_IN_ID } from "../services/userService";
import { useNavigate } from 'react-router-dom';
import jwtDecode from "jwt-decode";

interface IUser {
  _id: string
  email: string;
  name: string;
  token?: string;
}

type User = {
  _id: string;
  name: string;
  email: string;
  token?: string;
} | null;

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn: (data: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user: User,
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
}



export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>(null);
  const isAuthenticated = !!user;

  const [createSession] = useMutation(CREATE_SESSION_USER);
  const Navigate = useNavigate();

  const { 'challengeGraphQL.token': token } = parseCookies();

  let decodedToken: any;
  if(token) {
    decodedToken = jwtDecode(token);
  } else {
    decodedToken = false;
  }

  const { loading, error, data } = useQuery(GET_USER_IN_ID, {
    variables: {
      id: decodedToken._id ?? ""
    },
  });

  const cachedUserData = useMemo(() => {
    if (loading || error) return null

    return data
  }, [loading, error, data]);

  useEffect(() => {
    if(token) {
      setUser({
        _id: cachedUserData?.readOneUserID?._id,
        name: cachedUserData?.readOneUserID?.name,
        email: cachedUserData?.readOneUserID?.email,
      })
    } else {
      setUser(null);
      signOut();
    }
  }, [cachedUserData, isAuthenticated])
 
  const signIn = async ({ email: emailClient, password }: SignInCredentials) => {
    try {
      const createSessionInput = { email: emailClient, password }

      const response = await createSession({
        variables: {
          createSessionInput
        }
      })

      const user: IUser = response.data.createSession;

      const { _id, email, name, token } = user;

      if (!token || !user) {
        throw "E-mail ou senha incorreta!"
      }

      setCookie(undefined, 'challengeGraphQL.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/"
      });

      setUser({
        _id,
        name,
        email
      });

      Navigate('/me')
    } catch (error) {
      throw error
    }
  }

  const signOut = async () => {
    destroyCookie(undefined, 'challengeGraphQL.token');
  
    Navigate('/')
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        signOut,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);