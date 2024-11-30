import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import { baseUrl } from '../constans/baseUrl';
import { Box } from '@mui/material';
import { useCart } from '../context/cart/CartContext';
function Products() {
    const { addItemToCart } = useCart()
    const [products, setProducts] = useState([]);
    const [eror, setEror] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/product`);
                const data = await response.json();
                setProducts(data)
            } catch (err) {
                setEror(true)
            }
        }
        fetchData();
    }, []);
    if (eror) {
        return (<Box>somthing is wrong please try again</Box>)
    }
    console.log(products)
    return (
        <Grid container spacing={2}>
            {products.map((item, index) => {
                return (
                    <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card >
                            <CardMedia
                                sx={{ height: 200 }}
                                image={item.image}
                                title={item.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {item.price} EGP
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant='contained' size="small" onClick={() => { addItemToCart(item._id) }}>Add To Cart</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )
            })}
        </Grid>
    );
}

export default Products