require('dotenv').config();
const axios = require('axios');

exports.zoomToken = async (req,res,next)=>{
    const code = req.query.code;
    console.log(`Received code: ${code}`);
    try{
        // Exchange authorization code for access token
        const tokenResponse = await axios.post('https://zoom.us/oauth/token', null, {
            params: {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: process.env.REDIRECT_URI // Ensure this matches the redirect URI used during authorization
            },
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        res.send(tokenResponse.data.access_token);

    }catch(error){
        return res.status(500).json({message: error.message});
    }
}