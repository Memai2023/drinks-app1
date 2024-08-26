import { Container, Typography, Box} from "@mui/material";

const Header = () => {

    return (
        <Container maxWidth="md" disableGutters>
                <Box display="flex" justifyContent="center" flexDirection="column"alignItems="center" padding={4} sx={{backgroundColor: "#3d3b3d", color: "white"}}>
                    <Typography variant="h1" 
                    sx={{
                        fontSize: {
                            xs: "32px",
                            md: "72px"
                        }
                    }}>
                    Delicious Drinks!
                    </Typography>
                    <Typography variant="h2"
                    sx={{
                        fontSize: {
                            xs: "24px",
                            md: "36px"
                        }
                    }}>
                    Click to find your drink!
                    </Typography>
                </Box>
        </Container>
    );
}

export default Header