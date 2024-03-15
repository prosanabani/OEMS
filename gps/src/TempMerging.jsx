import React from "react";

const TempMerging = () => {
  function mergingArrays(...arrays) {
    let mergedArray = [];
    arrays.forEach((array) => {
      mergedArray = mergedArray.concat(array);
    });
    return mergedArray;
  }
  const arrObject1 = [
    { id: 1, name: "John" },
    { id: 2, name: "Alice" },
  ];
  const arrObject2 = [
    { id: 3, name: "Bob" },
    { id: 4, name: "Eve" },
  ];
  const arrObject3 = [
    { id: 5, name: ["Charlie", "aliali"] },
    { id: 6, name: "Diana" },
  ];

  const mergedArray = mergingArrays(arrObject1, arrObject2, arrObject3);

  const urlSearchParams = new URLSearchParams();
  mergedArray.forEach((user) => {
    for (const [key, value] of Object.entries(user)) {
      if (Array.isArray(value)) {
        // Encode each element in the array and join with commas
        urlSearchParams.append(key, value.map(encodeURIComponent).join(","));
      } else {
        urlSearchParams.append(key, value);
      }
    }
  });

  //   console.log(urlSearchParams);
  const queryString = urlSearchParams.toString();
  const baseUrl = "https://your-backend-api/endpoint";
  const finalUrl = `${baseUrl}?${queryString}`;

  let updatedUrlString = finalUrl.replace(/%2C/g, ",");
  //   console.log(finalUrl);

  //   console.log(mergedArray);
  return <div>{updatedUrlString}</div>;
};

export default TempMerging;
