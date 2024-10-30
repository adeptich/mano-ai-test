import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import csv from "csv-parser";
import { IncomingForm } from "formidable"; 
import fs from "fs"; 

const app = new Hono();
let data: any[] = []; 

app.use(cors({
  origin: "*", 
  allowMethods: ["GET", "POST"], 
  allowHeaders: ["Content-Type"], 
}));

app.post("/upload-csv", async (c) => {
  const form = new IncomingForm();

  return new Promise((resolve, reject) => {
    form.parse(c.req.raw as any, (err, _, files) => {
      if (err) {
        reject(c.text("Error parsing the file", 400));
        return;
      }

      const file = Array.isArray(files.file) ? files.file[0] : files.file; 
      if (!file || !file.filepath) {
        reject(c.text("No file uploaded", 400));
        return;
      }

      const results: any[] = []; 
      const readableStream = fs.createReadStream(file.filepath); 

      readableStream
        .pipe(csv())
        .on("data", (row) => results.push(row))
        .on("end", () => {
          data = results;
          console.log("CSV data parsed:", results);
          resolve(c.text("File uploaded and data saved successfully."));
        })
        .on("error", () => {
          reject(c.text("Error processing the CSV file", 500));
        });
    });
  });
});

app.get("/mfr-list", (c) => {
  // TODO: generate mfr list based on data
  return c.json(data);
});

serve({ fetch: app.fetch, port: 8080 });
console.log("Server is running on http://localhost:8080");
