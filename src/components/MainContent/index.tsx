import { useState, useEffect } from 'react';
import { DrinkType } from '../../utils/types';
import { Button, Card, CardActions, CardContent, CardMedia, IconButton, List, ListItem, ListItemText, Typography, Container, Box, CardHeader, Avatar, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import DeleteIcon from '@mui/icons-material/Delete';
import LocalBarSharpIcon from '@mui/icons-material/LocalBarSharp';
import NightlifeSharpIcon from '@mui/icons-material/NightlifeSharp';
import FavoriteIcon from '@mui/icons-material/Favorite';

const MainContent = () => {

    const [recipe, setRecipe] = useState<DrinkType | null>(null);
    const [favDrinks, setFavDrinks] = useState<DrinkType[]>([]);

    useEffect(() => {
        const savedFavDrinks = localStorage.getItem("favDrinks");
        if (savedFavDrinks) {
            setFavDrinks(JSON.parse(savedFavDrinks))
        }
    }, []);

    const getRandomDrink = async ():Promise<void> => {
        try {
            const response = await fetch ("https://www.thecocktaildb.com/api/json/v2/1/random.php");
            const data = await response.json();
            let drink = data.drinks[0];

            console.log("Raw API Data:", drink);

            const ingredientKeys = Object.keys(drink).filter(item => item.includes("strIngredient"));
            const ingredientValues = [];
            const measureValues = [];

            for(let i=0; i<ingredientKeys.length; i++) {
                if (drink[ingredientKeys[i]] !== "") {
                    ingredientValues.push(drink[ingredientKeys[i]]);
                    measureValues.push(drink["strMeasure" + (i+1)]);
                }
            }

            setRecipe({
                label: drink.strDrink,
                category: drink.strCategory,
                type: drink.strAlcoholic,
                image: drink.strDrinkThumb,
                instructions: drink.strInstructions,
                ingredient: ingredientValues,
                measure: measureValues,
                idDrink: drink.idDrink
            })
        } catch(error) {
            console.log("API Error: " + error);
        }
    }

    const handleFavDrink = () => {
        if (recipe) {
            if (!isFavorite) {
                const updatedFavDrinks = [...favDrinks, recipe];
                setFavDrinks(updatedFavDrinks);
                localStorage.setItem("favDrinks", JSON.stringify(updatedFavDrinks));
                setIsFavorite(true);
            } else {
                const updatedFavDrinks = favDrinks.filter(drink => drink.idDrink !== recipe.idDrink);
                setFavDrinks(updatedFavDrinks);
                localStorage.setItem("favDrinks", JSON.stringify(updatedFavDrinks));
                setIsFavorite(false);
            }
        }
    };
    
    const fetchFavDrink = async (idDrink: string) => {
        try {
            const response = await fetch (`https://www.thecocktaildb.com/api/json/v2/1/lookup.php?i=${idDrink}`);
            const data = await response.json();
            let drink = data.drinks[0];
            const ingredientKeys = Object.keys(drink).filter(item => item.includes("strIngredient"));
            const ingredientValues = [];
            const measureValues = [];

            for(let i=0; i<ingredientKeys.length; i++) {
                if (drink[ingredientKeys[i]] !== "") {
                    ingredientValues.push(drink[ingredientKeys[i]]);
                    measureValues.push(drink["strMeasure" + (i+1)]);
                }
            }

            setRecipe({
                label: drink.strDrink,
                category: drink.strCategory,
                type: drink.strAlcoholic,
                image: drink.strDrinkThumb,
                instructions: drink.strInstructions,
                ingredient: ingredientValues,
                measure: measureValues,
                idDrink: drink.idDrink
            })
        } catch(error) {
            console.log("API Error: " + error);
        }
    }

    const removeFavDrink = (idDrink: string) => {
        const updatedFavorites = favDrinks.filter(drink => drink.idDrink !== idDrink);
        setFavDrinks(updatedFavorites);
      };

    const clearFavDrinks = () => {
        setFavDrinks([]);
        localStorage.removeItem("favDrinks");
    }    

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (recipe) {
            const isFav = favDrinks.some(drink => drink.idDrink === recipe.idDrink);
            setIsFavorite(isFav);
        }
    }, [recipe, favDrinks]);
    
    const [value, setValue] = useState('1');

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
      };

    return (
        <>
            <Container maxWidth="md" sx={{backgroundColor: "#3d3d3d", display: "flex", flexDirection: "column", flex: 1, justifyContent: "center"}}>
                <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" flex="1" padding={4} sx={{backgroundColor: "#6accd9", color: "white"}}>
                    <Box display="flex" justifyContent="center" alignItems="center" padding="48px">
                        <Button onClick={getRandomDrink} startIcon={<LocalBarSharpIcon />}color="primary" size="large" variant="contained">
                            Surprise me!
                        </Button>
                    </Box>
                    {recipe && (
                        <Card sx={{ borderRadius: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#ebfbff",
                            boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;",
                            width: "100%" }}
                            >
                            <CardHeader title={recipe.label}
                                subheader={`${recipe.category} - ${recipe.type}`}
                                avatar={
                                <Avatar sx={{ bgcolor: "#6accd9" }} variant="square">
                                    <NightlifeSharpIcon />
                                </Avatar>  
                                }
                                >
                            </CardHeader>
                            <CardActions>
                                <Button 
                                    startIcon={<FavoriteIcon sx={{ color: isFavorite ? "#1976D2" : "gray" }} />} 
                                    size="small" 
                                    onClick={handleFavDrink}
                                    sx={{ color: isFavorite ? "#1976D2" : "gray" }}
                                >
                                    Save Favorite
                                </Button>
                            </CardActions> 
                            <CardMedia
                                component="img" 
                                src={recipe.image} 
                                sx={{ marginBottom: "24px", marginTop: "24px", borderRadius: "48%", 
                                boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;",
                                maxWidth: {
                                    xs: "200px",
                                    md: "350px"
                                }
                              }}
                            />
 
                            <Typography gutterBottom variant="h5" component="div" textAlign="center">
                                {recipe?.label}
                            </Typography>
                            <CardContent sx={{minHeight: "250px"}}>
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                                            <Tab label="Ingredient" value="1" />
                                            <Tab label="Instructions" value="2" />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1" sx={{ textAlign: "center"}}>
                                        {recipe?.ingredient.map((item, index) => {
                                        return (
                                            <p key={index}>
                                                {item}
                                                {recipe.measure[index] ? `, ${recipe.measure[index]}` : ''}
                                            </p>
                                            );
                                        })}
                                    </TabPanel>
                                    <TabPanel value="2" sx={{ textAlign: "center", maxWidth: "250px"}}>
                                        {recipe.instructions}
                                    </TabPanel>
                                </TabContext>
                            </CardContent>
                        </Card>
                    )}

                    <Card sx={{marginTop: "24px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#fcf0d2", width: "100%"}}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" textAlign="center" padding="24px">
                                Your Saved Favorite Drinks
                            </Typography>
                        {favDrinks.length === 0 ? (
                            <Typography gutterBottom variant="h6" textAlign="center" >
                                At the moment you have no saved favorite drinks
                            </Typography>
                            ) : (
                        <List dense>
                        {favDrinks.map((fav, index) => (
                            <ListItem key={index}>
                                <ListItemText 
                                    primary={fav.label} 
                                    onClick={() => fetchFavDrink(fav.idDrink)}
                                    sx={{ cursor: "pointer" }}
                                />
                                <IconButton onClick={() => removeFavDrink(fav.idDrink)}>
                                    <DeleteIcon />
                                </IconButton>                                
                            </ListItem>
                        ))}
                        </List>
                            )}
                            {favDrinks.length > 0 && (
                                <Box display="flex" justifyContent="center" alignItems="center" paddingTop="24px">
                                    <Button startIcon={<DeleteIcon />}onClick={clearFavDrinks} color="error" size="small" variant="contained">
                                        Reset favorites!
                                    </Button>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </>
    );
}

export default MainContent