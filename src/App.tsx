import { useState } from 'react';
import './styles/global.css';
import { CursorSparkle } from './components/FloatingHearts';
import { ToastContainer } from './components/ToastContainer';
import { WelcomePage } from './pages/WelcomePage';
import { RelationshipCourtPage } from './pages/RelationshipCourtPage';
import { ApologyFormPage } from './pages/ApologyFormPage';
import { LoveQuizPage } from './pages/LoveQuizPage';
import { SurpriseBoxPage } from './pages/SurpriseBoxPage';
import { HeartfeltApologyPage } from './pages/HeartfeltApologyPage';
import { FinalQuestionPage } from './pages/FinalQuestionPage';

type Page = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export default function App() {
  const [page, setPage] = useState<Page>(1);

  function goTo(p: Page) {
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(p);
  }

  return (
    <>
      <CursorSparkle />
      <ToastContainer />

      {page === 1 && <WelcomePage onNext={() => goTo(2)} />}
      {page === 2 && <RelationshipCourtPage onNext={() => goTo(3)} onBack={() => goTo(1)} />}
      {page === 3 && <ApologyFormPage onNext={() => goTo(4)} onBack={() => goTo(2)} />}
      {page === 4 && <LoveQuizPage onNext={() => goTo(5)} onBack={() => goTo(3)} />}
      {page === 5 && <SurpriseBoxPage onNext={() => goTo(6)} onBack={() => goTo(4)} />}
      {page === 6 && <HeartfeltApologyPage onNext={() => goTo(7)} onBack={() => goTo(5)} />}
      {page === 7 && <FinalQuestionPage onRestart={() => goTo(1)} />}
    </>
  );
}
