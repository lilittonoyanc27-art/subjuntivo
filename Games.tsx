import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  MessageSquare, 
  Activity, 
  Flame, 
  Check, 
  Lightbulb,
  Award,
  ChevronRight
} from 'lucide-react';
import { 
  game1Questions, 
  game2Challenges, 
  game3Items, 
  game4Challenges, 
  game5Challenges, 
  game6Steps,
  game2Challenges as Game2ChallengeType 
} from './gamesData';

interface GameProps {
  onGameComplete: (gameId: number, score: number) => void;
}

export function Game1({ onGameComplete }: GameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = game1Questions[currentIndex];

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    const correct = idx === currentQuestion.correctIndex;
    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < game1Questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      onGameComplete(1, score + (selectedOption === currentQuestion.correctIndex ? 1 : 0));
    }
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <GameCompletionScreen 
        score={score} 
        total={game1Questions.length} 
        title="Indicativo vs Subjuntivo" 
        onRestart={restartGame} 
      />
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 border-2 border-vibrant-charcoal shadow-retro max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-mono px-3 py-1 bg-vibrant-cardbg text-vibrant-charcoal border-2 border-vibrant-charcoal rounded-full font-bold">Կանոն 1: Փաստ թե Ցանկություն/Կասկած</span>
        <span className="text-xs font-mono font-bold text-vibrant-charcoal/80">Հարց {currentIndex + 1} / {game1Questions.length}</span>
      </div>

      <div className="mb-4">
        <div className="h-4 w-full bg-vibrant-cardbg rounded-full overflow-hidden border-2 border-vibrant-charcoal">
          <div 
            className="h-full bg-vibrant-primary transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / game1Questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="text-xl md:text-2xl font-black tracking-tight text-vibrant-charcoal mb-2 leading-snug">
        {currentQuestion.sentence.split("___").map((part, i) => (
          <span key={i}>
            {part}
            {i === 0 && (
              <span className="inline-block px-4 py-1 mx-1 border-2 border-vibrant-charcoal font-black font-mono text-vibrant-primary bg-[#fffae5] rounded min-w-[100px] text-center shadow-retro-sm">
                {isAnswered ? currentQuestion.options[currentQuestion.correctIndex] : "..."}
              </span>
            )}
          </span>
        ))}
      </h3>
      <p className="text-vibrant-charcoal/70 italic text-sm mb-6 font-semibold">« {currentQuestion.translation} »</p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mb-6">
        {currentQuestion.options.map((option, idx) => {
          let btnClass = "bg-white border-2 border-vibrant-charcoal hover:bg-vibrant-cardbg hover:shadow-retro-sm text-vibrant-charcoal font-black cursor-pointer shadow-retro-sm";
          let icon = null;

          if (isAnswered) {
            if (idx === currentQuestion.correctIndex) {
              btnClass = "bg-emerald-150 border-2 border-emerald-500 text-emerald-900 font-black shadow-retro-sm";
              icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
            } else if (idx === selectedOption) {
              btnClass = "bg-rose-100 border-2 border-rose-400 text-rose-950 font-black shadow-retro-sm";
              icon = <XCircle className="w-5 h-5 text-rose-500 shrink-0" />;
            } else {
              btnClass = "opacity-40 bg-white border-2 border-vibrant-charcoal/40 text-vibrant-charcoal/40 pointer-events-none";
            }
          }

          return (
            <button
              id={`g1-option-${idx}`}
              key={idx}
              onClick={() => handleOptionClick(idx)}
              className={`flex items-center justify-between p-4 rounded-xl text-left transition-all duration-200 ${btnClass}`}
              disabled={isAnswered}
            >
              <span className="font-mono text-base">{option}</span>
              {icon}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`p-4 rounded-xl mb-6 border-2 ${
              selectedOption === currentQuestion.correctIndex 
                ? 'bg-emerald-50 border-emerald-400 text-vibrant-charcoal shadow-retro-sm' 
                : 'bg-[#fffae5] border-vibrant-secondary text-vibrant-charcoal shadow-retro-sm'
            }`}
          >
            <div className="flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-vibrant-primary shrink-0 mt-0.5" />
              <div>
                <span className="font-black text-vibrant-accent">
                  {selectedOption === currentQuestion.correctIndex ? 'Ճիշտ է։ ' : 'Փորձեք հասկանալ. '}
                </span>
                <p className="text-xs sm:text-sm mt-1 text-vibrant-charcoal font-medium leading-relaxed font-sans">{currentQuestion.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end">
        {isAnswered && (
          <button
            id="g1-btn-next"
            onClick={handleNext}
            className="flex items-center gap-2 bg-vibrant-primary text-white hover:bg-vibrant-primary/95 text-xs sm:text-sm font-black px-6 py-3 rounded-xl border-2 border-vibrant-charcoal shadow-retro-[4px_4px_0px_rgba(30,39,46,1)] transition-transform active:translate-y-0.5 cursor-pointer"
          >
            {currentIndex === game1Questions.length - 1 ? "Ավարտել" : "Հաջորդը"}
            <ArrowRight className="w-4 h-4 text-vibrant-secondary" />
          </button>
        )}
      </div>
    </div>
  );
}

export function Game2({ onGameComplete }: GameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const challenge = game2Challenges[currentIndex];

  const handleSelectOption = (opt: string) => {
    if (isVerified) return;
    setSelected(opt);
    setIsVerified(true);
    if (opt === challenge.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < game2Challenges.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelected(null);
      setIsVerified(false);
    } else {
      setIsFinished(true);
      onGameComplete(2, score + (selected === challenge.correctAnswer ? 1 : 0));
    }
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setSelected(null);
    setIsVerified(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <GameCompletionScreen 
        score={score} 
        total={game2Challenges.length} 
        title="Խոնարհման Կոնստրուկտոր" 
        onRestart={restartGame} 
      />
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 border-2 border-vibrant-charcoal shadow-retro max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-mono px-3 py-1 bg-vibrant-cardbg text-vibrant-charcoal border-2 border-vibrant-charcoal rounded-full font-bold">Կանոն 2: Presente Subjuntivo Խոնարհումներ</span>
        <span className="text-xs font-mono font-bold text-vibrant-charcoal">Բայ {currentIndex + 1} / {game2Challenges.length}</span>
      </div>

      <div className="mb-4">
        <div className="h-4 w-full bg-vibrant-cardbg border-2 border-vibrant-charcoal rounded-full overflow-hidden">
          <div 
            className="h-full bg-vibrant-accent transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / game2Challenges.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-vibrant-cardbg border-2 border-vibrant-charcoal rounded-xl p-5 mb-6 shadow-retro-sm">
        <div className="text-xs font-mono font-black text-vibrant-accent">ԲԱՅՆ ՈՒ ԴԵՄՔԸ</div>
        <div className="text-2xl font-black text-vibrant-charcoal mt-1 flex items-center gap-2">
          <span className="text-vibrant-primary">{challenge.verb}</span> 
          <span className="text-vibrant-charcoal/40">→</span> 
          <span className="bg-vibrant-secondary/30 border border-vibrant-charcoal text-vibrant-charcoal px-3 py-0.5 rounded text-lg font-black">{challenge.pronoun}</span>
        </div>
        <p className="text-sm text-vibrant-charcoal/70 mt-2 font-semibold italic">« {challenge.translation} »</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {challenge.options.map((opt, idx) => {
          let cardClass = "bg-white border-2 border-vibrant-charcoal text-vibrant-charcoal hover:bg-vibrant-cardbg font-black cursor-pointer shadow-retro-sm";
          let badge = null;

          if (isVerified) {
            if (opt === challenge.correctAnswer) {
              cardClass = "bg-emerald-150 border-2 border-emerald-500 text-emerald-900 font-black shadow-retro-sm";
              badge = <Check className="w-5 h-5 text-emerald-600 font-bold" />;
            } else if (opt === selected) {
              cardClass = "bg-rose-100 border-2 border-rose-400 text-rose-950 font-black shadow-retro-sm";
              badge = <XCircle className="w-5 h-5 text-rose-500" />;
            } else {
              cardClass = "opacity-40 bg-white border-2 border-vibrant-charcoal/40 text-vibrant-charcoal/40 pointer-events-none shadow-none";
            }
          }

          return (
            <button
              id={`g2-opt-${idx}`}
              key={idx}
              onClick={() => handleSelectOption(opt)}
              className={`p-4 rounded-xl text-center font-mono text-lg transition-all duration-250 flex flex-col items-center justify-center gap-2 ${cardClass}`}
              disabled={isVerified}
            >
              <span>{opt}</span>
              {badge}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {isVerified && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-xl bg-[#fffae5] border-2 border-vibrant-secondary text-vibrant-charcoal mb-6 text-sm flex gap-3 shadow-retro-sm"
          >
            <InfoIcon />
            <div>
              <span className="font-black text-vibrant-accent block mb-1">Բացատրություն՝</span>
              <p className="leading-relaxed text-xs sm:text-sm font-semibold font-sans">{challenge.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end">
        {isVerified && (
          <button
            id="g2-next-btn"
            onClick={handleNext}
            className="flex items-center gap-2 bg-vibrant-primary text-white hover:bg-vibrant-primary/95 text-xs sm:text-sm font-black px-6 py-3 rounded-xl border-2 border-vibrant-charcoal shadow-retro-[4px_4px_0px_rgba(30,39,46,1)] transition-transform active:translate-y-0.5 cursor-pointer"
          >
            {currentIndex === game2Challenges.length - 1 ? "Ավարտել" : "Հաջորդը"}
            <ArrowRight className="w-4 h-4 text-vibrant-secondary" />
          </button>
        )}
      </div>
    </div>
  );
}

export function Game3({ onGameComplete }: GameProps) {
  // WEDDING Acronym Matcher
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const item = game3Items[currentIndex];

  const weddingCategories = [
    { key: 'W', label: 'W', name: 'Wishes (Ցանկություններ)' },
    { key: 'E', label: 'E', name: 'Emotions (Զգացմունքներ)' },
    { key: 'D', label: 'D', name: 'Doubt (Կասկած)' },
    { key: 'D2', label: 'D', name: 'Denial (Ժխտում)' },
    { key: 'I', label: 'I', name: 'Impersonal (Անանձնական)' },
    { key: 'N', label: 'N', name: 'Necessity (Անհրաժեշտություն)' },
    { key: 'G', label: 'G', name: 'Goals (Նպատակներ)' }
  ];

  const handleMatch = (key: string) => {
    if (isAnswered) return;
    setSelectedCat(key);
    setIsAnswered(true);
    if (key === item.category) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < game3Items.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedCat(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      onGameComplete(3, score + (selectedCat === item.category ? 1 : 0));
    }
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setSelectedCat(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <GameCompletionScreen 
        score={score} 
        total={game3Items.length} 
        title="WEDDING Ակրոնիմ Մրցույթ" 
        onRestart={restartGame} 
      />
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 border-2 border-vibrant-charcoal shadow-retro max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-mono px-3 py-1 bg-vibrant-cardbg text-vibrant-charcoal border-2 border-vibrant-charcoal rounded-full font-bold">Կանոն 3: WEDDING Ակրոնիմի հետքերով</span>
        <span className="text-xs font-mono font-bold text-vibrant-charcoal">Նախադասություն {currentIndex + 1} / {game3Items.length}</span>
      </div>

      <div className="mb-4">
        <div className="h-4 w-full bg-vibrant-cardbg border-2 border-vibrant-charcoal rounded-full overflow-hidden">
          <div 
            className="h-full bg-vibrant-primary transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / game3Items.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-vibrant-primary text-white border-2 border-vibrant-charcoal rounded-2xl p-6 text-center mb-6 relative overflow-hidden shadow-retro-sm">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sparkles className="w-24 h-24 text-vibrant-secondary" />
        </div>
        <div className="text-xs font-mono tracking-widest text-vibrant-secondary font-black uppercase mb-2">ԳՏԵՔ ՃԻՇՏ ԱԶԴԱՆՇԱՆԸ</div>
        <h4 className="text-2xl font-black font-sans tracking-tight mb-2 text-white">{item.sentence}</h4>
        <p className="text-vibrant-secondary text-sm font-bold italic">« {item.translation} »</p>
      </div>

      <p className="text-sm font-black text-vibrant-accent mb-3">Ո՞ր WEDDING կատեգորիային է պատկանում այս նախադասությունը:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {weddingCategories.map((cat) => {
          let btnClass = "bg-white border-2 border-vibrant-charcoal text-vibrant-charcoal hover:bg-vibrant-cardbg font-black cursor-pointer shadow-retro-sm";
          let badgeColor = "bg-vibrant-cardbg text-vibrant-charcoal border-2 border-vibrant-charcoal";

          if (isAnswered) {
            if (cat.key === item.category) {
              btnClass = "bg-emerald-150 border-2 border-emerald-500 text-emerald-900 font-black shadow-retro-sm";
              badgeColor = "bg-emerald-400 text-white border-2 border-emerald-600";
            } else if (cat.key === selectedCat) {
              btnClass = "bg-rose-100 border-2 border-rose-450 text-rose-950 font-black shadow-retro-sm";
              badgeColor = "bg-rose-450 text-white border-2 border-rose-700";
            } else {
              btnClass = "opacity-40 bg-white border-2 border-vibrant-charcoal/40 text-vibrant-charcoal/40 pointer-events-none shadow-none";
            }
          }

          return (
            <button
              id={`g3-cat-${cat.key}`}
              key={cat.key}
              onClick={() => handleMatch(cat.key)}
              className={`flex items-center gap-3 p-3.5 rounded-xl text-left transition-all duration-150 ${btnClass}`}
              disabled={isAnswered}
            >
              <span className={`w-9 h-9 rounded-lg flex items-center justify-center font-black text-lg ${badgeColor}`}>
                {cat.label}
              </span>
              <span className="text-sm">{cat.name}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-xl bg-[#fffae5] border-2 border-vibrant-secondary text-vibrant-charcoal mb-6 text-sm shadow-retro-sm"
          >
            <div className="flex gap-3">
              <Sparkles className="w-5 h-5 text-vibrant-primary shrink-0 mt-0.5 animate-spin-slow" />
              <div>
                <span className="font-black text-vibrant-accent block mb-1">Բացատրություն և Ազդանշան՝</span>
                <p className="leading-relaxed font-semibold">{item.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end">
        {isAnswered && (
          <button
            id="g3-next-btn"
            onClick={handleNext}
            className="flex items-center gap-2 bg-vibrant-primary text-white hover:bg-vibrant-primary/95 text-xs sm:text-sm font-black px-6 py-3 rounded-xl border-2 border-vibrant-charcoal shadow-retro-[4px_4px_0px_rgba(30,39,46,1)] transition-transform active:translate-y-0.5 cursor-pointer"
          >
            {currentIndex === game3Items.length - 1 ? "Ավարտել" : "Հաջորդը"}
            <ArrowRight className="w-4 h-4 text-vibrant-secondary" />
          </button>
        )}
      </div>
    </div>
  );
}

export function Game4({ onGameComplete }: GameProps) {
  // Cuando Clauses (Future vs Habitual)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const challenge = game4Challenges[currentIndex];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
    setIsAnswered(true);
    if (idx === challenge.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < game4Challenges.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedIdx(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      onGameComplete(4, score + (selectedIdx === challenge.correctIndex ? 1 : 0));
    }
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setSelectedIdx(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <GameCompletionScreen 
        score={score} 
        total={game4Challenges.length} 
        title="Cuando & Ապագա իմաստ" 
        onRestart={restartGame} 
      />
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 border-2 border-vibrant-charcoal shadow-retro max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-mono px-3 py-1 bg-vibrant-cardbg text-vibrant-charcoal border-2 border-vibrant-charcoal rounded-full font-bold">Կանոն 4: Ժամանակային կապեր (ապագա թե սովորական ներկա)</span>
        <span className="text-xs font-mono font-bold text-vibrant-charcoal">Հարց {currentIndex + 1} / {game4Challenges.length}</span>
      </div>

      <div className="mb-4">
        <div className="h-4 w-full bg-vibrant-cardbg border-2 border-vibrant-charcoal rounded-full overflow-hidden">
          <div 
            className="h-full bg-vibrant-primary transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / game4Challenges.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-6 p-5 rounded-xl border-2 border-vibrant-charcoal bg-[#fffae5] shadow-retro-sm">
        <h4 className="text-lg font-black text-vibrant-charcoal flex items-center gap-2 mb-1">
          <span>{challenge.sentence.replace('___', '______')}</span>
        </h4>
        <p className="text-sm text-vibrant-charcoal/70 font-semibold italic">« {challenge.translation} »</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {challenge.options.map((opt, idx) => {
          let btnClass = "bg-white border-2 border-vibrant-charcoal text-vibrant-charcoal hover:bg-vibrant-cardbg font-black cursor-pointer shadow-retro-sm";
          let badge = null;

          if (isAnswered) {
            if (idx === challenge.correctIndex) {
              btnClass = "bg-emerald-150 border-2 border-emerald-500 text-emerald-900 font-black shadow-retro-sm";
              badge = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
            } else if (idx === selectedIdx) {
              btnClass = "bg-rose-100 border-2 border-rose-400 text-rose-950 font-black shadow-retro-sm";
              badge = <XCircle className="w-5 h-5 text-rose-500 shrink-0" />;
            } else {
              btnClass = "opacity-40 bg-white border-2 border-vibrant-charcoal/40 text-vibrant-charcoal/40 pointer-events-none shadow-none";
            }
          }

          return (
            <button
              id={`g4-opt-${idx}`}
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`flex items-center justify-between p-4 rounded-xl text-left transition-all duration-200 ${btnClass}`}
              disabled={isAnswered}
            >
              <div>
                <span className="font-mono text-lg block">{opt}</span>
                <span className="text-xs text-vibrant-primary font-sans block mt-1 font-bold">
                  {idx === 0 ? 'Indicativo եղանակ' : 'Subjuntivo եղանակ'}
                </span>
              </div>
              {badge}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-xl bg-vibrant-cardbg border-2 border-vibrant-charcoal text-vibrant-charcoal mb-6 text-sm shadow-retro-sm"
          >
            <div className="flex gap-3">
              <Lightbulb className="w-5 h-5 text-vibrant-primary shrink-0 mt-0.5" />
              <div>
                <span className="font-black text-vibrant-accent block mb-1">Բացատրություն և կանոն՝</span>
                <p className="leading-relaxed font-semibold">{challenge.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end">
        {isAnswered && (
          <button
            id="g4-next-btn"
            onClick={handleNext}
            className="flex items-center gap-2 bg-vibrant-primary text-white hover:bg-vibrant-primary/95 text-xs sm:text-sm font-black px-6 py-3 rounded-xl border-2 border-vibrant-charcoal shadow-retro-[4px_4px_0px_rgba(30,39,46,1)] transition-transform active:translate-y-0.5 cursor-pointer"
          >
            {currentIndex === game4Challenges.length - 1 ? "Ավարտել" : "Հաջորդը"}
            <ArrowRight className="w-4 h-4 text-vibrant-secondary" />
          </button>
        )}
      </div>
    </div>
  );
}

export function Game5({ onGameComplete }: GameProps) {
  // Condición y Ojalá Matcher (Si & Ojalá)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const challenge = game5Challenges[currentIndex];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
    setIsAnswered(true);
    if (idx === challenge.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < game5Challenges.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedIdx(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      onGameComplete(5, score + (selectedIdx === challenge.correctIndex ? 1 : 0));
    }
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setSelectedIdx(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <GameCompletionScreen 
        score={score} 
        total={game5Challenges.length} 
        title="Si & Ojalá Կոնստրուկտոր" 
        onRestart={restartGame} 
      />
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 border-2 border-vibrant-charcoal shadow-retro max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-mono px-3 py-1 bg-vibrant-cardbg text-vibrant-charcoal border-2 border-vibrant-charcoal rounded-full font-bold">Կանոն 5: Condición (Si) և Deseo (Ojalá)</span>
        <span className="text-xs font-mono font-bold text-vibrant-charcoal">Հարց {currentIndex + 1} / {game5Challenges.length}</span>
      </div>

      <div className="mb-4">
        <div className="h-4 w-full bg-vibrant-cardbg border-2 border-vibrant-charcoal rounded-full overflow-hidden">
          <div 
            className="h-full bg-vibrant-primary transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / game5Challenges.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-6 p-5 rounded-2xl bg-vibrant-primary text-white border-2 border-vibrant-charcoal relative overflow-hidden shadow-retro-sm">
        <span className="absolute top-2 right-4 text-xs font-mono font-black text-vibrant-charcoal bg-vibrant-secondary px-2.5 py-1 border border-vibrant-charcoal rounded">
          {challenge.tenseUsed}
        </span>
        <div className="text-xs font-mono text-vibrant-secondary font-black mb-2 uppercase">Լրացրեք նախադասությունը՝</div>
        <h4 className="text-2xl font-black font-sans my-1 text-white">
          {challenge.sentence.split("___").map((part, i) => (
            <span key={i}>
              {part}
              {i === 0 && (
                <span className="inline-block px-3 py-0.5 mx-1.5 bg-white border-2 border-vibrant-charcoal font-black font-mono text-vibrant-accent rounded shadow-retro-sm">
                  {isAnswered ? challenge.options[challenge.correctIndex] : "..."}
                </span>
              )}
            </span>
          ))}
        </h4>
        <p className="text-vibrant-secondary text-sm font-bold italic mt-2">« {challenge.translation} »</p>
      </div>

      <div className="grid grid-cols-1 gap-2.5 mb-6">
        {challenge.options.map((opt, idx) => {
          let btnClass = "bg-white border-2 border-vibrant-charcoal text-vibrant-charcoal hover:bg-vibrant-cardbg font-black cursor-pointer shadow-retro-sm";
          let badge = null;

          if (isAnswered) {
            if (idx === challenge.correctIndex) {
              btnClass = "bg-emerald-150 border-2 border-emerald-500 text-emerald-900 font-black shadow-retro-sm";
              badge = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
            } else if (idx === selectedIdx) {
              btnClass = "bg-rose-100 border-2 border-rose-400 text-rose-950 font-black shadow-retro-sm";
              badge = <XCircle className="w-5 h-5 text-rose-500 shrink-0" />;
            } else {
              btnClass = "opacity-40 bg-white border-2 border-vibrant-charcoal/40 text-vibrant-charcoal/40 pointer-events-none shadow-none";
            }
          }

          return (
            <button
              id={`g5-opt-${idx}`}
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`flex items-center justify-between p-4 rounded-xl text-left transition-all duration-150 ${btnClass}`}
              disabled={isAnswered}
            >
              <span className="font-mono text-lg">{opt}</span>
              {badge}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-xl bg-[#fffae5] border-2 border-vibrant-secondary text-vibrant-charcoal mb-6 text-sm shadow-retro-sm"
          >
            <div className="flex gap-3">
              <Lightbulb className="w-5 h-5 text-vibrant-primary shrink-0 mt-0.5" />
              <div>
                <span className="font-black text-vibrant-accent block mb-1">Կանոնի Բացատրություն՝</span>
                <p className="leading-relaxed font-semibold">{challenge.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end">
        {isAnswered && (
          <button
            id="g5-next-btn"
            onClick={handleNext}
            className="flex items-center gap-2 bg-vibrant-primary text-white hover:bg-vibrant-primary/95 text-xs sm:text-sm font-black px-6 py-3 rounded-xl border-2 border-vibrant-charcoal shadow-retro-[4px_4px_0px_rgba(30,39,46,1)] transition-transform active:translate-y-0.5 cursor-pointer"
          >
            {currentIndex === game5Challenges.length - 1 ? "Ավարտել" : "Հաջորդը"}
            <ArrowRight className="w-4 h-4 text-vibrant-secondary" />
          </button>
        )}
      </div>
    </div>
  );
}

export function Game6({ onGameComplete }: GameProps) {
  // Dialogue Role-play (Ana & Carlos)
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [dialogHistory, setDialogHistory] = useState<Array<{
    speaker: string;
    text: string;
    translation: string;
    isCorrectUser: boolean;
  }>>([]);
  const [isFinished, setIsFinished] = useState(false);

  const step = game6Steps[currentStep];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
    setIsAnswered(true);

    const isCorrect = idx === step.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    // Append to dialog history
    const isCorrect = selectedIdx === step.correctIndex;
    setDialogHistory(prev => [
      ...prev,
      {
        speaker: step.speaker,
        text: step.fullText,
        translation: step.translation,
        isCorrectUser: isCorrect
      }
    ]);

    if (currentStep < game6Steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setSelectedIdx(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      onGameComplete(6, score + (selectedIdx === step.correctIndex ? 1 : 0));
    }
  };

  const restartGame = () => {
    setCurrentStep(0);
    setSelectedIdx(null);
    setIsAnswered(false);
    setScore(0);
    setDialogHistory([]);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
          <Award className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Շնորհավորում ենք!</h3>
        <p className="text-slate-600 text-sm mb-6">
          Դուք հաջողությամբ ավարտեցիք Անայի և Կառլոսի ինտերակտիվ երկխոսությունը։
          <br />Ձեր միավորները՝ <strong className="text-lg text-amber-600">{score} / {game6Steps.length}</strong>
        </p>

        <div className="bg-slate-50 p-4 rounded-xl text-left mb-6 max-h-60 overflow-y-auto border border-slate-100">
          <span className="text-xs font-mono text-slate-400 block mb-2">ԵՐԿԽՈՍՈՒԹՅԱՆ ԱՐԴՅՈՒՆՔՆԵՐԸ</span>
          {dialogHistory.map((item, i) => (
            <div key={i} className="mb-3 pb-3 border-b border-slate-100 last:border-0">
              <div className="flex justify-between items-center mb-1">
                <span className={`text-xs font-bold ${item.speaker === 'Ana' ? 'text-amber-600' : 'text-blue-600'}`}>
                  {item.speaker}
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${item.isCorrectUser ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                  {item.isCorrectUser ? 'Ճիշտ' : 'Սխալ'}
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-800 font-mono">{item.text}</p>
              <p className="text-xs text-slate-500 italic mt-0.5">{item.translation}</p>
            </div>
          ))}
        </div>

        <button
          onClick={restartGame}
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Նորից խաղալ
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 border-2 border-vibrant-charcoal shadow-retro max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-mono px-3 py-1 bg-vibrant-cardbg text-vibrant-charcoal border-2 border-vibrant-charcoal rounded-full font-bold">Կանոն 6: Ինտերակտիվ երկխոսություն</span>
        <span className="text-xs font-mono font-bold text-vibrant-charcoal">Քայլ {currentStep + 1} / {game6Steps.length}</span>
      </div>

      {/* Dialog History Stream */}
      <div className="space-y-3 mb-6 max-h-48 overflow-y-auto p-3 bg-vibrant-cardbg rounded-xl border-2 border-vibrant-charcoal shadow-retro-sm">
        {dialogHistory.length === 0 && (
          <p className="text-xs text-vibrant-charcoal/60 font-medium text-center py-4">Երկխոսությունը դեռ նոր է սկսվում։ Օգնեք նրանց ճիշտ խոսել։</p>
        )}
        {dialogHistory.map((item, i) => (
          <div key={i} className={`flex ${item.speaker === 'Ana' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[85%] rounded-2xl p-3 text-sm border-2 border-vibrant-charcoal shadow-retro-sm ${
              item.speaker === 'Ana' 
                ? 'bg-[#fffae5] text-vibrant-charcoal rounded-bl-none' 
                : 'bg-white text-[#1a508b] rounded-br-none'
            }`}>
              <div className="font-black text-[10px] uppercase opacity-75 mb-0.5">{item.speaker}</div>
              <p className="font-mono font-bold">{item.text}</p>
              <p className="text-[11px] text-vibrant-charcoal/70 italic mt-1">« {item.translation} »</p>
            </div>
          </div>
        ))}
      </div>

      {/* Active speaker role-play bubble */}
      <div className={`p-5 rounded-2xl border-2 border-vibrant-charcoal mb-6 relative overflow-hidden shadow-retro-sm ${
        step.speaker === 'Ana' 
          ? 'bg-[#fffae5] text-vibrant-charcoal' 
          : 'bg-vibrant-cardbg text-vibrant-charcoal'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <span className={`w-2.5 h-2.5 rounded-full animate-ping ${step.speaker === 'Ana' ? 'bg-vibrant-primary' : 'bg-vibrant-accent'}`} />
          <span className="text-xs font-black uppercase tracking-wider text-vibrant-charcoal/70">
            {step.speaker}-ի հերթն է`
          </span>
        </div>
        
        <h4 className="text-xl font-black font-mono tracking-tight leading-relaxed">
          {step.text.split("___").map((part, i) => (
            <span key={i}>
              {part}
              {i === 0 && (
                <span className="inline-block px-3 py-1 mx-1.5 bg-white text-vibrant-charcoal border-2 border-dashed border-vibrant-charcoal font-black font-mono rounded">
                  {isAnswered ? step.options[step.correctIndex] : "???"}
                </span>
              )}
            </span>
          ))}
        </h4>
        <p className="text-vibrant-charcoal/70 italic text-xs mt-2 font-semibold">« {step.translation} »</p>
      </div>

      {/* Options selection */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {step.options.map((opt, idx) => {
          let btnClass = "bg-white border-2 border-vibrant-charcoal text-vibrant-charcoal hover:bg-vibrant-cardbg font-black cursor-pointer shadow-retro-sm";
          let icon = null;

          if (isAnswered) {
            if (idx === step.correctIndex) {
              btnClass = "bg-emerald-150 border-2 border-emerald-500 text-emerald-900 font-black shadow-retro-sm";
              icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
            } else if (idx === selectedIdx) {
              btnClass = "bg-rose-100 border-2 border-rose-450 text-rose-950 font-black shadow-retro-sm";
              icon = <XCircle className="w-5 h-5 text-rose-500 shrink-0" />;
            } else {
              btnClass = "opacity-40 bg-white border-2 border-vibrant-charcoal/40 text-vibrant-charcoal/40 pointer-events-none shadow-none";
            }
          }

          return (
            <button
              id={`g6-opt-${idx}`}
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`flex items-center justify-between p-3.5 rounded-xl text-left font-mono transition-all duration-150 ${btnClass}`}
              disabled={isAnswered}
            >
              <span>{opt}</span>
              {icon}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-[#fffae5] border-2 border-vibrant-secondary text-vibrant-charcoal mb-6 text-xs flex gap-2 shadow-retro-sm"
          >
            <MessageSquare className="w-4 h-4 text-vibrant-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-black text-vibrant-accent block mb-1">Կանոնի վերլուծություն՝</span>
              <p className="leading-relaxed font-semibold font-sans">{step.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end">
        {isAnswered && (
          <button
            id="g6-next-btn"
            onClick={handleNext}
            className="flex items-center gap-2 bg-vibrant-primary text-white hover:bg-vibrant-primary/95 text-xs sm:text-sm font-black px-6 py-3 rounded-xl border-2 border-vibrant-charcoal shadow-retro-[4px_4px_0px_rgba(30,39,46,1)] transition-transform active:translate-y-0.5 cursor-pointer"
          >
            {currentStep === game6Steps.length - 1 ? "Ավարտել երկխոսությունը" : "Հաջորդ քայլը"}
            <ArrowRight className="w-4 h-4 text-vibrant-secondary" />
          </button>
        )}
      </div>
    </div>
  );
}

// Internal shared small components

function InfoIcon() {
  return (
    <svg className="w-5 h-5 text-vibrant-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

interface CompletionScreenProps {
  score: number;
  total: number;
  title: string;
  onRestart: () => void;
}

function GameCompletionScreen({ score, total, title, onRestart }: CompletionScreenProps) {
  const percentage = Math.round((score / total) * 100);

  let feedbackMsg = "Հիանալի է: Դուք հիանալի տիրապետում եք Subjuntivo-ին:";
  if (percentage < 50) {
    feedbackMsg = "Լավ փորձ էր: Խորհուրդ ենք տալիս ևս մեկ անգամ կարդալ տեսությունը և փորձել նորից:";
  } else if (percentage < 85) {
    feedbackMsg = "Շատ լավ արդյունք: Դուք գրեթե իդեալական հասկանում եք Subjuntivo-ն:";
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-3xl p-8 border-2 border-vibrant-charcoal shadow-retro max-w-md mx-auto text-center"
    >
      <div className="inline-flex p-4 rounded-full bg-vibrant-secondary/20 text-vibrant-accent border-2 border-vibrant-charcoal mb-4 animate-bounce">
        <Sparkles className="w-10 h-10 text-vibrant-primary" />
      </div>

      <h3 className="text-2xl font-black text-vibrant-charcoal mb-1">{title}</h3>
      <p className="text-xs font-mono text-vibrant-accent uppercase tracking-wider mb-6 font-black">Խաղն ավարտվեց</p>

      <div className="inline-flex flex-col items-center justify-center p-6 bg-vibrant-cardbg rounded-2xl mb-6 w-full border-2 border-vibrant-charcoal shadow-retro-sm">
        <span className="text-vibrant-charcoal/70 text-xs uppercase font-mono font-black">ՁԵՐ ԱՐԴՅՈՒՆՔԸ</span>
        <span className="text-5xl font-black text-vibrant-charcoal mt-2">{score} <span className="text-2xl font-normal text-vibrant-charcoal/65">/ {total}</span></span>
        <div className="w-full bg-[#1e272e]/10 h-3 border border-vibrant-charcoal rounded-full mt-4 overflow-hidden">
          <div className="bg-vibrant-accent h-full transition-all duration-500" style={{ width: `${percentage}%` }} />
        </div>
        <span className="text-xs font-mono text-vibrant-primary font-black mt-3">{percentage}% Ճիշտ պատասխաններ</span>
      </div>

      <p className="text-sm font-bold text-vibrant-charcoal mb-6 font-sans leading-relaxed">
        {feedbackMsg}
      </p>

      <div className="flex gap-3 justify-center">
        <button
          id="btn-completion-restart"
          onClick={onRestart}
          className="flex items-center gap-2 justify-center bg-vibrant-secondary text-vibrant-charcoal hover:bg-vibrant-secondary/90 border-2 border-vibrant-charcoal px-6 py-3 rounded-xl font-black shadow-retro-[3px_3px_0px_rgba(30,39,46,1)] transition-transform active:translate-y-0.5 cursor-pointer w-full"
        >
          <RotateCcw className="w-4 h-4 text-vibrant-primary" />
          Նորից խաղալ
        </button>
      </div>
    </motion.div>
  );
}
