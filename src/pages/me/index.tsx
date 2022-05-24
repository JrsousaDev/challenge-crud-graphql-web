import { useAuth } from "../../contexts/AuthContext";

export function Me() {
  const { user, signOut } = useAuth();

  return (
    <>
      <div>Seja bem-vindo(a) {user?.name} - {user?.email} </div>
      <button onClick={signOut}>
        Deslogar
      </button>
    </>
  )
}