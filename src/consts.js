import { LocationCity, Hotel, RateReview, ListAlt } from "@material-ui/icons";

export const SITE_NAME = "Book A Room - Control Panel";

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
        label: "Floor"
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
      {
        id: "city",
        label: "City",
        type: "select",
        options: []
      },
      { id: "address", label: "Address", type: "string" },
      {
        id: "facilities",
        label: "Facilities",
        type: "multi-select",
        options: [
          { id: 0, label: "Restaurant", value: "restaurant" },
          { id: 1, label: "Wifi", value: "wifi" },
          { id: 2, label: "Car Hire", value: "car_hire" },
          { id: 3, label: "Parking", value: "parking" },
          { id: 4, label: "Laundry", value: "laundry" }
        ]
      },
      { id: "nr_stars", label: "Stars", type: "number" },
      { id: "nr_floors", label: "Floors", type: "number" }
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
      { id: "nr_floor", numeric: true, disablePadding: false, label: "Floor" },
      { id: "room", numeric: false, disablePadding: false, label: "Room" },
      { id: "price", numeric: true, disablePadding: false, label: "Price/Day" }
    ],
    fields: [
      { id: "hotel", label: "Hotel", type: "select", options: [] },
      {
        id: "type",
        label: "Type",
        type: "select",
        options: [
          {
            id: "e9fdbe02-c7d2-4d46-a665-71596c3ff778",
            label: "Superior",
            value: "Superior"
          },
          {
            id: "2e65dd83-2ba9-471a-9bb7-4cce3895c034",
            label: "Twin",
            value: "Twin"
          },
          {
            id: "fbdcb566-dbf0-46da-b7cb-94e168654276",
            label: "Triple",
            value: "Triple"
          },
          {
            id: "ab9ecf84-06b6-402c-a45d-2dce43a64822",
            label: "Premier",
            value: "Premier"
          },
          {
            id: "ae08f0de-e210-412f-9d37-402c9817efa1",
            label: "Deluxe",
            value: "Deluxe"
          },
          {
            id: "a611a1f7-51bb-41f6-9ce5-c2c44cab7698",
            label: "Studio",
            value: "Studio"
          }
        ]
      },
      { id: "floor", label: "Floor", type: "number" },
      { id: "number", label: "Room Number", type: "string" },
      { id: "price_per_day", label: "Price/Day", type: "number" }
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
    fields: [
      { id: "hotel", label: "Hotel", type: "select", options: [] },
      {
        id: "customer",
        label: "Customer",
        type: "select",
        options: [
          {
            id: "7dcceb32-794a-4190-b3dc-1558344f1a34",
            label: "Ion Batîr",
            value: "Ion Batîr"
          },
          {
            id: "9f4d9ed1-a338-47cd-80f2-def8ac1dfb35",
            label: "Bill Gates",
            value: "Bill Gates"
          },
          {
            id: "9b3cedf4-7f7f-46ca-95f2-c84b3d2eeb00",
            label: "Linus Torvalds",
            value: "Linus Torvalds"
          },
          {
            id: "903cfeee-cdab-4d6f-8945-94c3bf641730",
            label: "Steve Jobs",
            value: "Steve Jobs"
          }
        ]
      },
      { id: "review", label: "Review", type: "string" },
      { id: "mark", label: "Mark", type: "number" },
      { id: "date", label: "Date", type: "date" }
    ],
    orderBy: "hotel"
  },
  {
    id: 3,
    endpoint: "booking",
    label: "Bookings",
    icon: ListAlt,
    rows: [
      {
        id: "customer",
        numeric: false,
        disablePadding: true,
        label: "Customer"
      },
      {
        id: "room",
        numeric: false,
        disablePadding: false,
        label: "Room"
      },
      { id: "date", numeric: false, disablePadding: false, label: "Date" },
      {
        id: "check_in",
        numeric: true,
        disablePadding: false,
        label: "CheckIn"
      },
      {
        id: "check_out",
        numeric: false,
        disablePadding: false,
        label: "CheckOut"
      }
    ],
    fields: [
      {
        id: "customer",
        label: "Customer",
        type: "select",
        options: [
          {
            id: "7dcceb32-794a-4190-b3dc-1558344f1a34",
            label: "Ion Batîr",
            value: "Ion Batîr"
          },
          {
            id: "9f4d9ed1-a338-47cd-80f2-def8ac1dfb35",
            label: "Bill Gates",
            value: "Bill Gates"
          },
          {
            id: "9b3cedf4-7f7f-46ca-95f2-c84b3d2eeb00",
            label: "Linus Torvalds",
            value: "Linus Torvalds"
          },
          {
            id: "903cfeee-cdab-4d6f-8945-94c3bf641730",
            label: "Steve Jobs",
            value: "Steve Jobs"
          }
        ]
      },
      { id: "room", label: "Room", type: "select", options: [] },
      { id: "date", label: "Date", type: "date" },
      { id: "check_in", label: "CheckIn", type: "date" },
      { id: "check_out", label: "CheckOut", type: "date" }
    ],
    orderBy: "hotel"
  }
];
