import React, { useState } from 'react';
import { UserData } from './types';
import { LandingPage } from './components/LandingPage';
import { UserInfoForm } from './components/UserInfoForm';
import { AvatarSelection } from './components/AvatarSelection';
import { InfluenceSelection } from './components/InfluenceSelection';
import { ResultsPage } from './components/ResultsPage';
import { SavedReadings } from './components/SavedReadings';
import { AuthProvider } from './contexts/AuthContext';

type AppStep = 'landing' | 'userInfo' | 'avatar' | 'influence' | 'results' | 'savedReadings';

function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>('landing');
  const [userData, setUserData] = useState<UserData>({
    birthDate: '',
    birthTime: '',
    birthLocation: '',
    currentLocation: '',
    avatar: '',
    influence: null
  });

  const handleGetStarted = () => {
    setCurrentStep('userInfo');
  };

  const handleUserInfoNext = (data: {
    birthDate: string;
    birthTime: string;
    birthLocation: string;
    currentLocation: string;
  }) => {
    setUserData(prev => ({ ...prev, ...data }));
    setCurrentStep('avatar');
  };

  const handleAvatarNext = (avatar: string) => {
    setUserData(prev => ({ ...prev, avatar }));
    setCurrentStep('influence');
  };

  const handleInfluenceNext = (influence: 'love' | 'career' | 'wealth') => {
    setUserData(prev => ({ ...prev, influence }));
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
      case 'savedReadings':
        setCurrentStep('landing');
        break;
    }
  };

  const handleStartOver = () => {
    setUserData({
      birthDate: '',
      birthTime: '',
      birthLocation: '',
      currentLocation: '',
      avatar: '',
      influence: null
    });
    setCurrentStep('landing');
  };

  const handleViewReadings = () => {
    setCurrentStep('savedReadings');
  };

  const handleLoadReading = (loadedUserData: UserData) => {
    setUserData(loadedUserData);
    setCurrentStep('results');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'landing':
        return <LandingPage onGetStarted={handleGetStarted} onViewReadings={handleViewReadings} />;
      case 'userInfo':
        return <UserInfoForm onNext={handleUserInfoNext} onBack={handleBack} />;
      case 'avatar':
        return <AvatarSelection onNext={handleAvatarNext} onBack={handleBack} />;
      case 'influence':
        return <InfluenceSelection onNext={handleInfluenceNext} onBack={handleBack} />;
      case 'results':
        return <ResultsPage userData={userData} onBack={handleBack} onStartOver={handleStartOver} />;
      case 'savedReadings':
        return <SavedReadings onBack={handleBack} onLoadReading={handleLoadReading} />;
      default:
        return <LandingPage onGetStarted={handleGetStarted} onViewReadings={handleViewReadings} />;
    }
  };

  return (
    <AuthProvider>
      {renderCurrentStep()}
    </AuthProvider>
  );
}

export default App;