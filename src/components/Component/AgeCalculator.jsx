import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [age, setAge] = useState(null);
  const [error, setError] = useState("");

  const calculateAge = () => {
    setError("");

    if (!birthDate.day || !birthDate.month || !birthDate.year) {
      setError("Please fill in all fields");
      return;
    }

    const day = parseInt(birthDate.day);
    const month = parseInt(birthDate.month) - 1;
    const year = parseInt(birthDate.year);
    const birthDateTime = new Date(year, month, day);
    const currentDate = new Date();
    if (birthDateTime > currentDate) {
      setError("Birth date can't be in the future");
      return;
    }

    if (
      birthDateTime.getDate() !== day ||
      birthDateTime.getMonth() !== month ||
      birthDateTime.getFullYear() !== year
    ) {
      setError("Invalid date");
      return;
    }
    let ageYears = currentDate.getFullYear() - birthDateTime.getFullYear();
    let ageMonths = currentDate.getMonth() - birthDateTime.getMonth();
    let ageDays = currentDate.getDate() - birthDateTime.getDate();
    if (ageDays < 0) {
      ageMonths--;
      const previousMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      );
      const daysInPreviousMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      ).getDate();
      ageDays += daysInPreviousMonth;
    }

    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    setAge({ years: ageYears, months: ageMonths, days: ageDays });
  };

  const InputChange = (e) => {
    const { name, value } = e.target;
    setBirthDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Age Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Day</label>
              <input
                type="number"
                name="day"
                value={birthDate.day}
                onChange={InputChange}
                placeholder="DD"
                min="1"
                max="31"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Month</label>
              <input
                type="number"
                name="month"
                value={birthDate.month}
                onChange={InputChange}
                placeholder="MM"
                min="1"
                max="12"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Year</label>
              <input
                type="number"
                name="year"
                value={birthDate.year}
                onChange={InputChange}
                placeholder="YYYY"
                min="1900"
                max={new Date().getFullYear()}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <button
            onClick={calculateAge}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Calculate Age
          </button>

          {error && (
            <div className="text-red-500 text-center mt-2">{error}</div>
          )}

          {age && !error && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold text-center mb-2">
                Your Age is
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <span className="text-2xl font-bold text-blue-600">
                    {age.years}
                  </span>
                  <p className="text-sm">years</p>
                </div>
                <div>
                  <span className="text-2xl font-bold text-blue-600">
                    {age.months}
                  </span>
                  <p className="text-sm">months</p>
                </div>
                <div>
                  <span className="text-2xl font-bold text-blue-600">
                    {age.days}
                  </span>
                  <p className="text-sm">days</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgeCalculator;
