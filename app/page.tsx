"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Measures = {
  height: number | null;
  weight: number | null;
};

const INITIAL_STATE = {
  height: null,
  weight: null,
};

export default function Home() {
  const [value, setValue] = React.useState("metric");
  const [measures, setMeasures] = React.useState<Measures>(INITIAL_STATE);
  const [bmi, setBMI] = React.useState<number | null>(null);

  function calculateBMI(weight: number | null, height: number | null) {
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

  function calculateIdealWeightRange(height: number | null) {
    let lowerRange;
    let upperRange;
    if (value === "metric") {
      let heightInMeters = height! / 100;
      lowerRange = 18.5 * (heightInMeters * heightInMeters);
      upperRange = 24.9 * (heightInMeters * heightInMeters);
    } else {
      let heightInInches = height! * 12;
      lowerRange = 18.5 * (heightInInches * heightInInches);
      upperRange = 24.9 * (heightInInches * heightInInches);
    }
    return [lowerRange.toFixed(2), upperRange.toFixed(2)];
  }

  return (
    <main className="max-w-6xl p-6 mx-auto text-gray-900 bg-gradient-to-r from-white to-teal-200 rounded-ee-3xl">
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
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Enter your details below
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="flex gap-4 mb-6"
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
                    checked={value === "metric"}
                    onChange={(event) => {
                      setValue(event.target.value);
                    }}
                  />
                  Metric
                </label>
                <label htmlFor="height">
                  <input
                    placeholder="cm"
                    type="number"
                    className="px-5 py-3 pr-2 text-lg border border-gray-300 rounded-md placeholder:text-right placeholder:text-blue-700/50 placeholder:font-semibold"
                    id="height"
                    value={measures.height!}
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
                    type="number"
                    id="weight"
                    className="px-5 py-3 pr-2 text-lg border border-gray-300 rounded-md placeholder:text-right placeholder:text-blue-700/50 placeholder:font-semibold"
                    value={measures.weight!}
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
                <div className="flex items-center gap-4">
                  <div className="">
                    <span>Your BMI is... </span>
                    <span className="text-xl font-semibold ">
                      {bmi.toFixed(1)}
                    </span>
                  </div>
                  <div className="whitespace-pre-line">
                    <p className="text-sm">
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
                      {calculateIdealWeightRange(measures.height).join(
                        "kg and "
                      )}
                      kg
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </header>
    </main>
  );
}
