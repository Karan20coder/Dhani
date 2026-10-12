from fastapi import APIRouter, Query
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

router = APIRouter(tags=["Beyond Stocks"])

class QuizAnswerSchema(BaseModel):
    questionId: int
    question: str
    selectedOption: str
    scoreWeight: int

class QuizSubmissionSchema(BaseModel):
    userId: Optional[str] = "guest"
    answers: List[QuizAnswerSchema] = []
    riskCategory: Optional[str] = None
    calculatedScore: Optional[int] = 0

class QuizResponseSchema(BaseModel):
    status: str
    riskCategory: str
    score: int
    recommendedAllocation: Dict[str, int]
    summary: str

# Hardcoded sample data for 3 REITs, 2 InvITs, and 3 Bonds
HISTORICAL_INSTRUMENTS = {
    "reits": [
        {
            "id": "reit_nexus",
            "name": "Nexus Select Trust",
            "ticker": "NXST.NS",
            "type": "REIT",
            "category": "Retail Mall Real Estate",
            "currentPrice": 138.5,
            "distributionYield": "7.8%",
            "sebiReg": "IN/REIT/22-23/0004",
            "rating": "CRISIL AAA / Stable",
            "payoutFrequency": "Quarterly",
            "minLot": "1 Unit (~₹139)",
            "history3Y": [
                {"month": "2023-Q2", "price": 104, "distribution": 2.1},
                {"month": "2023-Q3", "price": 112, "distribution": 2.2},
                {"month": "2023-Q4", "price": 118, "distribution": 2.3},
                {"month": "2024-Q1", "price": 122, "distribution": 2.35},
                {"month": "2024-Q2", "price": 128, "distribution": 2.4},
                {"month": "2024-Q3", "price": 133, "distribution": 2.45},
                {"month": "2024-Q4", "price": 135, "distribution": 2.5},
                {"month": "2025-Q1", "price": 136, "distribution": 2.55},
                {"month": "2025-Q2", "price": 137, "distribution": 2.6},
                {"month": "2025-Q3", "price": 138, "distribution": 2.65},
                {"month": "2025-Q4", "price": 138.5, "distribution": 2.7},
            ],
            "risks": "Consumer footfall reduction during economic downcycles, retail tenant lease non-renewals.",
        },
        {
            "id": "reit_embassy",
            "name": "Embassy Office Parks REIT",
            "ticker": "EMBASSY.NS",
            "type": "REIT",
            "category": "Grade-A Commercial IT Parks",
            "currentPrice": 378.0,
            "distributionYield": "7.2%",
            "sebiReg": "IN/REIT/17-18/0001",
            "rating": "CRISIL AAA / Stable",
            "payoutFrequency": "Quarterly",
            "minLot": "1 Unit (~₹378)",
            "history3Y": [
                {"month": "2023-Q2", "price": 315, "distribution": 5.2},
                {"month": "2023-Q3", "price": 322, "distribution": 5.3},
                {"month": "2023-Q4", "price": 330, "distribution": 5.4},
                {"month": "2024-Q1", "price": 342, "distribution": 5.5},
                {"month": "2024-Q2", "price": 355, "distribution": 5.6},
                {"month": "2024-Q3", "price": 362, "distribution": 5.7},
                {"month": "2024-Q4", "price": 368, "distribution": 5.8},
                {"month": "2025-Q1", "price": 372, "distribution": 5.9},
                {"month": "2025-Q2", "price": 375, "distribution": 6.0},
                {"month": "2025-Q3", "price": 377, "distribution": 6.1},
                {"month": "2025-Q4", "price": 378.0, "distribution": 6.2},
            ],
            "risks": "Work-from-home policy fluctuations, tech company hiring slowdowns affecting office absorptions.",
        },
        {
            "id": "reit_brookfield",
            "name": "Brookfield India Real Estate Trust",
            "ticker": "BIRET.NS",
            "type": "REIT",
            "category": "Institutional Tech Parks",
            "currentPrice": 254.0,
            "distributionYield": "8.1%",
            "sebiReg": "IN/REIT/20-21/0002",
            "rating": "CRISIL AAA / Stable",
            "payoutFrequency": "Quarterly",
            "minLot": "1 Unit (~₹254)",
            "history3Y": [
                {"month": "2023-Q2", "price": 240, "distribution": 4.5},
                {"month": "2023-Q3", "price": 245, "distribution": 4.6},
                {"month": "2023-Q4", "price": 248, "distribution": 4.7},
                {"month": "2024-Q1", "price": 250, "distribution": 4.8},
                {"month": "2024-Q2", "price": 252, "distribution": 4.9},
                {"month": "2024-Q3", "price": 253, "distribution": 5.0},
                {"month": "2024-Q4", "price": 254, "distribution": 5.1},
                {"month": "2025-Q1", "price": 253, "distribution": 5.1},
                {"month": "2025-Q2", "price": 254, "distribution": 5.15},
                {"month": "2025-Q3", "price": 254, "distribution": 5.2},
                {"month": "2025-Q4", "price": 254.0, "distribution": 5.2},
            ],
            "risks": "Rising interest rates increasing cost of debt for acquisitions.",
        },
    ],
    "invits": [
        {
            "id": "invit_powergrid",
            "name": "PowerGrid Infrastructure Investment Trust (PGInvIT)",
            "ticker": "PGINVIT.NS",
            "type": "InvIT",
            "category": "Interstate Power Transmission",
            "currentPrice": 98.2,
            "distributionYield": "10.4%",
            "sebiReg": "IN/InvIT/20-21/0014",
            "rating": "CRISIL AAA / CARE AAA",
            "payoutFrequency": "Quarterly",
            "minLot": "1 Unit (~₹98)",
            "history3Y": [
                {"month": "2023-Q2", "price": 105, "distribution": 3.0},
                {"month": "2023-Q3", "price": 103, "distribution": 3.0},
                {"month": "2023-Q4", "price": 101, "distribution": 3.0},
                {"month": "2024-Q1", "price": 100, "distribution": 2.95},
                {"month": "2024-Q2", "price": 99.5, "distribution": 2.95},
                {"month": "2024-Q3", "price": 99.0, "distribution": 2.95},
                {"month": "2024-Q4", "price": 98.8, "distribution": 2.90},
                {"month": "2025-Q1", "price": 98.5, "distribution": 2.90},
                {"month": "2025-Q2", "price": 98.3, "distribution": 2.90},
                {"month": "2025-Q3", "price": 98.2, "distribution": 2.90},
                {"month": "2025-Q4", "price": 98.2, "distribution": 2.90},
            ],
            "risks": "Tariff revisions, grid transmission availability line tripping, asset amortization schedule.",
        },
        {
            "id": "invit_indigrid",
            "name": "India Grid Trust (IndiGrid)",
            "ticker": "INDIGRID.NS",
            "type": "InvIT",
            "category": "Power Transmission & Solar Parks",
            "currentPrice": 139.5,
            "distributionYield": "9.8%",
            "sebiReg": "IN/InvIT/16-17/0005",
            "rating": "CRISIL AAA / ICRA AAA",
            "payoutFrequency": "Quarterly",
            "minLot": "1 Unit (~₹140)",
            "history3Y": [
                {"month": "2023-Q2", "price": 134, "distribution": 3.3},
                {"month": "2023-Q3", "price": 135, "distribution": 3.35},
                {"month": "2023-Q4", "price": 137, "distribution": 3.4},
                {"month": "2024-Q1", "price": 138, "distribution": 3.45},
                {"month": "2024-Q2", "price": 139, "distribution": 3.45},
                {"month": "2024-Q3", "price": 139, "distribution": 3.5},
                {"month": "2024-Q4", "price": 139.2, "distribution": 3.5},
                {"month": "2025-Q1", "price": 139.3, "distribution": 3.55},
                {"month": "2025-Q2", "price": 139.4, "distribution": 3.55},
                {"month": "2025-Q3", "price": 139.5, "distribution": 3.55},
                {"month": "2025-Q4", "price": 139.5, "distribution": 3.6},
            ],
            "risks": "Regulatory dispute settlements, counterparty payment delays from state distribution companies (DISCOMs).",
        },
    ],
    "bonds": [
        {
            "id": "bond_gsec_718",
            "name": "7.18% GS 2033 (Govt of India)",
            "ticker": "718GS2033",
            "type": "Government Bond",
            "category": "Sovereign Debt",
            "currentPrice": 100.8,
            "couponRate": "7.18% Annual",
            "distributionYield": "7.18%",
            "sebiReg": "RBI Sovereign Issuance",
            "rating": "SOVEREIGN (Zero Credit Risk)",
            "payoutFrequency": "Semi-Annual (Jan & Jul)",
            "maturityDate": "14-Aug-2033",
            "minLot": "₹1,000 via RBI Retail Direct / NSE",
            "history3Y": [
                {"month": "2023-Q2", "price": 100.2, "coupon": 3.59},
                {"month": "2023-Q3", "price": 99.8, "coupon": 0},
                {"month": "2023-Q4", "price": 100.1, "coupon": 3.59},
                {"month": "2024-Q1", "price": 100.5, "coupon": 0},
                {"month": "2024-Q2", "price": 100.4, "coupon": 3.59},
                {"month": "2024-Q3", "price": 100.6, "coupon": 0},
                {"month": "2024-Q4", "price": 100.7, "coupon": 3.59},
                {"month": "2025-Q1", "price": 100.8, "coupon": 0},
                {"month": "2025-Q2", "price": 100.7, "coupon": 3.59},
                {"month": "2025-Q3", "price": 100.8, "coupon": 0},
                {"month": "2025-Q4", "price": 100.8, "coupon": 3.59},
            ],
            "risks": "Interest rate risk (bond price falls if RBI raises repo rates), long duration sensitivity.",
        },
        {
            "id": "bond_rec_aaa",
            "name": "REC Limited 7.54% AAA Bonds",
            "ticker": "REC2029",
            "type": "Corporate Bond",
            "category": "PSU Financial Institution",
            "currentPrice": 101.4,
            "couponRate": "7.54% Annual",
            "distributionYield": "7.45%",
            "sebiReg": "SEBI NCS Listed",
            "rating": "CRISIL AAA / ICRA AAA",
            "payoutFrequency": "Annual",
            "maturityDate": "15-Dec-2029",
            "minLot": "₹10,000 via NSE/BSE",
            "history3Y": [
                {"month": "2023-Q2", "price": 100.6, "coupon": 0},
                {"month": "2023-Q3", "price": 100.8, "coupon": 0},
                {"month": "2023-Q4", "price": 101.0, "coupon": 7.54},
                {"month": "2024-Q1", "price": 101.1, "coupon": 0},
                {"month": "2024-Q2", "price": 101.2, "coupon": 0},
                {"month": "2024-Q3", "price": 101.3, "coupon": 0},
                {"month": "2024-Q4", "price": 101.3, "coupon": 7.54},
                {"month": "2025-Q1", "price": 101.4, "coupon": 0},
                {"month": "2025-Q2", "price": 101.4, "coupon": 0},
                {"month": "2025-Q3", "price": 101.4, "coupon": 0},
                {"month": "2025-Q4", "price": 101.4, "coupon": 7.54},
            ],
            "risks": "Secondary market liquidity constraints if needing to sell prior to maturity date.",
        },
        {
            "id": "bond_hdfc_aaa",
            "name": "HDFC Bank Tier-II 7.85% AAA Bonds",
            "ticker": "HDFCB2034",
            "type": "Corporate Bond",
            "category": "Private Banking Tier-II",
            "currentPrice": 102.1,
            "couponRate": "7.85% Annual",
            "distributionYield": "7.70%",
            "sebiReg": "SEBI NCS Listed",
            "rating": "CARE AAA / CRISIL AAA",
            "payoutFrequency": "Annual",
            "maturityDate": "20-Sep-2034",
            "minLot": "₹10,000 via NSE/BSE",
            "history3Y": [
                {"month": "2023-Q2", "price": 101.2, "coupon": 0},
                {"month": "2023-Q3", "price": 101.5, "coupon": 7.85},
                {"month": "2023-Q4", "price": 101.7, "coupon": 0},
                {"month": "2024-Q1", "price": 101.8, "coupon": 0},
                {"month": "2024-Q2", "price": 101.9, "coupon": 0},
                {"month": "2024-Q3", "price": 102.0, "coupon": 7.85},
                {"month": "2024-Q4", "price": 102.0, "coupon": 0},
                {"month": "2025-Q1", "price": 102.1, "coupon": 0},
                {"month": "2025-Q2", "price": 102.1, "coupon": 0},
                {"month": "2025-Q3", "price": 102.1, "coupon": 7.85},
                {"month": "2025-Q4", "price": 102.1, "coupon": 0},
            ],
            "risks": "Subordinated tier status relative to senior deposits; call option exercise risk.",
        },
    ]
}

