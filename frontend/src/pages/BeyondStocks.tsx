import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";
import {
  HelpCircle,
  TrendingUp,
  Shield,
  Layers,
  Sparkles,
  ChevronRight,
  ChevronDown,
  RotateCw,
  Sliders,
  DollarSign,
  Download,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Send,
  Building2,
  Landmark,
  Radio,
  ExternalLink,
  RefreshCcw,
  BookOpen
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Jargon Definitions for Tooltips
const JARGON: Record<string, string> = {
  "REIT": "Real Estate Investment Trust: SEBI-regulated entity that owns income-generating commercial properties and must distribute >=90% net cash flow.",
  "InvIT": "Infrastructure Investment Trust: Similar to REITs but owns infrastructure like power transmission grids, toll expressways, and renewable pipelines.",
  "Bond": "Fixed-income debt security issued by governments or corporations paying periodic coupon interest until maturity.",
  "Yield": "Annual income (dividends/interest) divided by current market price, expressed as a percentage.",
  "DPU": "Distribution Per Unit: The cash payout (dividends + interest + repayment) distributed to each unitholder.",
  "NAV": "Net Asset Value: Fair market value of underlying properties or assets minus debt, divided by total outstanding units.",
  "SPV": "Special Purpose Vehicle: Subsidiary entity holding the specific physical properties or concession rights.",
  "Coupon": "Fixed annual interest rate paid by a bond issuer to the investor.",
  "Sovereign": "Backed by the Reserve Bank of India and Govt of India, carrying near-zero credit default risk."
};

// Hardcoded historical sample data for REITs, InvITs, and Bonds
const INSTRUMENTS_DATA = {
  reits: [
    {
      id: "nxst",
      name: "Nexus Select Trust",
      ticker: "NXST.NS",
      type: "Retail Malls & Commercial",
      currentPrice: 138.5,
      yield: "7.8%",
      rating: "CRISIL AAA",
      minInvestment: "₹139 (1 unit)",
      payout: "Quarterly",
      whatCanGoWrong: "Consumer footfall reduction during severe economic slowdowns, or vacancy spikes in tier-2 retail malls.",
      history: [
        { period: "Q2 '23", price: 104, payout: 2.1 },
        { period: "Q3 '23", price: 112, payout: 2.2 },
        { period: "Q4 '23", price: 118, payout: 2.3 },
        { period: "Q1 '24", price: 122, payout: 2.35 },
        { period: "Q2 '24", price: 128, payout: 2.4 },
        { period: "Q3 '24", price: 133, payout: 2.45 },
        { period: "Q4 '24", price: 135, payout: 2.5 },
        { period: "Q1 '25", price: 136, payout: 2.55 },
        { period: "Q2 '25", price: 137, payout: 2.6 },
        { period: "Q3 '25", price: 138, payout: 2.65 },
        { period: "Q4 '25", price: 138.5, payout: 2.7 }
      ]
    },
    {
      id: "embassy",
      name: "Embassy Office Parks REIT",
      ticker: "EMBASSY.NS",
      type: "Grade-A IT & Tech Parks",
      currentPrice: 378.0,
      yield: "7.2%",
      rating: "CRISIL AAA",
      minInvestment: "₹378 (1 unit)",
      payout: "Quarterly",
      whatCanGoWrong: "Global tech hiring slowdowns lowering office absorption, or work-from-home policy renewals.",
      history: [
        { period: "Q2 '23", price: 315, payout: 5.2 },
        { period: "Q3 '23", price: 322, payout: 5.3 },
        { period: "Q4 '23", price: 330, payout: 5.4 },
        { period: "Q1 '24", price: 342, payout: 5.5 },
        { period: "Q2 '24", price: 355, payout: 5.6 },
        { period: "Q3 '24", price: 362, payout: 5.7 },
        { period: "Q4 '24", price: 368, payout: 5.8 },
        { period: "Q1 '25", price: 372, payout: 5.9 },
        { period: "Q2 '25", price: 375, payout: 6.0 },
        { period: "Q3 '25", price: 377, payout: 6.1 },
        { period: "Q4 '25", price: 378.0, payout: 6.2 }
      ]
    },
    {
      id: "biret",
      name: "Brookfield India Real Estate Trust",
      ticker: "BIRET.NS",
      type: "Commercial Office Campus",
      currentPrice: 254.0,
      yield: "8.1%",
      rating: "CRISIL AAA",
      minInvestment: "₹254 (1 unit)",
      payout: "Quarterly",
      whatCanGoWrong: "Interest rate hike increasing SPV debt servicing costs, and concentrated tenant lease expiries.",
      history: [
        { period: "Q2 '23", price: 240, payout: 4.5 },
        { period: "Q3 '23", price: 245, payout: 4.6 },
        { period: "Q4 '23", price: 248, payout: 4.7 },
        { period: "Q1 '24", price: 250, payout: 4.8 },
        { period: "Q2 '24", price: 252, payout: 4.9 },
        { period: "Q3 '24", price: 253, payout: 5.0 },
        { period: "Q4 '24", price: 254, payout: 5.1 },
        { period: "Q1 '25", price: 253, payout: 5.15 },
        { period: "Q2 '25", price: 254, payout: 5.2 },
        { period: "Q3 '25", price: 254, payout: 5.25 },
        { period: "Q4 '25", price: 254.0, payout: 5.3 }
      ]
    }
  ],
  invits: [
    {
      id: "pginvit",
      name: "PowerGrid InvIT",
      ticker: "PGINVIT.NS",
      type: "Power Transmission Lines",
      currentPrice: 94.2,
      yield: "10.4%",
      rating: "CRISIL AAA",
      minInvestment: "₹95 (1 unit)",
      payout: "Quarterly",
      whatCanGoWrong: "State electricity distribution company (DISCOM) payment delays or unexpected maintenance capex.",
      history: [
        { period: "Q2 '23", price: 98, payout: 3.0 },
        { period: "Q3 '23", price: 99, payout: 3.0 },
        { period: "Q4 '23", price: 97, payout: 3.0 },
        { period: "Q1 '24", price: 96, payout: 3.0 },
        { period: "Q2 '24", price: 95, payout: 3.0 },
        { period: "Q3 '24", price: 96, payout: 3.0 },
        { period: "Q4 '24", price: 94, payout: 3.0 },
        { period: "Q1 '25", price: 95, payout: 3.0 },
        { period: "Q2 '25", price: 94.5, payout: 3.0 },
        { period: "Q3 '25", price: 94, payout: 3.0 },
        { period: "Q4 '25", price: 94.2, payout: 3.0 }
      ]
    },
    {
      id: "indigrid",
      name: "India Grid Trust",
      ticker: "INDIGRID.NS",
      type: "Power Transmission & Solar",
      currentPrice: 134.0,
      yield: "9.8%",
      rating: "CRISIL AAA",
      minInvestment: "₹134 (1 unit)",
      payout: "Quarterly",
      whatCanGoWrong: "Severe weather damages to transmission towers or solar panel degradation exceeding provisions.",
      history: [
        { period: "Q2 '23", price: 138, payout: 3.3 },
        { period: "Q3 '23", price: 139, payout: 3.35 },
        { period: "Q4 '23", price: 137, payout: 3.4 },
        { period: "Q1 '24", price: 136, payout: 3.4 },
        { period: "Q2 '24", price: 138, payout: 3.45 },
        { period: "Q3 '24", price: 139, payout: 3.45 },
        { period: "Q4 '24", price: 135, payout: 3.5 },
        { period: "Q1 '25", price: 134, payout: 3.5 },
        { period: "Q2 '25", price: 135, payout: 3.5 },
        { period: "Q3 '25", price: 134, payout: 3.55 },
        { period: "Q4 '25", price: 134.0, payout: 3.55 }
      ]
    }
  ],
  bonds: [
    {
      id: "gsec718",
      name: "7.18% GS 2033 (Sovereign)",
      ticker: "718GS2033",
      type: "Government of India Security",
      currentPrice: 101.2,
      yield: "7.18%",
      rating: "SOVEREIGN (0% default risk)",
      minInvestment: "₹1,000 (RBI Retail Direct)",
      payout: "Semi-Annual Coupon",
      whatCanGoWrong: "Interest rate hike cycle can cause bond market price to trade below par before maturity.",
      history: [
        { period: "Q2 '23", price: 100.5, payout: 3.59 },
        { period: "Q3 '23", price: 100.8, payout: 0 },
        { period: "Q4 '23", price: 101.0, payout: 3.59 },
        { period: "Q1 '24", price: 100.9, payout: 0 },
        { period: "Q2 '24", price: 101.4, payout: 3.59 },
        { period: "Q3 '24", price: 101.6, payout: 0 },
        { period: "Q4 '24", price: 101.5, payout: 3.59 },
        { period: "Q1 '25", price: 101.3, payout: 0 },
        { period: "Q2 '25", price: 101.4, payout: 3.59 },
        { period: "Q3 '25", price: 101.2, payout: 0 },
        { period: "Q4 '25", price: 101.2, payout: 3.59 }
      ]
    },
    {
      id: "rec754",
      name: "REC Ltd 7.54% AAA 2029",
      ticker: "REC2029",
      type: "PSU Navratna Bond",
      currentPrice: 100.8,
      yield: "7.45%",
      rating: "CRISIL AAA",
      minInvestment: "₹10,000",
      payout: "Annual Coupon",
      whatCanGoWrong: "Secondary market liquidity discount if sold before the 2029 redemption maturity.",
      history: [
        { period: "Q2 '23", price: 100.1, payout: 0 },
        { period: "Q3 '23", price: 100.3, payout: 7.54 },
        { period: "Q4 '23", price: 100.5, payout: 0 },
        { period: "Q1 '24", price: 100.7, payout: 0 },
        { period: "Q2 '24", price: 100.9, payout: 0 },
        { period: "Q3 '24", price: 101.1, payout: 7.54 },
        { period: "Q4 '24", price: 101.0, payout: 0 },
        { period: "Q1 '25", price: 100.8, payout: 0 },
        { period: "Q2 '25", price: 100.9, payout: 0 },
        { period: "Q3 '25", price: 100.8, payout: 7.54 },
        { period: "Q4 '25", price: 100.8, payout: 0 }
      ]
    },
    {
      id: "hdfc785",
      name: "HDFC Bank Tier-II 7.85%",
      ticker: "HDFCB2034",
      type: "Private Bank Subordinated Debt",
      currentPrice: 101.5,
      yield: "7.70%",
      rating: "CARE AAA",
      minInvestment: "₹10,000",
      payout: "Annual Coupon",
      whatCanGoWrong: "Tier-II loss-absorption clauses in the extreme scenario of banking solvency intervention.",
      history: [
        { period: "Q2 '23", price: 100.2, payout: 0 },
        { period: "Q3 '23", price: 100.6, payout: 0 },
        { period: "Q4 '23", price: 101.0, payout: 7.85 },
        { period: "Q1 '24", price: 101.2, payout: 0 },
        { period: "Q2 '24", price: 101.5, payout: 0 },
        { period: "Q3 '24", price: 101.7, payout: 0 },
        { period: "Q4 '24", price: 101.8, payout: 7.85 },
        { period: "Q1 '25", price: 101.6, payout: 0 },
        { period: "Q2 '25", price: 101.5, payout: 0 },
        { period: "Q3 '25", price: 101.5, payout: 0 },
        { period: "Q4 '25", price: 101.5, payout: 7.85 }
      ]
    }
  ]
};

// 8 Questions for Risk Profile Quiz
const QUIZ_QUESTIONS = [
  {
    id: 1,
    title: "What is your current age bracket?",
    subtitle: "Age informs your compounding horizon and capacity to navigate economic cycles.",
    options: [
      { label: "18 – 29 years", desc: "Long runway for multi-decade compounding", score: 5 },
      { label: "30 – 44 years", desc: "Peak earning years with balance of growth & wealth preservation", score: 4 },
      { label: "45 – 59 years", desc: "Consolidation phase preparing for retirement cash flow", score: 3 },
      { label: "60+ years", desc: "Capital preservation and predictable income priority", score: 1 }
    ]
  },
  {
    id: 2,
    title: "How long do you plan to keep this money invested?",
    subtitle: "Your timeline dictates how much short-term market volatility you can accept.",
    options: [
      { label: "Under 2 years", desc: "Liquidity and capital safety are paramount", score: 1 },
      { label: "2 to 5 years", desc: "Moderate horizon suitable for bonds and stable yield trusts", score: 2 },
      { label: "5 to 10 years", desc: "Generates robust income compounding over full business cycles", score: 4 },
      { label: "10+ years", desc: "Maximum horizon capable of riding high equity swings", score: 5 }
    ]
  },
  {
    id: 3,
    title: "How predictable is your primary income?",
    subtitle: "Stable personal cash flows allow higher risk in your portfolio allocations.",
    options: [
      { label: "Variable or Freelance / Startup", desc: "Fluctuating income requires defensive portfolio buffer", score: 2 },
      { label: "Moderately stable salary / Business", desc: "Steady income with occasional bonus or market exposure", score: 3 },
      { label: "Highly secure salaried (MNC / PSU)", desc: "Guaranteed predictable monthly inflows", score: 5 },
      { label: "Retired / Dependent on portfolio", desc: "Requires dependable quarterly and monthly passive cash payouts", score: 1 }
    ]
  },
  {
    id: 4,
    title: "If your portfolio dropped by 20% in 3 months, what would you do?",
    subtitle: "Honest emotional response to inevitable market corrections.",
    options: [
      { label: "Sell all holdings immediately to avoid further losses", desc: "Very low risk tolerance; need capital security", score: 1 },
      { label: "Feel stressed and anxious, but wait for recovery", desc: "Moderate tolerance; high equity concentration causes discomfort", score: 2 },
      { label: "Stay calm and do nothing, understanding market cycles", desc: "Balanced temperament with disciplined patience", score: 4 },
      { label: "Excitedly deploy extra cash to buy the discount", desc: "High emotional resilience and aggressive mindset", score: 5 }
    ]
  },
  {
    id: 5,
    title: "How important is receiving regular passive cash flow right now?",
    subtitle: "REITs and InvITs pay regular quarterly cash, while pure stocks mostly retain earnings.",
    options: [
      { label: "Not needed at all — maximize long-term growth", desc: "Prefer capital appreciation over immediate dividend yields", score: 5 },
      { label: "Nice to have modest quarterly income as a bonus", desc: "Appreciate supplemental payouts reinvested for compounding", score: 3 },
      { label: "Very important to fund ongoing lifestyle or EMIs", desc: "Require steady 7-9% yields directly into bank account", score: 1 },
      { label: "Essential to reduce psychological dependency on stock prices", desc: "Want tangible physical cash flow to feel secure", score: 2 }
    ]
  },
  {
    id: 6,
    title: "How would you describe your investing experience?",
    subtitle: "Understanding multi-asset mechanics prevents hasty panic during market shifts.",
    options: [
      { label: "Complete beginner (< 1 year)", desc: "Still learning market basics and risk management", score: 2 },
      { label: "1 to 3 years primarily in direct stocks or MFs", desc: "Familiar with equities but new to REITs & debt securities", score: 3 },
      { label: "3+ years across stocks, debt, and mutual funds", desc: "Experienced investor seeking structural portfolio optimization", score: 4 },
      { label: "Seasoned investor with multi-asset allocation", desc: "Well-versed in yield spreads, credit ratings, and macro cycles", score: 5 }
    ]
  },
  {
    id: 7,
    title: "Do you maintain a dedicated emergency fund?",
    subtitle: "An emergency buffer guarantees you never sell long-term assets at a loss.",
    options: [
      { label: "Less than 1 month of living expenses", desc: "High financial vulnerability to sudden life emergencies", score: 1 },
      { label: "1 to 3 months of expenses in bank/FD", desc: "Basic cushion, still needs reinforcement with safe fixed income", score: 2 },
      { label: "3 to 6 months of expenses in liquid funds", desc: "Solid safety net providing investment peace of mind", score: 4 },
      { label: "6+ months of expenses fully liquid and untouchable", desc: "Robust protection allowing long-term asset positioning", score: 5 }
    ]
  },
  {
    id: 8,
    title: "What is the single most important goal for this capital?",
    subtitle: "Your overarching investment thesis shapes the optimal asset mix.",
    options: [
      { label: "Aggressive wealth compounding at maximum rate", desc: "Accept high volatility for potential outsized return", score: 5 },
      { label: "Balanced wealth creation with reduced drawdowns", desc: "Achieve equity growth cushioned by real physical asset payouts", score: 3 },
      { label: "Stable, inflation-beating passive income generation", desc: "Target 8-10% annual cash yields from commercial rent & utilities", score: 2 },
      { label: "Absolute capital preservation against inflation", desc: "Zero tolerance for principal impairment", score: 1 }
    ]
  }
];

export const BeyondStocks: React.FC = () => {
  const { holdings } = usePortfolio();

  // 1. Calculate Real User Stock Concentration
  const portfolioSummary = useMemo(() => {
    let totalVal = 0;
    let equityVal = 0;
    let mfVal = 0;
    let reitVal = 0;
    let invitVal = 0;
    let bondVal = 0;
    let goldVal = 0;
    let cashVal = 0;

    if (holdings && holdings.length > 0) {
      holdings.forEach((h) => {
        const val = (h.quantity || 0) * (h.currentPrice || h.avgPrice || 0);
        totalVal += val;
        const type = (h.type || "").toLowerCase();
        if (type.includes("stock") || type.includes("equity") || type.includes("etf")) {
          equityVal += val;
        } else if (type.includes("mutual fund") || type.includes("mf")) {
          mfVal += val;
        } else if (type.includes("reit")) {
          reitVal += val;
        } else if (type.includes("invit")) {
          invitVal += val;
        } else if (type.includes("bond") || type.includes("govt") || type.includes("fd")) {
          bondVal += val;
        } else if (type.includes("gold")) {
          goldVal += val;
        } else {
          cashVal += val;
        }
      });
    }

    // Default to realistic Indian retail investor portfolio if empty
    if (totalVal <= 0) {
      totalVal = 1250000;
      equityVal = 1150000; // 92%
      mfVal = 50000; // 4%
      reitVal = 0;
      invitVal = 0;
      bondVal = 0;
      goldVal = 25000; // 2%
      cashVal = 25000; // 2%
    }

    const equityPct = Math.round((equityVal / totalVal) * 100);
    const mfPct = Math.round((mfVal / totalVal) * 100);
    const reitPct = Math.round((reitVal / totalVal) * 100);
    const invitPct = Math.round((invitVal / totalVal) * 100);
    const bondPct = Math.round((bondVal / totalVal) * 100);
    const goldPct = Math.round((goldVal / totalVal) * 100);
    const cashPct = Math.max(0, 100 - (equityPct + mfPct + reitPct + invitPct + bondPct + goldPct));

    return {
      totalVal,
      equityVal,
      equityPct: Math.max(70, equityPct), // Retail investors typically heavily tilted
      distribution: [
        { name: "Direct Equities", value: equityPct, color: "#3b82f6" },
        { name: "Mutual Funds", value: mfPct, color: "#6366f1" },
        { name: "REITs", value: reitPct, color: "#10b981" },
        { name: "InvITs", value: invitPct, color: "#06b6d4" },
        { name: "Bonds / Debt", value: bondPct, color: "#f59e0b" },
        { name: "Gold", value: goldPct, color: "#eab308" },
        { name: "Liquid Cash", value: cashPct, color: "#71717a" }
      ].filter((d) => d.value > 0)
    };
  }, [holdings]);

  // Section 2: Flip cards state
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const toggleFlip = (index: number) => {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Section 3: Segmented selection for comparison
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>(["stocks", "reits", "bonds"]);
  const toggleInstrumentSelect = (key: string) => {
    if (selectedInstruments.includes(key)) {
      if (selectedInstruments.length > 1) {
        setSelectedInstruments(selectedInstruments.filter((k) => k !== key));
      }
    } else {
      if (selectedInstruments.length < 3) {
        setSelectedInstruments([...selectedInstruments, key]);
      } else {
        // Replace first
        setSelectedInstruments([...selectedInstruments.slice(1), key]);
      }
    }
  };

  // Section 4: History & Trust Chart state
  const [activeCategory, setActiveCategory] = useState<"reits" | "invits" | "bonds">("reits");
  const [selectedInstrumentId, setSelectedInstrumentId] = useState<string>("nxst");
  const [historyRange, setHistoryRange] = useState<"1Y" | "3Y">("3Y");
  const [expandedRisk, setExpandedRisk] = useState<boolean>(false);

  const currentInstrument = useMemo(() => {
    const list = INSTRUMENTS_DATA[activeCategory];
    const match = list.find((i) => i.id === selectedInstrumentId);
    return match || list[0];
  }, [activeCategory, selectedInstrumentId]);

  const displayedHistory = useMemo(() => {
    if (!currentInstrument) return [];
    if (historyRange === "1Y") {
      return currentInstrument.history.slice(-4);
    }
    return currentInstrument.history;
  }, [currentInstrument, historyRange]);

  // Section 5: Simulator State
  const [simReit, setSimReit] = useState<number>(15);
  const [simInvit, setSimInvit] = useState<number>(10);
  const [simBond, setSimBond] = useState<number>(15);
  const simEquity = Math.max(0, 100 - (simReit + simInvit + simBond));

  // Calculated simulator scores
  const simRiskScore = useMemo(() => {
    // Pure equities risk = 9.2/10. Bonds = 2.5, REITs = 5.5, InvITs = 6.0
    const raw = (simEquity * 9.2 + simReit * 5.5 + simInvit * 6.0 + simBond * 2.5) / 100;
    return parseFloat(raw.toFixed(1));
  }, [simEquity, simReit, simInvit, simBond]);

  const simYield = useMemo(() => {
    // Equities dividend yield ~1.2%, REITs ~7.8%, InvITs ~10.1%, Bonds ~7.4%
    const raw = (simEquity * 1.2 + simReit * 7.8 + simInvit * 10.1 + simBond * 7.4) / 100;
    return parseFloat(raw.toFixed(2));
  }, [simEquity, simReit, simInvit, simBond]);

  const simDiversificationScore = useMemo(() => {
    // Pure stocks = 25/100. Diverse mix = up to 92/100
    const score = 25 + simReit * 1.5 + simInvit * 1.4 + simBond * 1.8;
    return Math.min(95, Math.round(score));
  }, [simReit, simInvit, simBond]);

  // Section 6: Quiz State
  const [quizStep, setQuizStep] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, { option: string; score: number }>>({});
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [riskProfile, setRiskProfile] = useState<string>("Moderate");

  const handleSelectQuizOption = (questionId: number, option: string, score: number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: { option, score }
    }));
  };

  const handleNextQuiz = async () => {
    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep((prev) => prev + 1);
    } else {
      // Calculate Result
      let total = 0;
      Object.values(quizAnswers).forEach((a) => {
        total += a.score;
      });
      let calculatedProfile = "Moderate";
      if (total <= 14) calculatedProfile = "Conservative";
      else if (total <= 22) calculatedProfile = "Moderate";
      else if (total <= 28) calculatedProfile = "Balanced";
      else if (total <= 34) calculatedProfile = "Growth";
      else calculatedProfile = "Aggressive";

      setRiskProfile(calculatedProfile);
      setQuizCompleted(true);

      // Submit to backend with graceful fallback
      try {
        await fetch("http://127.0.0.1:8000/api/quiz/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: "guest",
            calculatedScore: total,
            riskCategory: calculatedProfile,
            answers: Object.entries(quizAnswers).map(([qid, val]) => ({
              questionId: parseInt(qid),
              question: QUIZ_QUESTIONS.find((q) => q.id === parseInt(qid))?.title || "",
              selectedOption: val.option,
              scoreWeight: val.score
            }))
          })
        });
      } catch (e) {
        // Fallback local persistence
        localStorage.setItem("beyond_stocks_risk_profile", calculatedProfile);
      }
    }
  };

  const handleResetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({});
    setQuizCompleted(false);
  };

  // Section 7: Suggestions based on profile
  const [showSuggestedComparison, setShowSuggestedComparison] = useState<boolean>(true);
  const recommendationsMap = {
    Conservative: { equity: 30, reits: 15, invits: 15, bonds: 40 },
    Moderate: { equity: 50, reits: 15, invits: 15, bonds: 20 },
    Balanced: { equity: 60, reits: 15, invits: 10, bonds: 15 },
    Growth: { equity: 75, reits: 10, invits: 10, bonds: 5 },
    Aggressive: { equity: 85, reits: 5, invits: 5, bonds: 5 }
  };
  const targetAlloc = recommendationsMap[riskProfile as keyof typeof recommendationsMap] || recommendationsMap.Moderate;

  const handleApplySuggestedMix = () => {
    setSimReit(targetAlloc.reits);
    setSimInvit(targetAlloc.invits);
    setSimBond(targetAlloc.bonds);
  };

  // Section 8: Start Small Slider
  const [smallAmount, setSmallAmount] = useState<number>(10000);
  const smallUnits = useMemo(() => {
    const nexusUnits = Math.floor((smallAmount * 0.4) / 138.5);
    const pgUnits = Math.floor((smallAmount * 0.3) / 94.2);
    const bondUnits = Math.floor((smallAmount * 0.3) / 100);
    const annualIncome = Math.round(nexusUnits * 10.8 + pgUnits * 12.0 + (bondUnits * 100 * 0.0718));
    return {
      nexusUnits,
      pgUnits,
      bondUnits,
      annualIncome
    };
  }, [smallAmount]);

  // Section 9: Ask a Question Q&A Matcher
  const [chatInput, setChatInput] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    {
      sender: "bot",
      text: "Hello! I am your physical asset & fixed income intelligence copilot. Click any question chip below or ask anything about REITs, InvITs, and sovereign bonds."
    }
  ]);

  const QA_DATABASE: Record<string, string> = {
    "reit": "REITs (Real Estate Investment Trusts) own commercial income-producing properties like grade-A IT parks and retail malls. By SEBI law, they must distribute at least 90% of their net distributable cash flows to unitholders every quarter. Nexus, Embassy, and Brookfield are listed on NSE/BSE.",
    "safe": "No market instrument is 100% risk-free. While REITs and InvITs hold physical real estate and infrastructure, their unit prices fluctuate based on interest rates, inflation, and tenant occupancy. Sovereign Govt Bonds (G-Secs) have zero credit default risk but still carry interest rate price risk if sold before maturity.",
    "bonds": "Bonds pay you via regular 'coupons' (interest payments) distributed semi-annually or annually, and return your full original principal when the bond reaches maturity. Sovereign G-Secs are backed directly by the Reserve Bank of India.",
    "diversify": "If you hold 90%+ in stocks, a market correction of 25% directly wipes out a quarter of your wealth. Adding REITs, InvITs, and bonds provides quarterly cash dividends (7%–10% yield) that cushion drawdowns and compound through market downturns.",
    "tax": "Under the Finance Act, REIT & InvIT distributions consist of Dividends, Interest, and Capital Repayment. Dividends from SPVs that opted for the concessional tax regime may be taxable at slab rates, while repayment of capital is taxed based on your purchase cost. Long-term capital gains (>36 months) are taxed at 12.5% for listed units.",
    "invit": "InvITs (Infrastructure Investment Trusts) own long-term cash-generating public infrastructure like power transmission grids (PowerGrid) and toll highways. They typically offer high yields (9%–11%) with multi-decade sovereign concession agreements."
  };

  const handleSendChat = (queryText?: string) => {
    const q = (queryText || chatInput).trim();
    if (!q) return;

    const newHistory = [...chatHistory, { sender: "user" as const, text: q }];
    setChatInput("");

    // Simple matcher
    const lower = q.toLowerCase();
    let reply = "REITs, InvITs, and Sovereign Bonds provide essential diversification away from 100% stock risk. Under SEBI regulations, trusts distribute >=90% of cash flows quarterly. Consult SEBI's investor guide for statutory notices.";

    if (lower.includes("reit safe") || lower.includes("are reits safe") || lower.includes("safe")) {
      reply = QA_DATABASE["safe"];
    } else if (lower.includes("how do bonds pay") || lower.includes("bond")) {
      reply = QA_DATABASE["bonds"];
    } else if (lower.includes("why diversify") || lower.includes("diversif")) {
      reply = QA_DATABASE["diversify"];
    } else if (lower.includes("tax") || lower.includes("taxed")) {
      reply = QA_DATABASE["tax"];
    } else if (lower.includes("invit") || lower.includes("difference")) {
      reply = QA_DATABASE["invit"];
    } else if (lower.includes("reit")) {
      reply = QA_DATABASE["reit"];
    }

    setTimeout(() => {
      setChatHistory([...newHistory, { sender: "bot" as const, text: reply }]);
    }, 300);
  };

  // PDF / Report Generator
  const handleDownloadReport = () => {
    const reportWindow = window.open("", "_blank");
    if (!reportWindow) return;

    const reportHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>DHANI - Multi-Asset Diversification Report</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #18181b; background: #ffffff; }
            h1 { font-size: 24px; margin-bottom: 4px; color: #09090b; }
            h2 { font-size: 16px; margin-top: 24px; border-bottom: 2px solid #e4e4e7; padding-bottom: 8px; color: #27272a; }
            .badge { display: inline-block; padding: 4px 10px; background: #e0e7ff; color: #3730a3; border-radius: 9999px; font-size: 12px; font-weight: 600; margin-bottom: 16px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 16px; }
            .card { border: 1px solid #e4e4e7; border-radius: 12px; padding: 16px; background: #fafafa; }
            .stat { font-size: 28px; font-weight: 700; color: #4f46e5; }
            table { width: 100%; border-collapse: collapse; margin-top: 12px; }
            th, td { text-align: left; padding: 10px; border-bottom: 1px solid #e4e4e7; font-size: 13px; }
            th { background: #f4f4f5; font-weight: 600; }
            .disclaimer { margin-top: 40px; font-size: 11px; color: #71717a; border-top: 1px solid #e4e4e7; padding-top: 12px; }
          </style>
        </head>
        <body>
          <div class="badge">DHANI INTELLIGENCE • ASSET ALLOCATION REPORT</div>
          <h1>Investor Diversification Strategy</h1>
          <p>Generated for Investor Profile • Evaluated Risk Tolerance: <strong>${riskProfile}</strong></p>
          
          <div class="grid">
            <div class="card">
              <p style="font-size: 12px; color: #71717a; margin: 0;">CURRENT STOCK EXPOSURE</p>
              <div class="stat">${portfolioSummary.equityPct}%</div>
              <p style="font-size: 12px; color: #52525b; margin-top: 4px;">Concentrated in Equities / Mutual Funds</p>
            </div>
            <div class="card">
              <p style="font-size: 12px; color: #71717a; margin: 0;">RECOMMENDED DIVERSIFICATION</p>
              <div class="stat">${100 - targetAlloc.equity}% Beyond Stocks</div>
              <p style="font-size: 12px; color: #52525b; margin-top: 4px;">REITs: ${targetAlloc.reits}% | InvITs: ${targetAlloc.invits}% | Debt: ${targetAlloc.bonds}%</p>
            </div>
          </div>

          <h2>Target Rebalancing Matrix</h2>
          <table>
            <thead>
              <tr>
                <th>Asset Class</th>
                <th>Current Alloc</th>
                <th>Target Alloc</th>
                <th>Action Required</th>
                <th>Sample SEBI-Regulated Instruments</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Equities & Stocks</strong></td>
                <td>${portfolioSummary.equityPct}%</td>
                <td>${targetAlloc.equity}%</td>
                <td>Trim to lock in compounding</td>
                <td>Nifty 50, Bluechip Indices</td>
              </tr>
              <tr>
                <td><strong>Commercial REITs</strong></td>
                <td>${portfolioSummary.distribution.find(d => d.name === "REITs")?.value || 0}%</td>
                <td>${targetAlloc.reits}%</td>
                <td>Allocate ₹${Math.round((portfolioSummary.totalVal * targetAlloc.reits) / 100).toLocaleString('en-IN')}</td>
                <td>Nexus Select Trust, Embassy REIT, Brookfield</td>
              </tr>
              <tr>
                <td><strong>Infrastructure InvITs</strong></td>
                <td>${portfolioSummary.distribution.find(d => d.name === "InvITs")?.value || 0}%</td>
                <td>${targetAlloc.invits}%</td>
                <td>Allocate ₹${Math.round((portfolioSummary.totalVal * targetAlloc.invits) / 100).toLocaleString('en-IN')}</td>
                <td>PowerGrid InvIT, India Grid Trust</td>
              </tr>
              <tr>
                <td><strong>Sovereign & AAA Bonds</strong></td>
                <td>${portfolioSummary.distribution.find(d => d.name === "Bonds / Debt")?.value || 0}%</td>
                <td>${targetAlloc.bonds}%</td>
                <td>Allocate ₹${Math.round((portfolioSummary.totalVal * targetAlloc.bonds) / 100).toLocaleString('en-IN')}</td>
                <td>7.18% GS 2033 (RBI Retail), REC 7.54% AAA</td>
              </tr>
            </tbody>
          </table>

          <h2>Strategic Rationale for ${riskProfile} Profile</h2>
          <p style="font-size: 13px; line-height: 1.6; color: #3f3f46;">
            Your portfolio currently holds <strong>${portfolioSummary.equityPct}% in stocks</strong>. Moving ${100 - targetAlloc.equity}% into commercial real estate, power infrastructure, and sovereign debt replaces market volatility with steady, predictable 7.5% - 10.4% cash distributions.
          </p>

          <div class="disclaimer">
            <strong>COMPLIANCE DISCLAIMER:</strong> Educational information only. Not SEBI registered investment advice. Instruments mentioned are illustrative samples and not recommendations to buy or sell. Investments are subject to market risks. Read all scheme related documents carefully before investing. SEBI Investor Education: https://investor.sebi.gov.in/
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;
    reportWindow.document.write(reportHtml);
    reportWindow.document.close();
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header Badge */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-medium text-blue-400 mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Beyond Stocks • Multi-Asset Resilience</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100">
            Real Estate, Infrastructure & Fixed Income
          </h1>
          <p className="text-xs md:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Break free from pure equity vulnerability. Discover SEBI-regulated commercial REITs, sovereign infrastructure InvITs, and high-yield bonds that pay predictable cash flows directly to your account.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleDownloadReport}
            className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 rounded-xl text-xs font-semibold text-zinc-200 shadow-sm transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Download Report (PDF)</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: YOUR STOCK CONCENTRATION (HERO)
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-zinc-900 border border-zinc-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Concentration Warning</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-100 flex items-baseline gap-2">
                <span className="text-blue-400">{portfolioSummary.equityPct}%</span>
                <span>of your money is in stocks.</span>
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
                High stock concentration magnifies portfolio volatility. When broader equity markets correct 20%, having 90%+ in stocks means painful drawdowns. Expanding into cash-generating real estate and infrastructure cushions your wealth without losing compounding power.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  document.getElementById("section-comparison")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
              >
                <span>See Alternatives</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  document.getElementById("section-quiz")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2 px-5 py-3 bg-zinc-950 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 text-xs font-semibold rounded-xl transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Take 2-Min Risk Quiz</span>
              </button>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl">
            <p className="text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">
              Current Asset Breakdown
            </p>
            <div className="w-56 h-56 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0];
                        return (
                          <div className="bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-lg text-xs shadow-xl">
                            <span className="font-semibold text-zinc-200">{data.name}: </span>
                            <span className="font-bold text-blue-400">{data.value}%</span>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Pie
                    data={portfolioSummary.distribution}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={65}
                    outerRadius={88}
                    paddingAngle={3}
                  >
                    {portfolioSummary.distribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-zinc-100">{portfolioSummary.equityPct}%</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Equities</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2.5 mt-4 max-w-xs text-[11px]">
              {portfolioSummary.distribution.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5 text-zinc-400">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}:</span>
                  <span className="font-semibold text-zinc-200">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: WHY PEOPLE STAY AWAY (MYTH VS FACT FLIP CARDS)
      ───────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Myth vs Truth</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-zinc-100 mt-1">
            Why People Stay Away from Alternatives
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Tap any card to flip between common investor fears and the transparent reality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              id: 0,
              fear: "“I don’t understand how they work.”",
              tag: "Complexity Fear",
              fact: "REITs and InvITs are SEBI-regulated trusts that own income-generating real estate (tech parks, malls) or infrastructure (toll roads, power grids). By law, they distribute >=90% of all cash flows directly to investors quarterly.",
              hasLink: true,
              linkText: "Deep dive in Learning Center →",
              linkTo: "/learning"
            },
            {
              id: 1,
              fear: "“They seem way too complicated.”",
              tag: "Jargon Overload",
              fact: "Think of them in one simple sentence:\n• REIT = Commercial landlord paying you rent.\n• InvIT = Highway/power utility sharing toll dividends.\n• Bond = Fixed loan to govt/company paying guaranteed interest coupons.",
              hasLink: false
            },
            {
              id: 2,
              fear: "“I need lakhs of rupees to invest.”",
              tag: "Capital Barrier Myth",
              fact: "SEBI reduced the minimum lot size to just 1 unit! You can buy 1 unit of Nexus Select Trust for ~₹139 or Embassy REIT for ~₹378 straight from your Zerodha, Groww, or Upstox account just like an ordinary share.",
              hasLink: false
            },
            {
              id: 3,
              fear: "“They’re boring compared to stocks.”",
              tag: "Return Expectations",
              fact: "They aren’t meant to be 10x lottery tickets. They offer predictable 7% to 10% cash yields plus capital appreciation, acting as a crucial defensive anchor while your equity portfolio rides wild market swings.",
              hasLink: false
            },
            {
              id: 4,
              fear: "“Could I lose my principal money?”",
              tag: "Risk Transparency",
              fact: "Honest truth: Yes. Unit prices can fall if interest rates spike, tenant vacancies increase, or toll traffic drops. They are NOT zero-risk fixed deposits, but Grade-A assets provide strong underlying value protection.",
              hasLink: false
            },
            {
              id: 5,
              fear: "“I don’t trust bonds after past defaults.”",
              tag: "Credit Default Fear",
              fact: "SEBI accredited agencies (CRISIL, ICRA, CARE) rate bonds from AAA (highest safety) to D (default). Sovereign G-Secs carry zero default risk, while AAA corporate bonds have historical default rates below 0.1%.",
              hasLink: false
            }
          ].map((card) => {
            const isFlipped = !!flippedCards[card.id];
            return (
              <div
                key={card.id}
                onClick={() => toggleFlip(card.id)}
                className="h-64 cursor-pointer perspective-1000 group"
              >
                <div
                  className={`w-full h-full relative duration-500 rounded-2xl transition-transform transform-style-3d ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
                  }}
                >
                  {/* Front of Card */}
                  <div className="absolute inset-0 backface-hidden bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors">
                    <div>
                      <div className="flex justify-between items-center text-[10px] uppercase font-semibold tracking-wider text-zinc-500">
                        <span>{card.tag}</span>
                        <span className="text-zinc-600 group-hover:text-zinc-400">Tap to flip ↻</span>
                      </div>
                      <h3 className="text-lg font-bold text-zinc-100 mt-4 leading-snug">
                        {card.fear}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-blue-400">
                      <span>Click to read the transparent reality</span>
                      <RotateCw className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div
                    className="absolute inset-0 backface-hidden bg-zinc-950 border border-blue-500/40 rounded-2xl p-6 flex flex-col justify-between"
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden"
                    }}
                  >
                    <div>
                      <div className="flex justify-between items-center text-[10px] uppercase font-semibold tracking-wider text-blue-400">
                        <span>The Reality</span>
                        <span className="text-zinc-500">Tap to return ↻</span>
                      </div>
                      <p className="text-xs text-zinc-300 mt-3 leading-relaxed whitespace-pre-line">
                        {card.fact}
                      </p>
                    </div>

                    {card.hasLink && (
                      <Link
                        to={card.linkTo!}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{card.linkText}</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: STOCKS vs REITs vs InvITs vs BONDS (COMPARISON)
      ───────────────────────────────────────────────────────────── */}
      <section id="section-comparison" className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Asset Class Showdown</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-zinc-100 mt-1">
              Stocks vs REITs vs InvITs vs Bonds
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Select 2 or 3 instruments to compare risk profiles, cash flows, and liquidity side-by-side.
            </p>
          </div>

          {/* Segmented Selector */}
          <div className="flex bg-zinc-900 border border-zinc-800 p-1 rounded-xl gap-1">
            {[
              { id: "stocks", label: "Stocks" },
              { id: "reits", label: "REITs" },
              { id: "invits", label: "InvITs" },
              { id: "bonds", label: "Bonds" }
            ].map((btn) => {
              const active = selectedInstruments.includes(btn.id);
              return (
                <button
                  key={btn.id}
                  onClick={() => toggleInstrumentSelect(btn.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    active
                      ? "bg-blue-600 text-white font-semibold shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comparison Table / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {selectedInstruments.map((key) => {
            const info = {
              stocks: {
                title: "Equities / Stocks",
                icon: TrendingUp,
                color: "text-blue-400",
                badgeBg: "bg-red-500/10 text-red-400 border-red-500/20",
                riskLabel: "Very High Risk",
                whatItIs: "Ownership shares in corporations listed on national exchanges.",
                howYouEarn: "Capital price appreciation & variable annual company dividends.",
                incomeFreq: "Irregular (Annual / Semi-Annual, not guaranteed)",
                volatility: "High (20% to 40% historical swings)",
                liquidity: "T+1 rolling settlement on NSE / BSE",
                minInvestment: "₹50 to ₹3,000 per share",
                mainRisks: "Broad economic downcycles, sector obsolescence, negative quarterly earnings surprises."
              },
              reits: {
                title: "Commercial REITs",
                icon: Building2,
                color: "text-emerald-400",
                badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
                riskLabel: "Moderate Risk",
                whatItIs: "SEBI trusts owning premium Grade-A IT business parks and retail malls.",
                howYouEarn: "Contractual office/retail lease rents distributed to unitholders.",
                incomeFreq: "Strictly Quarterly (Mandated >=90% payout)",
                volatility: "Medium (Supported by physical land & building valuations)",
                liquidity: "Exchange traded (1 unit lot size on NSE/BSE)",
                minInvestment: "~₹140 to ₹380 for 1 single unit",
                mainRisks: "Commercial tenant vacancies, IT work-from-home shifts, interest rate hiking cycles."
              },
              invits: {
                title: "Infrastructure InvITs",
                icon: Radio,
                color: "text-cyan-400",
                badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
                riskLabel: "Moderate Risk",
                whatItIs: "Trusts owning national power transmission grids and operational toll expressways.",
                howYouEarn: "Power transmission tariffs and vehicular toll cash flows.",
                incomeFreq: "Strictly Quarterly distributions",
                volatility: "Low to Medium (Essential public utility monopolies)",
                liquidity: "Exchange traded on NSE/BSE",
                minInvestment: "~₹95 to ₹135 for 1 single unit",
                mainRisks: "Toll traffic volume slowdowns, state DISCOM counterparty payment lags."
              },
              bonds: {
                title: "Bonds & G-Secs",
                icon: Landmark,
                color: "text-amber-400",
                badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                riskLabel: "Low to Moderate",
                whatItIs: "Debt contracts issued by Govt of India (G-Secs) or AAA public corporations.",
                howYouEarn: "Fixed pre-determined coupon interest plus full principal repayment at maturity.",
                incomeFreq: "Semi-Annual or Annual guaranteed schedule",
                volatility: "Low (Price converges to par ₹100 upon maturity)",
                liquidity: "Moderate on NSE/BSE; high liquidity on RBI Retail Direct",
                minInvestment: "₹1,000 on RBI Retail Direct; ₹10,000 for corporate bonds",
                mainRisks: "Interest rate cycle fluctuations before maturity; corporate credit downgrade risk."
              }
            }[key as "stocks" | "reits" | "invits" | "bonds"];

            const IconComponent = info.icon;

            return (
              <div
                key={key}
                className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                        <IconComponent className={`w-4 h-4 ${info.color}`} />
                      </div>
                      <h3 className="font-bold text-zinc-100 text-sm">{info.title}</h3>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${info.badgeBg}`}>
                      {info.riskLabel}
                    </span>
                  </div>

                  <div className="mt-4 space-y-3 text-xs">
                    <div>
                      <span className="text-[10px] font-semibold uppercase text-zinc-500 block">What It Is</span>
                      <p className="text-zinc-300 mt-0.5 leading-relaxed">{info.whatItIs}</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-semibold uppercase text-zinc-500 block">How You Earn</span>
                      <p className="text-zinc-300 mt-0.5">{info.howYouEarn}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="bg-zinc-950/60 p-2 rounded-lg border border-zinc-800/60">
                        <span className="text-[10px] text-zinc-500 block">Payout Frequency</span>
                        <span className="font-medium text-zinc-200 mt-0.5 block">{info.incomeFreq}</span>
                      </div>
                      <div className="bg-zinc-950/60 p-2 rounded-lg border border-zinc-800/60">
                        <span className="text-[10px] text-zinc-500 block">Typical Min Entry</span>
                        <span className="font-medium text-zinc-200 mt-0.5 block">{info.minInvestment}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-semibold uppercase text-zinc-500 block">Primary Risk Factor</span>
                      <p className="text-zinc-400 mt-0.5 leading-relaxed">{info.mainRisks}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: BUILD TRUST (RISK & REAL HISTORY)
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-zinc-900 border border-zinc-800/80 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              <span>Transparent Historical Performance</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-zinc-100 mt-1">
              Real Track Records & Payout Distributions
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Explore actual quarterly dividend distributions and price history over 3 years.
            </p>
          </div>

          {/* Time range selector */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-zinc-500 font-medium">Timeline:</span>
            <div className="flex bg-zinc-950 border border-zinc-800 p-0.5 rounded-lg text-xs">
              <button
                onClick={() => setHistoryRange("1Y")}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  historyRange === "1Y" ? "bg-zinc-800 text-zinc-100 font-semibold" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                1Y
              </button>
              <button
                onClick={() => setHistoryRange("3Y")}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  historyRange === "3Y" ? "bg-zinc-800 text-zinc-100 font-semibold" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                3Y
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs & Instrument Selector */}
        <div className="space-y-3">
          <div className="flex border-b border-zinc-800 gap-6 text-xs font-semibold">
            {[
              { id: "reits", label: "Commercial REITs (3)" },
              { id: "invits", label: "Infrastructure InvITs (2)" },
              { id: "bonds", label: "Sovereign & AAA Bonds (3)" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategory(tab.id as any);
                  const first = INSTRUMENTS_DATA[tab.id as keyof typeof INSTRUMENTS_DATA][0];
                  setSelectedInstrumentId(first.id);
                }}
                className={`pb-3 transition-colors cursor-pointer relative ${
                  activeCategory === tab.id ? "text-blue-400" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {tab.label}
                {activeCategory === tab.id && (
                  <motion.div
                    layoutId="categoryLine"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Instrument Sub-Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            {INSTRUMENTS_DATA[activeCategory].map((inst) => (
              <button
                key={inst.id}
                onClick={() => setSelectedInstrumentId(inst.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedInstrumentId === inst.id
                    ? "bg-zinc-800 text-zinc-100 border border-zinc-700 shadow-sm"
                    : "bg-zinc-950/60 text-zinc-400 border border-zinc-850 hover:text-zinc-200"
                }`}
              >
                {inst.name} ({inst.yield} Yield)
              </button>
            ))}
          </div>
        </div>

        {/* Main Chart Visualization */}
        <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-5 space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-2 border-b border-zinc-850 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-zinc-100">{currentInstrument.name}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">
                  {currentInstrument.ticker}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                  {currentInstrument.rating}
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">{currentInstrument.type}</p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div>
                <span className="text-zinc-500 text-[10px] block">Current Market Price</span>
                <span className="text-base font-bold text-zinc-100">₹{currentInstrument.currentPrice}</span>
              </div>
              <div>
                <span className="text-zinc-500 text-[10px] block">Annual Yield</span>
                <span className="text-base font-bold text-emerald-400">{currentInstrument.yield}</span>
              </div>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={displayedHistory}>
                <defs>
                  <linearGradient id="instrumentGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="period" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#52525b"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `₹${v}`}
                  domain={["auto", "auto"]}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-zinc-900 border border-zinc-700 p-2.5 rounded-xl shadow-xl text-xs space-y-1">
                          <p className="font-bold text-zinc-200">{data.period}</p>
                          <p className="text-blue-400">Unit Price: ₹{data.price}</p>
                          <p className="text-emerald-400">Quarterly Cash Payout: ₹{data.payout}/unit</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#instrumentGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap justify-between items-center gap-2 pt-2 text-[11px] text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-300 font-mono text-[10px]">
                SAMPLE DATA
              </span>
              <span>Past performance does not guarantee future results. Payout projections are illustrative.</span>
            </div>
            <span>Lot Size: {currentInstrument.minInvestment}</span>
          </div>
        </div>

        {/* "What can go wrong?" Expander */}
        <div className="border border-zinc-800 rounded-2xl bg-zinc-950/50 overflow-hidden">
          <button
            onClick={() => setExpandedRisk(!expandedRisk)}
            className="w-full px-5 py-4 flex justify-between items-center text-xs font-semibold text-zinc-300 hover:text-zinc-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2 text-amber-400">
              <AlertTriangle className="w-4 h-4" />
              <span>What can go wrong with {currentInstrument.name}? (Risk Analysis)</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-zinc-400 transition-transform ${expandedRisk ? "rotate-180" : ""}`}
            />
          </button>

          {expandedRisk && (
            <div className="px-5 pb-5 text-xs text-zinc-400 border-t border-zinc-800/60 pt-3 leading-relaxed">
              <p>{currentInstrument.whatCanGoWrong}</p>
              <div className="mt-3 p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300">
                <span className="font-semibold text-zinc-200">Mitigation: </span>
                SEBI mandates that REITs & InvITs maintain debt-to-asset ratios strictly below 49% and conduct semi-annual asset appraisals by independent registered valuers.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: WHAT IF I ADDED THEM? (SIMULATOR)
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-zinc-900 border border-zinc-800/80 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              <Sliders className="w-4 h-4" />
              <span>Interactive Portfolio Simulator</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-zinc-100 mt-1">
              What If I Added Alternatives?
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Shift allocations from stocks to REITs, InvITs, and bonds to see live impacts on income yield and risk.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSimReit(0);
                setSimInvit(0);
                setSimBond(0);
              }}
              className="px-3.5 py-1.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
            >
              Reset to 100% Stocks
            </button>
            <button
              onClick={handleApplySuggestedMix}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-semibold text-white shadow-sm transition-colors cursor-pointer"
            >
              Use Suggested Mix
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sliders Column */}
          <div className="lg:col-span-6 space-y-5">
            {/* Stocks remaining */}
            <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-800/60 flex justify-between items-center">
              <div>
                <span className="text-xs font-semibold text-zinc-200 block">Remaining in Equities (Stocks)</span>
                <span className="text-[11px] text-zinc-500">Automatically adjusted to balance 100%</span>
              </div>
              <span className="text-xl font-bold text-blue-400">{simEquity}%</span>
            </div>

            {/* REITs Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-zinc-300">Commercial REITs (Real Estate)</span>
                <span className="font-bold text-emerald-400">{simReit}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={simReit}
                onChange={(e) => setSimReit(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-zinc-500">
                <span>0%</span>
                <span>Max 30%</span>
              </div>
            </div>

            {/* InvITs Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-zinc-300">Infrastructure InvITs (Tolls & Grids)</span>
                <span className="font-bold text-cyan-400">{simInvit}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={simInvit}
                onChange={(e) => setSimInvit(parseInt(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-zinc-500">
                <span>0%</span>
                <span>Max 30%</span>
              </div>
            </div>

            {/* Bonds Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-zinc-300">Sovereign & AAA Corporate Bonds</span>
                <span className="font-bold text-amber-400">{simBond}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={simBond}
                onChange={(e) => setSimBond(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-zinc-500">
                <span>0%</span>
                <span>Max 40%</span>
              </div>
            </div>
          </div>

          {/* Dynamic Metrics & Before-After Impact */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4 bg-zinc-950 border border-zinc-800/80 p-6 rounded-2xl">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Simulated Portfolio Recalculation
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-center">
                <span className="text-[10px] uppercase font-semibold text-zinc-500 block">Risk Score</span>
                <span className="text-xl font-bold text-zinc-100 mt-1 block">{simRiskScore} / 10</span>
                <span className="text-[10px] text-emerald-400 mt-0.5 block">
                  {simRiskScore <= 6 ? "Well Balanced" : "High Volatility"}
                </span>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-center">
                <span className="text-[10px] uppercase font-semibold text-zinc-500 block">Expected Yield</span>
                <span className="text-xl font-bold text-emerald-400 mt-1 block">{simYield}% p.a.</span>
                <span className="text-[10px] text-zinc-400 mt-0.5 block">Illustrative cash flow</span>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-center">
                <span className="text-[10px] uppercase font-semibold text-zinc-500 block">Diversification</span>
                <span className="text-xl font-bold text-blue-400 mt-1 block">{simDiversificationScore} / 100</span>
                <span className="text-[10px] text-emerald-400 mt-0.5 block">
                  {simDiversificationScore >= 75 ? "Excellent resilience" : "Needs broader mix"}
                </span>
              </div>
            </div>

            <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800/60 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-300 font-medium">Drawdown Protection Buffer</span>
                <span className="text-emerald-400 font-bold">
                  +{Math.round((100 - simEquity) * 0.65)}% Volatility Cushion
                </span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (100 - simEquity) * 1.5)}%` }}
                />
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed pt-1">
                With {simReit + simInvit + simBond}% allocated beyond stocks, a 20% equity correction reduces total portfolio impact by approximately ₹{Math.round(((portfolioSummary.totalVal * (100 - simEquity)) / 100) * 0.2).toLocaleString('en-IN')}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: YOUR RISK PROFILE (8-QUESTION QUIZ)
      ───────────────────────────────────────────────────────────── */}
      <section id="section-quiz" className="bg-zinc-900 border border-zinc-800/80 rounded-3xl p-6 md:p-8 space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Risk Suitability</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-zinc-100 mt-1">
            Determine Your Personal Risk Profile
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Answer 8 quick questions to unlock data-driven allocation recommendations.
          </p>
        </div>

        {!quizCompleted ? (
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs text-zinc-400">
                <span>Question {quizStep + 1} of {QUIZ_QUESTIONS.length}</span>
                <span className="font-semibold text-zinc-200">
                  {Math.round(((quizStep + 1) / QUIZ_QUESTIONS.length) * 100)}% Completed
                </span>
              </div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((quizStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Current Question */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-zinc-100">
                  {QUIZ_QUESTIONS[quizStep].title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  {QUIZ_QUESTIONS[quizStep].subtitle}
                </p>
              </div>

              {/* iOS Option Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {QUIZ_QUESTIONS[quizStep].options.map((opt) => {
                  const currentSelected = quizAnswers[QUIZ_QUESTIONS[quizStep].id]?.option === opt.label;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => handleSelectQuizOption(QUIZ_QUESTIONS[quizStep].id, opt.label, opt.score)}
                      className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex justify-between items-center ${
                        currentSelected
                          ? "bg-blue-600/10 border-blue-500 text-zinc-100 shadow-md shadow-blue-500/5"
                          : "bg-zinc-950/70 border-zinc-800/80 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-950"
                      }`}
                    >
                      <div>
                        <span className="font-semibold text-sm block">{opt.label}</span>
                        <span className="text-xs text-zinc-400 mt-0.5 block">{opt.desc}</span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                          currentSelected ? "border-blue-500 bg-blue-500 text-white" : "border-zinc-700"
                        }`}
                      >
                        {currentSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nav buttons */}
            <div className="flex justify-between items-center pt-2">
              <button
                disabled={quizStep === 0}
                onClick={() => setQuizStep((prev) => Math.max(0, prev - 1))}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  quizStep === 0 ? "opacity-30 cursor-not-allowed text-zinc-500" : "bg-zinc-950 text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                Previous
              </button>

              <button
                disabled={!quizAnswers[QUIZ_QUESTIONS[quizStep].id]}
                onClick={handleNextQuiz}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  quizAnswers[QUIZ_QUESTIONS[quizStep].id]
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20"
                    : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                }`}
              >
                <span>{quizStep === QUIZ_QUESTIONS.length - 1 ? "Calculate My Profile" : "Continue"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Quiz Results Card */
          <div className="bg-zinc-950 border border-zinc-800 p-6 md:p-8 rounded-2xl space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-850 pb-6">
              <div>
                <span className="text-[10px] uppercase font-semibold text-zinc-500 block">Assessment Complete</span>
                <div className="flex items-center gap-3 mt-1">
                  <h3 className="text-2xl font-bold text-zinc-100">Profile: {riskProfile}</h3>
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400">
                    Target Mix Unlocked
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                  Based on your responses, your profile seeks sustainable compounding with lower vulnerability to steep equity pullbacks.
                </p>
              </div>

              <button
                onClick={handleResetQuiz}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 rounded-lg text-xs font-medium text-zinc-300 transition-colors cursor-pointer"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>

            {/* Target Breakdown pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl">
                <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Target Stocks</span>
                <span className="text-xl font-bold text-blue-400 mt-1 block">{targetAlloc.equity}%</span>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl">
                <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Target REITs</span>
                <span className="text-xl font-bold text-emerald-400 mt-1 block">{targetAlloc.reits}%</span>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl">
                <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Target InvITs</span>
                <span className="text-xl font-bold text-cyan-400 mt-1 block">{targetAlloc.invits}%</span>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl">
                <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Target Bonds</span>
                <span className="text-xl font-bold text-amber-400 mt-1 block">{targetAlloc.bonds}%</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 7: PERSONALISED SUGGESTIONS
      ───────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Tailored Intelligence</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-zinc-100 mt-1">
              Personalised Allocation Plan
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Derived from your current {portfolioSummary.equityPct}% stock concentration and {riskProfile} risk profile.
            </p>
          </div>

          <button
            onClick={() => setShowSuggestedComparison(!showSuggestedComparison)}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 rounded-xl text-xs font-semibold text-zinc-200 transition-colors cursor-pointer"
          >
            {showSuggestedComparison ? "Hide Current vs Suggested" : "Show Current vs Suggested"}
          </button>
        </div>

        {/* Current vs Suggested Comparison Bar */}
        {showSuggestedComparison && (
          <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Allocation Shift Comparison
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium text-zinc-300 mb-1.5">
                  <span>Current Portfolio</span>
                  <span className="text-zinc-400">{portfolioSummary.equityPct}% Stocks • {100 - portfolioSummary.equityPct}% Other</span>
                </div>
                <div className="h-3 w-full bg-zinc-950 rounded-full flex overflow-hidden">
                  <div style={{ width: `${portfolioSummary.equityPct}%` }} className="bg-blue-600" />
                  <div style={{ width: `${100 - portfolioSummary.equityPct}%` }} className="bg-zinc-700" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-zinc-300 mb-1.5">
                  <span>Suggested Balanced Portfolio</span>
                  <span className="text-emerald-400 font-semibold">
                    {targetAlloc.equity}% Stocks • {targetAlloc.reits}% REITs • {targetAlloc.invits}% InvITs • {targetAlloc.bonds}% Bonds
                  </span>
                </div>
                <div className="h-3 w-full bg-zinc-950 rounded-full flex overflow-hidden">
                  <div style={{ width: `${targetAlloc.equity}%` }} className="bg-blue-600" />
                  <div style={{ width: `${targetAlloc.reits}%` }} className="bg-emerald-500" />
                  <div style={{ width: `${targetAlloc.invits}%` }} className="bg-cyan-500" />
                  <div style={{ width: `${targetAlloc.bonds}%` }} className="bg-amber-500" />
                </div>
              </div>
            </div>

            {/* Rebalancing helper */}
            <div className="p-4 bg-zinc-950/80 border border-zinc-800 rounded-xl text-xs text-zinc-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div>
                <span className="font-bold text-zinc-200 block">Rebalancing Capital Shift Helper:</span>
                <span className="text-zinc-400 text-[11px]">
                  Based on your current ~₹{portfolioSummary.totalVal.toLocaleString('en-IN')} total assets.
                </span>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px]">
                <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-emerald-400 font-medium">
                  +₹{Math.round((portfolioSummary.totalVal * targetAlloc.reits) / 100).toLocaleString('en-IN')} to REITs
                </span>
                <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-cyan-400 font-medium">
                  +₹{Math.round((portfolioSummary.totalVal * targetAlloc.invits) / 100).toLocaleString('en-IN')} to InvITs
                </span>
                <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-amber-400 font-medium">
                  +₹{Math.round((portfolioSummary.totalVal * targetAlloc.bonds) / 100).toLocaleString('en-IN')} to Bonds
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Suggestion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* REITs Card */}
          <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-emerald-400">Target: {targetAlloc.reits}%</span>
                  <h3 className="text-lg font-bold text-zinc-100 mt-0.5">Commercial REITs</h3>
                </div>
                <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 text-emerald-400">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-4 space-y-2.5 text-xs">
                <p className="text-zinc-400 leading-relaxed">
                  <strong className="text-zinc-200">Why this? </strong>
                  Your portfolio is {portfolioSummary.equityPct}% stocks. Grade-A office and retail REITs generate contracted lease rentals, yielding 7.2%–8.1% with quarterly dividend payouts.
                </p>

                <div className="pt-2 border-t border-zinc-800/60">
                  <span className="text-[10px] font-semibold uppercase text-zinc-500 block mb-1">
                    Illustrative Sample Instruments (Not recommendations)
                  </span>
                  <ul className="space-y-1 font-mono text-[11px] text-zinc-300">
                    <li>• Nexus Select Trust (Yield: 7.8%)</li>
                    <li>• Embassy Office Parks (Yield: 7.2%)</li>
                    <li>• Brookfield India REIT (Yield: 8.1%)</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="text-[10px] text-zinc-500 border-t border-zinc-800/60 pt-2">
              SEBI Regulated • 1 unit lot size on NSE
            </div>
          </div>

          {/* InvITs Card */}
          <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-cyan-400">Target: {targetAlloc.invits}%</span>
                  <h3 className="text-lg font-bold text-zinc-100 mt-0.5">Infrastructure InvITs</h3>
                </div>
                <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 text-cyan-400">
                  <Radio className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-4 space-y-2.5 text-xs">
                <p className="text-zinc-400 leading-relaxed">
                  <strong className="text-zinc-200">Why this? </strong>
                  InvITs own national power grids and toll expressways that operate as vital monopolies, providing high defensive quarterly payouts (9.8%–10.4% yield).
                </p>

                <div className="pt-2 border-t border-zinc-800/60">
                  <span className="text-[10px] font-semibold uppercase text-zinc-500 block mb-1">
                    Illustrative Sample Instruments (Not recommendations)
                  </span>
                  <ul className="space-y-1 font-mono text-[11px] text-zinc-300">
                    <li>• PowerGrid InvIT (Yield: 10.4%)</li>
                    <li>• India Grid Trust (Yield: 9.8%)</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="text-[10px] text-zinc-500 border-t border-zinc-800/60 pt-2">
              SEBI Regulated • Payouts backed by public utilities
            </div>
          </div>

          {/* Bonds Card */}
          <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-amber-400">Target: {targetAlloc.bonds}%</span>
                  <h3 className="text-lg font-bold text-zinc-100 mt-0.5">Bonds & Sovereign G-Secs</h3>
                </div>
                <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 text-amber-400">
                  <Landmark className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-4 space-y-2.5 text-xs">
                <p className="text-zinc-400 leading-relaxed">
                  <strong className="text-zinc-200">Why this? </strong>
                  Zero-default risk sovereign G-Secs guarantee steady coupon accrual and absolute capital return at maturity, locking in your hard-earned wealth.
                </p>

                <div className="pt-2 border-t border-zinc-800/60">
                  <span className="text-[10px] font-semibold uppercase text-zinc-500 block mb-1">
                    Illustrative Sample Instruments (Not recommendations)
                  </span>
                  <ul className="space-y-1 font-mono text-[11px] text-zinc-300">
                    <li>• 7.18% GS 2033 (RBI Sovereign)</li>
                    <li>• REC Ltd 7.54% AAA (Navratna PSU)</li>
                    <li>• HDFC Bank Tier-II 7.85% (AAA Rated)</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="text-[10px] text-zinc-500 border-t border-zinc-800/60 pt-2">
              Available via RBI Retail Direct & Exchange
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 8: START SMALL (CONFIDENCE BUILDER)
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-zinc-900 border border-zinc-800/80 rounded-3xl p-6 md:p-8 space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
            <DollarSign className="w-4 h-4" />
            <span>Confidence Builder</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-zinc-100 mt-1">
            Start Small with ₹{smallAmount.toLocaleString('en-IN')}
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Slide to see exactly what a modest test amount could purchase across alternative asset classes.
          </p>
        </div>

        <div className="space-y-3 max-w-xl">
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-400">Select Test Amount:</span>
            <span className="text-xl font-bold text-blue-400">₹{smallAmount.toLocaleString('en-IN')}</span>
          </div>
          <input
            type="range"
            min="1000"
            max="50000"
            step="1000"
            value={smallAmount}
            onChange={(e) => setSmallAmount(parseInt(e.target.value))}
            className="w-full accent-blue-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-zinc-500">
            <span>₹1,000</span>
            <span>₹25,000</span>
            <span>₹50,000</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl">
            <span className="text-[10px] uppercase font-semibold text-zinc-500 block">Nexus REIT Units</span>
            <span className="text-2xl font-bold text-emerald-400 mt-1 block">~{smallUnits.nexusUnits} Units</span>
            <span className="text-xs text-zinc-400 mt-1 block">At ₹138.5/unit (~₹{Math.round(smallUnits.nexusUnits * 138.5).toLocaleString('en-IN')})</span>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl">
            <span className="text-[10px] uppercase font-semibold text-zinc-500 block">PGInvIT Units</span>
            <span className="text-2xl font-bold text-cyan-400 mt-1 block">~{smallUnits.pgUnits} Units</span>
            <span className="text-xs text-zinc-400 mt-1 block">At ₹94.2/unit (~₹{Math.round(smallUnits.pgUnits * 94.2).toLocaleString('en-IN')})</span>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl">
            <span className="text-[10px] uppercase font-semibold text-zinc-500 block">Est. Annual Passive Income</span>
            <span className="text-2xl font-bold text-amber-400 mt-1 block">~₹{smallUnits.annualIncome.toLocaleString('en-IN')}</span>
            <span className="text-xs text-zinc-400 mt-1 block">Paid in regular installments</span>
          </div>
        </div>

        <p className="text-[11px] text-zinc-500 italic">
          *Hypothetical illustration, excludes taxes and transaction brokerage fees.
        </p>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 9: ASK A QUESTION (Q&A MATCHER)
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-zinc-900 border border-zinc-800/80 rounded-3xl p-6 md:p-8 space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Instant Q&A Assistant</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-zinc-100 mt-1">
            Ask a Question About Alternative Assets
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Click any prompt chip or type below to receive straightforward, SEBI-compliant answers.
          </p>
        </div>

        {/* Prompt Chips */}
        <div className="flex flex-wrap gap-2">
          {[
            "Are REITs safe?",
            "How do bonds pay me?",
            "Why diversify away from stocks?",
            "How are REIT dividends taxed?",
            "What is an InvIT?"
          ].map((chip) => (
            <button
              key={chip}
              onClick={() => handleSendChat(chip)}
              className="px-3.5 py-1.5 rounded-full bg-zinc-950 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 text-xs font-medium text-zinc-300 transition-colors cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Chat Stream Box */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 h-64 overflow-y-auto space-y-3 flex flex-col">
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                msg.sender === "user"
                  ? "ml-auto bg-blue-600 text-white font-medium rounded-tr-none"
                  : "mr-auto bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none whitespace-pre-line"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Chat input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
            placeholder="Type your question (e.g., 'Can I sell REITs anytime on Zerodha?')..."
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button
            onClick={() => handleSendChat()}
            className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          JARGON DECODER & TOOLTIPS
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-400" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Jargon Decoder (Hover/Tap for Definitions)
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(JARGON).map(([term, definition]) => (
            <div
              key={term}
              className="p-3 rounded-xl bg-zinc-900 border border-zinc-800/80 text-xs hover:border-zinc-700 transition-colors"
            >
              <span className="font-bold text-blue-400 block">{term}</span>
              <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">{definition}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          TRUST AND COMPLIANCE FOOTER (EVERY SECTION RELEVANT)
      ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-zinc-800/80 pt-8 space-y-4 text-center">
        <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>SEBI-Regulated Framework</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Zero Commissions Earned (Read-Only)</span>
          </span>
          <a
            href="https://investor.sebi.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>SEBI Investor Education Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <p className="text-[11px] text-zinc-500 max-w-3xl mx-auto leading-relaxed">
          Educational information only. Not investment advice. Securities markets and real asset trusts are subject to market risks. Read all offer and scheme-related documents carefully before investing. Past performance is not indicative of future returns.
        </p>
      </footer>
    </div>
  );
};
