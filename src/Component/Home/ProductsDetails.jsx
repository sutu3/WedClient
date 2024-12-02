import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Divider,
  FormControl,
  InputLabel,
  Select,
  Container,
  Breadcrumbs,
  Tabs,
  Tab,
  IconButton,
  TextField,
  Rating,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {Product} from "../Redux/Selector.jsx";
import {useSelector} from "react-redux";



const ProductDetail = () => {
  const { id } = useParams();
  console.log(id)
  /*const { id } = useParams<{ id: string }>();*/
  // Sample data for the product (replace with API data later)
  const product = useSelector(Product)[id||0];
  // State management for size, rating, quantity, and tabs
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(2);
  const [tabIndex, setTabIndex] = useState(0);
  const sizedata = [...new Map(product.varients.map(el1 => [el1.size.size, { key: el1.size.size, value: el1.size.sizename }]))
      .values()];
  const colordata = [...new Map(product.varients.map(el1 => [el1.color.colorname, { key: el1.color.colorname, value: el1.color.colorhex }]))
      .values()];
  console.log(colordata)// Handle size change
  const handleChangeSize = (event) => {
    setSize(event.target.value);
  };

  // Handle quantity increase/decrease
  const handleIncreaseQuantity = () => {
    if (quantity < product.available) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="start" mt={2}>
        <Typography variant="h3" sx={{ fontWeight: 500 }}>
          Product Detail
        </Typography>
      </Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2 }}>
        <Link underline="hover" color="inherit" to="/product">
          Product
        </Link>
        <Typography color="text.primary">Details</Typography>
      </Breadcrumbs>
      <Box m={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height="400"
                image={product.image.urlImage}
                alt={product.name}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box display="flex" flexDirection="column" alignItems="start">
                  <Typography variant="h4" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {product.descriptions[0].description}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={2}>
                    <Rating name="read-only" value={4} readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {product.totalRatings} reviews
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box  display="flex" gap={2} alignItems="center" mt={2}>
                  <FormControl variant="outlined">
                    <InputLabel id="size-select-label">Size</InputLabel>
                    <Select
                        sx={{ width: 120 }}
                        labelId="size-select-label"
                        id="size-select"
                        value={size}
                        onChange={handleChangeSize}
                        label="Size"
                    >
                      {sizedata.map((el) => (
                          <MenuItem key={el.key} value={el.key}>
                            {el.value}
                          </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl variant="outlined" >
                    <InputLabel id="color-select-label">Color</InputLabel>
                    <Select
                        labelId="color-select-label"
                        id="color-select"
                        sx={{ width: 120 }}
                        value={color}
                        onChange={handleChangeSize} // Sử dụng handleChangeColor cho color
                        label="Color"
                        name="color"
                    >
                      {colordata.map((el) => (
                          <MenuItem key={el.key} sx={{ backgroundColor: el.value }} value={el.key}>
                            {el.key}
                          </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                </Box>
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography variant="body1" sx={{ mr: 2 }}>
                    Quantity:
                  </Typography>
                  <IconButton
                    onClick={handleDecreaseQuantity}
                    aria-label="decrease quantity"
                    disabled={quantity <= 1}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    type="number"
                    variant="outlined"
                    sx={{ mx: 1, width: "70px" }}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    inputProps={{ min: 1, max: product.available }}
                  />
                  <IconButton
                    onClick={handleIncreaseQuantity}
                    aria-label="increase quantity"
                    disabled={quantity >= product.available}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
                <Typography variant="body2" mt={2}>
                  Available: {product.available} items
                </Typography>
                <Box display="flex" mt={3} gap={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      alert(`Added ${quantity} item(s) to your cart!`)
                    }
                    disabled
                  >
                    Add to Cart
                  </Button>
                  <Button variant="contained" color="secondary" disabled>
                    Buy Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box mt={4}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            aria-label="description and reviews tabs"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Description" />
            <Tab label="Reviews" />
          </Tabs>
          <Box sx={{ mt: 2 }}>
            {tabIndex === 0 && (
              <Typography variant="body2" gutterBottom>
                {product.descriptions[1].description}
              </Typography>
            )}
            {tabIndex === 1 && (
              <Box>
                {product.reviews.map((review, index) => (
                  <Box key={index} mb={2}>
                    <Typography variant="body2" fontWeight="bold">
                      {review.reviewer}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {review.date} - {review.verified && "Verified Purchase"}
                    </Typography>
                    <Rating name={`rating-${index}`} value={review.rating} readOnly />
                    <Typography variant="body2">
                      {review.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetail;