# Temporary in-memory storage for quiz submissions
_quiz_storage: Dict[str, Dict[str, Any]] = {}

@router.post("/quiz/submit", response_model=QuizResponseSchema)
def submit_quiz(payload: QuizSubmissionSchema):
    # Calculate score from answers
    total_score = sum(ans.scoreWeight for ans in payload.answers)
    if payload.calculatedScore and payload.calculatedScore > total_score:
        total_score = payload.calculatedScore

    # Determine risk category
    if total_score <= 12:
        risk_category = "Conservative"
        recommended_allocation = {"equity": 30, "reits": 15, "invits": 15, "bonds": 40}
        summary = "Capital preservation priority with high reliance on guaranteed sovereign bonds and prime AAA yields."
    elif total_score <= 18:
        risk_category = "Moderate"
        recommended_allocation = {"equity": 50, "reits": 15, "invits": 15, "bonds": 20}
        summary = "Balanced growth with substantial cash-flow dampeners to cushion broader equity drawdowns."
    elif total_score <= 24:
        risk_category = "Balanced"
        recommended_allocation = {"equity": 60, "reits": 15, "invits": 10, "bonds": 15}
        summary = "Core wealth building with healthy income distribution and inflation hedging."
    elif total_score <= 30:
        risk_category = "Growth"
        recommended_allocation = {"equity": 75, "reits": 10, "invits": 10, "bonds": 5}
        summary = "High capital compounding with tactical high-yield alternative overlays."
    else:
        risk_category = "Aggressive"
        recommended_allocation = {"equity": 85, "reits": 5, "invits": 5, "bonds": 5}
        summary = "Maximum equity tilt with minimal alternative dampening for long-horizon compounding."

    user_id = payload.userId or "guest"
    _quiz_storage[user_id] = {
        "riskCategory": risk_category,
        "score": total_score,
        "recommendedAllocation": recommended_allocation,
        "summary": summary
    }

    return QuizResponseSchema(
        status="success",
        riskCategory=risk_category,
        score=total_score,
        recommendedAllocation=recommended_allocation,
        summary=summary
    )

