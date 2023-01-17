import React, { useState } from "react";
import loginImg from "../../assets/images/login_img.svg";
import logoImg from "../../assets/images/logo.png";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  SMain,
  SForm,
  SImgSection,
  SContainer,
  SSNSContainer,
  SInputContainer,
  SEmailFontAwesomeIcon,
  SEmailInput,
  SPasswordInput,
  SLoginButton,
  SNaverContainer,
  SKakaoContainer,
  SGoogleContainer,
  SMainContainer,
  SSignUpButton,
  SFindPassword,
  SCancelButton
} from "./styles";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  outline: 'none',
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmpty, setIsEmpty] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleMoveToSignUp = () => {
    navigate("/signup");
  };
  
  const handleOpen = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setOpen(true)
    } else {
      // api 로직 작성해야 함
      navigate('/')
    }

  };

  const handleClose = () => setOpen(false);

  const handleModalText = () => {
    if (!email) return '이메일을 입력해주세요.'
    if (!password) return '비밀번호를 입력해주세요.'
  }

  return (
    <SMain>
      <SMainContainer>
        <div>
        <NavLink to={"/"}>
          <img src={logoImg} alt="logo_img" />
        </NavLink>

        </div>
        <SImgSection>
          <h1>Welcome Back!</h1>
          <img src={loginImg} alt="login_img" />
        </SImgSection>
        <SForm>
          <SContainer>
            <h1>로그인</h1>
            <SInputContainer>
              <SEmailInput
                className={email ? "active__input" : ""}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="이메일을 입력해주세요"
              />
              <SEmailFontAwesomeIcon
                className={email ? "active__icon" : ""}
                icon={faEnvelope}
              />
            </SInputContainer>
            <SInputContainer>
              <SPasswordInput
                className={password ? "active__input" : ""}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="비밀번호를 입력해주세요"
              />
              <SEmailFontAwesomeIcon
                className={password ? "active__icon" : ""}
                icon={faLock}
              />
            </SInputContainer>
            <SFindPassword>
              <span>비밀번호 찾기</span>
            </SFindPassword>
            <SLoginButton type="submit" onClick={(e) => handleOpen(e)}>로그인</SLoginButton>
            <SSignUpButton onClick={handleMoveToSignUp}>회원가입</SSignUpButton>
            <SSNSContainer>
              <SNaverContainer>
                <button>N</button>
              </SNaverContainer>
              <SKakaoContainer>
                <button>K</button>
              </SKakaoContainer>
              <SGoogleContainer>
                <button>G</button>
              </SGoogleContainer>
            </SSNSContainer>
          </SContainer>
        </SForm>
      </SMainContainer>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography sx={{textAlign: 'center', marginTop: '32px', fontFamily: "KIMM_Bold"}} id="transition-modal-title" variant="h6" component="h2">
              {email ? password ? '': '비밀번호를 입력해주세요.' : '아이디를 입력해주세요.'}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <SCancelButton onClick={(e) => setOpen(false)}>확인</SCancelButton>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </SMain>
  );
};

export default Login;
