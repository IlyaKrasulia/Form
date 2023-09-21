import { styled } from "styled-components";
import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { SInupt } from "./components/SInupt";
import { useFormik } from "formik";
import { styled as styledMui } from "@mui/material/styles";

import CloseSvg from "./assets/icons/close.svg";
import AddAvatarSvg from "./assets/icons/add-avatar.svg";
import TelegramSvg from "./assets/icons/telegram.svg";
import WhatsappSvg from "./assets/icons/whatsapp.svg";
import AddSvg from "./assets/icons/add-btn.svg";
import PlusSvg from "./assets/icons/plus.svg";
import ShowInfoSvg from "./assets/icons/show-info.svg";
import { AddDocModal } from "./components/AddDocModal";
import { SocialMediaModal } from "./components/SocialMediaModal";
import ViberSvg from "./assets/icons/viber.png";

function App() {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [drivinLicense, setDrivinLicense] = useState([]);
  const [passport, setPassport] = useState([]);
  const [internationalPassport, setInternationalPassport] = useState([]);
  const [more, setMore] = useState([]);
  const [modal, setModal] = useState("");
  const [licenses, setLicenses] = useState([]);
  const [languages, setLanguages] = useState([]);
  const avatarInputRef = useRef(null);
  const drivinLicenseInputRef = useRef(null);
  const passportInputRef = useRef(null);
  const internationalPassportInputRef = useRef(null);
  const moreInputRef = useRef(null);
  const [phones, setPhones] = useState([]);
  const [phone, setPhone] = useState("");
  const [socialMediaModalVisible, setSocialMediaModaVisible] = useState(false);
  const [telegram, setTelegram] = useState([]);
  const [whatsapp, setWhatsapp] = useState([]);
  const [viber, setViber] = useState([]);

  const handleUploadAvatarClick = () => {
    avatarInputRef.current?.click();
  };

  const handleUploadDocumentClick = (ref) => {
    ref.current?.click();
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      const imgUrl = fileReader.result;
      setAvatarUrl(imgUrl);
      formik.setFieldValue("avatar", imgUrl);
    };
  };

  const fileReader = new FileReader();
  const handleAddDocument = (e, setState, state, name) => {
    e.preventDefault();
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgUrl = reader.result;
        setState((prevState) => [...prevState, imgUrl]);
        formik.setFieldValue(name, [...state, imgUrl].join(", "));
      };
      reader.readAsDataURL(file);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      surname: "",
      birthday: "",
      phone: "",
      email: "",
      licenses: "",
      languages: "",
      salary: "",
      exp: 0,
      avatar: "",
      passportImg: "",
      licensesImg: "",
      intPassportImg: "",
      moreImg: "",
      telegram: "",
      viber: "",
      whatsapp: "",
    },
    onSubmit: (values) => {
      phones.length === 0 && formik.setFieldValue("phone", phone);
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    formik.setFieldValue("licenses", licenses?.join(", "));
    //eslint-disable-next-line
  }, [licenses]);

  useEffect(() => {
    formik.setFieldValue("languages", languages?.join(", "));
    //eslint-disable-next-line
  }, [languages]);

  useEffect(() => {
    formik.setFieldValue("phone", phones?.join(", "));
    //eslint-disable-next-line
  }, [phones]);

  useEffect(() => {
    formik.setFieldValue("viber", viber?.join(", "));
    //eslint-disable-next-line
  }, [viber]);

  useEffect(() => {
    formik.setFieldValue("whatsapp", whatsapp?.join(", "));
    //eslint-disable-next-line
  }, [whatsapp]);

  useEffect(() => {
    formik.setFieldValue("telegram", telegram?.join(", "));
    //eslint-disable-next-line
  }, [telegram]);
  return (
    <div className="App">
      <FormWrapper>
        <Top>
          <TopTitle>Додати водія</TopTitle>
          <button>
            <img src={CloseSvg} alt="Close" />
          </button>
        </Top>
        <Line></Line>
        <form onSubmit={formik.handleSubmit}>
          <FormTop>
            <FormLeft>
              {!avatarUrl ? (
                <>
                  <AddAwatarBox onClick={() => handleUploadAvatarClick()}>
                    <AddAwatarContent>
                      <img src={AddAvatarSvg} alt="Add avatar" />
                      <AddAvatarText>
                        Перетягніть зображення або клікніть щоб додати
                      </AddAvatarText>
                    </AddAwatarContent>
                  </AddAwatarBox>
                  <input
                    type="file"
                    ref={avatarInputRef}
                    accept=".jpg, .jpeg, .png"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </>
              ) : (
                <AvatarBox>
                  <img src={avatarUrl} alt="Avatar" />
                  <button onClick={() => setAvatarUrl("")}></button>
                </AvatarBox>
              )}
              <AddSocialMedia>
                <Title>Месенджери</Title>
                <AddedSocialMedia>
                  <TitleSm>Додані</TitleSm>
                  <div>
                    {telegram.length >= 1 && (
                      <img src={TelegramSvg} alt="Telegram" />
                    )}
                    {viber.length >= 1 && (
                      <img src={ViberSvg} alt="Viber" style={{ height: 24 }} />
                    )}
                    {whatsapp.length >= 1 && (
                      <img src={WhatsappSvg} alt="Whatsapp" />
                    )}
                  </div>
                  <Button
                    sx={{
                      color: "#000",
                      fontFamily: "Fixel-Medium",
                      fontSize: 14,
                    }}
                    startIcon={<img src={AddSvg} alt="Add" />}
                    onClick={() => setSocialMediaModaVisible(true)}
                  >
                    Додати ще
                  </Button>
                </AddedSocialMedia>
              </AddSocialMedia>
            </FormLeft>
            <FormMidle>
              <SInupt
                label={"Призвіще"}
                name="lastname"
                value={formik.values.lastname}
                marginBottom={30}
                onChange={(e) => formik.handleChange(e)}
              />
              <SInupt
                label={"Ім’я"}
                marginBottom={30}
                name="name"
                value={formik.values.name}
                onChange={(e) => formik.handleChange(e)}
              />
              <SInupt
                label={"По батькові"}
                marginBottom={30}
                name="surname"
                value={formik.values.surname}
                onChange={(e) => formik.handleChange(e)}
              />
              <SInupt
                type={"selectBirsday"}
                label={"Дата народження"}
                marginBottom={30}
                name="birthday"
                value={formik.values.birthday}
                onChange={(value) => formik.setFieldValue("birthday", value.$d)}
              />
              <SInupt
                type={"phone"}
                label={"Телефон"}
                marginBottom={30}
                value={phone}
                onChange={(value) => {
                  setPhone(value);
                  formik.setFieldValue("phone", phones?.join(" ,") + value);
                }}
                name="phone"
                addPhone={() => {
                  if (phone.length === 19) {
                    setPhones([...phones, phone]);
                    setPhone("");
                  }
                }}
              />
              {
                <AddSocialMediaMobile>
                  <Title>Месенджери</Title>
                  <AddedSocialMedia>
                    <TitleSm>Додані</TitleSm>
                    <div>
                      {telegram.length >= 1 && (
                        <img src={TelegramSvg} alt="Telegram" />
                      )}
                      {viber.length >= 1 && (
                        <img
                          src={ViberSvg}
                          alt="Viber"
                          style={{ height: 24 }}
                        />
                      )}
                      {whatsapp.length >= 1 && (
                        <img src={WhatsappSvg} alt="Whatsapp" />
                      )}
                    </div>
                    <Button
                      sx={{
                        color: "#000",
                        fontFamily: "Fixel-Medium",
                        fontSize: 14,
                      }}
                      startIcon={<img src={AddSvg} alt="Add" />}
                      onClick={() => setSocialMediaModaVisible(true)}
                    >
                      Додати ще
                    </Button>
                  </AddedSocialMedia>
                </AddSocialMediaMobile>
              }
              <SInupt
                label={"Email"}
                marginBottom={30}
                name="email"
                value={formik.values.email}
                onChange={(e) => formik.handleChange(e)}
              />
            </FormMidle>
            <FormRight>
              <SInupt
                type={"addCarLicense"}
                label={"Категорії прав"}
                setLicenses={setLicenses}
                licenses={licenses}
              />
              <SInupt
                type={"languages"}
                label={"Інозмені мови"}
                notNecessarily
                setLanguages={setLanguages}
                languages={languages}
              />
              <SInupt
                type={"number"}
                label={"Ставка за кілометр / грн."}
                name="salary"
                value={formik.values.salary}
                onChange={(e) => formik.handleChange(e)}
                notNecessarily
              />
              <SInupt
                type={"selectExp"}
                label={"Досвід роботи"}
                name="exp"
                onChange={(e, value) => formik.setFieldValue("exp", value)}
                value={formik.values.exp}
                notNecessarily
              />
            </FormRight>
          </FormTop>
          <FormBottom>
            <FormBottomLeft></FormBottomLeft>
            <FormBottomMidle>
              <Title>Додати документи водія</Title>
              <FormBottomInputsWrapper>
                <UploadDocumentsBtn>
                  <div
                    className="upload-doc-left"
                    onClick={() =>
                      handleUploadDocumentClick(drivinLicenseInputRef)
                    }
                  >
                    <div className="upload-doc-previews">
                      {drivinLicense?.slice(0, 3)?.map((it, index) => {
                        return (
                          <div className="upload-doc-plus-wrapper" key={index}>
                            <img
                              className="upload-doc-plus-img"
                              src={it}
                              alt="img"
                            />
                          </div>
                        );
                      })}
                      <div className="upload-doc-plus-wrapper">
                        <img
                          className="upload-doc-plus-ico"
                          src={PlusSvg}
                          alt="Plus"
                        />
                      </div>
                    </div>
                    <div className="upload-doc-info">
                      <h3>Посвідчення водія</h3>
                      <p>pdf, jpg, png</p>
                    </div>
                  </div>
                  <div
                    className="upload-doc-right"
                    onClick={() => setModal("DrivinLic")}
                  >
                    <img src={ShowInfoSvg} alt="Show info" />
                    {drivinLicense.length > 0 && <p>{drivinLicense?.length}</p>}
                  </div>
                  <input
                    type="file"
                    ref={drivinLicenseInputRef}
                    accept=".pdf, .jpeg, .png, .jpg"
                    onChange={(e) =>
                      handleAddDocument(
                        e,
                        setDrivinLicense,
                        drivinLicense,
                        "licensesImg"
                      )
                    }
                    style={{ display: "none" }}
                    multiple
                  />
                </UploadDocumentsBtn>
                <UploadDocumentsBtn>
                  <div
                    className="upload-doc-left"
                    onClick={() => handleUploadDocumentClick(passportInputRef)}
                  >
                    <div className="upload-doc-previews">
                      {passport?.slice(0, 3)?.map((it, index) => {
                        return (
                          <div className="upload-doc-plus-wrapper" key={index}>
                            <img
                              className="upload-doc-plus-img"
                              src={it}
                              alt="img"
                            />
                          </div>
                        );
                      })}
                      <div className="upload-doc-plus-wrapper">
                        <img
                          className="upload-doc-plus-ico"
                          src={PlusSvg}
                          alt="Plus"
                        />
                      </div>
                    </div>
                    <div className="upload-doc-info">
                      <h3>Паспорт водія</h3>
                      <p>pdf, jpg, png</p>
                    </div>
                  </div>
                  <div
                    className="upload-doc-right"
                    onClick={() => setModal("Pass")}
                  >
                    <img src={ShowInfoSvg} alt="Show info" />
                    {passport.length > 0 && <p>{passport?.length}</p>}
                  </div>
                  <input
                    type="file"
                    ref={passportInputRef}
                    accept=".pdf, .jpeg, .png, .jpg"
                    onChange={(e) =>
                      handleAddDocument(e, setPassport, passport, "passportImg")
                    }
                    style={{ display: "none" }}
                    multiple
                  />
                </UploadDocumentsBtn>
                <UploadDocumentsBtn>
                  <div
                    className="upload-doc-left"
                    onClick={() =>
                      handleUploadDocumentClick(internationalPassportInputRef)
                    }
                  >
                    <div className="upload-doc-previews">
                      {internationalPassport?.slice(0, 3)?.map((it, index) => {
                        return (
                          <div className="upload-doc-plus-wrapper" key={index}>
                            <img
                              className="upload-doc-plus-img"
                              src={it}
                              alt="img"
                            />
                          </div>
                        );
                      })}
                      <div className="upload-doc-plus-wrapper">
                        <img
                          className="upload-doc-plus-ico"
                          src={PlusSvg}
                          alt="Plus"
                        />
                      </div>
                    </div>
                    <div className="upload-doc-info">
                      <h3>Закордонний паспорт</h3>
                      <p>pdf, jpg, png</p>
                    </div>
                  </div>
                  <div
                    className="upload-doc-right"
                    onClick={() => setModal("IntPass")}
                  >
                    <img src={ShowInfoSvg} alt="Show info" />
                    {internationalPassport.length > 0 && (
                      <p>{internationalPassport?.length}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      ref={internationalPassportInputRef}
                      accept=".pdf, .jpeg, .png, .jpg"
                      onChange={(e) =>
                        handleAddDocument(
                          e,
                          setInternationalPassport,
                          internationalPassport,
                          "intPassportImg"
                        )
                      }
                      style={{ display: "none" }}
                      multiple
                    />
                  </div>
                </UploadDocumentsBtn>
                <UploadDocumentsBtn>
                  <div
                    className="upload-doc-left"
                    onClick={() => handleUploadDocumentClick(moreInputRef)}
                  >
                    <div className="upload-doc-previews">
                      {more?.slice(0, 3)?.map((it, index) => {
                        return (
                          <div className="upload-doc-plus-wrapper" key={index}>
                            <img
                              className="upload-doc-plus-img"
                              src={it}
                              alt="img"
                            />
                          </div>
                        );
                      })}
                      <div className="upload-doc-plus-wrapper">
                        <img
                          className="upload-doc-plus-ico"
                          src={PlusSvg}
                          alt="Plus"
                        />
                      </div>
                    </div>
                    <div className="upload-doc-info">
                      <h3>Інше</h3>
                      <p>pdf, jpg, png</p>
                    </div>
                  </div>
                  <div
                    className="upload-doc-right"
                    onClick={() => setModal("IntPass")}
                  >
                    <img src={ShowInfoSvg} alt="Show info" />
                    {more.length > 0 && <p>{more?.length}</p>}
                  </div>
                  <div>
                    <input
                      type="file"
                      ref={moreInputRef}
                      accept=".pdf, .jpeg, .png, .jpg"
                      onChange={(e) =>
                        handleAddDocument(e, setMore, more, "moreImg")
                      }
                      style={{ display: "none" }}
                      multiple
                    />
                  </div>
                </UploadDocumentsBtn>
              </FormBottomInputsWrapper>
            </FormBottomMidle>
          </FormBottom>
          <TopButtons>
            <Button sx={{ color: "#000" }}>Додати в чернетку</Button>
            <SubmitButton type="submit" sx={{ color: "#000" }}>
              Зберегти зміни
            </SubmitButton>
          </TopButtons>
        </form>
      </FormWrapper>
      {modal.length > 1 && (
        <AddDocModal
          title={
            modal === "IntPass"
              ? "Закордонний паспорт"
              : modal === "Pass"
              ? "Паспорт водія "
              : modal === "DrivinLic"
              ? "Посвідчення водія"
              : "Інше"
          }
          arr={
            modal === "IntPass"
              ? internationalPassport
              : modal === "Pass"
              ? passport
              : modal === "DrivinLic"
              ? drivinLicense
              : more
          }
          addImg={
            modal === "IntPass"
              ? () => handleUploadDocumentClick(internationalPassportInputRef)
              : modal === "Pass"
              ? () => handleUploadDocumentClick(passportInputRef)
              : modal === "DrivinLic"
              ? () => handleUploadDocumentClick(drivinLicenseInputRef)
              : () => handleUploadDocumentClick(moreInputRef)
          }
          setState={
            modal === "IntPass"
              ? setInternationalPassport
              : modal === "Pass"
              ? setPassport
              : modal === "DrivinLic"
              ? setDrivinLicense
              : setMore
          }
          state={
            modal === "IntPass"
              ? internationalPassport
              : modal === "Pass"
              ? passport
              : modal === "DrivinLic"
              ? drivinLicense
              : more
          }
          closeModal={() => setModal("")}
        />
      )}
      {socialMediaModalVisible && (
        <SocialMediaModal
          closeModal={() => setSocialMediaModaVisible(false)}
          phones={phones}
          telegram={telegram}
          setTelegram={setTelegram}
          viber={viber}
          setViber={setViber}
          whatsapp={whatsapp}
          setWhatsapp={setWhatsapp}
        />
      )}
    </div>
  );
}

const FormWrapper = styled.div`
  width: 93%;
  height: 88%;
  background: #fff;
  border-radius: 20px;
  padding: 30px;
  overflow: overlay;
  position: relative;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TopTitle = styled.h1`
  color: #0e1c36;
  font-family: Fixel-Medium;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
`;

const Line = styled.div`
  border: 1px solid #e1e1e1;
  width: 100%;
  margin-top: 25px;
  margin-bottom: 30px;
`;

const FormTop = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 0.5fr 0.5fr;
  gap: 30px;
  @media (max-width: 675px) {
    grid-template-columns: none;
  }
`;

const FormLeft = styled.div``;

const AddAwatarBox = styled.div`
  background-image: url("./add-avatar-border.png");
  width: 128px;
  height: 108px;
  background-size: cover;
  padding-bottom: 20px;
  position: relative;
  text-align: center;
  cursor: pointer;
  img {
    position: relative;
    top: 20px;
  }
`;

const AddAwatarContent = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
`;

const AddAvatarText = styled.p`
  position: absolute;
  bottom: 25px;
  text-align: center;
  font-size: 9px;
  font-family: Fixel-Regular;
`;

const AvatarBox = styled.div`
  width: 128px;
  height: 128px;
  position: relative;
  img {
    width: 128px;
    height: 128px;
    border-radius: 4px;
  }
  button {
    background-image: url("./delete-avatar-btn.svg");
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 24px;
  }
`;

const AddSocialMediaMobile = styled.div`
  display: none;
  @media (max-width: 400px) {
    display: block;
    margin-bottom: 30px;
  }
`;

const AddSocialMedia = styled.div`
  margin-top: 20px;
  @media (max-width: 400px) {
    display: none;
  }
`;

const Title = styled.h2`
  color: #0e1c36;
  font-family: Fixel-Medium;
  font-size: 14px;
  line-height: 140%;
`;

const AddedSocialMedia = styled.div`
  margin-top: 20px;

  div {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 12px;
    margin-bottom: 20px;
  }
`;

const TitleSm = styled.h3`
  color: #706f6f;
  font-family: Fixel-Regular;
  font-size: 12px;
  line-height: 140%;
`;

const FormMidle = styled.div`
  width: 65%;
  margin: 0 auto;

  @media (max-width: 1100px) {
    width: 80%;
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const FormRight = styled.div`
  width: 65%;
  margin-left: auto;

  @media (max-width: 1100px) {
    width: 80%;
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const FormBottomLeft = styled.div`
  @media (max-width: 675px) {
    display: none;
  }
`;
const FormBottomMidle = styled.div`
  width: 100%;
`;

const FormBottom = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.13fr;

  @media (max-width: 1100px) {
    grid-template-columns: 0.45fr 1.13fr;
  }

  @media (max-width: 900px) {
    grid-template-columns: 0.4fr 1.13fr;
  }

  @media (max-width: 675px) {
    grid-template-columns: none;
  }
`;

const UploadDocumentsBtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 13px;
  border-radius: 4px;
  height: 50px;
  padding: 8px 12px;
  transition: all 0.3s;
  width: 45%;

  @media (max-width: 700px) {
    width: 40%;
  }

  @media (max-width: 400px) {
    width: 100%;
  }

  .upload-doc-left {
    display: flex;
    align-items: center;
    gap: 12px;
    text-align: left;
    width: 100%;
    .upload-doc-plus-ico {
      border: 1px solid transparent;
      transition: all 0.3s;
    }
    h3 {
      color: #0e1c36;
      font-family: Fixel-Medium;
      font-size: 14px;
      margin-bottom: 8px;
    }

    p {
      color: #706f6f;
      font-family: Fixel-Regular;
      font-size: 8px;
    }
  }

  .upload-doc-right {
    visibility: hidden;
    transition: all 0.3s;
    position: relative;
    display: flex;
    p {
      background-color: #0e1c36;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      color: #f6f7f8;
      font-size: 8px;
      font-family: Fixel-Regular;
      position: absolute;
      top: -7px;
      right: -7px;
      vertical-align: middle;
      line-height: 2;
      text-align: center;
    }
  }

  .upload-doc-previews {
    display: flex;
  }

  .upload-doc-plus-wrapper {
    width: 14px;
  }

  .upload-doc-info {
    margin-left: 5px;
  }

  .upload-doc-plus-img {
    height: 26px;
    width: 26px;
    border-radius: 50%;
    border: 0.3px solid #0e1c36;
  }

  &:hover {
    background: #f2f2f7;

    .upload-doc-plus-ico {
      border: 1px solid #0e1c36;
      border-radius: 50%;
    }

    .upload-doc-right {
      visibility: visible;
    }
  }
`;

const FormBottomInputsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;

  @media (max-width: 1000px) {
    width: 85%;
  }

  @media (max-width: 820px) {
    width: 100%;
  }
`;

const TopButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: end;
  margin-top: 35px;
  @media (max-width: 400px) {
    flex-direction: column;
    button {
      width: 100%;
    }
  }
`;

const SubmitButton = styledMui(Button)({
  background: "#F7DD72",
  "&:hover": {
    background: "#f7dd727b",
  },
});

export default App;
