export const foodImages = [
    {
        src: "https://www.foodiesfeed.com/wp-content/uploads/2023/06/pouring-honey-on-pancakes.jpg",
        alt: 'pancakes'
    },
    {
        src:"https://www.foodiesfeed.com/wp-content/uploads/2023/07/fresh-fruit-platter.jpg",
        alt: 'fresh-fruits'
    },
    {
        src: "https://www.foodiesfeed.com/wp-content/uploads/2023/06/vegan-curry-with-fresh-herbs.jpg",
        alt: 'curry'
    }
]

import * as yup from "yup";

export const menuSchema = yup.object({
    id: yup.string().required("Id is required"),
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters long"),
    price: yup.string().required("Price is required"),
    description: yup.string().required("Description is required"),
  });