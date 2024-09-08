import express from "express"
import cors from "cors"
import mainRouter from './routes'

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//// Routes
app.use('/api', mainRouter)




app.listen(5000,() => {
    //
    console.log("Server starting on port 5000");
})