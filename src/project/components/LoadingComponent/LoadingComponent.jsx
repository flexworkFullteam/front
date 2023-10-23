import { Box, CircularProgress } from "@mui/material"


export const LoadingComponent = () => {
  return (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw'
        }}
    >
        <CircularProgress />
    </Box>
  )
}
