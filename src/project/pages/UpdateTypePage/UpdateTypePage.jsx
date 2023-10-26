import { MenuItem, Select, Typography } from "@mui/material"

export const UpdateTypePage = () => {
  return (
    <div>
        <Typography variant="h1">¿Qué tipo de usuario eres?</Typography>

        <Select>
            {/* <MenuItem value="0">-</MenuItem> */}
            <MenuItem value="1">Profesional</MenuItem>
            <MenuItem value="2">Empresa</MenuItem>
        </Select>

    </div>
  )
}
