var RestaurantDao = require("./dao/restaurant.model");

const restaurant1 = {
    "name": "Oasis",
    "description": "famous for north indian , andhra cuisines",
    "area": "Raja Rajeshwari Nagar",
    "imageLink": "https://b.zmtcdn.com/data/pictures/2/60372/7e03e7ca17b9bc5bd340a0beaa70f5f6.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A&output-format=webp",
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
    "rating": 3.5,
    "count":1

};
const restaurant2 = {
    "name": "Brundhavan biryani house",
    "description": "Biryani, North Indian, Chinese",
    "area": "Raja Rajeshwari Nagar",
    "imageLink": "https://b.zmtcdn.com/data/pictures/6/60366/eba1e057474ef85360d9d57ad4c36969.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A&output-format=webp",
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
    "rating": 3.0

};

const restaurant3 = {
    "name": "Papa John's Pizza",
    "description": "Italian",
    "area": "Raja Rajeshwari Nagar",
    "imageLink": "https://b.zmtcdn.com/data/menus/754/50754/63d7c903bffc5302b0bc9d18b344c9d8.jpg",
    "speciality": [{
        "item": "Pizza",
        "rating": 3.0,
        "count":1
    },
        {
            "item": "Breadsticks",
            "rating": 4.0,
            "count":1
        }
    ],
    "created_at": new Date(),
    "rating": 2.5

};

const restaurant4 = {
    "name": "1947",
    "description": "North Indian, Chinese",
    "area": "Raja Rajeshwari Nagar",
    "imageLink": "https://b.zmtcdn.com/data/pictures/chains/1/50001/05096a87c4b87f7cca9c107eeffaa4c4.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A&output-format=webp",
    "speciality": [{
        "item": "Chaat",
        "rating": 4.0,
        "count":1
    },
        {
            "item": "Noodles",
            "rating": 4.5,
            "count":1
        }
    ],
    "created_at": new Date(),
    "rating": 3.5

};

const restaurant5 = {
    "name": "Bihari Mess",
    "description": "Chaats,Biryani and other cuisines",
    "area": "Raja Rajeshwari Nagar",
    "imageLink": "https://b.zmtcdn.com/data/pictures/7/61317/d8f7c3bf82b681f491e61f86110b57a0.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A&output-format=webp",
    "speciality": [{
        "item": "Kachori",
        "rating": 4.0,
        "count":1
    },
        {
            "item": "Samosa",
            "rating": 4.0,
            "count":1
        }
    ],
    "created_at": new Date(),
    "rating": 2.5

};

const restaurant6 = {
    "name": "Truffles",
    "description": "American, Burger, Cafe",
    "area": "Kormangala",
    "imageLink": "https://b.zmtcdn.com/data/pictures/0/51040/3f45d98dfb06b067b1487a634acbd746.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A&output-format=webp",
    "speciality": [{
        "item": "Burger",
        "rating": 5.0,
        "count":1
    },
        {
            "item": "Fries",
            "rating": 4.5,
            "count":1
        }
    ],
    "created_at": new Date(),
    "rating": 4.5

};

const restaurant7 = {
    "name": "BonSouth",
    "description": "Chettinad, Andhra, Kerala",
    "area": "Kormangala",
    "imageLink": "https://b.zmtcdn.com/data/pictures/0/55260/b685e94960f949f37dcb8110d2a17ae4.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A&output-format=webp",
    "speciality": [{
        "item": "Dosa",
        "rating": 4.0,
        "count":1
    },
        {
            "item": "Parota",
            "rating": 4.0,
            "count":1
        }
    ],
    "created_at": new Date(),
    "rating": 3.5

};

RestaurantDao.addRestaurant(restaurant1);
RestaurantDao.addRestaurant(restaurant2);
RestaurantDao.addRestaurant(restaurant3);
RestaurantDao.addRestaurant(restaurant4);
RestaurantDao.addRestaurant(restaurant5);
RestaurantDao.addRestaurant(restaurant6);
RestaurantDao.addRestaurant(restaurant7);