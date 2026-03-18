const Invite = require("../models/invite");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.sendInvite = async (req, res) => {

    const { name, email, defaultPassword } = req.body;
    try {

        const token = crypto.randomBytes(32).toString("hex");

        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

        const hashedDefaultPassword = await bcrypt.hash(defaultPassword, 10)

        await Invite.create({
            name,
            email,
            token,
            default_password: hashedDefaultPassword,
            expires_at: expires
        });

        const inviteLink =
            `${process.env.FRONTEND_URL}/accept-invite?token=${token}`;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            to: email,
            subject: "Employee Invitation",
            html: `
        <h1>Welcome Employee</h1>
        <h2>You are invited to join the portal <br>
        <h3>Your Default Password: <b>${defaultPassword}</b></h3><br>
        <a href="${inviteLink}">Accept Invitation</a></h2>
        <h3>Don't share the link to any one. <br>
        <strong>Note:</strong>Invite link is valid for 1 day.</h3> `
        });
        res.json({
            message: "Invitation successfully sent to Employee"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};