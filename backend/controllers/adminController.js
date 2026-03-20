const Invite = require("../models/invite");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
require("dotenv").config();

const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendInvite = async (req, res) => {

    const { name, email, employee_id } = req.body;

    try {

        const token = crypto.randomBytes(32).toString("hex");

        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

        await Invite.create({
            name,
            email,
            employee_id,
            token,
            expires_at: expires
        });

        const inviteLink =
            `${process.env.FRONTEND_URL}/accept-invite?token=${token}`;

        const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "gokulnagarajan101@gmail.com",
            subject: "You're Invited",
            html: `
                <h1>Welcome ${name}</h1>
                <h2>You are invited to join the portal <br>
                <a href="${inviteLink}">Accept Invite</a></h2>
                <h3>Don't share the link to anyone. <br>
                <strong>Note:</strong> Invite link is valid for 1 day.</h3>
            `
        });

        console.log("RESEND DATA:", data);
        console.log("RESEND ERROR:", error);

        if (error) {
            return res.status(400).json({
                message: "Email failed",
                error: error
            });
        }

        res.json({
            message: "Invitation successfully sent to Employee"
        });

    } catch (error) {
        console.log("INVITE ERROR:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
};