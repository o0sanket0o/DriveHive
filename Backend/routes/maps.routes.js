import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const router = express.Router();
import { getCoordinates, getDistanceAndTime, getSuggestions } from "../controllers/map.controller.js";
import { query } from "express-validator";

router.get('/get-coordinates',
    query('address').isString().isLength({min: 3}),
    getCoordinates
)

router.get('/get-distance-time', 
    query('origin').isString().isLength({min: 3}),
    query('destination').isString().isLength({min: 3}),
    isAuthenticated, getDistanceAndTime
)
router.get('/get-suggestions', 
    query('input').isString().isLength({min: 3}),
    getSuggestions 
)
//This gives a response like this when i search for AIMS hospital:
// {
//     "data": [
//         {
//             "description": "AIIMS Hospital, Ansari Nagar East, Gautam Nagar, Ansari Nagar East, New Delhi, Delhi, India",
//             "matched_substrings": [
//                 {
//                     "length": 14,
//                     "offset": 0
//                 }
//             ],
//             "place_id": "ChIJq5dN-mXiDDkR4Ro0fdopWVI",
//             "reference": "ChIJq5dN-mXiDDkR4Ro0fdopWVI",
//             "structured_formatting": {
//                 "main_text": "AIIMS Hospital",
//                 "main_text_matched_substrings": [
//                     {
//                         "length": 14,
//                         "offset": 0
//                     }
//                 ],
//                 "secondary_text": "Ansari Nagar East, Gautam Nagar, Ansari Nagar East, New Delhi, Delhi, India"
//             },
//             "terms": [
//                 {
//                     "offset": 0,
//                     "value": "AIIMS Hospital"
//                 },
//                 {
//                     "offset": 16,
//                     "value": "Ansari Nagar East"
//                 },
//                 {
//                     "offset": 35,
//                     "value": "Gautam Nagar"
//                 },
//                 {
//                     "offset": 49,
//                     "value": "Ansari Nagar East"
//                 },
//                 {
//                     "offset": 68,
//                     "value": "New Delhi"
//                 },
//                 {
//                     "offset": 79,
//                     "value": "Delhi"
//                 },
//                 {
//                     "offset": 86,
//                     "value": "India"
//                 }
//             ],
//             "types": [
//                 "point_of_interest",
//                 "health",
//                 "establishment",
//                 "hospital"
//             ]
//         },
//         {
//             "description": "AIMS Hospital, Milap Nagar, Dombivli East, Dombivli, Maharashtra, India",
//             "matched_substrings": [
//                 {
//                     "length": 13,
//                     "offset": 0
//                 }
//             ],
//             "place_id": "ChIJq4YhhpmV5zsRLMozr2NHsSc",
//             "reference": "ChIJq4YhhpmV5zsRLMozr2NHsSc",
//             "structured_formatting": {
//                 "main_text": "AIMS Hospital",
//                 "main_text_matched_substrings": [
//                     {
//                         "length": 13,
//                         "offset": 0
//                     }
//                 ],
//                 "secondary_text": "Milap Nagar, Dombivli East, Dombivli, Maharashtra, India"
//             },
//             "terms": [
//                 {
//                     "offset": 0,
//                     "value": "AIMS Hospital"
//                 },
//                 {
//                     "offset": 15,
//                     "value": "Milap Nagar"
//                 },
//                 {
//                     "offset": 28,
//                     "value": "Dombivli East"
//                 },
//                 {
//                     "offset": 43,
//                     "value": "Dombivli"
//                 },
//                 {
//                     "offset": 53,
//                     "value": "Maharashtra"
//                 },
//                 {
//                     "offset": 66,
//                     "value": "India"
//                 }
//             ],
//             "types": [
//                 "hospital",
//                 "health",
//                 "doctor",
//                 "point_of_interest",
//                 "establishment"
//             ]
//         },
//         {
//             "description": "AIIMS hospital bhubaneswar, Sijua, Patrapada, Bhubaneswar, Odisha, India",
//             "matched_substrings": [
//                 {
//                     "length": 14,
//                     "offset": 0
//                 }
//             ],
//             "place_id": "ChIJXQax1XenGToR1IVmH7VCHss",
//             "reference": "ChIJXQax1XenGToR1IVmH7VCHss",
//             "structured_formatting": {
//                 "main_text": "AIIMS hospital bhubaneswar",
//                 "main_text_matched_substrings": [
//                     {
//                         "length": 14,
//                         "offset": 0
//                     }
//                 ],
//                 "secondary_text": "Sijua, Patrapada, Bhubaneswar, Odisha, India"
//             },
//             "terms": [
//                 {
//                     "offset": 0,
//                     "value": "AIIMS hospital bhubaneswar"
//                 },
//                 {
//                     "offset": 28,
//                     "value": "Sijua"
//                 },
//                 {
//                     "offset": 35,
//                     "value": "Patrapada"
//                 },
//                 {
//                     "offset": 46,
//                     "value": "Bhubaneswar"
//                 },
//                 {
//                     "offset": 59,
//                     "value": "Odisha"
//                 },
//                 {
//                     "offset": 67,
//                     "value": "India"
//                 }
//             ],
//             "types": [
//                 "establishment",
//                 "point_of_interest"
//             ]
//         },
//         {
//             "description": "AIIMS Hospital, AIIMS Campus Road, AIIMS Campus, Saket Nagar, Habib Ganj, Bhopal, Madhya Pradesh, India",
//             "matched_substrings": [
//                 {
//                     "length": 14,
//                     "offset": 0
//                 }
//             ],
//             "place_id": "ChIJ19uXWs1DfDkRwEhb7dOe29s",
//             "reference": "ChIJ19uXWs1DfDkRwEhb7dOe29s",
//             "structured_formatting": {
//                 "main_text": "AIIMS Hospital",
//                 "main_text_matched_substrings": [
//                     {
//                         "length": 14,
//                         "offset": 0
//                     }
//                 ],
//                 "secondary_text": "AIIMS Campus Road, AIIMS Campus, Saket Nagar, Habib Ganj, Bhopal, Madhya Pradesh, India"
//             },
//             "terms": [
//                 {
//                     "offset": 0,
//                     "value": "AIIMS Hospital"
//                 },
//                 {
//                     "offset": 16,
//                     "value": "AIIMS Campus Road"
//                 },
//                 {
//                     "offset": 35,
//                     "value": "AIIMS Campus"
//                 },
//                 {
//                     "offset": 49,
//                     "value": "Saket Nagar"
//                 },
//                 {
//                     "offset": 62,
//                     "value": "Habib Ganj"
//                 },
//                 {
//                     "offset": 74,
//                     "value": "Bhopal"
//                 },
//                 {
//                     "offset": 82,
//                     "value": "Madhya Pradesh"
//                 },
//                 {
//                     "offset": 98,
//                     "value": "India"
//                 }
//             ],
//             "types": [
//                 "health",
//                 "establishment",
//                 "point_of_interest",
//                 "hospital"
//             ]
//         },
//         {
//             "description": "Aims hospital, Chatrapati Chowk, Sawarkar Nagar, Vivekanand Nagar, Nagpur, Maharashtra, India",
//             "matched_substrings": [
//                 {
//                     "length": 13,
//                     "offset": 0
//                 }
//             ],
//             "place_id": "ChIJDeV3JgC_1DsR4ikcaGyrtvc",
//             "reference": "ChIJDeV3JgC_1DsR4ikcaGyrtvc",
//             "structured_formatting": {
//                 "main_text": "Aims hospital",
//                 "main_text_matched_substrings": [
//                     {
//                         "length": 13,
//                         "offset": 0
//                     }
//                 ],
//                 "secondary_text": "Chatrapati Chowk, Sawarkar Nagar, Vivekanand Nagar, Nagpur, Maharashtra, India"
//             },
//             "terms": [
//                 {
//                     "offset": 0,
//                     "value": "Aims hospital"
//                 },
//                 {
//                     "offset": 15,
//                     "value": "Chatrapati Chowk"
//                 },
//                 {
//                     "offset": 33,
//                     "value": "Sawarkar Nagar"
//                 },
//                 {
//                     "offset": 49,
//                     "value": "Vivekanand Nagar"
//                 },
//                 {
//                     "offset": 67,
//                     "value": "Nagpur"
//                 },
//                 {
//                     "offset": 75,
//                     "value": "Maharashtra"
//                 },
//                 {
//                     "offset": 88,
//                     "value": "India"
//                 }
//             ],
//             "types": [
//                 "hospital",
//                 "establishment",
//                 "health",
//                 "point_of_interest"
//             ]
//         }
//     ],
//     "success": true
// }

export default router;