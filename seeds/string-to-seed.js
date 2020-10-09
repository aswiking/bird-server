
export default function stringToSeed(tableData) {

function splitAtLineBreak() {
const dataRows = tableData.split("\n");
return dataRows;
}
const dataRows = splitAtLineBreak();


const formattedData = dataRows.map((row) => {
return row.split("	")
})

console.log('formattedData is', formattedData)

const cleanedData = formattedData.map((row) => {
const newRow = row.slice(0, 3);
return newRow;
})

console.log('cleanedData is', cleanedData);

return cleanedData;
}



