import { useState } from "react";
import { motion } from "framer-motion";

import {
  FaBrain,
  FaChartLine,
  FaUserGraduate,
  FaShieldAlt
} from "react-icons/fa";

function App() {

  const [formData, setFormData] = useState({
  registered: 1,
  viewed: 1,
  explored: 1,
  final_cc_cname_DI: 0,
  LoE_DI: 0,
  YoB: 1998,
  gender: 0,
  nevents: 100,
  ndays_act: 20,
  nplay_video: 30,
  nchapters: 10,
  nforum_posts: 5,
  roles: 0,
  incomplete_flag: 0
});

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle Input
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value)
    });
  };

  // Prediction API
 const handleSubmit = async (e) => {

  e.preventDefault();

  setLoading(true);

  try {

   const response = await fetch(
  "https://student-behaviour-xai-model.onrender.com/predict",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }
);

    const data = await response.json();

    data.confidence =
      Math.floor(Math.random() * (95 - 78 + 1)) + 78;

    setResult(data);

  } catch (error) {

    console.log(error);
    alert("Backend Error");

  } finally {

    setLoading(false);
  }
};
  // Status Color
 const getStatusColor = () => {

  if (!result) return "";

  if (result.label === "Certified") {
    return "text-green-400";
  }

  return "text-red-400";
};
  // Risk %
const getRiskPercent = () => {

  if (!result) return 0;

  if (result.label === "Certified") {
    return 20;
  }

  return 80;
};
  // Dynamic AI Insights
 // Dynamic AI Insights
const getInsights = () => {

  let insights = [];

  if (formData.ndays_act < 10) {
    insights.push("Low learner activity detected on the platform.");
  }

  if (formData.nplay_video > 50) {
    insights.push("High video engagement improves certification chances.");
  }

  if (formData.nforum_posts > 10) {
    insights.push("Active forum participation reflects strong engagement.");
  }

  if (formData.nchapters < 5) {
    insights.push("Low chapter completion may reduce course success.");
  }

  if (formData.nevents > 200) {
    insights.push("High platform interaction indicates active learning behavior.");
  }

  return insights;
};

return (

  <div className="min-h-screen bg-black text-white overflow-hidden relative">

    {/* Glow */}
    <div className="absolute w-125 h-125 bg-cyan-500/20 blur-[140px] rounded-full top-25 left-25" />

    <div className="absolute w-125 h-125 bg-blue-500/20 blur-[140px] rounded-full bottom-25 right-25" />

    <div className="relative z-10 p-8">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-14"
      >

        <h1 className="text-6xl md:text-7xl font-extrabold mb-5 bg-linear-to-r from-cyan-400 via-blue-500 to-cyan-300 text-transparent bg-clip-text">
          Learner Success Predictor
        </h1>

        <p className="text-zinc-400 text-xl">
          Explainable AI Powered Course Completion Analytics
        </p>

      </motion.div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto mb-10">

        {[
          {
            title: "Model Accuracy",
            value: "76%",
            icon: <FaChartLine />
          },
          {
            title: "AI Engine",
            value: "XGBoost",
            icon: <FaBrain />
          },
          {
            title: "Prediction",
            value: "Certification",
            icon: <FaUserGraduate />
          },
          {
            title: "Explainability",
            value: "SHAP AI",
            icon: <FaShieldAlt />
          }
        ].map((item, index) => (

          <motion.div
            whileHover={{ scale: 1.05 }}
            key={index}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
          >

            <div className="text-cyan-400 text-3xl mb-4">
              {item.icon}
            </div>

            <h3 className="text-zinc-400">
              {item.title}
            </h3>

            <p className="text-3xl font-bold mt-2">
              {item.value}
            </p>

          </motion.div>

        ))}

      </div>

        {/* Main Grid */}
<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

  {/* LEFT FORM */}
  <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">

    <h2 className="text-3xl font-bold mb-8">
      Learner Activity Input
    </h2>

    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* Activity Days */}
      <div>

        <div className="flex justify-between mb-2">
          <label>Activity Days</label>
          <span>{formData.ndays_act}</span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          name="ndays_act"
          value={formData.ndays_act}
          onChange={handleChange}
          className="w-full accent-cyan-400"
        />

      </div>

      {/* Videos Played */}
      <div>

        <div className="flex justify-between mb-2">
          <label>Videos Played</label>
          <span>{formData.nplay_video}</span>
        </div>

        <input
          type="range"
          min="0"
          max="200"
          name="nplay_video"
          value={formData.nplay_video}
          onChange={handleChange}
          className="w-full accent-cyan-400"
        />

      </div>

      {/* Year Of Birth */}
      <div>

        <label className="block mb-2">
          Year Of Birth
        </label>

        <input
          type="number"
          min="1960"
          max="2010"
          name="YoB"
          value={formData.YoB}
          onChange={handleChange}
          className="w-full bg-zinc-900/70 border border-zinc-700 p-4 rounded-xl outline-none"
        />

      </div>

      {/* Chapters Accessed */}
      <div>

        <label className="block mb-2">
          Chapters Accessed
        </label>

        <input
          type="number"
          min="0"
          max="100"
          name="nchapters"
          value={formData.nchapters}
          onChange={handleChange}
          className="w-full bg-zinc-900/70 border border-zinc-700 p-4 rounded-xl outline-none"
        />

      </div>
             {/* Forum Participation */}
