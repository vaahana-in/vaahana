import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(2),
        background: '#4caf50', // Green color
        color: 'white',
        boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)', // Green shadow
        '&:hover': {
            backgroundColor: '#45a049', // Darker green on hover
        },
        [theme.breakpoints.down('xs')]: {
            width: '90%', // Make the button full-width on extra-small screens
        },
    },
}));

const BookNowButton = () => {
    const classes = useStyles();

    const handleBookNow = () => {
        // Add your book now logic here
        console.log('Book Now clicked');
    };

    return (
        <Button
            variant="contained"
            className={classes.button}
            onClick={handleBookNow}
        >
            Book Now
        </Button>
    );
};

export default BookNowButton;
