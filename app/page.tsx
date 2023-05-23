"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Health from "@/components/ui/healthy";

type Measures = {
  height: number | undefined;
  weight: number | undefined;
};

const INITIAL_STATE = {
  height: undefined,
  weight: undefined,
};

const bodyText = [
  {
    title: "Underweight",
    description:
      "Healthy eating promotes weight control, disease prevention, better digestion, immunity, mental clarity, and mood.",
    src: "./icon-eating.svg",
  },
  {
    title: "Regular exercise",
    description:
      "Exercise improve fitness, aids weight control, elevates mood, and reduces disease risk, fostering wellness and longevity.",
    src: "./icon-exercise.svg",
  },
  {
    title: "Adequate sleep",
    description:
      "Sleep enhances mental clarity, emotional stability, and physical wellness, promoting overall restoration and rejuvenation.",
    src: "./icon-sleep.svg",
  },
];

export default function Home() {
  const [value, setValue] = React.useState("metric");
  const [measures, setMeasures] = React.useState<Measures>(INITIAL_STATE);
  const [bmi, setBMI] = React.useState<number | undefined>(undefined);

  function calculateBMI(
    weight: number | undefined,
    height: number | undefined
  ) {
    if (!height || !weight) {
      setBMI(undefined);
      return;
    }

    if (value === "metric") {
      let heightInMeters = height / 100;
      if (isNaN(heightInMeters)) {
        setBMI(undefined);
      } else {
        setBMI(weight / (heightInMeters * heightInMeters));
      }
    } else {
      let heightInInches = height * 12;
      if (isNaN(heightInInches)) {
        setBMI(undefined);
      } else {
        setBMI((weight / (heightInInches * heightInInches)) * 703);
      }
    }
  }

  function calculateIdealWeightRange(height: number | undefined) {
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
      <header className="flex flex-col items-center justify-center py-2 mb-4 md:flex-row">
        <div className="">
          <h1 className="mb-4 text-5xl font-bold tracking-tighter text-center px-14 md:text-left">
            Body Mass Index Calculator
          </h1>
          <p className="mb-10 text-center text-gray-600 md:text-left">
            Better understand your weight in relation to your height using our
            body mass index calculator. While BMI is not the sole determinant of
            healthy weight, it offers a valuable starting point to evaluate your
            overall health and well-being.
          </p>
        </div>
        <Card className="flex flex-col w-full mx-auto">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Enter your details below
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="flex flex-col gap-4 mb-6 md:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                calculateBMI(measures.weight, measures.height);
              }}
            >
              <div className="flex flex-row justify-between">
                <label
                  htmlFor="metric"
                  className="flex items-center gap-4 font-bold"
                >
                  <input
                    className="w-5 h-5"
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
                <label
                  htmlFor="imperial"
                  className="flex items-center gap-4 font-bold"
                >
                  <input
                    className="w-5 h-5"
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
              </div>
              <div className="flex flex-col gap-4 md:flex-row ">
                <label
                  htmlFor="height"
                  className="flex flex-col gap-1 text-sm text-gray-500"
                >
                  Height
                  <input
                    placeholder="cm"
                    type="number"
                    className="px-5 py-3 pr-2 text-xl font-semibold text-gray-900 border border-gray-300 rounded-md placeholder:text-right placeholder:text-blue-700/50 placeholder:font-semibold"
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
                <label
                  htmlFor="weight"
                  className="flex flex-col gap-1 text-sm text-gray-500"
                >
                  Weight
                  <input
                    placeholder="kg"
                    type="number"
                    id="weight"
                    className="px-5 py-3 pr-2 text-xl font-semibold text-gray-900 border border-gray-300 rounded-md placeholder:text-right placeholder:text-blue-700/50 placeholder:font-semibold"
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
            <div className="p-6 text-white bg-gradient-to-r from-blue-600 to-blue-400 md:rounded-r-[100px] rounded-r-xl rounded-l-xl">
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
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tighter text-center">
          What your BMI result means
        </h2>
        <p className="mb-10 text-center text-gray-500">
          A BMI range of 18.5 to 24.9 is considered a &apos;healthy
          weight&apos;. Mantaining a healthy weight may lower your chances of
          experiencing health issues later on, such as obesity and type 2
          diabetes. Aim for a nutritious diet with reducer fat and sugar
          content, incorporating ample fruits and vegetables. Additionally,
          strive for regular physical activity, ideally about 30 minutes daily
          for five days a week.
        </p>
      </div>
      <div className="space-y-8">
        {bodyText.map(({ title, description, src }) => (
          <Health
            key={title}
            title={title}
            description={description}
            src={src}
          />
        ))}
      </div>
    </main>
  );
}
