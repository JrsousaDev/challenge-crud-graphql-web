import * as S from './styles';

import { FormEvent, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export function Home() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmitLogin(event: FormEvent) {
    event.preventDefault();
    setError("")

    try {
      await signIn({ email, password });
      setError("")
    } catch (error) {
      setError('Email ou senha incorreta, tente novamente...');
    }

  }

  return (
    <S.BoxContainer>
      <S.ContainerForm onSubmit={handleSubmitLogin}>

        {error &&
          <div 
            style={{
              color: 'red',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: '1.5rem'
            }}
          >
            {error}
          </div>
        }

        <div>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="example@example.com"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            placeholder="123"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <S.ButtonSubmit
          type="submit"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login'}
        </S.ButtonSubmit>
      </S.ContainerForm>
    </S.BoxContainer>
  )
}