import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Contact message received from ${name} (${email}): ${message}`);
  res.json({ message: 'Success' });
});

export default router;
