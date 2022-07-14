export default async function handler(req, res) {
  var Airtable = require("airtable");
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID
  );

  var tableName = "Perfluoro Alkyl Acid Trendline Equations";
  var results = await base(tableName).select({
    view: "Grid view",
    //need to implement filtering: 2022-07-01
    //filterByFormula: filter
})
    // .eachPage(function page(records, fetchNextPage) {
    //     // This function (`page`) will get called for each page of records.

    //     records.forEach(function(record) {
    //         console.log('Retrieved', record.get('Title'));
    //     });

    //     // To fetch the next page of records, call `fetchNextPage`.
    //     // If there are more records, `page` will get called again.
    //     // If there are no more records, `done` will get called.
    //     fetchNextPage();

    // }, function done(err) {
    //     if (err) { console.error(err); return; }
    // });
    .all();

    var records = [];
    for (let i = 0; i < results.length; i++) {
        records.push(JSON.parse(JSON.stringify(results[i])));
    }
    res.status(200).json({ records })    
}
