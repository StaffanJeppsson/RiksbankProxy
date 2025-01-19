import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { riksbankRouter } from './routes/riksbank.js';
import { errorHandler } from './middleware/errorHandler.js';
const app = express();
const PORT = 3000;
const limiter = rateLimit({
    windowMs: 15 * 60000,
    max: 100
});
app.use(cors());
app.use(express.json());
app.use(limiter);
app.use('/api/riksbank', riksbankRouter);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
