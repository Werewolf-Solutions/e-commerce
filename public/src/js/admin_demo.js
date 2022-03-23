export const admin_demo = {
    _id: "admin_id",
    email: "admin@gmail.com",
    username: "admin",
    customer_id: "cus_admin_id",
    cart: [],
    admin: true,
    address: {
        postcode: "b1",
        line1: "streat",
        number: 2,
        city: "birm",
        region: "wm",
        country: "uk"
    },
    payment_methods: [{
        cardName: "admin",
        id: "pm_admin",
        fingerprint: "???", // REVIEW: do I need it?
        last4: 4242,
        country: "US",
        exp_month: 3,
        exp_year: 2023,
        brand: "visa",
        _id: "2"
    }],
    payment_intents: [],
    orders: [{
        user_id : "6234c8e19ee3119718d4dc08",
        total_amount: 2700,
        payment_intent : {
            id: "pi_3Kek7dAlUKnrAXrl042AlrTI",
            status : "succeeded",
            payment_method : "pm_1Kek7FAlUKnrAXrlZd9wQAQm",
            _id : "6234c92b9ee3119718d4dd1c"
        },
        address: {
            postcode: "b1",
            line1: "streat",
            number: 2,
            city: "birm",
            region: "wm",
            country: "uk"
        },
        items : [
            {
                _id : "618405197e861994a30726c8",
                name : "pizza",
                price : 10,
                description : "peperoni",
                category : "main",
                quantity : 1
            },
            {
                _id : "61a61a0fcad8e22d8c495760",
                name : "Lamb tikka",
                price : 3.5,
                description : "tender pieces of lamb",
                category : "starters",
                quantity : 2
            }
        ],
        accepted : false,
        delivered : false,
        _id : "6234c9159ee3119718d4dc95",
        modifications : [ ]
    }]
}

export default admin_demo