import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../Settings.module.css";
import { useAlert } from '../../../components/Alert/AlertContext';

export default function Left({ contact, setContact }) {
  const showAlert = useAlert();

  function RadioWithLabel({ value, label, ...rest }) {
    return (
      <FormControlLabel
        label={label}
        value={value}
        control={<Radio {...rest} />}
      />
    );
  }

  // update field with key = name attribute, to value = value attribute
  const radioChange = (evt) => {
    setContact({
      ...contact,
      [evt.target.name]: evt.target.value,
    });
  };

  return (
    <div className={styles.child2}>
      <Box>
        <FormLabel>
          <Typography variant="h5" color="black">
            Telegram visibility:
          </Typography>
        </FormLabel>

        <RadioGroup
          row
          value={contact.telegram_visibility}
          onChange={radioChange}
          name="telegram_visibility"
        >
          <RadioWithLabel value="afterlink" label="Only after linking" />
          <RadioWithLabel value="everyone" label="Everyone" />
        </RadioGroup>
      </Box>

      <Box
        mt={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FormLabel>
          <Typography variant="h5" color="black">
            Email visibility:
          </Typography>
        </FormLabel>

        <RadioGroup row value={contact.email_visibility} name="email_visibility" onChange={radioChange}>
          <RadioWithLabel value="afterlink" label="Only after linking" />
          <RadioWithLabel value="everyone" label="Everyone" />
        </RadioGroup>
      </Box>
    </div>
  );
}
