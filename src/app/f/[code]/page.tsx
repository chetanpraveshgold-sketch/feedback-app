"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

// Local translations matrix for English, Hindi, and Marathi
const translations = {
  en: {
    subtitle: "Customer Feedback Form",
    lang_label: "Language",
    rating_title: "How was your experience at our store?",
    what_went_wrong: "What did you not like?",
    what_to_improve: "What can we do better?",
    what_liked: "What did you like most?",
    other_label: "Other (Please specify)",
    other_placeholder: "Enter details...",
    comment_label: "Tell us more about your experience (Optional)",
    comment_placeholder: "Write your feedback here...",
    contact_ask: "Feel free to share your mobile number if you want us to call you.",
    yes: "Yes",
    no: "No",
    mobile_label: "Mobile Number",
    mobile_placeholder: "Enter 10-digit mobile number",
    mobile_error: "Enter a valid 10-digit mobile number.",
    submit: "Submit Feedback",
    submitting: "Submitting...",
    success_title: "Thank You!",
    success_msg_low: "Thank you for your feedback. We are sorry for the bad experience. We will work hard to make it better.",
    success_msg_mid: "Thank you for your feedback. We will use your suggestions to make your next visit better.",
    success_msg_high: "Thank you for the great rating! We are happy you enjoyed your visit. See you again soon!",
    ref_id: "Reference ID",
    required: "This field is required.",
    page_unavailable_title: "Form Link Expired",
    page_unavailable_msg: "This feedback link code is no longer active. Please request a new form link from the showroom coordinator.",
    net_error_title: "Submission Error",
    net_error_msg: "A network issue occurred while connecting to Google Sheets. We kept your input safe—please click below to try again.",
    retry: "Try Again",
    return_review: "Review Responses",
    labels: {
      1: "Very Poor",
      2: "Poor",
      3: "Average",
      4: "Good",
      5: "Excellent"
    },
    reasons: {
      staff_guidance: "Staff service or behavior",
      waiting_time: "Waiting time",
      pricing_clarity: "Pricing and making charges",
      availability: "Jewellery collection and sizes",
      billing_exchange: "Billing or old-gold exchange",
      designs: "More jewellery designs",
      fast_service: "Faster service",
      guidance: "Better staff service",
      clear_pricing: "Clear pricing",
      showroom_comfort: "Store comfort and seating",
      helpful_staff: "Helpful and polite staff",
      variety_designs: "Beautiful jewellery designs",
      transparent_pricing: "Clear and honest pricing",
      fast_billing: "Fast service and billing",
      showroom_exp: "Comfortable store environment",
      overall_trust: "Trust and good service",
      other: "Something else"
    }
  },
  hi: {
    subtitle: "ग्राहक फीडबैक फॉर्म",
    lang_label: "भाषा",
    rating_title: "शोरूम का आपका समग्र अनुभव कैसा रहा?",
    what_went_wrong: "हमसे कहाँ कमी रह गई?",
    what_to_improve: "हम किन क्षेत्रों में सुधार कर सकते हैं?",
    what_liked: "आपको सबसे ज़्यादा क्या पसंद आया?",
    other_label: "अन्य (कृपया स्पष्ट करें)",
    other_placeholder: "विवरण दर्ज करें...",
    comment_label: "हमें अपने अनुभव के बारे में अधिक बताएं (वैकल्पिक)",
    comment_placeholder: "अपनी प्रतिक्रिया यहाँ लिखें...",
    contact_ask: "यदि आप चाहते हैं कि हमारी टीम आपसे संपर्क करे, तो कृपया अपना मोबाइल नंबर साझा करें।",
    yes: "हाँ",
    no: "नहीं",
    mobile_label: "मोबाइल नंबर",
    mobile_placeholder: "10-अंकों का मोबाइल नंबर दर्ज करें",
    mobile_error: "कृपया एक वैध 10-अंकों का मोबाइल नंबर दर्ज करें।",
    submit: "फीडबैक जमा करें",
    submitting: "जमा किया जा रहा है...",
    success_title: "धन्यवाद!",
    success_msg_low: "आपकी ईमानदार प्रतिक्रिया के लिए धन्यवाद। आज आपकी अपेक्षाओं पर खरा न उतरने के लिए हम वास्तव में क्षमाप्रार्थी हैं। हमारे स्टोर मैनेजर को सूचित कर दिया गया है और हम सुधार के लिए आवश्यक कदम उठा रहे हैं।",
    success_msg_mid: "आपकी बहुमूल्य प्रतिक्रिया के लिए धन्यवाद। हम आपके सुझावों की सराहना करते हैं और आपकी अगली यात्रा पर शोरूम के अनुभव को बेहतर बनाने के लिए इनका उपयोग करेंगे।",
    success_msg_high: "शानदार रेटिंग के लिए आपका धन्यवाद! हमें बेहद खुशी है कि आपका अनुभव हमारे साथ बेहतरीन रहा। हम जल्द ही आपका फिर से स्वागत करने के लिए उत्सुक हैं।",
    ref_id: "संदर्भ आईडी",
    required: "यह फ़ील्ड आवश्यक है।",
    page_unavailable_title: "लिंक उपलब्ध नहीं है",
    page_unavailable_msg: "यह फ़ीडबैक लिंक अब सक्रिय नहीं है। कृपया नया फ़ीडबैक लिंक प्राप्त करें।",
    net_error_title: "जमा करने में त्रुटि",
    net_error_msg: "गूगल शीट्स से कनेक्ट करते समय कोई समस्या आई। प्रतिक्रिया सुरक्षित है—कृपया पुनः प्रयास करें।",
    retry: "पुनः प्रयास करें",
    return_review: "प्रतिक्रिया की समीक्षा करें",
    labels: {
      1: "बहुत खराब",
      2: "खराब",
      3: "औसत",
      4: "अच्छा",
      5: "उत्कृष्ट"
    },
    reasons: {
      staff_guidance: "स्टाफ का ध्यान या मार्गदर्शन",
      waiting_time: "प्रतीक्षा समय",
      pricing_clarity: "कीमत या मेकिंग चार्ज की स्पष्टता",
      availability: "डिज़ाइन, साइज़ या उत्पाद की उपलब्धता",
      billing_exchange: "बिलिंग या पुराना सोना एक्सचेंज",
      designs: "अधिक ज्वेलरी डिज़ाइन",
      fast_service: "तेज़ सेवा",
      guidance: "बेहतर स्टाफ मार्गदर्शन",
      clear_pricing: "अधिक स्पष्ट मूल्य निर्धारण",
      showroom_comfort: "शोरूम का आराम",
      helpful_staff: "मददगार और धैर्यवान स्टाफ",
      variety_designs: "ज्वेलरी की विविधता और डिज़ाइन",
      transparent_pricing: "पारदर्शी मूल्य निर्धारण",
      fast_billing: "तेज़ सेवा और बिलिंग",
      showroom_exp: "आरामदायक शोरूम अनुभव",
      overall_trust: "समग्र विश्वास और अनुभव",
      other: "कुछ और"
    }
  },
  mr: {
    subtitle: "ग्राहक फीडबैक फॉर्म",
    lang_label: "भाषा",
    rating_title: "शोरूमचा आपला समग्र अनुभव कसा होता?",
    what_went_wrong: "आमच्याकडून कुठे उणीव भासली?",
    what_to_improve: "आम्ही कोणत्या गोष्टींमध्ये सुधारणा करू शकतो?",
    what_liked: "तुम्हाला सर्वात जास्त काय आवडले?",
    other_label: "इतर (कृपया स्पष्ट करा)",
    other_placeholder: "तपशील प्रविष्ट करा...",
    comment_label: "तुमच्या अनुभवाबद्दल आम्हाला अधिक सांगा (पर्यायी)",
    comment_placeholder: "आपली प्रतिक्रिया येथे लिहा...",
    contact_ask: "आमच्या टीमने तुमच्याशी संपर्क साधावा असे वाटत असल्यास, कृपया तुमचा मोबाईल नंबर शेअर करा.",
    yes: "होय",
    no: "नाही",
    mobile_label: "मोबाईल नंबर",
    mobile_placeholder: "10-अंकी मोबाईल नंबर टाका",
    mobile_error: "कृपया एक वैध 10-अंकी मोबाईल नंबर प्रविष्ट करा.",
    submit: "फीडबॅक सबमिट करा",
    submitting: "सबमिट होत आहे...",
    success_title: "धन्यवाद!",
    success_msg_low: "तुमच्या प्रामाणिक अभिप्रायाबद्दल धन्यवाद. आज तुमच्या अपेक्षा पूर्ण न करू शकल्याबद्दल आम्हाला खेद आहे. आमच्या स्टोअर मॅनेजरना कळवले गेले आहे आणि आम्ही त्वरित सुधारणा करत आहोत.",
    success_msg_mid: "तुमच्या मौल्यवान अभिप्रायाबद्दल धन्यवाद. आम्ही तुमच्या सूचनांचे स्वागत करतो आणि तुमच्या पुढच्या भेटीमध्ये सुधारणा करण्यासाठी याचा वापर करू.",
    success_msg_high: "उत्कृष्ट रेटिंगसाठी आपले मनापासून धन्यवाद! तुमचा आमच्यासोबतचा अनुभव खूप चांगला राहिल्याबद्दल आम्हाला आनंद आहे. पुन्हा आपले स्वागत करण्यासाठी आम्ही उत्सुक आहोत.",
    ref_id: "संदर्भ आयडी",
    required: "ही माहिती आवश्यक आहे.",
    page_unavailable_title: "लिंक उपलब्ध नाही",
    page_unavailable_msg: "ही फीडबॅक लिंक आता सक्रिय नाही. कृपया शोरूममधून नवीन फीडबॅक लिंक प्राप्त करावी.",
    net_error_title: "सबमिशन त्रुटी",
    net_error_msg: "गुगल शीट्स कनेक्ट करताना काही अडचण आली. आपली माहिती सुरक्षित आहे—कृपया पुन्हा प्रयत्न करा.",
    retry: "पुन्हा प्रयत्न करा",
    return_review: "प्रतिक्रिया तपासा",
    labels: {
      1: "खूप वाईट",
      2: "वाईट",
      3: "मध्यम",
      4: "चांगले",
      5: "उत्कृष्ट"
    },
    reasons: {
      staff_guidance: "स्टाफचे लक्ष किंवा मार्गदर्शन",
      waiting_time: "प्रतीक्षा वेळ",
      pricing_clarity: "किंमत किंवा मेकिंग चार्जची स्पष्टता",
      availability: "डिझाइन, साईझ किंवा दागिन्यांची उपलब्धता",
      billing_exchange: "बिलिंग किंवा जुने सोने एक्सचेंज",
      designs: "अधिक ज्वेलरी डिझाईन्स",
      fast_service: "वेगवान सेवा",
      guidance: "उत्कृष्ट स्टाफ मार्गदर्शन",
      clear_pricing: "अधिक स्पष्ट मूल्य निर्धारण",
      showroom_comfort: "शोरूममधील सोयी-सुविधा",
      helpful_staff: "मददगार आणि संयमी स्टाफ",
      variety_designs: "ज्वेलरीची विविधता आणि डिझाईन्स",
      transparent_pricing: "पारदर्शी मूल्य निर्धारण",
      fast_billing: "वेगवान सेवा आणि billing",
      showroom_exp: "शोरूममधील आरामदायक अनुभव",
      overall_trust: "समग्र विश्वास आणि अनुभव",
      other: "इतर काही"
    }
  }
};

