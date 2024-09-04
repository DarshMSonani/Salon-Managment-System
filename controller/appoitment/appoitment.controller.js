const db = require("../../model/index")
const sendMail = require("../../helper/email/email")
const ejs = require("ejs");
const RESPONSE = require("../../helper/response");
const { where } = require("sequelize");

const User = db.User
const Appoitment = db.Appoitment
const AllAppoitment = db.AllAppoitment

const createAppoitment = async (req, res) => {
    try {
        const { user: { id, name, email, role }, body: { people, date, time, phoneNumber, appoitmentType, price } } = req;

        if (role != "user") {
            return RESPONSE.error(res, 1010)
        }
        const totalPrice = price * people;

        // Parse the time string to extract hours and minutes
        const [hours, minutes] = time.split(':').map(part => parseInt(part, 10));

        // Construct a date object with the provided date and time
        const appointmentDateTime = new Date(date);
        appointmentDateTime.setHours(hours, minutes);

        // Get the hour of the appointment time
        const appointmentHour = appointmentDateTime.getHours();

        // Check if the appointment time is between 9 am and 9 pm (inclusive)
        if (appointmentHour < 9 || appointmentHour >= 21) {
            return res.status(400).json({ error: 'Appointment time must be between 9 am and 9 pm.' });
        }

        // Check if the appointment date is in the past
        const currentDate = new Date();
        if (appointmentDateTime < currentDate) {
            return res.status(400).json({ error: 'Cannot select past dates for appointments.' });
        }

        // Add the appointment to the database
        const createAppoitment = await Appoitment.create({ userId: id, userName: name, people, date, time, phoneNumber, appoitmentType, price, totalPrice});

        const renderTemplate = await ejs.renderFile("views/email.ejs", { data: createAppoitment });
        const emailObj = {
            to: email,
            subject: `Booking ${appoitmentType} Appoitment`,
            html: renderTemplate,
        }
        await sendMail(emailObj);
        return res.redirect("/appoitment")
        // Respond with success message or any necessary data
        // res.status(200).json({ message: 'Appointment created successfully', emailObj });

    } catch (err) {
        console.log("The err in haircut appointment is", err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const appoitment = async (req, res) => {

    const findAllAppoitment = await Appoitment.findAll({
        where: {
            userId: req.user.id
        }
    })
    res.render("appoitment", { data: findAllAppoitment })
}

const deleteAppoitmentByUser = async (req, res) => {
    try {
        const find = await Appoitment.findOne({
            where:{
                id:req.params.id
            }
        })
        console.log(find.name,find.appoitmentType);
        const createAllAppoitment = await AllAppoitment.create({appoitmentId:find.id, userId: find.userId, userName: find.userName, people:find.people, date:find.date, time:find.time, phoneNumber:find.phoneNumber, appoitmentType:find.appoitmentType, price:find.price, totalPrice:find.totalPrice, deletedBy:"user"});
        const result = await Appoitment.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect("/appoitment");

    } catch (err) {
        console.log("The Delete Err Is " + err);
    }
}


module.exports = { createAppoitment, appoitment, deleteAppoitmentByUser }
