"use client";
import React from "react";

const INITIAL_STATE = {
  height: 0,
  weight: 0,
};

export default function Home() {
  const [value, setValue] = React.useState("metric");
  const [measures, setMeasures] = React.useState(INITIAL_STATE);

  function calculateBMI(weight: number, height: number) {
    let bmi;

    if (value === "metric") {
      let heightInMeters = height / 100;
      bmi = weight / (heightInMeters * heightInMeters);
    } else {
      let heightInInches = height * 12;
      bmi = (weight / (heightInInches * heightInInches)) * 703;
    }
    return bmi.toFixed(1);
  }

  function calculateIdealWeightRange(height: number) {
    let lowerRange;
    let upperRange;
    if (value === "metric") {
      let heightInMeters = height / 100;
      lowerRange = 18.5 * (heightInMeters * heightInMeters);
      upperRange = 24.9 * (heightInMeters * heightInMeters);
    } else {
      let heightInInches = height * 12;
      lowerRange = 18.5 * (heightInInches * heightInInches);
      upperRange = 24.9 * (heightInInches * heightInInches);
    }
    return [lowerRange.toFixed(2), upperRange.toFixed(2)];
  }

  return (
    <main className="text-gray-900 bg-teal-100 max-w-7xl">
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
        <div className="p-3 bg-white rounded-lg">
          <p className="text-lg font-semibold text-gray-900">
            Enter your details below
          </p>
          <form className="" onSubmit={(e) => e.preventDefault()}>
            <fieldset className="flex gap-3">
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
            <div className="flex flex-col gap-2">
              <label htmlFor="height">
                <input
                  className="px-2 py-1 text-lg border border-gray-300 rounded-md"
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
                  className="px-2 py-1 text-lg border border-gray-300 rounded-md"
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
            </div>
          </form>
          <div className="p-2 text-white bg-blue-600 rounded-md">
            <p className="">Your BMI is...</p>
            <span className="text-5xl font-semibold ">
              {calculateBMI(measures.weight, measures.height)}
            </span>
            <p className="">
              Your BMI suggests you're a healthy. Your ideal weigth is between{" "}
              {calculateIdealWeightRange(measures.height).map((weight) => (
                <span key={weight} className="mr-2 font-semibold">
                  {weight} kg
                </span>
              ))}
            </p>
          </div>
        </div>
      </header>
    </main>
  );
}
