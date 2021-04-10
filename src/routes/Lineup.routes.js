//Express
const express = require("express");
const router = express.Router();
//Libs for api consults
const axios = require("axios");

router.get("/lineup", async (request, response) => {
  try {
   
     const emmiterId = 1337; 
     const apiResponse = await axios.get(`https://epg-api.video.globo.com/programmes/${emmiterId}?date=${request.query.dateRef}`)

    return response.status(200).json({
      status: 200,
      data:  [apiResponse.data.programme],
      meta: null,
      message: `Dados da programação, encontrados com sucesso`,
    });

  } catch (error) {
    console.error(error);
    return response.status(500).json({
      status: 500,
      message: error.message || error,
      data: [],
      meta: null,
    });
  }
});

module.exports = router;
