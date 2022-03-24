export const user_demo = {
    _id: "1",
    email: "foo@gmail.com",
    username: "foo",
    customer_id: "cus_Kkb5hYEUsySlpA",
    cart: [],
    admin: false,
    firtsName: 'foo',
    lastName: 'the first',
    address: {
        postcode: "b1",
        line1: "streat",
        number: 2,
        city: "birm",
        region: "wm",
        country: "uk"
    },
    payment_methods: [{
        cardName: "foo",
        id: "pm_1",
        fingerprint: "???", // REVIEW: do I need it?
        last4: 4242,
        country: "US",
        exp_month: 3,
        exp_year: 2023,
        brand: "visa",
        _id: "1"
    }],
    payment_intents: [{
        id: "pi_3KBe7GAlUKnrAXrl1XseVP2y",
        status: "requires_confirmation",
        payment_method: "pm_1K5AEdAlUKnrAXrlK1cs7jFt"
    }],
    orders: [{
        order_id: "61caf8ce6dc16e80fdd427d9",
        payment_intent: {
            id: "pi_3KBe7GAlUKnrAXrl1XseVP2y",
            status: "requires_confirmation",
            payment_method: "pm_1K5AEdAlUKnrAXrlK1cs7jFt"
        },
        total_amount: 2700,
        address: {
            postcode: "b1",
            line1: "streat",
            number: 2,
            city: "birm",
            region: "wm",
            country: "uk"
        },
        items: [{
            _id: "618404787e861994a3063443",
            name: "pizza",
            price: 10,
            description: "pizza margherita",
            category: "main",
            quantity: 1
        }],
        accepted: true,
        _id: "61caf8ce6dc16e80fdd427db",
        modifications: [{
            username: "foo",
            text: "I'm allergic to mushrooms",
            _id: "61caf8ec6dc16e80fdd4280a"
        }]
    },{
        order_id: "61caf8ce6dc16e80fdd427d1",
        payment_intent: {
            id: "pi_3KBe7GAlUKnrAXrl1XseVP2y",
            status: "requires_confirmation",
            payment_method: "pm_1K5AEdAlUKnrAXrlK1cs7jFt"
        },
        total_amount: 2700,
        address: {
            postcode: "b1",
            line1: "streat",
            number: 2,
            city: "birm",
            region: "wm",
            country: "uk"
        },
        items: [{
            _id: "618404787e861994a3063443",
            name: "pizza",
            price: 10,
            description: "pizza margherita",
            category: "main",
            quantity: 1
        }],
        accepted: true,
        _id: "61caf8ce6dc16e80fdd427db",
        modifications: [{
            username: "foo",
            text: "I'm allergic to mushrooms",
            _id: "61caf8ec6dc16e80fdd4280a"
        }]
    },{
        order_id: "61caf8ce6dc16e80fdd427d2",
        payment_intent: {
            id: "pi_3KBe7GAlUKnrAXrl1XseVP2y",
            status: "requires_confirmation",
            payment_method: "pm_1K5AEdAlUKnrAXrlK1cs7jFt"
        },
        total_amount: 2700,
        address: {
            postcode: "b1",
            line1: "streat",
            number: 2,
            city: "birm",
            region: "wm",
            country: "uk"
        },
        items: [{
            _id: "618404787e861994a3063443",
            name: "pizza",
            price: 10,
            description: "pizza margherita",
            category: "main",
            quantity: 1
        }],
        accepted: true,
        _id: "61caf8ce6dc16e80fdd427db",
        modifications: [{
            username: "foo",
            text: "I'm allergic to mushrooms",
            _id: "61caf8ec6dc16e80fdd4280a"
        }]
    },{
        order_id: "61caf8ce6dc16e80fdd427d3",
        payment_intent: {
            id: "pi_3KBe7GAlUKnrAXrl1XseVP2y",
            status: "requires_confirmation",
            payment_method: "pm_1K5AEdAlUKnrAXrlK1cs7jFt"
        },
        total_amount: 2700,
        address: {
            postcode: "b1",
            line1: "streat",
            number: 2,
            city: "birm",
            region: "wm",
            country: "uk"
        },
        items: [{
            _id: "618404787e861994a3063443",
            name: "pizza",
            price: 10,
            description: "pizza margherita",
            category: "main",
            quantity: 1
        }],
        accepted: true,
        _id: "61caf8ce6dc16e80fdd427db",
        modifications: [{
            username: "foo",
            text: "I'm allergic to mushrooms",
            _id: "61caf8ec6dc16e80fdd4280a"
        }]
    }]
}

export default user_demo