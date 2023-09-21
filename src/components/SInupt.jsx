import React from "react";
import { styled as styledMui } from "@mui/material/styles";
import {
  Autocomplete,
  Chip,
  OutlinedInput,
  Slider,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "styled-components";
import DeleteChipBlue from "../assets/icons/delete-chip-blue.svg";
import DeleteChipGreen from "../assets/icons/delete-chip-green.svg";
import MuiPhoneNumber from "material-ui-phone-number";

const carLicCategories = [
  { label: "A1" },
  { label: "A2" },
  { label: "A" },
  { label: "B" },
  { label: "BE" },
  { label: "C1" },
  { label: "C1E" },
  { label: "C" },
  { label: "CE" },
  { label: "D1" },
  { label: "D1E" },
  { label: "D" },
  { label: "DE" },
  { label: "M" },
  { label: "T" },
];

export const SInupt = ({
  label,
  marginBottom,
  type,
  notNecessarily,
  setLicenses,
  licenses,
  languages,
  setLanguages,
  onChange,
  value,
  name,
  addPhone,
}) => {

  const addChip = (setState, value, state) => {
    if (!state.find((it) => it === value)) {
      setState([...state, value]);
    }
  };

  const deleteChip = (value, setState, state) => {
    setState(state.filter((it) => it !== value));
  };

  const plusPhone = (e) => {
    e.preventDefault()
    addPhone()
  }

  return (
    <InputWrapper style={{ marginBottom: marginBottom }}>
      <InputTop>
        <Label>{label}</Label>
        {notNecessarily && (
          <TextNotNecessarily>Не обов’язково</TextNotNecessarily>
        )}
      </InputTop>

      {/* Додавання дати народження */}

      {type === "selectBirsday" ? (
        <BirdhayInput
          actionBar={"Введіть дату або виберіть"}
          name={name}
          onChange={onChange}
          value={value}
        />
      ) : type === "addCarLicense" ? (
        // Додавання категорій прав

        <>
          <AddCarLicense
            options={carLicCategories}
            placeholder="Додати"
            onInputChange={(e, value) => addChip(setLicenses, value, licenses)}
            renderInput={(params) => (
              <TextField {...params} placeholder="Додати" />
            )}
          />
          {licenses.length > 0 && (
            <>
              <TextInfo>Додані категорії прав</TextInfo>
              <ChipList>
                {licenses?.map((it, index) => {
                  return (
                    <SChip
                      label={it}
                      key={index}
                      deleteIcon={
                        <img
                          src={DeleteChipBlue}
                          alt="delete"
                          style={{ marginRight: 8, height: 10 }}
                        />
                      }
                      onDelete={() => deleteChip(it, setLicenses, licenses)}
                      sx={{ background: "#D9EAF6", color: "#0075C4" }}
                    />
                  );
                })}
              </ChipList>
            </>
          )}
          <Line />
        </>
      ) : type === "languages" ? (
        // Додавання мов
        <>
          <AddCarLicense
            options={carLicCategories}
            placeholder="Додати"
            onInputChange={(e, value) =>
              addChip(setLanguages, value, languages)
            }
            renderInput={(params) => (
              <TextField {...params} placeholder="Додати" />
            )}
          />
          {languages.length > 0 && (
            <>
              <TextInfo>Додані іноземні мови</TextInfo>
              <ChipList>
                {languages.map((it, index) => {
                  return (
                    <SChip
                      key={indexedDB}
                      label={it}
                      deleteIcon={
                        <img
                          src={DeleteChipGreen}
                          alt="delete"
                          style={{ marginRight: 8, height: 10 }}
                        />
                      }
                      onDelete={() => deleteChip(it, setLanguages, languages)}
                      sx={{ background: "#F3F9F3", color: "#0E951B" }}
                    />
                  );
                })}
              </ChipList>
            </>
          )}
          <Line />
        </>
      ) : type === "selectExp" ? (
        // Додавання стажу
        <>
          <SliderTop>
            <SliderTopText>Не вказувати</SliderTopText>
            <SliderTopText>70 років</SliderTopText>
          </SliderTop>
          <SSlider onChange={onChange} value={value} size="small" valueLabelDisplay="on" max={70} />
        </>
      ) : type === "phone" ? (
        <>
          <TelInput
            placeholder="Ввести"
            defaultCountry="ua"
            variant="outlined"
            value={value}
            onChange={onChange}
            name={name}
          />
          <button onClick={(e) => plusPhone(e)}>
            <TextInfo>Додати додатковий номер</TextInfo>
          </button>
        </>
      ) : (
        <Input
          onChange={onChange}
          value={value}
          placeholder="Ввести"
          type={type === "number" ? "number" : "text"}
          name={name}
        />
      )}
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  margin-bottom: 30px;
`;

const Label = styled.h3`
  margin-bottom: 12px;
  color: #0e1c36;
  font-family: Fixel-Medium;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
`;

const TextInfo = styled.h4`
  color: #706f6f;
  font-family: Fixel-Regular;
  font-size: 12px;
  font-weight: 400;
  line-height: 140%;
  margin: 12px 0;
`;

const TextNotNecessarily = styled.p`
  color: #706f6f;
  font-family: Fixel-Regular;
  font-size: 8px;
  font-style: normal;
  line-height: 140%;
  position: relative;
  top: -3px;
`;

const InputTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled(OutlinedInput)`
  width: 100%;

  .MuiOutlinedInput-root {
    border: none;
  }

  .MuiOutlinedInput-input {
    width: 100%;
    border-radius: 4px;
    background: #f2f2f7;
    border: none;
    height: 10px;
    font-family: Fixel-Regular;

    &::placeholder {
      font-size: 12px;
      font-family: Fixel-Regular;
    }
  }

  fieldset {
    display: none;
  }
`;

const TelInput = styledMui(MuiPhoneNumber)({
  width: "100%",
  background: "#f2f2f7",
  borderRadius: 4,
  height: 43,
  fieldset: {
    border: 0,
  },
  input: {
    padding: "10px 5px",
  },
});

const BirdhayInput = styled(DatePicker)`
  background: #f2f2f7;
  border-radius: 4px;
  width: 100%;

  input {
    height: 10px;
    &::placeholder {
      font-size: 12px;
      font-family: Fixel-Regular;
    }
  }

  fieldset {
    display: none;
  }
`;

const AddCarLicense = styled(Autocomplete)`
  background: #f2f2f7;
  border-radius: 4px;
  width: 100%;

  input {
    height: 10px;
    &::placeholder {
      font-size: 12px;
      font-family: Fixel-Regular;
      line-height: 1em;
    }
  }

  fieldset {
    display: none;
  }
`;

const ChipList = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
`;

const SChip = styled(Chip)`
  span {
    font-size: 12px;
    font-family: Fixel-Medium;
    padding: 0 15px;
  }

  img {
    margin-right: 20px;
  }
`;

const Line = styled.div`
  border: 1px solid #e1e1e1;
  margin: 25px 0;
`;

const SliderTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SliderTopText = styled.h4`
  color: #706f6f;
  font-family: Fixel-Medium;
  font-size: 10px;
  line-height: 140%;
`;

const SSlider = styledMui(Slider)({
  color: "#000",
  height: 5,
  left: 5,
  width: "98%",
  "& .MuiSlider-valueLabelOpen": {
    top: 50,
    "::before": {
      top: "-8px",
    },
  },
});
