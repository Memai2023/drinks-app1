import { Container, Typography, Box } from "@mui/material";

const Footer = () => {

    return (
        <Container maxWidth="md" disableGutters>
                <Box display="flex" justifyContent="center" flexDirection="column"alignItems="center" padding={4} sx={{backgroundColor: "#3d3b3d", color: "white"}}>
                    <Typography variant="h5"
                    sx={{
                        fontSize: {
                            xs: "18px",
                            md: "24px"
                        }
                    }}>
                        Assignment 1, Drinks App
                    </Typography>
                    <Typography variant="h3"
                    sx={{
                        fontSize: {
                            xs: "18px",
                            md: "24px"
                        }
                    }}>
                        By Maria Hendricks 2024
                    </Typography>
                </Box>
        </Container>
    );
}

export default Footer