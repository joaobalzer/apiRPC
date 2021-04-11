//Express
const express = require("express");
const router = express.Router();
//Libs for api consults
const axios = require("axios");

router.get("/lineup/rpc/now", async (request, response) => {
  try {
    const emmiterId = 1337;
    const todaysDate = new Date().toISOString().split("T")[0];
    const apiResponse = await axios.get(
      `https://epg-api.video.globo.com/programmes/${emmiterId}?date=${todaysDate}`
    );
    const responseEntries = apiResponse.data.programme.entries;
    const programmesLength = responseEntries.length;
    const title = responseEntries[1].title;

    var arrayOfTitles = [];
    var arrayOfStartTime = [];
    var arrayOfEndTime = [];
    var arrayOfMatchStartTime = [];
    var arrayOfMatchEndTime = [];

    for (var i = programmesLength; i >= 1; i--) {
      const arrayTitleVariables = responseEntries[i - 1].title;
      const unformatedStartTime = responseEntries[i - 1].human_start_time;
      const unformatedEndTime = responseEntries[i - 1].human_end_time;
      const convertedEndTime = unformatedEndTime.split(":00+")[0];
      const convertedStartTime = unformatedStartTime.split(":00+")[0];
      arrayOfTitles.push(arrayTitleVariables);
      arrayOfStartTime.push(convertedStartTime);
      arrayOfEndTime.push(convertedEndTime);
    }
    var nowProgramIndex = [];
    const compareDate = Date.now()/1000
    for (var i = programmesLength; i >= 1; i--) {
      const startTime = responseEntries[i - 1].start_time;
      const endTime = responseEntries[i - 1].end_time;
      var indexValue = [i - 1];
      if(compareDate > startTime &&  compareDate < endTime ){
      nowProgramIndex .push(indexValue);
      }
    }

    const nowOnTv = { 
      "nowTitle" : responseEntries[nowProgramIndex].title,
      "nowStartTime" : arrayOfStartTime[nowProgramIndex],
      "nowEndTime" : arrayOfEndTime[nowProgramIndex],
    }
    console.log(nowOnTv)


    return response.status(200).json({
      status: 200,
      data: nowOnTv,
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

router.get("/lineup", async (request, response) => {
  try {
    const emmiterId = 1337;
    const apiResponse = await axios.get(
      `https://epg-api.video.globo.com/programmes/${emmiterId}?date=${request.query.dateRef}`
    );

    return response.status(200).json({
      status: 200,
      data: [apiResponse.data.programme],
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
