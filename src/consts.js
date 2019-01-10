import { LocationCity, Hotel, RateReview } from "@material-ui/icons";

export const SITE_NAME = "Book A Room";

export const DRAWER_WIDTH = 70;

export const pages = [
  {
    id: 0,
    endpoint: "hotel",
    label: "Hotels",
    icon: LocationCity,
    rows: [
      { id: "name", numeric: false, disablePadding: true, label: "Name" },
      { id: "nr_stars", numeric: true, disablePadding: false, label: "Stars" },
      {
        id: "nr_floors",
        numeric: true,
        disablePadding: false,
        label: "Floors"
      },
      {
        id: "address",
        numeric: false,
        disablePadding: false,
        label: "Address"
      },
      { id: "city", numeric: false, disablePadding: false, label: "City" },
      {
        id: "facilities",
        numeric: false,
        disablePadding: false,
        label: "Facilities"
      }
    ],
    fields: [
      { id: "name", label: "Name", type: "string" },
      { id: "stars", label: "Stars", type: "number" },
      { id: "floors", label: "Floors", type: "number" },
      { id: "address", label: "Address", type: "string" },
      {
        id: "city",
        label: "City",
        type: "options",
        options: [{ id: 0, label: "Chișinău" }, { id: 1, label: "Oradea" }]
      },
      { id: "restaurant", label: "Restaurant", type: "checkbox" },
      { id: "wifi", label: "Wifi", type: "checkbox" },
      { id: "carHire", label: "Car Hire", type: "checkbox" },
      { id: "parking", label: "Parking", type: "checkbox" },
      { id: "laundry", label: "Laundry", type: "checkbox" }
    ],
    orderBy: "name"
  },
  {
    id: 1,
    endpoint: "room",
    label: "Rooms",
    icon: Hotel,
    rows: [
      { id: "hotel", numeric: false, disablePadding: true, label: "Hotel" },
      { id: "type", numeric: false, disablePadding: false, label: "Type" },
      { id: "number", numeric: false, disablePadding: false, label: "Number" },
      { id: "nr_floor", numeric: true, disablePadding: false, label: "Floor" },
      { id: "price", numeric: true, disablePadding: false, label: "Price" }
    ],
    orderBy: "hotel"
  },
  {
    id: 2,
    endpoint: "review",
    label: "Reviews",
    icon: RateReview,
    rows: [
      { id: "hotel", numeric: false, disablePadding: true, label: "Hotel" },
      {
        id: "customer",
        numeric: false,
        disablePadding: false,
        label: "Customer"
      },
      { id: "review", numeric: false, disablePadding: false, label: "Review" },
      { id: "mark", numeric: true, disablePadding: false, label: "Mark" },
      { id: "date", numeric: false, disablePadding: false, label: "Date" }
    ],
    orderBy: "hotel"
  }
];
