import React from "react";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, Box } from "@mui/material";

const BasicDateRangePicker = ({ value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <DateRangePicker
          value={value}
          onChange={(newValue) => onChange(newValue)}
          renderInput={(startProps, endProps) => (
            <>
              <TextField {...startProps} label="Start date" />
              <TextField {...endProps} label="End date" />
            </>
          )}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default BasicDateRangePicker;
