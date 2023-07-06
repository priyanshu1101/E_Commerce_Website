import Stripe from 'stripe';


export const processPayment = async (req, res, next) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const myPayment = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "inr",
            metadata: {
                company: "Easy Shop"
            }
        });
        res.status(200).json({ success: true, client_secret: myPayment.client_secret });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const sendStripeApiKey = async (req, res, next) => {
    try {
        res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}
