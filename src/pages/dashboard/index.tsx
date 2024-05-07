import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import ResponsiveAppBar from "../layout/header";
import { useEffect, useState } from "react";
import { getDashboardDetails } from "@/api/dashboard";
import { useRouter } from "next/router";
import { localStorageGetter } from "@/api/auth";
import Spinner from "@/utils/spinner";
import { rearrangeTheData } from "@/utils/dashboardPageCommonFunctions";
import { developerDetails } from "@/types/dashboard.type";
import { createContext } from "react";
import DashboardDatesDifferent from "@/components/dashboardComponent/dashboardDatesDifferent";
import DashboardOneDate from "@/components/dashboardComponent/dashboardOneDate";
import Footer from "../layout/footer";

export const DashboardContext: any = createContext("");

const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dashboardDetails, setDashboardDetails] = useState<
    developerDetails | any
  >();

  const getToken = localStorageGetter("mangomis_login_token");
  const router = useRouter();

  const handleGetDashboardDetails = async () => {
    setLoading(true);
    const getProjectsData = await getDashboardDetails();
    if (getProjectsData && getProjectsData?.data?.dashboardData) {
      const totalHoursDetails: any = rearrangeTheData(
        getProjectsData?.data?.dashboardData
      );

      setDashboardDetails(totalHoursDetails);
    }
    setLoading(false);
  };

  useEffect(() => {
    const getUserDetail: any = localStorageGetter("mangomis_user_details");
    let userDetail, userRolePermissions;
    if (getUserDetail !== null) {
      userDetail = JSON.parse(getUserDetail);
      userRolePermissions = JSON.parse(userDetail.role_permissions);
    }

    if (!getToken) {
      router.push("/login");
    } else if (getUserDetail && userRolePermissions?.Dashboard === false) {
      router.push("/401");
    } else {
      handleGetDashboardDetails();
    }
  }, []);

  return (
    <DashboardContext.Provider
      value={{ dashboardDetails, handleGetDashboardDetails }}
    >
      <Box
        className="fetechDetail"
        sx={{
          width: "100%",
          maxWidth: "1240px",
          margin: "0 auto",
          minHeight: "calc(100vh - 70px)",
        }}
      >
        <ResponsiveAppBar />
        {!loading && dashboardDetails ? (
          <Grid
            container
            spacing={2}
            sx={{ marginTop: "0px", padding: { xs: "10px 10px", lg: 0 } }}
          >
            {dashboardDetails[0].dates.todaysDate !==
            dashboardDetails[0].dates.previousDate ? (
              <DashboardDatesDifferent />
            ) : (
              <DashboardOneDate />
            )}
          </Grid>
        ) : (
          <Spinner />
        )}
      </Box>
      <Footer />
    </DashboardContext.Provider>
  );
};

export default Dashboard;
