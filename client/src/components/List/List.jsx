import { Fragment } from "react";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState } from "react";

const ListForm = () => {
  const [value, setValue] = useState("Hoy");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Fragment>
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">Hoy</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="Hoy" control={<Radio />} label="Hoy" />
          <FormControlLabel value="Hoy" control={<Radio />} label="Hoy" />
        </RadioGroup>
      </FormControl>
    </Fragment>
  );
};

export default ListForm;
