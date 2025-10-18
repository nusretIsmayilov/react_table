import React from "react";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, Box } from "@mui/material";

const BasicDateRangePicker = ({value, onChange}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className="p-4 max-w-xs">
        <DateRangePicker
          startText="Start"
          endText="End"
          value={value}
          onChange={(newValue) => onChange(newValue)}
          renderInput={(startProps, endProps) => (
            <>
              <TextField {...startProps} fullWidth margin="normal" />
              <TextField {...endProps} fullWidth margin="normal" />
            </>
          )}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default BasicDateRangePicker;
