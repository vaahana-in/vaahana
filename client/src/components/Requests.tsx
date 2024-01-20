import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import { CheckCircleOutline, ThumbDown } from "@mui/icons-material";
import { Button } from "@material-ui/core";

const Requests = () => {
  const persons = [
    {
      id: 1,
      name: "Ramanna",
      address: "Rajajinagara",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb9JsqxOgGFNVVKBMVmeCoU-G1W-rWUcb057f6NERgAYHHaJ8BknDGWXNyScS6v969bq0&usqp=CAU", // Replace with actual image URL
      distance: 500,
    },
    {
      id: 2,
      name: "Channappa",
      address: "Srirampura",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb9JsqxOgGFNVVKBMVmeCoU-G1W-rWUcb057f6NERgAYHHaJ8BknDGWXNyScS6v969bq0&usqp=CAU",
      distance: 300,
    },
    {
      id: 3,
      name: "Basanni",
      address: "Bommasandra",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb9JsqxOgGFNVVKBMVmeCoU-G1W-rWUcb057f6NERgAYHHaJ8BknDGWXNyScS6v969bq0&usqp=CAU",
      distance: 700,
    },
    // Add more persons as needed
  ];

  return (
    <>
      <List>
        {persons.map((person) => (
          <ListItem
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              width: "100%",
            }}
            key={person.id}
          >
            <ListItemAvatar>
              <Avatar alt={person.name} src={person.avatarUrl} />
            </ListItemAvatar>
            <ListItemText primary={person.name} secondary={person.address} />
            <ListItemText primary={`${person.distance} m away`} />
            <div>
              <Button
                style={{
                  color: "green",
                }}
              >
                <CheckCircleOutline />
                <span style={{ color: "black", padding: "5px" }}>approve</span>
              </Button>
              <Button>
                <ThumbDown color="warning" />
                <span style={{ color: "black", padding: "5px" }}>deny</span>
              </Button>
            </div>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Requests;
