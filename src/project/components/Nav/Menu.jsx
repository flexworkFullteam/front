import React, { useState, useRef, useEffect } from "react";
import { Grow, Paper, Popper, MenuItem, MenuList, ClickAwayListener } from "@mui/material/";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import styles from "./Nav.module.css";
import { onLogout } from "../../../store/auth/authSlice";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useAuth0 } from "@auth0/auth0-react";

export const Menu = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = useAuth0();
  const { user } = useAuthStore();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (value) => {
    if (value === "logout") {
      if (user.auth0Id) {
        logout();
      }
      dispatch(onLogout());
      localStorage.clear();
      navigate("/home");
    }

    if (value === "myaccount") {
      navigate("/myaccount");
    }

    if (value === "perfil" && user.type === 2) {
      if (user.data) {
        navigate(`/professional/${user.professional_id}`);
      }
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={styles.menu}>
      <div className={styles.iconCircle} onClick={handleToggle}>
        <AccountCircleOutlinedIcon className={styles.iconButton} color='persianBlue' ref={anchorRef} id='composition-button' aria-controls={open ? "composition-menu" : undefined} aria-expanded={open ? "true" : undefined} aria-haspopup='true' />
      </div>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement='bottom-start' transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id='composition-menu' aria-labelledby='composition-button' onKeyDown={handleListKeyDown}>
                  {user.data && <MenuItem onClick={() => handleClose("perfil")}>Perfil</MenuItem>}
                  {user.type !== 1 && <MenuItem onClick={() => handleClose("myaccount")}>Mi Cuenta</MenuItem>}
                  <MenuItem onClick={() => handleClose("logout")}>Cerrar Sesión</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};
