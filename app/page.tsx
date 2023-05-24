"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Health from "@/components/ui/healthy";
import Box from "@/components/ui/boxes";

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
    title: "Healthy eating",
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

const boxesText = [
  {
    title: "Gender",
    description:
      "The development and body fat composition of girls and boys may vary with age. Consequently, a child&apos;s age and gender are considered when evalating their BMI.",
    src: "./icon-gender.svg",
  },
  {
    title: "Age",
    description:
      "In aging individuals, increased body fat and muscle loss may cause BMI to underestimate body fat content.",
    src: "./icon-age.svg",
  },
  {
    title: "Muscle",
    description:
      "BMI may misclassify muscular individuals as overweight or obese, as it doesn't distinguish between fat and muscle.",
    src: "./icon-muscle.svg",
  },
  {
    title: "Pregnancy",
    description:
      "Expectant mothers experience weight gain due to their growing baby. Mantaining a healthy pre-pregnancy BMI is advisable to minimise health risks for both mother and child.",
    src: "./icon-pregnancy.svg",
  },
  {
    title: "Race",
    description:
      "Certain health concerns may affect individuals of some Black and Asian origins at lower BMI levels than others. To learn more, it is advised to discuss this with your GP or practice nurse.",
    src: "./icon-race.svg",
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
        <div className="flex-1 mr-14 md:text-left md:flex md:flex-col">
          <img
            className="mb-6"
            src="./logo.svg"
            alt=""
            width={50}
            height={50}
          />
          <h1 className="mb-6 text-5xl font-bold tracking-tighter text-center md:text-left">
            Body Mass Index Calculator
          </h1>
          <p className="mb-20 text-center text-gray-600 md:text-left">
            Better understand your weight in relation to your height using our
            body mass index calculator. While BMI is not the sole determinant of
            healthy weight, it offers a valuable starting point to evaluate your
            overall health and well-being.
          </p>
        </div>
        <div className="max-w-lg">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Enter your details below
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                className="flex flex-col gap-4 mb-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  calculateBMI(measures.weight, measures.height);
                }}
              >
                <div className="flex flex-row justify-between ">
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
                <div className="">
                  <label htmlFor="height" className="text-sm text-gray-500 ">
                    Height
                  </label>
                  <input
                    placeholder="cm"
                    type="number"
                    className="px-4 py-2 pr-2 text-xl font-semibold text-gray-900 border border-gray-300 rounded-md placeholder:text-right placeholder:text-blue-700/50 placeholder:font-semibold"
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
                  <label htmlFor="weight" className="text-sm text-gray-500 ">
                    Weight
                  </label>
                  <input
                    placeholder="kg"
                    type="number"
                    id="weight"
                    className="px-4 py-2 pr-2 text-xl font-semibold text-gray-900 border border-gray-300 rounded-md placeholder:text-right placeholder:text-blue-700/50 placeholder:font-semibold"
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
        </div>
      </header>
      <img
        className="mb-20"
        src="./image-man-eating.webp"
        alt=""
        width={330}
        height="auto"
      />
      <div className="mb-20">
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
      <div className="mb-20 space-y-8">
        {bodyText.map(({ title, description, src }) => (
          <Health
            key={title}
            title={title}
            description={description}
            src={src}
          />
        ))}
      </div>
      <section className="mb-20">
        <h2 className="mb-6 text-3xl font-bold tracking-tighter text-center">
          Limitations of BMI
        </h2>
        <p className="mb-20 text-center text-gray-500">
          Although BMI is often a practical indicator of healthy weight, it is
          not suited for every person. Specific groups should carefully consider
          their BMI outcomes, and in certain cases, the measurement may not be
          beneficial to use.
        </p>
        <div className="space-y-6">
          {boxesText.map(({ title, description, src }) => (
            <Box
              key={title}
              title={title}
              description={description}
              src={src}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
