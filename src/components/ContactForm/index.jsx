import React, { useState } from "react";
import styled from "styled-components";

const ContactPageContainer = styled.div`
    width: 100vw; 
    max-width: 1400px;
    height: 100vh; 
    max-height: 900px;
    background-color: white;
    background-size: cover; 
    background-position: center; 
    background-repeat: no-repeat; 
    margin: 0;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.5rem 0;
    border: none;
    border-bottom: 2px solid #998E8A;
    transition: border-color 0.3s ease;
    background-color: #E0DDDC;
    &:focus {
        border-bottom-color: #4A4340;
        outline: none;
    }
    &.error {
        border-bottom-color: #B23227;
    }
`;

const Textarea = styled.textarea`
    width: 100%;
    padding: 0.5rem 0;
    border: none;
    border-bottom: 2px solid #998E8A;
    transition: border-color 0.3s ease;
    background-color: #E0DDDC;
    &:focus {
        border-bottom-color: #4A4340; 
        outline: none;
    }
    &.error {
        border-bottom-color: #B23227;
    }
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
            setFormData({ fullName: "", subject: "", email: "", body: "" });
        } else {
            setSubmitted(false);
        }
    };

    return (
        <ContactPageContainer className="contact-page-container">
            <div className="-mt-12 p-0 md:bg-[url('/src/images/contact.jpg')] lg:bg-cover lg:bg-center lg:bg-no-repeat bg-white">
                <h1 className="font-taviraj font-semibold text-custom-deep md:text-custom-light text-2xl md:text-4xl text-center lg:text-start my-4 lg:ms-[100px] lg:my-[50px] uppercase pt-20 text-2xl">Contact Us</h1>
                <div className="flex md:flex lg:justify-start md:m-[20px] lg:ms-[90px] items-center justify-center mt-6">
                    <div className="w-full max-w-md p-2">
                        {submitted && <p className="success-message font-rokkitt text-custum-deep md:text-custom-light text-center text-2xl md:text-3xl border-4 border-custom-deep md:border-custom-medium mb-4 mx-2 py-2 md:px-6">Thank you! Your message has been sent.</p>}
                        <div className="container mx-auto">
                            <form onSubmit={handleSubmit} noValidate className="font-rokkitt text-left bg-custom-light p-6 w-full mb-[100px] bg-opacity-95">
                                <div className="form-group py-3 w-full">
                                    <label htmlFor="fullName" className="uppercase">Full Name</label>
                                    <Input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className={errors.fullName ? "error" : ""}
                                        aria-describedby="fullNameError"
                                    />
                                    {errors.fullName && <p id="fullNameError" className="text-custom-sale text-sm md:text-xl">{errors.fullName}</p>}
                                </div>
            
                                <div className="form-group py-3 w-full">
                                    <label htmlFor="subject" className="uppercase">Subject</label>
                                    <Input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={`w-full p-2 border ${errors.subject ? "error" : ""}`}
                                        aria-describedby="subjectError"
                                    />
                                    {errors.subject && <p id="subjectError" className="text-custom-sale text-sm md:text-xl">{errors.subject}</p>}
                                </div>
            
                                <div className="form-group py-3 w-full">
                                    <label htmlFor="email" className="uppercase">Email</label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full p-2 border ${errors.email ? "error" : ""}`}
                                        aria-describedby="emailError"
                                    />
                                    {errors.email && <p id="emailError" className="text-custom-sale text-sm md:text-xl">{errors.email}</p>}
                                </div>
            
                                <div className="form-group py-3 w-full">
                                    <label htmlFor="body" className="uppercase">Message</label>
                                    <Textarea
                                        id="body"
                                        name="body"
                                        value={formData.body}
                                        onChange={handleChange}
                                        className={`w-full p-2 border ${errors.body ? "error" : ""}`}
                                        aria-describedby="bodyError"
                                    />
                                    {errors.body && <p id="bodyError" className="text-custom-sale text-sm md:text-xl">{errors.body}</p>}
                                </div>
            
                                <div className="flex justify-center">
                                    <button type="submit" className="submit-button text-xl px-6 py-1 bg-custom-medium text-white border-2 border-custom-dark hover:bg-custom-light hover:text-custom-dark transition duration-300 rounded-full">
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
