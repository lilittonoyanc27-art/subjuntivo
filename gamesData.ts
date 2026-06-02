import { OptionQuestion, WeddingMatchItem, DialogueStep } from './types';

export const theoryBlocks = [
  {
    id: 'intro',
    title: '📘 Subjuntivo-ի ներածություն',
    content: `Subjuntivo-ն իսպաներենում եղանակ է, ոչ թե պարզապես ժամանակ։
Այն օգտագործվում է, երբ խոսքը ոչ թե փաստի մասին է, այլ՝
**ցանկություն, կասկած, զգացմունք, խորհուրդ, անհրաժեշտություն, հնարավորություն, վախ, անորոշություն, նպատակ, պայման:**

Հայերենում Subjuntivo-ի ուղիղ ձև չկա, դրա համար հաճախ թարգմանվում է **«որ + բայ»** կառուցվածքով։

Օրինակ՝
* **Quiero que vengas.**
* *Ես ուզում եմ, որ դու գաս։*
* Այստեղ *vengas* Subjuntivo է, որովհետև դա իմ ցանկությունն է, ոչ թե հաստատված փաստ։`
  },
  {
    id: 'diff',
    title: '1️⃣ Indicativo և Subjuntivo տարբերությունը',
    content: `**Indicativo — փաստ, իրականություն**
Օգտագործվում է, երբ ասում ենք այն, ինչ գիտենք, տեսնում ենք, հաստատում ենք։
* *Sé que Ana viene.* — Ես գիտեմ, որ Անան գալիս է։ (viene = Indicativo, քանի որ փաստ է)`
  },
  {
    id: 'base_formula',
    title: '2️⃣ Subjuntivo-ի հիմնական բանաձևը',
    content: `Շատ հաճախ Subjuntivo-ն օգտագործվում է այս կառուցվածքով՝
**Գլխավոր նախադասություն + que + Subjuntivo**

Օրինակ՝
* *Espero que estés bien.* — Հույս ունեմ, որ լավ լինես։
* *Es importante que estudies.* — Կարևոր է, որ դու սովորես։
* *No creo que él tenga razón.* — Չեմ կարծում, որ նա ճիշտ է։`
  },
  {
    id: 'presente_subj',
    title: '3️⃣ Presente de Subjuntivo — Ներկա Subjuntivo',
    content: `Սա ամենաշատ օգտագործվող տեսակն է։

**Կազմությունը**
Վերցնում ենք բայի **yo** ձևը Presente Indicativo-ում, հանում ենք **-o**, հետո ավելացնում ենք **հակառակ** վերջավորությունները։`
  },
  {
    id: 'irregular_verbs',
    title: '4️⃣ Subjuntivo-ի կարևոր անկանոն բայերը',
    content: `Սրանք պետք է անգիր հիշել, որովհետև շատ են օգտագործվում։
* **Ser (լինել)**: sea, seas, sea, seamos, seáis, sean
* **Estar (լինել / գտնվել)**: esté, estés, esté, estemos, estéis, estén
* **Tener (ունենալ)**: tenga, tengas, tenga, tengamos, tengáis, tengan
* **Ir (գնալ)**: vaya, vayas, vaya, vayamos, vayáis, vayan
* **Saber (իմանալ)**: sepa, sepas, sepa, sepamos, sepáis, sepan
* **Dar (տալ)**: dé, des, dé, demos, deis, den
* **Haber (լինել / օժանդակ բայ)**: haya, hayas, haya, hayamos, hayáis, hayan`
  },
  {
    id: 'uses',
    title: '5️⃣ Երբ է օգտագործվում Subjuntivo-ն',
    content: `Այն օգտագործվում է հետևյալ դեպքերում՝
1. **Ցանկություն (Wishes)**: querer que, desear que, esperar que, preferir que
2. **Խորհուրդ, հրաման, խնդրանք (Influence)**: aconsejar que, recomendar que, pedir que, decir que (instructions), ordenar que
3. **Զգացմունք (Emotions)**: alegrarse de que, sentir que, tener miedo de que, gustar que, molestar que
4. **Կասկած և ժխտում (Doubt & Denial)**: no creer que, dudar que, no pensar que, no estar seguro/a de que
5. **Անհրաժեշտություն, կարևորություն (Impersonal / Necessity)**: es importante que, es necesario que, es mejor que, es posible que, es probable que
6. **Նպատակ (Goals)**: para que, a fin de que
7. **Ժամանակային կապեր ապագայի իմաստով**: cuando, antes de que, después de que, hasta que, en cuanto, tan pronto como (երբ խոսքը ապագայի մասին է)
8. **Aunque (չնայած որ)**: Aunque + Subjuntivo (ենթադրություն, դեռ չհաստատված փաստ)`
  },
  {
    id: 'types_subj',
    title: '6️⃣ Subjuntivo-ի տեսակները և ժամանակները',
    content: `Իսպաներենում Subjuntivo-ն ունի մի քանի ժամանակ.
1. **Presente de Subjuntivo** (Ներկա) — *Quiero que vengas* (Ուզում եմ, որ գաս)
2. **Pretérito Perfecto de Subjuntivo** (Անցյալ կատարյալ) — *Me alegro de que hayas venido* (Ուրախ եմ, որ եկել ես)
3. **Imperfecto de Subjuntivo** (Անցյալ անկատար) — *Quería que vinieras* (Ուզում էի, որ գայիր)
4. **Pluscuamperfecto de Subjuntivo** (Վաղակատար անցյալ) — *Ojalá hubieras venido* (Երանի եկած լինեիր)`
  },
  {
    id: 'ojala_si',
    title: '7️⃣ Ojalá և Si կայուն կառույցներ',
    content: `**Ojalá + Subjuntivo** (Երանի / Հուսով եմ)
* *Ojalá tengas suerte* (Երանի հաջողություն ունենաս — Presente)
* *Ojalá tuviera más tiempo* (Երանի ավելի շատ ժամանակ ունենայի — Imperfecto)
* *Ojalá hubiera estudiado más* (Երանի ավելի շատ սովորած լինեի — Pluscuamperfecto)

**Si + Subjuntivo** (Եթե)
* Իրական պայման: *Si tengo tiempo, voy contigo* (Si + Indicativo)
* Անիրական պայման: *Si tuviera dinero, viajaría a España* (Si + Imperfecto de Subjuntivo)
* Անցյալի անիրական պայման: *Si hubiera tenido tiempo, habría ido contigo* (Si + Pluscuamperfecto de Subjuntivo)`
  },
  {
    id: 'wedding_rule',
    title: '💡 WEDDING կանոնը',
    content: `Սա ամենահեշտ ձևն է հիշելու համար, թե երբ է պահանջվում Subjuntivo.
* **W** — Wishes (Ցանկություններ)
* **E** — Emotions (Զգացմունքներ)
* **D** — Doubt (Կասկած)
* **D** — Denial (Ժխտում / Չհավատալ)
* **I** — Impersonal expressions (Անանձնական արտահայտություններ)
* **N** — Necessity (Անհրաժեշտություն)
* **G** — Goals (Նպատակներ / para que)`
  }
];