type TranslationType = typeof translations.en;

function FeedbackFormContent() {
  const params = useParams();
  const code = (params?.code as string) || "k9r4";

  // Language management
  const [lang, setLang] = useState<"en" | "hi" | "mr">("en");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Form Fields
  const [rating, setRating] = useState<number>(0);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [otherReason, setOtherReason] = useState("");
  const [experienceComment, setExperienceComment] = useState("");
  const [contactRequested, setContactRequested] = useState<boolean | null>(null);
  const [mobileNumber, setMobileNumber] = useState("");

  // System States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [networkErrorOccurred, setNetworkErrorOccurred] = useState(false);
  const [refId, setRefId] = useState("");

  // Animation triggers
  const [clickedStar, setClickedStar] = useState<number | null>(null);

  const q1Ref = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];

  // Close dropdown on click outside
  useEffect(() => {
    function handleOutsideClick() {
      if (langDropdownOpen) setLangDropdownOpen(false);
    }
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [langDropdownOpen]);

  // Restrict to whitelisted showroom form codes
  const isPageUnavailable = code !== "k9r4" && code !== "s6m2";
  if (isPageUnavailable) {
    return <PageUnavailableView t={t} />;
  }

  // Get Star Styling dynamically
  const getStarColor = (starVal: number, activeRating: number) => {
    if (starVal > activeRating) return "text-gray-300 hover:text-gray-400"; // unselected
    
    // Fill all stars up to selected rating using that rating's color
    switch (activeRating) {
      case 1: return "text-[#D32F2F] active-star-red"; // Premium Red
      case 2: return "text-[#D32F2F] active-star-red"; // Premium Red
      case 3: return "text-[#FBC02D] active-star-amber"; // Vibrant Amber Gold
      case 4: return "text-[#388E3C] active-star-green"; // Emerald Green
      case 5: return "text-[#2E7D32] active-star-green"; // Deep Emerald Green
      default: return "text-gray-300";
    }
  };

  // Select dynamic question checklists by rating sentiment
  const getQuestionLabel = () => {
    if (rating === 1 || rating === 2) return t.what_went_wrong;
    if (rating === 3) return t.what_to_improve;
    return t.what_liked;
  };

  const getOptionsList = () => {
    if (rating === 1 || rating === 2) {
      return [
        { key: "staff_guidance", label: t.reasons.staff_guidance },
        { key: "waiting_time", label: t.reasons.waiting_time },
        { key: "pricing_clarity", label: t.reasons.pricing_clarity },
        { key: "availability", label: t.reasons.availability },
        { key: "billing_exchange", label: t.reasons.billing_exchange },
        { key: "other", label: t.reasons.other }
      ];
    } else if (rating === 3) {
      return [
        { key: "designs", label: t.reasons.designs },
        { key: "fast_service", label: t.reasons.fast_service },
        { key: "guidance", label: t.reasons.guidance },
        { key: "clear_pricing", label: t.reasons.clear_pricing },
        { key: "showroom_comfort", label: t.reasons.showroom_comfort },
        { key: "other", label: t.reasons.other }
      ];
    } else if (rating === 4 || rating === 5) {
      return [
        { key: "helpful_staff", label: t.reasons.helpful_staff },
        { key: "variety_designs", label: t.reasons.variety_designs },
        { key: "transparent_pricing", label: t.reasons.transparent_pricing },
        { key: "fast_billing", label: t.reasons.fast_billing },
        { key: "showroom_exp", label: t.reasons.showroom_exp },
        { key: "overall_trust", label: t.reasons.overall_trust },
        { key: "other", label: t.reasons.other }
      ];
    }
    return [];
  };

  const handleReasonToggle = (key: string) => {
    setSelectedReasons((prev) =>
      prev.includes(key) ? prev.filter((r) => r !== key) : [...prev, key]
    );
  };

  // Validator logic
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (rating === 0) {
      newErrors.rating = t.required;
    }

    if (contactRequested === null) {
      newErrors.contactRequested = t.required;
    } else if (contactRequested === true) {
      const cleanMobile = mobileNumber.trim();
      if (!cleanMobile) {
        newErrors.mobileNumber = t.required;
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        const errKeys = Object.keys(newErrors);
        let targetRef = q1Ref;
        if (errKeys.includes("rating")) targetRef = q1Ref;
        else if (errKeys.includes("contactRequested") || errKeys.includes("mobileNumber")) targetRef = contactRef;

        if (targetRef && targetRef.current) {
          targetRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
      return false;
    }

    return true;
  };

  const submitFeedback = async () => {
    setIsSubmitting(true);
    setNetworkErrorOccurred(false);

    // Convert keys to active translations strings for storage
    const formattedReasons = selectedReasons.map((key) => {
      const match = getOptionsList().find((opt) => opt.key === key);
      return match ? match.label : key;
    });

    const payload = {
      rating,
      rating_label: t.labels[rating as keyof typeof t.labels] || "",
      selected_reasons: formattedReasons,
      other_reason: selectedReasons.includes("other") ? otherReason.trim() : "",
      experience_comment: experienceComment.trim(),
      contact_requested: !!contactRequested,
      mobile_number: contactRequested ? mobileNumber.trim() : "",
      language: lang
    };

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const res = await response.json();
      setIsSubmitting(false);

      if (response.ok && res.status === "success") {
        setRefId(res.referenceId);
        setIsSuccess(true);
      } else {
        setNetworkErrorOccurred(true);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
      setNetworkErrorOccurred(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    submitFeedback();
  };

  if (networkErrorOccurred) {
    return <NetworkErrorView t={t} onRetry={submitFeedback} onReturn={() => setNetworkErrorOccurred(false)} />;
  }

  if (isSuccess) {
    return <SuccessView t={t} rating={rating} />;
  }

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#171717] font-sans flex flex-col items-center pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] px-3 sm:px-4 animate-fade-in relative">
      {/* Dynamic Embedded Animation Keyframes */}
      <style>{`
        * {
          -webkit-tap-highlight-color: transparent;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes bounceStar {
          0% { transform: scale(1); }
          30% { transform: scale(1.35); }
          100% { transform: scale(1); }
        }
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-160px) rotate(360deg); opacity: 0; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); max-height: 0; }
          to { opacity: 1; transform: translateY(0); max-height: 1000px; }
        }
        .animate-slide-up {
          animation: slideUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .star-bounce {
          animation: bounceStar 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .checkmark-path {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: drawCheck 0.6s cubic-bezier(0.65, 0, 0.45, 1) 0.25s forwards;
        }
        .animate-fade-slide-in {
          animation: fadeSlideIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .active-star-red {
          filter: drop-shadow(0 0 6px rgba(211, 47, 47, 0.45));
        }
        .active-star-amber {
          filter: drop-shadow(0 0 6px rgba(251, 192, 45, 0.45));
        }
        .active-star-green {
          filter: drop-shadow(0 0 7px rgba(46, 125, 50, 0.5));
        }
        .card-hover {
          transition: all 0.25s ease;
        }
        .card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(66, 17, 17, 0.05);
        }
      `}</style>

      <div className="w-full max-w-[550px] bg-white border border-[#E6DED3] rounded-2xl shadow-[0_4px_24px_rgba(66,17,17,0.03)] overflow-hidden flex flex-col justify-between animate-slide-up">
        
        {/* Top Header */}
        <header className="bg-[#421111] px-4 sm:px-6 py-3.5 border-b border-[#AE8448]/30 relative flex justify-center items-center rounded-t-2xl">
          <Image
            src="/PGLOGO.png"
            alt="Pravesh Gold"
            width={90}
            height={90}
            priority
            className="w-[80px] h-auto object-contain"
          />

          <div className="absolute right-3.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLangDropdownOpen(!langDropdownOpen);
              }}
              className="flex items-center space-x-1.5 text-[11px] font-bold text-[#E7D2A5] hover:text-white transition-all focus:outline-none bg-white/5 px-2.5 py-1.5 rounded-lg border border-[#AE8448]/25 hover:bg-white/10"
            >
              <span>{lang === "en" ? "English" : lang === "hi" ? "हिंदी" : "मराठी"}</span>
              <svg className={`w-3 h-3 text-[#C8A568] transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white border border-[#E6DED3] rounded-lg shadow-lg z-20 py-1 text-gray-800 animate-scale-in">
                <button
                  type="button"
                  onClick={() => { setLang("en"); setLangDropdownOpen(false); }}
                  className={`block w-full text-left px-3.5 py-2 text-xs hover:bg-[#FFF8E8] transition-colors ${lang === "en" ? "font-bold bg-[#FFF8E8] text-[#421111]" : ""}`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => { setLang("hi"); setLangDropdownOpen(false); }}
                  className={`block w-full text-left px-3.5 py-2 text-xs hover:bg-[#FFF8E8] transition-colors ${lang === "hi" ? "font-bold bg-[#FFF8E8] text-[#421111]" : ""}`}
                >
                  हिंदी
                </button>
                <button
                  type="button"
                  onClick={() => { setLang("mr"); setLangDropdownOpen(false); }}
                  className={`block w-full text-left px-3.5 py-2 text-xs hover:bg-[#FFF8E8] transition-colors ${lang === "mr" ? "font-bold bg-[#FFF8E8] text-[#421111]" : ""}`}
                >
                  मराठी
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Form Body */}
        <main className="flex-1">
          <form onSubmit={handleSubmit}>
            
            {/* Title / Description */}
            <div className="p-6 text-center border-b border-[#FAF9F7] bg-[#FAF9F6]">
              <h2 className="text-[18px] font-serif font-normal text-gray-900 tracking-tight">
                {t.subtitle}
              </h2>
            </div>

            {/* Section 1: Star Rating Bar */}
            <div ref={q1Ref} className="p-6 border-b border-[#E6DED3]/60 text-center space-y-4">
              <label className="block text-sm font-bold text-gray-800">
                {t.rating_title} <span className="text-[#B64F45]">*</span>
              </label>

              <div className="flex justify-center space-x-2.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => {
                      setRating(star);
                      setClickedStar(star);
                      setSelectedReasons([]);
                      setOtherReason("");
                      setErrors((prev) => ({ ...prev, rating: "" }));
                      setTimeout(() => setClickedStar(null), 350);
                    }}
                    className={`focus:outline-none transition-transform duration-100 active:scale-90 ${clickedStar === star ? "star-bounce" : ""}`}
                  >
                    <svg
                      className={`w-12 h-12 transition-all duration-200 transform hover:scale-110 ${getStarColor(star, rating)}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>

              {rating > 0 && (
                <div className="flex justify-center animate-scale-in">
                  <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                    rating === 1 || rating === 2
                      ? "bg-red-50 text-[#B64F45] border-red-100/60"
                      : rating === 3
                      ? "bg-amber-50 text-[#C8A568] border-amber-100/60"
                      : "bg-[#F2F7F4] text-[#3E7154] border-[#E2ECE7]"
                  }`}>
                    {t.labels[rating as keyof typeof t.labels]}
                  </span>
                </div>
              )}

              {errors.rating && (
                <p className="text-xs text-[#B64F45] font-semibold animate-scale-in">{errors.rating}</p>
              )}

              {/* Dynamic Checkbox Options */}
              {rating > 0 && (
                <div className="text-left space-y-3.5 pt-5 max-w-md mx-auto animate-fade-slide-in">
                  <span className="block text-xs font-bold text-[#AE8448] uppercase tracking-wider mb-2.5">
                    {getQuestionLabel()}
                  </span>
                  
                  <div className="grid grid-cols-1 gap-2.5">
                    {getOptionsList().map((opt) => {
                      const isChecked = selectedReasons.includes(opt.key);
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => handleReasonToggle(opt.key)}
                          className={`flex items-center space-x-3.5 w-full min-h-[46px] px-4 border rounded-xl text-sm text-left transition-all duration-200 card-hover ${
                            isChecked
                              ? "border-[#AE8448] bg-[#FDFBF7] font-semibold text-gray-900 shadow-sm shadow-[#AE8448]/5"
                              : "border-[#E6DED3] bg-[#FAF9F7]/40 text-gray-700 hover:border-[#C8A568] hover:bg-[#FAF6F0]"
                          }`}
                        >
                          <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors duration-150 ${
                            isChecked 
                              ? "border-[#421111] bg-[#421111] text-white" 
                              : "border-[#D9CFC1] bg-white"
                          }`}>
                            {isChecked && (
                              <svg className="w-2.5 h-2.5 animate-scale-in" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </span>
                          <span>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Optional Text input for 'other' selection */}
                  {selectedReasons.includes("other") && (
                    <div className="mt-2.5 animate-fade-slide-in">
                      <input
                        type="text"
                        value={otherReason}
                        onChange={(e) => setOtherReason(e.target.value)}
                        placeholder={t.other_placeholder}
                        className="w-full min-h-[44px] px-3.5 border border-[#D9CFC1] rounded-xl text-base bg-[#FAF9F7] focus:outline-none focus:border-[#C8A568] text-gray-800 font-medium transition-all"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Section 2: Comment Field */}
            <div className="p-6 border-b border-[#FAF9F7] space-y-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest">
                {t.comment_label}
              </label>
              <textarea
                value={experienceComment}
                onChange={(e) => setExperienceComment(e.target.value)}
                placeholder={t.comment_placeholder}
                className="w-full min-h-[90px] p-3 border border-[#D9CFC1] rounded-xl text-base bg-[#FAF9F7] focus:outline-none focus:border-[#421111] transition-all text-gray-800 font-medium"
              />
            </div>

            {/* Section 3: Contact Yes/No & Optional Mobile input */}
            <div ref={contactRef} className="p-6 border-b border-[#E6DED3]/60 bg-[#FAF9F6] space-y-4.5">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-widest">
                {t.contact_ask} <span className="text-[#B64F45]">*</span>
              </label>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setContactRequested(true);
                    setErrors((prev) => ({ ...prev, contactRequested: "" }));
                  }}
                  className={`flex-1 min-h-[44px] border rounded-xl text-xs font-bold transition-all duration-200 card-hover ${
                    contactRequested === true
                      ? "border-maroon bg-[#FFF8E8] text-gray-900 shadow-sm"
                      : "border-[#E6DED3] bg-white text-gray-600 hover:border-[#AE8448]/50"
                  }`}
                >
                  {t.yes}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setContactRequested(false);
                    setMobileNumber("");
                    setErrors((prev) => ({ ...prev, contactRequested: "", mobileNumber: "" }));
                  }}
                  className={`flex-1 min-h-[44px] border rounded-xl text-xs font-bold transition-all duration-200 card-hover ${
                    contactRequested === false
                      ? "border-maroon bg-[#FFF8E8] text-gray-900 shadow-sm"
                      : "border-[#E6DED3] bg-white text-gray-600 hover:border-[#AE8448]/50"
                  }`}
                >
                  {t.no}
                </button>
              </div>
              {errors.contactRequested && (
                <p className="text-xs text-[#B64F45] font-semibold animate-scale-in">{errors.contactRequested}</p>
              )}

              {/* Conditional Mobile Number Input */}
              {contactRequested === true && (
                <div className="space-y-1.5 pt-3.5 border-t border-[#E6DED3]/50 animate-fade-slide-in">
                  <label className="block text-xs font-bold text-gray-700">
                    {t.mobile_label} <span className="text-[#B64F45]">*</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                      setErrors((prev) => ({ ...prev, mobileNumber: "" }));
                    }}
                    placeholder={t.mobile_placeholder}
                    className={`w-full min-h-[44px] px-3.5 border rounded-xl text-base bg-white focus:outline-none transition-all ${
                      errors.mobileNumber ? "border-[#B64F45] bg-[#FAF5F4]" : "border-[#D9CFC1] focus:border-[#421111]"
                    }`}
                  />
                  {errors.mobileNumber && (
                    <p className="text-xs text-[#B64F45] font-semibold animate-scale-in">{errors.mobileNumber}</p>
                  )}
                </div>
              )}
            </div>

            {/* Submission button */}
            <div className="p-6 bg-white space-y-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[50px] bg-[#421111] hover:bg-[#300B0B] text-white rounded-xl text-xs font-bold tracking-wide uppercase transition-all duration-200 focus:outline-none flex items-center justify-center space-x-2 disabled:opacity-75 disabled:cursor-not-allowed shadow-sm active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-[#C8A568]" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>{t.submitting}</span>
                  </>
                ) : (
                  <span>{t.submit}</span>
                )}
              </button>
            </div>

          </form>
        </main>
      </div>
    </div>
  );
}

export default function FeedbackPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 min-h-screen flex items-center justify-center py-20 bg-[#F7F4EF]">
        <svg className="animate-spin h-6 w-6 text-[#C8A568]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    }>
      <FeedbackFormContent />
    </Suspense>
  );
}

// Success Template with celebration confetti particles and auto-drawing checkmarks
function SuccessView({ t, rating }: { t: TranslationType; rating: number }) {
  const showConfetti = rating === 4 || rating === 5;

  // Generate random confetti particle styles
  const particles = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 1.5}s`,
    size: `${Math.random() * 8 + 4}px`,
    color: ['#AE8448', '#3E7154', '#C8A568', '#B64F45'][Math.floor(Math.random() * 4)],
    duration: `${Math.random() * 2 + 2.5}s`
  }));

  const getSuccessMessage = () => {
    if (rating === 1 || rating === 2) return t.success_msg_low;
    if (rating === 3) return t.success_msg_mid;
    return t.success_msg_high;
  };

  return (
    <div className="min-h-screen bg-[#F7F4EF] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Styles for confetti animations */}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(120px) rotate(0deg); opacity: 0; }
          15% { opacity: 0.95; }
          85% { opacity: 0.95; }
          100% { transform: translateY(-240px) rotate(360deg); opacity: 0; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes scaleIn {
          from { transform: scale(0.7); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
        .animate-slide-up {
          animation: slideUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .checkmark-path {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: drawCheck 0.65s cubic-bezier(0.65, 0, 0.45, 1) 0.3s forwards;
        }
      `}</style>

      {/* Background celebration floating confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute opacity-0"
              style={{
                left: p.left,
                bottom: '10%',
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: Math.random() > 0.55 ? '50%' : '3px',
                animation: `floatUp ${p.duration} ease-out ${p.delay} infinite`
              }}
            />
          ))}
        </div>
      )}

      <div className="w-full max-w-[460px] bg-white border border-[#E6DED3] rounded-2xl p-6 sm:p-8 text-center space-y-5 shadow-xl relative z-10 animate-slide-up">
        
        {/* Animated circle + checkmark */}
        <div className="w-16 h-16 bg-[#E8F0EA] rounded-full flex items-center justify-center mx-auto animate-scale-in">
          <svg className="w-8 h-8 text-[#3E7154]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3.5">
            <path className="checkmark-path" stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-serif font-normal text-gray-900 tracking-tight">{t.success_title}</h1>
          <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">{getSuccessMessage()}</p>
        </div>
      </div>
    </div>
  );
}

// Outage Retry Template
function NetworkErrorView({ t, onRetry, onReturn }: { t: TranslationType; onRetry: () => void; onReturn: () => void }) {
  return (
    <div className="min-h-screen bg-[#F7F4EF] flex items-center justify-center p-4">
      <div className="w-full max-w-[460px] bg-white border border-[#B64F45]/30 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-sm">
        <div className="w-12 h-12 bg-[#F8ECEB] border border-[#B64F45]/30 text-[#B64F45] rounded-full flex items-center justify-center mx-auto">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <div className="space-y-1.5">
          <h1 className="text-xl font-serif font-normal text-gray-900 tracking-tight">{t.net_error_title}</h1>
          <p className="text-xs text-gray-500 leading-relaxed">{t.net_error_msg}</p>
        </div>

        <div className="flex space-x-3 pt-2">
          <button
            type="button"
            onClick={onReturn}
            className="flex-1 min-h-[42px] px-4 border border-[#E6DED3] bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 rounded-lg text-xs font-semibold transition-all focus:outline-none"
          >
            {t.return_review}
          </button>
          <button
            type="button"
            onClick={onRetry}
            className="flex-1 min-h-[42px] bg-[#421111] text-white hover:bg-[#300B0B] rounded-lg text-xs font-bold transition-all focus:outline-none"
          >
            <span>{t.retry}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Form Link Unavailable Template
function PageUnavailableView({ t }: { t: TranslationType }) {
  return (
    <div className="min-h-screen bg-[#F7F4EF] flex items-center justify-center p-4">
      <div className="w-full max-w-[460px] bg-white border border-[#E6DED3] rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-sm">
        <div className="w-12 h-12 bg-[#FAF9F7] border border-maroon/20 text-[#421111] rounded-full flex items-center justify-center mx-auto">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        <div className="space-y-1.5">
          <h1 className="text-xl font-serif font-normal text-gray-900 tracking-tight">{t.page_unavailable_title}</h1>
          <p className="text-xs text-gray-500 leading-relaxed">{t.page_unavailable_msg}</p>
        </div>
      </div>
    </div>
  );
}
