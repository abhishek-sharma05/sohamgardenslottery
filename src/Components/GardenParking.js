import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  TableSortLabel,
  Badge
} from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import Chip from "@mui/material/Chip";
// Import the apartment data
import apartmentData from "./apartmentData";

export default function GardenParking() {
  const [apartments, setApartments] = useState([]);
  const [orderBy, setOrderBy] = useState("Flat_Group"); // Default sorting by Flat_Group
  const [order, setOrder] = useState("asc"); // Default ascending order

  const totalParkingSpaces = 65;

  function randApartmentOrder(data) {
    const shuffledData = [...data];
    for (let i = shuffledData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
    }
    return shuffledData;
  }

  function assignParkingNumbers(data) {
    const shuffledData = randApartmentOrder(data);
    // Assign parking numbers here, but limit it to 65 apartments
    for (let i = 0; i < shuffledData.length && i < totalParkingSpaces; i++) {
      shuffledData[i].Alloted_Parking_No = i + 1;
    }
    // Remove the parking number from the rest of the apartments
    for (let i = totalParkingSpaces; i < shuffledData.length; i++) {
      shuffledData[i].Alloted_Parking_No = null;
    }
    return shuffledData;
  }

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrderBy(property);
    setOrder(isAsc ? "desc" : "asc");
  };

  useEffect(() => {
    const apartmentsWithParking = assignParkingNumbers(apartmentData);
    setApartments(apartmentsWithParking);
  }, []);

  function compare(a, b) {
    const propertyA = orderBy === "Flat_No" ? parseInt(a[orderBy]) : a[orderBy];
    const propertyB = orderBy === "Flat_No" ? parseInt(b[orderBy]) : b[orderBy];

    let comparison = 0;
    if (propertyA > propertyB) {
      comparison = 1;
    } else if (propertyA < propertyB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  }

  const sortedApartments = [...apartments].sort(compare);

  function TableHeader() {
    return (
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography sx={{ fontWeight: "bold" }} variant="h6">
              S.No
            </Typography>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === "Flat_Group"}
              direction={orderBy === "Flat_Group" ? order : "asc"}
              onClick={() => handleSort("Flat_Group")}
            >
              <GroupIcon />
              <Typography sx={{ fontWeight: "bold" }} variant="h6">
                Group
              </Typography>
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === "Flat_No"}
              direction={orderBy === "Flat_No" ? order : "asc"}
              onClick={() => handleSort("Flat_No")}
            >
              <ApartmentIcon />
              <Typography sx={{ fontWeight: "bold" }} variant="h6">
                Apartment
              </Typography>
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === "Name"}
              direction={orderBy === "Name" ? order : "asc"}
              onClick={() => handleSort("Name")}
            >
              <PersonIcon />
              <Typography sx={{ fontWeight: "bold" }} variant="h6">
                Name
              </Typography>
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === "Alloted_Parking_No"}
              direction={orderBy === "Alloted_Parking_No" ? order : "asc"}
              onClick={() => handleSort("Alloted_Parking_No")}
            >
              <LocalParkingIcon />
              <Typography sx={{ fontWeight: "bold" }} variant="h6">
                Parking
              </Typography>
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }

  const notAllottedApartments = sortedApartments
    .filter((apartment) => !apartment.Alloted_Parking_No)
    .map((apartment) => apartment.Flat_No);

  return (
    <div className="App">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={2}
        m="auto"
        maxWidth={800} // Adjust the maximum width as needed
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Allotted Parking Spaces
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHeader />
            <TableBody>
              {sortedApartments
                .filter((apartment) => !!apartment.Alloted_Parking_No)
                .map((apartment, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Badge
                        color={
                          apartment.Flat_Group === "A" ? "primary" : "secondary"
                        }
                        badgeContent={apartment.Flat_Group}
                        sx={{
                          fontSize: "16px",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      ></Badge>
                    </TableCell>
                    <TableCell>{apartment.Flat_No}</TableCell>
                    <TableCell>{apartment.Name}</TableCell>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                      <Chip
                        label={apartment.Alloted_Parking_No || "Not Allotted"}
                      ></Chip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: 4 }}>
          Apartments with No Allotted Parking
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHeader />
            <TableBody>
              {sortedApartments
                .filter((apartment) => !apartment.Alloted_Parking_No)
                .map((apartment, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Badge
                        color={
                          apartment.Flat_Group === "A" ? "primary" : "secondary"
                        }
                        badgeContent={apartment.Flat_Group}
                        sx={{
                          fontSize: "16px",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      ></Badge>
                    </TableCell>
                    <TableCell>{apartment.Flat_No}</TableCell>
                    <TableCell>{apartment.Name}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Chip
                        label="Not Allotted"
                        sx={{
                          backgroundColor: "red",
                          fontWeight: "bold"
                        }}
                      ></Chip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
