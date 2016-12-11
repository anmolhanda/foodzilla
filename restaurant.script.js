var RestaurantDao = require("./dao/restaurant.model");

const restaurant1 = {
    "name": "Oasis",
    "description": "famous for north indian , andhra cuisines",
    "area": "Raja Rajeshwari Nagar",
    "imageLink": "https://www.zomato.com/photos/pv-res-60372-r_MDg1NTg5NTMzNT",
    "speciality": [{
        "item": "Dal Makhani",
        "rating": 4.5,
        "count":1
    },
        {
            "item": "Veg Biryani",
            "rating": 4.0,
            "count":1
        },
    ],
    "created_at": new Date(),
    "rating": 4.5,
    "count":1

};
const restaurant2 = {
    "name": "Ambur biryani house",
    "description": "Biryani, North Indian, Chinese",
    "area": "Raja Rajeshwari Nagar",
    "imageLink": "https://www.zomato.com/photos/pv-res-60366-r_NjcwNTM5NjY0MD",
    "speciality": [{
        "item": "Soup",
        "rating": 4.5,
        "count":1
    },
        {
            "item": "Veg Biryani",
            "rating": 5.0,
            "count":1
        },
        {
            "item": "Chopseuy",
            "rating": 4.0,
            "count":1
        },
    ],
    "created_at": new Date(),
    "rating": 4.0

};
RestaurantDao.addRestaurant(restaurant1);
RestaurantDao.addRestaurant(restaurant2);
