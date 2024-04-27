const CatchAsyncError = require("../middleware/CatchAsyncError");
const CsvUpload = require("../models/CsvNewModel");
const csv = require("csvtojson");

exports.importNewCsvFile = CatchAsyncError(async (req, res, next) => {
  try {
    var fileData = [];

    csv()
      .fromFile(req.file.path)
      .then(async (data) => {
        // Changed variable name from 'res' to 'data'
        // insert many csv file :-
        for (var i = 0; i < data.length; i++) {
          fileData.push({
            source: data[i]["Source"],
            firstName: data[i]["First Name"], // Access properties using bracket notation
            lastName: data[i]["Last Name"],
            emailId: data[i]["Email Id"],
            designation: data[i]["Designation"],
            companyName: data[i]["Company Name"],
            industryType: data[i]["Industry Type"],
            phoneNo: data[i]["Phone No"],
            country: data[i]["Country"],
            city: data[i]["City"],
            linkedInProfile: data[i]["LinkedIn Profile"],
            toolsUsed: data[i]["Tools Used"],
          });
        }
        await CsvUpload.insertMany(fileData);
      });
    res.send({ status: 200, success: true, msg: "Csv Imported" });
  } catch (error) {
    res.send({
      status: 400,
      success: false,
      msg: error.message,
    });
  }
});

// Get CSV Details:-
exports.getNewCsv = CatchAsyncError(async (req, res, next) => {
  const csv = await CsvUpload.find();

  res.status(200).json({
    success: true,
    csv,
  });
});

// Get CSV Details with Filters:-
exports.getFilteredCsv = CatchAsyncError(async (req, res, next) => {
  // Extract filter parameters from request query
  const {
    firstName,
    lastName,
    companyName,
    source,
    emailId,
    designation,
    industryType,
    phoneNo,
    country,
    city,
    linkedInProfile,
    toolsUsed,
  } = req.query;

  // Construct MongoDB query based on filter parameters
  const filter = {};
  const orConditions = [];

  if (firstName) orConditions.push({ firstName: new RegExp(firstName, "i") });
  if (lastName) orConditions.push({ lastName: new RegExp(lastName, "i") });
  if (companyName)
    orConditions.push({ companyName: new RegExp(companyName, "i") });
  if (source) orConditions.push({ source: new RegExp(source, "i") });
  if (emailId) orConditions.push({ emailId: new RegExp(emailId, "i") });
  if (designation)
    orConditions.push({ designation: new RegExp(designation, "i") });
  if (industryType)
    orConditions.push({ industryType: new RegExp(industryType, "i") });
  if (phoneNo) orConditions.push({ phoneNo: new RegExp(phoneNo, "i") });
  if (country) orConditions.push({ country: new RegExp(country, "i") });
  if (city) orConditions.push({ city: new RegExp(city, "i") });
  if (linkedInProfile)
    orConditions.push({ linkedInProfile: new RegExp(linkedInProfile, "i") });
  if (toolsUsed) orConditions.push({ toolsUsed: new RegExp(toolsUsed, "i") });

  if (orConditions.length > 0) {
    filter["$or"] = orConditions;
  }

  // Fetch CSV data with applied filters
  const csv = await CsvUpload.find(filter);

  res.status(200).json({
    success: true,
    csv,
  });
});
