import React from "react";
import { styled } from "styled-components";
import { Button } from "@mui/material";
import { styled as styledMui } from "@mui/material/styles";

import CloseSvg from "../assets/icons/close.svg";
import viberIco from "../assets/icons/viber.png";
import telegramIco from "../assets/icons/telegram.svg";
import whatsappIco from "../assets/icons/whatsapp.svg";

export const SocialMediaModal = ({
  phones,
  closeModal,
  telegram,
  setTelegram,
  viber,
  setViber,
  whatsapp,
  setWhatsapp,
}) => {
  const addSocialMedia = (it, soc) => {
    if (soc === "viber") {
      if (viber.find((item) => item === it)) {
        setViber(viber.filter((item) => item !== it));
      } else {
        setViber([...viber, it]);
      }
    } else if (soc === "telegram") {
      if (telegram.find((item) => item === it)) {
        setTelegram(telegram.filter((item) => item !== it));
      } else {
        setTelegram([...telegram, it]);
      }
    }
    if (soc === "whatsapp") {
      if (whatsapp.find((item) => item === it)) {
        setWhatsapp(whatsapp.filter((item) => item !== it));
      } else {
        setWhatsapp([...whatsapp, it]);
      }
    }
  };
  return (
    <Wrapper>
      <ModalWindow>
        <Title>Додати соціальні мережі</Title>
        <CloseBtn onClick={closeModal}>
          <img src={CloseSvg} alt="Close" />
        </CloseBtn>
        <FormWrapper>
          {phones.map((it, index) => {
            return (
              <Item key={index}>
                <h3>{it}</h3>
                <div className="buttons">
                  <button onClick={() => addSocialMedia(it, "viber")}>
                    <img
                      src={viberIco}
                      alt="viber"
                      style={
                        viber.find((item) => item === it)
                          ? { opacity: 1 }
                          : { opacity: 0.5 }
                      }
                    />
                  </button>
                  <button onClick={() => addSocialMedia(it, "telegram")}>
                    <img
                      src={telegramIco}
                      alt="telegram"
                      style={
                        telegram.find((item) => item === it)
                          ? { opacity: 1 }
                          : { opacity: 0.5 }
                      }
                    />
                  </button>
                  <button onClick={() => addSocialMedia(it, "whatsapp")}>
                    <img
                      src={whatsappIco}
                      alt="whatsapp"
                      style={
                        whatsapp.find((item) => item === it)
                          ? { opacity: 1 }
                          : { opacity: 0.5 }
                      }
                    />
                  </button>
                </div>
              </Item>
            );
          })}
          <SubmitButton onClick={closeModal} sx={{ color: "#000" }}>
            Зберегти зміни
          </SubmitButton>
        </FormWrapper>
      </ModalWindow>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWindow = styled.div`
  position: relative;
  background-color: #fff;
  width: 30%;
  border-radius: 16px;
  padding: 20px;
  @media (max-width: 950px) {
    width: 50%;
  }
  @media (max-width: 590px) {
    width: 70%;
  }
`;

const Title = styled.h1`
  color: #0e1c36;
  font-size: 24px;
  margin-bottom: 50px;
  font-family: Fixel-Regular;
  max-width: 250px;
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 10px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  .buttons {
    display: flex;
    align-items: center;
    margin-left: 15px;
    gap: 5px;
    button {
      img {
        height: 24px;
        opacity: 0.5;
      }
    }
  }
`;

const FormWrapper = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
`;

const SubmitButton = styledMui(Button)({
  background: "#F7DD72",
  height: 43,
  "&:hover": {
    background: "#f7dd727b",
  },
});