// --- GAME 1: Indicativo vs Subjuntivo ---
export const game1Questions: OptionQuestion[] = [
  {
    id: 1,
    sentence: "Sé que Ana ___ hoy.",
    translation: "Գիտեմ, որ Անան գալիս է այսօր:",
    options: ["viene", "venga", "vengas"],
    correctIndex: 0,
    explanation: "«Sé que» (Ես գիտեմ, որ) արտահայտում է հաստատ համոզմունք և իրական փաստ, ուստի օգտագործվում է Indicativo (viene)։",
    category: "indicative"
  },
  {
    id: 2,
    sentence: "Quiero que Ana ___ hoy.",
    translation: "Ուզում եմ, որ Անան գա այսօր:",
    options: ["viene", "venga", "vengan"],
    correctIndex: 1,
    explanation: "«Quiero que» (Ուզում եմ, որ) արտահայտում է ցանկություն, ուստի պարտադիր պահանջում է Subjuntivo (venga)։",
    category: "subjunctive"
  },
  {
    id: 3,
    sentence: "Creo que él ___ razón.",
    translation: "Կարծում եմ, որ նա ճիշտ է (ունի իրավացիություն):",
    options: ["tenga", "tiene", "tienes"],
    correctIndex: 1,
    explanation: "«Creo que» (Կարծում եմ, որ) արտահայտում է խոսողի համոզմունքը/կարծիքը, որն ընդունվում է որպես իրականություն, ուստի պահանջում է Indicativo (tiene)։",
    category: "indicative"
  },
  {
    id: 4,
    sentence: "No creo que él ___ razón.",
    translation: "Չեմ կարծում, որ նա ճիշտ է:",
    options: ["tenga", "tiene", "tengas"],
    correctIndex: 0,
    explanation: "Ժխտական «No creo que»-ն արտահայտում է կասկած և ժխտում, ինչի պատճառով պահանջում է Subjuntivo (tenga)։",
    category: "subjunctive"
  },
  {
    id: 5,
    sentence: "Es verdad que ___ mucho.",
    translation: "Ճիշտ է, որ նա շատ է աշխատում:",
    options: ["trabaje", "trabaja", "trabajas"],
    correctIndex: 1,
    explanation: "«Es verdad que» (Ճիշտ է, որ) հաստատում է փաստը, ուստի ընտրում ենք Indicativo (trabaja)։",
    category: "indicative"
  },
  {
    id: 6,
    sentence: "Es importante que ___ mucho.",
    translation: "Կարևոր է, որ նա աշխատի շատ:",
    options: ["trabaje", "trabaja", "trabajeis"],
    correctIndex: 0,
    explanation: "«Es importante que»-ն անանձնական կարևորություն արտահայտող կառույց է, որը պահանջում է Subjuntivo (trabaje)։",
    category: "subjunctive"
  },
  {
    id: 7,
    sentence: "Estoy segura de que Ana ___ tiempo.",
    translation: "Վստահ եմ, որ Անան ժամանակ ունի:",
    options: ["tenga", "tiene", "tengas"],
    correctIndex: 1,
    explanation: "«Estoy segura de que»-ն արտահայտում է լիակատար վստահություն, ուստի օգտագործվում է Indicativo (tiene)։",
    category: "indicative"
  },
  {
    id: 8,
    sentence: "No estoy segura de que Ana ___ tiempo.",
    translation: "Վստահ չեմ, որ Անան ժամանակ ունի:",
    options: ["tenga", "tiene", "tengas"],
    correctIndex: 0,
    explanation: "«No estoy segura de que»-ն արտահայտում է անվստահություն/կասկած, ուստի պահանջում է Subjuntivo (tenga)։",
    category: "subjunctive"
  }
];

