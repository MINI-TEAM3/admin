import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Btn from '@/components/Buttons/Btn';
import SignUpValidation from '@/lib/Validation/validation';
import { useForm } from 'react-hook-form';
import { FiAlertCircle } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { getMyPage, login } from '@/lib/api';
import { LoginBody } from '@/lib/types';
import { useSetRecoilState } from 'recoil';
import { AdminState } from '@/states/stateAdmin';
import backgroundLogo from '/backgroundlogo.png';
import logowhithtext from '/logowithtext.png';
import { MESSAGE_TEXTS } from '@/constants/message';
import { LOGIN_TEXTS } from '@/constants/login';
import { BUTTON_TEXTS } from '@/constants/buttons';

const Login = () => {
  const setAdminData = useSetRecoilState(AdminState);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const saveTokenToLocalstorage = (token: string) => {
    localStorage.setItem('authToken', token);
  };

  useEffect(() => {
    localStorage.getItem('authToken') && navigate('/duty');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAdminInfo = async () => {
    const res = await getMyPage();
    try {
      setAdminData(res.item);
    } catch {
      console.error(MESSAGE_TEXTS.getAdminInfoConsoleError);
    }
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginBody>();

  const onSubmit = async (data: LoginBody) => {
    const validationErrors = SignUpValidation(data);

    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([field, message]) => {
        if (field === 'email' || field === 'password') {
          setError(field, { type: 'manual', message });
        }
      });
    } else {
      try {
        const response = await login({ email: data.email, password: data.password });
        console.log(response);
        if (response && response.data.success) {
          setLoginError('');
          const token = response.headers.authorization;
          saveTokenToLocalstorage(token);
          await getAdminInfo();
          navigate('/duty');
        } else {
          setLoginError(MESSAGE_TEXTS.loginError);
          console.error(MESSAGE_TEXTS.loginConsoleError);
        }
      } catch (error) {
        setLoginError(MESSAGE_TEXTS.loginError);
        console.error(MESSAGE_TEXTS.loginConsoleError, error);
      }
    }
  };

  return (
    <Container>
      <ImgContainer1 />
      <Textwrap>
        <span>{LOGIN_TEXTS.title}</span>
      </Textwrap>
      <ImgContainer2 />

      <Wrap>
        <h1>{LOGIN_TEXTS.hello}</h1>
        <FormWrap onSubmit={handleSubmit(onSubmit)} name="loginForm">
          <InputContainer>
            <div className="inputTitle">{LOGIN_TEXTS.emailInputTitle}</div>
            <input type="email" placeholder={LOGIN_TEXTS.emailPlacehoder} {...register('email')} />
            {errors.email && (
              <InfoBox>
                <FiAlertCircle />
                <span className="info-text">{errors.email.message}</span>
              </InfoBox>
            )}
          </InputContainer>
          <InputContainer>
            <div className="inputTitle">{LOGIN_TEXTS.passwordInputTitle}</div>
            <input type="password" placeholder={LOGIN_TEXTS.passwordPlacehoder} {...register('password')} />
            {errors.password && (
              <InfoBox>
                <FiAlertCircle />
                <span className="info-text">{errors.password.message}</span>
              </InfoBox>
            )}
            {loginError && (
              <InfoBox>
                <FiAlertCircle />
                <span className="info-text">{loginError}</span>
              </InfoBox>
            )}
          </InputContainer>
          <InputContainer>
            <Btn content={BUTTON_TEXTS.login} />
          </InputContainer>
        </FormWrap>
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: right;
  align-items: center;
  height: 100%;
  padding: 60px;
`;
const ImgContainer1 = styled.div`
  width: 1050px;
  height: 400px;
  padding: 0 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${backgroundLogo});
  position: absolute;
  top: unset;
  bottom: 0;
  left: 0;
`;
const ImgContainer2 = styled.div`
  width: 300px;
  height: 400px;
  padding: 0 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${logowhithtext});
  position: absolute;
  top: unset;
  bottom: 580px;
  left: 100px;
`;
const Textwrap = styled.div`
  color: ${props => props.theme.white};
  font-size: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: absolute;
  top: unset;
  bottom: 650px;
  left: 100px;
`;
const Wrap = styled.div`
  z-index: 9;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 600px;
  height: 100%;
  border-radius: 8px;
  background-color: ${props => props.theme.white};
  h1 {
    font-weight: 700;
    font-size: 32px;
    margin-bottom: 32px;
  }
  .linkto {
    font-weight: 700;
    color: ${props => props.theme.primary};
  }
`;

const FormWrap = styled.form`
  height: fit-content;
`;

const InputContainer = styled.div`
  .inputTitle {
    font-family: 'ABeeZee', sans-serif;
    font-size: 14px;
    margin-bottom: 8px;
  }
  button {
    margin-top: 62px;
  }
  &:first-child {
    margin-bottom: 16px;
  }
`;

const InfoBox = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  color: red;
  font-size: 12px;
  .info-text {
    margin-left: 8px;
  }
`;

export default Login;
