import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./SearchBar.module.css";
import { Typography } from "@mui/material";

export const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    console.log("Texto de búsqueda:", searchText);
  };

  return (
    <div>
      <TextField
        fullWidth
        type="search"
        className={styles.SearchBar}
        placeholder="Busca tu proyecto o empresa"
        color="pear"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
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
