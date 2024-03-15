import React from "react";

const Temp = () => {
  const userData = [
    { name: "ali", phonenumbers: ["712531", "653213"], age: 20 },
    { name: "ahmed", names: ["99999", "88888"], age: 99 },
  ];

  const urlSearchParams = new URLSearchParams();

  userData.forEach((user) => {
    for (const [key, value] of Object.entries(user)) {
      if (Array.isArray(value)) {
        // Encode each element in the array and join with commas
        urlSearchParams.append(key, value.map(encodeURIComponent).join(","));
      } else {
        urlSearchParams.append(key, value);
      }
    }
  });
  console.log(urlSearchParams);
  const queryString = urlSearchParams.toString();
  const baseUrl = "https://your-backend-api/endpoint";
  const finalUrl = `${baseUrl}?${queryString}`;

  let updatedUrlString = finalUrl.replace(/%2C/g, ",");
  //   console.log(finalUrl);

  return (
    <div>
      <h1>{updatedUrlString}</h1>
      <h1>Temp</h1>
      <h1>Temp</h1>
    </div>
  );
};

export default Temp;
