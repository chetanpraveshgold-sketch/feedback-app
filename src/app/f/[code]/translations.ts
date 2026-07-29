export type Language = 'en' | 'hi' | 'mr';

export const translations = {
  en: {
    title: "Pravesh Gold",
    subtitle: "Help Us Serve You Better",
    desc: "Thank you for choosing Pravesh Gold. Your feedback helps us improve our jewellery collection, customer service and showroom experience.",
    submit: "Submit Feedback",
    submitting: "Submitting...",
    required: "Required Field",
    optional: "Optional",
    choose_lang: "Language / भाषा",
    privacy_note: "Your contact details are protected and only used for internal feedback.",
    
    // Sections
    sec_details: "YOUR DETAILS",
    sec_showroom: "SHOWROOM EXPERIENCE",
    sec_pricing: "PRICING & PURCHASE EXPERIENCE",
    sec_feedback: "YOUR FEEDBACK",
    sec_contact: "CONTACT PREFERENCE",
    
    // Identification
    name_label: "Customer Name",
    name_placeholder: "Enter your name",
    mobile_label: "10-digit Mobile Number",
    mobile_placeholder: "e.g. 9876543210",
    mobile_error: "Enter a valid 10-digit mobile number starting with 6, 7, 8 or 9.",
    
    // Questions
    q1: "How would you rate your overall experience with Pravesh Gold?",
    q1_1: "1 Star — Poor",
    q1_2: "2 Stars — Below Expectations",
    q1_3: "3 Stars — Average",
    q1_4: "4 Stars — Good",
    q1_5: "5 Stars — Excellent",
    q1_problems: "What went wrong with your overall experience?",
    
    q2: "How was the behaviour and support of our staff?",
    q2_problems: "What should be improved about our staff?",
    
    q3: "How satisfied were you with our jewellery collection?",
    q3_problems: "What was missing from our collection?",
    
    q4: "How clear was the explanation of price, weight, making charges, GST and billing?",
    q4_problems: "What was unclear about our pricing or billing?",
    
    q5: "How would you rate the waiting time during your visit?",
    q5_problems: "What caused the delay during your visit?",
    
    q6: "Did you exchange old gold during your purchase?",
    q6_yes: "Yes",
    q6_no: "No",
    q6a: "How was your old-gold exchange experience?",
    q6a_problems: "What should be improved about old-gold exchange?",
    q6b: "Was the old-gold testing, melting, weight and valuation process explained clearly?",
    q6b_problems: "What part of the valuation was unclear?",
    
    q7: "How likely are you to recommend Pravesh Gold to your family or friends?",
    nps_not_likely: "0 — Not Likely",
    nps_extremely_likely: "10 — Extremely Likely",
    
    q8: "What did you like most about your experience?",
    q9: "What should we improve?",
    q10: "Would you like to share any additional feedback?",
    q10_placeholder: "Please share your suggestion, concern or experience.",
    other_placeholder: "Please specify...",
    
    q11: "Would you like our team to contact you regarding your feedback?",
    q11_low_rating: "We're sorry your experience did not meet expectations. Would you like our team to contact you?",
    q11_yes: "Yes, Please Contact Me",
    q11_no: "No, Thank You",
    q11a: "How would you prefer us to contact you?",
    q11b: "When is the best time for us to contact you?",
    
    // Success
    success_title: "Thank You for Your Feedback",
    success_msg: "Your feedback has been received successfully. It will help Pravesh Gold improve its customer service and showroom experience.",
    success_callback: "Our team will contact you at your preferred time.",
    ref_id: "Feedback Reference ID",
    
    // Errors / States
    duplicate_title: "Feedback Already Received",
    duplicate_msg: "We received feedback from this mobile number recently.",
    duplicate_action: "If you wanted our customer service team to call you back, select options below:",
    duplicate_submit: "Submit Callback Request",
    duplicate_success: "Your callback request has been logged successfully.",
    page_unavailable_title: "Page Unavailable",
    page_unavailable_msg: "This feedback page is currently unavailable. Please reopen the original link or contact Pravesh Gold for assistance.",
    net_error_title: "Unable to Submit Feedback",
    net_error_msg: "Please check your internet connection and try again. Your answers are still saved.",
    retry: "Try Again",
    return_review: "Return to Form",
    
    // Options mapping
    options: {
      staff: {
        excellent: "Excellent",
        good: "Good",
        improvement: "Needs Improvement",
        poor: "Poor",
        na: "Not Applicable"
      },
      collection: {
        excellent: "Excellent",
        good: "Good",
        improvement: "Needs Improvement",
        not_explored: "I Did Not Explore the Collection"
      },
      price: {
        clear: "Completely Clear",
        mostly: "Mostly Clear",
        improvement: "Needs Improvement",
        na: "Not Applicable"
      },
      waiting: {
        none: "No Waiting",
        less_10: "Less Than 10 Minutes",
        t10_20: "10–20 Minutes",
        t20_30: "20–30 Minutes (Slow)",
        more_30: "More Than 30 Minutes (Very Slow)"
      },
      old_gold_rating: {
        excellent: "Excellent",
        good: "Good",
        improvement: "Needs Improvement",
        poor: "Poor"
      },
      old_gold_valuation: {
        clear: "Completely Clear",
        mostly: "Mostly Clear",
        somewhat: "Somewhat Clear",
        not_clear: "Not Clear"
      },
      likes: {
        staff: "Staff Support",
        collection: "Jewellery Collection",
        pricing: "Transparent Pricing",
        billing: "Billing Explanation",
        old_gold: "Old-Gold Exchange Process",
        ambience: "Showroom Ambience",
        service: "Fast Service",
        quality: "Product Quality",
        trust: "Trust and Transparency",
        other: "Other"
      },
      improvements: {
        staff: "Staff Assistance",
        collection: "Jewellery Collection",
        availability: "Product Availability",
        pricing: "Price Explanation",
        billing: "Billing Process",
        waiting: "Waiting Time",
        old_gold: "Old-Gold Exchange Process",
        comfort: "Showroom Comfort",
        parking: "Parking",
        followup: "Follow-Up Service",
        nothing: "Nothing — Everything Was Good",
        other: "Other"
      },
      contact_method: {
        phone: "Phone Call",
        whatsapp: "WhatsApp"
      },
      contact_time: {
        t10_12: "10:00 AM–12:00 PM",
        t12_15: "12:00 PM–3:00 PM",
        t15_18: "3:00 PM–6:00 PM",
        t18_20: "6:00 PM–8:00 PM",
        anytime: "Any Time"
      },
      
      // Inline problems options
      q1_problems: {
        staff: "Staff Behaviour",
        collection: "Jewellery Collection",
        pricing: "Pricing or Billing",
        waiting: "Waiting Time",
        old_gold: "Old-Gold Exchange",
        comfort: "Showroom Comfort",
        other: "Other"
      },
      q2_problems: {
        attentive: "Attentiveness",
        knowledge: "Product Knowledge",
        polite: "Politeness",
        speed: "Billing Speed",
        availability: "Staff Availability",
        other: "Other"
      },
      q3_problems: {
        design: "Required Design",
        weight: "Required Weight",
        size: "Required Size",
        category: "Required Jewellery Category",
        availability: "Product Availability",
        budget: "Options Within My Budget",
        variety: "More Variety",
        other: "Other"
      },
      q4_problems: {
        rate: "Gold Rate Calculation",
        making: "Making Charges",
        gst: "GST / Taxes",
        invoice: "Invoice Breakdown",
        discount: "Discount / Offers",
        other: "Other"
      },
      q5_problems: {
        billing: "Billing Queue",
        staff: "Salesperson Availability",
        retrieval: "Jewellery Retrieval",
        old_gold: "Old-Gold Exchange Melt/Testing",
        payment: "Payment Processing",
        other: "Other"
      },
      q6a_problems: {
        transparency: "Testing Transparency",
        melting: "Melting Process",
        valuation: "Weight Valuation",
        deduction: "Explanation of Deductions",
        speed: "Processing Speed",
        other: "Other"
      }
    }
  },
  hi: {
    title: "प्रवेश गोल्ड",
    subtitle: "बेहतर सर्विस देने में हमारी मदद करें",
    desc: "प्रवेश गोल्ड को चुनने के लिए धन्यवाद। आपका फीडबैक हमें हमारे ज्वेलरी कलेक्शन, कस्टमर सर्विस और शोरूम के अनुभव को बेहतर बनाने में मदद करेगा।",
    submit: "फीडबैक सबमिट करें",
    submitting: "सबमिट हो रहा है...",
    required: "ज़रूरी फ़ील्ड",
    optional: "ऑप्शनल",
    choose_lang: "भाषा / Language",
    privacy_note: "आपके संपर्क विवरण (Contact details) सुरक्षित हैं और केवल फीडबैक के लिए उपयोग किए जाएंगे।",
    
    // Sections
    sec_details: "आपकी जानकारी (YOUR DETAILS)",
    sec_showroom: "शोरूम का अनुभव (SHOWROOM EXPERIENCE)",
    sec_pricing: "प्राइसिंग और बिलिंग (PRICING & BILLING)",
    sec_feedback: "आपका फीडबैक (YOUR FEEDBACK)",
    sec_contact: "संपर्क करने का तरीका (CONTACT PREFERENCE)",
    
    // Identification
    name_label: "कस्टमर का नाम",
    name_placeholder: "अपना नाम दर्ज करें",
    mobile_label: "10-अंकों का मोबाइल नंबर",
    mobile_placeholder: "उदा. 9876543210",
    mobile_error: "कृपया 6, 7, 8 या 9 से शुरू होने वाला एक सही 10-अंकीय मोबाइल नंबर दर्ज करें।",
    
    // Questions
    q1: "प्रवेश गोल्ड के साथ आपका ओवरऑल अनुभव (Experience) कैसा रहा?",
    q1_1: "1 स्टार — खराब",
    q1_2: "2 स्टार — उम्मीद से कम",
    q1_3: "3 स्टार — ठीक-ठाक",
    q1_4: "4 स्टार — अच्छा",
    q1_5: "5 स्टार — बहुत अच्छा",
    q1_problems: "हमारे अनुभव में क्या कमी रह गई थी?",
    
    q2: "हमारे स्टाफ का व्यवहार और मदद (Support) कैसी थी?",
    q2_problems: "स्टाफ में क्या सुधार होना चाहिए?",
    
    q3: "क्या आप हमारे ज्वेलरी कलेक्शन से खुश (संतुष्ट) थे?",
    q3_problems: "हमारे ज्वेलरी कलेक्शन में क्या कमी थी?",
    
    q4: "प्राइस, जीएसटी, मेकिंग चार्ज और बिलिंग का हिसाब कितना क्लियर था?",
    q4_problems: "प्राइसिंग या बिलिंग में क्या क्लियर नहीं था?",
    
    q5: "विजिट के दौरान वेटिंग टाइम (प्रतीक्षा समय) को आप कैसे रेट करेंगे?",
    q5_problems: "विजिट के दौरान देरी का क्या कारण था?",
    
    q6: "क्या आपने खरीदारी के दौरान पुराना सोना एक्सचेंज किया था?",
    q6_yes: "हाँ",
    q6_no: "नहीं",
    q6a: "पुराना सोना एक्सचेंज करने का अनुभव कैसा रहा?",
    q6a_problems: "पुराने सोने के एक्सचेंज में क्या सुधार किया जाना चाहिए?",
    q6b: "क्या पुराने सोने के टेस्टिंग, मेल्टिंग, वजन और वैल्यूएशन की प्रोसेस अच्छी तरह समझाई गई थी?",
    q6b_problems: "वैल्यूएशन का कौन सा हिस्सा क्लियर नहीं था?",
    
    q7: "आप अपने परिवार या दोस्तों को प्रवेश गोल्ड की सलाह (Recommend) देने के लिए कितने सहमत हैं?",
    nps_not_likely: "0 — संभावना नहीं है",
    nps_extremely_likely: "10 — बहुत ज़्यादा संभावना है",
    
    q8: "आपको हमारे शोरूम में सबसे अच्छा क्या लगा?",
    q9: "हमें किन चीजों में सुधार (Improve) करना चाहिए?",
    q10: "क्या आप कोई और बात या सुझाव शेयर करना चाहेंगे?",
    q10_placeholder: "कृपया अपना सुझाव, चिंता या अनुभव शेयर करें।",
    other_placeholder: "कृपया स्पष्ट करें...",
    
    q11: "क्या आप चाहते हैं कि हमारी टीम आपसे संपर्क (Contact) करे?",
    q11_low_rating: "हमें खेद है कि आपका अनुभव अच्छा नहीं रहा। क्या आप चाहेंगे कि हमारी टीम आपसे संपर्क करे?",
    q11_yes: "हाँ, प्लीज मुझसे संपर्क करें",
    q11_no: "नहीं, धन्यवाद",
    q11a: "आप हमसे कैसे संपर्क करना पसंद करेंगे?",
    q11b: "आपसे संपर्क करने का सबसे अच्छा समय क्या है?",
    
    // Success
    success_title: "आपके फीडबैक के लिए धन्यवाद",
    success_msg: "आपका फीडबैक सफलतापूर्वक मिल गया है। यह प्रवेश गोल्ड को अपनी सर्विस और शोरूम अनुभव को बेहतर बनाने में मदद करेगा।",
    success_callback: "हमारी टीम आपके पसंद के समय पर आपसे संपर्क करेगी।",
    ref_id: "रेफरेंस आईडी (Reference ID)",
    
    // Errors / States
    duplicate_title: "फीडबैक पहले ही मिल चुका है",
    duplicate_msg: "हमें हाल ही में इस मोबाइल नंबर से फीडबैक मिला है।",
    duplicate_action: "अगर आप चाहते हैं कि हमारी टीम आपसे संपर्क करे, तो नीचे ऑप्शन चुनें:",
    duplicate_submit: "कॉल बैक रिक्वेस्ट सबमिट करें",
    duplicate_success: "आपका कॉल बैक रिक्वेस्ट दर्ज कर लिया गया है।",
    page_unavailable_title: "पेज उपलब्ध नहीं है",
    page_unavailable_msg: "यह फीडबैक पेज अभी उपलब्ध नहीं है। कृपया ओरिजिनल लिंक फिर से खोलें या प्रवेश गोल्ड से संपर्क करें।",
    net_error_title: "फीडबैक सबमिट नहीं हो सका",
    net_error_msg: "कृपया अपना इंटरनेट कनेक्शन चेक करें और दोबारा कोशिश करें। आपके जवाब सुरक्षित हैं।",
    retry: "दोबारा कोशिश करें",
    return_review: "फॉर्म पर वापस जाएं",
 
    options: {
      staff: {
        excellent: "बहुत अच्छा (Excellent)",
        good: "अच्छा (Good)",
        improvement: "सुधार की ज़रूरत है",
        poor: "खराब (Poor)",
        na: "लागू नहीं (N/A)"
      },
      collection: {
        excellent: "बहुत अच्छा (Excellent)",
        good: "अच्छा (Good)",
        improvement: "सुधार की ज़रूरत है",
        not_explored: "मैंने कलेक्शन नहीं देखा"
      },
      price: {
        clear: "पूरी तरह क्लियर था",
        mostly: "ज़्यादातर क्लियर था",
        improvement: "सुधार की ज़रूरत है",
        na: "लागू नहीं (N/A)"
      },
      waiting: {
        none: "बिलकुल इंतज़ार नहीं करना पड़ा",
        less_10: "10 मिनट से कम",
        t10_20: "10-20 मिनट",
        t20_30: "20-30 मिनट (धीमा था)",
        more_30: "30 मिनट से ज़्यादा (बहुत धीमा)"
      },
      old_gold_rating: {
        excellent: "बहुत अच्छा (Excellent)",
        good: "अच्छा (Good)",
        improvement: "सुधार की ज़रूरत है",
        poor: "खराब (Poor)"
      },
      old_gold_valuation: {
        clear: "पूरी तरह क्लियर था",
        mostly: "ज़्यादातर क्लियर था",
        somewhat: "थोड़ा बहुत क्लियर था",
        not_clear: "क्लियर नहीं था"
      },
      likes: {
        staff: "स्टाफ का व्यवहार",
        collection: "ज्वेलरी कलेक्शन",
        pricing: "पारदर्शी प्राइसिंग (Transparent pricing)",
        billing: "बिलिंग का स्पष्टीकरण",
        old_gold: "पुराना सोना एक्सचेंज प्रोसेस",
        ambience: "शोरूम का माहौल (Ambience)",
        service: "फास्ट सर्विस",
        quality: "प्रोडक्ट की क्वालिटी",
        trust: "भरोसा और पारदर्शिता",
        other: "अन्य (Other)"
      },
      improvements: {
        staff: "स्टाफ की सर्विस",
        collection: "ज्वेलरी कलेक्शन",
        availability: "प्रोडक्ट की उपलब्धता (Availability)",
        pricing: "प्राइसिंग का स्पष्टीकरण",
        billing: "बिलिंग प्रोसेस",
        waiting: "वेटिंग टाइम",
        old_gold: "पुराना सोना एक्सचेंज प्रोसेस",
        comfort: "शोरूम में आराम / सुविधाएं",
        parking: "पार्किंग",
        followup: "फॉलो-अप सर्विस",
        nothing: "कुछ नहीं — सब कुछ बहुत अच्छा था",
        other: "अन्य (Other)"
      },
      contact_method: {
        phone: "फ़ोन कॉल",
        whatsapp: "व्हाट्सएप"
      },
      contact_time: {
        t10_12: "10:00 AM–12:00 PM",
        t12_15: "12:00 PM–3:00 PM",
        t15_18: "3:00 PM–6:00 PM",
        t18_20: "6:00 PM–8:00 PM",
        anytime: "किसी भी समय"
      },
      
      // Inline problems hi
      q1_problems: {
        staff: "स्टाफ का व्यवहार (Staff behavior)",
        collection: "ज्वेलरी कलेक्शन (Jewellery collection)",
        pricing: "प्राइसिंग या बिलिंग (Pricing/Billing)",
        waiting: "वेटिंग टाइम (Waiting time)",
        old_gold: "पुराना सोना एक्सचेंज (Old gold exchange)",
        comfort: "शोरूम में आराम / सुविधाएं",
        other: "अन्य (Other)"
      },
      q2_problems: {
        attentive: "ध्यान न देना",
        knowledge: "प्रोडक्ट की जानकारी (Product knowledge)",
        polite: "शिष्टता (Politeness)",
        speed: "बिलिंग की स्पीड",
        availability: "स्टाफ की उपलब्धता",
        other: "अन्य (Other)"
      },
      q3_problems: {
        design: "मनपसंद डिजाइन (Design)",
        weight: "सही वजन (Weight)",
        size: "सही साइज (Size)",
        category: "ज्वेलरी कैटेगरी (Category)",
        availability: "स्टॉक में होना (Availability)",
        budget: "बजट के अंदर होना",
        variety: "ज़्यादा वैरायटी (Variety)",
        other: "अन्य (Other)"
      },
      q4_problems: {
        rate: "गोल्ड रेट कैलकुलेशन (Gold rate)",
        making: "मेकिंग चार्जेस (Making charges)",
        gst: "जीएसटी / टैक्स",
        invoice: "बिल की डिटेल्स",
        discount: "डिस्काउंट / ऑफर्स",
        other: "अन्य (Other)"
      },
      q5_problems: {
        billing: "बिलिंग काउंटर लाइन (Billing Queue)",
        staff: "स्टाफ की उपलब्धता",
        retrieval: "डिजाइन ढूंढने में समय",
        old_gold: "पुराने सोने का टेस्ट",
        payment: "पेमेंट प्रोसेस",
        other: "अन्य (Other)"
      },
      q6a_problems: {
        transparency: "पारदर्शिता (Transparency)",
        melting: "पिघलने की प्रोसेस (Melting process)",
        valuation: "वजन का वैल्यूएशन (Weight)",
        deduction: "डिडक्शन का स्पष्टीकरण",
        speed: "प्रोसेसिंग की स्पीड (Speed)",
        other: "अन्य (Other)"
      }
    }
  },
  mr: {
    title: "प्रवेश गोल्ड",
    subtitle: "उत्कृष्ट सर्विस देण्यासाठी आम्हाला मदत करा",
    desc: "प्रवेश गोल्डची निवड केल्याबद्दल धन्यवाद. तुमचा फीडबैक आम्हाला आमच्या ज्वेलरी कलेक्शन, कस्टमर सर्विस आणि शोरूमचा अनुभव अजून चांगला बनवण्यास मदत करेल.",
    submit: "फीडबैक सबमिट करा",
    submitting: "सबमिट होत आहे...",
    required: "आवश्यक आहे",
    optional: "ऑप्शनल",
    choose_lang: "भाषा निवडा / Language",
    privacy_note: "तुमचे संपर्क तपशील (Contact details) सुरक्षित आहेत आणि फक्त फीडबॅकसाठी वापरले जातील.",
    
    // Sections
    sec_details: "तुमची माहिती (YOUR DETAILS)",
    sec_showroom: "शोरूमचा अनुभव (SHOWROOM EXPERIENCE)",
    sec_pricing: "प्राइसिंग आणि खरेदीचा अनुभव (PRICING & PURCHASE)",
    sec_feedback: "तुमचा फीडबैक (YOUR FEEDBACK)",
    sec_contact: "संपर्क कसा करायचा (CONTACT PREFERENCE)",
    
    // Identification
    name_label: "कस्टमरचे नाव",
    name_placeholder: "तुमचे नाव प्रविष्ट करा",
    mobile_label: "10-अंकी मोबाईल नंबर",
    mobile_placeholder: "उदा. 9876543210",
    mobile_error: "कृपया 6, 7, 8 किंवा 9 ने सुरू होणारा वैध 10-अंकी मोबाईल नंबर प्रविष्ट करा.",
    
    // Questions
    q1: "प्रवेश गोल्डसोबत तुमचा ओव्हरऑल अनुभव (Experience) कसा होता?",
    q1_1: "1 स्टार — खराब",
    q1_2: "2 स्टार — अपेक्षेपेक्षा कमी",
    q1_3: "3 स्टार — ठीक-ठाक",
    q1_4: "4 स्टार — चांगले",
    q1_5: "5 स्टार — खूप चांगले",
    q1_problems: "तुमच्या ओव्हरऑल अनुभवात काय कमी वाटली?",
    
    q2: "आमच्या स्टाफचे वर्तन आणि मदत कशी होती?",
    q2_problems: "स्टाफमध्ये काय सुधारणा झाली पाहिजे?",
    
    q3: "तुम्ही आमच्या ज्वेलरी कलेक्शनवर समाधानी आहात का?",
    q3_problems: "ज्वेलरी कलेक्शनमध्ये काय कमी वाटले?",
    
    q4: "प्राइस, जीएसटी, मेकिंग चार्जेस आणि बिलिंगचे स्पष्टीकरण किती क्लियर होते?",
    q4_problems: "प्राइसिंग किंवा बिलिंगमध्ये काय क्लियर नव्हते?",
    
    q5: "व्हिजिट दरम्यान वेटिंग टाईमला तुम्ही कसा रेट कराल?",
    q5_problems: "व्हिजिट दरम्यान उशीर होण्याचे कारण काय होते?",
    
    q6: "खरेदी करताना तुम्ही जुने सोने एक्सचेंज केले होते का?",
    q6_yes: "होय",
    q6_no: "नाही",
    q6a: "जुने सोने एक्सचेंज करण्याचा अनुभव कसा होता?",
    q6a_problems: "जुन्या सोन्याच्या एक्सचेंजमध्ये काय सुधारणा हवी आहे?",
    q6b: "जुने सोने टेस्टिंग, मेल्टिंग, वजन आणि व्हॅल्यूएशनची प्रोसेस नीट समजवली होती का?",
    q6b_problems: "व्हॅल्यूएशनचा कोणता भाग क्लियर नव्हता?",
    
    // NPS & Recommendations
    q7: "तुम्ही तुमच्या कुटुंबियांना किंवा मित्रांना प्रवेश गोल्डबद्दल सांगण्याची (Recommend) शक्यता किती आहे?",
    nps_not_likely: "0 — शक्यता नाही",
    nps_extremely_likely: "10 — खूप शक्यता आहे",
    
    q8: "तुम्हाला आमच्या शोरूममध्ये सर्वात जास्त काय आवडले?",
    q9: "आम्ही कोणत्या गोष्टींमध्ये सुधारणा केली पाहिजे?",
    q10: "तुम्हाला अजून काही सांगायचे आहे का?",
    q10_placeholder: "कृपया तुमची सूचना, काळजी किंवा अनुभव शेअर करा.",
    other_placeholder: "कृपया स्पष्ट करा...",
    
    q11: "आमच्या टीमने तुमच्या फीडबॅकबद्दल तुमच्याशी संपर्क साधावा अशी तुमची इच्छा आहे का?",
    q11_low_rating: "तुमचा अनुभव चांगला नव्हता याबद्दल आम्हाला खंत आहे. आमच्या टीमने तुमच्याशी संपर्क साधावा अशी तुमची इच्छा आहे का?",
    q11_yes: "होय, प्लीज माझ्याशी संपर्क साधा",
    q11_no: "नाही, धन्यवाद",
    q11a: "तुम्ही आमच्याशी कसा संपर्क साधणे पसंत कराल?",
    q11b: "तुमच्याशी संपर्क साधण्यासाठी कोणती वेळ सर्वोत्तम आहे?",
    
    // Success
    success_title: "तुमच्या फीडबॅकबद्दल धन्यवाद",
    success_msg: "तुमचा फीडबॅक यशस्वीरीत्या मिळाला आहे. हे प्रवेश गोल्डला आपली service आणि शोरूम अनुभव अजून चांगला करण्यास मदत करेल.",
    success_callback: "आमची टीम तुमच्या पसंतीच्या वेळेवर तुमच्याशी संपर्क साधेल.",
    ref_id: "रेफरन्स आयडी (Reference ID)",
    
    // Errors / States
    duplicate_title: "फीडबॅक आधीच मिळाला आहे",
    duplicate_msg: "आम्हाला नुकतीच या मोबाईल नंबरवरून फीडबॅक मिळाला आहे.",
    duplicate_action: "जर तुम्हाला आमच्या टीमने कॉल करावा असे वाटत असेल, तर खाली पर्याय निवडा:",
    duplicate_submit: "कॉल बॅक विनंती सबमिट करा",
    duplicate_success: "तुमची कॉल बॅक विनंती यशस्वीरीत्या नोंदवली गेली आहे.",
    page_unavailable_title: "पेज उपलब्ध नाही",
    page_unavailable_msg: "हे फीडबॅक पेज सध्या उपलब्ध नाही. कृपया मूळ लिंक पुन्हा उघडा किंवा प्रवेश गोल्डशी संपर्क साधा.",
    net_error_title: "फीडबॅक सबमिट झाला नाही",
    net_error_msg: "कृपया तुमचे इंटरनेट कनेक्शन तपासा आणि पुन्हा प्रयत्न करा. तुमची उत्तरे अजूनही सेव्ह आहेत.",
    retry: "पुन्हा प्रयत्न करा",
    return_review: "फॉर्मवर परत जा",

    options: {
      staff: {
        excellent: "खूप चांगले (Excellent)",
        good: "चांगले (Good)",
        improvement: "सुधारणेची गरज आहे",
        poor: "खराब (Poor)",
        na: "लागू नाही (N/A)"
      },
      collection: {
        excellent: "खूप चांगले (Excellent)",
        good: "चांगले (Good)",
        improvement: "सुधारणेची गरज आहे",
        not_explored: "मी कलेक्शन पाहिले नाही"
      },
      price: {
        clear: "पूर्णपणे क्लियर होते",
        mostly: "बहुतेक क्लियर होते",
        improvement: "सुधारणेची गरज आहे",
        na: "लागू नाही (N/A)"
      },
      waiting: {
        none: "बिलकुल प्रतीक्षा करावी लागली नाही",
        less_10: "१० मिनिटांपेक्षा कमी",
        t10_20: "१०-२० मिनिटे",
        t20_30: "२०-३० मिनिटे (हळू होते)",
        more_30: "३० मिनिटांपेक्षा जास्त (खूप हळू)"
      },
      old_gold_rating: {
        excellent: "खूप चांगले (Excellent)",
        good: "चांगले (Good)",
        improvement: "सुधारणेची गरज आहे",
        poor: "खराब (Poor)"
      },
      old_gold_valuation: {
        clear: "पूर्णपणे क्लियर होते",
        mostly: "बहुतेक क्लियर होते",
        somewhat: "काही प्रमाणात क्लियर होते",
        not_clear: "क्लियर नव्हते"
      },
      likes: {
        staff: "स्टाफचे सहकार्य",
        collection: "ज्वेलरी कलेक्शन",
        pricing: "पारदर्शक प्राइसिंग (Transparent pricing)",
        billing: "बिलिंग स्पष्टीकरण",
        old_gold: "जुने सोने एक्सचेंज प्रोसेस",
        ambience: "शोरूमचे वातावरण (Ambience)",
        service: "फास्ट सर्विस",
        quality: "उत्पादनाची क्वालिटी (Quality)",
        trust: "विश्वास आणि पारदर्शकता",
        other: "इतर (Other)"
      },
      improvements: {
        staff: "स्टाफ मदत / सर्विस",
        collection: "ज्वेलरी कलेक्शन",
        availability: "उत्पादनांची उपलब्धता (Availability)",
        pricing: "किमतीचे स्पष्टीकरण",
        billing: "बिलिंग प्रोसेस",
        waiting: "वेटिंग टाईम (Waiting time)",
        old_gold: "जुने सोने एक्सचेंज प्रोसेस",
        comfort: "शोरूममधील सोयी-सुविधा",
        parking: "पार्किंग",
        followup: "फॉलो-अप सर्विस",
        nothing: "काहीही नाही — सर्व काही खूप चांगले होते",
        other: "इतर (Other)"
      },
      contact_method: {
        phone: "फोन कॉल",
        whatsapp: "व्हॉट्सॲप"
      },
      contact_time: {
        t10_12: "10:00 AM–12:00 PM",
        t12_15: "12:00 PM–3:00 PM",
        t15_18: "3:00 PM–6:00 PM",
        t18_20: "6:00 PM–8:00 PM",
        anytime: "कधीही"
      },
      
      // Inline problems mr
      q1_problems: {
        staff: "स्टाफचे वर्तन (Staff behavior)",
        collection: "ज्वेलरी कलेक्शन (Jewellery collection)",
        pricing: "किंमत किंवा बिलिंग (Pricing/Billing)",
        waiting: "वेटिंग टाईम (Waiting time)",
        old_gold: "जुने सोने एक्सचेंज (Old gold exchange)",
        comfort: "शोरूममधील सोयी-सुविधा",
        other: "इतर (Other)"
      },
      q2_problems: {
        attentive: "स्टाफने लक्ष न देणे",
        knowledge: "ज्वेलरीची माहिती (Product knowledge)",
        polite: "सौजन्यशीलता (Politeness)",
        speed: "बिलिंगची गती (Billing speed)",
        availability: "कर्मचाऱ्यांची उपलब्धता",
        other: "इतर (Other)"
      },
      q3_problems: {
        design: "मनपसंद डिझाइन (Design)",
        weight: "योग्य वजन (Weight)",
        size: "योग्य आकार (Size)",
        category: "ज्वेलरी कॅटेगरी (Category)",
        availability: "स्टॉकमध्ये असणे (Availability)",
        budget: "माझ्या बजेटमधील पर्याय",
        variety: "अधिक व्हरायटी (Variety)",
        other: "इतर (Other)"
      },
      q4_problems: {
        rate: "सोन्याच्या दराची गणना (Gold rate)",
        making: "मेकिंग चार्जेस (Making charges)",
        gst: "जीएसटी / कर (GST/Tax)",
        invoice: "बिलाचा तपशील",
        discount: "सवलत / ऑफर्स (Discount)",
        other: "इतर (Other)"
      },
      q5_problems: {
        billing: "बिलिंग काउंटर रांग (Billing Queue)",
        staff: "कर्मचाऱ्यांची उपलब्धता",
        retrieval: "दागिने आणण्यास वेळ (Retrieval)",
        old_gold: "जुन्या सोन्याचे टेस्टिंग",
        payment: "पेमेंट प्रक्रिया",
        other: "इतर (Other)"
      },
      q6a_problems: {
        transparency: "पारदर्शकता (Transparency)",
        melting: "वितळवण्याची प्रोसेस (Melting process)",
        valuation: "वजन मूल्यमापन (Valuation)",
        deduction: "वजावटीचे स्पष्टीकरण (Deductions)",
        speed: "प्रोसेसिंग वेग (Speed)",
        other: "इतर (Other)"
      }
    }
  }
};