// --- GAME 2: Presente de Subjuntivo Conjugations ---
export interface ConjugationChallenge {
  id: number;
  verb: string;
  translation: string;
  pronoun: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
}

export const game2Challenges: ConjugationChallenge[] = [
  {
    id: 1,
    verb: "hablar (խոսել)",
    translation: "Ուզում եմ, որ դու խոսես ինձ հետ (tú):",
    pronoun: "tú",
    correctAnswer: "hables",
    options: ["hablas", "hables", "hable"],
    explanation: "-AR բայերի դեպքում (hablar) հեռացնում ենք yo-ձևի -о-ն (hablo) և ավելացնում -ER/-IR լծորդության վերջավորություններ. tú-ի համար՝ -hables:"
  },
  {
    id: 2,
    verb: "comer (ուտել)",
    translation: "Կարևոր է, որ մենք միասին ուտենք (nosotros):",
    pronoun: "nosotros",
    correctAnswer: "comamos",
    options: ["comemos", "comamos", "coman"],
    explanation: "-ER բայերի դեպքում (comer) yo-ձևից (como) հետո ավելացնում ենք -AR լծորդության վերջավորություններ. nosotros-ի համար՝ -comamos:"
  },
  {
    id: 3,
    verb: "vivir (ապրել)",
    translation: "Հույս ունեմ, որ երջանիկ ապրես (tú):",
    pronoun: "tú",
    correctAnswer: "vivas",
    options: ["vives", "vivas", "viva"],
    explanation: "-IR բայերի դեպքում (vivir) օգտագործվում են -AR վերջավորությունները. tú-ի համար՝ -vivas:"
  },
  {
    id: 4,
    verb: "ser (լինել - անկանոն)",
    translation: "Ուզում եմ, որ դու երջանիկ լինես (tú):",
    pronoun: "tú",
    correctAnswer: "seas",
    options: ["eres", "estés", "seas"],
    explanation: "«Ser»-ը լիովին անկանոն է Subjuntivo-ում: Դրա ձևերն են՝ sea, seas, sea... tú-ի համար կլինի seas:"
  },
  {
    id: 5,
    verb: "estar (լինել/գտնվել - անկանոն)",
    translation: "Հույս ունեմ, որ լավ լինես (tú):",
    pronoun: "tú",
    correctAnswer: "estés",
    options: ["estás", "estés", "seas"],
    explanation: "«Estar» բայն ունի հատուկ շեշտադրված վերջավորություններ Subjuntivo-ում՝ esté, estés, esté, estemos... tú-ի համար՝ estés:"
  },
  {
    id: 6,
    verb: "tener (ունենալ - yo-անկանոն)",
    translation: "Չեմ ուզում, որ վախենաս (tú):",
    pronoun: "tú",
    correctAnswer: "tengas",
    options: ["tienes", "tengas", "tenga"],
    explanation: "Tener բայի yo ձևն է Presente-ում՝ tengo։ Հիմքը teng- է, ուստի Subjuntivo form-երն են՝ tenga, tengas, tenga... tú-ի համար՝ tengas:"
  },
  {
    id: 7,
    verb: "saber (իմանալ - անկանոն)",
    translation: "Կարևոր է, որ դու իմանաս ճշմարտությունը (tú):",
    pronoun: "tú",
    correctAnswer: "sepas",
    options: ["sabas", "sepas", "sepa"],
    explanation: "Saber բայի Subjuntivo-ն անկանոն է՝ sepa, sepas, sepa... tú-ի համար կլինի sepas:"
  },
  {
    id: 8,
    verb: "ir (գնալ - անկանոն)",
    translation: "Ուզում եմ, որ դու ինձ հետ գնաս (tú):",
    pronoun: "tú",
    correctAnswer: "vayas",
    options: ["vas", "vayas", "vayan"],
    explanation: "Ir բայի Subjuntivo-ն անկանոն է՝ vaya, vayas, vaya... tú-ի համար կլինի vayas:"
  }
];

