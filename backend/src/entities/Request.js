const {EntitySchema}=require("typeorm");

module.exports.Request=new EntitySchema({
    name:"Request",
    tableName:"requests",
    columns:{
        id:{primary:true,type:"int",generated:true},
        accessType:{type:"enum",enum:["Read","Write","Admin"]},
        reason:{type:"text"},
        status:{
            type:"enum",
            enum:["Pending","Approved","Rejected"],
            default:"Pending",
        },
    },
    relations:{
        user:{
            type:"many-to-one",
            target:"User",
            joinColumn:true,
            eager:true,
        },
        software:{
            type:"many-to-one",
            target:"Software",
            joinColumn:true,
            eager:true,
        },
    },
});