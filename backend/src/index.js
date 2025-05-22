require("dotenv").config();
require("reflect-metadata");
const express=require("express");
const cors=require('cors');
const{AppDataSource}=require("./config/datasource");
const authRoutes=require("./routes/authRoutes");
const softwareRoutes=require("./routes/softwareRoutes");
const requestRoutes=require("./routes/requestRoutes");


const app=express();
app.use(cors());
app.use(express.json());


app.use("/api/auth",authRoutes);
app.use("/api/software",softwareRoutes);
app.use("/api/requests",requestRoutes);
AppDataSource.initialize()
    .then(()=>{
        console.log("Data Source Initialized");

        app.listen(process.env.PORT,()=>{
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
        });
    })
    .catch((err)=>
    {
        console.error("error",err);
    })