// --- GAME 3: WEDDING Category Matcher ---
export const game3Items: WeddingMatchItem[] = [
  {
    id: 1,
    sentence: "Quiero que estudies español.",
    translation: "Ուզում եմ, որ դու իսպաներեն սովորես:",
    category: "W",
    categoryName: "Wishes (Ցանկություններ)",
    explanation: "«Quero que»-ն արտահայտում է ցանկություն (Wishes), ինչը WEDDING-ի W տառն է:"
  },
  {
    id: 2,
    sentence: "Me alegro de que estés aquí.",
    translation: "Ուրախ եմ, որ դու այստեղ ես:",
    category: "E",
    categoryName: "Emotions (Զգացմունքներ)",
    explanation: "«Me alegro de que» (ուրախ եմ, որ) արտահայտում է զգացմունք (Emotions), ինչը WEDDING-ի E տառն է:"
  },
  {
    id: 3,
    sentence: "Dudo que sea verdad.",
    translation: "Կասկածում եմ, որ դա ճիշտ է:",
    category: "D",
    categoryName: "Doubt (Կասկած)",
    explanation: "«Dudo que» (Կասկածում եմ, որ) ուղիղ արտահայտում է կասկած (Doubt), ինչը WEDDING-ի առաջին D տառն է:"
  },
  {
    id: 4,
    sentence: "No creo que él venga.",
    translation: "Չեմ կարծում, որ նա կգա:",
    category: "D2",
    categoryName: "Denial (Ժխտում)",
    explanation: "«No creo que» (Չեմ կարծում) արտահայտում է չհավատալ կամ ժխտում (Denial), ինչը WEDDING-ի երկրորդ D տառն է:"
  },
  {
    id: 5,
    sentence: "Es posible que Ana esté en casa.",
    translation: "Հնարավոր է, որ Անան տանն է:",
    category: "I",
    categoryName: "Impersonal expressions (Անանձնական)",
    explanation: "«Es posible que»-ն անանձնական գնահատողական արտահայտություն է (Impersonal expressions / I):"
  },
  {
    id: 6,
    sentence: "Es necesario que practiques.",
    translation: "Անհրաժեշտ է, որ պարապես (պրակտիկա անես):",
    category: "N",
    categoryName: "Necessity (Անհրաժեշտություն)",
    explanation: "«Es necesario que»-ն ցույց է տալիս անհրաժեշտություն (Necessity / N):"
  },
  {
    id: 7,
    sentence: "Te llamo para que vengas.",
    translation: "Զանգում եմ քեզ, որպեսզի գաս:",
    category: "G",
    categoryName: "Goals (Նպատակներ)",
    explanation: "«para que» կառույցն արտահայտում է նպատակ (Goals / G) և միշտ պահանջում է Subjuntivo:"
  }
];

