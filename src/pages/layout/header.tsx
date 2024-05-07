import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { primaryColor, screensBackground, textColor } from "@/styles/palatte";

import { FlushDialog } from "@/components/headerPopupComponent/flushDialog";
import { PassweordDialog } from "@/components/changePasswordModel";

import Link from "next/link";
import { HandleLogout, localStorageGetter } from "../../api/auth";

import { useRouter } from "next/router";
import { FetchTableContect } from "../fetchtable";
import { DashboardContext } from "../dashboard";
import { ToastContainer } from "react-toastify";

function stringAvatar(name: string) {
  return {
    children: `${name?.split(" ")[0][0].toUpperCase()}${name
      ?.split(" ")[1][0]
      .toUpperCase()}`,
  };
}

function ResponsiveAppBar() {
  const { handleGetTimeSheetData }: any = React.useContext(FetchTableContect);
  const { handleGetDashboardDetails }: any = React.useContext(DashboardContext);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const [flushToggle, setFlushToggle] = React.useState<boolean>(false);
  const [passwordToggle, setPasswordToggle] = React.useState<boolean>(false);
  const [userDetails, setUserDetails] = React.useState<any>();

  const router = useRouter();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleFetch = () => {
    if (router.asPath !== "/fetchtable") {
      router.push("/fetchtable");
    } else {
      handleGetTimeSheetData();
    }
    handleCloseNavMenu();
  };

  React.useEffect(() => {
    const getUserDetail: any = localStorageGetter("mangomis_user_details");
    let userDetail, userRolePermissions;
    if (getUserDetail !== null) {
      userDetail = JSON.parse(getUserDetail);
      userRolePermissions = JSON.parse(userDetail.role_permissions);
      setUserDetails({ ...userDetail, role_permissions: userRolePermissions });
    }
  }, [router]);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: screensBackground,
        }}
      >
        <Container
          maxWidth={false}
          sx={{ paddingLeft: "0px", paddingRight: "12px" }}
        >
          <Toolbar disableGutters>
            <Link
              href={
                userDetails && userDetails.role_permissions.Dashboard === true
                  ? "/dashboard"
                  : "/fetchtable"
              }
            >
              <Box
                component={"img"}
                src="/logo/logo.svg"
                alt="website_logo"
                width={150}
                height={50}
                sx={{ display: { xs: "none", md: "flex" } }}
              />
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ color: textColor }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem
                  onClick={() => {
                    router.push("/dashboard");
                    handleCloseNavMenu();
                  }}
                  sx={{
                    display:
                      userDetails &&
                      userDetails.role_permissions.Dashboard === true
                        ? ""
                        : "none",
                  }}
                >
                  <Typography textAlign="center" color={textColor}>
                    Dashboard
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    router.push("/config");
                    handleCloseNavMenu();
                  }}
                  sx={{
                    display:
                      userDetails &&
                      userDetails.role_permissions.Config === true
                        ? ""
                        : "none",
                  }}
                >
                  <Typography textAlign="center" color={textColor}>
                    Config
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleFetch}>
                  <Typography textAlign="center" color={textColor}>
                    Fetch
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setFlushToggle(!flushToggle);
                    handleCloseNavMenu();
                  }}
                  sx={{
                    display:
                      userDetails && userDetails.role_permissions.Flush === true
                        ? ""
                        : "none",
                  }}
                >
                  <Typography textAlign="center" color={textColor}>
                    Flush
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setPasswordToggle(!passwordToggle);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center" color={textColor}>
                    Change Password
                  </Typography>
                </MenuItem>
                <MenuItem onClick={HandleLogout}>
                  <Typography textAlign="center" color={textColor}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
              <Link
                href={
                  userDetails && userDetails.role_permissions.Dashboard === true
                    ? "/dashboard"
                    : "/fetchtable"
                }
              >
                <Box
                  component={"img"}
                  src="/logo/logo.svg"
                  alt="website_logo"
                  width={100}
                  height={50}
                  sx={{ display: { xs: "block", md: "none" }, mr: 1 }}
                />
              </Link>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                paddingLeft: 0,
              }}
            >
              <Button
                onClick={() => router.push("/dashboard")}
                sx={{
                  my: 2,
                  color: textColor,
                  display:
                    userDetails &&
                    userDetails.role_permissions.Dashboard === true
                      ? "block"
                      : "none",
                  "&:hover": {
                    color: primaryColor,
                  },
                  fontWeight: "bold",
                }}
              >
                Dashboard
              </Button>
              <Button
                onClick={() => router.push("/config")}
                sx={{
                  my: 2,
                  color: textColor,
                  display:
                    userDetails && userDetails.role_permissions.Config === true
                      ? "block"
                      : "none",
                  "&:hover": {
                    color: primaryColor,
                  },
                  fontWeight: "bold",
                }}
              >
                Config
              </Button>
              <Button
                onClick={handleFetch}
                sx={{
                  my: 2,
                  color: textColor,
                  display: "block",
                  "&:hover": {
                    color: primaryColor,
                  },
                  fontWeight: "bold",
                }}
              >
                Fetch
              </Button>
              <Button
                onClick={() => setFlushToggle(!flushToggle)}
                sx={{
                  my: 2,
                  color: textColor,
                  display:
                    userDetails && userDetails.role_permissions.Flush === true
                      ? "block"
                      : "none",
                  "&:hover": {
                    color: primaryColor,
                  },
                  fontWeight: "bold",
                }}
              >
                Flush
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  {...stringAvatar(userDetails && userDetails?.name)}
                  alt="Remy Sharp"
                />
              </IconButton>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={() => {
                    setPasswordToggle(!passwordToggle);
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">Change Password</Typography>
                </MenuItem>
                <MenuItem onClick={HandleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <ToastContainer />
      <FlushDialog
        setToggle={setFlushToggle}
        toggle={flushToggle}
        handleGetTimeSheetData={handleGetTimeSheetData}
        handleGetDashboardData={handleGetDashboardDetails}
      />
      <PassweordDialog setToggle={setPasswordToggle} toggle={passwordToggle} />
    </>
  );
}
export default ResponsiveAppBar;
