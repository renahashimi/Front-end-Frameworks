import React, { useState } from "react";
import styled from "styled-components";

const ContactPageContainer = styled.div`
    width: 100vw; 
    max-width: 1400px;
    height: 100vh; 
    background-color: white;
    background-image: url('/src/images/phone1.jpg');
    background-size: contain; 
    background-position: center; 
    background-repeat: no-repeat; 
    margin: 0;
`;


function ContactPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        subject: "",
        email: "",
        body: "",
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName || formData.fullName.trim().length < 3) {
            newErrors.fullName = "Full name must be at least 3 characters long.";
        }

        if (!formData.subject || formData.subject.trim().length < 3) {
            newErrors.subject = "Subject must be at least 3 characters long.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!formData.body || formData.body.trim().length < 3) {
            newErrors.body = "Message must be at least 3 characters long.";
        }

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            console.log("Form submitted successfully:", formData);
            setSubmitted(true);
            setFormData({ fullName: "", subject: "", email: "", body: "" }); // Reset form fields
        } else {
            setSubmitted(false);
        }
    };

    return (
        <ContactPageContainer className="contact-page-container">
            <div className="-mt-12 p-0">
                <h1 className="font-taviraj font-semibold text-custom-deep text-2xl text-center mt-2 mb-6 uppercase pt-20 text-2xl">Contact Us</h1>
                <div className="flex md:flex items-center justify-center mt-6">
                    <div className="w-full max-w-md">
                        {submitted && <p className="success-message text-custum-deep text-center text-xl border-4 border-custom-deep m-2 p-2">Thank you! Your message has been sent.</p>}
                        <div className="container mx-auto">
                            <form onSubmit={handleSubmit} noValidate className="font-rokkitt text-center bg-custom-light p-6 w-full mb-[100px]">
                                <div className="form-group py-3 w-full">
                                    <label htmlFor="fullName" className="uppercase">Full Name</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className={`w-full p-2 border ${errors.fullName ? "border-red-500" : ""}`}
                                        aria-describedby="fullNameError"
                                    />
                                    {errors.fullName && <p id="fullNameError" className="text-red-500 text-sm md:text-xl">{errors.fullName}</p>}
                                </div>
            
                                <div className="form-group py-3 w-full">
                                    <label htmlFor="subject" className="uppercase">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={`w-full p-2 border ${errors.subject ? "border-red-500" : ""}`}
                                        aria-describedby="subjectError"
                                    />
                                    {errors.subject && <p id="subjectError" className="text-red-500 text-sm md:text-xl">{errors.subject}</p>}
                                </div>
            
                                <div className="form-group py-3 w-full">
                                    <label htmlFor="email" className="uppercase">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full p-2 border ${errors.email ? "border-red-500" : ""}`}
                                        aria-describedby="emailError"
                                    />
                                    {errors.email && <p id="emailError" className="text-red-500 text-sm md:text-xl">{errors.email}</p>}
                                </div>
            
                                <div className="form-group py-3 w-full">
                                    <label htmlFor="body" className="uppercase">Message</label>
                                    <textarea
                                        id="body"
                                        name="body"
                                        value={formData.body}
                                        onChange={handleChange}
                                        className={`w-full p-2 border ${errors.body ? "border-red-500" : ""}`}
                                        aria-describedby="bodyError"
                                    />
                                    {errors.body && <p id="bodyError" className="text-red-500 text-sm md:text-xl">{errors.body}</p>}
                                </div>
            
                                <div className="flex justify-center">
                                    <button type="submit" className="submit-button text-xl px-6 py-1 bg-custom-medium text-white border-2 border-custom-dark hover:bg-custom-light hover:text-custom-dark transition duration-300">
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </ContactPageContainer>
    );    
}

export default ContactPage;
