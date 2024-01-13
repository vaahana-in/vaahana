import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";

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
    <List>
      {persons.map((person) => (
        <ListItem key={person.id}>
          <ListItemAvatar>
            <Avatar alt={person.name} src={person.avatarUrl} />
          </ListItemAvatar>
          <ListItemText primary={person.name} secondary={person.address} />
          <ListItemText primary={`${person.distance} m away`} />
        </ListItem>
      ))}
    </List>
  );
};

export default Requests;
