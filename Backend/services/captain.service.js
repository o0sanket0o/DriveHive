import { Captain } from "../models/captain.model";

// module.exports.createCaptain = async({firstName, lastName, email, password, color, plate, capacity, vehicleType}) => {
//     if(!firstName || !lastName || !email || !password || !color || !plate || !capacity || !vehicleType){
//         throw new Error("All fields are required.");
//     }
//     const captain = Captain.create({
//         firstName, 
//         lastName,
//         email,
//         password,
//         vehicle: {
//             color,
//             plate,
//             capacity,
//             vehicleType
//         }
//     })
//     return captain;
// }