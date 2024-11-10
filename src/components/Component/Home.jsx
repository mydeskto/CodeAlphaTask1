import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calculator, CheckSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate()
 
  const navigateToApp = (appName) => {

    navigate(`${appName}`)
  };
 

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Welcome to Your Apps
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="text-center text-gray-600 mb-6">
            Choose an application to get started
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">

            <button
              onClick={() => navigateToApp('agecalculator')}
              className="group relative flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-blue-500"
            >
              <Calculator className="w-12 h-12 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Age Calculator
              </h2>
              <p className="text-sm text-gray-600 text-center">
                Calculate age from date of birth
              </p>
            </button>
            <button
              onClick={() => navigateToApp('todolist')}
              className="group relative flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-blue-500"
            >
              <CheckSquare className="w-12 h-12 text-green-600 mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Todo List
              </h2>
              <p className="text-sm text-gray-600 text-center">
                Manage your daily tasks
              </p>
            </button>
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;