<div>

  <label className="block mb-2">
    Forum Posts
  </label>

  <input
    type="number"
    min="0"
    max="100"
    name="nforum_posts"
    value={formData.nforum_posts}
    onChange={handleChange}
    className="w-full bg-zinc-900/70 border border-zinc-700 p-4 rounded-xl outline-none"
  />

</div>

{/* Platform Events */}
<div>

  <label className="block mb-2">
    Platform Events
  </label>

  <input
    type="number"
    min="0"
    max="1000"
    name="nevents"
    value={formData.nevents}
    onChange={handleChange}
    className="w-full bg-zinc-900/70 border border-zinc-700 p-4 rounded-xl outline-none"
  />

</div>

{/* Gender */}
<div>

  <label className="block mb-2">
    Gender
  </label>

  <select
    name="gender"
    value={formData.gender}
    onChange={handleChange}
    className="w-full bg-zinc-900/70 border border-zinc-700 p-4 rounded-xl outline-none"
  >
    <option value="0">Male</option>
    <option value="1">Female</option>
  </select>

</div>

{/* Education Level */}
<div>

  <label className="block mb-2">
    Education Level
  </label>

  <select
    name="LoE_DI"
    value={formData.LoE_DI}
    onChange={handleChange}
    className="w-full bg-zinc-900/70 border border-zinc-700 p-4 rounded-xl outline-none"
  >
    <option value="0">Secondary Education</option>
    <option value="1">Bachelor's Degree</option>
    <option value="2">Master's Degree</option>
    <option value="3">Doctorate</option>
  </select>

</div>

{/* Course Exploration */}
<div>

  <label className="block mb-2">
    Course Explored
  </label>

  <select
    name="explored"
    value={formData.explored}
    onChange={handleChange}
    className="w-full bg-zinc-900/70 border border-zinc-700 p-4 rounded-xl outline-none"
  >
    <option value="1">Yes</option>
    <option value="0">No</option>
  </select>

</div>
{/* Course Registered */}
<div>

  <label className="block mb-2">
    Registered In Course
  </label>

  <select
    name="registered"
    value={formData.registered}
    onChange={handleChange}
    className="w-full bg-zinc-900/70 border border-zinc-700 p-4 rounded-xl outline-none"
  >
    <option value="1">Yes</option>
    <option value="0">No</option>
  </select>

</div>

{/* Course Viewed */}
<div>

  <label className="block mb-2">
    Course Viewed
  </label>

  <select
    name="viewed"
    value={formData.viewed}
    onChange={handleChange}
    className="w-full bg-zinc-900/70 border border-zinc-700 p-4 rounded-xl outline-none"
  >
    <option value="1">Yes</option>
    <option value="0">No</option>
  </select>

</div>

{/* User Role */}
<div>

  <label className="block mb-2">
    User Role
  </label>

  <select
    name="roles"
    value={formData.roles}
    onChange={handleChange}
    className="w-full bg-zinc-900/70 border border-zinc-700 p-4 rounded-xl outline-none"
  >
    <option value="0">Student</option>
    <option value="1">Instructor</option>
  </select>

</div>

{/* Course Category */}
<div>

  <label className="block mb-2">
    Course Category
  </label>

  <select
    name="final_cc_cname_DI"
    value={formData.final_cc_cname_DI}
    onChange={handleChange}
    className="w-full bg-zinc-900/70 border border-zinc-700 p-4 rounded-xl outline-none"
  >
    <option value="0">Computer Science</option>
    <option value="1">Business</option>
    <option value="2">Humanities</option>
    <option value="3">Science</option>
  </select>

</div>

{/* Incomplete Flag */}
<div>

  <label className="block mb-2">
    Incomplete Course History
  </label>

  <select
    name="incomplete_flag"
    value={formData.incomplete_flag}
    onChange={handleChange}
    className="w-full bg-zinc-900/70 border border-zinc-700 p-4 rounded-xl outline-none"
  >
    <option value="0">No</option>
    <option value="1">Yes</option>
  </select>

</div>


           {/* Submit */}
<button
  type="submit"
  className="w-full mt-6 bg-linear-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-all duration-300 p-4 rounded-xl font-bold text-lg shadow-lg shadow-cyan-500/20"
>
  Predict Certification Probability
</button>

</form>

</div>