@router.get("/suggestions")
def get_suggestions(
    userId: Optional[str] = "guest",
    riskCategory: Optional[str] = Query(None, description="Conservative, Moderate, Balanced, Growth, Aggressive")
):
    # Lookup stored user quiz or default to Moderate
    saved = _quiz_storage.get(userId or "guest", {})
    effective_risk = riskCategory or saved.get("riskCategory") or "Moderate"
    
    # Recommendations matrix based on profile
    allocations_map = {
        "Conservative": {"equity": 30, "reits": 15, "invits": 15, "bonds": 40},
        "Moderate": {"equity": 50, "reits": 15, "invits": 15, "bonds": 20},
        "Balanced": {"equity": 60, "reits": 15, "invits": 10, "bonds": 15},
        "Growth": {"equity": 75, "reits": 10, "invits": 10, "bonds": 5},
        "Aggressive": {"equity": 85, "reits": 5, "invits": 5, "bonds": 5},
    }
    alloc = allocations_map.get(effective_risk, allocations_map["Moderate"])

    suggestions = [
        {
            "category": "REITs (Real Estate)",
            "allocationPct": alloc["reits"],
            "role": "Inflation hedge & commercial rental yield",
            "expectedYield": "7.2% - 8.1%",
            "riskLevel": "Moderate",
            "whyThis": f"Your risk profile is {effective_risk}. Commercial REITs pay 90%+ of net rental income quarterly under SEBI regulations, curbing portfolio drawdown.",
            "examples": [
                {"name": "Nexus Select Trust", "yield": "7.8%", "rating": "CRISIL AAA", "ticker": "NXST.NS"},
                {"name": "Embassy Office Parks REIT", "yield": "7.2%", "rating": "CRISIL AAA", "ticker": "EMBASSY.NS"},
                {"name": "Brookfield India Real Estate Trust", "yield": "8.1%", "rating": "CRISIL AAA", "ticker": "BIRET.NS"},
            ],
            "disclaimer": "Illustrative sample, not a recommendation."
        },
        {
            "category": "InvITs (Infrastructure)",
            "allocationPct": alloc["invits"],
            "role": "High defensive quarterly dividend distributions",
            "expectedYield": "9.8% - 10.4%",
            "riskLevel": "Moderate",
            "whyThis": f"Adding InvITs provides sovereign-like utility payouts from essential power transmission grids, with low correlation to volatile equity swings.",
            "examples": [
                {"name": "PowerGrid InvIT (PGInvIT)", "yield": "10.4%", "rating": "CRISIL AAA", "ticker": "PGINVIT.NS"},
                {"name": "India Grid Trust (IndiGrid)", "yield": "9.8%", "rating": "CRISIL AAA", "ticker": "INDIGRID.NS"},
            ],
            "disclaimer": "Illustrative sample, not a recommendation."
        },
        {
            "category": "Bonds & G-Secs",
            "allocationPct": alloc["bonds"],
            "role": "Guaranteed capital preservation & coupon compounding",
            "expectedYield": "7.18% - 7.85%",
            "riskLevel": "Low to Moderate",
            "whyThis": f"Locks in safe compound growth. Sovereign G-Secs have zero credit risk, shielding your portfolio when stock indices correct.",
            "examples": [
                {"name": "7.18% GS 2033 (Sovereign)", "yield": "7.18%", "rating": "SOVEREIGN", "ticker": "718GS2033"},
                {"name": "REC Limited 7.54% AAA", "yield": "7.45%", "rating": "CRISIL AAA", "ticker": "REC2029"},
                {"name": "HDFC Bank Tier-II 7.85%", "yield": "7.70%", "rating": "CARE AAA", "ticker": "HDFCB2034"},
            ],
            "disclaimer": "Illustrative sample, not a recommendation."
        }
    ]

    return {
        "status": "success",
        "riskProfile": effective_risk,
        "targetAllocations": alloc,
        "suggestions": suggestions,
        "instruments": HISTORICAL_INSTRUMENTS
    }

@router.get("/instruments")
def get_instruments():
    return {
        "status": "success",
        "data": HISTORICAL_INSTRUMENTS
    }
