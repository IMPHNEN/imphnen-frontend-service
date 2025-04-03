import { FC, ReactElement, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { InputField } from '@imphnen-frontend-service/ui/molecules';

export const Components: FC = (): ReactElement => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { email, password };
      console.log(payload); // for debugging
      const response = await postLogin(payload);

      const { access_token, refresh_token } = response.data.token;
      sessionStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      console.log('Login successful:', response); // for debugging
      navigate('/dashboard');
    } catch (error) {
      console.log('Login error:', error); // for debugging
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white border border-primary-200 shadow-lg p-[60px] text-center flex flex-col justify-items-stretch gap-8 rounded-2xl">
        <img src="/logos/logo.svg" alt="" className="h-[70px] w-auto" />
        <h1 className="text-primary-500 text-p1 font-semibold">
          Welcome to IMPHNEN Backoffice
        </h1>
        <InputField
          label="Email"
          placeholder="Masukkan Email"
          type="email"
          size="lg"
          className="w-full"
        />
        <InputField
          label="Password"
          placeholder="Masukkan password"
          type="password"
          size="lg"
          className="w-full"
        />
        <Button onClick={() => navigate('/dashboard')}>Login</Button>
      </div>
    </div>
  );
};

export default Components;
