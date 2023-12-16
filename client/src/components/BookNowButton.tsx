import { Button, makeStyles } from '@material-ui/core';
import { Container } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';


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

const BookNowButton = ({ selectedBike }) => {
    console.log({ selectedBike })
    const classes = useStyles();

    // const [hours, setHours] = useState(1);
    const hourlyRate = 5; // Assuming $5 per hour

    const handleFromChange = (event) => {
        console.log(event)
        // setHours(event.target.value);
    };

    const handleBookNow = (selectedBike: any) => {
        console.log(`Bike booked for ${hours} hours. Total cost: $${hours * hourlyRate}`);
    };

    return (
        <Container>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                    <div className='pickerContainer' style={{ display: 'flex', flexDirection: 'row', width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                        <TimePicker onAccept={(value) => handleFromChange(value)} label="From" />
                        <TimePicker label="To" />
                    </div>
                </DemoContainer>
            </LocalizationProvider>


            <Button
                variant="contained"
                className={classes.button}
                onClick={() => handleBookNow(selectedBike)}
            >
                Book Now
            </Button>
        </Container >
    );
};

export default BookNowButton;
