import WebViewTable from "../resuableComponent/webViewTable";
import MobileViewTable from "../resuableComponent/mobileViewTable";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { textColor } from "@/styles/palatte";
import ButtonComponent from "../resuableComponent/button";

const TableType = ({ data }: any) => {
  const cardHeader = (headingName: string) => {
    return (
      <Box sx={{ padding: "10px 15px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              color: textColor,
              marginBottom: "10px",
            }}
          >
            {headingName}
          </Typography>
          {data?.button && <ButtonComponent data={data.button} />}
        </Box>
        <Divider />
      </Box>
    );
  };
  return (
    <>
      <Grid item xs={12} md={6} sx={{ display: { md: "block", xs: "none" } }}>
        <Card>
          {cardHeader(data.headingName)}
          <CardContent>
            <WebViewTable
              dataSummary={data.dataSummary}
              headerArray={data.headerArray}
              maxHeaderSize={data.maxHeaderSize}
              tableRowStyle={data.tableRowStyle}
              totalStyle={data.totalStyle}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid
        container
        spacing={1}
        sx={{
          display: { xs: "block", md: "none" },
          textAlign: "center",
          width: "100%",
          margin: "30px 5px 10px 20px",
        }}
      >
        <Card>
          {cardHeader(data.headingName)}
          <CardContent sx={{ height: "auto" }}>
            <MobileViewTable
              dataSummary={data.dataSummary}
              headerArray={data.headerArray}
              tableRowStyle={data.tableRowStyle}
              totalStyle={data.totalStyle}
            />
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default TableType;
