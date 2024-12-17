import axios from "axios";


export const getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
    try{
        const res = await axios.get(url);
        if(res.data.status !== 'OK'){
            throw new Error('Unable to fetch the data');
        }else{
            const data = res.data.results[0].geometry.location;
            return {
                ltd: data.lat,
                lng: data.lng   
            }
        }
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

export const getDistanceTime = async (origin, destination) => {
    if(!origin || !destination){
        throw new Error('Origin and Destination are required');
    }
    const apiKey = process.env.GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;
    try{
        const response = await axios.get(url);
        if(response.data.status !== 'OK'){
            throw new Error('Unable to fetch the data');
        }else{
            const data = response.data.rows[0].elements[0];
            return {
                distance: data.distance.text,
                duration: data.duration.text
            }
        }
    }
    catch(err){
        console.log(err);
        throw err;
    }
}
export const autoSuggestions = async (input) => {
    if(!input){
        throw new Error('Input is required');
    }
    const apiKey = process.env.GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;
    try{
        const response = await axios.get(url);
        if(response.data.status !== 'OK'){
            throw new Error('Unable to fetch the data');
        }else{
            return response.data.predictions;
        }
    }
    catch(err){
        console.log(err);
        throw err;
    }
}