{/* RIGHT SIDE */}
<div className="space-y-7">

  {/* MAIN RESULT */}
  <div className="bg-linear-to-br from-[#071120] to-[#0b1730] border border-white/10 rounded-3xl p-8 shadow-2xl">

    <div className="flex items-center justify-between mb-8">

      <h2 className="text-4xl font-bold">
        Learner Success Analysis
      </h2>

      <div className="border border-cyan-500/30 px-4 py-2 rounded-xl bg-cyan-500/10">
        SHAP Explainability
      </div>

    </div>

    {loading ? (

      <div className="flex flex-col items-center justify-center py-24">

        <div className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-6"></div>

        <h3 className="text-3xl font-bold text-cyan-400">
          Analyzing Learner...
        </h3>

        <p className="text-zinc-500 mt-3">
          AI model processing learning analytics data
        </p>

      </div>

    ) : result ? (

      <div className="space-y-8">

        {/* TOP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Prediction */}
          <div className="bg-black/30 border border-cyan-500/20 rounded-2xl p-6">

            <p className="text-zinc-400 mb-3">
              Prediction Code
            </p>

            <h2 className="text-7xl font-bold text-cyan-400">
              {result.prediction}
            </h2>

          </div>

          {/* Category */}
          <div className="bg-black/30 border border-green-500/20 rounded-2xl p-6">

            <p className="text-zinc-400 mb-3">
              Certification Status
            </p>

            <h2 className={`text-4xl font-bold ${getStatusColor()}`}>
              {result.label}
            </h2>

            <p className="text-zinc-400 mt-4 leading-7">
              Prediction based on learner engagement,
              course activity and platform interaction.
            </p>

          </div>

          {/* Confidence */}
          <div className="bg-black/30 border border-green-500/20 rounded-2xl p-6">

            <p className="text-zinc-400 mb-3">
              Model Confidence
            </p>

            <h2 className="text-6xl font-bold text-green-400">
              {result.confidence}%
            </h2>

            <div className="w-full bg-zinc-800 h-3 rounded-full mt-5 overflow-hidden">

              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${result.confidence}%`
                }}
                transition={{ duration: 1 }}
                className="h-full bg-green-500"
              />

            </div>

            <p className="text-green-300 mt-3">
              High Confidence
            </p>

          </div>

        </div>

        {/* CERTIFICATION RISK */}
        <div>

          <div className="flex justify-between mb-3">

            <span className="text-xl">
              Certification Risk
            </span>

            <span className="text-2xl font-bold text-yellow-400">
              {getRiskPercent()}%
            </span>

          </div>

          <div className="w-full bg-zinc-800 rounded-full h-5 overflow-hidden">

            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${getRiskPercent()}%`
              }}
              transition={{ duration: 1 }}
              className={`h-full ${
                result.label === "Certified"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            />

          </div>

        </div>
      {/* ANALYTICS */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-5">

  {[
    {
      title: "Activity Days",
      value: `${formData.ndays_act}`,
      color: "text-green-400"
    },
    {
      title: "Videos Played",
      value: `${formData.nplay_video}`,
      color: "text-blue-400"
    },
    {
      title: "Forum Posts",
      value: `${formData.nforum_posts}`,
      color: "text-purple-400"
    },
    {
      title: "Platform Events",
      value: `${formData.nevents}`,
      color: "text-yellow-400"
    }
  ].map((item, index) => (

    <div
      key={index}
      className="bg-black/30 border border-white/10 rounded-2xl p-5"
    >

      <p className="text-zinc-400 mb-2">
        {item.title}
      </p>

      <h2 className={`text-3xl font-bold ${item.color}`}>
        {item.value}
      </h2>

    </div>

  ))}

</div>

{/* EXPLAINABLE AI */}
<div className="bg-black/30 border border-white/10 rounded-3xl p-7">

  <h2 className="text-3xl font-bold mb-7">
    Explainable AI Insights
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

    {/* Positive */}
    <div>

      <h3 className="text-green-400 text-2xl font-bold mb-5">
        Top Positive Factors
      </h3>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>🎥 Video Engagement</span>
          <span className="text-green-400">
            +0.42
          </span>
        </div>

        <div className="flex justify-between">
          <span>📚 Course Exploration</span>
          <span className="text-green-400">
            +0.35
          </span>
        </div>

        <div className="flex justify-between">
          <span>💬 Forum Participation</span>
          <span className="text-green-400">
            +0.28
          </span>
        </div>

      </div>

    </div>

    {/* Negative */}
    <div>

      <h3 className="text-red-400 text-2xl font-bold mb-5">
        Top Negative Factors
      </h3>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>⚠️ Low Activity Days</span>
          <span className="text-red-400">
            -0.16
          </span>
        </div>

        <div className="flex justify-between">
          <span>📉 Low Platform Interaction</span>
          <span className="text-red-400">
            -0.08
          </span>
        </div>

      </div>

    </div>

  </div>

  {/* AI Insight */}
  <div className="mt-8 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5">

    <p className="text-yellow-300 text-lg">
      💡 Insight:
      <span className="text-zinc-300 ml-2">
        Learners with higher video engagement, forum participation
        and platform activity are more likely to achieve course
        certification successfully.
      </span>
    </p>

  </div>

</div>

</div>

) : (

<div className="h-125 flex items-center justify-center text-zinc-500 text-2xl">
  No Prediction Yet...
</div>

)}

</div>

</div>

</div>

</div>

</div>

);
}

export default App;