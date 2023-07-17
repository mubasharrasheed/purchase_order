const busboy = require("busboy");
const { parse } = require("csv-parse");
const { verifyProduct } = require("../helpers/product.helper");
const { propfind } = require("../routes");
const { Order } = require("../models/index");

const bulkCreate = async (req, res, next) => {
  try {
    const body = {};
    const bb = busboy({ headers: req.headers });
    const parser = parse({
      skip_lines_with_error: true,
      columns: (header) => {
        let editedHeaders = [];
        if (header.length == 3) {
          editedHeaders = header.map((head) => {
            if (head?.toLowerCase() == "model number") {
              return "modelNumber";
            } else if (head?.toLowerCase() == "unit price") {
              return "unitPrice";
            }
            return head?.toLowerCase();
          });
          if (
            !(
              editedHeaders.includes("modelNumber") &&
              editedHeaders.includes("unitPrice") &&
              editedHeaders.includes("quantity")
            )
          ) {
            throw new Error("Invalid CSV format");
          }
          return editedHeaders;
        }
        throw new Error("Invalid CSV format");
      },
      relax_quotes: true,
    });
    let productArray = [];
    let skippedCount = 0;
    await new Promise((resolve, reject) => {
      bb.on("file", async (name, file, info) => {
        const pipleline = file
          .pipe(parser)
          .on("data", async (data, i) => {
            if (verifyProduct(data)) {
              const product = await Order.create({
                date: new Date(body.date),
                vendorName: body.vendorName,
                ...data,
              });
              productArray.push(product);
            } else {
              ++skippedCount;
            }
          })
          .on("end", () => {
            let interval = setInterval(async () => {
              clearInterval(interval);
              resolve();
            }, 10000);
          });
      });
      bb.on(
        "field",
        function (
          fieldname,
          val,
          fieldnameTruncated,
          valTruncated,
          encoding,
          mimetype
        ) {
          body[fieldname] = val;
        }
      );
      bb.on("error", (err) => {
        req.unpipe(bb);
        reject(err);
      });
      req.pipe(bb);
    });
    res.send({
      message: `${productArray.length} order placed so far, rest are being uploaded, ${skippedCount} orders skipped due to validation errors`,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).lean();
    res.json({
      data: orders,
      message: "Orders found!",
    });
  } catch (error) {
    res.json("Unable to get the data!");
  }
};

module.exports = { bulkCreate, getOrders };
