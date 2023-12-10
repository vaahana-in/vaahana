import Carousel from 'react-material-ui-carousel';
import { Paper, Typography, } from '@material-ui/core';
import BookNowButton from './BookNowButton';


const MobileCarousel = ({ bike }) => {
    return (
        <div style={{ display: "flex", height: "60%", width: "100%", flexDirection: 'column' }}>
            <Typography variant='h5' align='center'>Bikes near you</Typography>
            {bike && <Carousel>

                <Paper elevation={3} style={{ padding: '10px', textAlign: 'center' }}>
                    <img src={bike.imageUrl} alt="" height={150} width={200} />
                    <Typography variant="h5">{bike.name}</Typography>
                    <Typography variant="body1">is {bike.distance} meters away</Typography>
                    <Typography variant="h6">{bike.year} | {bike.ratePerHour}/hr | {bike.brand}  </Typography>
                    <Typography variant="body2">{bike.type}</Typography>
                    <Typography variant="body2">{bike.engineDisplacement}</Typography>
                </Paper>

            </Carousel>}
            <BookNowButton />
        </div>

    );
};

export default MobileCarousel;
