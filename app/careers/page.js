"use client";

import { useState, useRef } from "react";
import { Upload, Briefcase } from "lucide-react";
import toast from "react-hot-toast"; // 👈 Import toast

export default function CareersPage() {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    location: "",
    message: "",
  });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const jobOpenings = [
    { id: "BTTS-01", title: "Toll Collector", location: "Pan India", desc: "Collect toll fees accurately, issue receipts, manage transactions, and ensure smooth and efficient toll lane operations." },
    { id: "BTTS-02", title: "Lane Assistant", location: "Pan India", desc: "Assist with vehicle movement, guide commuters, support toll collection activities, and maintain smooth traffic flow at toll lanes." },
    { id: "BTTS-03", title: "Toll Supervisor", location: "Pan India", desc: "Supervise toll plaza staff, monitor daily collections, ensure compliance with operational procedures, and maintain efficient plaza operations." },
    { id: "BTTS-04", title: "Site Incharge", location: "Pan India", desc: "Oversee daily site operations, coordinate manpower, monitor service quality, and ensure compliance with client requirements and safety standards." },
    { id: "BTTS-05", title: "Supervisor", location: "Pan India", desc: "Supervise on-site personnel, allocate duties, monitor performance, and ensure smooth execution of daily operational activities." },
    { id: "BTTS-06", title: "HR Manager", location: "Corporate Office / Delhi", desc: "Manage recruitment, employee relations, workforce planning, attendance, and HR operations across assigned sites and offices." },
    { id: "BTTS-07", title: "Assistant HR Manager", location: "Corporate Office / Delhi", desc: "Support recruitment, employee onboarding, attendance management, payroll coordination, and implementation of HR policies." },
    { id: "BTTS-08", title: "Plaza Manager", location: "Pan India", desc: "Lead overall toll plaza operations, oversee revenue collection and manpower, and ensure safety, compliance, and client satisfaction." },
    { id: "BTTS-09", title: "Site Manager", location: "Pan India", desc: "Manage site-level operations, manpower deployment, client coordination, resource utilization, and adherence to operational standards." },
    { id: "BTTS-10", title: "Accountant", location: "Corporate Office / Delhi", desc: "Maintain financial records, process transactions, reconcile accounts, and ensure accurate documentation and timely financial reporting." },
    { id: "BTTS-11", title: "Assistant Accountant", location: "Corporate Office / Delhi", desc: "Assist in bookkeeping, invoice processing, bank reconciliations, voucher entries, and preparation of financial statements." },
    { id: "BTTS-12", title: "Assistant Plaza Manager", location: "Pan India", desc: "Assist the Plaza Manager in supervising toll operations, monitoring collections, managing staff, and ensuring operational efficiency." },
    { id: "BTTS-13", title: "Security Guard", location: "Pan India", desc: "Maintain site security, monitor access points, conduct routine checks, and help ensure the safety of personnel, property, and infrastructure." },
    { id: "BTTS-14", title: "Security Supervisor", location: "Pan India", desc: "Supervise security personnel, monitor deployment and patrolling, enforce security protocols, and coordinate incident response." },
    { id: "BTTS-15", title: "Finance Manager", location: "Corporate Office / Delhi", desc: "Oversee budgeting, financial planning, cash flow, financial reporting, and compliance to support business performance and profitability." },
    { id: "BTTS-16", title: "General Manager – Operations", location: "Pan India", desc: "Lead multi-site highway and toll operations, drive operational excellence, optimize revenue realization, and ensure client satisfaction and regulatory compliance." },
    { id: "BTTS-17", title: "General Manager – Operations & Bid", location: "Corporate Office / Delhi", desc: "Lead operational strategy and tendering activities, oversee bid preparation and commercial proposals, and drive business growth through efficient service delivery." },
  ];

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleApplyClick = (jobTitle) => {
    setFormData((prev) => ({ ...prev, position: jobTitle }));
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Maximum 5MB allowed.");
      setResume(null);
      return;
    }
    const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    if (![".pdf", ".doc", ".docx"].includes(ext)) {
      toast.error("Only PDF, DOC, or DOCX files are allowed.");
      setResume(null);
      return;
    }
    setResume(file);
    toast.success("Resume attached successfully!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (resume) data.append("resume", resume);

      const res = await fetch("/api/careers", { method: "POST", body: data });
      const result = await res.json();

      if (res.ok) {
        // 👈 Show Success Toast
        toast.success("Application submitted successfully! Our HR team will contact you soon.", {
          duration: 5000,
        });
        
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          position: "",
          experience: "",
          location: "",
          message: "",
        });
        setResume(null);
      } else {
        // 👈 Show Error Toast
        toast.error(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 bg-[#f5f5f5] min-h-screen">
      {/* Header */}
      <section className="bg-[#08264A] text-white py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 md:w-12 h-[1px] bg-[#D9A441]" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase">
              Careers
            </h1>
            <div className="w-8 md:w-12 h-[1px] bg-[#D9A441]" />
          </div>
          <p className="text-sm md:text-base text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Join Bheema Tolling &amp; Traffic Solution Pvt. Ltd. and be part of India's
            leading highway operations team. We are always looking for talented,
            dedicated professionals to strengthen our mission of delivering
            operational excellence across the nation.
          </p>
        </div>
      </section>

      {/* Open Positions List */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 md:w-12 h-[1px] bg-[#D9A441]" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#08264A] uppercase">
              Open Position
            </h2>
            <div className="w-8 md:w-12 h-[1px] bg-[#D9A441]" />
          </div>

          <div className="space-y-4">
            {jobOpenings.map((job) => (
              <div
                key={job.id}
                className="bg-[#FFF6EB] rounded-2xl p-5 sm:p-6 shadow-sm border border-[#f0e6d8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              >
                <div className="flex-1">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    JOB ID: {job.id}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#08264A] mt-1">
                    {job.title}
                  </h3>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-1 block">
                    LOCATION: {job.location}
                  </span>
                  <div className="mt-4">
                    <span className="text-[11px] font-bold text-[#08264A] uppercase tracking-wider block mb-1">
                      JOB DESCRIPTION
                    </span>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {job.desc}
                    </p>
                  </div>
                </div>
                
                <div className="w-full sm:w-auto shrink-0">
                  <button
                    onClick={() => handleApplyClick(job.title)}
                    className="w-full sm:w-auto bg-[#08264A] hover:bg-[#0A2342] text-white font-bold px-8 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    APPLY
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section ref={formRef} className="py-10 px-4 sm:px-6 scroll-mt-24">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="text-[#D9A441]" size={26} />
            <h2 className="text-xl md:text-2xl font-bold text-[#08264A]">
              Apply Now
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9A441]"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9A441]"
                  placeholder="you@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9A441]"
                  placeholder="10-digit mobile number"
                />
              </div>

              {/* Position */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Position Applied For <span className="text-red-500">*</span>
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9A441] bg-white"
                >
                  <option value="">Select a position</option>
                  {jobOpenings.map((job) => (
                    <option key={job.id} value={job.title}>
                      {job.title}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Total Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9A441]"
                  placeholder="e.g., 3 years"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Current Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9A441]"
                  placeholder="e.g., New Delhi"
                />
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Upload Resume (PDF / DOC / DOCX, max 5MB)
              </label>
              <label className="flex items-center gap-3 border-2 border-dashed border-gray-300 rounded-lg px-4 py-4 cursor-pointer hover:border-[#D9A441] transition">
                <Upload className="text-[#D9A441]" size={20} />
                <span className="text-sm text-gray-600 truncate">
                  {resume ? resume.name : "Choose a file…"}
                </span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Cover Note / Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D9A441] resize-none"
                placeholder="Tell us briefly why you'd like to join BTTS…"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D9A441] hover:bg-[#c8933a] text-white font-bold py-3 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting…" : "Submit Application"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}