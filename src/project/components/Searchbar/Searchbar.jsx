import React, { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./SearchBar.module.css";
import { useNavigate, useLocation } from "react-router-dom";

export const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleSearch = () => {
    navigate("/search/" + searchText);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <TextField
        fullWidth
        type="search"
        className={
          pathname.startsWith("/search") || pathname.startsWith("/detail")
            ? styles.searchPage
            : styles.home
        }
        placeholder="Busca tu proyecto o empresa"
        color="pear"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyUp={handleKeyPress}
        InputProps={{
          startAdornment: (
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </div>
  );
};
