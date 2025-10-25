import { CONTACT } from "../constants";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const sanitizeInput = (input) => {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove potential JavaScript injection
      .replace(/on\w+=/gi, ''); // Remove potential event handlers
  };

  const validateForm = () => {
    const sanitizedName = sanitizeInput(formData.name);
    const sanitizedEmail = sanitizeInput(formData.email);
    const sanitizedMessage = sanitizeInput(formData.message);

    if (!sanitizedName || sanitizedName.length < 2) {
      setSubmitStatus('error');
      return { valid: false, error: 'Name must be at least 2 characters long' };
    }

    if (!validateEmail(sanitizedEmail)) {
      setSubmitStatus('error');
      return { valid: false, error: 'Please enter a valid email address' };
    }

    if (!sanitizedMessage || sanitizedMessage.length < 10) {
      setSubmitStatus('error');
      return { valid: false, error: 'Message must be at least 10 characters long' };
    }

    if (sanitizedMessage.length > 1000) {
      setSubmitStatus('error');
      return { valid: false, error: 'Message must be less than 1000 characters' };
    }

    return {
      valid: true,
      sanitizedData: {
        name: sanitizedName,
        email: sanitizedEmail,
        message: sanitizedMessage
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Rate limiting: Check if user submitted recently (within 60 seconds)
    const currentTime = Date.now();
    const timeSinceLastSubmit = currentTime - lastSubmitTime;
    const RATE_LIMIT_MS = 60000; // 60 seconds

    if (timeSinceLastSubmit < RATE_LIMIT_MS) {
      setSubmitStatus("Please wait before sending another message (rate limit: 60 seconds)");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("");

    // Validate and sanitize form data
    const validation = validateForm();
    if (!validation.valid) {
      setSubmitStatus(validation.error);
      setIsSubmitting(false);
      return;
    }

    try {
      // Use environment variables for EmailJS credentials
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: validation.sanitizedData.name,
          email: validation.sanitizedData.email,
          message: validation.sanitizedData.message,
          time: new Date().toLocaleString(),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log("Email sent successfully:", result);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setLastSubmitTime(currentTime); // Update last successful submit time
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border-b border-neutral-900 pb-4">
      <h2 className="my-20 text-center text-4xl">
        Contact
      </h2>
      
      <div className="max-w-4xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <div>
            <h3 className="mb-6 font-semibold">Get in Touch</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded bg-neutral-900 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-neutral-400">Location</p>
                  <p className="text-neutral-300">{CONTACT.address}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded bg-neutral-900 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-neutral-400">Email</p>
                  <a 
                    href={`mailto:${CONTACT.email}`}
                    className="text-neutral-300 hover:text-white transition-colors duration-200"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded bg-neutral-900 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-neutral-400">LinkedIn</p>
                  <a 
                    href={CONTACT.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-300 hover:text-white transition-colors duration-200 inline-flex items-center"
                  >
                    Connect with me
                    <img
                      src="/up-right-from-square-solid-full.svg"
                      alt="External link"
                      className="w-3 h-3 ml-1 opacity-70 hover:opacity-100 transition-opacity duration-200 filter brightness-0 invert"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="mb-6 font-semibold">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm text-neutral-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 bg-neutral-900 border rounded text-neutral-300 placeholder-neutral-500 focus:outline-none transition-colors duration-200 ${
                    submitStatus && submitStatus !== "success" && formData.name && formData.name.length < 2
                      ? "border-red-500 focus:border-red-500"
                      : "border-neutral-800 focus:border-blue-500"
                  }`}
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-neutral-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 bg-neutral-900 border rounded text-neutral-300 placeholder-neutral-500 focus:outline-none transition-colors duration-200 ${
                    submitStatus && submitStatus !== "success" && formData.email && !validateEmail(formData.email)
                      ? "border-red-500 focus:border-red-500"
                      : "border-neutral-800 focus:border-blue-500"
                  }`}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-neutral-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className={`w-full px-3 py-2 bg-neutral-900 border rounded text-neutral-300 placeholder-neutral-500 focus:outline-none transition-colors duration-200 resize-none ${
                    submitStatus && submitStatus !== "success" && formData.message && (formData.message.length < 10 || formData.message.length > 1000)
                      ? "border-red-500 focus:border-red-500"
                      : "border-neutral-800 focus:border-blue-500"
                  }`}
                  placeholder="Your message..."
                />
              </div>

              {submitStatus === "success" && (
                <div className="p-3 rounded bg-green-900 border border-green-700 text-green-300 text-sm">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus && submitStatus !== "success" && (
                <div className="p-3 rounded bg-red-900 border border-red-700 text-red-300 text-sm">
                  {submitStatus}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-block rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Contact;
