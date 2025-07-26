# cybercrime-trend-predictor
https://euphonious-sherbet-ebaa94.netlify.app

# 🛡️ Phishing URL Detection System

A real-time AI-enhanced phishing URL detection system that analyzes website URLs for potential phishing threats using advanced heuristics and machine learning.
Designed with a modern UI and tailored for proactive cybersecurity defense.

## 🚀 Features

### 🔍 Advanced Feature Analysis
- ✅ **URL Length & Complexity Scoring**
- 🔣 **Special Character Detection** (`@`, `-`, `%`, etc.)
- 🌐 **Suspicious TLD & Subdomain Checks**
- 🧠 **IP Address in URL Detection**
- 🕑 **Simulated Domain Age Analysis**
- 🔐 **SSL/HTTPS Validation**
- 🔗 **Redirect and Encoding Checks**

### 🧠 Real-Time Risk Assessment
- 📊 **Comprehensive Risk Scoring**
- 🟥 **Color-Coded Risk Levels** (Low, Medium, High)
- 🧩 **Feature-Specific Breakdown**
- 🧾 **Live Analysis Feedback**

### 💡 Security Recommendations
- 🔐 **Context-Aware Security Advice**
- 📘 **Best Practices Display**
- 🧯 **Mitigation Guidance for Detected Threats**

### 🖥️ User Interface & UX
- 🎨 **Clean Dark-Themed Design**
- ⚙️ **Animated Progress Indicators**
- 📱 **Fully Responsive (Tailwind CSS)**
- ✨ **Modern UI with Feature Cards & Dynamic States**

---

## 📦 Tech Stack

| Tech               | Usage                          |
|--------------------|--------------------------------|
| **React + TypeScript** | Frontend framework             |
| **Tailwind CSS**       | UI Styling & Responsive Design |
| **TensorFlow.js**      | Client-side ML Evaluation      |
| **Scikit-learn** (optional) | Offline Model Prototyping       |
| **BeautifulSoup** (optional) | Content scraping (for backend)  |

---

## 🧪 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/phishing-url-detector.git
cd phishing-url-detector
npm install
npm run dev

src/
├── App.tsx
├── components/
│   ├── URLAnalyzer.tsx     # Core analysis logic + UI
│   ├── RiskMeter.tsx       # Risk score visualization
│   ├── FeatureBreakdown.tsx # Visual report for each feature
│   └── Recommendations.tsx # Mitigation advice
├── utils/
│   └── urlFeatures.ts      # Feature extraction logic
├── data/
│   └── tldBlacklist.ts     # Known suspicious TLDs
├── styles/
│   └── tailwind.css


🧠 Future Enhancements
✅ Integrate real phishing datasets for training

🔍 Server-side domain age and certificate validation

🌐 DNS and WHOIS reputation checks

🧰 Browser plugin version (Chrome extension)

🛑 Integration with known phishing feeds (Google Safe Browsing, PhishTank)

📉 Historical threat trend dashboard (combine with Cybercrime Trend Predictor)



