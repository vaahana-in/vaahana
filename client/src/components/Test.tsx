// CardList.js
import { Card, CardContent, Typography, Container } from "@mui/material";
import { Box } from "@material-ui/core";
import "./Test.css";

const cardData = [
  { id: 1, title: "Card 1", content: "Lorem ipsum dolor sit amet." },
  { id: 2, title: "Card 2", content: "Consectetur adipiscing elit." },
  { id: 2, title: "Card 2", content: "Consectetur adipiscing elit." },
  { id: 2, title: "Card 2", content: "Consectetur adipiscing elit." },
  { id: 2, title: "Card 2", content: "Consectetur adipiscing elit." },
  // Add more card objects as needed
];

const Test = () => {
  return (
    <Container>
      <div className="container">
        <div className="mapContainer">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
          accusamus alias similique impedit eos eius optio perspiciatis ex
          labore placeat, exercitationem ut totam, quos reiciendis, aliquam odio
          nam vitae laudantium.
        </div>
        <Box className="bikesContainer">
          {cardData.map((card) => (
            <div className="bikeCard">
              <Card key={card.id} elevation={3}>
                <CardContent>
                  <div>
                    <div>
                      <Typography variant="h6" component="div">
                        {card.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {card.content}
                      </Typography>
                    </div>
                    <div>
                      <img
                        style={{
                          float: "right",
                          width: "100%",
                          maxWidth: "300px",
                          height: "auto",
                        }}
                        src="https://imgd.aeplcdn.com/1280x720/n/cw/ec/114531/scooty-right-front-three-quarter.png?isig=0"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </Box>
      </div>
    </Container>
  );
};

export default Test;
