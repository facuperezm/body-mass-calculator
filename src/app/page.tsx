"use client";
import React from "react";

const INITIAL_STATE = {
  height: 0,
  weight: 0,
};

export default function Home() {
  const [value, setValue] = React.useState("metric");
  const [measures, setMeasures] = React.useState(INITIAL_STATE);
  const [bmi, setBMI] = React.useState<number | null>(null);
  function calculateBMI(weight: number, height: number) {
    if (!height || !weight) {
      setBMI(null);
      return;
    }

    if (value === "metric") {
      let heightInMeters = height / 100;
      if (isNaN(heightInMeters)) {
        setBMI(null);
      } else {
        setBMI(weight / (heightInMeters * heightInMeters));
      }
    } else {
      let heightInInches = height * 12;
      if (isNaN(heightInInches)) {
        setBMI(null);
      } else {
        setBMI((weight / (heightInInches * heightInInches)) * 703);
      }
    }
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
    <main className="max-w-6xl p-6 mx-auto text-gray-900 bg-gradient-to-r from-white to-teal-200 rounded-ee-3xl">
      {/* logo */}
      <header className="flex items-center justify-center py-2 md:flex-row">
        <div className="">
          <h1 className="text-5xl font-semibold text-left">
            Body Mass Index Calculator
          </h1>
          <p className="text-gray-600">
            Better understand your weight in relation to your height using our
            body mass index calculator. While BMI is not the sole determinant of
            healthy weight, it offers a valuable starting point to evaluate your
            overall health and well-being.
          </p>
        </div>
        <div className="gap-3 p-6 space-y-6 bg-white rounded-lg min-w-max">
          <p className="text-lg font-semibold text-gray-900">
            Enter your details below
          </p>
          <form
            className="flex gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              calculateBMI(measures.weight, measures.height);
            }}
          >
            <div className="flex flex-col gap-4">
              <label htmlFor="metric" className="flex gap-2">
                <input
                  type="radio"
                  id="metric"
                  value="metric"
                  className="bg-white border rounded-full checked:ring-4 ring-blue-300 form-radio focus:ring-2 focus:ring-blue-300"
                  checked={value === "metric"}
                  onChange={(event) => {
                    setValue(event.target.value);
                  }}
                />
                Metric
              </label>
              <label htmlFor="height">
                <input
                  className="px-5 py-3 text-lg border border-gray-300 rounded-md"
                  id="height"
                  value={measures.height}
                  onChange={(event) => {
                    const newHeight = Number(event.target.value);
                    setMeasures((measures) => ({
                      ...measures,
                      height: newHeight,
                    }));
                    calculateBMI(measures.weight, newHeight);
                  }}
                />
              </label>
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="imperial" className="flex gap-2">
                <input
                  className="uppercase transition duration-150 ease-in-out bg-blue-600 shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                  type="radio"
                  id="imperial"
                  value="imperial"
                  checked={value === "imperial"}
                  onChange={(event) => {
                    setValue(event.target.value);
                  }}
                />
                Imperial
              </label>
              <label htmlFor="weight">
                <input
                  placeholder="kg"
                  className="px-5 py-3 text-lg border border-gray-300 rounded-md"
                  id="weight"
                  value={measures.weight}
                  onChange={(event) => {
                    const newWeight = Number(event.target.value);
                    setMeasures((measures) => ({
                      ...measures,
                      weight: newWeight,
                    }));
                    calculateBMI(newWeight, measures.height);
                  }}
                />
              </label>
            </div>
          </form>
          <div className="p-6 text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded-r-[100px] rounded-l-xl">
            {!bmi ? (
              <>
                <span className="flex mb-2 text-xl font-semibold">
                  Welcome!
                </span>
                <p className="text-sm">
                  Enter your height and weight to see your BMI result here.
                </p>
              </>
            ) : (
              <>
                <div>
                  <span>Your BMI is...</span>
                  <span className="text-lg font-semibold ">
                    {bmi.toFixed(1)}
                  </span>
                </div>
                <div>
                  <p>
                    Your BMI suggests you&apos;re{" "}
                    <span>
                      {bmi < 18.5
                        ? "underweight"
                        : bmi < 24.9
                        ? "normal weight"
                        : bmi < 29.9
                        ? "overweight"
                        : "obese"}
                    </span>
                    . Your ideal weight is between{" "}
                    {calculateIdealWeightRange(measures.height).join("kg and ")}
                    kg
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </main>
  );
}
