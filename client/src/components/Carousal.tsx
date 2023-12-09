import Carousel from 'react-material-ui-carousel';
import { Paper, Typography, } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import BookNowButton from './BookNowButton';


const MobileCarousel = () => {

    const bikeData = [
        {
            id: uuidv4(),
            name: 'Honda CBR500R',
            imageUrl: 'https://mcn-images.bauersecure.com/wp-images/5060/honda_cbr500r_01.jpg',
            ratePerHour: 15.99,
            brand: 'Honda',
            type: 'Sport Bike',
            year: 2022,
            engineDisplacement: '471cc',
            color: 'Red',
            available: true,
        },
        {
            id: uuidv4(),
            name: 'Yamaha MT-07',
            imageUrl: 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/146941/mt-07-right-front-three-quarter.jpeg?isig=0',
            ratePerHour: 18.50,
            brand: 'Yamaha',
            type: 'Naked Bike',
            year: 2021,
            engineDisplacement: '689cc',
            color: 'Blue',
            available: false,
        },
        {
            id: uuidv4(),
            name: 'Kawasaki Ninja 650',
            imageUrl: 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/154683/ninja-650-2023-right-front-three-quarter.jpeg?isig=0',
            ratePerHour: 20.75,
            brand: 'Kawasaki',
            type: 'Sport Tourer',
            year: 2023,
            engineDisplacement: '649cc',
            color: 'Green',
            available: true,
        },
    ];


    return (
        <div style={{ display: "flex", height: "40%", width: "100%", flexDirection: 'column', }}>
            <Typography variant='h5' align='center'>Bikes near you</Typography>
            <Carousel >
                {bikeData.map((item, index) => (
                    <Paper key={index} elevation={3} style={{ padding: '10px', textAlign: 'center' }}>
                        <img src={item.imageUrl} alt="" height={150} width={200} />
                        <Typography variant="h5">{item.name}</Typography>
                        <Typography variant="h6">{item.year} | {item.ratePerHour}/hr | {item.brand}  </Typography>
                        <Typography variant="body2">{item.type}</Typography>
                        <Typography variant="body2">{item.engineDisplacement}</Typography>
                    </Paper>

                ))}

            </Carousel>
            <BookNowButton />

        </div>

    );
};

export default MobileCarousel;
