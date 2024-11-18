import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import Step1 from './pages/Step1';
import Step2 from './pages/Step2';
import Step3 from './pages/Step3';
import ConsultCadastros from './pages/ConsultCadastros';
import UserConfirmation from './pages/UserConfirmation';

const App: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const handleStep1Next = (id: number) => {
    setUserId(id);
    setCurrentStep(2);
    localStorage.setItem('incompleteStep', '2');
    localStorage.setItem('incompleteUserId', id.toString());
  };

  const handleStep2Next = () => {
    setCurrentStep(3);
    localStorage.setItem('incompleteStep', '3');
  };

  const handleStep3Submit = () => {
    localStorage.removeItem('incompleteStep');
    localStorage.removeItem('incompleteUserId');
    setCurrentStep(5);
  };

  const startNewRegistration = () => {
    localStorage.removeItem('incompleteStep');
    localStorage.removeItem('incompleteUserId');
    setCurrentStep(1);
  };

  const continueRegistration = () => {
    const savedStep = localStorage.getItem('incompleteStep');
    const savedUserId = localStorage.getItem('incompleteUserId');

    if (savedStep && savedUserId) {
      setUserId(Number(savedUserId));
      setCurrentStep(Number(savedStep));
    } else {
      startNewRegistration();
    }
  };

  const consultCadastros = () => {
    setCurrentStep(4);
  };

  const backToHome = () => {
    setCurrentStep(0);
  };

  return (
    <>
      {currentStep === 0 && (
        <HomePage
          onStartNewRegistration={startNewRegistration}
          onConsultCadastros={consultCadastros}
          onContinueRegistration={continueRegistration}
        />
      )}
      {currentStep === 1 && <Step1 onNext={handleStep1Next} />}
      {currentStep === 2 && userId && <Step2 userId={userId} onNext={handleStep2Next} />}
      {currentStep === 3 && userId && <Step3 userId={userId} onSubmit={handleStep3Submit} />}
      {currentStep === 4 && <ConsultCadastros onBackToHome={backToHome} />}
      {currentStep === 5 && userId && (
        <UserConfirmation
          userId={userId}
          onBackToHome={backToHome}
          onConsultCadastros={consultCadastros}
        />
      )}
    </>
  );
};

export default App;
