import  MintButton  from "../components/mint/mint-button";

export default function Home() {
  const sampleData = require("../sample-json/pinata-sample.json");

  return (
    <>
      <div>Home</div>
      <MintButton workoutData={sampleData}/>
    </>
  );
}