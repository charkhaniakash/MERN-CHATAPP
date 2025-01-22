import nodemailer from 'nodemailer';

import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
export const reportBug = async (req, res) => {
  try {
    const { title, description, priority, email } = req.body;
    console.log(req.body)
    const mailOptions = {
      from: email,
      to: '1ms19ch001@gmail.com',
      subject: `Bug Report: ${title} (Priority: ${priority})`,
      html: `
        <h2>New Bug Report</h2>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Priority:</strong> ${priority}</p>
        <p><strong>Title:</strong> ${title}</p>
        <h3>Description:</h3>
        <p>${description}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Bug report sent successfully' });
  } catch (error) {
    console.error('Error sending bug report:', error);
    res.status(500).json({ error: 'Failed to send bug report' });
  }
};