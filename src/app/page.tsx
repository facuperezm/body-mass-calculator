"use client";
import React from "react";

const INITIAL_STATE = {
  height: 0,
  weight: 0,
};

export default function Home() {
  const [value, setValue] = React.useState("metric");
  const [measures, setMeasures] = React.useState(INITIAL_STATE);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(measures);
  }

  function calculateBMI(weight, height) {
    // Ensure height is in meters
    let heightInMeters = height / 100;

    // Calculate BMI
    let bmi = weight / (heightInMeters * heightInMeters);

    return bmi.toFixed(1);
  }

  return (
    <main className="text-white bg-black max-w-7xl">
      {/* logo */}
      <header className="flex flex-col items-center justify-center py-2">
        <div>
          <h1>Body Mass Index Calculator</h1>
          <p>
            Better understand your weight in relation to your height using our
            body mass index calculator. White BMI is not the sole determinant of
            healthy weight, it offers a valuable starting point to evaluate your
            overall health and well-being.
          </p>
        </div>
        <div>
          <p>Enter your details below</p>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Value</legend>

              <input
                type="radio"
                name=""
                id="metric"
                value="metric"
                checked={value === "metric"}
                onChange={(event) => {
                  setValue(event.target.value);
                }}
              />
              <label htmlFor="metric">Metric</label>
              <br />

              <input
                type="radio"
                name="agreed-to-terms"
                id="imperial"
                value="imperial"
                checked={value === "imperial"}
                onChange={(event) => {
                  setValue(event.target.value);
                }}
              />
              <label htmlFor="imperial">Imperial</label>
            </fieldset>
            <label htmlFor="height">
              <input
                id="height"
                value={measures.height}
                onChange={(event) => {
                  setMeasures(
                    (measures) =>
                      ({
                        ...measures,
                        height: Number(event.target.value),
                      } as typeof measures)
                  );
                }}
              />
            </label>
            <label htmlFor="weight">
              <input
                id="weight"
                value={measures.weight}
                onChange={(event) => {
                  setMeasures(
                    (measures) =>
                      ({
                        ...measures,
                        weight: Number(event.target.value),
                      } as typeof measures)
                  );
                }}
              />
            </label>
          </form>
          <div>
            <p>Your BMI is...</p>
            <span>{calculateBMI(measures.weight, measures.height)}</span>
          </div>
        </div>
      </header>
    </main>
  );
}
