import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface autoComplete {
  id?: string;
  options: [];
  label?: string;
  placeholder: string;
  sx?: Object;
  value: string;
  onChange: any;
  onInputChange: any;
  inputValue: string;
}
export default function AutoCompleteSearch({
  id,
  options,
  label,
  placeholder,
  sx,
  value,
  onChange,
  inputValue,
  onInputChange,
}: autoComplete) {
  return (
    <Autocomplete
      value={value}
      fullWidth
      onChange={onChange}
      inputValue={inputValue}
      onInputChange={onInputChange}
      disablePortal
      id={id ? id : "autoCompleteSearch"}
      options={options}
      sx={sx}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label ? label : ""}
          placeholder={placeholder ? placeholder : ""}
        />
      )}
    />
  );
}
