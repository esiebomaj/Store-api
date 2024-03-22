import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

mongoose.connect('mongodb://mongo:27017/my_store')
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
