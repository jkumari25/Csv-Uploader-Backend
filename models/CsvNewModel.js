// const mongoose = require("mongoose");

// const csvNewSchema = new mongoose.Schema(
//   {
//     source: {
//       type: String,
//     },
//     firstName: {
//       type: String,
//     },
//     lastName: {
//       type: String,
//     },
//     designation: {
//       type: String,
//     },
//     companyName: {
//       type: String,
//     },
//     industryType: {
//       type: String,
//     },
//     emailId: {
//       type: String,
//     },
//     phoneNo: {
//       type: String,
//     },
//     country: {
//       type: String,
//     },
//     city: {
//       type: String,
//     },
//     linkedInProfile: {
//       type: String,
//     },
//     toolsUsed: {
//       type: String,
//     },
//     organization: {
//       type: String,
//     },
//     organizationSize: {
//       type: Number,
//     },
//     Date: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   {
//     versionKey: false, // You should be aware of the outcome after set to false
//   }
// );

// module.exports = mongoose.model("CsvUpload", csvNewSchema);

const mongoose = require("mongoose");

const csvSchema = new mongoose.Schema(
  {
    srNo: {
      type: Number,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    mobilePhoneNumber: {
      type: String,
    },
    designation: {
      type: String,
    },
    companyName: {
      type: String,
      alias: "organization", // This will map the "organization" field to "companyName"
    },
    country: {
      type: String,
    },
    region: {
      type: String,
    },
    city: {
      type: String,
    },
    organizationSize: {
      type: Number,
    },
    status: {
      type: String,
    },
    industry: {
      type: String,
    },
    source: {
      type: String,
    },
    data: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create a virtual field to unify companyName and organization
csvSchema.virtual("organization").get(function () {
  return this.companyName;
});

module.exports = mongoose.model("CsvUpload", csvSchema);