// --- GAME 4: Cuando clauses (Future vs Habitual) ---
export interface CuandoChallenge {
  id: number;
  sentence: string;
  translation: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  isFuture: boolean;
}

export const game4Challenges: CuandoChallenge[] = [
  {
    id: 1,
    sentence: "Cuando ___ a casa, descanso.",
    translation: "Երբ տուն եմ հասնում, հանգստանում եմ (սովորական գործողություն):",
    options: ["llego", "llegue"],
    correctIndex: 0,
    explanation: "Քանի որ սա սովորական, պարբերաբար կրկնվող գործողություն է ներկայում (descanso), օգտագործվում է Indicativo (llego)։",
    isFuture: false
  },
  {
    id: 2,
    sentence: "Cuando ___ a casa, descansaré.",
    translation: "Երբ տուն հասնեմ, կհանգստանամ (ապագայի գործողություն):",
    options: ["llego", "llegue"],
    correctIndex: 1,
    explanation: "Քանի որ խոսքն ապագայում կատարվելիք գործողության մասին է (descansaré), «cuando»-ից հետո պարտադիր ընտրում ենք Subjuntivo (llegue)։",
    isFuture: true
  },
  {
    id: 3,
    sentence: "En cuanto ___ tiempo, te escribiré.",
    translation: "Հենց որ ժամանակ ունենամ, քեզ կգրեմ (ապագա):",
    options: ["tengo", "tenga"],
    correctIndex: 1,
    explanation: "«En cuanto»-ն ապագային վերաբերելիս պահանջում է Subjuntivo (tenga), քանի որ դրա կատարվելը դեռ փաստ չէ։",
    isFuture: true
  },
  {
    id: 4,
    sentence: "Antes de que ___ , llámame.",
    translation: "Մինչև դուրս գալդ, զանգիր ինձ (ապագա գործողություն):",
    options: ["sales", "salgas"],
    correctIndex: 1,
    explanation: "«Antes de que» (մինչև որ) կառույցից հետո միշտ օգտագործվում է Subjuntivo (salgas)։",
    isFuture: true
  }
];

// --- GAME 5: Condición y Ojalá (Si & Ojalá Matcher) ---
export interface ConditionalChallenge {
  id: number;
  sentence: string;
  translation: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  tenseUsed: string;
}

