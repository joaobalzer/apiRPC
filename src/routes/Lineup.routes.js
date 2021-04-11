//Express
const express = require("express");
const router = express.Router();
//Libs for api consults
const axios = require("axios");

router.get("/lineup/rpc/now", async (request, response) => {
  try {
    const emmiterId = 1337;
    var userAcessDate = new Date();
    const formatedUserDate = userAcessDate.setHours(
      userAcessDate.getHours() - 3
    );
    const todaysDate = new Date(formatedUserDate).toISOString().split("T")[0];
    const apiResponse = await axios.get(
      `https://epg-api.video.globo.com/programmes/${emmiterId}?date=${todaysDate}`
    );

    const responseEntries = apiResponse.data.programme.entries;
    const programmesLength = responseEntries.length;
    var nowProgramIndex = [];
    const compareDate = Date.now() / 1000;

    for (var i = programmesLength; i >= 1; i--) {
      const startTime = responseEntries[i - 1].start_time;
      const endTime = responseEntries[i - 1].end_time;
      var indexValue = [i - 1];
      if (compareDate > startTime && compareDate < endTime) {
        nowProgramIndex.push(indexValue);
      }
    }
    let convertedStartTimeHour2 =
      responseEntries[nowProgramIndex].human_start_time.split(":")[0] - 3;
    if (convertedStartTimeHour2 < 0) {
      convertedStartTimeHour2 = convertedStartTimeHour2 + 24;
    }
    const convertedStartTimeMinutes2 = responseEntries[
      nowProgramIndex
    ].human_start_time.split(":")[1];
    let convertedEndTimeHour2 =
      responseEntries[nowProgramIndex].human_end_time.split(":")[0] - 3;
    if (convertedEndTimeHour2 < 0) {
      convertedEndTimeHour2 = convertedEndTimeHour2 + 24;
    }
    const convertedEndTimeMinutes2 = responseEntries[
      nowProgramIndex
    ].human_end_time.split(":")[1];

    const startTimeGmt = `${convertedStartTimeHour2}:${convertedStartTimeMinutes2}`;
    const endTimeGmt = `${convertedEndTimeHour2}:${convertedEndTimeMinutes2}`;

    const nowOnTv = {
      nowTitle: responseEntries[nowProgramIndex].title,
      nowStartTime: startTimeGmt,
      nowEndTime: endTimeGmt,
    };

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
    var userAcessDate = new Date();
    const formatedUserDate = userAcessDate.setHours(
      userAcessDate.getHours() - 3
    );
    const todaysDate = new Date(formatedUserDate).toISOString().split("T")[0];
    const apiResponse = await axios.get(
      `https://epg-api.video.globo.com/programmes/${emmiterId}?date=${request.query.dateRef}`
    );

    const responseEntries = apiResponse.data.programme.entries;
    const programmesLength = responseEntries.length;

    var arrayOfTitles = [];
    var arrayOfStartTime = [];
    var arrayOfEndTime = [];

    for (var i = programmesLength; i >= 1; i--) {
      const arrayTitleVariables = responseEntries[i - 1].title;
      arrayOfTitles.push(arrayTitleVariables);
      let convertedStartTimeHour2 =
        responseEntries[i - 1].human_start_time.split(":")[0] - 3;
      if (convertedStartTimeHour2 < 0) {
        convertedStartTimeHour2 = convertedStartTimeHour2 + 24;
      }
      const convertedStartTimeMinutes2 = responseEntries[
        i - 1
      ].human_start_time.split(":")[1];
      const startTimeGmt = `${convertedStartTimeHour2}:${convertedStartTimeMinutes2}`;
      let convertedEndTimeHour2 =
        responseEntries[i - 1].human_end_time.split(":")[0] - 3;
      if (convertedEndTimeHour2 < 0) {
        convertedEndTimeHour2 = convertedEndTimeHour2 + 24;
      }
      const convertedEndTimeMinutes2 = responseEntries[
        i - 1
      ].human_end_time.split(":")[1];
      const endTimeGmt = `${convertedEndTimeHour2}:${convertedEndTimeMinutes2}`;
      arrayOfStartTime.push(startTimeGmt);
      arrayOfEndTime.push(endTimeGmt);
    }

    const object = Object.assign({},  arrayOfTitles); 

    return response.status(200).json({
      status: 200,
      data: [object],
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
