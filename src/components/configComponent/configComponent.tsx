import { Box, Grid, InputLabel, TextField, Typography } from "@mui/material";
import ButtonComponent from "../resuableComponent/button";
import AutoCompleteSearch from "../resuableComponent/autoCompleteSearch";
import { configurationComponent } from "@/types/configComponent.type";

const ResuableConfigurationComponent = ({
  reusableComponentData,
}: {
  reusableComponentData: configurationComponent;
}) => {
  const {
    header,
    typograpy,
    autoComplete,
    showDropdowns,
    showHeader,
    showTextField,
    showSaveButton,
  } = reusableComponentData;

  return (
    <>
      {showHeader && header && (
        <Box textAlign={"justify"}>
          <Typography component={"span"} textAlign={"justify"}>
            NOTE: To access the Google Sheet&apos;s data, you need to share that
            google sheet with{" "}
            <Typography component={"span"} sx={header.sx}>
              {" "}
              {header.email}{" "}
            </Typography>
            this email. After that, use that Google sheet to configuration.
          </Typography>
        </Box>
      )}
      <Grid container spacing={2} mt={2}>
        {showTextField && typograpy && (
          <>
            <Grid item xs={12} sm={8}>
              <TextField
                id="outlined-basic"
                label="URL"
                variant="outlined"
                value={typograpy.url}
                {...typograpy["registerFunction"](
                  typograpy.registerFunctionUrl
                )}
                margin="normal"
                onChange={typograpy.onChange}
                autoFocus
                fullWidth
              />
              {typograpy.errorsObject[typograpy.registerFunctionUrl] && (
                <Typography color={"error"}>
                  {
                    typograpy.errorsObject[typograpy.registerFunctionUrl]
                      .message
                  }
                </Typography>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              sx={{
                margin: { xs: "0", sm: "auto 0px" },
                textAlign: "center",
              }}
            >
              <ButtonComponent data={typograpy.buttonComponentStyle} />
            </Grid>
          </>
        )}
        {showDropdowns && autoComplete && (
          <>
            <Grid item xs={12} sm={4} m={"auto"}>
              <InputLabel id="demo-simple-select-label">
                {autoComplete.inputLabelName}
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <AutoCompleteSearch
                id="auto-search-today"
                options={autoComplete.sheetNamesArray}
                placeholder="Select a sheet"
                value={autoComplete.sheetNamesUpdate}
                onChange={autoComplete.onChange}
                inputValue={autoComplete.inputValue}
                onInputChange={autoComplete.onInputChange}
              />
            </Grid>
            {showDropdowns && showSaveButton && (
              <Grid item xs={12} textAlign={"right"} marginTop={2}>
                <ButtonComponent data={autoComplete.CancelStyle} />
                <ButtonComponent data={autoComplete.SaveStyle} />
              </Grid>
            )}
          </>
        )}
      </Grid>
    </>
  );
};

export default ResuableConfigurationComponent;