export const game5Challenges: ConditionalChallenge[] = [
  {
    id: 1,
    sentence: "Si ___ dinero, viajaría a España.",
    translation: "Եթե փող ունենայի, Իսպանիա կգնայի (քիչ հավանական ներկա/ապագա պայման)։",
    options: ["tengo", "tuviera", "hubiera tenido"],
    correctIndex: 1,
    explanation: "Քանի որ երկրորդ մասն անցյալ պայմանական է (viajaría), «Si»-ից հետո օգտագործում ենք Imperfecto de Subjuntivo (tuviera)։",
    tenseUsed: "Imperfecto de Subjuntivo"
  },
  {
    id: 2,
    sentence: "Si ___ tiempo, voy contigo.",
    translation: "Եթե ժամանակ ունենամ, քեզ հետ կգնամ (իրական, հնարավոր պայման):",
    options: ["tengo", "tuviera", "tenga"],
    correctIndex: 0,
    explanation: "Իրական պայմանի դեպքում (voy contigo) «Si»-ից հետո օգտագործվում է սովորական Presente de Indicativo (tengo)։ *Ուշադրություն. «Si»-ից հետո Presente de Subjuntivo երբեք չի դրվում:*",
    tenseUsed: "Presente de Indicativo"
  },
  {
    id: 3,
    sentence: "Si me ___ , te habría ayudado.",
    translation: "Եթե ինձ զանգած լինեիր, քեզ կօգնեի (անցյալի անիրական պայման):",
    options: ["llamas", "llamaras", "hubieras llamado"],
    correctIndex: 2,
    explanation: "Քանի որ խոսքն անցյալի չկատարված պայմանի մասին է (te habría ayudado), օգտագործում ենք Pluscuamperfecto de Subjuntivo (hubieras llamado)։",
    tenseUsed: "Pluscuamperfecto de Subjuntivo"
  },
  {
    id: 4,
    sentence: "Ojalá ___ más tiempo ahora.",
    translation: "Երանի հիմա ավելի շատ ժամանակ ունենայի (քիչ հավանական ցանկություն ներկայում)։",
    options: ["tengo", "tenga", "tuviera"],
    correctIndex: 2,
    explanation: "Ներկայում անիրական կամ քիչ հավանական ցանկություն արտահայտելու համար «Ojalá»-ից հետո օգտագործվում է Imperfecto de Subjuntivo (tuviera)։",
    tenseUsed: "Imperfecto de Subjuntivo"
  },
  {
    id: 5,
    sentence: "Ojalá ___ suerte mañana.",
    translation: "Երանի հաջողություն ունենաս վաղը (իրականանալի ցանկություն ապագայի համար)։",
    options: ["tienes", "tengas", "tuvieras"],
    correctIndex: 1,
    explanation: "Ապագայի հնարավոր ցանկության համար օգտագործում ենք Presente de Subjuntivo (tengas)։",
    tenseUsed: "Presente de Subjuntivo"
  }
];

// --- GAME 6: Dialogue Role-play (Ana & Carlos) ---
export const game6Steps: DialogueStep[] = [
  {
    id: 1,
    speaker: "Ana",
    text: "Quiero que ___ a mi casa mañana.",
    fullText: "Quiero que vengas a mi casa mañana.",
    translation: "Ուզում եմ, որ վաղը գաս իմ տուն:",
    options: ["vienes", "vengas"],
    correctIndex: 1,
    explanation: "«Quiero que»-ն արտահայտում է ցանկություն, ուստի պահանջում է Subjuntivo (vengas)։"
  },
  {
    id: 2,
    speaker: "Carlos",
    text: "No sé si ___ . Tengo mucho trabajo.",
    fullText: "No sé si pueda. Tengo mucho trabajo.",
    translation: "Չգիտեմ՝ կկարողանամ արդյոք։ Շատ աշխատանք ունեմ։",
    options: ["puedo", "pueda"],
    correctIndex: 1,
    explanation: "«No sé si...» կառույցը կասկած, անորոշություն արտահայտելիս կարող է օգտագործել Subjuntivo (pueda)՝ անվստահությունն ընդգծելու համար:"
  },
  {
    id: 3,
    speaker: "Ana",
    text: "Espero que ___ tiempo.",
    fullText: "Espero que tengas tiempo.",
    translation: "Հույս ունեմ, որ ժամանակ կունենաս:",
    options: ["tienes", "tengas"],
    correctIndex: 1,
    explanation: "«Espero que» (Հույս ունեմ, որ) արտահայտում է ապագայի ցանկություն և պահանջում է Subjuntivo (tengas)։"
  },
  {
    id: 4,
    speaker: "Ana",
    text: "Es importante que ___ .",
    fullText: "Es importante que hablemos.",
    translation: "Կարևոր է, որ խոսենք:",
    options: ["hablamos", "hablemos"],
    correctIndex: 1,
    explanation: "«Es importante que»-ն անանձնական անհրաժեշտություն է, որին հետևում է Subjuntivo (hablemos)։"
  },
  {
    id: 5,
    speaker: "Carlos",
    text: "Está bien. Te llamaré cuando ___ .",
    fullText: "Está bien. Te llamaré cuando termine.",
    translation: "Լավ: Քեզ կզանգեմ, երբ ավարտեմ:",
    options: ["termino", "termine"],
    correctIndex: 1,
    explanation: "«cuando»-ն ապագա գործողության հետ կապված պահանջում է Subjuntivo (termine)։"
  }
];
