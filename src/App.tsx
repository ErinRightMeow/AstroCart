import React, { useState } from 'react';
import { UserData } from './types';
import { LandingPage } from './components/LandingPage';
import { UserInfoForm } from './components/UserInfoForm';
import { AvatarSelection } from './components/AvatarSelection';
import { InfluenceSelection } from './components/InfluenceSelection';
import { ResultsPage } from './components/ResultsPage';

type AppStep = 'landing' | 'userInfo' | 'avatar' | 'influence' | 'results';

function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>('landing');
  const [userData, setUserData] = useState<UserData>({
    resultId: '',
    avatar: '',
    influence: null,
    selectedPlanet: null
  });

  const handleGetStarted = () => {
    setCurrentStep('userInfo');
  };

  const handleUserInfoNext = (resultId: string) => {
    // The resultId from the API is now stored in our state
    setUserData(prev => ({ ...prev, resultId }));
    setCurrentStep('avatar');
  };

  const handleAvatarNext = (avatar: string) => {
    setUserData(prev => ({ ...prev, avatar }));
    setCurrentStep('influence');
  };

  const handleInfluenceNext = (influence: 'love' | 'career' | 'wealth') => {
    const planetMap = {
      love: 'Venus',
      career: 'Mars',
      wealth: 'Jupiter'
    };
    const selectedPlanet = planetMap[influence];
    setUserData(prev => ({ ...prev, influence, selectedPlanet }));
    setCurrentStep('results');
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'userInfo':
        setCurrentStep('landing');
        break;
      case 'avatar':
        setCurrentStep('userInfo');
        break;
      case 'influence':
        setCurrentStep('avatar');
        break;
      case 'results':
        setCurrentStep('influence');
        break;
    }
  };

  const handleStartOver = () => {
    setUserData({
      resultId: '',
      avatar: '',
      influence: null,
      selectedPlanet: null
    });
    setCurrentStep('landing');
  };

  switch (currentStep) {
    case 'landing':
      return <LandingPage onGetStarted={handleGetStarted} />;
    case 'userInfo':
      return <UserInfoForm onNext={handleUserInfoNext} onBack={handleBack} />;
    case 'avatar':
      return <AvatarSelection onNext={handleAvatarNext} onBack={handleBack} />;
    case 'influence':
      return <InfluenceSelection onNext={handleInfluenceNext} onBack={handleBack} />;
    case 'results':
      return <ResultsPage userData={userData} onBack={handleBack} onStartOver={handleStartOver} />;
    default:
      return <LandingPage onGetStarted={handleGetStarted} />;
  }
}

export default App;