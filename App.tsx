/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Gamepad2, 
  Sparkles, 
  Search, 
  Info, 
  ListOrdered,
  Layers,
  ChevronRight,
  Heart,
  HelpCircle,
  Award,
  Globe,
  PlusCircle,
  Share2
} from 'lucide-react';
import { theoryBlocks } from './gamesData';
import { Game1, Game2, Game3, Game4, Game5, Game6 } from './Games';

// Direct pocket references for quick conjugation lookups
const verbsCheatSheet = [
  {
    verb: "Ser (Լինել)",
    translation: "լինել (էական բայ)",
    class: "irregular",
    forms: { yo: "sea", tú: "seas", él: "sea", nosotros: "seamos", vosotros: "seáis", ellos: "sean" },
    example: "Quiero que seas feliz. (Ուզում եմ, որ երջանիկ լինես:)"
  },
  {
    verb: "Estar (Լինել / Գտնվել)",
    translation: "լինել / գտնվել (ժամանակավոր)",
    class: "irregular",
    forms: { yo: "esté", tú: "estés", él: "esté", nosotros: "estemos", vosotros: "estéis", ellos: "estén" },
    example: "Espero que estés bien. (Հույս ունեմ, որ լավ լինես:)"
  },
  {
    verb: "Tener (Ունենալ)",
    translation: "ունենալ",
    class: "irregular",
    forms: { yo: "tenga", tú: "tengas", él: "tenga", nosotros: "tengamos", vosotros: "tengáis", ellos: "tengan" },
    example: "No quiero que tengas miedo. (Չեմ ուզում, որ վախենաս:)"
  },
  {
    verb: "Ir (Գնալ)",
    translation: "գնալ",
    class: "irregular",
    forms: { yo: "vaya", tú: "vayas", él: "vaya", nosotros: "vayamos", vosotros: "vayáis", ellos: "vayan" },
    example: "Quiero que vayas conmigo. (Ուզում եմ, որ դու ինձ հետ գնաս:)"
  },
  {
    verb: "Saber (Իմանալ)",
    translation: "իմանալ",
    class: "irregular",
    forms: { yo: "sepa", tú: "sepas", él: "sepa", nosotros: "sepamos", vosotros: "sepáis", ellos: "sepan" },
    example: "Es importante que sepas la verdad. (Կարևոր է, որ դու իմանաս ճշմարտությունը:)"
  },
  {
    verb: "Dar (Տալ)",
    translation: "տալ",
    class: "irregular",
    forms: { yo: "dé", tú: "des", él: "dé", nosotros: "demos", vosotros: "deis", ellos: "den" },
    example: "Quiero que me des una respuesta. (Ուզում եմ, որ ինձ պատասխան տաս:)"
  },
  {
    verb: "Haber (Օժանդակ)",
    translation: "լինել / օժանդակ բայ",
    class: "irregular",
    forms: { yo: "haya", tú: "hayas", él: "haya", nosotros: "hayamos", vosotros: "hayáis", ellos: "hayan" },
    example: "Espero que haya comida. (Հույս ունեմ, որ ուտելիք լինի:)"
  },
  {
    verb: "Hablar (-AR Regular)",
    translation: "խոսել (կանոնավոր)",
    class: "regular",
    forms: { yo: "hable", tú: "hables", él: "hable", nosotros: "hablemos", vosotros: "habléis", ellos: "hablen" },
    example: "Quiero que hables conmigo. (Ուզում եմ, որ դու խոսես ինձ հետ:)"
  },
  {
    verb: "Comer (-ER Regular)",
    translation: "ուտել (կանոնավոր)",
    class: "regular",
    forms: { yo: "coma", tú: "comas", él: "coma", nosotros: "comamos", vosotros: "comáis", ellos: "coman" },
    example: "Quiero que comas bien. (Ուզում եմ, որ լավ ուտես:)"
  },
  {
    verb: "Vivir (-IR Regular)",
    translation: "ապրել (կանոնավոր)",
    class: "regular",
    forms: { yo: "viva", tú: "vivas", él: "viva", nosotros: "vivamos", vosotros: "viváis", ellos: "vivan" },
    example: "Espero que vivas feliz. (Հույս ունեմ, որ երջանիկ ապրես:)"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'theory' | 'games' | 'pocket-conjugator'>('theory');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTheoryId, setActiveTheoryId] = useState('intro');
  const [selectedGameId, setSelectedGameId] = useState<number | null>(1);
  const [expandedExamples, setExpandedExamples] = useState<Record<string, boolean>>({});

  // Achievements / Progress scores tracker for the 6 games
  const [gameScores, setGameScores] = useState<Record<number, number>>({
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0
  });
  const [completedGames, setCompletedGames] = useState<Record<number, boolean>>({
    1: false, 2: false, 3: false, 4: false, 5: false, 6: false
  });

  const handleGameComplete = (gameId: number, score: number) => {
    setGameScores(prev => ({ ...prev, [gameId]: score }));
    setCompletedGames(prev => ({ ...prev, [gameId]: true }));
  };

  const totalCorrectAnswered = useMemo(() => {
    return [1, 2, 3, 4, 5, 6].reduce((acc, id) => acc + (gameScores[id] || 0), 0);
  }, [gameScores]);

  // Expand helper for examples
  const toggleExampleTranslate = (id: string) => {
    setExpandedExamples(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Basic search filtered theory blocks
  const filteredTheoryBlocks = useMemo(() => {
    if (!searchQuery.trim()) return theoryBlocks;
    return theoryBlocks.filter(block => 
      block.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // List of the 6 educational games with visual metadata
  const gamesList = [
    {
      id: 1,
      title: "Indicativo vs Subjuntivo",
      desc: "Որոշե՛ք՝ նախադասությունը փաստ է, թե սուբյեկտիվ ցանկություն։",
      theme: "border-amber-200 bg-amber-50/50 hover:bg-amber-50 text-amber-900 icon-color-amber",
      accent: "amber",
      icon: <Layers className="w-5 h-5 text-amber-600" />
    },
    {
      id: 2,
      title: "Խոնարհման Կոնստրուկտոր",
      desc: "Մարզեք Presente de Subjuntivo-ի կանոնավոր և անկանոն վերջավորությունները։",
      theme: "border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-rose-900 icon-color-rose",
      accent: "rose",
      icon: <Sparkles className="w-5 h-5 text-rose-600" />
    },
    {
      id: 3,
      title: "WEDDING Ակրոնիմ Մրցույթ",
      desc: "Դասակարգե՛ք ազդանշանները ըստ WEDDING յուրաքանչյուր տառի:",
      theme: "border-violet-200 bg-violet-50/50 hover:bg-violet-50 text-violet-900 icon-color-violet",
      accent: "violet",
      icon: <HelpCircle className="w-5 h-5 text-violet-600" />
    },
    {
      id: 4,
      title: "Cuando & Ապագայի բալանս",
      desc: "Սովորակա՞ն գործողություն, թե՞ ապագայի անորոշ նպատակ։ Տարբերե՛ք Indicativo-ն Subjuntivo-ից:",
      theme: "border-cyan-200 bg-cyan-50/50 hover:bg-cyan-50 text-cyan-900 icon-color-cyan",
      accent: "cyan",
      icon: <ListOrdered className="w-5 h-5 text-cyan-600" />
    },
    {
      id: 5,
      title: "Si & Ojalá Կոնստրուկտոր",
      desc: "Ընտրե՛ք ճիշտ ժամանակաձևերը (Imperfecto և Pluscuamperfecto):",
      theme: "border-teal-200 bg-teal-50/50 hover:bg-teal-50 text-teal-900 icon-color-teal",
      accent: "teal",
      icon: <Globe className="w-5 h-5 text-teal-600" />
    },
    {
      id: 6,
      title: "Դերային Երկխոսություն",
      desc: "Օգնե՛ք Անայի և Կառլոսի զրույցին անցնել անթերի սուբյեկտիվ եղանակներով։",
      theme: "border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-900 icon-color-indigo",
      accent: "indigo",
      icon: <Award className="w-5 h-5 text-indigo-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#fdfdfd] text-[#1e272e] font-sans antialiased selection:bg-vibrant-secondary/40 selection:text-[#1e272e]">
      
      {/* Visual Top Bar Banner in Vibrant Palette */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-vibrant-primary to-[#ff7979] text-white border-b-4 border-vibrant-secondary shadow-retro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <span className="text-3xl animate-bounce">🇪🇸</span>
              <div>
                <h1 className="text-xl font-black tracking-tight text-white font-sans uppercase">
                  Իսպաներեն Subjuntivo
                </h1>
                <p className="text-[11px] text-vibrant-secondary font-mono font-bold tracking-wider">Ինտերակտիվ Ուսումնական Հարթակ — ARMENIAN EDITION</p>
              </div>
            </div>

            {/* Quick stats on score */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl border border-white/30 backdrop-blur-sm">
                <Award className="w-5 h-5 text-vibrant-secondary animate-pulse" />
                <span className="text-xs font-mono font-bold text-white">
                  ՄԻԱՎՈՐՆԵՐ՝ {totalCorrectAnswered}
                </span>
              </div>
              <div className="text-xs font-mono px-3 py-1.5 bg-vibrant-accent text-white rounded-lg font-black border-2 border-white/50">
                LEVEL B1 - B2
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container Wrapper */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Block presentation (Preserving exact aesthetic pairing with Vibrant Palette) */}
        <div className="relative overflow-hidden bg-white border-2 border-vibrant-charcoal rounded-3xl p-6 sm:p-8 mb-8 shadow-retro">
          <div className="absolute -right-24 -top-24 w-80 h-80 bg-vibrant-primary/10 rounded-full blur-3xl opacity-60" />
          <div className="absolute -left-24 -bottom-24 w-80 h-80 bg-vibrant-secondary/15 rounded-full blur-3xl opacity-60" />

          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-1.5 bg-[#fffae5] border-2 border-vibrant-secondary text-vibrant-charcoal px-4 py-1.5 rounded-xl text-xs font-bold mb-4">
              <Sparkles className="w-4 h-4 text-vibrant-primary" />
              <span>Մանրամասն բացատրություն հայերենով և 6 ինտերակտիվ խաղեր</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-vibrant-charcoal font-sans leading-tight">
              Բարի գալո՛ւստ <span className="bg-gradient-to-r from-vibrant-primary to-vibrant-accent bg-clip-text text-transparent">Subjuntivo եղանակի</span> աշխարհ:
            </h2>
            <p className="mt-3 text-[#1e272e]/80 font-sans text-sm sm:text-base leading-relaxed font-medium">
              Subjuntivo-ն ողջ իսպաներենի սիրտն է։ Այս հարթակը նախագծված է օգնելու ձեզ հեշտությամբ յուրացնել սուբյեկտիվ եղանակի բոլոր նրբությունները՝ սկսած կանոններից մինչև 6 հիասքանչ խաղ-մարզիչներ։
            </p>
          </div>
        </div>

        {/* Global tab Switcher navigation */}
        <div className="flex gap-2 p-2 bg-vibrant-cardbg rounded-2xl mb-8 max-w-md mx-auto border-2 border-vibrant-charcoal shadow-retro">
          <button
            id="tab-theory"
            onClick={() => setActiveTab('theory')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'theory'
                ? 'bg-vibrant-accent text-white border-2 border-vibrant-charcoal shadow-retro-sm'
                : 'text-[#1e272e] hover:bg-white/40'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Տեսություն
          </button>
          <button
            id="tab-games"
            onClick={() => setActiveTab('games')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'games'
                ? 'bg-vibrant-accent text-white border-2 border-vibrant-charcoal shadow-retro-sm'
                : 'text-[#1e272e] hover:bg-white/40'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            6 Խաղարան
          </button>
          <button
            id="tab-pocket"
            onClick={() => setActiveTab('pocket-conjugator')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'pocket-conjugator'
                ? 'bg-vibrant-accent text-white border-2 border-vibrant-charcoal shadow-retro-sm'
                : 'text-[#1e272e] hover:bg-white/40'
            }`}
          >
            <ListOrdered className="w-4 h-4" />
            Բայեր
          </button>
        </div>

        {/* Interactive Screen Transitions wrapper */}
        <AnimatePresence mode="wait">
          
          {/* TAB 1: THEORY LAYOUT SCREEN */}
          {activeTab === 'theory' && (
            <motion.div
              key="theory"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              
              {/* Theory left menu sidebar controller */}
              <div className="lg:col-span-4 space-y-5">
                <div className="relative">
                  <Search className="w-5 h-5 text-vibrant-charcoal absolute left-3 top-3.5" />
                  <input
                    id="theory-search-input"
                    type="text"
                    placeholder="Որոնե՛լ կանոններ (օր. Ojalá, Ser...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border-2 border-vibrant-charcoal rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-vibrant-accent font-sans shadow-retro-sm"
                  />
                </div>

                <div className="bg-white rounded-2xl p-4 border-2 border-vibrant-charcoal shadow-retro max-h-[500px] overflow-y-auto">
                  <span className="text-xs font-mono text-vibrant-accent font-black block mb-4 uppercase tracking-wider border-b-2 border-vibrant-cardbg pb-2">Դասընթացի բաժիններ</span>
                  <div className="space-y-1.5">
                    {filteredTheoryBlocks.map((block) => (
                      <button
                        id={`theory-block-${block.id}`}
                        key={block.id}
                        onClick={() => setActiveTheoryId(block.id)}
                        className={`w-full text-left p-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 flex items-center justify-between cursor-pointer ${
                          activeTheoryId === block.id
                            ? 'bg-vibrant-secondary/30 text-[#1e272e] border-2 border-vibrant-charcoal'
                            : 'text-vibrant-charcoal hover:bg-vibrant-cardbg/50'
                        }`}
                      >
                        <span className="truncate pr-2">{block.title}</span>
                        <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${activeTheoryId === block.id ? 'translate-x-1 text-vibrant-primary' : 'text-slate-350'}`} />
                      </button>
                    ))}
                    {filteredTheoryBlocks.length === 0 && (
                      <div className="text-center py-8 text-sm text-slate-400">Ոչինչ չգտնվեց Ձեր որոնմամբ:</div>
                    )}
                  </div>
                </div>

                {/* Acronym highlight mini banner */}
                <div className="bg-[#3c40c6] rounded-2xl p-5 text-white shadow-retro border-2 border-vibrant-charcoal relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 opacity-10">
                    <Heart className="w-24 h-24" />
                  </div>
                  <h4 className="font-extrabold text-xs text-vibrant-secondary uppercase tracking-widest font-mono mb-2">💡 WEDDING ԿԱՆՈՆ</h4>
                  <p className="text-xs text-stone-100 leading-relaxed font-sans font-medium">
                    Հիշե՛ք WEDDING բառը՝ Wishes, Emotions, Doubt, Denial, Impersonal, Necessity, Goals: Սա իսնդյանահամակարգը հասկանալու ոսկե բանալին է:
                  </p>
                </div>
              </div>

              {/* Theory Main content display */}
              <div className="lg:col-span-8">
                {theoryBlocks.filter(b => b.id === activeTheoryId).map((activeBlock) => (
                  <div key={activeBlock.id} className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-vibrant-charcoal shadow-retro">
                    <h3 className="text-2xl font-black font-sans tracking-tight text-vibrant-charcoal pb-4 border-b-2 border-vibrant-cardbg mb-6 flex items-center gap-2">
                      <span className="border-l-4 border-vibrant-primary pl-3">{activeBlock.title}</span>
                    </h3>

                    {/* Pre-formatted contents preserving exact Armenian formatting and symbols */}
                    <div className="prose prose-slate max-w-none text-vibrant-charcoal font-sans leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-line font-medium">
                      {activeBlock.content}
                    </div>

                    {/* Interactive practice helper attached directly below the active block */}
                    <div className="mt-8 pt-6 border-t-2 border-vibrant-cardbg bg-[#fffae5] border-2 border-vibrant-secondary rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-mono font-black text-vibrant-accent block mb-1 uppercase tracking-wider">ԳԻՏԵԼԻՔԻ ՍՏՈՒԳՈՒՄ</span>
                        <p className="text-xs text-[#1e272e]/80 font-bold">Պատրա՞ստ եք ստուգելու այս կանոնն ինտերակտիվ խաղով։</p>
                      </div>
                      <button
                        onClick={() => {
                          setActiveTab('games');
                          // Direct routing to corresponding games
                          if (activeTheoryId === 'intro' || activeTheoryId === 'diff' || activeTheoryId === 'base_formula') {
                            setSelectedGameId(1);
                          } else if (activeTheoryId === 'presente_subj' || activeTheoryId === 'irregular_verbs') {
                            setSelectedGameId(2);
                          } else if (activeTheoryId === 'wedding_rule' || activeTheoryId === 'uses') {
                            setSelectedGameId(3);
                          } else if (activeTheoryId === 'types_subj') {
                            setSelectedGameId(4);
                          } else if (activeTheoryId === 'ojala_si') {
                            setSelectedGameId(5);
                          }
                        }}
                        className="flex items-center gap-2 bg-vibrant-primary text-white font-extrabold text-xs px-5 py-3 rounded-xl border-2 border-vibrant-charcoal shadow-retro-[4px_4px_0px_rgba(30,39,46,1)] hover:bg-vibrant-primary/95 transition-colors cursor-pointer"
                      >
                        <Gamepad2 className="w-4 h-4 text-vibrant-secondary" />
                        Անցնել խաղին
                      </button>
                    </div>
                  </div>
                ))}

                {/* Additional interactive FAQ collapsible list containing direct elements from Armenian text */}
                <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 border-2 border-vibrant-charcoal shadow-retro">
                  <h4 className="text-lg font-black text-vibrant-accent mb-4 font-sans flex items-center gap-2">
                    <Info className="w-5 h-5 text-vibrant-primary" />
                    Կարևոր բայերի խոնարհման ակումբ
                  </h4>
                  <p className="text-sm text-[#1e272e]/80 mb-6 font-medium">Այս հատվածում բերված են Subjuntivo-ի ամենակարևոր անկանոն բայերը։ Սեղմե՛ք յուրաքանչյուր բայի վրա՝ խոնարհումն ու օրինակը տեսնելու համար։</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-vibrant-cardbg p-4 rounded-2xl border-2 border-vibrant-charcoal">
                    {verbsCheatSheet.slice(0, 8).map((v, idx) => (
                      <button
                        id={`theory-verb-selector-${idx}`}
                        key={v.verb}
                        onClick={() => {
                          setActiveTab('pocket-conjugator');
                        }}
                        className="bg-white border-2 border-vibrant-charcoal hover:border-vibrant-accent hover:shadow-retro-sm px-3 py-3 rounded-xl font-bold text-xs transition-all flex flex-col items-center justify-center text-center font-mono cursor-pointer"
                      >
                        <span className="font-bold text-vibrant-primary">{v.verb.split(' ')[0]}</span>
                        <span className="text-[10px] text-vibrant-charcoal/60 mt-1">{v.translation}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 2: 6 EDUCATIONAL GAMES SCREEN */}
          {activeTab === 'games' && (
            <motion.div
              key="games"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              
              {/* Game selection selector timeline */}
              <div className="bg-white p-4 sm:p-6 rounded-3xl border-2 border-vibrant-charcoal shadow-retro">
                <span className="text-xs font-mono text-vibrant-accent font-black uppercase tracking-widest block mb-4 text-center">ԸՆՏՐԵ՛Ք 6 ԻՆՏԵՐԱԿՏԻՎ ԽԱՂԵՐԻՑ ՄԵԿԸ</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {gamesList.map((g) => {
                    const isSelected = selectedGameId === g.id;
                    const isPassed = completedGames[g.id];
                    
                    return (
                      <button
                        id={`game-selection-${g.id}`}
                        key={g.id}
                        onClick={() => setSelectedGameId(g.id)}
                        className={`p-4 rounded-2xl text-center border-2 transition-all duration-200 flex flex-col items-center justify-center gap-2 relative select-none cursor-pointer ${
                          isSelected 
                            ? 'border-vibrant-charcoal bg-vibrant-secondary/30 text-vibrant-charcoal scale-[1.03] shadow-retro-sm font-black' 
                            : 'border-vibrant-cardbg hover:border-vibrant-charcoal hover:bg-vibrant-cardbg/20 text-vibrant-charcoal/80'
                        }`}
                      >
                        {/* Circle Badge numbers */}
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
                          isSelected 
                            ? 'bg-vibrant-accent text-white border-vibrant-charcoal' 
                            : isPassed 
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-400' 
                            : 'bg-vibrant-cardbg text-vibrant-charcoal border-transparent'
                        }`}>
                          {g.id}
                        </div>
                        <span className="text-[11px] font-bold block truncate leading-tight w-full font-sans">
                          {g.title}
                        </span>
                        
                        {isPassed && (
                          <span className="absolute top-1 right-1 text-[8px] px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold border border-emerald-300">
                            Անցած
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Game Active Render Window */}
              <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                  {selectedGameId === 1 && (
                    <motion.div key="game1" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
                      <div className="mb-6 max-w-2xl mx-auto bg-[#fffae5] border-2 border-vibrant-secondary p-4 rounded-xl text-xs text-vibrant-charcoal font-medium leading-relaxed flex gap-3 shadow-retro-sm">
                        <Info className="w-5 h-5 text-vibrant-primary shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-black mb-1 text-vibrant-accent">Խաղ 1: Indicativo vs Subjuntivo</strong>
                          Օգտվե՛ք Ձեր տեսական գիտելիքներից իրական փաստերն ու սուբյեկտիվ ցանկությունները տարբերելու համար: Սեղմե՛ք տարբերակներից մեկի վրա:
                        </div>
                      </div>
                      <Game1 onGameComplete={handleGameComplete} />
                    </motion.div>
                  )}

                  {selectedGameId === 2 && (
                    <motion.div key="game2" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
                      <div className="mb-6 max-w-2xl mx-auto bg-[#fffae5] border-2 border-vibrant-secondary p-4 rounded-xl text-xs text-vibrant-charcoal font-medium leading-relaxed flex gap-3 shadow-retro-sm">
                        <Info className="w-5 h-5 text-vibrant-accent shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-black mb-1 text-vibrant-accent">Խաղ 2: Ներկա Subjuntivo-ի խոնարհումներ</strong>
                          Սովորե՛ք regular և irregular բայերի վերջնամասի կառուցվածքները։ Ընտրե՛ք յուրաքանչյուր դերանվանը համապատասխանող ճիշտ տարբերակը։
                        </div>
                      </div>
                      <Game2 onGameComplete={handleGameComplete} />
                    </motion.div>
                  )}

                  {selectedGameId === 3 && (
                    <motion.div key="game3" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
                      <div className="mb-6 max-w-2xl mx-auto bg-[#fffae5] border-2 border-vibrant-secondary p-4 rounded-xl text-xs text-vibrant-charcoal font-medium leading-relaxed flex gap-3 shadow-retro-sm">
                        <Info className="w-5 h-5 text-vibrant-primary shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-black mb-1 text-vibrant-accent">Խաղ 3: WEDDING Ակրոնիմի հետքերով</strong>
                          Արդյո՞ք նախադասությունը զգացմունք է, կասկած, թե անհրաժեշտություն։ Միացրե՛ք ճիշտ ակրոնիմի տառը ներկայացված նախադասությանը:
                        </div>
                      </div>
                      <Game3 onGameComplete={handleGameComplete} />
                    </motion.div>
                  )}

                  {selectedGameId === 4 && (
                    <motion.div key="game4" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
                      <div className="mb-6 max-w-2xl mx-auto bg-[#fffae5] border-2 border-vibrant-secondary p-4 rounded-xl text-xs text-vibrant-charcoal font-medium leading-relaxed flex gap-3 shadow-retro-sm">
                        <Info className="w-5 h-5 text-vibrant-accent shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-black mb-1 text-vibrant-accent">Խաղ 4: Cuando (Future vs Habitual) Clauses</strong>
                          Պարբերաբա՞ր բնույթի է գործողությունը (Indicativo), թե՞ վերաբերում է ապագային (Subjuntivo): Ճիշտ ընտրե՛ք համապատասխան բայաձևը։
                        </div>
                      </div>
                      <Game4 onGameComplete={handleGameComplete} />
                    </motion.div>
                  )}

                  {selectedGameId === 5 && (
                    <motion.div key="game5" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
                      <div className="mb-6 max-w-2xl mx-auto bg-[#fffae5] border-2 border-vibrant-secondary p-4 rounded-xl text-xs text-vibrant-charcoal font-medium leading-relaxed flex gap-3 shadow-retro-sm">
                        <Info className="w-5 h-5 text-vibrant-primary shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-black mb-1 text-vibrant-accent">Խաղ 5: Si & Ojalá Կոնստրուկտոր</strong>
                          Սովորե՛ք կիրառել Presente, Imperfecto և Pluscuamperfecto de Subjuntivo ժամանակաձևերը անափ համեմատականների մեջ։
                        </div>
                      </div>
                      <Game5 onGameComplete={handleGameComplete} />
                    </motion.div>
                  )}

                  {selectedGameId === 6 && (
                    <motion.div key="game6" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
                      <div className="mb-6 max-w-2xl mx-auto bg-[#fffae5] border-2 border-vibrant-secondary p-4 rounded-xl text-xs text-vibrant-charcoal font-medium leading-relaxed flex gap-3 shadow-retro-sm">
                        <Info className="w-5 h-5 text-vibrant-accent shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-black mb-1 text-vibrant-accent">Խաղ 6: Ինտերակտիվ Ուսումնական զրույց</strong>
                          Անան ու Կառլոսը հանդիպում են։ Օգնե՛ք նրանց ճիշտ արտահայտվել՝ երկխոսության մեջ տեղադրելով ճիշտ սուբյեկտիվ բայաձևերը։
                        </div>
                      </div>
                      <Game6 onGameComplete={handleGameComplete} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          )}

          {/* TAB 3: VERBAL REFERENCE AND POCKET CONJUGATOR */}
          {activeTab === 'pocket-conjugator' && (
            <motion.div
              key="pocket-conjugator"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="bg-white p-6 rounded-3xl border-2 border-vibrant-charcoal shadow-retro max-w-4xl mx-auto">
                <h3 className="text-xl font-black text-vibrant-accent mb-2 font-sans flex items-center gap-2">
                   <BookOpen className="w-5 h-5 text-vibrant-primary" />
                   Բայերի Գրպանային Բառարան (Pocket Conjugations)
                </h3>
                <p className="text-sm text-vibrant-charcoal/80 mb-6 font-sans font-medium">
                  Ընտրե՛ք ցանկացած կարևոր բայ ստորև՝ տեսնելու դրա ամբողջական Presente de Subjuntivo խոնարհումը, օրինակը և հայերեն թարգմանությունը։
                </p>

                {/* Grid display verbs card details */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* Left Column: list of verbs select box */}
                  <div className="md:col-span-4 space-y-2">
                    <span className="text-xs font-mono text-vibrant-accent font-black uppercase tracking-wider block mb-2">ԸՆՏՐԵԼ ԲԱՅԸ</span>
                    <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
                      {verbsCheatSheet.map((v, i) => {
                        const isActive = searchQuery.toLowerCase().includes(v.verb.split(' ')[0].toLowerCase()) || searchQuery.toLowerCase() === v.verb.split(' ')[0].toLowerCase();
                        return (
                          <button
                            id={`pocket-verb-item-${i}`}
                            key={v.verb}
                            onClick={() => {
                              setSearchQuery(v.verb.split(' ')[0]);
                            }}
                            className={`w-full text-left px-3 py-3 rounded-xl text-xs font-black transition-all duration-150 flex items-center justify-between border-2 cursor-pointer ${
                              isActive
                                ? 'bg-vibrant-accent text-white border-vibrant-charcoal shadow-retro-sm'
                                : 'bg-vibrant-cardbg hover:bg-vibrant-cardbg/70 text-vibrant-charcoal border-transparent'
                            }`}
                          >
                            <span>{v.verb}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold border ${
                              isActive
                                ? 'bg-vibrant-secondary text-vibrant-charcoal border-vibrant-charcoal'
                                : 'bg-white text-vibrant-charcoal border-vibrant-charcoal/20'
                            }`}>
                              {v.class}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: detailed conjugation table output with colors */}
                  <div className="md:col-span-8 bg-vibrant-cardbg rounded-2xl p-6 border-2 border-vibrant-charcoal shadow-retro-sm">
                    {/* Active Match */}
                    {(() => {
                      const activeVerb = verbsCheatSheet.find(v => 
                        v.verb.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        searchQuery.toLowerCase().includes(v.verb.split(' ')[0].toLowerCase())
                      ) || verbsCheatSheet[0];

                      return (
                        <div className="space-y-4">
                          <div className="flex justify-between items-start border-b-2 border-vibrant-charcoal/20 pb-3">
                            <div>
                              <h4 className="text-xl font-black text-vibrant-accent font-mono">{activeVerb.verb}</h4>
                              <p className="text-xs text-vibrant-charcoal font-bold italic mt-0.5">« {activeVerb.translation} »</p>
                            </div>
                            <span className={`text-xs px-3 py-1 rounded-full font-mono font-black border-2 ${
                              activeVerb.class === 'irregular' 
                                ? 'bg-[#fffae5] text-vibrant-primary border-[#ffeaa7]' 
                                : 'bg-[#eef1f7] text-[#3c40c6] border-[#3c40c6]/30'
                            }`}>
                              {activeVerb.class === 'irregular' ? 'Անկանոն բայ' : 'Կանոնավոր բայ'}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {Object.entries(activeVerb.forms).map(([pronoun, form]) => (
                              <div key={pronoun} className="bg-white border-2 border-vibrant-charcoal rounded-xl p-3 shadow-retro-sm">
                                <span className="text-[10px] font-mono text-vibrant-primary uppercase tracking-widest block font-black mb-1">{pronoun}</span>
                                <span className="text-sm font-black font-mono text-vibrant-charcoal">{form}</span>
                              </div>
                            ))}
                          </div>

                          <div className="mt-4 p-4 rounded-xl bg-white border-2 border-vibrant-charcoal shadow-retro-sm">
                            <span className="text-xs font-mono font-black text-vibrant-accent uppercase block mb-1">ՕՐԻՆԱԿՆ ԱՌՕՐՅԱՅԻՑ</span>
                            <p className="text-sm font-black text-vibrant-charcoal font-mono italic leading-relaxed">{activeVerb.example}</p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                </div>
              </div>

              {/* Grid summarization table for entire Subjuntivo tenses */}
              <div className="bg-white p-6 rounded-3xl border-2 border-vibrant-charcoal shadow-retro max-w-4xl mx-auto">
                <h4 className="text-lg font-black text-vibrant-accent mb-3 flex items-center gap-2 font-sans">
                  <Info className="w-5 h-5 text-vibrant-primary" />
                  Subjuntivo Ժամանակաձևերի Միացյալ Համառոտ Աղյուսակ
                </h4>
                <div className="overflow-x-auto rounded-xl border-2 border-vibrant-charcoal">
                  <table className="w-full text-left text-sm border-collapse font-sans">
                    <thead>
                      <tr className="bg-vibrant-cardbg text-vibrant-charcoal font-bold border-b-2 border-vibrant-charcoal">
                        <th className="p-3">Ժամանակաձև</th>
                        <th className="p-3">Իսպաներեն Օրինակ</th>
                        <th className="p-3">Հայերեն Իմաստը</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-vibrant-cardbg">
                      <tr className="hover:bg-vibrant-cardbg/20">
                        <td className="p-3 font-semibold text-vibrant-accent font-mono text-xs">Presente de Subjuntivo</td>
                        <td className="p-3 font-mono text-[#1e272e] font-bold">Quiero que vengas.</td>
                        <td className="p-3 text-vibrant-charcoal font-medium">Ուզում եմ, որ դու գաս:</td>
                      </tr>
                      <tr className="hover:bg-vibrant-cardbg/20">
                        <td className="p-3 font-semibold text-vibrant-primary font-mono text-xs">Perfecto de Subjuntivo</td>
                        <td className="p-3 font-mono text-[#1e272e] font-bold">Me alegro de que hayas venido.</td>
                        <td className="p-3 text-vibrant-charcoal font-medium">Ուրախ եմ, որ դու եկել ես:</td>
                      </tr>
                      <tr className="hover:bg-vibrant-cardbg/20">
                        <td className="p-3 font-semibold text-vibrant-accent font-mono text-xs">Imperfecto de Subjuntivo</td>
                        <td className="p-3 font-mono text-[#1e272e] font-bold">Quería que vinieras.</td>
                        <td className="p-3 text-vibrant-charcoal font-medium">Ուզում էի, որ դու գայիր:</td>
                      </tr>
                      <tr className="hover:bg-vibrant-cardbg/20">
                        <td className="p-3 font-semibold text-vibrant-primary font-mono text-xs">Pluscuamperfecto de Subjuntivo</td>
                        <td className="p-3 font-mono text-[#1e272e] font-bold">Ojalá hubieras venido.</td>
                        <td className="p-3 text-vibrant-charcoal font-medium">Երանի դու եկած լինեիր:</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* Styled Footer */}
      <footer className="mt-20 border-t-4 border-vibrant-charcoal bg-vibrant-cardbg py-10 text-center text-xs text-vibrant-charcoal">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono font-bold">
          <span>🇪🇸 EsSubjuntivo - Իսպաներեն Subjuntivo եղանակի ուսումնական հարթակ</span>
          <span>© 2026 Բոլոր իրավունքները պաշտպանված են։</span>
        </div>
      </footer>

    </div>
  );
}
